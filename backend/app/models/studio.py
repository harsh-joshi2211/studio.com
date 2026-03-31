from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict
from bson import ObjectId


class StudioBase(BaseModel):
    """Base studio model with common fields."""
    name: str
    type: str
    location: str
    price: int
    rating: float
    reviews: int
    images: List[str]
    badges: List[str]
    amenities: List[str]

    model_config = ConfigDict(from_attributes=True)


class StudioCreate(StudioBase):
    """Model for creating a new studio."""
    pass


class StudioUpdate(BaseModel):
    """Model for updating an existing studio (all fields optional)."""
    name: Optional[str] = None
    type: Optional[str] = None
    location: Optional[str] = None
    price: Optional[int] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    images: Optional[List[str]] = None
    badges: Optional[List[str]] = None
    amenities: Optional[List[str]] = None

    model_config = ConfigDict(from_attributes=True, extra="allow")


class Studio(StudioBase):
    """Studio model with ID. Converts MongoDB ObjectId to string."""
    id: str = Field(alias="_id")

    @field_validator("id", mode="before")
    @classmethod
    def convert_objectid_to_str(cls, v):
        """Convert ObjectId to string for JSON serialization."""
        if isinstance(v, ObjectId):
            return str(v)
        return v

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
