import uuid
from sqlalchemy import Column, String, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class Ontology(Base):
    __tablename__ = "ontologies"
    __table_args__ = {"schema": "ontology"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), nullable=False)
    namespace = Column(String(255))
    description = Column(Text)
    version = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Concept(Base):
    __tablename__ = "concepts"
    __table_args__ = {"schema": "ontology"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ontology_id = Column(UUID(as_uuid=True), ForeignKey("ontology.ontologies.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    concept_type = Column(String(100))
    description = Column(Text)
    properties = Column(JSONB, default=dict)


class ConceptRelationship(Base):
    __tablename__ = "concept_relationships"
    __table_args__ = {"schema": "ontology"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_concept_id = Column(UUID(as_uuid=True), ForeignKey("ontology.concepts.id", ondelete="CASCADE"))
    target_concept_id = Column(UUID(as_uuid=True), ForeignKey("ontology.concepts.id", ondelete="CASCADE"))
    relationship_type = Column(String(100), nullable=False)
    metadata_json = Column("metadata", JSONB, default=dict)
