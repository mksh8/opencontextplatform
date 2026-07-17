from fastapi import APIRouter, Depends, HTTPException
import logging
from apps.api.app.modules.search.schemas import SearchRequest, SearchResponse
from apps.api.app.modules.search.service import search_service
from apps.api.app.api.dependencies import get_retrieval_engine
from runtime.retrieval_engine import RetrievalEngine

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/search", tags=["Search"])


@router.post("/", response_model=SearchResponse)
async def search_context(
    request: SearchRequest, engine: RetrievalEngine = Depends(get_retrieval_engine)
):
    """Endpoint handling search, delegated to service."""
    try:
        return await search_service.search(request, engine)
    except Exception:
        logger.exception("Failed to search contexts")
        raise HTTPException(status_code=500, detail="Internal Server Error")
