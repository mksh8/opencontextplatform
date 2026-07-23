"""API Key service for generating and managing tenant API keys."""

from datetime import datetime
import hashlib
import secrets
from typing import List
import uuid

from sqlalchemy.orm import Session

from apps.api.app.modules.apikeys.schemas import ApiKeyCreateRequest
from runtime.models import ApiKey


def hash_key(key: str) -> str:
    """Hash raw API key with SHA256."""
    return hashlib.sha256(key.encode()).hexdigest()


class ApiKeyService:
    """Service layer for tenant API key management."""

    def get_keys(self, tenant_id: str, db: Session) -> List[ApiKey]:
        """Get active API keys for tenant."""
        return (
            db.query(ApiKey)
            .filter(ApiKey.tenant_id == tenant_id, ApiKey.is_active.is_(True))
            .all()
        )

    def create_key(self, tenant_id: str, request: ApiKeyCreateRequest, db: Session) -> dict:
        """Create new API key for tenant."""
        key_id = f"ak_{uuid.uuid4().hex[:8]}"
        # Generate a secure key
        raw_key = f"ocp_{secrets.token_urlsafe(32)}"
        prefix = raw_key[:7]
        hashed = hash_key(raw_key)

        new_key = ApiKey(
            id=key_id,
            tenant_id=tenant_id,
            name=request.name,
            key_hash=hashed,
            prefix=prefix,
            created_at=datetime.utcnow(),
            is_active=True,
        )
        db.add(new_key)
        db.commit()

        # Return dict because ApiKeyCreateResponse needs the raw_key which is not in DB
        return {
            "id": new_key.id,
            "name": new_key.name,
            "prefix": new_key.prefix,
            "created_at": new_key.created_at,
            "last_used": new_key.last_used,
            "is_active": new_key.is_active,
            "api_key": raw_key,
        }

    def revoke_key(self, key_id: str, tenant_id: str, db: Session) -> bool:
        """Revoke an active API key."""
        db_key = (
            db.query(ApiKey)
            .filter(ApiKey.id == key_id, ApiKey.tenant_id == tenant_id)
            .first()
        )
        if not db_key:
            return False
        db_key.is_active = False
        db.commit()
        return True


apikey_service = ApiKeyService()
