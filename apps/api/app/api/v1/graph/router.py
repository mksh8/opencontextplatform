from fastapi import APIRouter, HTTPException
import logging
from apps.api.app.modules.graph.service import graph_service
from apps.api.app.modules.graph.schemas import GraphData

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/graph", tags=["Graph"])


@router.get("/{org_id}/explorer", response_model=GraphData)
def get_explorer_graph(org_id: str):
    """Get graph topology for Graph Explorer."""
    try:
        return graph_service.get_explorer_graph(org_id)
    except Exception:
        logger.exception("Failed to retrieve explorer graph")
        raise HTTPException(status_code=500, detail="Internal Server Error")
