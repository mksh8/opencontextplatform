import uuid
from sqlalchemy import Column, String, Text, ForeignKey, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class Workflow(Base):
    __tablename__ = "workflows"
    __table_args__ = {"schema": "workflow"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    workflow_type = Column(String(100))
    status = Column(String(30), default="DRAFT")
    metadata_json = Column("metadata", JSONB, default=dict)
    created_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class WorkflowVersion(Base):
    __tablename__ = "workflow_versions"
    __table_args__ = {"schema": "workflow"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workflow_id = Column(UUID(as_uuid=True), ForeignKey("workflow.workflows.id", ondelete="CASCADE"), nullable=False)
    version = Column(Integer, nullable=False)
    definition = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class WorkflowNode(Base):
    __tablename__ = "workflow_nodes"
    __table_args__ = {"schema": "workflow"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workflow_version_id = Column(UUID(as_uuid=True), ForeignKey("workflow.workflow_versions.id", ondelete="CASCADE"), nullable=False)
    node_key = Column(String(100), nullable=False)
    node_type = Column(String(100), nullable=False)
    configuration = Column(JSONB, default=dict)


class WorkflowEdge(Base):
    __tablename__ = "workflow_edges"
    __table_args__ = {"schema": "workflow"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workflow_version_id = Column(UUID(as_uuid=True), ForeignKey("workflow.workflow_versions.id", ondelete="CASCADE"), nullable=False)
    source_node_id = Column(UUID(as_uuid=True), ForeignKey("workflow.workflow_nodes.id", ondelete="CASCADE"), nullable=False)
    target_node_id = Column(UUID(as_uuid=True), ForeignKey("workflow.workflow_nodes.id", ondelete="CASCADE"), nullable=False)
    edge_type = Column(String(50), default="DEFAULT")


class WorkflowRun(Base):
    __tablename__ = "workflow_runs"
    __table_args__ = {"schema": "workflow"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workflow_version_id = Column(UUID(as_uuid=True), ForeignKey("workflow.workflow_versions.id"))
    status = Column(String(30), index=True)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    initiated_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    metadata_json = Column("metadata", JSONB, default=dict)


class WorkflowTask(Base):
    __tablename__ = "workflow_tasks"
    __table_args__ = {"schema": "workflow"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workflow_run_id = Column(UUID(as_uuid=True), ForeignKey("workflow.workflow_runs.id", ondelete="CASCADE"))
    node_id = Column(UUID(as_uuid=True), ForeignKey("workflow.workflow_nodes.id"))
    status = Column(String(30))
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    output = Column(JSONB)
