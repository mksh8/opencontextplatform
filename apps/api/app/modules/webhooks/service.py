from typing import List
from apps.api.app.modules.webhooks.schemas import Webhook

class WebhookService:
    def get_webhooks(self, org_id: str) -> List[Webhook]:
        """Returns mock webhooks."""
        return [
            Webhook(id="wh_1", name="Slack Notification", url="https://hooks.slack.com/services/...", events=["ingestion.completed"], status="Active"),
            Webhook(id="wh_2", name="Jira Ticket Creation", url="https://api.atlassian.com/...", events=["error.detected"], status="Inactive")
        ]

webhook_service = WebhookService()
