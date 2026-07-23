import uuid
from sqlalchemy import Column, String, Text, ForeignKey, Integer, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB, INET
from sqlalchemy.sql import func
from runtime.models.base import Base

class SecretStore(Base):
    __tablename__ = "secret_stores"
    __table_args__ = {"schema": "secrets"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    provider = Column(String(100), nullable=False)
    endpoint = Column(String(500))
    configuration = Column(JSONB, default=dict)
    status = Column(String(30), default="ACTIVE")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Secret(Base):
    __tablename__ = "secrets"
    __table_args__ = {"schema": "secrets"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    secret_store_id = Column(UUID(as_uuid=True), ForeignKey("secrets.secret_stores.id", ondelete="CASCADE"))
    secret_key = Column(String(255), nullable=False)
    encrypted_value = Column(Text, nullable=False)
    version = Column(Integer, default=1)
    rotation_enabled = Column(Boolean, default=False)
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class SecretAccessLog(Base):
    __tablename__ = "secret_access_logs"
    __table_args__ = {"schema": "secrets"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    secret_id = Column(UUID(as_uuid=True), ForeignKey("secrets.secrets.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    action = Column(String(50))
    ip_address = Column(INET)
    accessed_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
