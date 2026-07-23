import uuid
from sqlalchemy import Column, String, Text, ForeignKey, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class ContextProfile(Base):
    __tablename__ = "context_profiles"
    __table_args__ = {"schema": "context"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), nullable=False)
    description = Column(Text)
    retrieval_strategy = Column(String(100))
    metadata_json = Column("metadata", JSONB, default=dict)


class ContextTemplate(Base):
    __tablename__ = "context_templates"
    __table_args__ = {"schema": "context"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("context.context_profiles.id", ondelete="CASCADE"))
    name = Column(String(255))
    template = Column(JSONB, nullable=False)
    version = Column(Integer, default=1)


class ContextPolicy(Base):
    __tablename__ = "context_policies"
    __table_args__ = {"schema": "context"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255))
    max_tokens = Column(Integer)
    ttl_hours = Column(Integer)
    compression_strategy = Column(String(100))
    configuration = Column(JSONB, default=dict)


class ContextSession(Base):
    __tablename__ = "context_sessions"
    __table_args__ = {"schema": "context"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    agent_run_id = Column(UUID(as_uuid=True), ForeignKey("agent.agent_runs.id"), index=True)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("context.context_profiles.id"))
    policy_id = Column(UUID(as_uuid=True), ForeignKey("context.context_policies.id"))
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    ended_at = Column(DateTime(timezone=True))
    metadata_json = Column("metadata", JSONB, default=dict)
