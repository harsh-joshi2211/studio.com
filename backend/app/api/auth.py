from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.models.user import UserCreate, UserResponse, Token, TokenData, UserInDB
from app.services.auth_service import AuthService
from app.core.database import get_database
from app.core.config import settings
from motor.motor_asyncio import AsyncIOMotorDatabase
from jose import jwt, JWTError

router = APIRouter(prefix='/auth', tags=['auth'])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')

@router.post('/register', response_model=Token)
async def register(user: UserCreate, db: AsyncIOMotorDatabase = Depends(get_database)):
    try:
        new_user = await AuthService.create_user(db, user)
        access_token = AuthService.create_access_token(
            data={'sub': new_user.email, 'id': str(new_user.id)}
        )
        return Token(access_token=access_token, token_type='bearer')
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post('/login', response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    user = await AuthService.get_user_by_email(db, form_data.username)
    if not user or not AuthService.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect email or password',
            headers={'WWW-Authenticate': 'Bearer'},
        )
    access_token = AuthService.create_access_token(
        data={'sub': user.email, 'id': str(user.id)}
    )
    return Token(access_token=access_token, token_type='bearer')

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> UserInDB:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get('sub')
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = await AuthService.get_user_by_email(db, token_data.email)
    if user is None:
        raise credentials_exception
    return user

@router.get('/me', response_model=UserResponse)
async def get_me(
    current_user: UserInDB = Depends(get_current_user)
):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        created_at=current_user.created_at,
    )