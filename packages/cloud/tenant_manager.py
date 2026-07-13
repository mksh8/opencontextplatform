from typing import Dict, Any

class TenantManager:
    """Manages tenant isolation and API key validation."""
    
    def __init__(self):
        # Mock database of active tenants
        self._tenants = {
            "sk_test_123": {"tenant_id": "org_abc", "tier": "free"},
            "sk_live_456": {"tenant_id": "org_xyz", "tier": "enterprise"}
        }

    def authenticate(self, api_key: str) -> Dict[str, str]:
        """Validates API key and returns tenant context."""
        tenant = self._tenants.get(api_key)
        if not tenant:
            raise PermissionError("Invalid API Key")
        return tenant
