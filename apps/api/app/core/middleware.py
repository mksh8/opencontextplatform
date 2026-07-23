"""HTTP Middleware components for rate limiting and request processing."""

import logging

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from packages.provider_sdk.factory import ProviderFactory

logger = logging.getLogger(__name__)


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Middleware that intercepts requests to enforce rate limits based on API Keys.
    Uses the Redis ICacheProvider from the Provider SDK.
    """

    def __init__(self, app, max_requests_per_minute: int = 60):
        super().__init__(app)
        self.max_requests = max_requests_per_minute
        # Dynamically load the configured cache provider
        self.cache = ProviderFactory.get_cache_provider("redis")

    async def dispatch(self, request: Request, call_next):
        """Intercept request and check rate limit counters."""
        # Only rate-limit API routes
        if not request.url.path.startswith("/api"):
            return await call_next(request)

        # 1. Extract API Key
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            # For local dev we allow bypass, in prod we'd enforce this
            pass
        else:
            api_key = auth_header.split("Bearer ")[1]
            rate_limit_key = f"ratelimit:{api_key}"

            # 2. Check Rate Limit (Mocked Token Bucket / Counter algorithm)
            current_count = self.cache.get(rate_limit_key) or 0
            if current_count >= self.max_requests:
                logger.warning("Rate limit exceeded for key: %s...", api_key[:10])
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Rate limit exceeded. Please upgrade your billing tier."}
                )

            # Increment cache
            self.cache.set(rate_limit_key, current_count + 1, ttl_seconds=60)

        # Proceed
        response = await call_next(request)
        return response
