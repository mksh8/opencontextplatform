"""System schema ORM models for feature flags, settings, configuration profiles, maintenance, and health."""

import uuid

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class FeatureFlag(Base):
    """ORM model for system and workspace feature flags."""
    __tablename__ = "feature_flags"
    __table_args__ = {"schema": "system"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    flag_key = Column(String(200), nullable=False, index=True)
    flag_name = Column(String(255), nullable=False)
    description = Column(Text)
    enabled = Column(Boolean, default=False)
    rollout_percentage = Column(Numeric(5, 2), default=100)
    metadata_json = Column("metadata", JSONB, default=dict)
    created_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class SystemSetting(Base):
    """ORM model for system and tenant key-value configuration settings."""
    __tablename__ = "system_settings"
    __table_args__ = {"schema": "system"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    scope = Column(String(30), nullable=False)
    tenant_id = Column(UUID(as_uuid=True), ForeignKey("identity.tenants.id"))
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    setting_key = Column(String(255), nullable=False, index=True)
    setting_value = Column(JSONB, nullable=False)
    is_secret = Column(Boolean, default=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    updated_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class ConfigurationProfile(Base):
    """ORM model for versioned configuration profiles."""
    __tablename__ = "configuration_profiles"
    __table_args__ = {"schema": "system"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    profile_name = Column(String(255), nullable=False)
    description = Column(Text)
    configuration = Column(JSONB, nullable=False)
    version = Column(Integer, default=1)
    is_default = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class MaintenanceWindow(Base):
    """ORM model for scheduled system maintenance windows."""
    __tablename__ = "maintenance_windows"
    __table_args__ = {"schema": "system"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    title = Column(String(255))
    description = Column(Text)
    starts_at = Column(DateTime(timezone=True))
    ends_at = Column(DateTime(timezone=True))
    maintenance_type = Column(String(100))
    created_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))


class SystemHealth(Base):
    """ORM model for system component health check records."""
    __tablename__ = "system_health"
    __table_args__ = {"schema": "system"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    component_name = Column(String(255), index=True)
    component_type = Column(String(100))
    status = Column(String(30))
    health_score = Column(Numeric(5, 2))
    details = Column(JSONB)
    checked_at = Column(DateTime(timezone=True), server_default=func.now())
