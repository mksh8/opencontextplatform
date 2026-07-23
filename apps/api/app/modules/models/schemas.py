from pydantic import BaseModel
from typing import List, Optional

class ModelItem(BaseModel):
    id: str
    name: str
    provider: str
    type: str
    status: str
    last_used: str

class ModelListResponse(BaseModel):
    models: List[ModelItem]
