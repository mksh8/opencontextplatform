# ArcadeDB Data Schema Specification

This specification formalizes the physical database schema for OpenContextPlatform running on ArcadeDB.

## Vertex Types (Document & Graph Nodes)

### `ContextNode`
The primary unit of knowledge in OCP. It acts as both a NoSQL Document (for metadata) and a Graph Vertex (for traversal).

**Properties:**
- `id` (String, UUIDv4): Primary Key.
- `tenant_id` (String): Used for strict multi-tenant data isolation.
- `type` (String): Enum [`semantic`, `episodic`, `procedural`].
- `content` (String): The raw text data.
- `metadata` (JSON): Flexible attribute map for pre-filtering.
- `embedding` (Vector): A dense float array representing the semantic meaning of `content`.

**Indexes:**
- `IDX_CONTEXT_TENANT`: B-Tree index on `tenant_id`.
- `IDX_CONTEXT_EMBEDDING`: HNSW (Hierarchical Navigable Small World) index on `embedding`.

### `ProvenanceNode`
Tracks the source of the context (e.g. a specific GitHub PR, a Slack message).

**Properties:**
- `id` (String, UUIDv4): Primary Key.
- `source_system` (String): e.g., "github", "notion".
- `source_uri` (String): External URL or identifier.
- `ingested_at` (DateTime): Timestamp of ingestion.

## Edge Types (Graph Relationships)

### `RELATES_TO`
Connects two `ContextNode` vertices to establish a semantic or structural relationship.

**Properties:**
- `relationship_type` (String): e.g., "depends_on", "mentions", "implements".
- `weight` (Float): Strength of the relationship (0.0 to 1.0).

### `HAS_PROVENANCE`
Connects a `ContextNode` to a `ProvenanceNode`.

**Properties:**
- `extraction_method` (String): e.g., "ast_parser", "llm_extraction".

## Query Patterns

### Hybrid Search Blueprint
```sql
-- 1. Vector Search Phase
SELECT id, content FROM ContextNode 
WHERE tenant_id = :tenant 
ORDER BY vector_distance(embedding, :query_vector) ASC LIMIT 50;

-- 2. Graph Traversal Phase (Cypher)
MATCH (c1:ContextNode)-[r:RELATES_TO*1..2]-(c2:ContextNode)
WHERE c1.id IN :vector_results
RETURN c2;
```
*(Note: Actual execution uses ArcadeDB's native multi-model APIs rather than string concatenation).*
