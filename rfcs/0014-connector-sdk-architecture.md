# RFC 0014: Connector SDK Architecture

## Purpose
This RFC defines the architecture for the Connector SDK (Phase 4). The Connector SDK is responsible for ingesting data from external platforms (GitHub, Slack, Notion) into the OpenContextPlatform.

## Goals
- Define a unified `IConnector` interface for all data sources.
- Support both **polling** (scheduled syncs) and **webhooks** (event-driven real-time updates).
- Support MCP (Model Context Protocol) and generic REST APIs.

## Architecture

The Connector SDK sits between External Sources and the Core Context Services (Ingestion).

1. **Webhook Ingestion**: Connectors define routes that the core platform registers (e.g., `/webhooks/github`). When a payload arrives, the connector normalizes it into a `ContextObject` and pushes it to the Memory Engine.
2. **Polling Ingestion**: Connectors implement a `sync()` method that pulls data, normalizes it, and pushes it.

## Diagrams
```mermaid
flowchart TD
  External[External Source: GitHub/Slack] -->|Webhook| API[/webhooks/:provider]
  External -->|API Fetch| Poller
  API --> Connector
  Poller --> Connector
  Connector -->|Transforms to ContextObject| MemoryEngine
```

## Abstract Interface
```python
class IConnector(ABC):
    @abstractmethod
    def sync(self, config: dict) -> list[ContextObject]:
        pass
        
    @abstractmethod
    def handle_webhook(self, payload: dict) -> list[ContextObject]:
        pass
```
