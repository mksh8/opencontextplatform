"""Search schema ORM models for saved searches and search history."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class SavedSearch(Base):
    """ORM model for user saved search queries."""
    __tablename__ = "saved_searches"
    __table_args__ = {"schema": "search"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    name = Column(String(255))
    query = Column(Text, nullable=False)
    filters = Column(JSONB, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class SearchHistory(Base):
    """ORM model for user search query audit trail."""
    __tablename__ = "search_history"
    __table_args__ = {"schema": "search"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    query = Column(Text)
    result_count = Column(Integer)
    searched_at = Column(DateTime(timezone=True), server_default=func.now())
