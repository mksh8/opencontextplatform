import uuid
from sqlalchemy import Column, String, Text, ForeignKey, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class SavedSearch(Base):
    __tablename__ = "saved_searches"
    __table_args__ = {"schema": "search"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    name = Column(String(255))
    query = Column(Text, nullable=False)
    filters = Column(JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class SearchHistory(Base):
    __tablename__ = "search_history"
    __table_args__ = {"schema": "search"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    query = Column(Text)
    result_count = Column(Integer)
    searched_at = Column(DateTime(timezone=True), server_default=func.now())
