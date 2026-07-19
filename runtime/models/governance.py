import uuid
from sqlalchemy import Column, String, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from runtime.models.base import Base

class BusinessGlossary(Base):
    __tablename__ = "business_glossaries"
    __table_args__ = {"schema": "governance"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class GlossaryTerm(Base):
    __tablename__ = "glossary_terms"
    __table_args__ = {"schema": "governance"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    glossary_id = Column(UUID(as_uuid=True), ForeignKey("governance.business_glossaries.id", ondelete="CASCADE"))
    term = Column(String(255), nullable=False, index=True)
    definition = Column(Text)
    steward_user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))


class Tag(Base):
    __tablename__ = "tags"
    __table_args__ = {"schema": "governance"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(100), nullable=False)
    color = Column(String(20))


class TagAssignment(Base):
    __tablename__ = "tag_assignments"
    __table_args__ = {"schema": "governance"}

    tag_id = Column(UUID(as_uuid=True), ForeignKey("governance.tags.id", ondelete="CASCADE"), primary_key=True)
    entity_type = Column(String(100), nullable=False, primary_key=True)
    entity_id = Column(UUID(as_uuid=True), nullable=False, primary_key=True)


class Classification(Base):
    __tablename__ = "classifications"
    __table_args__ = {"schema": "governance"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(100), nullable=False)
    description = Column(Text)


class Owner(Base):
    __tablename__ = "owners"
    __table_args__ = {"schema": "governance"}

    entity_type = Column(String(100), primary_key=True)
    entity_id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"), primary_key=True)
    ownership_type = Column(String(50))
