"""Graph router endpoints."""

import logging
from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException

from apps.api.app.api.dependencies import (
    get_arcadedb_repository,
    require_permissions,
)
from apps.api.app.modules.graph.schemas import GraphData, IndexCodeRequest
from apps.api.app.modules.graph.service import graph_service
from packages.enterprise.audit_logger import AuditLogger
from packages.storage.arcadedb.operations import ArcadeDBRepository

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/graph", tags=["Graph"])


@router.get("/{org_id}/explorer", response_model=GraphData)
def get_explorer_graph(
    org_id: str, db: ArcadeDBRepository = Depends(get_arcadedb_repository)
):
    """Get graph topology for Graph Explorer."""
    try:
        return graph_service.get_explorer_graph(org_id, db)
    except Exception as exc:
        logger.exception("Failed to retrieve explorer graph")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc


@router.get("/context/{context_id}", response_model=GraphData)
def get_context_subgraph(
    context_id: str, db: ArcadeDBRepository = Depends(get_arcadedb_repository)
):
    """Get subgraph for a specific ContextNode."""
    try:
        return graph_service.get_context_subgraph(context_id, db)
    except Exception as exc:
        logger.exception("Failed to retrieve context subgraph")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc


@router.post("/index-code", response_model=Dict[str, Any])
def index_code(
    request: IndexCodeRequest,
    db: ArcadeDBRepository = Depends(get_arcadedb_repository),
    user: Dict[str, Any] = Depends(require_permissions("write")),
):
    """Parses a Python file into an AST and stores the structured graph in ArcadeDB."""
    try:
        result = graph_service.index_file(request.file_name, request.source_code, db)
        AuditLogger.log_event(
            "index_code",
            user.get("sub"),
            request.file_name,
            "success",
            {"nodes": result.get("nodes_created")},
        )
        return result
    except Exception as e:
        logger.exception("Failed to index code")
        AuditLogger.log_event(
            "index_code",
            user.get("sub"),
            request.file_name,
            "failure",
            {"error": str(e)},
        )
        raise HTTPException(status_code=400, detail=str(e)) from e
