from pydantic import BaseModel
from typing import List

class Provider(BaseModel):
    id: str
    name: str
    url: str
    model: str
    status: str
    usage: str
