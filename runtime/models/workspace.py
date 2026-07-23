"""Workspace schema ORM models for workspaces and projects."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class Workspace(Base):
    """ORM model for tenant workspaces."""
    __tablename__ = "workspaces"
    __table_args__ = {"schema": "workspace"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(
        UUID(as_uuid=True),
        ForeignKey("identity.tenants.id"),
        nullable=False,
        index=True,
    )
    name = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False)
    description = Column(Text)
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class Project(Base):
    """ORM model for workspace projects."""
    __tablename__ = "projects"
    __table_args__ = {"schema": "workspace"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(
        UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"), nullable=False
    )
    name = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(String(30), default="ACTIVE")
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
