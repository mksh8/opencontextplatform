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
