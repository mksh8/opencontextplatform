"""Organizations Pydantic schemas."""

from typing import List, Optional

from pydantic import BaseModel, Field


class OrganizationCreateRequest(BaseModel):
    """Organization registration payload schema."""
    name: str = Field(..., min_length=1)
    plan: Optional[str] = "Enterprise"
    display_name: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    owner_name: str
    owner_email: str


class Workspace(BaseModel):
    """Workspace metadata schema."""
    id: str
    name: str
    role: str


class OrganizationResponse(BaseModel):
    """Organization metadata response schema."""
    id: str
    name: str
    slug: str
    plan: str
    display_name: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    workspaces: List[Workspace]
    tenant_count: int = 0
    member_count: int = 0
    status: str = "ACTIVE"
    created_at: str = ""


class MemberResponse(BaseModel):
    """Organization member schema."""
    id: str
    name: str
    email: str
    role: str
    status: str
    last_active: str


class TenantResponse(BaseModel):
    """Tenant summary schema."""
    id: str
    name: str
    code: str
    status: str
    created_at: str


class StatusUpdateRequest(BaseModel):
    """Status update payload schema."""
    status: str
