"""Audit Log Pydantic schemas."""

from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel


class AuditLogResponse(BaseModel):
    """Schema for audit log record response."""
    id: str
    actor: str
    action: str
    target: str
    status: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime

    class Config:
        """Pydantic config."""
        from_attributes = True
