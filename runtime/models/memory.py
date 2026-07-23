"""Memory schema ORM models for memory profiles, policies, and consolidation jobs."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class MemoryProfile(Base):
    """ORM model for memory profiles."""
    __tablename__ = "memory_profiles"
    __table_args__ = {"schema": "memory"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255))
    memory_type = Column(String(100))
    retention_days = Column(Integer)
    metadata_json = Column("metadata", JSONB, default=dict)


class MemoryPolicy(Base):
    """ORM model for memory retention and consolidation policies."""
    __tablename__ = "memory_policies"
    __table_args__ = {"schema": "memory"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(
        UUID(as_uuid=True),
        ForeignKey("memory.memory_profiles.id", ondelete="CASCADE"),
    )
    importance_threshold = Column(Numeric(5, 2))
    consolidation_interval = Column(String(50))
    expiration_strategy = Column(String(100))
    configuration = Column(JSONB, default=dict)


class MemoryJob(Base):
    """ORM model for background memory consolidation and decay jobs."""
    __tablename__ = "memory_jobs"
    __table_args__ = {"schema": "memory"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("memory.memory_profiles.id"))
    job_type = Column(String(100))
    status = Column(String(30), index=True)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    result = Column(JSONB)
