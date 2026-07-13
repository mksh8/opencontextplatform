# Context Sequence Design

## Purpose

This document defines the first context object sequence diagrams required before runtime scaffolding.

## Goals

- Make context ingestion, retrieval, lifecycle update, and permission filtering flows reviewable.
- Show boundaries between clients, APIs, application services, domain, ports, providers, connectors, audit, and events.
- Identify security and failure-mode checkpoints before implementation.

## Architecture

Sequence design follows the accepted runtime architecture. Interfaces call application services. Application services enforce policy and domain rules through ports. Providers and connectors operate behind adapters. Audit and event emission are part of successful state changes and security-relevant decisions.

## Diagrams

```mermaid
sequenceDiagram
  participant Connector
  participant API
  participant App as Application Service
  participant Domain
  participant Policy
  participant Store as Storage Port
  participant Events
  participant Audit
  Connector->>API: ingest context batch
  API->>App: command
  App->>Policy: validate tenant and source permissions
  Policy-->>App: decision
  App->>Domain: validate context object
  Domain-->>App: accepted domain object
  App->>Store: persist canonical context
  Store-->>App: stored ids
  App->>Events: emit context ingested
  App->>Audit: record ingestion decision
  App-->>API: ingestion result
  API-->>Connector: accepted
```

```mermaid
sequenceDiagram
  participant Client
  participant API
  participant App as Application Service
  participant Policy
  participant Retrieval
  participant Ranker
  participant Audit
  Client->>API: retrieve context
  API->>App: query
  App->>Policy: authorize query scope
  Policy-->>App: allowed scope
  App->>Retrieval: execute hybrid retrieval
  Retrieval-->>App: candidates
  App->>Policy: filter candidate visibility
  Policy-->>App: visible candidates
  App->>Ranker: rank visible candidates
  Ranker-->>App: ranked context with explanations
  App->>Audit: record retrieval decision
  App-->>API: retrieval result
  API-->>Client: ranked context
```

```mermaid
sequenceDiagram
  participant Client
  participant API
  participant App as Application Service
  participant Policy
  participant Domain
  participant Store as Storage Port
  participant Projections
  participant Events
  participant Audit
  Client->>API: update lifecycle deleted/redacted/stale
  API->>App: lifecycle command
  App->>Policy: authorize lifecycle transition
  Policy-->>App: decision
  App->>Domain: validate transition
  Domain-->>App: accepted lifecycle change
  App->>Store: persist canonical lifecycle state
  Store-->>App: persisted
  App->>Projections: invalidate or update projections
  Projections-->>App: projection update accepted
  App->>Events: emit lifecycle changed
  App->>Audit: record lifecycle decision
  App-->>API: lifecycle update result
  API-->>Client: accepted
```

## Examples

Lifecycle deletion should validate source authority, update canonical state, emit lifecycle events, invalidate projections, and write audit records. Retrieval should apply authorization before ranking and before prompt building.

### Required Flow Checkpoints

| Flow | Required Checkpoints |
| --- | --- |
| ingestion | idempotency, tenant validation, source permission mapping, domain validation, persistence, event, audit |
| retrieval | query authorization, hybrid retrieval, candidate policy filtering, ranking, explanations, audit |
| lifecycle update | actor authorization, lifecycle transition validation, projection invalidation, event, audit |
| relationship link | source authority, relationship type validation, cycle or duplicate rules, event, audit |

## Tradeoffs

Sequence diagrams can become stale, but they reveal missing boundaries and security checks before code exists. The project accepts that maintenance cost because context infrastructure crosses many trust boundaries.

## Future Work

Add sequence diagrams for prompt assembly, memory derivation, plugin loading, connector sync, projection rebuilds, relationship linking, and policy denial flows.
