"""Memory engine module for creating and linking memory graph nodes."""

import datetime
from typing import Any, Dict, List, Optional
import uuid

from packages.runtime.context import ContextObject
from packages.storage.arcadedb.operations import ArcadeDBRepository


class MemoryEngine:
    """
    Handles CRUD operations for Semantic and Episodic memories.
    Persists data into the ArcadeDB knowledge graph and vector index.
    """

    def __init__(self, db_provider: ArcadeDBRepository):
        self.db = db_provider

    def add_memory(
        self,
        tenant_id: str,
        content: str,
        memory_type: str = "semantic",
        metadata: Optional[Dict[str, Any]] = None,
        embedding: Optional[List[float]] = None,
    ) -> ContextObject:
        """
        Creates a new memory ContextObject and persists it.
        """
        memory_id = str(uuid.uuid4())
        timestamp = datetime.datetime.utcnow().isoformat()

        ctx = ContextObject(
            id=memory_id,
            tenant_id=tenant_id,
            type=memory_type,
            content=content,
            metadata=metadata or {},
            timestamp=timestamp,
        )

        # 1. Create Document / Vertex in ArcadeDB
        node_properties = ctx.to_dict()
        if embedding:
            node_properties["embedding"] = embedding

        # The provider maps this to an ArcadeDB Vertex creation
        self.db.create_node(label="ContextNode", properties=node_properties)

        # 2. If it has an embedding, upsert into the vector index
        if embedding:
            self.db.upsert_vectors([{
                "id": memory_id,
                "vector": embedding,
                "metadata": {"tenant_id": tenant_id, "type": memory_type}
            }])

        return ctx

    def link_memories(
        self, source_id: str, target_id: str, relationship: str, weight: float = 1.0
    ) -> str:
        """
        Creates a structural graph edge between two memories.
        """
        return self.db.create_edge(
            source_id=source_id,
            target_id=target_id,
            relationship=relationship,
            properties={"weight": weight, "timestamp": datetime.datetime.utcnow().isoformat()},
        )
