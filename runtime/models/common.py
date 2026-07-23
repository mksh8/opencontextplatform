"""Common schema ORM models for status types, environments, severity levels, and audit events."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, SmallInteger, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class StatusType(Base):
    """ORM model for common status types."""
    __tablename__ = "status_types"
    __table_args__ = {"schema": "common"}

    code = Column(String(30), primary_key=True)
    description = Column(Text, nullable=False)


class Environment(Base):
    """ORM model for environment codes."""
    __tablename__ = "environments"
    __table_args__ = {"schema": "common"}

    code = Column(String(30), primary_key=True)
    description = Column(Text)


class SeverityLevel(Base):
    """ORM model for severity levels."""
    __tablename__ = "severity_levels"
    __table_args__ = {"schema": "common"}

    code = Column(String(30), primary_key=True)
    rank = Column(SmallInteger, nullable=False)


class AuditEvent(Base):
    """ORM model for common audit log events."""
    __tablename__ = "audit_events"
    __table_args__ = {"schema": "common"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(UUID(as_uuid=True), ForeignKey("identity.tenants.id"))
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(UUID(as_uuid=True), nullable=False)
    action = Column(String(50), nullable=False)
    old_value = Column(JSONB)
    new_value = Column(JSONB)
    changed_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    changed_at = Column(DateTime(timezone=True), server_default=func.now())
