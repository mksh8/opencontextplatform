from pydantic import BaseModel
from typing import List, Optional

class RoleResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    permissions: List[str]
    
    class Config:
        from_attributes = True

class RoleCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None
    permissions: List[str]
