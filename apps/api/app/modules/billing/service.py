"""Billing service for retrieving usage metrics, invoices, and managing keys."""

import datetime
import secrets
from typing import List

from apps.api.app.modules.billing.schemas import (
    APIKey,
    APIKeyCreateRequest,
    CostService,
    InvoiceSummary,
    UsageMetrics,
)


class APIKeyGenerator:
    """Helper to generate cryptographically secure API keys."""

    @staticmethod
    def generate_key(prefix: str = "ocp_live_") -> str:
        """Generate 32 bytes of secure random hex."""
        secure_hash = secrets.token_hex(32)
        return f"{prefix}{secure_hash}"


class BillingService:
    """Service layer for billing usage and invoice aggregation."""

    def _fetch_stripe_usage(self, _org_id: str) -> dict:
        """Mock method simulating fetching aggregated metering from Stripe."""
        return {
            "tokens": "2.45B",
            "queries": "245.6K",
            "estimated_cost": "$245.60"
        }

    def get_usage(self, org_id: str) -> UsageMetrics:
        """Returns mock usage metrics enriched by simulated Stripe metering."""
        stripe_data = self._fetch_stripe_usage(org_id)
        # Provide a mock per-workspace breakdown to support dashboard UI.
        workspaces = [
            {"name": "Default Workspace", "percent": 45.2, "hue": "var(--accent-purple)"},
            {"name": "Engineering", "percent": 24.6, "hue": "var(--accent-blue)"},
            {"name": "Research", "percent": 15.8, "hue": "var(--accent-green)"},
            {"name": "Product", "percent": 9.7, "hue": "var(--accent-yellow)"},
            {"name": "Marketing", "percent": 4.7, "hue": "#fb7185"},
        ]

        return UsageMetrics(
            total_tokens=stripe_data["tokens"],
            tokens_trend="↑ 18.7%",
            total_queries="245.6K",
            queries_trend="↑ 15.2%",
            storage_used="128.4 GB",
            storage_trend="↑ 5.2%",
            estimated_cost="$245.60",
            cost_trend="↑ 1.2%",
            workspaces=workspaces,
        )

    def get_invoices(self, _org_id: str) -> InvoiceSummary:
        """Returns mock invoice data."""
        return InvoiceSummary(
            services=[
                CostService(
                    name="LLM Requests",
                    cost="$142.40",
                    percentage="58.0%",
                    color="var(--accent-purple)",
                ),
                CostService(
                    name="Embeddings",
                    cost="$67.30",
                    percentage="27.4%",
                    color="var(--accent-blue)",
                ),
                CostService(
                    name="Vector Search",
                    cost="$24.80",
                    percentage="10.1%",
                    color="var(--accent-green)",
                ),
                CostService(
                    name="Graph DB",
                    cost="$8.40",
                    percentage="3.4%",
                    color="var(--accent-yellow)",
                ),
                CostService(
                    name="Other",
                    cost="$2.70",
                    percentage="1.1%",
                    color="var(--text-secondary)",
                ),
            ]
        )

    def get_api_keys(self, _org_id: str) -> List[APIKey]:
        """Returns mock API keys."""
        now = datetime.datetime.utcnow().strftime("%b %d, %Y")
        return [
            APIKey(
                name="Production Key",
                key=APIKeyGenerator.generate_key("ocp_live_")[:18] + "••••••••",
                scopes="All",
                created_at=now,
                status="Active",
            ),
            APIKey(
                name="Development Key",
                key=APIKeyGenerator.generate_key("ocp_dev_")[:18] + "••••••••",
                scopes="Read, Write",
                created_at=now,
                status="Active",
            ),
            APIKey(
                name="Read Only Key",
                key=APIKeyGenerator.generate_key("ocp_ro_")[:18] + "••••••••",
                scopes="Read",
                created_at=now,
                status="Active",
            ),
        ]

    def create_api_key(self, _org_id: str, request: APIKeyCreateRequest) -> APIKey:
        """Mocks creating an API key."""
        now = datetime.datetime.utcnow().strftime("%b %d, %Y")
        full_key = APIKeyGenerator.generate_key("ocp_live_")
        return APIKey(
            name=request.name,
            key=full_key,
            scopes=request.scopes,
            created_at=now,
            status="Active",
        )


billing_service = BillingService()
