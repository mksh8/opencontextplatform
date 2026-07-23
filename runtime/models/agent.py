"""Agent schema ORM models for agents, versions, tools, skills, runs, and logs."""

import uuid

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class Agent(Base):
    """ORM model for agents."""
    __tablename__ = "agents"
    __table_args__ = {"schema": "agent"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"), nullable=False)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    agent_type = Column(String(100))
    status = Column(String(30), default="ACTIVE")
    metadata_json = Column("metadata", JSONB, default=dict)
    created_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class AgentVersion(Base):
    """ORM model for agent versioning."""
    __tablename__ = "agent_versions"
    __table_args__ = {"schema": "agent"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_id = Column(
        UUID(as_uuid=True), ForeignKey("agent.agents.id", ondelete="CASCADE"), nullable=False
    )
    version = Column(Integer, nullable=False)
    description = Column(Text)
    graph_definition = Column(JSONB)
    configuration = Column(JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Tool(Base):
    """ORM model for agent tools."""
    __tablename__ = "tools"
    __table_args__ = {"schema": "agent"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), nullable=False)
    tool_type = Column(String(100))
    endpoint = Column(String(500))
    schema_definition = Column(JSONB)
    metadata_json = Column("metadata", JSONB, default=dict)


class AgentTool(Base):
    """ORM model for agent tool associations."""
    __tablename__ = "agent_tools"
    __table_args__ = {"schema": "agent"}

    agent_version_id = Column(
        UUID(as_uuid=True),
        ForeignKey("agent.agent_versions.id", ondelete="CASCADE"),
        primary_key=True,
    )
    tool_id = Column(
        UUID(as_uuid=True),
        ForeignKey("agent.tools.id", ondelete="CASCADE"),
        primary_key=True,
    )
    required = Column(Boolean, default=False)


class Skill(Base):
    """ORM model for agent skills."""
    __tablename__ = "skills"
    __table_args__ = {"schema": "agent"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), nullable=False)
    description = Column(Text)
    skill_definition = Column(JSONB)


class AgentSkill(Base):
    """ORM model for agent skill associations."""
    __tablename__ = "agent_skills"
    __table_args__ = {"schema": "agent"}

    agent_version_id = Column(
        UUID(as_uuid=True),
        ForeignKey("agent.agent_versions.id", ondelete="CASCADE"),
        primary_key=True,
    )
    skill_id = Column(
        UUID(as_uuid=True),
        ForeignKey("agent.skills.id", ondelete="CASCADE"),
        primary_key=True,
    )


class AgentRun(Base):
    """ORM model for agent execution runs."""
    __tablename__ = "agent_runs"
    __table_args__ = {"schema": "agent"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_version_id = Column(UUID(as_uuid=True), ForeignKey("agent.agent_versions.id"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    session_id = Column(UUID(as_uuid=True))
    status = Column(String(30), index=True)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    total_tokens = Column(Integer)
    total_cost = Column(Numeric(12, 6))
    metadata_json = Column("metadata", JSONB, default=dict)


class AgentLog(Base):
    """ORM model for agent execution logs."""
    __tablename__ = "agent_logs"
    __table_args__ = {"schema": "agent"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_run_id = Column(
        UUID(as_uuid=True), ForeignKey("agent.agent_runs.id", ondelete="CASCADE")
    )
    log_level = Column(String(20))
    message = Column(Text)
    event_time = Column(DateTime(timezone=True), server_default=func.now())
    metadata_json = Column("metadata", JSONB, default=dict)
