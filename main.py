from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time

app = FastAPI(title="OpenContextPlatform Gateway", version="1.0.0")

# Configure CORS so the React Dashboard (Vite runs on 5173 or 8080) can communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "service": "OpenContextPlatform Gateway"}

@app.get("/api/v1/contexts")
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

@app.get("/api/v1/metrics/billing")
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

class SearchRequest(BaseModel):
    query: str
    filters: dict = {}
    limit: int = 10

@app.post("/api/v1/context/search")
async def search_context(request: SearchRequest):
    """Mock search endpoint for the API Playground."""
    # Simulate processing delay
    time.sleep(0.3)
    
    return {
        "results": [
            {
                "id": f"ctx_res_{time.time()}",
                "title": f"Search Result for '{request.query}'",
                "type": "code",
                "score": 0.95,
                "metadata": {
                    "repo": "opencontextplatform",
                    "path": "/src/api/search.py"
                }
            }
        ],
        "total": 1,
        "page": 1,
        "query_echo": request.query
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
