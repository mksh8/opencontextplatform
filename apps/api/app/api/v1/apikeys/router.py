import logging
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from apps.api.app.modules.apikeys.service import apikey_service
from apps.api.app.modules.apikeys.schemas import ApiKeyResponse, ApiKeyCreateRequest, ApiKeyCreateResponse
from apps.api.app.api.dependencies import get_db_session, require_permissions
from sqlalchemy.orm import Session
from packages.enterprise.audit_logger import AuditLogger

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/apikeys", tags=["API Keys"])

@router.get("", response_model=List[ApiKeyResponse])
def get_apikeys(
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("read"))
):
    """List all active API keys for the tenant."""
    try:
        return apikey_service.get_keys(user.get("tenant_id"), db)
    except Exception:
        logger.exception("Failed to retrieve API keys")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("", response_model=ApiKeyCreateResponse)
def create_apikey(
    request: ApiKeyCreateRequest, 
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("write"))
):
    """Generate a new API key."""
    try:
        result = apikey_service.create_key(user.get("tenant_id"), request, db)
        AuditLogger.log_event("create_apikey", user.get("sub"), request.name, "success")
        return result
    except Exception as e:
        logger.exception("Failed to create API key")
        AuditLogger.log_event("create_apikey", user.get("sub"), request.name, "failure", {"error": str(e)})
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{key_id}")
def revoke_apikey(
    key_id: str,
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("write"))
):
    """Revoke an API key."""
    try:
        success = apikey_service.revoke_key(key_id, user.get("tenant_id"), db)
        if not success:
            raise HTTPException(status_code=404, detail="Key not found")
        AuditLogger.log_event("revoke_apikey", user.get("sub"), key_id, "success")
        return {"status": "success"}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Failed to revoke API key")
        AuditLogger.log_event("revoke_apikey", user.get("sub"), key_id, "failure", {"error": str(e)})
        raise HTTPException(status_code=500, detail="Internal Server Error")
