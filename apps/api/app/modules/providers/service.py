from typing import List
from apps.api.app.modules.providers.schemas import Provider


class ProviderService:
    def get_providers(self, org_id: str) -> List[Provider]:
        """Returns mock LLM providers."""
        return [
            Provider(id="prov_1", name="OpenAI", url="api.openai.com", model="gpt-4-turbo", status="Active", usage="2.4M tokens"),
            Provider(id="prov_2", name="Anthropic", url="api.anthropic.com", model="claude-3-opus", status="Active", usage="1.8M tokens"),
            Provider(id="prov_3", name="Google", url="generativelanguage.googleapis.com", model="gemini-1.5-pro", status="Active", usage="800K tokens"),
            Provider(id="prov_4", name="Local (Ollama)", url="localhost:11434", model="llama-3-70b", status="Offline", usage="0 tokens"),
        ]

provider_service = ProviderService()
