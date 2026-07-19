import uuid
from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from runtime.models.base import Base

class Channel(Base):
    __tablename__ = "channels"
    __table_args__ = {"schema": "notification"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255))
    channel_type = Column(String(50))
    configuration = Column(JSONB, default=dict)


class Subscription(Base):
    __tablename__ = "subscriptions"
    __table_args__ = {"schema": "notification"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    channel_id = Column(UUID(as_uuid=True), ForeignKey("notification.channels.id", ondelete="CASCADE"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    event_type = Column(String(100))
    enabled = Column(Boolean, default=True)


class Delivery(Base):
    __tablename__ = "deliveries"
    __table_args__ = {"schema": "notification"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subscription_id = Column(UUID(as_uuid=True), ForeignKey("notification.subscriptions.id", ondelete="CASCADE"))
    status = Column(String(30))
    payload = Column(JSONB)
    sent_at = Column(DateTime(timezone=True))
    acknowledged_at = Column(DateTime(timezone=True))
