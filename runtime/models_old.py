from sqlalchemy import Column, String, Integer, Text, ForeignKey, JSON, DateTime, Boolean
import uuid
from datetime import datetime
from runtime.db import Base

class Tenant(Base):
    __tablename__ = "tenants"
    
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    company_name = Column(String, index=True)
    industry = Column(String)
    team_size = Column(String)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String)
    tenant_id = Column(String, ForeignKey("tenants.id"), nullable=True)
    role_name = Column(String, default="viewer")

class ConnectorConfig(Base):
    __tablename__ = "connector_configs"
    
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), index=True)
    name = Column(String, nullable=False)
    connector_type = Column(String)
    credentials_json = Column(Text)

class ProviderConfig(Base):
    __tablename__ = "provider_configs"
    
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, ForeignKey("tenants.id"), index=True)
    name = Column(String, nullable=False)
    provider_type = Column(String)  # e.g., 'openai', 'anthropic', 'ollama'
    api_key_encrypted = Column(String)  # Note: should be encrypted in production
    status = Column(String, default="Active")
    models_json = Column(Text)  # List of models this provider supports

class ApiKey(Base):
    __tablename__ = "api_keys"
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
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, index=True)
    metric = Column(String, index=True)  # e.g., 'tokens', 'storage', 'queries'
    quantity = Column(Integer, default=0)
    timestamp = Column(DateTime, default=datetime.utcnow)

class Role(Base):
    __tablename__ = "roles"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    permissions = Column(JSON)  # List of string permissions

class AuditLogEntry(Base):
    __tablename__ = "audit_logs"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    tenant_id = Column(String, index=True)
    actor = Column(String)
    action = Column(String)
    target = Column(String)
    status = Column(String)
    details = Column(JSON)
    timestamp = Column(DateTime, default=datetime.utcnow)
