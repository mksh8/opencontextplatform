from pydantic import BaseModel
from typing import List


class ContextItem(BaseModel):
    id: str
    title: str
    type: str
    source: str
    workspace: str
    tokens: str
    updated: str


class ContextResponse(BaseModel):
    data: List[ContextItem]
    total: int
    page: int

class ContextCreateRequest(BaseModel):
    title: str
    type: str
    source: str
    content: str

class ContextUpdateRequest(BaseModel):
    content: str

class ContextDetailResponse(BaseModel):
    id: str
    title: str
    type: str
    source: str
    workspace: str
    tokens: str
    content: str
    created_at: str

class ContextMetadataBulkRequest(BaseModel):
    context_ids: List[str]
    apply_to_all: bool = False
    key: str
    value: str
