"""Context Pydantic schemas."""

from typing import List

from pydantic import BaseModel


class ContextItem(BaseModel):
    """Context summary item schema."""
    id: str
    title: str
    type: str
    source: str
    workspace: str
    tokens: str
    updated: str


class ContextResponse(BaseModel):
    """Context list response wrapper."""
    data: List[ContextItem]
    total: int
    page: int


class ContextCreateRequest(BaseModel):
    """Context creation request payload schema."""
    title: str
    type: str
    source: str
    content: str


class ContextUpdateRequest(BaseModel):
    """Context update request payload schema."""
    content: str


class ContextDetailResponse(BaseModel):
    """Detailed view response for single context."""
    id: str
    title: str
    type: str
    source: str
    workspace: str
    tokens: str
    content: str
    created_at: str


class ContextMetadataBulkRequest(BaseModel):
    """Bulk metadata application request schema."""
    context_ids: List[str]
    apply_to_all: bool = False
    key: str
    value: str
