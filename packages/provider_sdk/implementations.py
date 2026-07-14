from typing import Any, Dict, Iterator, List, Optional
from .interfaces import (
    ILLMProvider,
    IEmbeddingProvider,
    IRerankerProvider,
    IVectorDBProvider,
    IGraphDBProvider,
    ISQLMetadataProvider,
    IStorageProvider,
    ICacheProvider,
)


class OpenAIProvider(ILLMProvider, IEmbeddingProvider):
    def generate_text(self, prompt: str, config: Dict[str, Any]) -> str:
        return f"OpenAI mock response for: {prompt}"

    def stream_text(self, prompt: str, config: Dict[str, Any]) -> Iterator[str]:
        yield "OpenAI"
        yield " stream"

    def get_embeddings(
        self,
        texts: List[str],
        dimensions: Optional[int] = None,
    ) -> List[List[float]]:
        return [[0.1, 0.2, 0.3] for _ in texts]


class PineconeProvider(IVectorDBProvider):
    def upsert_vectors(self, vectors: List[Dict[str, Any]]) -> bool:
        return True

    def search_vectors(
        self,
        query_vector: List[float],
        limit: int,
    ) -> List[Dict[str, Any]]:
        return [{"id": "vec-1", "score": 0.99}]


class Neo4jProvider(IGraphDBProvider):
    def create_node(self, label: str, properties: Dict[str, Any]) -> str:
        return "neo4j-node-1"

    def create_edge(
        self,
        source_id: str,
        target_id: str,
        relationship: str,
        properties: Dict[str, Any],
    ) -> str:
        return "neo4j-edge-1"

    def traverse(self, query: str) -> List[Dict[str, Any]]:
        return [{"node": "test"}]


class PostgresProvider(ISQLMetadataProvider):
    def execute_query(self, query: str, params: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"row": 1}]


class S3StorageProvider(IStorageProvider):
    def upload_object(self, key: str, data: bytes) -> str:
        return f"s3://bucket/{key}"

    def download_object(self, key: str) -> bytes:
        return b"mock-data"

    def delete_object(self, key: str) -> bool:
        return True


class RedisCacheProvider(ICacheProvider):
    def get(self, key: str) -> Optional[Any]:
        return None

    def set(self, key: str, value: Any, ttl_seconds: int) -> bool:
        return True


class CohereRerankerProvider(IRerankerProvider):
    def rerank(self, query: str, documents: List[str]) -> List[float]:
        return [0.9, 0.8, 0.7][: len(documents)]
