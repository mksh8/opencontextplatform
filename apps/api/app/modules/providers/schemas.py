from pydantic import BaseModel
from typing import List, Optional

class Provider(BaseModel):
    id: str
    name: str
    url: str
    model: str
    status: str
    usage: str

class ProviderCreateRequest(BaseModel):
    name: str
    provider_type: str
    api_key: str
    base_url: Optional[str] = None
