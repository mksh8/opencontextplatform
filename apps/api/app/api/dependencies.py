"""Dependencies for API routes including auth, engines, and providers."""

from typing import Any, Dict

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from packages.cloud.billing import StripeBillingProvider
from packages.enterprise.policy_engine import LocalACLEngine
from packages.storage.arcadedb.operations import db_repository
from runtime.db import get_db_session  # pylint: disable=unused-import
from runtime.memory_engine import MemoryEngine
from runtime.retrieval_engine import RetrievalEngine

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

# Match the secret from auth_service
SECRET_KEY = "super_secret_opencontext_key_for_jwt"
ALGORITHM = "HS256"

# Simple cache for singleton instances
_cache = {}


def get_arcadedb_repository():
    """Get connected ArcadeDB repository instance."""
    db_repository.graph.connect()
    return db_repository


def get_retrieval_engine() -> RetrievalEngine:
    """Get or create singleton RetrievalEngine instance."""
    if "retrieval" not in _cache:
        db = get_arcadedb_repository()
        _cache["retrieval"] = RetrievalEngine(db)
    return _cache["retrieval"]


def get_memory_engine() -> MemoryEngine:
    """Get or create singleton MemoryEngine instance."""
    if "memory" not in _cache:
        db = get_arcadedb_repository()
        _cache["memory"] = MemoryEngine(db)
    return _cache["memory"]


def get_billing_provider() -> StripeBillingProvider:
    """Get or create singleton StripeBillingProvider instance."""
    if "billing" not in _cache:
        _cache["billing"] = StripeBillingProvider(api_key="sk_test_mock")
    return _cache["billing"]


def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict[str, Any]:
    """Validate JWT token and return current user details."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("id")
        email: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception

        # Hardcode roles for demo purposes. In production, fetch from DB.
        roles = ["admin"] if email == "admin@opencontext.com" else ["contributor"]

        return {
            "sub": user_id,
            "email": email,
            "roles": roles,
            "tenant_id": "00000000-0000-0000-0000-000000000001"  # Hardcoded valid UUID for demo
        }
    except JWTError as exc:
        raise credentials_exception from exc


def require_permissions(action: str):
    """Dependency factory to enforce required permission actions."""
    def role_checker(user: Dict[str, Any] = Depends(get_current_user)):
        acl = LocalACLEngine()
        # Create a dummy context object to satisfy the evaluate signature
        dummy_context = {"id": "resource_global", "tenant_id": user.get("tenant_id")}

        if not acl.evaluate(user, dummy_context, action):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted. Requires permission: {action}"
            )
        return user
    return role_checker
