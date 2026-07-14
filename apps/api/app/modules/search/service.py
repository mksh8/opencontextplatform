from apps.api.app.modules.search.schemas import SearchRequest
from runtime.retrieval_engine import RetrievalEngine

class SearchService:
    async def search(self, request: SearchRequest, engine: RetrievalEngine):
        """Business logic for searching context, delegates to Runtime Engine."""
        # We need a mock query embedding for the stub method signature
        mock_embedding = [0.1, 0.2, 0.3]
        
        # Call the actual runtime retrieval engine
        raw_results = engine.search(
            tenant_id="default", 
            query=request.query, 
            query_embedding=mock_embedding
        )
        
        # The engine currently returns an empty list [] because the ArcadeDB connection is stubbed.
        # We'll map the response format expected by the frontend.
        return {
            "results": raw_results,
            "total": len(raw_results),
            "page": 1,
            "query_echo": f"[RetrievalEngine] {request.query}"
        }

search_service = SearchService()
