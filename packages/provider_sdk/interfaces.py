"""Provider SDK interfaces defining contracts for AI, DB, Storage, and Cache implementations."""

from abc import ABC, abstractmethod
from typing import Any, Dict, Iterator, List, Optional


# 1. LLM Provider
class ILLMProvider(ABC):
    """Interface for Large Language Model generation."""

    @abstractmethod
    def generate_text(self, prompt: str, config: Dict[str, Any]) -> str:
        """Generate text synchronously."""

    @abstractmethod
    def stream_text(self, prompt: str, config: Dict[str, Any]) -> Iterator[str]:
        """Stream text tokens sequentially."""


# 2. Embedding Provider
class IEmbeddingProvider(ABC):
    """Interface for generating text vector embeddings."""

    @abstractmethod
    def get_embeddings(
        self,
        texts: List[str],
        dimensions: Optional[int] = None,
    ) -> List[List[float]]:
        """Get list of vector embeddings for given texts."""


# 3. Reranker Provider
class IRerankerProvider(ABC):
    """Interface for reranking document search results."""

    @abstractmethod
    def rerank(self, query: str, documents: List[str]) -> List[float]:
        """Return relevance score for each document against query."""


# 4. Vector DB Provider
class IVectorDBProvider(ABC):
    """Interface for vector database operations."""

    @abstractmethod
    def upsert_vectors(self, vectors: List[Dict[str, Any]]) -> bool:
        """Insert or update vector embeddings."""

    @abstractmethod
    def search_vectors(
        self,
        query_vector: List[float],
        limit: int,
    ) -> List[Dict[str, Any]]:
        """Search vector index for top-k matching documents."""


# 5. Graph DB Provider
class IGraphDBProvider(ABC):
    """Interface for graph database operations."""

    @abstractmethod
    def create_node(self, label: str, properties: Dict[str, Any]) -> str:
        """Create graph node."""

    @abstractmethod
    def create_edge(
        self,
        source_id: str,
        target_id: str,
        relationship: str,
        properties: Dict[str, Any],
    ) -> str:
        """Create graph edge."""

    @abstractmethod
    def traverse(self, query: str) -> List[Dict[str, Any]]:
        """Traverse graph using query language."""


# 6. SQL/Metadata Provider
class ISQLMetadataProvider(ABC):
    """Interface for SQL metadata database operations."""

    @abstractmethod
    def execute_query(
        self,
        query: str,
        params: Dict[str, Any],
    ) -> List[Dict[str, Any]]:
        """Execute parameterized SQL query."""


# 7. Storage Provider
class IStorageProvider(ABC):
    """Interface for object storage systems (S3/GCS)."""

    @abstractmethod
    def upload_object(self, key: str, data: bytes) -> str:
        """Upload raw bytes object."""

    @abstractmethod
    def download_object(self, key: str) -> bytes:
        """Download raw bytes object by key."""

    @abstractmethod
    def delete_object(self, key: str) -> bool:
        """Delete object by key."""


# 8. Cache Provider
class ICacheProvider(ABC):
    """Interface for cache key-value store (Redis/Memcached)."""

    @abstractmethod
    def get(self, key: str) -> Optional[Any]:
        """Get item from cache by key."""

    @abstractmethod
    def set(self, key: str, value: Any, ttl_seconds: int) -> bool:
        """Set item in cache with time-to-live seconds."""
