from fastapi import APIRouter, HTTPException, Depends
import logging
from typing import List, Dict, Any
from apps.api.app.api.dependencies import get_current_user, require_permissions
from apps.api.app.modules.billing.service import billing_service
from apps.api.app.modules.billing.schemas import UsageMetrics, InvoiceSummary, APIKey, APIKeyCreateRequest

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/billing", tags=["Billing"])


@router.get("/{org_id}/usage", response_model=UsageMetrics)
def get_usage(org_id: str, user: Dict[str, Any] = Depends(require_permissions("read"))):
    """Get usage metrics for an organization."""
    try:
        return billing_service.get_usage(org_id)
    except Exception:
        logger.exception("Failed to retrieve usage metrics")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/{org_id}/invoices", response_model=InvoiceSummary)
def get_invoices(org_id: str, user: Dict[str, Any] = Depends(require_permissions("manage_billing"))):
    """Get top services by cost. Requires manage_billing permission."""
    try:
        return billing_service.get_invoices(org_id)
    except Exception:
        logger.exception("Failed to retrieve invoices")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/{org_id}/apikeys", response_model=List[APIKey])
def get_api_keys(org_id: str, user: Dict[str, Any] = Depends(require_permissions("manage_billing"))):
    """Get API keys for an organization."""
    try:
        return billing_service.get_api_keys(org_id)
    except Exception:
        logger.exception("Failed to retrieve API keys")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/{org_id}/apikeys", response_model=APIKey)
def create_api_key(org_id: str, request: APIKeyCreateRequest, user: Dict[str, Any] = Depends(require_permissions("manage_billing"))):
    """Create a new API key."""
    try:
        return billing_service.create_api_key(org_id, request)
    except Exception as e:
        logger.exception("Failed to create API key")
        raise HTTPException(status_code=400, detail=str(e))
