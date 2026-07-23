"""Factory module for instantiating data ingestion connectors."""

from packages.connector_sdk.filesystem import FilesystemConnector
from packages.connector_sdk.implementations import (
    GitHubConnector,
    MCPConnector,
    NotionConnector,
    RESTAPIConnector,
    SlackConnector,
)
from packages.connector_sdk.interfaces import IConnector


class ConnectorFactory:
    """
    Dynamically loads the requested connector for ingestion.
    """

    @staticmethod
    def get_connector(name: str) -> IConnector:
        """Instantiate and return connector by name."""
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
