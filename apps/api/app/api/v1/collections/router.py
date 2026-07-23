"""Collections router endpoints."""

import logging
from typing import List

from fastapi import APIRouter, HTTPException

from apps.api.app.modules.collections.schemas import CollectionItem
from apps.api.app.modules.collections.service import collection_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/collections", tags=["Collections"])


@router.get("/{org_id}", response_model=List[CollectionItem])
def get_collections(org_id: str):
    """Get all collections for an organization."""
    try:
        return collection_service.get_collections(org_id)
    except Exception as exc:
        logger.exception("Failed to retrieve collections")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc
