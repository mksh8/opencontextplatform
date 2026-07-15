from abc import ABC, abstractmethod
from typing import Dict, Any
from packages.enterprise.rbac import RBACEngine
from packages.enterprise.audit_logger import AuditLogger


class IPolicyEngine(ABC):
    @abstractmethod
    def evaluate(
        self, identity: Dict[str, Any], context_obj: Dict[str, Any], action: str
    ) -> bool:
        pass


class LocalACLEngine(IPolicyEngine):
    """Simple local Access Control List evaluator."""

    def __init__(self):
        self.rbac = RBACEngine()

    def evaluate(
        self, identity: Dict[str, Any], context_obj: Dict[str, Any], action: str
    ) -> bool:
        roles = identity.get("roles", [])
        actor_id = identity.get("sub", "unknown_user")
        target_id = context_obj.get("id", "unknown_context")
        
        # Check base RBAC
        if not self.rbac.has_permission(roles, action):
            AuditLogger.log_event("access_evaluate", actor_id, target_id, "deny", {"reason": "Insufficient RBAC Roles"})
            return False

        # Check tenant isolation
        if identity.get("tenant_id") != context_obj.get("tenant_id"):
            AuditLogger.log_event("access_evaluate", actor_id, target_id, "deny", {"reason": "Tenant Isolation Violation"})
            return False

        AuditLogger.log_event("access_evaluate", actor_id, target_id, "allow", {"reason": "Local ACL Passed"})
        return True


class OPAPolicyEngine(IPolicyEngine):
    """Open Policy Agent evaluator (Mocked)."""

    def evaluate(
        self, identity: Dict[str, Any], context_obj: Dict[str, Any], action: str
    ) -> bool:
        # In reality, this makes an HTTP POST to the local OPA sidecar
        # e.g., requests.post("http://localhost:8181/v1/data/context/allow", json={...})

        print(
            f"[OPA] Evaluated {action} on {context_obj.get('id')} "
            f"for {identity.get('sub')}"
        )
        # Mock OPA logic returning true for admins
        return "admin" in identity.get("roles", [])
