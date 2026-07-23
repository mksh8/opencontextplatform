"""Connectors router endpoints."""

import logging
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from apps.api.app.api.dependencies import (
    get_arcadedb_repository,
    get_db_session,
    require_permissions,
)
from apps.api.app.modules.connectors.schemas import (
    Connector,
    ConnectorCreateRequest,
    ConnectorSyncResponse,
    IngestionJobListResponse,
)
from apps.api.app.modules.connectors.service import connector_service
from packages.enterprise.audit_logger import AuditLogger
from packages.storage.arcadedb.operations import ArcadeDBRepository

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/connectors", tags=["Connectors"])


@router.get("/{org_id}", response_model=List[Connector])
def get_connectors(org_id: str, db: Session = Depends(get_db_session)):
    """Get all connectors for an organization."""
    try:
        return connector_service.get_connectors(org_id, db)
    except Exception as exc:
        logger.exception("Failed to retrieve connectors")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc


@router.post("/{org_id}")
def register_connector(
    org_id: str,
    request: ConnectorCreateRequest,
    db: Session = Depends(get_db_session),
    user: Dict[str, Any] = Depends(require_permissions("write")),
):
    """Register a new integration connector."""
    try:
        result = connector_service.create_connector(org_id, request, db)
        AuditLogger.log_event(
            "register_connector",
            user.get("sub"),
            request.name,
            "success",
            {"type": request.type},
        )
        return result
    except Exception as e:
        logger.exception("Failed to register connector")
        AuditLogger.log_event(
            "register_connector",
            user.get("sub"),
            request.name,
            "failure",
            {"error": str(e)},
        )
        raise HTTPException(status_code=400, detail=str(e)) from e


@router.post("/{connector_id}/sync", response_model=ConnectorSyncResponse)
def sync_connector(
    connector_id: str,
    db: Session = Depends(get_db_session),
    arcadedb: ArcadeDBRepository = Depends(get_arcadedb_repository),
    user: Dict[str, Any] = Depends(require_permissions("write")),
):
    """Trigger an ingestion job for a specific connector."""
    try:
        result = connector_service.sync_connector(connector_id, db, arcadedb)
        AuditLogger.log_event(
            "sync_connector",
            user.get("sub"),
            connector_id,
            "success",
            {"items_synced": result.contexts_synced},
        )
        return result
    except Exception as e:
        logger.exception("Sync failed for connector %s", connector_id)
        AuditLogger.log_event(
            "sync_connector",
            user.get("sub"),
            connector_id,
            "failure",
            {"error": str(e)},
        )
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/{org_id}/jobs", response_model=IngestionJobListResponse)
def get_jobs(_org_id: str, db: Session = Depends(get_db_session)):
    """Get all ingestion jobs for an organization."""
    try:
        return connector_service.get_jobs(db)
    except Exception as exc:
        logger.exception("Failed to retrieve ingestion jobs")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc
