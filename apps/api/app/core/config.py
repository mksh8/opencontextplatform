from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "OpenContextPlatform API"
    VERSION: str = "1.2.0"
    API_V1_STR: str = "/api/v1"
    
    # Startup Initialization Settings
    SUPER_ORG_NAME: Optional[str] = None
    SUPER_TENANT_NAME: Optional[str] = None
    SUPER_ADMIN_EMAIL: Optional[str] = None
    SUPER_ADMIN_PASSWORD: Optional[str] = None

    class Config:
        env_file = ".env"


settings = Settings()
