import uuid
from typing import Dict, Any
from .graph_ops import ArcadeDBGraphOperations

class EpisodeNodeOperations:
    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db

    def insert_episode(self, episode_obj: Dict[str, Any]) -> str:
        """Inserts an Episode as a Vertex in ArcadeDB."""
        self.db.create_schema() # Ensure schema
        ep_id = episode_obj.get("id", f"ep_{uuid.uuid4().hex[:8]}")
        self.db.execute_command("sql", """
            INSERT INTO Episode 
            SET id = :id, tenant_id = :tenant_id, source = :source
        """, {
            "id": ep_id,
            "tenant_id": episode_obj.get("tenant_id", "default"),
            "source": episode_obj.get("source", "unknown")
        })
        return ep_id
