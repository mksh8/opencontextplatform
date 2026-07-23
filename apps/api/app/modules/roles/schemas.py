"""Roles Pydantic schemas."""

from typing import List, Optional

from pydantic import BaseModel


class RoleResponse(BaseModel):
    """Role definition response schema."""
    id: str
    name: str
    description: Optional[str] = None
    permissions: List[str]

    class Config:
        """Pydantic config."""
        from_attributes = True


class RoleCreateRequest(BaseModel):
    """Role creation payload schema."""
    name: str
    description: Optional[str] = None
    permissions: List[str]
