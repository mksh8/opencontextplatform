from typing import List

class RBACEngine:
    """Maps identity claims to internal platform permissions."""
    
    PERMISSIONS = {
        "admin": ["read", "write", "delete", "manage_billing"],
        "contributor": ["read", "write"],
        "viewer": ["read"]
    }
    
    def get_permissions(self, roles: List[str]) -> List[str]:
        perms = set()
        for role in roles:
            if role in self.PERMISSIONS:
                perms.update(self.PERMISSIONS[role])
        return list(perms)
        
    def has_permission(self, roles: List[str], required_perm: str) -> bool:
        return required_perm in self.get_permissions(roles)
