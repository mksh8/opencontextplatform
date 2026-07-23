"""API Keys Pydantic schemas."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ApiKeyCreateRequest(BaseModel):
    """Schema for creating a new API key."""
    name: str


class ApiKeyResponse(BaseModel):
    """Schema for API key metadata response."""
    id: str
    name: str
    prefix: str
    created_at: datetime
    last_used: Optional[datetime] = None
    is_active: bool

    class Config:
        """Pydantic config."""
        from_attributes = True


class ApiKeyCreateResponse(ApiKeyResponse):
    """Schema for newly created API key response, including secret key once."""
    api_key: str  # Only returned once
