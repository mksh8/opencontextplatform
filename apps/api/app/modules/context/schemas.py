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
