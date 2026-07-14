from pydantic import BaseModel
from typing import List

class Connector(BaseModel):
    id: str
    name: str
    icon: str
    status: str
    last_sync: str
    details: str
