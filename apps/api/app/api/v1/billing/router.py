from fastapi import APIRouter, HTTPException, Depends
import logging
from typing import List, Dict, Any
from apps.api.app.api.dependencies import get_current_user, require_permissions
from apps.api.app.modules.billing.service import billing_service
from apps.api.app.modules.billing.schemas import UsageMetrics, InvoiceSummary

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


