"""SDK schema ORM models for SDK releases and download metrics."""

import uuid

from sqlalchemy import Column, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import INET, UUID
from sqlalchemy.sql import func

from runtime.models.base import Base


class SDKRelease(Base):
    """ORM model for published SDK language releases."""
    __tablename__ = "sdk_releases"
    __table_args__ = {"schema": "sdk"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    language = Column(String(50))
    version = Column(String(50))
    repository_url = Column(Text)
    documentation_url = Column(Text)
    released_at = Column(DateTime(timezone=True), server_default=func.now())


class SDKDownload(Base):
    """ORM model for tracking SDK package downloads."""
    __tablename__ = "sdk_downloads"
    __table_args__ = {"schema": "sdk"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sdk_release_id = Column(
        UUID(as_uuid=True), ForeignKey("sdk.sdk_releases.id", ondelete="CASCADE")
    )
    downloaded_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    downloaded_at = Column(DateTime(timezone=True), server_default=func.now())
    client_ip = Column(INET)
