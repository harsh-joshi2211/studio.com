from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import studios, bookings
from app.core.config import settings
from app.core.database import init_db, client
import logging

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI lifespan context manager.
    Handles startup and shutdown events.
    """
    # Startup
    logger.info(f"Starting Studio Booking API in {settings.environment} mode")
    logger.info("Initializing database indexes...")
    try:
        await init_db()
        logger.info("Database indexes initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        raise

    yield

    # Shutdown
    logger.info("Shutting down Studio Booking API")
    client.close()
    logger.info("Database connection closed")


app = FastAPI(
    title="Studio Booking API",
    version="1.0.0",
    description="Backend API for studio.com - studio booking platform",
    lifespan=lifespan
)

# Configure CORS for frontend development server
# Allow requests from Vite dev server (localhost:8080)
# In production, restrict to actual frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",  # Vite default (fallback)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(studios.router)
app.include_router(bookings.router)


@app.get("/health", tags=["health"])
async def health_check() -> dict:
    """
    Health check endpoint for load balancers and monitoring.
    """
    return {"status": "healthy", "service": "studio-booking-api"}


@app.get("/", tags=["root"])
async def root() -> dict:
    """Root endpoint with API information."""
    return {
        "name": "Studio Booking API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }
