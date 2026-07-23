import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class ConnectorType(Base):
    __tablename__ = "connector_types"
    __table_args__ = {"schema": "connector"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(100), unique=True, nullable=False)
    name = Column(String(255), nullable=False)


class ConnectorConfig(Base):
    __tablename__ = "connector_configs"
    __table_args__ = {"schema": "connector"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"), nullable=False)
    connector_type_id = Column(UUID(as_uuid=True), ForeignKey("connector.connector_types.id"), nullable=False)
    name = Column(String(255), nullable=False)
    configuration = Column(JSONB, nullable=False)
    status = Column(String(30), default="ACTIVE")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
