"""Intelligence pipeline orchestrator for extraction and episodic memory."""

from typing import Any, Dict

from packages.intelligence.extractors import LLMExtractor, LocalNLPExtractor
from packages.intelligence.memory import EpisodicMemoryManager
from packages.provider_sdk.factory import ProviderFactory


class IntelligencePipeline:
    """
    Orchestrates the extraction and memory versioning pipeline.
    """

    def __init__(self, llm_provider_name: str = "openai"):
        self.llm = ProviderFactory.get_llm_provider(llm_provider_name)
        self.local_extractor = LocalNLPExtractor()
        self.llm_extractor = LLMExtractor(self.llm)
        self.memory_manager = EpisodicMemoryManager()

    def process_context(
        self,
        context_obj: Dict[str, Any],
        is_update: bool = False,
        existing_context: Dict[str, Any] = None,
    ) -> Dict[str, Any]:
        """
        Runs the extraction pipeline on a context object.
        """
        content = context_obj.get("content", "")

        # 1. Dual-Mode Extraction
        entities = self.local_extractor.extract_entities(content)
        relations = self.llm_extractor.extract_relations(content)

        context_obj["extracted_entities"] = entities
        context_obj["extracted_relations"] = relations

        # 2. Episodic Memory Versioning
        if is_update and existing_context:
            context_obj = self.memory_manager.apply_update(
                existing_context, context_obj
            )

        return context_obj
