from typing import List
from sqlalchemy.orm import Session
from runtime.models import Role


class RBACEngine:
    """Maps identity claims to internal platform permissions."""

    def get_permissions(self, roles: List[str], tenant_id: str, db: Session) -> List[str]:
        perms = set()
        db_roles = db.query(Role).filter(Role.tenant_id == tenant_id, Role.name.in_(roles)).all()
        for role in db_roles:
            if role.permissions:
                perms.update(role.permissions)
        # Also handle hardcoded fallback if role not in db
        fallback = {
            "admin": ["read", "write", "delete", "manage_billing", "manage_users"],
            "contributor": ["read", "write"],
            "viewer": ["read"],
        }
        for role in roles:
            if role in fallback and not any(r.name == role for r in db_roles):
                perms.update(fallback[role])
        return list(perms)

    def has_permission(self, roles: List[str], required_perm: str, tenant_id: str, db: Session) -> bool:
        return required_perm in self.get_permissions(roles, tenant_id, db)
