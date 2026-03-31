from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.models.user import UserCreate, UserInDB, UserResponse, TokenData
from app.core.database import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.config import settings

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

class AuthService:
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    async def get_user_by_email(db: AsyncIOMotorDatabase, email: str) -> Optional[UserInDB]:
        user_data = await db.users.find_one({'email': email})
        if user_data:
            user_data['_id'] = str(user_data['_id'])
            return UserInDB(**user_data)
        return None

    @staticmethod
    async def create_user(db: AsyncIOMotorDatabase, user_create: UserCreate) -> UserInDB:
        # Check if user exists
        existing = await AuthService.get_user_by_email(db, user_create.email)
        if existing:
            raise ValueError('User with this email already exists')
        hashed_password = AuthService.get_password_hash(user_create.password)
        user_dict = {
            'email': user_create.email,
            'full_name': user_create.full_name,
            'hashed_password': hashed_password,
            'created_at': datetime.utcnow(),
        }
        result = await db.users.insert_one(user_dict)
        user_dict['_id'] = str(result.inserted_id)
        return UserInDB(**user_dict)

    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
        to_encode.update({'exp': expire})
        encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
        return encoded_jwt