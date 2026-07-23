import uuid
from sqlalchemy import Column, String, Text, ForeignKey, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class MCPServer(Base):
    __tablename__ = "mcp_servers"
    __table_args__ = {"schema": "mcp"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), nullable=False)
    endpoint = Column(String(500))
    transport = Column(String(50))
    authentication_type = Column(String(50))
    configuration = Column(JSONB, default=dict)
    status = Column(String(30), default="ACTIVE")


class MCPTool(Base):
    __tablename__ = "mcp_tools"
    __table_args__ = {"schema": "mcp"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    server_id = Column(UUID(as_uuid=True), ForeignKey("mcp.mcp_servers.id", ondelete="CASCADE"))
    tool_name = Column(String(255), nullable=False)
    description = Column(Text)
    input_schema = Column(JSONB)
    output_schema = Column(JSONB)


class MCPToolPermission(Base):
    __tablename__ = "mcp_tool_permissions"
    __table_args__ = {"schema": "mcp"}

    tool_id = Column(UUID(as_uuid=True), ForeignKey("mcp.mcp_tools.id", ondelete="CASCADE"), primary_key=True)
    role_id = Column(UUID(as_uuid=True), ForeignKey("identity.roles.id", ondelete="CASCADE"), primary_key=True)


class MCPToolExecution(Base):
    __tablename__ = "mcp_tool_executions"
    __table_args__ = {"schema": "mcp"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tool_id = Column(UUID(as_uuid=True), ForeignKey("mcp.mcp_tools.id"))
    agent_run_id = Column(UUID(as_uuid=True), ForeignKey("agent.agent_runs.id"))
    executed_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    status = Column(String(30))
    latency_ms = Column(Integer)
    request = Column(JSONB)
    response = Column(JSONB)
    executed_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
