from .interfaces import IConnector
from .implementations import (
    GitHubConnector,
    SlackConnector,
    NotionConnector,
    MCPConnector,
    RESTAPIConnector,
)
from .filesystem import FilesystemConnector

class ConnectorFactory:
    """
    Dynamically loads the requested connector for ingestion.
    """

    @staticmethod
    def get_connector(name: str) -> IConnector:
        connectors = {
            "github": GitHubConnector,
            "slack": SlackConnector,
            "notion": NotionConnector,
            "mcp": MCPConnector,
            "rest_api": RESTAPIConnector,
            "filesystem": FilesystemConnector,
        }

        if name not in connectors:
            raise ValueError(f"Unknown Connector: {name}")

        return connectors[name]()
