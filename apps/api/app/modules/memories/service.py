from typing import List
from apps.api.app.modules.memories.schemas import MemoryNode


class MemoryService:
    def get_memories(self, org_id: str) -> List[MemoryNode]:
        """Returns mock isolated semantic memories."""
        return [
            MemoryNode(id="mem_1", content="Memory store is active.", type="system", timestamp="now"),
            MemoryNode(id="mem_2", content="User asked for Python examples.", type="user", timestamp="1h ago")
        ]


memory_service = MemoryService()
