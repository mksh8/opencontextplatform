"""Webhooks Pydantic schemas."""

from typing import List

from pydantic import BaseModel


class Webhook(BaseModel):
    """Webhook configuration response schema."""
    id: str
    name: str
    url: str
    events: List[str]
    status: str
