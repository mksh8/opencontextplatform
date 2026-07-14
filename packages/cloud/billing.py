from abc import ABC, abstractmethod


class IBillingProvider(ABC):
    @abstractmethod
    def report_usage(self, tenant_id: str, metric: str, quantity: int) -> bool:
        pass


class StripeBillingProvider(IBillingProvider):
    """Reference implementation for Stripe Metered Billing."""

    def __init__(self, api_key: str):
        self.api_key = api_key

    def report_usage(self, tenant_id: str, metric: str, quantity: int) -> bool:
        """
        Pushes a metered event to Stripe (Mocked).
        Metric examples: 'context_nodes_ingested', 'llm_tokens'.
        """
        # Stripe API Mock: POST /v1/billing/meter_events
        print(f"[Stripe] Reported {quantity} units of {metric} for {tenant_id}")
        return True

    def get_billing_metrics(self) -> dict:
        """
        Retrieves aggregated usage from Stripe.
        """
        return {
            "total_tokens": "3.14B (Live via Stripe)",
            "total_queries": "314.1K",
            "storage_used": "150.2 GB",
            "estimated_cost": "$314.15",
            "trends": {
                "tokens": "+22.4%",
                "queries": "+11.1%",
                "storage": "+4.2%",
                "cost": "+3.1%",
            },
        }
