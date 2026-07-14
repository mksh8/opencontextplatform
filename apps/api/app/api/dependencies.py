from runtime.arcadedb_provider import ArcadeDBProvider
from runtime.retrieval_engine import RetrievalEngine
from runtime.memory_engine import MemoryEngine
from packages.cloud.billing import StripeBillingProvider

# Global Singleton Instantiation for Core Engines
# In a full production setup, these would be managed via FastAPI DI or a container.

db_provider = ArcadeDBProvider()
db_provider.connect()

retrieval_engine = RetrievalEngine(db_provider)
memory_engine = MemoryEngine(db_provider)

billing_provider = StripeBillingProvider(api_key="sk_test_mock")

def get_retrieval_engine() -> RetrievalEngine:
    return retrieval_engine

def get_memory_engine() -> MemoryEngine:
    return memory_engine

def get_billing_provider() -> StripeBillingProvider:
    return billing_provider
