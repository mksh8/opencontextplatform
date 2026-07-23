"""Metrics router endpoints."""

import logging

from fastapi import APIRouter, Depends, HTTPException

from apps.api.app.api.dependencies import get_billing_provider
from apps.api.app.modules.metrics.schemas import MetricsResponse
from apps.api.app.modules.metrics.service import metrics_service
from packages.cloud.billing import StripeBillingProvider

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/metrics", tags=["Metrics"])


@router.get("/billing", response_model=MetricsResponse)
def get_billing_metrics(
    provider: StripeBillingProvider = Depends(get_billing_provider),
):
    """Endpoint returning billing metrics, delegated to service."""
    try:
        return metrics_service.get_billing_metrics(provider)
    except Exception as exc:
        logger.exception("Failed to retrieve metrics")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc
