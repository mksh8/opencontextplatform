"""Rate limiter component for tenant API throttling."""

from packages.provider_sdk.interfaces import ICacheProvider


class RateLimiter:
    """Enforces API rate limits based on tenant tier using a Cache Provider."""

    def __init__(self, cache: ICacheProvider):
        self.cache = cache
        self.tier_limits = {
            "free": 100,  # 100 req/min
            "enterprise": 10000,  # 10000 req/min
        }

    def check_limit(self, tenant_id: str, tier: str) -> bool:
        """Returns True if request is allowed, False if rate limited."""
        limit = self.tier_limits.get(tier, 100)

        # Simple token bucket mock using cache
        current_usage = self.cache.get(f"rate:{tenant_id}") or 0
        if current_usage >= limit:
            return False

        self.cache.set(f"rate:{tenant_id}", current_usage + 1, 60)
        return True
