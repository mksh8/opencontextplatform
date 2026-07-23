"""Connector implementations for GitHub, Slack, Notion, MCP, and REST APIs."""

from typing import Any, Dict, List
import uuid

from packages.connector_sdk.interfaces import IConnector


class GitHubConnector(IConnector):
    """Connector for syncing GitHub repositories, PRs, and issues."""

    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Sync GitHub repo data into graph node representations."""
        repo_name = config.get("repository", "mksh8/opencontextplatform")
        repo_id = f"repo_{uuid.uuid4().hex[:8]}"

        nodes = []
        nodes.append({
            "type": "RepositoryNode",
            "id": repo_id,
            "name": repo_name,
            "url": f"https://github.com/{repo_name}",
            "description": "Main repository for the platform"
        })

        # Create a sample PR
        pr_id = f"pr_{uuid.uuid4().hex[:8]}"
        nodes.append({
            "type": "PRNode",
            "id": pr_id,
            "title": "Feat: Add ArcadeDB provider support.",
            "author": "dev2",
            "state": "merged",
            "edge_to": {"label": "BELONGS_TO", "target": repo_id}
        })

        # Create a sample Issue
        issue_id = f"issue_{uuid.uuid4().hex[:8]}"
        nodes.append({
            "type": "IssueNode",
            "id": issue_id,
            "title": "Bug: Auth token expiration not handled correctly.",
            "author": "dev1",
            "state": "open",
            "edge_to": {"label": "BELONGS_TO", "target": repo_id}
        })

        return nodes

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Handle incoming GitHub webhook event."""
        action = payload.get("action", "unknown")
        issue = payload.get("issue", {})
        return [{
            "id": f"github-webhook-{issue.get('id', 'new')}",
            "type": "github_event",
            "content": f"Issue {action}: {issue.get('title', 'Unknown')}",
            "metadata": {"action": action, "source": "github_webhook"}
        }]


class SlackConnector(IConnector):
    """Connector for syncing Slack channels and messages."""

    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Sync Slack channel messages into graph node representations."""
        channel = config.get("channel", "engineering-chat")
        channel_id = f"chan_{uuid.uuid4().hex[:8]}"

        nodes = []
        nodes.append({
            "type": "ChannelNode",
            "id": channel_id,
            "name": channel
        })

        user_id = f"user_{uuid.uuid4().hex[:8]}"
        nodes.append({
            "type": "UserNode",
            "id": user_id,
            "name": "Alex Developer"
        })

        msg_id = f"msg_{uuid.uuid4().hex[:8]}"
        nodes.append({
            "type": "MessageNode",
            "id": msg_id,
            "content": "Has anyone seen the new architecture document?",
            "timestamp": "2026-07-18T10:00:00Z",
            "edges": [
                {"label": "POSTED_IN", "target": channel_id},
                {"label": "AUTHORED_BY", "target": user_id}
            ]
        })

        return nodes

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Handle incoming Slack event payload."""
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
    """Connector for syncing Notion workspace documents."""

    def sync(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Sync Notion document hierarchy into graph node representations."""
        workspace = config.get("workspace", "engineering")

        root_id = f"doc_{uuid.uuid4().hex[:8]}"
        child_id = f"doc_{uuid.uuid4().hex[:8]}"

        nodes = [
            {
                "type": "DocumentNode",
                "id": root_id,
                "title": f"{workspace} Architecture Overview",
                "content": "We use FastAPI and ArcadeDB."
            },
            {
                "type": "DocumentNode",
                "id": child_id,
                "title": "Database Schema Details",
                "content": "ArcadeDB uses Document + Graph models.",
                "edge_to": {"label": "CHILD_OF", "target": root_id}
            }
        ]
        return nodes

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Handle incoming Notion page update webhook."""
        return [{
            "id": f"notion-update-{payload.get('id', 'new')}",
            "type": "notion_page_update",
            "content": "Page content updated via webhook.",
            "metadata": {"source": "notion_webhook"}
        }]


class MCPConnector(IConnector):
    """Connector for Model Context Protocol resources."""

    def sync(self, _config: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Sync MCP resources."""
        return [{"id": "mcp-res-1", "type": "mcp_resource", "content": "Local file"}]

    def handle_webhook(self, _payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Handle incoming MCP webhook payload (noop)."""
        return []


class RESTAPIConnector(IConnector):
    """Connector for generic REST API endpoints."""

    def sync(self, _config: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Sync data from REST API."""
        return [{"id": "api-1", "type": "api_response", "content": "JSON data"}]

    def handle_webhook(self, payload: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Handle incoming generic REST API webhook payload."""
        return [{"id": "webhook-1", "type": "api_webhook", "content": str(payload)}]
