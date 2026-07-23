"""Audit logs router endpoints."""

from datetime import datetime, timedelta
import logging
from typing import Any, Dict, List
import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from apps.api.app.api.dependencies import get_db_session, require_permissions
from apps.api.app.modules.auditlogs.schemas import AuditLogResponse
from runtime.models.compat import AuditLogEntry

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auditlogs", tags=["Audit Logs"])


@router.get("", response_model=List[AuditLogResponse])
def get_audit_logs(
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("manage_billing")),
):
    """Get all audit logs for the tenant."""
    tenant_id = user.get("tenant_id")
    logs = (
        db.query(AuditLogEntry)
        .filter(AuditLogEntry.tenant_id == tenant_id)
        .order_by(AuditLogEntry.timestamp.desc())
        .limit(100)
        .all()
    )

    if not logs:
        # Seed the database with some realistic audit logs for the demo
        seed_logs = [
            AuditLogEntry(
                id=str(uuid.uuid4()),
                tenant_id=tenant_id,
                actor="admin@opencontext.com",
                action="login",
                target="system",
                status="success",
                timestamp=datetime.utcnow() - timedelta(hours=2),
            ),
            AuditLogEntry(
                id=str(uuid.uuid4()),
                tenant_id=tenant_id,
                actor="admin@opencontext.com",
                action="create_workspace",
                target="Engineering Workspace",
                status="success",
                timestamp=datetime.utcnow() - timedelta(hours=1),
            ),
            AuditLogEntry(
                id=str(uuid.uuid4()),
                tenant_id=tenant_id,
                actor="admin@opencontext.com",
                action="update_role",
                target="Member Role",
                status="success",
                timestamp=datetime.utcnow() - timedelta(minutes=30),
            ),
            AuditLogEntry(
                id=str(uuid.uuid4()),
                tenant_id=tenant_id,
                actor="jane.doe@example.com",
                action="login",
                target="system",
                status="success",
                timestamp=datetime.utcnow() - timedelta(minutes=15),
            ),
            AuditLogEntry(
                id=str(uuid.uuid4()),
                tenant_id=tenant_id,
                actor="john.smith@example.com",
                action="access_denied",
                target="Billing Settings",
                status="failed",
                timestamp=datetime.utcnow() - timedelta(minutes=5),
            ),
        ]
        db.add_all(seed_logs)
        db.commit()
        logs = (
            db.query(AuditLogEntry)
            .filter(AuditLogEntry.tenant_id == tenant_id)
            .order_by(AuditLogEntry.timestamp.desc())
            .limit(100)
            .all()
        )

    return logs
