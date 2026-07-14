from typing import Dict, Any, List
from .interfaces import IConnector


class GitHubConnector(IConnector):
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"id": "issue-1", "type": "github_issue", "content": "Fix bug"}]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"id": "pr-1", "type": "github_pr", "content": "Opened PR"}]


class SlackConnector(IConnector):
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"id": "msg-1", "type": "slack_message", "content": "Hello team"}]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [
            {"id": "msg-2", "type": "slack_message", "content": payload.get("text", "")}
        ]


class NotionConnector(IConnector):
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"id": "page-1", "type": "notion_page", "content": "Project Plan"}]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"id": "page-2", "type": "notion_page", "content": "Updated Plan"}]


class MCPConnector(IConnector):
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"id": "mcp-res-1", "type": "mcp_resource", "content": "Local file"}]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        return []


class RESTAPIConnector(IConnector):
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"id": "api-1", "type": "api_response", "content": "JSON data"}]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{"id": "webhook-1", "type": "api_webhook", "content": str(payload)}]
