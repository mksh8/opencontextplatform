from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime

class AuditLogResponse(BaseModel):
    id: str
    actor: str
    action: str
    target: str
    status: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime
    
    class Config:
        from_attributes = True
