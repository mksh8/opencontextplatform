"""FastAPI main application entrypoint."""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from apps.api.app.api.v1.router import v1_router
from apps.api.app.core.config import settings
from apps.api.app.core.middleware import RateLimitMiddleware
import runtime.models  # pylint: disable=unused-import
from runtime.db import Base, engine
from runtime.init_db import init_database_schemas, seed_super_tenant

logger = logging.getLogger(__name__)

# Create tables if they don't exist
try:
    init_database_schemas(engine)
    Base.metadata.create_all(bind=engine)
    seed_super_tenant(engine)
except Exception as exc:
    logger.warning("Failed to create tables or seed super tenant: %s", exc)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Rate Limiting Middleware
app.add_middleware(RateLimitMiddleware, max_requests_per_minute=100)


@app.get("/")
def read_root():
    """Root endpoint health status."""
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
    }


# Include API v1 routers
app.include_router(v1_router, prefix=settings.API_V1_STR)
