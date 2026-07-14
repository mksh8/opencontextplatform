from fastapi import APIRouter, Depends, HTTPException
import logging
from apps.api.app.modules.context.service import context_service
from apps.api.app.modules.context.schemas import ContextResponse
from apps.api.app.api.dependencies import get_memory_engine
from runtime.memory_engine import MemoryEngine

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contexts", tags=["Contexts"])


@router.get("/", response_model=ContextResponse)
def get_contexts(engine: MemoryEngine = Depends(get_memory_engine)):
    """Endpoint returning ingested context data, delegated to service."""
    try:
        return context_service.get_all_contexts(engine)
    except Exception:
        logger.exception("Failed to retrieve contexts")
        raise HTTPException(status_code=500, detail="Internal Server Error")
