from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class Connector(BaseModel):
    id: str
    name: str
    icon: str
    status: str
    last_sync: str
    details: str

class ConnectorCreateRequest(BaseModel):
    name: str
    type: str  # e.g., 'github', 'filesystem', 'notion'
    config: Dict[str, Any]

class ConnectorSyncResponse(BaseModel):
    status: str
    contexts_synced: int
    message: str
    job_id: Optional[str] = None

class IngestionJob(BaseModel):
    id: str
    connector_id: str
    connector_name: str
    connector_icon: str
    job_name: str
    status: str # 'Running', 'Completed', 'Failed', 'Pending'
    progress: int
    started_at: str
    completed_at: Optional[str] = None
    error_message: Optional[str] = None

class IngestionJobListResponse(BaseModel):
    jobs: List[IngestionJob]
