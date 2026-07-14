from abc import ABC, abstractmethod
from typing import Dict, Any


class ISSOProvider(ABC):
    @abstractmethod
    def verify_token(self, token: str) -> Dict[str, Any]:
        pass


class Auth0Provider(ISSOProvider):
    """Reference implementation for Auth0 OIDC."""

    def __init__(self, domain: str, client_id: str):
        self.domain = domain
        self.client_id = client_id

    def verify_token(self, token: str) -> Dict[str, Any]:
        """Mocks JWT validation against Auth0."""
        if token == "valid_auth0_jwt":
            return {
                "sub": "user_123",
                "email": "admin@enterprise.com",
                "roles": ["admin"],
            }
        raise ValueError("Invalid Token")
