from typing import List, Optional
from bson import ObjectId
from app.models.studio import Studio, StudioCreate, StudioUpdate


class StudioService:
    """Business logic for studio operations."""

    @staticmethod
    async def get_all_studios(
        db,
        type_filter: Optional[str] = None,
        location_filter: Optional[str] = None
    ) -> List[Studio]:
        """
        Retrieve all studios with optional filters.

        Args:
            db: Motor database connection
            type_filter: Optional studio type to filter by (exact match)
            location_filter: Optional location string for regex case-insensitive match

        Returns:
            List of Studio objects
        """
        query = {}
        if type_filter:
            query["type"] = type_filter
        if location_filter:
            query["location"] = {"$regex": location_filter, "$options": "i"}
        cursor = db.studios.find(query)
        studios = [Studio(**studio) async for studio in cursor]
        return studios

    @staticmethod
    async def get_studio_by_id(db, studio_id: str) -> Optional[Studio]:
        """
        Retrieve a single studio by ID.

        Args:
            db: Motor database connection
            studio_id: String representation of MongoDB ObjectId

        Returns:
            Studio object if found, None otherwise
        """
        try:
            oid = ObjectId(studio_id)
            studio_data = await db.studios.find_one({"_id": oid})
            if studio_data:
                return Studio(**studio_data)
            return None
        except Exception:
            # Invalid ObjectId format
            return None

    @staticmethod
    async def create_studio(db, studio: StudioCreate) -> Studio:
        """
        Create a new studio.

        Args:
            db: Motor database connection
            studio: StudioCreate model with studio data

        Returns:
            Created Studio object with generated ID
        """
        # Convert Pydantic model to dict, excluding unset fields
        studio_data = studio.model_dump(by_alias=True)
        result = await db.studios.insert_one(studio_data)
        created = await db.studios.find_one({"_id": result.inserted_id})
        return Studio(**created)

    @staticmethod
    async def update_studio(db, studio_id: str, updates: StudioUpdate) -> Optional[Studio]:
        """
        Update an existing studio.

        Args:
            db: Motor database connection
            studio_id: String representation of MongoDB ObjectId
            updates: StudioUpdate model with fields to update

        Returns:
            Updated Studio object if found, None otherwise
        """
        try:
            oid = ObjectId(studio_id)
            # Exclude None values and unset fields
            update_data = {k: v for k, v in updates.model_dump(exclude_unset=True).items() if v is not None}
            if not update_data:
                # No updates provided, just fetch and return
                return await StudioService.get_studio_by_id(db, studio_id)

            await db.studios.update_one({"_id": oid}, {"$set": update_data})
            return await StudioService.get_studio_by_id(db, studio_id)
        except Exception:
            return None

    @staticmethod
    async def delete_studio(db, studio_id: str) -> bool:
        """
        Delete a studio.

        Args:
            db: Motor database connection
            studio_id: String representation of MongoDB ObjectId

        Returns:
            True if deleted, False if not found
        """
        try:
            oid = ObjectId(studio_id)
            result = await db.studios.delete_one({"_id": oid})
            return result.deleted_count > 0
        except Exception:
            return False
