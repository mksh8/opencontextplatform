from fastapi import APIRouter, Depends
from apps.api.app.modules.search.schemas import SearchRequest
from apps.api.app.modules.search.service import search_service
from apps.api.app.api.dependencies import get_retrieval_engine
from runtime.retrieval_engine import RetrievalEngine

router = APIRouter(
    prefix="/context",
    tags=["Search"]
)

@router.post("/search")
async def search_context(request: SearchRequest, engine: RetrievalEngine = Depends(get_retrieval_engine)):
    """Endpoint handling search, delegated to service."""
    return await search_service.search(request, engine)
