from typing import List
from apps.api.app.modules.connectors.schemas import Connector

class ConnectorService:
    def get_connectors(self, org_id: str) -> List[Connector]:
        """Returns mock connectors."""
        return [
            Connector(id="conn_1", name="GitHub", icon="🐙", status="Connected", last_sync="2m ago", details="128 repositories"),
            Connector(id="conn_2", name="Slack", icon="💬", status="Connected", last_sync="15m ago", details="42 channels"),
            Connector(id="conn_3", name="Notion", icon="📓", status="Connected", last_sync="1h ago", details="8 workspaces"),
            Connector(id="conn_4", name="Confluence", icon="🌊", status="Connected", last_sync="3h ago", details="12 spaces"),
            Connector(id="conn_5", name="Jira", icon="🔷", status="Connected", last_sync="2m ago", details="24 projects"),
            Connector(id="conn_6", name="PostgreSQL", icon="🐘", status="Connected", last_sync="5m ago", details="3 databases"),
            Connector(id="conn_7", name="Filesystem", icon="📁", status="Connected", last_sync="10m ago", details="8 directories"),
        ]

connector_service = ConnectorService()
