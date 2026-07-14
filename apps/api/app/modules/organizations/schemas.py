from pydantic import BaseModel
from typing import List


class Workspace(BaseModel):
    id: str
    name: str
    role: str


class OrganizationResponse(BaseModel):
    id: str
    name: str
    slug: str
    plan: str
    workspaces: List[Workspace]


class MemberResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    status: str
    last_active: str
