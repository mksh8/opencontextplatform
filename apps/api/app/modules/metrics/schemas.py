"""Metrics Pydantic schemas."""

from typing import Dict

from pydantic import BaseModel


class MetricsResponse(BaseModel):
    """Metrics payload response schema."""
    total_tokens: str
    total_queries: str
    storage_used: str
    estimated_cost: str
    trends: Dict[str, str]
