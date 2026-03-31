from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    mongodb_uri: str = "mongodb://localhost:27017"
    db_name: str = "studio_booking"
    environment: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()
