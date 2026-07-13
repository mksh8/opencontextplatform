from typing import Dict, Any
import uuid

class EpisodicMemoryManager:
    """
    Handles context versioning for episodic memory.
    Ensures that when a context object is updated, a new version is created 
    pointing to the previous one.
    """
    
    def apply_update(self, current_context: Dict[str, Any], new_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Creates a new version of the context object.
        """
        new_version = current_context.copy()
        
        # Track versioning
        new_version["previous_version_id"] = current_context.get("version_id", current_context.get("id"))
        new_version["version_id"] = str(uuid.uuid4())
        new_version["version_number"] = current_context.get("version_number", 1) + 1
        
        # Apply the actual update
        new_version.update(new_data)
        
        return new_version
