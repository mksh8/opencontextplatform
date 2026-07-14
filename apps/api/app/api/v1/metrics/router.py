from fastapi import APIRouter, Depends
from apps.api.app.modules.metrics.service import metrics_service
from apps.api.app.api.dependencies import get_billing_provider
from packages.cloud.billing import StripeBillingProvider

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"]
)

@router.get("/billing")
def get_billing_metrics(provider: StripeBillingProvider = Depends(get_billing_provider)):
    """Endpoint returning billing metrics, delegated to service."""
    return metrics_service.get_billing_metrics(provider)
