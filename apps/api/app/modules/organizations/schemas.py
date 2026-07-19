from pydantic import BaseModel, Field
from typing import List, Optional


class OrganizationCreateRequest(BaseModel):
    name: str = Field(..., min_length=1)
    plan: Optional[str] = "Enterprise"
    display_name: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None


class Workspace(BaseModel):
    id: str
    name: str
    role: str


class OrganizationResponse(BaseModel):
    id: str
    name: str
    slug: str
    plan: str
    display_name: Optional[str] = None
    description: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    workspaces: List[Workspace]
    member_count: int = 0
    status: str = "ACTIVE"
    created_at: str = ""


class MemberResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    status: str
    last_active: str
