from fastapi import APIRouter, HTTPException
import logging
from typing import List
from apps.api.app.modules.connectors.service import connector_service
from apps.api.app.modules.connectors.schemas import Connector

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/connectors", tags=["Connectors"])


@router.get("/{org_id}", response_model=List[Connector])
def get_connectors(org_id: str):
    """Get all connectors for an organization."""
    try:
        return connector_service.get_connectors(org_id)
    except Exception:
        logger.exception("Failed to retrieve connectors")
        raise HTTPException(status_code=500, detail="Internal Server Error")
