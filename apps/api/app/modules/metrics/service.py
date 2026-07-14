from packages.cloud.billing import StripeBillingProvider

class MetricsService:
    def get_billing_metrics(self, provider: StripeBillingProvider):
        """Business logic for retrieving billing metrics, delegates to Cloud Package."""
        return provider.get_billing_metrics()

metrics_service = MetricsService()
