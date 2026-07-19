import uuid
from sqlalchemy import Column, String, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class Category(Base):
    __tablename__ = "categories"
    __table_args__ = {"schema": "marketplace"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), unique=True)
    description = Column(Text)


class Item(Base):
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
    __tablename__ = "installations"
    __table_args__ = {"schema": "marketplace"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    item_id = Column(UUID(as_uuid=True), ForeignKey("marketplace.items.id"))
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    installed_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    installed_at = Column(DateTime(timezone=True), server_default=func.now())
