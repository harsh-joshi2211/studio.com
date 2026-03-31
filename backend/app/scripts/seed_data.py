"""
Data seeding script for studio booking API.
Populates the database with initial studio data from the frontend mock data.
Run with: python -m app.scripts.seed_data
"""

import asyncio
import sys
from pathlib import Path

# Add parent directory to path for imports when running as script
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from app.core.database import database
from app.services.studio_service import StudioService
from app.models.studio import StudioCreate


# Mock studio data - exact copy from src/data/studios.ts
STUDIOS_DATA = [
    {
        "id": "1",
        "name": "Sunset Sound Studios",
        "type": "Recording",
        "location": "Los Angeles, CA",
        "price": 150,
        "rating": 4.9,
        "reviews": 128,
        "images": [
            "https://images.unsplash.com/photo-1598488035139-bdbb2231cb64?w=800&q=80",
            "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=800&q=80",
            "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&q=80",
        ],
        "badges": ["Top Rated", "Instant Book"],
        "amenities": ["Sound System", "Microphones", "WiFi", "Monitors", "Camera Gear"],
    },
    {
        "id": "2",
        "name": "Neon Dance Loft",
        "type": "Dance",
        "location": "New York, NY",
        "price": 80,
        "rating": 4.7,
        "reviews": 95,
        "images": [
            "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&q=80",
            "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
        ],
        "badges": ["Top Rated"],
        "amenities": ["Sound System", "Monitors", "WiFi"],
    },
    {
        "id": "3",
        "name": "Echo Podcast Hub",
        "type": "Podcast",
        "location": "Austin, TX",
        "price": 60,
        "rating": 4.8,
        "reviews": 72,
        "images": [
            "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&q=80",
            "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
        ],
        "badges": ["Instant Book"],
        "amenities": ["Microphones", "Sound System", "WiFi", "Monitors"],
    },
    {
        "id": "4",
        "name": "Aperture Photo Studio",
        "type": "Photo",
        "location": "San Francisco, CA",
        "price": 120,
        "rating": 4.6,
        "reviews": 54,
        "images": [
            "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=800&q=80",
            "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80",
        ],
        "badges": ["Top Rated"],
        "amenities": ["Camera Gear", "Monitors", "WiFi"],
    },
    {
        "id": "5",
        "name": "Rhythm Room",
        "type": "Rehearsal",
        "location": "Nashville, TN",
        "price": 45,
        "rating": 4.5,
        "reviews": 203,
        "images": [
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
            "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
        ],
        "badges": ["Instant Book"],
        "amenities": ["Sound System", "Microphones", "WiFi"],
    },
    {
        "id": "6",
        "name": "Frame & Light Studio",
        "type": "Film",
        "location": "Chicago, IL",
        "price": 200,
        "rating": 4.9,
        "reviews": 41,
        "images": [
            "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
        ],
        "badges": ["Top Rated", "Instant Book"],
        "amenities": ["Camera Gear", "Sound System", "Monitors", "WiFi", "Microphones"],
    },
]


async def seed() -> None:
    """
    Populate the database with initial studio data.
    Skips seeding if studios already exist.
    """
    print("Starting database seeding...")

    # Check if studios already exist
    count = await database.studios.count_documents({})
    if count > 0:
        print(f"Database already has {count} studios. Skipping seeding.")
        return

    # Insert studios
    inserted_count = 0
    for studio_data in STUDIOS_DATA:
        # Remove the id field - MongoDB will generate _id
        studio_data_clean = {k: v for k, v in studio_data.items() if k != "id"}
        studio_create = StudioCreate(**studio_data_clean)
        try:
            await StudioService.create_studio(database, studio_create)
            inserted_count += 1
        except Exception as e:
            print(f"Error inserting studio '{studio_data.get('name')}': {e}")

    print(f"Seeding complete. Inserted {inserted_count} studios.")


if __name__ == "__main__":
    asyncio.run(seed())
