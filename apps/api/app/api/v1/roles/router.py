"""Roles router endpoints."""

import logging
from typing import Any, Dict, List
import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from apps.api.app.api.dependencies import get_db_session, require_permissions
from apps.api.app.modules.roles.schemas import RoleCreateRequest, RoleResponse
from packages.enterprise.audit_logger import AuditLogger
from runtime.models import Organization, Permission, Role, RolePermission, Tenant

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/roles", tags=["Roles"])


def _ensure_tenant(db: Session, tenant_uuid: uuid.UUID):
    """Ensure default tenant exists in database."""
    tenant = db.query(Tenant).filter(Tenant.id == tenant_uuid).first()
    if not tenant:
        org_id = uuid.uuid4()
        org = Organization(id=org_id, code="default_org", name="Default Organization")
        tenant = Tenant(
            id=tenant_uuid,
            organization_id=org_id,
            code="default_tenant",
            name="Default Tenant",
        )
        try:
            db.add(org)
            db.add(tenant)
            db.commit()
        except IntegrityError:
            db.rollback()


@router.get("", response_model=List[RoleResponse])
def get_roles(
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("read")),
):
    """Get all roles for the tenant."""
    raw_tenant_id = user.get("tenant_id")
    try:
        tenant_uuid = uuid.UUID(raw_tenant_id)
    except ValueError:
        tenant_uuid = uuid.UUID("00000000-0000-0000-0000-000000000001")

    _ensure_tenant(db, tenant_uuid)

    roles = db.query(Role).filter(Role.tenant_id == tenant_uuid).all()

    responses = []
    for r in roles:
        perms = (
            db.query(Permission.code)
            .join(RolePermission, Permission.id == RolePermission.permission_id)
            .filter(RolePermission.role_id == r.id)
            .all()
        )
        perm_list = [p[0] for p in perms]

        responses.append(
            RoleResponse(
                id=str(r.id),
                name=r.name,
                description=r.description,
                permissions=perm_list,
            )
        )

    return responses


@router.post("", response_model=RoleResponse)
def create_role(
    request: RoleCreateRequest,
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("manage_users")),
):
    """Create a new role."""
    raw_tenant_id = user.get("tenant_id")
    try:
        tenant_uuid = uuid.UUID(raw_tenant_id)
    except ValueError:
        tenant_uuid = uuid.UUID("00000000-0000-0000-0000-000000000001")

    _ensure_tenant(db, tenant_uuid)

    role = Role(
        id=uuid.uuid4(),
        tenant_id=tenant_uuid,
        name=request.name,
        description=request.description,
    )
    db.add(role)
    db.flush()  # flush to get role.id without committing yet

    # Associate permissions
    for perm_code in request.permissions:
        permission = db.query(Permission).filter(Permission.code == perm_code).first()
        if not permission:
            # Auto-create missing permission for flexibility
            parts = perm_code.split(".")
            resource = parts[0] if len(parts) > 0 else "system"
            action = parts[1] if len(parts) > 1 else "manage"
            permission = Permission(
                id=uuid.uuid4(), code=perm_code, resource=resource, action=action
            )
            db.add(permission)
            db.flush()

        role_perm = RolePermission(role_id=role.id, permission_id=permission.id)
        db.add(role_perm)

    db.commit()
    AuditLogger.log_event(
        "create_role", user.get("sub"), role.name, "success", tenant_id=raw_tenant_id
    )

    return RoleResponse(
        id=str(role.id),
        name=role.name,
        description=role.description,
        permissions=request.permissions,
    )
