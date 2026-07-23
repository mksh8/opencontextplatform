"""Retrieval engine for executing hybrid vector and graph queries."""

from typing import Any, Dict, List

from packages.storage.arcadedb.operations import ArcadeDBRepository


class RetrievalEngine:
    """
    Executes hybrid search (Vector + Graph) against the database provider.
    """

    def __init__(self, db_provider: ArcadeDBRepository):
        self.db = db_provider

    def hybrid_search(
        self,
        tenant_id: str,
        query_vector: List[float],
        query_string: str,
        top_k: int = 10,
    ) -> Dict[str, Any]:
        """
        Executes parallel vector and graph queries.
        Returns a dictionary containing raw results from both approaches.
        """
        # 1. Vector Search Phase (Semantic Similarity)
        # Using HNSW index on the embedding property
        vector_results = self.db.search_vectors(query_vector=query_vector, limit=top_k)

        # 2. Graph Search Phase (Structural Traversal)
        cypher_query = (
            f"MATCH (c:ContextNode)-[r*1..2]-(related) "
            f"WHERE c.tenant_id = '{tenant_id}' AND c.content CONTAINS '{query_string}' "
            f"RETURN related LIMIT {top_k}"
        )
        graph_results = self.db.traverse(cypher_query)

        return {
            "vector_hits": vector_results,
            "graph_hits": graph_results,
        }
