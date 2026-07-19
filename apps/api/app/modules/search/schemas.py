from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional


# Base Models
class SearchResult(BaseModel):
    id: str
    title: str
    type: str
    score: float
    source: str = "Unknown"
    tags: List[str] = Field(default_factory=list)
    snippet: str = ""
    timestamp: str = ""
    metadata: Dict[str, Any] = Field(default_factory=dict)


# Universal Search
class UniversalSearchRequest(BaseModel):
    query: str
    filters: dict = Field(default_factory=dict)
    limit: int = 10

class UniversalSearchResponse(BaseModel):
    results: List[SearchResult]
    total: int
    execution_time_ms: int


# Semantic Search
class SemanticSearchRequest(BaseModel):
    query: str
    top_k: int = 10
    threshold: float = 0.75
    model: str = "text-embedding-3-small"

class SemanticSearchResult(SearchResult):
    cosine_similarity: float

class SemanticSearchResponse(BaseModel):
    results: List[SemanticSearchResult]
    vectorization_time_ms: int
    search_time_ms: int


# Graph Search
class GraphSearchRequest(BaseModel):
    cypher_query: str

class GraphNode(BaseModel):
    id: str
    label: str
    properties: Dict[str, Any]

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    type: str
    properties: Dict[str, Any]

class GraphSearchResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    execution_time_ms: int


# Hybrid Search
class HybridSearchRequest(BaseModel):
    query: str
    semantic_weight: float = 0.75

class HybridSearchResponse(BaseModel):
    vector_results: List[SemanticSearchResult]
    graph_context: List[Dict[str, Any]]
    synthesized_prompt: str
    execution_time_ms: int
