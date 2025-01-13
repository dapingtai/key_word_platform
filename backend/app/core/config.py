from pydantic_settings import BaseSettings, SettingsConfigDict
from enum import Enum
from functools import lru_cache

class EnvironmentEnum(str, Enum):
    SIT = "sit"
    UAT = "uat"
    PROD = "prod"

class Settings(BaseSettings):
    APP_NAME: str = "FastAPI App"
    ENVIRONMENT: EnvironmentEnum = EnvironmentEnum.SIT
    DEBUG: bool = False
    
    # Add environment-specific configurations
    model_config = SettingsConfigDict(env_file=".env.example", env_file_encoding="utf-8")

@lru_cache()
def get_settings() -> Settings:
    return Settings()