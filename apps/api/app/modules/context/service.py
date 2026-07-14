from runtime.memory_engine import MemoryEngine


class ContextService:
    def get_all_contexts(self, engine: MemoryEngine):
        """Business logic for retrieving contexts, delegates to the Runtime Engine."""
        return engine.get_all_contexts()


context_service = ContextService()
