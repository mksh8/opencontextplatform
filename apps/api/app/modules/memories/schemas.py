"""Memories Pydantic schemas."""

from pydantic import BaseModel


class MemoryNode(BaseModel):
    """Memory node schema."""
    id: str
    content: str
    type: str
    timestamp: str
