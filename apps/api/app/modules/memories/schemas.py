from pydantic import BaseModel
from typing import List

class MemoryNode(BaseModel):
    id: str
    content: str
    type: str
    timestamp: str
