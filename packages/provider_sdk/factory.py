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
from .implementations import (
    OpenAIProvider,
    PineconeProvider,
    Neo4jProvider,
    PostgresProvider,
    S3StorageProvider,
    RedisCacheProvider,
    CohereRerankerProvider,
)


class ProviderFactory:
    """
    Dynamically loads and instantiates the correct provider based on configuration.
    """

    @staticmethod
    def get_llm_provider(name: str) -> ILLMProvider:
        if name == "openai":
            return OpenAIProvider()
        raise ValueError(f"Unknown LLM provider: {name}")

    @staticmethod
    def get_embedding_provider(name: str) -> IEmbeddingProvider:
        if name == "openai":
            return OpenAIProvider()
        raise ValueError(f"Unknown Embedding provider: {name}")

    @staticmethod
    def get_reranker_provider(name: str) -> IRerankerProvider:
        if name == "cohere":
            return CohereRerankerProvider()
        raise ValueError(f"Unknown Reranker provider: {name}")

    @staticmethod
    def get_vector_db_provider(name: str) -> IVectorDBProvider:
        if name == "pinecone":
            return PineconeProvider()
        raise ValueError(f"Unknown Vector DB provider: {name}")

    @staticmethod
    def get_graph_db_provider(name: str) -> IGraphDBProvider:
        if name == "neo4j":
            return Neo4jProvider()
        raise ValueError(f"Unknown Graph DB provider: {name}")

    @staticmethod
    def get_sql_provider(name: str) -> ISQLMetadataProvider:
        if name == "postgres":
            return PostgresProvider()
        raise ValueError(f"Unknown SQL provider: {name}")

    @staticmethod
    def get_storage_provider(name: str) -> IStorageProvider:
        if name == "s3":
            return S3StorageProvider()
        raise ValueError(f"Unknown Storage provider: {name}")

    @staticmethod
    def get_cache_provider(name: str) -> ICacheProvider:
        if name == "redis":
            return RedisCacheProvider()
        raise ValueError(f"Unknown Cache provider: {name}")
