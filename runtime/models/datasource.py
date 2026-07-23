import uuid
from sqlalchemy import Column, String, ForeignKey, Boolean, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class DatasourceType(Base):
    __tablename__ = "datasource_types"
    __table_args__ = {"schema": "datasource"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(100), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100))
    supports_catalog = Column(Boolean, default=True)
    supports_lineage = Column(Boolean, default=False)


class Datasource(Base):
    __tablename__ = "datasources"
    __table_args__ = {"schema": "datasource"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"), nullable=False, index=True)
    datasource_type_id = Column(UUID(as_uuid=True), ForeignKey("datasource.datasource_types.id"), nullable=False)
    name = Column(String(255), nullable=False)
    host = Column(String(255))
    port = Column(Integer)
    database_name = Column(String(255))
    status = Column(String(30), default="ACTIVE")
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
