from pydantic import BaseModel
from typing import List, Dict, Any, Optional

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
