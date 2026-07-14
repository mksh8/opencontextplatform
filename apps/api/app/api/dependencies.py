from runtime.arcadedb_provider import ArcadeDBProvider
from runtime.retrieval_engine import RetrievalEngine
from runtime.memory_engine import MemoryEngine
from packages.cloud.billing import StripeBillingProvider

# Simple poor-man's cache for singleton instances
_cache = {}


def get_arcadedb_provider() -> ArcadeDBProvider:
    if "db" not in _cache:
        provider = ArcadeDBProvider()
        provider.connect()
        _cache["db"] = provider
    return _cache["db"]


def get_retrieval_engine() -> RetrievalEngine:
    if "retrieval" not in _cache:
        _cache["retrieval"] = RetrievalEngine(get_arcadedb_provider())
    return _cache["retrieval"]


def get_memory_engine() -> MemoryEngine:
    if "memory" not in _cache:
        _cache["memory"] = MemoryEngine(get_arcadedb_provider())
    return _cache["memory"]


def get_billing_provider() -> StripeBillingProvider:
    if "billing" not in _cache:
        _cache["billing"] = StripeBillingProvider(api_key="sk_test_mock")
    return _cache["billing"]
