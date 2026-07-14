from typing import Dict, Any


class PluginManifest:
    """Schema for validating plugin.json."""

    def __init__(self, data: Dict[str, Any]):
        self.name = data.get("name")
        self.type = data.get("type")
        self.entrypoint_module = data.get("entrypoint_module")
        self.entrypoint_class = data.get("entrypoint_class")
        self.version = data.get("version", "1.0.0")

    def is_valid(self) -> bool:
        return all(
            [self.name, self.type, self.entrypoint_module, self.entrypoint_class]
        )
