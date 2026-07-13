import unittest
import os
from packages.marketplace.registry import PluginRegistry

class TestMarketplace(unittest.TestCase):
    def test_plugin_loading(self):
        # Point registry to the root plugins directory
        plugin_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "plugins"))
        registry = PluginRegistry(plugin_dir)
        registry.discover_and_load()
        
        plugin = registry.get_plugin("dummy_connector")
        self.assertIsNotNone(plugin)
        
        result = plugin.sync()
        self.assertEqual(result[0]["content"], "Hello from plugin!")

if __name__ == '__main__':
    unittest.main()
