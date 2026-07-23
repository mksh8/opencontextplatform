"""Provider factory module for instantiating AI, DB, Storage, and Cache providers."""

from packages.provider_sdk.implementations import (
    AnthropicProvider,
    ArcadeDBProvider,
    BGEEmbeddingProvider,
    CohereRerankerProvider,
    Neo4jProvider,
    OllamaProvider,
    OpenAIProvider,
    PineconeProvider,
    PostgresProvider,
    RedisCacheProvider,
    S3StorageProvider,
)
from packages.provider_sdk.interfaces import (
    ICacheProvider,
    IEmbeddingProvider,
    IGraphDBProvider,
    ILLMProvider,
    IRerankerProvider,
    ISQLMetadataProvider,
    IStorageProvider,
    IVectorDBProvider,
)


class ProviderFactory:
    """
    Dynamically loads and instantiates the correct provider based on configuration.
    """

    @staticmethod
    def get_llm_provider(name: str) -> ILLMProvider:
        """Get LLM provider instance."""
        if name == "openai":
            return OpenAIProvider()
        if name == "anthropic":
            return AnthropicProvider()
        if name == "ollama":
            return OllamaProvider()
        raise ValueError(f"Unknown LLM provider: {name}")

    @staticmethod
    def get_embedding_provider(name: str) -> IEmbeddingProvider:
        """Get embedding provider instance."""
        if name == "openai":
            return OpenAIProvider()
        if name == "ollama":
            return OllamaProvider()
        if name == "bge":
            return BGEEmbeddingProvider()
        raise ValueError(f"Unknown Embedding provider: {name}")

    @staticmethod
    def get_reranker_provider(name: str) -> IRerankerProvider:
        """Get reranker provider instance."""
        if name == "cohere":
            return CohereRerankerProvider()
        raise ValueError(f"Unknown Reranker provider: {name}")

    @staticmethod
    def get_vector_db_provider(name: str) -> IVectorDBProvider:
        """Get vector database provider instance."""
        if name == "pinecone":
            return PineconeProvider()
        if name == "arcadedb":
            return ArcadeDBProvider()
        raise ValueError(f"Unknown Vector DB provider: {name}")

    @staticmethod
    def get_graph_db_provider(name: str) -> IGraphDBProvider:
        """Get graph database provider instance."""
        if name == "neo4j":
            return Neo4jProvider()
        if name == "arcadedb":
            return ArcadeDBProvider()
        raise ValueError(f"Unknown Graph DB provider: {name}")

    @staticmethod
    def get_sql_provider(name: str) -> ISQLMetadataProvider:
        """Get SQL metadata provider instance."""
        if name == "postgres":
            return PostgresProvider()
        if name == "arcadedb":
            return ArcadeDBProvider()
        raise ValueError(f"Unknown SQL provider: {name}")

    @staticmethod
    def get_storage_provider(name: str) -> IStorageProvider:
        """Get storage provider instance."""
        if name == "s3":
            return S3StorageProvider()
        raise ValueError(f"Unknown Storage provider: {name}")

    @staticmethod
    def get_cache_provider(name: str) -> ICacheProvider:
        """Get cache provider instance."""
        if name == "redis":
            return RedisCacheProvider()
        raise ValueError(f"Unknown Cache provider: {name}")
