import unittest
from packages.cloud.tenant_manager import TenantManager
from packages.cloud.rate_limiter import RateLimiter
from packages.cloud.billing import StripeBillingProvider


# Mock Cache for Rate Limiter
class MockCache:
    def __init__(self):
        self.data = {}

    def get(self, key):
        return self.data.get(key)

    def set(self, key, val, ttl):
        self.data[key] = val
        return True


class TestCloud(unittest.TestCase):
    def test_tenant_auth(self):
        tm = TenantManager()
        tenant = tm.authenticate("sk_test_123")
        self.assertEqual(tenant["tenant_id"], "org_abc")

        with self.assertRaises(PermissionError):
            tm.authenticate("invalid")

    def test_rate_limiter(self):
        cache = MockCache()
        rl = RateLimiter(cache)

        # Test Free Tier (limit 100)
        for _ in range(100):
            self.assertTrue(rl.check_limit("org_abc", "free"))
        # 101st request should be blocked
        self.assertFalse(rl.check_limit("org_abc", "free"))

    def test_stripe_billing(self):
        stripe = StripeBillingProvider("mock_key")
        result = stripe.report_usage("org_xyz", "llm_tokens", 500)
        self.assertTrue(result)


if __name__ == "__main__":
    unittest.main()
