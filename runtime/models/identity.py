"""Identity schema ORM models for organizations, tenants, users, roles, and permissions."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class Organization(Base):
    """ORM model for top-level organizations."""
    __tablename__ = "organizations"
    __table_args__ = {"schema": "identity"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(100), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    display_name = Column(String(255))
    description = Column(Text)
    website = Column(String(255))
    industry = Column(String(100))
    status = Column(String(30), default="ACTIVE")
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    deleted_at = Column(DateTime(timezone=True))


class Tenant(Base):
    """ORM model for multi-tenant account containers."""
    __tablename__ = "tenants"
    __table_args__ = {"schema": "identity"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(
        UUID(as_uuid=True), ForeignKey("identity.organizations.id"), nullable=False
    )
    code = Column(String(100), nullable=False)
    name = Column(String(255), nullable=False)
    status = Column(String(30), default="ACTIVE")
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class User(Base):
    """ORM model for platform users."""
    __tablename__ = "users"
    __table_args__ = {"schema": "identity"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(320), nullable=False, unique=True, index=True)
    password_hash = Column(Text, nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    display_name = Column(String(255))
    full_name = Column(String(255))
    status = Column(String(30), default="ACTIVE")
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class Role(Base):
    """ORM model for RBAC roles."""
    __tablename__ = "roles"
    __table_args__ = {"schema": "identity"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(Text)


class Permission(Base):
    """ORM model for fine-grained permissions."""
    __tablename__ = "permissions"
    __table_args__ = {"schema": "identity"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(200), unique=True, nullable=False)
    resource = Column(String(100), nullable=False)
    action = Column(String(100), nullable=False)
    description = Column(Text)


class RolePermission(Base):
    """ORM model for role and permission mappings."""
    __tablename__ = "role_permissions"
    __table_args__ = {"schema": "identity"}

    role_id = Column(
        UUID(as_uuid=True),
        ForeignKey("identity.roles.id", ondelete="CASCADE"),
        primary_key=True,
    )
    permission_id = Column(
        UUID(as_uuid=True),
        ForeignKey("identity.permissions.id", ondelete="CASCADE"),
        primary_key=True,
    )


class RoleAssignment(Base):
    """ORM model for role assignments to users across scopes."""
    __tablename__ = "role_assignments"
    __table_args__ = {"schema": "identity"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("identity.users.id", ondelete="CASCADE"),
        nullable=False,
    )
    role_id = Column(
        UUID(as_uuid=True),
        ForeignKey("identity.roles.id", ondelete="CASCADE"),
        nullable=False,
    )
    scope_type = Column(String(50), nullable=False)
    scope_id = Column(UUID(as_uuid=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
