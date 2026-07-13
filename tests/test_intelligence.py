import unittest
from packages.intelligence.pipeline import IntelligencePipeline
from packages.intelligence.memory import EpisodicMemoryManager

class TestIntelligenceLayer(unittest.TestCase):
    
    def test_dual_mode_extraction(self):
        pipeline = IntelligencePipeline(llm_provider_name="openai")
        context = {"id": "c1", "content": "The user submitted a bug report."}
        
        processed = pipeline.process_context(context)
        
        # Check Local NLP extracted entity
        self.assertEqual(processed["extracted_entities"][0]["value"], "User")
        
        # Check LLM extracted relation
        self.assertEqual(processed["extracted_relations"][0]["relation"], "DEPENDS_ON")

    def test_context_versioning(self):
        memory = EpisodicMemoryManager()
        v1 = {"id": "doc1", "version_id": "doc1-v1", "version_number": 1, "status": "open"}
        update = {"status": "closed"}
        
        v2 = memory.apply_update(v1, update)
        
        self.assertEqual(v2["status"], "closed")
        self.assertEqual(v2["previous_version_id"], "doc1-v1")
        self.assertEqual(v2["version_number"], 2)
        self.assertNotEqual(v2["version_id"], v1["version_id"])

if __name__ == '__main__':
    unittest.main()
