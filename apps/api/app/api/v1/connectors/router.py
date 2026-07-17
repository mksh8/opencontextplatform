import logging
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from apps.api.app.modules.connectors.service import connector_service
from apps.api.app.modules.connectors.schemas import Connector, ConnectorCreateRequest, ConnectorSyncResponse
from apps.api.app.api.dependencies import get_db_session, get_memory_engine, require_permissions
from sqlalchemy.orm import Session
from runtime.memory_engine import MemoryEngine
from packages.enterprise.audit_logger import AuditLogger

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/connectors", tags=["Connectors"])


@router.get("/{org_id}", response_model=List[Connector])
def get_connectors(org_id: str, db: Session = Depends(get_db_session)):
    """Get all connectors for an organization."""
    try:
        return connector_service.get_connectors(org_id, db)
    except Exception:
        logger.exception("Failed to retrieve connectors")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/{org_id}")
def register_connector(
    org_id: str, 
    request: ConnectorCreateRequest, 
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("write"))
):
    """Register a new integration connector."""
    try:
        result = connector_service.create_connector(org_id, request, db)
        AuditLogger.log_event("register_connector", user.get("sub"), request.name, "success", {"type": request.type})
        return result
    except Exception as e:
        logger.exception("Failed to register connector")
        AuditLogger.log_event("register_connector", user.get("sub"), request.name, "failure", {"error": str(e)})
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{connector_id}/sync", response_model=ConnectorSyncResponse)
def sync_connector(
    connector_id: str, 
    db: Session = Depends(get_db_session),
    memory: MemoryEngine = Depends(get_memory_engine),
    user: Dict[str, Any] = Depends(require_permissions("write"))
):
    """Trigger an ingestion job for a specific connector."""
    try:
        result = connector_service.sync_connector(connector_id, db, memory)
        AuditLogger.log_event("sync_connector", user.get("sub"), connector_id, "success", {"items_synced": result.items_synced})
        return result
    except Exception as e:
        logger.exception(f"Sync failed for connector {connector_id}")
        AuditLogger.log_event("sync_connector", user.get("sub"), connector_id, "failure", {"error": str(e)})
        raise HTTPException(status_code=500, detail=str(e))
