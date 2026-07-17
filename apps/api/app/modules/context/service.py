from runtime.memory_engine import MemoryEngine
from apps.api.app.modules.context.schemas import ContextCreateRequest, ContextDetailResponse
import uuid
import json


class ContextService:
    def get_all_contexts(self, engine: MemoryEngine):
        """Business logic for retrieving contexts, delegates to the Runtime Engine."""
        return engine.get_all_contexts()

    def create_context(self, request: ContextCreateRequest, engine: MemoryEngine) -> dict:
        """Create a new context node."""
        ctx_id = f"ctx_{uuid.uuid4().hex[:8]}"
        context_obj = {
            "id": ctx_id,
            "tenant_id": "tenant_1", # Hardcoded for demo
            "type": request.type,
            "provider": request.source,
            "content": request.content,
            "metadata": {
                "title": request.title,
                "tokens": str(len(request.content) // 4) # Rough token estimate
            }
        }
        engine.save_memory(context_obj)
        return {"id": ctx_id, "status": "success"}
        
    def get_context_by_id(self, context_id: str, engine: MemoryEngine) -> ContextDetailResponse:
        """Fetch a single context by ID."""
        results = engine.db.execute_command("sql", "SELECT * FROM ContextNode WHERE id = :id", {"id": context_id})
        if not results:
            raise ValueError(f"Context {context_id} not found")
            
        row = results[0]
        metadata = {}
        if "metadata_json" in row and row["metadata_json"]:
            try:
                metadata = json.loads(row["metadata_json"])
            except Exception:
                pass
                
        return ContextDetailResponse(
            id=row.get("id"),
            title=metadata.get("title", row.get("id")),
            type=row.get("type", "Document"),
            source=row.get("provider", "Unknown"),
            workspace=row.get("tenant_id", "Default"),
            tokens=metadata.get("tokens", "0"),
            content=row.get("content", ""),
            created_at="Just now"
        )
        
    def delete_context(self, context_id: str, engine: MemoryEngine):
        """Delete a context by ID."""
        engine.db.execute_command("sql", "DELETE FROM ContextNode WHERE id = :id", {"id": context_id})
        return {"status": "success", "id": context_id}

    def update_context(self, context_id: str, request: dict, engine: MemoryEngine):
        """Update a context's content by ID."""
        # We need to escape single quotes if we are doing direct injection, or just use parameters.
        # execute_command supports positional or named parameters.
        engine.db.execute_command(
            "sql", 
            "UPDATE ContextNode SET content = :content WHERE id = :id", 
            {"content": request["content"], "id": context_id}
        )
        return {"status": "success", "id": context_id}

    def get_context_embeddings(self, context_id: str, engine: MemoryEngine) -> dict:
        """Fetch embedding representation for a context node."""
        import random
        # Since we don't have a real vector DB hooked up to ArcadeDB vectors yet, 
        # we will simulate the 1536-dimensional vector (OpenAI text-embedding-3-small)
        mock_vector = [round(random.uniform(-0.1, 0.1), 6) for _ in range(15)]
        
        return {
            "context_id": context_id,
            "model": "text-embedding-3-small",
            "dimensions": 1536,
            "vector_preview": mock_vector,
            "status": "indexed"
        }

    def search_context_embeddings(self, context_id: str, query: str, engine: MemoryEngine) -> dict:
        """Simulate a semantic search within this specific context."""
        import random
        words = query.lower().split()
        score = random.uniform(0.4, 0.7)
        if any(w in "test context memory ai vector" for w in words):
            score += 0.2
            
        return {
            "query": query,
            "similarity_score": round(score, 3),
            "match_found": score > 0.75,
            "message": "High semantic match!" if score > 0.75 else "Low semantic match."
        }

context_service = ContextService()
