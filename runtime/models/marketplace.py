"""Marketplace schema ORM models for categories, items, and installations."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class Category(Base):
    """ORM model for marketplace categories."""
    __tablename__ = "categories"
    __table_args__ = {"schema": "marketplace"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), unique=True)
    description = Column(Text)


class Item(Base):
    """ORM model for published marketplace items (plugins, tools, agents)."""
    __tablename__ = "items"
    __table_args__ = {"schema": "marketplace"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category_id = Column(UUID(as_uuid=True), ForeignKey("marketplace.categories.id"))
    publisher_tenant_id = Column(UUID(as_uuid=True), ForeignKey("identity.tenants.id"))
    name = Column(String(255))
    item_type = Column(String(100), index=True)
    version = Column(String(50))
    metadata_json = Column("metadata", JSONB, default=dict)


class Installation(Base):
    """ORM model for installed marketplace items within workspaces."""
    __tablename__ = "installations"
    __table_args__ = {"schema": "marketplace"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    item_id = Column(UUID(as_uuid=True), ForeignKey("marketplace.items.id"))
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    installed_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    installed_at = Column(DateTime(timezone=True), server_default=func.now())
