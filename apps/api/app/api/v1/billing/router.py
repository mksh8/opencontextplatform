from fastapi import APIRouter, HTTPException
import logging
from typing import List
from apps.api.app.modules.billing.service import billing_service
from apps.api.app.modules.billing.schemas import UsageMetrics, InvoiceSummary, APIKey

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/billing", tags=["Billing"])


@router.get("/{org_id}/usage", response_model=UsageMetrics)
def get_usage(org_id: str):
    """Get usage metrics for an organization."""
    try:
        return billing_service.get_usage(org_id)
    except Exception:
        logger.exception("Failed to retrieve usage metrics")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/{org_id}/invoices", response_model=InvoiceSummary)
def get_invoices(org_id: str):
    """Get top services by cost."""
    try:
        return billing_service.get_invoices(org_id)
    except Exception:
        logger.exception("Failed to retrieve invoices")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/{org_id}/apikeys", response_model=List[APIKey])
def get_api_keys(org_id: str):
    """Get API keys for an organization."""
    try:
        return billing_service.get_api_keys(org_id)
    except Exception:
        logger.exception("Failed to retrieve API keys")
        raise HTTPException(status_code=500, detail="Internal Server Error")
