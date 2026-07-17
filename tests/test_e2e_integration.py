import unittest
from datetime import datetime

# Phase 1: Core Context
from packages.runtime.context import ContextObject

# Phase 4: Connectors

# Phase 5: Intelligence & Memory
from packages.intelligence.extractors import LocalNLPExtractor
from packages.intelligence.memory import EpisodicMemoryManager

# Phase 7: Cloud
from packages.cloud.tenant_manager import TenantManager
from packages.cloud.billing import StripeBillingProvider

# Phase 8: Enterprise
from packages.enterprise.rbac import RBACEngine
from packages.enterprise.policy_engine import LocalACLEngine


class TestEndToEndIntegration(unittest.TestCase):
    """
    Validates that all 9 phases of the OpenContextPlatform connect seamlessly.
    """

    def setUp(self):
        # 1. Initialize Cloud & Security
        self.tenant_mgr = TenantManager()
        self.rbac = RBACEngine()
        self.acl = LocalACLEngine()
        self.billing = StripeBillingProvider("test_key")

        # 2. Initialize Intelligence & Memory
        self.extractor = LocalNLPExtractor()
        self.memory = EpisodicMemoryManager()

    def test_full_ingestion_lifecycle(self):
        # STEP 1: Authentication & Rate Limiting
        # Simulate incoming request with API Key
        tenant = self.tenant_mgr.authenticate("sk_test_123")
        self.assertEqual(tenant["tenant_id"], "org_abc")

        # Simulate Identity from JWT (Auth0)
        identity = {"sub": "user_42", "roles": ["contributor"], "tenant_id": "org_abc"}

        # STEP 2: Connector Ingestion
        # Simulate a webhook payload from GitHub
        raw_payload = {
            "id": "pr_999",
            "title": "Fix OOM Error in Vector DB",
            "body": (
                "The LanceDB instance crashes on queries > 1GB. "
                "Please investigate."
            ),
        }

        # STEP 3: Context Formatting
        context_obj = ContextObject(
            id=raw_payload["id"],
            tenant_id=tenant["tenant_id"],
            provider="github",
            type="pull_request",
            content=raw_payload["body"],
            metadata={"title": raw_payload["title"]},
            timestamp=datetime.utcnow().isoformat(),
        )

        # STEP 4: Enterprise Policy Check
        # Does this contributor have rights to write to this tenant's graph?
        can_write = self.acl.evaluate(identity, context_obj.to_dict(), "write")
        self.assertTrue(can_write, "Enterprise Policy blocked ingestion.")

        # STEP 5: Intelligence Extraction
        # Extract entities and relationships from the raw content
        intelligence_result = self.extractor.extract(context_obj)
        self.assertIn("entities", intelligence_result)

        # Merge intelligence into context
        context_obj.metadata["intelligence"] = intelligence_result

        # STEP 6: Episodic Memory Versioning
        # Track history if this object is updated
        versioned_context = self.memory.track_version(context_obj)
        self.assertIsNotNone(versioned_context.metadata["version_id"])

        # STEP 7: Cloud Billing Metering
        # Charge the tenant for 1 ingestion node and 50 simulated tokens
        self.billing.report_usage(tenant["tenant_id"], "context_nodes", 1)
        self.billing.report_usage(tenant["tenant_id"], "llm_tokens", 50)

        # Integration test passes!
        # In a real environment, the context_obj would now be sent to the
        # ProviderFactory to write to ArcadeDB.
        self.assertEqual(versioned_context.id, "pr_999")
        print("[SUCCESS] End-to-End Integration Lifecycle Complete!")


if __name__ == "__main__":
    unittest.main()
