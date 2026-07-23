"""Providers router endpoints."""

import logging
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from apps.api.app.api.dependencies import get_db_session, require_permissions
from apps.api.app.modules.providers.schemas import Provider, ProviderCreateRequest
from apps.api.app.modules.providers.service import provider_service
from packages.enterprise.audit_logger import AuditLogger

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/providers", tags=["Providers"])


@router.get("/{org_id}", response_model=List[Provider])
def get_providers(org_id: str, db: Session = Depends(get_db_session)):
    """Get all providers for an organization."""
    try:
        return provider_service.get_providers(org_id, db)
    except Exception as exc:
        logger.exception("Failed to retrieve providers")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc


@router.post("/{org_id}", response_model=Provider)
def create_provider(
    org_id: str,
    request: ProviderCreateRequest,
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("write")),
):
    """Add a new provider configuration."""
    try:
        result = provider_service.create_provider(org_id, request, db)
        AuditLogger.log_event(
            "create_provider",
            user.get("sub"),
            request.name,
            "success",
            {"type": request.provider_type},
        )
        return result
    except Exception as e:
        logger.exception("Failed to create provider")
        AuditLogger.log_event(
            "create_provider",
            user.get("sub"),
            request.name,
            "failure",
            {"error": str(e)},
        )
        raise HTTPException(status_code=400, detail=str(e)) from e
