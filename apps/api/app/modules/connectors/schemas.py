"""Connectors Pydantic schemas."""

from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class Connector(BaseModel):
    """Connector model schema."""
    id: str
    name: str
    icon: str
    status: str
    last_sync: str
    details: str


class ConnectorCreateRequest(BaseModel):
    """Connector registration request schema."""
    name: str
    type: str  # e.g., 'github', 'filesystem', 'notion'
    config: Dict[str, Any]


class ConnectorSyncResponse(BaseModel):
    """Connector ingestion trigger response schema."""
    status: str
    contexts_synced: int
    message: str
    job_id: Optional[str] = None


class IngestionJob(BaseModel):
    """Ingestion job tracking schema."""
    id: str
    connector_id: str
    connector_name: str
    connector_icon: str
    job_name: str
    status: str  # 'Running', 'Completed', 'Failed', 'Pending'
    progress: int
    started_at: str
    completed_at: Optional[str] = None
    error_message: Optional[str] = None


class IngestionJobListResponse(BaseModel):
    """Ingestion job list response container."""
    jobs: List[IngestionJob]
