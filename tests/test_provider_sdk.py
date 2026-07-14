import unittest
from packages.provider_sdk.factory import ProviderFactory


class TestProviderSDK(unittest.TestCase):
    def test_factory_loading(self):
        # 1. LLM
        llm = ProviderFactory.get_llm_provider("openai")
        self.assertIsNotNone(llm)
        self.assertIn("mock response", llm.generate_text("hello", {}))

        # 2. Vector DB
        vdb = ProviderFactory.get_vector_db_provider("pinecone")
        self.assertIsNotNone(vdb)
        self.assertTrue(vdb.upsert_vectors([]))

        # 3. Cache
        cache = ProviderFactory.get_cache_provider("redis")
        self.assertIsNotNone(cache)
        self.assertTrue(cache.set("key", "val", 60))

    def test_factory_error(self):
        with self.assertRaises(ValueError):
            ProviderFactory.get_llm_provider("unknown_provider")


if __name__ == "__main__":
    unittest.main()
