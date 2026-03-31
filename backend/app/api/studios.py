from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from app.models.studio import Studio
from app.services.studio_service import StudioService
from app.core.database import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter(prefix="/studios", tags=["studios"])


@router.get("/", response_model=list[Studio])
async def list_studios(
    type: Optional[str] = Query(None, description="Filter by studio type (e.g., Recording, Dance, Podcast)"),
    location: Optional[str] = Query(None, description="Filter by location (case-insensitive partial match)"),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> list[Studio]:
    """
    Retrieve all studios with optional filtering.

    Query Parameters:
        type: Filter by exact studio type match
        location: Case-insensitive partial match on location field

    Returns:
        List of Studio objects matching the filters
    """
    return await StudioService.get_all_studios(db, type_filter=type, location_filter=location)


@router.get("/{studio_id}", response_model=Studio)
async def get_studio(
    studio_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Studio:
    """
    Retrieve a single studio by ID.

    Path Parameters:
        studio_id: MongoDB ObjectId as string

    Raises:
        HTTPException 404: If studio not found
        HTTPException 400: Invalid studio ID format

    Returns:
        Studio object
    """
    studio = await StudioService.get_studio_by_id(db, studio_id)
    if not studio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Studio not found"
        )
    return studio
