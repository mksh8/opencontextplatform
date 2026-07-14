from fastapi import APIRouter
from pydantic import BaseModel
import time

router = APIRouter(
    prefix="/api/v1/context",
    tags=["Search"]
)

class SearchRequest(BaseModel):
    query: str
    filters: dict = {}
    limit: int = 10

@router.post("/search")
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
