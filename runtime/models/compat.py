import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, ForeignKey, JSON, DateTime, Boolean
from runtime.models.base import Base

class ApiKey(Base):
    __tablename__ = "api_keys"
    __table_args__ = {"schema": "system"}
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, index=True)
    name = Column(String)
    key_hash = Column(String)
    prefix = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_used = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)

class BillingEvent(Base):
    __tablename__ = "billing_events"
    __table_args__ = {"schema": "system"}
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, index=True)
    metric = Column(String, index=True)  # e.g., 'tokens', 'storage', 'queries'
    quantity = Column(Integer, default=0)
    timestamp = Column(DateTime, default=datetime.utcnow)

class AuditLogEntry(Base):
    __tablename__ = "audit_logs"
    __table_args__ = {"schema": "system"}
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, index=True)
    actor = Column(String)
    action = Column(String)
    target = Column(String)
    status = Column(String)
    details = Column(JSON)
    timestamp = Column(DateTime, default=datetime.utcnow)
