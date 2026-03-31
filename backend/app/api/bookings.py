from fastapi import APIRouter, Depends, HTTPException, status
from app.models.booking import BookingCreate, Booking
from app.services.booking_service import BookingService
from app.core.database import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("/", response_model=Booking, status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking: BookingCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Booking:
    """
    Create a new booking.

    Request Body:
        studio_id: MongoDB ObjectId of the studio to book
        booking_date: ISO 8601 datetime (must be in the future)
        user_email: Valid email address of the customer

    Validations:
        - booking_date must be in the future (UTC comparison)
        - studio_id must reference an existing studio
        - (future) no double bookings for same time slot

    Responses:
        201: Booking successfully created
        422: Validation error (past date, studio not found, invalid ID, etc.)
        500: Internal server error

    Returns:
        Booking object with generated ID and created_at timestamp
    """
    try:
        return await BookingService.create_booking(db, booking)
    except ValueError as e:
        # Business logic validation errors
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e)
        )
    except Exception as e:
        # Log the actual error in production
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while creating the booking"
        )
