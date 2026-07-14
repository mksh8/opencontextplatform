from pydantic import BaseModel

class SearchRequest(BaseModel):
    query: str
    filters: dict = {}
    limit: int = 10
