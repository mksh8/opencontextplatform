"""Monitoring schema ORM models for events, metrics, distributed traces, and LLM usage telemetry."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class Event(Base):
    """ORM model for system monitoring events."""
    __tablename__ = "events"
    __table_args__ = {"schema": "monitoring"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    event_type = Column(String(100), index=True)
    source = Column(String(100))
    severity = Column(String(30))
    payload = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Metric(Base):
    """ORM model for time-series metrics."""
    __tablename__ = "metrics"
    __table_args__ = {"schema": "monitoring"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    metric_name = Column(String(255))
    metric_value = Column(Numeric(18, 6))
    labels = Column(JSONB, default=dict)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())


class Trace(Base):
    """ORM model for distributed OpenTelemetry traces."""
    __tablename__ = "traces"
    __table_args__ = {"schema": "monitoring"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trace_id = Column(String(128), unique=True)
    span_id = Column(String(128))
    parent_span_id = Column(String(128))
    service_name = Column(String(255))
    operation_name = Column(String(255))
    duration_ms = Column(Integer)
    status = Column(String(30))
    started_at = Column(DateTime(timezone=True))


class LLMUsage(Base):
    """ORM model for detailed LLM token and cost telemetry."""
    __tablename__ = "llm_usage"
    __table_args__ = {"schema": "monitoring"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_run_id = Column(UUID(as_uuid=True), ForeignKey("agent.agent_runs.id"))
    provider_config_id = Column(
        UUID(as_uuid=True), ForeignKey("provider.provider_configs.id")
    )
    model_name = Column(String(255), index=True)
    prompt_tokens = Column(Integer)
    completion_tokens = Column(Integer)
    total_tokens = Column(Integer)
    estimated_cost = Column(Numeric(12, 6))
    latency_ms = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
