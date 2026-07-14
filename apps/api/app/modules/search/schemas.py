from pydantic import BaseModel, Field
from typing import List, Dict, Any


class SearchRequest(BaseModel):
    query: str
    filters: dict = Field(default_factory=dict)
    limit: int = 10


class SearchResult(BaseModel):
    id: str
    title: str
    type: str
    score: float
    metadata: Dict[str, Any]


class SearchResponse(BaseModel):
    results: List[SearchResult]
    total: int
    page: int
    query_echo: str
