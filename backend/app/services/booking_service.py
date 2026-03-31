from datetime import datetime, timezone, timedelta
from typing import List, Optional
from bson import ObjectId
from app.models.booking import Booking, BookingCreate


class BookingService:
    """Business logic for booking operations."""

    @staticmethod
    async def create_booking(db, booking: BookingCreate) -> Booking:
        """
        Create a new booking with validation.

        Validates:
        - booking_date is not in the past
        - referenced studio exists
        - (Could add booking conflict detection in future)

        Args:
            db: Motor database connection
            booking: BookingCreate model with booking data

        Returns:
            Created Booking object with generated ID and timestamp

        Raises:
            ValueError: If validation fails (past date or studio not found)
        """
        # Validate: no past dates (use current UTC time)
        now = datetime.now(timezone.utc)
        # Ensure booking_date is timezone-aware
        if booking.booking_date.tzinfo is None:
            booking_date_aware = booking.booking_date.replace(tzinfo=timezone.utc)
        else:
            booking_date_aware = booking.booking_date

        if booking_date_aware < now:
            raise ValueError("Cannot book a past date")

        # Check if studio exists
        try:
            oid = ObjectId(booking.studio_id)
            studio = await db.studios.find_one({"_id": oid})
            if not studio:
                raise ValueError("Studio not found")
        except Exception:
            raise ValueError("Invalid studio ID")

        # Optional: Check for booking conflicts (e.g., same studio & time slot +/- some buffer)
        # For now, allow multiple bookings at same time - could add logic here

        # Insert booking with created_at timestamp
        booking_data = booking.model_dump(by_alias=True)
        booking_data["created_at"] = datetime.now(timezone.utc)

        result = await db.bookings.insert_one(booking_data)
        created = await db.bookings.find_one({"_id": result.inserted_id})
        return Booking(**created)

    @staticmethod
    async def get_studio_bookings(db, studio_id: str, include_past: bool = False) -> List[Booking]:
        """
        Retrieve bookings for a specific studio.

        Args:
            db: Motor database connection
            studio_id: String representation of MongoDB ObjectId
            include_past: If False, only returns future bookings

        Returns:
            List of Booking objects
        """
        try:
            oid = ObjectId(studio_id)
            query = {"studio_id": studio_id}
            if not include_past:
                now = datetime.now(timezone.utc)
                query["booking_date"] = {"$gte": now}

            cursor = db.bookings.find(query).sort("booking_date", 1)
            bookings = [Booking(**booking) async for booking in cursor]
            return bookings
        except Exception:
            return []

    @staticmethod
    async def get_booking(db, booking_id: str) -> Optional[Booking]:
        """
        Retrieve a single booking by ID.

        Args:
            db: Motor database connection
            booking_id: String representation of MongoDB ObjectId

        Returns:
            Booking object if found, None otherwise
        """
        try:
            oid = ObjectId(booking_id)
            booking_data = await db.bookings.find_one({"_id": oid})
            if booking_data:
                return Booking(**booking_data)
            return None
        except Exception:
            return None

    @staticmethod
    async def cancel_booking(db, booking_id: str) -> bool:
        """
        Delete/cancel a booking.

        Args:
            db: Motor database connection
            booking_id: String representation of MongoDB ObjectId

        Returns:
            True if deleted, False if not found
        """
        try:
            oid = ObjectId(booking_id)
            result = await db.bookings.delete_one({"_id": oid})
            return result.deleted_count > 0
        except Exception:
            return False
