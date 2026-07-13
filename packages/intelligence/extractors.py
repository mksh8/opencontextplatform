from typing import Dict, Any, List
from packages.provider_sdk.interfaces import ILLMProvider

class LocalNLPExtractor:
    """Uses local heuristics or models (e.g. regex/spaCy stub) to extract simple entities."""
    def extract_entities(self, text: str) -> List[Dict[str, str]]:
        # Stub logic
        if "user" in text.lower():
            return [{"type": "PERSON", "value": "User"}]
        return []

class LLMExtractor:
    """Uses the Provider SDK LLM interface to perform complex relation extraction."""
    def __init__(self, llm_provider: ILLMProvider):
        self.llm = llm_provider
        
    def extract_relations(self, text: str) -> List[Dict[str, str]]:
        # In reality, this would send a prompt to the LLM
        response = self.llm.generate_text(f"Extract relations from: {text}", {})
        # Stub logic
        return [{"source": "EntityA", "target": "EntityB", "relation": "DEPENDS_ON"}]
