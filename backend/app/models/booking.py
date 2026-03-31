from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from bson import ObjectId
from zoneinfo import ZoneInfo


class BookingBase(BaseModel):
    """Base booking model with required fields."""
    studio_id: str
    booking_date: datetime
    user_email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class BookingCreate(BookingBase):
    """Model for creating a new booking."""
    pass


class Booking(BookingBase):
    """Booking model with ID and timestamp."""
    id: str = Field(alias="_id")
    created_at: datetime = Field(default_factory=lambda: datetime.now(ZoneInfo("UTC")))

    @field_validator("id", mode="before")
    @classmethod
    def convert_objectid_to_str(cls, v):
        """Convert ObjectId to string for JSON serialization."""
        if isinstance(v, ObjectId):
            return str(v)
        return v

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
