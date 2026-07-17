from fastapi import APIRouter, HTTPException
import logging
from typing import List
from apps.api.app.modules.webhooks.service import webhook_service
from apps.api.app.modules.webhooks.schemas import Webhook

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhooks", tags=["Webhooks"])


@router.get("/{org_id}", response_model=List[Webhook])
def get_webhooks(org_id: str):
    """Get all webhooks for an organization."""
    try:
        return webhook_service.get_webhooks(org_id)
    except Exception:
        logger.exception("Failed to retrieve webhooks")
        raise HTTPException(status_code=500, detail="Internal Server Error")
