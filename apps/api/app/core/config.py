from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "OpenContextPlatform API"
    VERSION: str = "1.2.0"
    API_V1_STR: str = "/api/v1"

    class Config:
        env_file = ".env"


settings = Settings()
