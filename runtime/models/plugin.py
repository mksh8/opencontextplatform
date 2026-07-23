"""Plugin schema ORM models for plugins, versions, and dependencies."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class Plugin(Base):
    """ORM model for platform plugins."""
    __tablename__ = "plugins"
    __table_args__ = {"schema": "plugin"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), index=True)
    plugin_type = Column(String(100))
    version = Column(String(50))
    configuration = Column(JSONB, default=dict)


class PluginVersion(Base):
    """ORM model for plugin versions."""
    __tablename__ = "plugin_versions"
    __table_args__ = {"schema": "plugin"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    plugin_id = Column(
        UUID(as_uuid=True), ForeignKey("plugin.plugins.id", ondelete="CASCADE")
    )
    version = Column(String(50))
    artifact_uri = Column(Text)
    released_at = Column(DateTime(timezone=True), server_default=func.now())


class PluginDependency(Base):
    """ORM model for plugin version dependency graph."""
    __tablename__ = "plugin_dependencies"
    __table_args__ = {"schema": "plugin"}

    plugin_version_id = Column(
        UUID(as_uuid=True),
        ForeignKey("plugin.plugin_versions.id", ondelete="CASCADE"),
        primary_key=True,
    )
    depends_on_plugin_version_id = Column(
        UUID(as_uuid=True),
        ForeignKey("plugin.plugin_versions.id"),
        primary_key=True,
    )
