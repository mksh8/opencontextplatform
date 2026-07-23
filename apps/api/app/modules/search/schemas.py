"""Search Pydantic schemas for Universal, Semantic, Graph, and Hybrid search."""

from typing import Any, Dict, List

from pydantic import BaseModel, Field


# Base Models
class SearchResult(BaseModel):
    """Generic search result schema."""
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
    """Universal search request payload schema."""
    query: str
    filters: dict = Field(default_factory=dict)
    limit: int = 10


class UniversalSearchResponse(BaseModel):
    """Universal search response payload schema."""
    results: List[SearchResult]
    total: int
    execution_time_ms: int


# Semantic Search
class SemanticSearchRequest(BaseModel):
    """Semantic vector search request schema."""
    query: str
    top_k: int = 10
    threshold: float = 0.75
    model: str = "text-embedding-3-small"


class SemanticSearchResult(SearchResult):
    """Semantic vector search result schema."""
    cosine_similarity: float


class SemanticSearchResponse(BaseModel):
    """Semantic vector search response schema."""
    results: List[SemanticSearchResult]
    vectorization_time_ms: int
    search_time_ms: int


# Graph Search
class GraphSearchRequest(BaseModel):
    """Graph traversal search request schema."""
    cypher_query: str


class GraphNode(BaseModel):
    """Graph node search representation."""
    id: str
    label: str
    properties: Dict[str, Any]


class GraphEdge(BaseModel):
    """Graph edge search representation."""
    id: str
    source: str
    target: str
    type: str
    properties: Dict[str, Any]


class GraphSearchResponse(BaseModel):
    """Graph search response payload schema."""
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    execution_time_ms: int


# Hybrid Search
class HybridSearchRequest(BaseModel):
    """Hybrid RRF search request payload schema."""
    query: str
    semantic_weight: float = 0.75


class HybridSearchResponse(BaseModel):
    """Hybrid RRF search response payload schema."""
    vector_results: List[SemanticSearchResult]
    graph_context: List[Dict[str, Any]]
    synthesized_prompt: str
    execution_time_ms: int
