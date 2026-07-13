# Architecture

## Purpose

This document summarizes the architectural style for OpenContextPlatform.

## Goals

- Protect the domain core from framework and vendor coupling.
- Make all infrastructure replaceable through ports and adapters.
- Support enterprise-scale operations, security, and observability.

## Architecture

The platform combines Clean Architecture, DDD, Hexagonal Architecture, selective CQRS, Plugin Architecture, Event Driven design, and Cloud Native deployment.

The high-level product architecture is organized into eight layers:

- Any AI agent or application.
- Interface layer.
- Platform capabilities.
- Core context services.
- Intelligence layer.
- Connector framework.
- Provider abstraction layer.
- Bring-your-own infrastructure.

## Diagrams

```mermaid
flowchart TD
  Agents[Any AI Agent or Application] --> Interfaces[SDKs, MCP, REST, gRPC, CLI]
  Interfaces --> Runtime[OpenContextPlatform Runtime]
  Runtime --> Capabilities[Platform Capabilities]
  Runtime --> Core[Core Context Services]
  Runtime --> Intelligence[Intelligence Layer]
  Runtime --> Connectors[Connector Framework]
  Runtime --> Providers[Provider Abstraction Layer]
  Providers --> Infrastructure[Bring Your Own Infrastructure]
  Connectors --> Sources[External Sources]
```

![OpenContextPlatform Architecture](assets/architecture/open-context-platform-architecture.png)

```mermaid
flowchart LR
  Core[Core Context Services] --> Domain[Domain Model]
  Core --> Ports[Runtime Ports]
  Ports --> ProviderAdapters[Provider Adapters]
  Ports --> ConnectorAdapters[Connector Adapters]
  Core --> Events[Domain and Integration Events]
  Capabilities[Platform Capabilities] --> Core
```

## Examples

Retrieval orchestration belongs in core context services. Ranking rules belong behind ranking ports. Vector database calls belong in provider adapters. GitHub, Jira, Slack, Notion, filesystem, SQL, REST, and MCP ingestion belongs in connector adapters. Context identity, provenance, and policy belong in the domain.

## Tradeoffs

The architecture introduces more boundaries than a simple service. Those boundaries are necessary because providers, connectors, deployment modes, and SDKs must evolve independently.

## Future Work

Architecture diagrams will be expanded into runtime, control plane, data plane, plugin lifecycle, and deployment views.
