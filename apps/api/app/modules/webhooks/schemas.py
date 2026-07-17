from pydantic import BaseModel
from typing import List

class Webhook(BaseModel):
    id: str
    name: str
    url: str
    events: List[str]
    status: str
