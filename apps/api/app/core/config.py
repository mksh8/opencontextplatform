"""Application settings configuration using Pydantic Settings."""

from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Core application settings and environment configurations."""
    PROJECT_NAME: str = "OpenContextPlatform API"
    VERSION: str = "1.2.0"
    API_V1_STR: str = "/api/v1"

    # Startup Initialization Settings
    SUPER_ORG_NAME: Optional[str] = None
    SUPER_TENANT_NAME: Optional[str] = None
    SUPER_ADMIN_EMAIL: Optional[str] = None
    SUPER_ADMIN_PASSWORD: Optional[str] = None

    class Config:
        """Pydantic config settings."""
        env_file = ".env"


settings = Settings()
