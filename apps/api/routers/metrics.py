from fastapi import APIRouter

router = APIRouter(
    prefix="/api/v1/metrics",
    tags=["Metrics"]
)

@router.get("/billing")
def get_billing_metrics():
    """Mock endpoint returning usage and billing stats."""
    return {
        "total_tokens": "2.45B",
        "total_queries": "245.6K",
        "storage_used": "128.4 GB",
        "estimated_cost": "$245.60",
        "trends": {
            "tokens": "+18.7%",
            "queries": "+15.2%",
            "storage": "+5.2%",
            "cost": "+1.2%"
        }
    }
