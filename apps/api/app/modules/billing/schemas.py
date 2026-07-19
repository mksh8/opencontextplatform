from pydantic import BaseModel
from typing import List, Optional


class WorkspaceUsage(BaseModel):
    name: str
    percent: float
    hue: Optional[str] = None


class UsageMetrics(BaseModel):
    total_tokens: str
    tokens_trend: str
    total_queries: str
    queries_trend: str
    storage_used: str
    storage_trend: str
    estimated_cost: str
    cost_trend: str
    # Optional per-workspace breakdown for UI consumption
    workspaces: List[WorkspaceUsage] = []


class CostService(BaseModel):
    name: str
    cost: str
    percentage: str
    color: str


class InvoiceSummary(BaseModel):
    services: List[CostService]


class APIKey(BaseModel):
    name: str
    key: str
    scopes: str
    created_at: str
    status: str

class APIKeyCreateRequest(BaseModel):
    name: str
    scopes: str
