"""Episodic memory manager module for context object versioning."""

from typing import Any, Dict, Union
import uuid

from packages.runtime.context import ContextObject


class EpisodicMemoryManager:
    """
    Handles context versioning for episodic memory.
    Ensures that when a context object is updated, a new version is created
    pointing to the previous one.
    """

    def apply_update(
        self, current_context: Dict[str, Any], new_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Creates a new version of the context object.
        """
        new_version = current_context.copy()

        # Track versioning
        prev = current_context.get("version_id", current_context.get("id"))
        vid = str(uuid.uuid4())
        vnum = current_context.get("version_number", 1) + 1

        new_version["previous_version_id"] = prev
        new_version["version_id"] = vid
        new_version["version_number"] = vnum

        # Ensure metadata contains the versioning information as well
        metadata = dict(current_context.get("metadata") or {})
        metadata["previous_version_id"] = prev
        metadata["version_id"] = vid
        metadata["version_number"] = vnum
        new_version["metadata"] = metadata

        # Apply the actual update
        new_version.update(new_data)

        return new_version

    def track_version(self, context_obj: Union[Dict[str, Any], object]):
        """
        Create a new version of the provided context object and return a
        `ContextObject` instance (from `packages.runtime.context`).
        """
        # Normalize to dict
        if hasattr(context_obj, "to_dict"):
            current = context_obj.to_dict()
        elif isinstance(context_obj, dict):
            current = context_obj
        else:
            # Best-effort fallback: try to read attributes
            current = {
                "id": getattr(context_obj, "id", None),
                "tenant_id": getattr(context_obj, "tenant_id", None),
                "provider": getattr(context_obj, "provider", None),
                "type": getattr(context_obj, "type", None),
                "content": getattr(context_obj, "content", None),
                "metadata": getattr(context_obj, "metadata", {}),
                "timestamp": getattr(context_obj, "timestamp", None),
            }

        # Apply versioning metadata
        new_version = self.apply_update(current, {})

        try:
            return ContextObject.from_dict(new_version)
        except Exception:  # pylint: disable=broad-exception-caught
            # If conversion fails for any reason, return the dict
            return new_version
