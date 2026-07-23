"""Billing Pydantic schemas."""

from typing import List, Optional

from pydantic import BaseModel


class WorkspaceUsage(BaseModel):
    """Workspace usage breakdown schema."""
    name: str
    percent: float
    hue: Optional[str] = None


class UsageMetrics(BaseModel):
    """Metrics payload for usage breakdown."""
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
    """Cost details breakdown for a service."""
    name: str
    cost: str
    percentage: str
    color: str


class InvoiceSummary(BaseModel):
    """Summary schema for invoice services."""
    services: List[CostService]


class APIKey(BaseModel):
    """Legacy API Key schema for billing."""
    name: str
    key: str
    scopes: str
    created_at: str
    status: str


class APIKeyCreateRequest(BaseModel):
    """Legacy API key create request schema."""
    name: str
    scopes: str
