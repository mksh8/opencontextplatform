import uuid
from sqlalchemy import Column, String, Text, ForeignKey, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class LineageJob(Base):
    __tablename__ = "lineage_jobs"
    __table_args__ = {"schema": "lineage"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"), nullable=False)
    datasource_id = Column(UUID(as_uuid=True), ForeignKey("datasource.datasources.id"))
    job_name = Column(String(255), nullable=False)
    engine = Column(String(100))
    status = Column(String(30), default="PENDING", index=True)
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    metadata_json = Column("metadata", JSONB, default=dict)


class LineageSnapshot(Base):
    __tablename__ = "lineage_snapshots"
    __table_args__ = {"schema": "lineage"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lineage_job_id = Column(UUID(as_uuid=True), ForeignKey("lineage.lineage_jobs.id", ondelete="CASCADE"))
    snapshot_version = Column(Integer, nullable=False)
    graph_hash = Column(String(128))
    snapshot_data = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class MetadataVersion(Base):
    __tablename__ = "metadata_versions"
    __table_args__ = {"schema": "lineage"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(UUID(as_uuid=True), nullable=False)
    version = Column(Integer, nullable=False)
    change_type = Column(String(50))
    changed_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    change_summary = Column(Text)
    metadata_json = Column("metadata", JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
