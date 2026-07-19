from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ApiKeyCreateRequest(BaseModel):
    name: str

class ApiKeyResponse(BaseModel):
    id: str
    name: str
    prefix: str
    created_at: datetime
    last_used: Optional[datetime] = None
    is_active: bool
    
    class Config:
        from_attributes = True

class ApiKeyCreateResponse(ApiKeyResponse):
    api_key: str  # Only returned once
