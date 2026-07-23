"""Search router endpoints."""

import logging

from fastapi import APIRouter, Depends, HTTPException

from apps.api.app.api.dependencies import get_retrieval_engine
from apps.api.app.modules.search.schemas import (
    GraphSearchRequest,
    GraphSearchResponse,
    HybridSearchRequest,
    HybridSearchResponse,
    SemanticSearchRequest,
    SemanticSearchResponse,
    UniversalSearchRequest,
    UniversalSearchResponse,
)
from apps.api.app.modules.search.service import search_service
from runtime.retrieval_engine import RetrievalEngine

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/search", tags=["Search"])


@router.post("/universal", response_model=UniversalSearchResponse)
async def search_universal(
    request: UniversalSearchRequest, engine: RetrievalEngine = Depends(get_retrieval_engine)
):
    """Endpoint for generic/keyword search."""
    try:
        return await search_service.search_universal(request, engine)
    except Exception as exc:
        logger.exception("Failed to execute universal search")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc


@router.post("/semantic", response_model=SemanticSearchResponse)
async def search_semantic(
    request: SemanticSearchRequest, engine: RetrievalEngine = Depends(get_retrieval_engine)
):
    """Endpoint for vector semantic similarity search."""
    try:
        return await search_service.search_semantic(request, engine)
    except Exception as exc:
        logger.exception("Failed to execute semantic search")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc


@router.post("/graph", response_model=GraphSearchResponse)
async def search_graph(
    request: GraphSearchRequest, engine: RetrievalEngine = Depends(get_retrieval_engine)
):
    """Endpoint for graph traversal search via Cypher."""
    try:
        return await search_service.search_graph(request, engine)
    except Exception as exc:
        logger.exception("Failed to execute graph search")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc


@router.post("/hybrid", response_model=HybridSearchResponse)
async def search_hybrid(
    request: HybridSearchRequest, engine: RetrievalEngine = Depends(get_retrieval_engine)
):
    """Endpoint for hybrid RRF search (Semantic + Graph)."""
    try:
        return await search_service.search_hybrid(request, engine)
    except Exception as exc:
        logger.exception("Failed to execute hybrid search")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc
