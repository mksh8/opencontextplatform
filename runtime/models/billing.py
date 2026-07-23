import uuid
from sqlalchemy import Column, String, ForeignKey, Boolean, Numeric, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from runtime.models.base import Base

class Plan(Base):
    __tablename__ = "plans"
    __table_args__ = {"schema": "billing"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(100), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    billing_period = Column(String(20), nullable=False)
    price = Column(Numeric(12, 2), nullable=False)
    currency = Column(String(10), default="USD")
    features = Column(JSONB, default=dict)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Subscription(Base):
    __tablename__ = "subscriptions"
    __table_args__ = {"schema": "billing"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(UUID(as_uuid=True), ForeignKey("identity.tenants.id"), index=True)
    plan_id = Column(UUID(as_uuid=True), ForeignKey("billing.plans.id"))
    status = Column(String(30), default="ACTIVE")
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True))
    auto_renew = Column(Boolean, default=True)


class License(Base):
    __tablename__ = "licenses"
    __table_args__ = {"schema": "billing"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subscription_id = Column(UUID(as_uuid=True), ForeignKey("billing.subscriptions.id", ondelete="CASCADE"))
    license_key = Column(String(255), unique=True, nullable=False)
    seat_limit = Column(Numeric)
    expires_at = Column(DateTime(timezone=True))


class UsageMetric(Base):
    __tablename__ = "usage_metrics"
    __table_args__ = {"schema": "billing"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(UUID(as_uuid=True), ForeignKey("identity.tenants.id"))
    workspace_id = Column(UUID(as_uuid=True), ForeignKey("workspace.workspaces.id"))
    metric_type = Column(String(100))
    quantity = Column(Numeric(18, 4))
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())


class Invoice(Base):
    __tablename__ = "invoices"
    __table_args__ = {"schema": "billing"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subscription_id = Column(UUID(as_uuid=True), ForeignKey("billing.subscriptions.id"))
    invoice_number = Column(String(100), unique=True)
    amount = Column(Numeric(12, 2))
    status = Column(String(30))
    issued_at = Column(DateTime(timezone=True))
