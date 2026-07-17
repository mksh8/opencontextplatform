from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from typing import Dict, Any

from runtime.arcadedb_provider import ArcadeDBProvider
from runtime.retrieval_engine import RetrievalEngine
from runtime.memory_engine import MemoryEngine
from packages.cloud.billing import StripeBillingProvider
from packages.enterprise.policy_engine import LocalACLEngine
from runtime.db import get_db_session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

# Match the secret from auth_service
SECRET_KEY = "super_secret_opencontext_key_for_jwt"
ALGORITHM = "HS256"

# Simple poor-man's cache for singleton instances
_cache = {}


def get_arcadedb_provider() -> ArcadeDBProvider:
    if "db" not in _cache:
        provider = ArcadeDBProvider()
        provider.connect()
        _cache["db"] = provider
    return _cache["db"]


def get_retrieval_engine() -> RetrievalEngine:
    if "retrieval" not in _cache:
        _cache["retrieval"] = RetrievalEngine(get_arcadedb_provider())
    return _cache["retrieval"]


def get_memory_engine() -> MemoryEngine:
    if "memory" not in _cache:
        _cache["memory"] = MemoryEngine(get_arcadedb_provider())
    return _cache["memory"]


def get_billing_provider() -> StripeBillingProvider:
    if "billing" not in _cache:
        _cache["billing"] = StripeBillingProvider(api_key="sk_test_mock")
    return _cache["billing"]

def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict[str, Any]:
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
            "tenant_id": "tenant_1" # Hardcoded for demo
        }
    except JWTError:
        raise credentials_exception

def require_permissions(action: str):
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
