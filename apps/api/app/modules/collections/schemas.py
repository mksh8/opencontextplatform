"""Collections Pydantic schemas."""

from pydantic import BaseModel


class CollectionItem(BaseModel):
    """Collection item schema."""
    id: str
    icon: str
    title: str
    description: str
    tag: str
    tag_color: str
    tag_bg: str
    time_ago: str
