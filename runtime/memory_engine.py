"""Memory engine module for saving and retrieving context documents in ArcadeDB."""

import json
from typing import Any, Dict
import uuid

from packages.storage.arcadedb.operations import ArcadeDBRepository


class MemoryEngine:
    """
    Manages episodic and semantic memory insertion, clustering, and summarization.
    """

    def __init__(self, db_provider: ArcadeDBRepository):
        self.db = db_provider

    def save_memory(self, context_obj: Dict[str, Any]) -> str:
        """
        Ingests a new context object (memory) into the database.
        Maps directly to the /context POST endpoint.
        """
        if (
            "id" not in context_obj
            or "tenant_id" not in context_obj
            or "type" not in context_obj
        ):
            raise ValueError("ContextObject missing required identity fields")

        metadata_str = json.dumps(context_obj.get("metadata", {}))

        self.db.graph.execute_command(
            "sql",
            "INSERT INTO ContextNode "
            "SET id = :id, tenant_id = :tenant_id, type = :type, provider = :provider, "
            "content = :content, metadata_json = :metadata_json",
            {
                "id": context_obj["id"],
                "tenant_id": context_obj["tenant_id"],
                "type": context_obj["type"],
                "provider": context_obj.get("provider", "Unknown"),
                "content": context_obj.get("content", ""),
                "metadata_json": metadata_str,
            },
        )
        return context_obj["id"]

    def get_all_contexts(self) -> dict:
        """
        Retrieves all context objects from ArcadeDB.
        """
        results = self.db.graph.execute_command(
            "sql", "SELECT * FROM ContextNode ORDER BY @rid DESC LIMIT 50"
        )

        mapped_data = []
        for row in results:
            metadata = {}
            if "metadata_json" in row and row["metadata_json"]:
                try:
                    metadata = json.loads(row["metadata_json"])
                except Exception:  # pylint: disable=broad-exception-caught
                    pass

            mapped_data.append({
                "id": str(row.get("id") or f"unknown_{uuid.uuid4().hex[:8]}"),
                "title": str(metadata.get("title") or row.get("id") or "Untitled"),
                "type": str(row.get("type") or "Document"),
                "source": str(row.get("provider") or "Unknown"),
                "workspace": str(row.get("tenant_id") or "Default"),
                "tokens": str(metadata.get("tokens") or "0"),
                "updated": "Just now",
            })

        return {
            "data": mapped_data,
            "total": len(mapped_data),
            "page": 1,
        }
