from fastapi import APIRouter, HTTPException, Depends
import logging
from typing import Dict, Any
from apps.api.app.modules.graph.service import graph_service
from apps.api.app.modules.graph.schemas import GraphData, IndexCodeRequest
from apps.api.app.api.dependencies import get_arcadedb_provider, require_permissions
from runtime.arcadedb_provider import ArcadeDBProvider
from packages.enterprise.audit_logger import AuditLogger

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/graph", tags=["Graph"])


@router.get("/{org_id}/explorer", response_model=GraphData)
def get_explorer_graph(org_id: str, db: ArcadeDBProvider = Depends(get_arcadedb_provider)):
    """Get graph topology for Graph Explorer."""
    try:
        return graph_service.get_explorer_graph(org_id, db)
    except Exception:
        logger.exception("Failed to retrieve explorer graph")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/context/{context_id}", response_model=GraphData)
def get_context_subgraph(context_id: str, db: ArcadeDBProvider = Depends(get_arcadedb_provider)):
    """Get subgraph for a specific ContextNode."""
    try:
        return graph_service.get_context_subgraph(context_id, db)
    except Exception:
        logger.exception("Failed to retrieve context subgraph")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/index-code", response_model=Dict[str, Any])
def index_code(
    request: IndexCodeRequest, 
    db: ArcadeDBProvider = Depends(get_arcadedb_provider),
    user: Dict[str, Any] = Depends(require_permissions("write"))
):
    """Parses a Python file into an AST and stores the structured graph in ArcadeDB."""
    try:
        result = graph_service.index_file(request.file_name, request.source_code, db)
        AuditLogger.log_event("index_code", user.get("sub"), request.file_name, "success", {"nodes": result.get("nodes_created")})
        return result
    except Exception as e:
        logger.exception("Failed to index code")
        AuditLogger.log_event("index_code", user.get("sub"), request.file_name, "failure", {"error": str(e)})
        raise HTTPException(status_code=400, detail=str(e))
