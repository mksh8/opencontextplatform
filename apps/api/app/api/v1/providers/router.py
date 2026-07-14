from fastapi import APIRouter, HTTPException
import logging
from typing import List
from apps.api.app.modules.providers.service import provider_service
from apps.api.app.modules.providers.schemas import Provider

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/providers", tags=["Providers"])


@router.get("/{org_id}", response_model=List[Provider])
def get_providers(org_id: str):
    """Get all providers for an organization."""
    try:
        return provider_service.get_providers(org_id)
    except Exception:
        logger.exception("Failed to retrieve providers")
        raise HTTPException(status_code=500, detail="Internal Server Error")
