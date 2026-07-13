from abc import ABC, abstractmethod
from typing import List, Dict, Any, Iterator, Optional

# 1. LLM Provider
class ILLMProvider(ABC):
    @abstractmethod
    def generate_text(self, prompt: str, config: Dict[str, Any]) -> str:
        pass
    
    @abstractmethod
    def stream_text(self, prompt: str, config: Dict[str, Any]) -> Iterator[str]:
        pass

# 2. Embedding Provider
class IEmbeddingProvider(ABC):
    @abstractmethod
    def get_embeddings(self, texts: List[str], dimensions: Optional[int] = None) -> List[List[float]]:
        pass

# 3. Reranker Provider
class IRerankerProvider(ABC):
    @abstractmethod
    def rerank(self, query: str, documents: List[str]) -> List[float]:
        pass

# 4. Vector DB Provider
class IVectorDBProvider(ABC):
    @abstractmethod
    def upsert_vectors(self, vectors: List[Dict[str, Any]]) -> bool:
        pass
        
    @abstractmethod
    def search_vectors(self, query_vector: List[float], limit: int) -> List[Dict[str, Any]]:
        pass

# 5. Graph DB Provider
class IGraphDBProvider(ABC):
    @abstractmethod
    def create_node(self, label: str, properties: Dict[str, Any]) -> str:
        pass
        
    @abstractmethod
    def create_edge(self, source_id: str, target_id: str, relationship: str, properties: Dict[str, Any]) -> str:
        pass
        
    @abstractmethod
    def traverse(self, query: str) -> List[Dict[str, Any]]:
        pass

# 6. SQL/Metadata Provider
class ISQLMetadataProvider(ABC):
    @abstractmethod
    def execute_query(self, query: str, params: Dict[str, Any]) -> List[Dict[str, Any]]:
        pass

# 7. Storage Provider
class IStorageProvider(ABC):
    @abstractmethod
    def upload_object(self, key: str, data: bytes) -> str:
        pass
        
    @abstractmethod
    def download_object(self, key: str) -> bytes:
        pass
        
    @abstractmethod
    def delete_object(self, key: str) -> bool:
        pass

# 8. Cache Provider
class ICacheProvider(ABC):
    @abstractmethod
    def get(self, key: str) -> Optional[Any]:
        pass
        
    @abstractmethod
    def set(self, key: str, value: Any, ttl_seconds: int) -> bool:
        pass
