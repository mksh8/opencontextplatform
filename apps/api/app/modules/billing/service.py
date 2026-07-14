from typing import List
from apps.api.app.modules.billing.schemas import (
    UsageMetrics,
    InvoiceSummary,
    CostService,
    APIKey,
)


class BillingService:
    def get_usage(self, org_id: str) -> UsageMetrics:
        """Returns mock usage metrics."""
        return UsageMetrics(
            total_tokens="2.45B",
            tokens_trend="↑ 18.7%",
            total_queries="245.6K",
            queries_trend="↑ 15.2%",
            storage_used="128.4 GB",
            storage_trend="↑ 5.2%",
            estimated_cost="$245.60",
            cost_trend="↑ 1.2%",
        )

    def get_invoices(self, org_id: str) -> InvoiceSummary:
        """Returns mock invoice data."""
        return InvoiceSummary(
            services=[
                CostService(name="LLM Requests", cost="$142.40", percentage="58.0%", color="var(--accent-purple)"),
                CostService(name="Embeddings", cost="$67.30", percentage="27.4%", color="var(--accent-blue)"),
                CostService(name="Vector Search", cost="$24.80", percentage="10.1%", color="var(--accent-green)"),
                CostService(name="Graph DB", cost="$8.40", percentage="3.4%", color="var(--accent-yellow)"),
                CostService(name="Other", cost="$2.70", percentage="1.1%", color="var(--text-secondary)"),
            ]
        )

    def get_api_keys(self, org_id: str) -> List[APIKey]:
        """Returns mock API keys."""
        return [
            APIKey(name="Production Key", key="ocp_live_••••••••", scopes="All", created_at="May 10, 2024", status="Active"),
            APIKey(name="Development Key", key="ocp_dev_••••••••", scopes="Read, Write", created_at="May 11, 2024", status="Active"),
            APIKey(name="Read Only Key", key="ocp_ro_••••••••", scopes="Read", created_at="May 12, 2024", status="Active"),
            APIKey(name="Service Key", key="ocp_svc_••••••••", scopes="All", created_at="May 13, 2024", status="Revoked"),
        ]


billing_service = BillingService()
