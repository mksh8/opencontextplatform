from apps.api.app.modules.search.schemas import (
    UniversalSearchRequest,
    UniversalSearchResponse,
    SemanticSearchRequest,
    SemanticSearchResponse,
    GraphSearchRequest,
    GraphSearchResponse,
    HybridSearchRequest,
    HybridSearchResponse,
)
from runtime.retrieval_engine import RetrievalEngine
import time


class SearchService:
    async def search_universal(self, request: UniversalSearchRequest, engine: RetrievalEngine) -> UniversalSearchResponse:
        """Mocked universal search response"""
        return UniversalSearchResponse(
            results=[
                {
                    "id": "ctx_71586e68",
                    "title": "Project Apollo Architecture Spec",
                    "type": "Context",
                    "score": 0.98,
                    "source": "API",
                    "tags": ["architecture", "spec"],
                    "snippet": "The core event routing system is designed to handle 10k messages per second...",
                    "timestamp": "2 days ago",
                    "metadata": {}
                },
                {
                    "id": "ctx_92401a2c",
                    "title": "Weekly Engineering Sync - Q2 Planning",
                    "type": "Context",
                    "score": 0.85,
                    "source": "Slack",
                    "tags": ["meeting-notes"],
                    "snippet": "Jane: 'Are we still on track to migrate the event routing logic...'",
                    "timestamp": "1 week ago",
                    "metadata": {}
                }
            ],
            total=2,
            execution_time_ms=120
        )

    async def search_semantic(self, request: SemanticSearchRequest, engine: RetrievalEngine) -> SemanticSearchResponse:
        """Mocked semantic search response"""
        return SemanticSearchResponse(
            results=[
                {
                    "id": "ctx_abc123",
                    "title": "Feature Requirements: Connectors V2",
                    "type": "Context",
                    "score": 0.94,
                    "source": "Google Drive",
                    "tags": [],
                    "snippet": "The new connector framework will abstract away the raw HTTP calls...",
                    "timestamp": "",
                    "metadata": {},
                    "cosine_similarity": 0.94
                },
                {
                    "id": "ctx_def456",
                    "title": "Meeting Notes: Integrations Sync",
                    "type": "Context",
                    "score": 0.81,
                    "source": "Slack",
                    "tags": [],
                    "snippet": "We discussed how we should handle the OAuth flow for 3rd party providers...",
                    "timestamp": "",
                    "metadata": {},
                    "cosine_similarity": 0.81
                }
            ],
            vectorization_time_ms=120,
            search_time_ms=45
        )

    async def search_graph(self, request: GraphSearchRequest, engine: RetrievalEngine) -> GraphSearchResponse:
        """Mocked graph search response"""
        return GraphSearchResponse(
            nodes=[
                {"id": "col_eng_specs", "label": "Collection", "properties": {"name": "Engineering Specs", "count": 14230}},
                {"id": "ctx_71586e68", "label": "Context", "properties": {"title": "Project Apollo", "source": "API"}},
                {"id": "ctx_92401a2c", "label": "Context", "properties": {"title": "Weekly Sync", "source": "Slack"}}
            ],
            edges=[
                {"id": "edge_1", "source": "ctx_71586e68", "target": "col_eng_specs", "type": "BELONGS_TO", "properties": {}},
                {"id": "edge_2", "source": "ctx_92401a2c", "target": "col_eng_specs", "type": "BELONGS_TO", "properties": {}}
            ],
            execution_time_ms=62
        )

    async def search_hybrid(self, request: HybridSearchRequest, engine: RetrievalEngine) -> HybridSearchResponse:
        """Mocked hybrid search response"""
        synthesized = f"""[SYSTEM]
You are answering a user query using the provided context.

[CONTEXT]
Document: Project Apollo Architecture Spec (From Collection: Engineering Specs)
Content: The core event routing system is designed to handle 10k messages per second...

Related Discussion (Slack): Weekly Sync
Jane: "Are we still on track to migrate the event routing logic..."

[QUERY]
{request.query}"""

        return HybridSearchResponse(
            vector_results=[
                {
                    "id": "ctx_71586e68",
                    "title": "Project Apollo Architecture Spec",
                    "type": "Context",
                    "score": 0.94,
                    "source": "API",
                    "tags": [],
                    "snippet": "The core event routing system is designed to handle 10k messages...",
                    "timestamp": "",
                    "metadata": {},
                    "cosine_similarity": 0.94
                },
                {
                    "id": "ctx_10573b9e",
                    "title": "packages/core/routing.ts",
                    "type": "Context",
                    "score": 0.72,
                    "source": "Code",
                    "tags": [],
                    "snippet": "Implements the main event routing loop...",
                    "timestamp": "",
                    "metadata": {},
                    "cosine_similarity": 0.72
                }
            ],
            graph_context=[
                {
                    "traversal": "ctx_71586e68 -[:BELONGS_TO]->",
                    "node": "col_eng_specs (Collection)",
                    "description": "Brings in context from the 'Engineering Specs' collection boundaries."
                },
                {
                    "traversal": "ctx_71586e68 <-[:DEPENDS_ON]-",
                    "node": "ctx_92401a2c (Slack Thread)",
                    "description": "Brings in discussion thread discussing the migration timeline."
                }
            ],
            synthesized_prompt=synthesized,
            execution_time_ms=180
        )


search_service = SearchService()
