"""Memories router endpoints."""

import logging
from typing import List

from fastapi import APIRouter, HTTPException

from apps.api.app.modules.memories.schemas import MemoryNode
from apps.api.app.modules.memories.service import memory_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/memories", tags=["Memories"])


@router.get("/{org_id}", response_model=List[MemoryNode])
def get_memories(org_id: str):
    """Get all isolated memories for an organization."""
    try:
        return memory_service.get_memories(org_id)
    except Exception as exc:
        logger.exception("Failed to retrieve memories")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc
