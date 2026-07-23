"""Graph Pydantic schemas."""

from typing import List

from pydantic import BaseModel


class GraphNode(BaseModel):
    """Graph node layout schema."""
    id: str
    label: str
    type: str
    x: float
    y: float
    color: str


class GraphEdge(BaseModel):
    """Graph edge relationship schema."""
    source_id: str
    target_id: str
    label: str


class GraphData(BaseModel):
    """Graph topology container schema."""
    nodes: List[GraphNode]
    edges: List[GraphEdge]


class IndexCodeRequest(BaseModel):
    """Code indexing payload schema."""
    file_name: str
    source_code: str
