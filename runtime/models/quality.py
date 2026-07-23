import uuid
from sqlalchemy import Column, String, Text, ForeignKey, Numeric, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class QualityRule(Base):
    __tablename__ = "quality_rules"
    __table_args__ = {"schema": "quality"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), nullable=False)
    rule_type = Column(String(100))
    configuration = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class QualityCheck(Base):
    __tablename__ = "quality_checks"
    __table_args__ = {"schema": "quality"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    rule_id = Column(UUID(as_uuid=True), ForeignKey("quality.quality_rules.id"))
    table_id = Column(UUID(as_uuid=True), ForeignKey("catalog.catalog_tables.id"))
    status = Column(String(30), index=True)
    score = Column(Numeric(5, 2))
    executed_at = Column(DateTime(timezone=True), server_default=func.now())


class QualityIssue(Base):
    __tablename__ = "quality_issues"
    __table_args__ = {"schema": "quality"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    check_id = Column(UUID(as_uuid=True), ForeignKey("quality.quality_checks.id"))
    severity = Column(String(20))
    message = Column(Text)
    metadata_json = Column("metadata", JSONB, default=dict)
