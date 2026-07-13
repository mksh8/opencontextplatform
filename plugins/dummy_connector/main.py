class DummyConnector:
    """A third-party plugin connector."""
    def sync(self):
        return [{"id": "ext-1", "type": "dummy", "content": "Hello from plugin!"}]
