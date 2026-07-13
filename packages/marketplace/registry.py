import os
import json
import importlib.util
from typing import Dict, Any, Optional
from packages.marketplace.manifest import PluginManifest

class PluginRegistry:
    """Discovers and loads local plugins."""
    
    def __init__(self, plugin_dir: str):
        self.plugin_dir = plugin_dir
        self.active_plugins: Dict[str, Any] = {}
        
    def discover_and_load(self) -> None:
        if not os.path.exists(self.plugin_dir):
            return
            
        for folder in os.listdir(self.plugin_dir):
            folder_path = os.path.join(self.plugin_dir, folder)
            if os.path.isdir(folder_path):
                manifest_path = os.path.join(folder_path, "plugin.json")
                if os.path.exists(manifest_path):
                    self._load_plugin(folder_path, manifest_path)
                    
    def _load_plugin(self, folder_path: str, manifest_path: str) -> None:
        with open(manifest_path, 'r') as f:
            data = json.load(f)
            
        manifest = PluginManifest(data)
        if not manifest.is_valid():
            return
            
        module_path = os.path.join(folder_path, f"{manifest.entrypoint_module}.py")
        if not os.path.exists(module_path):
            return
            
        # Trusted Execution via importlib
        spec = importlib.util.spec_from_file_location(manifest.name, module_path)
        if spec and spec.loader:
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            
            plugin_class = getattr(module, manifest.entrypoint_class, None)
            if plugin_class:
                self.active_plugins[manifest.name] = {
                    "manifest": manifest,
                    "instance": plugin_class()
                }
                print(f"[Registry] Successfully loaded plugin: {manifest.name}")

    def get_plugin(self, name: str) -> Optional[Any]:
        plugin_data = self.active_plugins.get(name)
        if plugin_data:
            return plugin_data["instance"]
        return None
