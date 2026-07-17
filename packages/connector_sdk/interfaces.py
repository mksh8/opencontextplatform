from abc import ABC, abstractmethod
from typing import Dict, Any, List


class IConnector(ABC):
    """
    Abstract interface for all Connectors (e.g., GitHub, Slack).
    Handles both polling and webhook-driven ingestion.
    """

    @abstractmethod
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Poll the external service for data and return a list of normalized
        ContextObjects.
        """
        pass

    @abstractmethod
    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Process an incoming webhook payload and return normalized ContextObjects.
        """
        pass
