"""Catalog schema ORM models for catalogs, databases, schemas, tables, columns, and views."""

import uuid

from sqlalchemy import BigInteger, Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class Catalog(Base):
    """ORM model for data catalogs."""
    __tablename__ = "catalogs"
    __table_args__ = {"schema": "catalog"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CatalogDatabase(Base):
    """ORM model for catalog database instances."""
    __tablename__ = "catalog_databases"
    __table_args__ = {"schema": "catalog"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    catalog_id = Column(
        UUID(as_uuid=True),
        ForeignKey("catalog.catalogs.id", ondelete="CASCADE"),
        nullable=False,
    )
    datasource_id = Column(UUID(as_uuid=True), ForeignKey("datasource.datasources.id"))
    name = Column(String(255), nullable=False)
    engine = Column(String(100))
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CatalogSchema(Base):
    """ORM model for catalog database schemas."""
    __tablename__ = "catalog_schemas"
    __table_args__ = {"schema": "catalog"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    database_id = Column(
        UUID(as_uuid=True),
        ForeignKey("catalog.catalog_databases.id", ondelete="CASCADE"),
        nullable=False,
    )
    name = Column(String(255), nullable=False)
    metadata_json = Column("metadata", JSONB, default=dict)


class CatalogTable(Base):
    """ORM model for catalog database tables."""
    __tablename__ = "catalog_tables"
    __table_args__ = {"schema": "catalog"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    schema_id = Column(
        UUID(as_uuid=True),
        ForeignKey("catalog.catalog_schemas.id", ondelete="CASCADE"),
        nullable=False,
    )
    name = Column(String(255), nullable=False, index=True)
    table_type = Column(String(50))
    description = Column(Text)
    row_count = Column(BigInteger)
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CatalogColumn(Base):
    """ORM model for catalog table columns."""
    __tablename__ = "catalog_columns"
    __table_args__ = {"schema": "catalog"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    table_id = Column(
        UUID(as_uuid=True),
        ForeignKey("catalog.catalog_tables.id", ondelete="CASCADE"),
        nullable=False,
    )
    name = Column(String(255), nullable=False, index=True)
    data_type = Column(String(100), nullable=False)
    ordinal_position = Column(Integer)
    nullable = Column(Boolean, default=True)
    is_primary_key = Column(Boolean, default=False)
    metadata_json = Column("metadata", JSONB, default=dict)


class CatalogView(Base):
    """ORM model for catalog database views."""
    __tablename__ = "catalog_views"
    __table_args__ = {"schema": "catalog"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    schema_id = Column(
        UUID(as_uuid=True), ForeignKey("catalog.catalog_schemas.id"), nullable=False
    )
    name = Column(String(255), nullable=False)
    definition = Column(Text)
