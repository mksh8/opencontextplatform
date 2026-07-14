from pydantic import BaseModel
from typing import List

class GraphNode(BaseModel):
    id: str
    label: str
    type: str
    x: float
    y: float
    color: str

class GraphEdge(BaseModel):
    source_id: str
    target_id: str
    label: str

class GraphData(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
