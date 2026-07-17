import unittest
from packages.connector_sdk.factory import ConnectorFactory


class TestConnectorSDK(unittest.TestCase):
    def test_github_connector(self):
        connector = ConnectorFactory.get_connector("github")
        self.assertIsNotNone(connector)

        sync_results = connector.sync({})
        self.assertEqual(sync_results[0]["type"], "github_issue")

        webhook_results = connector.handle_webhook({"action": "opened"})
        self.assertEqual(webhook_results[0]["type"], "github_pr")

    def test_slack_connector(self):
        connector = ConnectorFactory.get_connector("slack")
        webhook_results = connector.handle_webhook({"text": "Alert!"})
        self.assertEqual(webhook_results[0]["content"], "Alert!")

    def test_mcp_connector(self):
        connector = ConnectorFactory.get_connector("mcp")
        self.assertEqual(connector.sync({})[0]["type"], "mcp_resource")


if __name__ == "__main__":
    unittest.main()
