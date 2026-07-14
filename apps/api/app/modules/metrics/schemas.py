from pydantic import BaseModel
from typing import Dict


class MetricsResponse(BaseModel):
    total_tokens: str
    total_queries: str
    storage_used: str
    estimated_cost: str
    trends: Dict[str, str]
