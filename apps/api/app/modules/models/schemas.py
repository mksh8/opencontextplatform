"""Models Pydantic schemas."""

from typing import List

from pydantic import BaseModel


class ModelItem(BaseModel):
    """AI Model item metadata schema."""
    id: str
    name: str
    provider: str
    type: str
    status: str
    last_used: str


class ModelListResponse(BaseModel):
    """AI Model list response container."""
    models: List[ModelItem]
