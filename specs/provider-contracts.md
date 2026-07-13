# Provider Contracts Specification

## 1. LLM Provider (`ILLMProvider`)
**Purpose**: Abstracts text generation and chat completion APIs.
- `generate_text(prompt: str, config: GenerationConfig) -> GenerationResponse`
- `stream_text(prompt: str, config: GenerationConfig) -> Iterator[str]`

## 2. Embedding Provider (`IEmbeddingProvider`)
**Purpose**: Abstracts vector embedding generation.
- `get_embeddings(texts: List[str], dimensions: Optional[int]) -> List[List[float]]`

## 3. Reranker Provider (`IRerankerProvider`)
**Purpose**: Abstracts re-ranking of retrieved context for better relevance.
- `rerank(query: str, documents: List[str]) -> List[float]`

## 4. Vector DB Provider (`IVectorDBProvider`)
**Purpose**: Abstracts purely vector-based storage and similarity search (e.g., Pinecone, Milvus).
- `upsert_vectors(vectors: List[VectorRecord]) -> bool`
- `search_vectors(query_vector: List[float], limit: int) -> List[VectorRecord]`

## 5. Graph DB Provider (`IGraphDBProvider`)
**Purpose**: Abstracts knowledge graph storage and traversal (e.g., Neo4j, Kuzu).
- `create_node(label: str, properties: Dict) -> str`
- `create_edge(source_id: str, target_id: str, relationship: str, properties: Dict) -> str`
- `traverse(query: str) -> List[Dict]`

## 6. SQL/Metadata Provider (`ISQLMetadataProvider`)
**Purpose**: Abstracts relational storage for policies, users, and traditional metadata (e.g., Postgres).
- `execute_query(query: str, params: Dict) -> List[Dict]`

## 7. Storage Provider (`IStorageProvider`)
**Purpose**: Abstracts object/blob storage (e.g., S3, Azure Blob) used for storing raw files.
- `upload_object(key: str, data: bytes) -> str`
- `download_object(key: str) -> bytes`
- `delete_object(key: str) -> bool`

## 8. Cache Provider (`ICacheProvider`)
**Purpose**: Abstracts ephemeral key-value caching (e.g., Redis, Memcached).
- `get(key: str) -> Optional[Any]`
- `set(key: str, value: Any, ttl_seconds: int) -> bool`
