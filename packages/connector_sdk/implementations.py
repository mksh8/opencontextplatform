from typing import Dict, Any, List
from .interfaces import IConnector


class GitHubConnector(IConnector):
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        # Simulate fetching Repositories, PRs, and Issues with rich metadata
        repo_name = config.get("repository", "mksh8/opencontextplatform")
        return [
            {
                "id": "github-issue-42",
                "type": "github_issue",
                "content": "Bug: Auth token expiration not handled correctly.",
                "metadata": {"repo": repo_name, "author": "dev1", "state": "open"}
            },
            {
                "id": "github-pr-8",
                "type": "github_pr",
                "content": "Feat: Add ArcadeDB provider support.",
                "metadata": {"repo": repo_name, "author": "dev2", "state": "merged"}
            }
        ]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        action = payload.get("action", "unknown")
        issue = payload.get("issue", {})
        return [{
            "id": f"github-webhook-{issue.get('id', 'new')}",
            "type": "github_event",
            "content": f"Issue {action}: {issue.get('title', 'Unknown')}",
            "metadata": {"action": action, "source": "github_webhook"}
        }]


class SlackConnector(IConnector):
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        channel = config.get("channel", "C123456")
        return [
            {
                "id": "slack-msg-101",
                "type": "slack_message",
                "content": "Has anyone seen the new architecture document?",
                "metadata": {"channel": channel, "user": "U9876", "thread_ts": "1234.56"}
            },
            {
                "id": "slack-msg-102",
                "type": "slack_message",
                "content": "Yes, it's pinned in the engineering channel.",
                "metadata": {"channel": channel, "user": "U1234", "parent_ts": "1234.56"}
            }
        ]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        event = payload.get("event", {})
        return [
            {
                "id": f"slack-event-{event.get('ts', 'new')}",
                "type": "slack_message",
                "content": event.get("text", ""),
                "metadata": {"user": event.get("user", "unknown")}
            }
        ]


class NotionConnector(IConnector):
    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        workspace = config.get("workspace", "engineering")
        return [
            {
                "id": "notion-page-1",
                "type": "notion_page",
                "content": "Architecture Overview: We use FastAPI and ArcadeDB.",
                "metadata": {"workspace": workspace, "parent_id": "root", "title": "Architecture"}
            },
            {
                "id": "notion-page-2",
                "type": "notion_page",
                "content": "Database Schema Details for ArcadeDB implementation.",
                "metadata": {"workspace": workspace, "parent_id": "notion-page-1", "title": "DB Schema"}
            }
        ]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        return [{
            "id": f"notion-update-{payload.get('id', 'new')}",
            "type": "notion_page_update",
            "content": "Page content updated via webhook.",
            "metadata": {"source": "notion_webhook"}
        }]


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
