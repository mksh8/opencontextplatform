"""ContextObject data class for runtime context representations."""

from typing import Any, Dict, Optional


class ContextObject:
    """
    Lightweight ContextObject used across tests and runtime components.
    Intended to be a minimal, serializable container with a `to_dict()` helper.
    """

    def __init__(
        self,
        id: str,  # pylint: disable=redefined-builtin
        tenant_id: str,
        provider: Optional[str] = None,
        type: Optional[str] = None,  # pylint: disable=redefined-builtin
        content: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        timestamp: Optional[str] = None,
    ):  # pylint: disable=too-many-arguments,too-many-positional-arguments
        self.id = id
        self.tenant_id = tenant_id
        self.provider = provider
        self.type = type
        self.content = content
        self.metadata = metadata or {}
        self.timestamp = timestamp

    def to_dict(self) -> Dict[str, Any]:
        """Convert ContextObject attributes to a dictionary."""
        return {
            "id": self.id,
            "tenant_id": self.tenant_id,
            "provider": self.provider,
            "type": self.type,
            "content": self.content,
            "metadata": self.metadata,
            "timestamp": self.timestamp,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]):
        """Construct ContextObject from a dictionary."""
        return cls(
            id=data.get("id"),
            tenant_id=data.get("tenant_id"),
            provider=data.get("provider"),
            type=data.get("type"),
            content=data.get("content"),
            metadata=data.get("metadata", {}),
            timestamp=data.get("timestamp"),
        )

    def __repr__(self) -> str:
        return f"ContextObject(id={self.id}, tenant_id={self.tenant_id})"
