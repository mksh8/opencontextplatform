from typing import Dict, Any
from .arcadedb_provider import ArcadeDBProvider


class MemoryEngine:
    """
    Memory Engine for OpenContextPlatform.
    Persists and manages session, episodic, and semantic memory using the unified
    database.
    """

    def __init__(self, db_provider: ArcadeDBProvider):
        self.db = db_provider

    def save_memory(self, context_obj: Dict[str, Any]) -> str:
        """
        Ingests a new context object (memory) into the database.
        Maps directly to the /context POST endpoint.
        """
        # Ensure base schema requirements from RFC 0002
        if (
            "id" not in context_obj
            or "tenant_id" not in context_obj
            or "type" not in context_obj
        ):
            raise ValueError("ContextObject missing required identity fields")

        record_id = self.db.insert_context_node(context_obj)
        return record_id

    def get_all_contexts(self) -> dict:
        """
        Retrieves all context objects from ArcadeDB.
        """
        # Execute query against ArcadeDB
        results = self.db.execute_command("sql", "SELECT * FROM ContextNode ORDER BY @rid DESC LIMIT 50")
        
        # If ArcadeDB returns nothing or isn't connected, we fallback to an empty list
        # We can map the returned ArcadeDB Document properties to our frontend schema
        mapped_data = []
        for row in results:
            import json
            metadata = {}
            if "metadata_json" in row and row["metadata_json"]:
                try:
                    metadata = json.loads(row["metadata_json"])
                except Exception:
                    pass
                    
            mapped_data.append({
                "id": str(row.get("id") or "unknown_id"),
                "title": str(metadata.get("title") or row.get("id") or "Untitled"),
                "type": str(row.get("type") or "Document"),
                "source": str(row.get("provider") or "Unknown"),
                "workspace": str(row.get("tenant_id") or "Default"),
                "tokens": str(metadata.get("tokens") or "0"),
                "updated": "Just now", # In reality, parse from ArcadeDB timestamp
            })

        return {
            "data": mapped_data,
            "total": len(mapped_data),
            "page": 1,
        }
