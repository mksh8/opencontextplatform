"""Notification schema ORM models for channels, subscriptions, and deliveries."""

import uuid

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSONB, UUID

from runtime.models.base import Base


class Channel(Base):
    """ORM model for notification channels (email, Slack, Webhook)."""
    __tablename__ = "channels"
    __table_args__ = {"schema": "notification"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    name = Column(String(255))
    channel_type = Column(String(50))
    configuration = Column(JSONB, default=dict)


class Subscription(Base):
    """ORM model for event notification subscriptions."""
    __tablename__ = "subscriptions"
    __table_args__ = {"schema": "notification"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    channel_id = Column(
        UUID(as_uuid=True),
        ForeignKey("notification.channels.id", ondelete="CASCADE"),
    )
    user_id = Column(UUID(as_uuid=True), ForeignKey("identity.users.id"))
    event_type = Column(String(100))
    enabled = Column(Boolean, default=True)


class Delivery(Base):
    """ORM model for notification delivery logs."""
    __tablename__ = "deliveries"
    __table_args__ = {"schema": "notification"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subscription_id = Column(
        UUID(as_uuid=True),
        ForeignKey("notification.subscriptions.id", ondelete="CASCADE"),
    )
    status = Column(String(30))
    payload = Column(JSONB)
    sent_at = Column(DateTime(timezone=True))
    acknowledged_at = Column(DateTime(timezone=True))
