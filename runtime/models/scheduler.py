"""Scheduler schema ORM models for job definitions, runs, and background tasks."""

import uuid

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, SmallInteger, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class JobDefinition(Base):
    """ORM model for cron job definitions."""
    __tablename__ = "job_definitions"
    __table_args__ = {"schema": "scheduler"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    job_name = Column(String(255), nullable=False)
    job_type = Column(String(100))
    cron_expression = Column(String(100))
    configuration = Column(JSONB, default=dict)
    enabled = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class JobRun(Base):
    """ORM model for scheduled job execution runs."""
    __tablename__ = "job_runs"
    __table_args__ = {"schema": "scheduler"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_definition_id = Column(
        UUID(as_uuid=True),
        ForeignKey("scheduler.job_definitions.id", ondelete="CASCADE"),
    )
    status = Column(String(30), index=True)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    execution_log = Column(Text)
    metadata_json = Column("metadata", JSONB, default=dict)


class BackgroundTask(Base):
    """ORM model for asynchronous background worker tasks."""
    __tablename__ = "background_tasks"
    __table_args__ = {"schema": "scheduler"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    task_name = Column(String(255))
    task_type = Column(String(100))
    status = Column(String(30), index=True)
    priority = Column(SmallInteger, default=5)
    payload = Column(JSONB)
    result = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
