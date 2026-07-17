from pydantic import BaseModel
from typing import List


class CollectionItem(BaseModel):
    id: str
    icon: str
    title: str
    description: str
    tag: str
    tag_color: str
    tag_bg: str
    time_ago: str
