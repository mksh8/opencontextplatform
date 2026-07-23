"""SSO Provider implementations for enterprise single sign-on."""

from abc import ABC, abstractmethod
from typing import Any, Dict


class ISSOProvider(ABC):
    """Interface for enterprise SSO providers."""

    @abstractmethod
    def verify_token(self, token: str) -> Dict[str, Any]:
        """Verify SSO token and return user identity claims."""


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


class OktaProvider(ISSOProvider):
    """Reference implementation for Okta SAML/OIDC."""

    def __init__(self, domain: str, client_id: str):
        self.domain = domain
        self.client_id = client_id

    def verify_token(self, token: str) -> Dict[str, Any]:
        """Mocks JWT validation against Okta."""
        if token == "valid_okta_jwt":
            return {
                "sub": "okta_user_456",
                "email": "dev@enterprise.com",
                "roles": ["contributor"],
                "groups": ["engineering", "beta_testers"],
            }
        raise ValueError("Invalid Token")


class SSOManager:
    """Manager for generating SSO authorization URLs and delegating authentication."""

    def __init__(self, provider: str = "saml"):
        self.provider = provider

    def get_authorization_url(self, tenant_id: str) -> str:
        """Get redirect authorization URL for given tenant ID."""
        return f"https://sso.opencontext.io/auth/{self.provider}?tenant_id={tenant_id}"
