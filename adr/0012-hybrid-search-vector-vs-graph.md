# ADR 0012: Hybrid Search Strategy (Vector vs Graph)

## Context

OpenContextPlatform (OCP) aims to be the standard context infrastructure for AI. A core capability is retrieving the most relevant context for a given prompt. 

Traditionally, AI applications use **Vector Similarity Search** (RAG) which is excellent at finding semantically similar text but fails to understand structural relationships (e.g., "What files depend on this auth module?"). 
Conversely, **Graph Traversal** excels at structural relationships but cannot easily do fuzzy semantic matching.

We need a strategy for OpenContextPlatform that leverages both to provide superior context retrieval.

## Decision

We will implement a **Late-Fusion Hybrid Search Architecture**.

When a `SearchRequest` is received, the Retrieval Engine will execute two parallel queries against ArcadeDB:
1. **Vector Query**: An HNSW ANN (Approximate Nearest Neighbor) search against the `embedding` property of `ContextNode` documents.
2. **Graph Query**: A Cypher/Gremlin traversal starting from known entity keyword matches, walking `RELATES_TO` and `HAS_PROVENANCE` edges to a depth of $N$.

### Late-Fusion Ranking (Reciprocal Rank Fusion)
The two result sets will be merged in the application layer (the Ranking Engine) using **Reciprocal Rank Fusion (RRF)**. 
The user can pass a `hybrid_weight` parameter (default `0.5`) to bias the RRF algorithm. 
- `hybrid_weight = 1.0` means purely semantic vector search.
- `hybrid_weight = 0.0` means purely graph structural search.

## Consequences

### Positive
- **Superior Context**: AI agents will receive context that is both semantically relevant and structurally complete, drastically reducing hallucination in complex codebases or enterprise documents.
- **Flexibility**: The `hybrid_weight` allows different AI features to tune the retrieval to their needs.

### Negative
- **Latency**: Executing two queries and running RRF adds computational overhead compared to a single vector search.
- **Complexity**: The Ranking Engine must normalize scores between distance metrics (cosine similarity) and graph metrics (PageRank/Traversal depth).

## Status
Accepted

## References
- RFC 0011: ArcadeDB Unified Schema
- Specs: `retrieval-spec.md`
