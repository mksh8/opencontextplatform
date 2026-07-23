"""Providers Pydantic schemas."""

from typing import Optional

from pydantic import BaseModel


class Provider(BaseModel):
    """AI Provider model schema."""
    id: str
    name: str
    url: str
    model: str
    status: str
    usage: str


class ProviderCreateRequest(BaseModel):
    """AI Provider registration request schema."""
    name: str
    provider_type: str
    api_key: str
    base_url: Optional[str] = None
