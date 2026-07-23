"""Provider schema ORM models for provider types and provider configs."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class ProviderType(Base):
    """ORM model for AI model provider types."""
    __tablename__ = "provider_types"
    __table_args__ = {"schema": "provider"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(100), unique=True, nullable=False)
    name = Column(String(255), nullable=False)


class ProviderConfig(Base):
    """ORM model for workspace provider configurations."""
    __tablename__ = "provider_configs"
    __table_args__ = {"schema": "provider"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(
        UUID(as_uuid=True),
        ForeignKey("workspace.workspaces.id"),
        nullable=False,
        index=True,
    )
    provider_type_id = Column(
        UUID(as_uuid=True),
        ForeignKey("provider.provider_types.id"),
        nullable=False,
    )
    name = Column(String(255), nullable=False)
    endpoint = Column(String(500))
    encrypted_api_key = Column(Text)
    configuration = Column(JSONB, default=dict)
    status = Column(String(30), default="ACTIVE")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
