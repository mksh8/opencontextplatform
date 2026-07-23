from fastapi import APIRouter, Depends, HTTPException
import logging
from typing import Dict, Any
from pydantic import BaseModel
from apps.api.app.modules.context.service import context_service
from apps.api.app.modules.context.schemas import ContextResponse, ContextCreateRequest, ContextDetailResponse, ContextMetadataBulkRequest
from apps.api.app.api.dependencies import get_memory_engine, require_permissions
from runtime.memory_engine import MemoryEngine
from packages.enterprise.audit_logger import AuditLogger

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contexts", tags=["Contexts"])


@router.get("", response_model=ContextResponse)
def get_contexts(
    engine: MemoryEngine = Depends(get_memory_engine),
    user: Dict[str, Any] = Depends(require_permissions("read"))
):
    """Endpoint returning ingested context data, delegated to service."""
    try:
        return context_service.get_all_contexts(engine)
    except Exception:
        logger.exception("Failed to retrieve contexts")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("")
def create_context(
    request: ContextCreateRequest,
    engine: MemoryEngine = Depends(get_memory_engine),
    user: Dict[str, Any] = Depends(require_permissions("write"))
):
    """Create a new context node."""
    try:
        result = context_service.create_context(request, engine)
        AuditLogger.log_event("create_context", user.get("sub"), result["id"], "success")
        return result
    except Exception as e:
        logger.exception("Failed to create context")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{context_id}", response_model=ContextDetailResponse)
def get_context(
    context_id: str,
    engine: MemoryEngine = Depends(get_memory_engine),
    user: Dict[str, Any] = Depends(require_permissions("read"))
):
    """Get context details."""
    try:
        return context_service.get_context_by_id(context_id, engine)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.exception(f"Failed to get context {context_id}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{context_id}")
def delete_context(
    context_id: str,
    engine: MemoryEngine = Depends(get_memory_engine),
    user: Dict[str, Any] = Depends(require_permissions("write"))
):
    """Delete a context."""
    try:
        result = context_service.delete_context(context_id, engine)
        AuditLogger.log_event("delete_context", user.get("sub"), context_id, "success")
        return result
    except Exception as e:
        logger.exception(f"Failed to delete context {context_id}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{context_id}")
def update_context(
    context_id: str,
    request: dict, # Using dict here since we accept any JSON for payload, or we can use ContextUpdateRequest
    engine: MemoryEngine = Depends(get_memory_engine),
    user: Dict[str, Any] = Depends(require_permissions("write"))
):
    """Update context content."""
    try:
        result = context_service.update_context(context_id, request, engine)
        AuditLogger.log_event("update_context", user.get("sub"), context_id, "success")
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class SemanticSearchRequest(BaseModel):
    query: str

@router.get("/{context_id}/embeddings")
def get_context_embeddings(
    context_id: str,
    engine: MemoryEngine = Depends(get_memory_engine),
    user: Dict[str, Any] = Depends(require_permissions("read"))
):
    """Get vector embeddings for a context node."""
    try:
        return context_service.get_context_embeddings(context_id, engine)
    except Exception as e:
        logger.exception(f"Failed to get embeddings for context {context_id}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{context_id}/search")
def search_context_embeddings(
    context_id: str,
    request: SemanticSearchRequest,
    engine: MemoryEngine = Depends(get_memory_engine),
    user: Dict[str, Any] = Depends(require_permissions("read"))
):
    """Test semantic search against a context node's embeddings."""
    try:
        return context_service.search_context_embeddings(context_id, request.query, engine)
    except Exception as e:
        logger.exception(f"Failed to search context {context_id}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/metadata/all")
def get_all_metadata(
    engine: MemoryEngine = Depends(get_memory_engine)
):
    """Retrieve all custom metadata across all contexts. Auth bypassed for local UI."""
    try:
        return context_service.get_all_metadata(engine)
    except Exception as e:
        logger.exception("Failed to retrieve global metadata")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/metadata/bulk")
def bulk_add_metadata(
    request: ContextMetadataBulkRequest,
    engine: MemoryEngine = Depends(get_memory_engine)
):
    """Bulk assign metadata to contexts. Authentication bypassed for local development."""
    try:
        result = context_service.bulk_add_metadata(request, engine)
        AuditLogger.log_event("bulk_add_metadata", "local_user", "multiple", "success")
        return result
    except Exception as e:
        logger.exception("Failed to bulk assign metadata")
        raise HTTPException(status_code=500, detail=str(e))
