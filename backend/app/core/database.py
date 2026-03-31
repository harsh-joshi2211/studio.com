from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings
from typing import AsyncGenerator

# Global client instance (Motor manages connection pooling)
client: AsyncIOMotorClient = AsyncIOMotorClient(settings.mongodb_uri)
database = client[settings.db_name]


async def get_database() -> AsyncGenerator:
    """
    Dependency that yields the database connection.
    Used with FastAPI's Depends() for DI.
    """
    try:
        yield database
    finally:
        # Motor handles connection lifecycle; no explicit cleanup needed per request
        pass


async def init_db() -> None:
    """Initialize database indexes on startup."""
    # Create indexes for optimal query performance
    await database.studios.create_index("type")
    await database.studios.create_index("location")
    await database.studios.create_index([("type", 1), ("location", 1)])
    await database.bookings.create_index("studio_id")
    await database.bookings.create_index("booking_date")
    await database.bookings.create_index([("studio_id", 1), ("booking_date", 1)])
    await database.users.create_index("email", unique=True)