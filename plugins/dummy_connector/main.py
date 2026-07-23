"""Dummy connector plugin example."""


class DummyConnector:
    """A third-party plugin connector."""

    def sync(self):
        """Sync dummy records."""
        return [{"id": "ext-1", "type": "dummy", "content": "Hello from plugin!"}]
