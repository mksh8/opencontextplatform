from typing import Dict, Any, List

class RankingEngine:
    """
    Implements Reciprocal Rank Fusion (RRF) to merge and score vector and graph results.
    """
    def __init__(self, k_constant: int = 60):
        # k_constant is a standard tuning parameter for RRF
        self.k_constant = k_constant

    def reciprocal_rank_fusion(self, vector_hits: List[Dict[str, Any]], graph_hits: List[Dict[str, Any]], hybrid_weight: float = 0.5) -> List[Dict[str, Any]]:
        """
        Merges two ranked lists using RRF, biased by the hybrid_weight.
        hybrid_weight = 1.0 (Vector only)
        hybrid_weight = 0.0 (Graph only)
        hybrid_weight = 0.5 (Equal blend)
        """
        scores: Dict[str, float] = {}
        merged_nodes: Dict[str, Dict[str, Any]] = {}

        # 1. Score Vector Hits
        vector_weight = hybrid_weight
        for rank, hit in enumerate(vector_hits):
            node_id = hit.get("id") or hit.get("node")
            if not node_id: continue
            
            rrf_score = 1.0 / (self.k_constant + rank + 1)
            scores[node_id] = scores.get(node_id, 0.0) + (rrf_score * vector_weight)
            merged_nodes[node_id] = hit

        # 2. Score Graph Hits
        graph_weight = 1.0 - hybrid_weight
        for rank, hit in enumerate(graph_hits):
            node_id = hit.get("id") or hit.get("node")
            if not node_id: continue
            
            rrf_score = 1.0 / (self.k_constant + rank + 1)
            scores[node_id] = scores.get(node_id, 0.0) + (rrf_score * graph_weight)
            merged_nodes[node_id] = hit

        # 3. Sort by final score
        ranked_list = []
        for node_id, score in sorted(scores.items(), key=lambda item: item[1], reverse=True):
            node_data = merged_nodes[node_id].copy()
            node_data["final_hybrid_score"] = score
            ranked_list.append(node_data)
            
        return ranked_list
