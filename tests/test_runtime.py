import unittest
from runtime.arcadedb_provider import ArcadeDBProvider
from runtime.memory_engine import MemoryEngine
from runtime.retrieval_engine import RetrievalEngine
from runtime.prompt_builder import PromptBuilder

class TestContextRuntime(unittest.TestCase):

    def setUp(self):
        self.db = ArcadeDBProvider()
        self.db.connect()
        self.memory_engine = MemoryEngine(self.db)
        self.retrieval_engine = RetrievalEngine(self.db)
        self.prompt_builder = PromptBuilder(token_limit=100)

    def test_memory_engine_save(self):
        mock_context = {
            "id": "ctx-123",
            "tenant_id": "tenant-abc",
            "type": "document",
            "content": "Test context content"
        }
        record_id = self.memory_engine.save_memory(mock_context)
        self.assertEqual(record_id, "ctx-123")
        
    def test_memory_engine_validation(self):
        with self.assertRaises(ValueError):
            self.memory_engine.save_memory({"type": "invalid"})

    def test_retrieval_engine(self):
        results = self.retrieval_engine.search(
            tenant_id="tenant-abc", 
            query="test", 
            query_embedding=[0.1, 0.2, 0.3]
        )
        self.assertIsInstance(results, list)

    def test_prompt_builder(self):
        ranked_context = [
            {"content": "First piece of context."},
            {"content": "Second piece of context."}
        ]
        template = "Answer the question based on: {{CONTEXT}}"
        prompt = self.prompt_builder.assemble_prompt(template, ranked_context)
        
        self.assertIn("First piece of context.", prompt)
        self.assertIn("Second piece of context.", prompt)
        self.assertIn("Answer the question", prompt)

if __name__ == '__main__':
    unittest.main()
