from fastapi import APIRouter

router = APIRouter(
    prefix="/api/v1/contexts",
    tags=["Contexts"]
)

@router.get("/")
def get_contexts():
    """Mock endpoint returning ingested context data for the UI table."""
    return {
        "data": [
            {
                "id": "ctx_1",
                "title": "Fix authentication bug in API gateway",
                "type": "Code",
                "source": "GitHub",
                "workspace": "Engineering",
                "tokens": "4.5K",
                "updated": "2m ago"
            },
            {
                "id": "ctx_2",
                "title": "User profile details endpoint",
                "type": "Documentation",
                "source": "Confluence",
                "workspace": "Engineering",
                "tokens": "2.1K",
                "updated": "5m ago"
            },
            {
                "id": "ctx_3",
                "title": "Q3 Roadmap planning",
                "type": "Documentation",
                "source": "Notion",
                "workspace": "Product",
                "tokens": "12.8K",
                "updated": "1h ago"
            },
            {
                "id": "ctx_4",
                "title": "Discussing Memory Architecture",
                "type": "Conversation",
                "source": "Slack",
                "workspace": "Engineering",
                "tokens": "850",
                "updated": "2h ago"
            }
        ],
        "total": 129,
        "page": 1
    }
