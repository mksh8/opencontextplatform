import uuid
from sqlalchemy import Column, String, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, INET
from sqlalchemy.sql import func
from runtime.models.base import Base

class SDKRelease(Base):
    __tablename__ = "sdk_releases"
    __table_args__ = {"schema": "sdk"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    language = Column(String(50))
    version = Column(String(50))
    repository_url = Column(Text)
    documentation_url = Column(Text)
    released_at = Column(DateTime(timezone=True), server_default=func.now())


class SDKDownload(Base):
    __tablename__ = "sdk_downloads"
    __table_args__ = {"schema": "sdk"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sdk_release_id = Column(UUID(as_uuid=True), ForeignKey("sdk.sdk_releases.id", ondelete="CASCADE"))
    downloaded_by = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    downloaded_at = Column(DateTime(timezone=True), server_default=func.now())
    client_ip = Column(INET)
