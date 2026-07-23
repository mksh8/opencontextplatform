---
trigger: manual
---

# OpenContextPlatform Ruleset
> Antigravity IDE Development Rules
>
> Version: 1.0
> Architecture: Enterprise Context Operating System (Context OS)
> Language: Python + FastAPI + React + TypeScript
> Database: PostgreSQL + Neo4j/Kuzu + Qdrant + Redis
> Infrastructure: Kubernetes + Docker + GitHub Actions
> AI Framework: LangGraph + MCP + OpenAI Compatible APIs

---

# Mission

OpenContextPlatform is an enterprise Context Operating System that unifies:

- Enterprise Search
- Knowledge Graph
- Agent Memory
- Collections
- Context Management
- AI Agents
- Workflows
- Connectors
- Governance
- APIs
- Observability

Every feature must support scalability, extensibility, and enterprise security.

---

# Engineering Principles

Always optimize for:

- Clean Architecture
- Domain Driven Design
- SOLID
- DRY
- KISS
- Hexagonal Architecture
- Testability
- Extensibility
- Multi-tenancy
- Event Driven Architecture

Never write code that tightly couples infrastructure with business logic.

---

# Project Structure

```
opencontextplatform/

backend/
    api/
    domain/
    application/
    infrastructure/
    services/
    repositories/
    models/
    schemas/
    workers/
    connectors/
    agents/
    memory/
    graph/
    vector/
    ingestion/

frontend/
    app/
    pages/
    components/
    layouts/
    hooks/
    services/
    providers/
    types/

sdk/

docs/

deploy/

tests/
```

---

# Architecture Rules

Every feature must follow

```
API

↓

Application Service

↓

Domain

↓

Repository

↓

Infrastructure
```

Business logic NEVER belongs inside API routes.

---

# Modules

The platform consists of independent modules.

```
Dashboard

Contexts

Collections

Search

Timeline

Graph Explorer

Knowledge

Memory

Agents

Flows

Connectors

Providers

Models

Playground

Observability

Organizations

Workspaces

Users

Billing

Administration
```

Each module owns

```
API

Service

Repository

Models

Schemas

Tests

Permissions

Documentation
```

---

# Module Isolation

Modules communicate through interfaces.

Never import another module's internal implementation.

Use

- Service Interfaces
- Events
- APIs

Never access another module database directly.

---

# API Standards

All APIs are REST.

Pattern

```
/api/v1/
```

Example

```
GET /api/v1/contexts

POST /api/v1/contexts

PATCH /api/v1/contexts/{id}

DELETE /api/v1/contexts/{id}
```

Return

```
{
    "success": true,
    "data": {},
    "metadata": {},
    "errors": []
}
```

---

# Authentication

Support

- JWT
- OAuth2
- SAML
- LDAP
- API Keys

Every endpoint requires authorization.

No anonymous enterprise APIs.

---

# Authorization

Always use RBAC.

```
Organization

↓

Workspace

↓

Collection

↓

Context

↓

Object
```

Permissions

```
Read

Write

Delete

Share

Admin
```

Never hardcode permissions.

---

# Multi Tenancy

Every table includes

```
organization_id

workspace_id
```

No cross-tenant queries.

Always filter by tenant.

---

# Database Rules

Use

PostgreSQL

for

- metadata
- users
- permissions
- jobs

Graph DB

for

- relationships
- ontology
- knowledge graph

Vector DB

for

- embeddings
- semantic search

Redis

for

- caching
- queues
- sessions

---

# Context Model

Every Context contains

```
ID

Title

Description

Type

Content

Metadata

Embeddings

Entities

Relationships

Chunks

Owner

Workspace

Permissions

Tags

Version

Created

Updated
```

---

# Search Rules

Always support

Keyword

Semantic

Hybrid

Graph

Filters

Facets

Ranking

Search must be pluggable.

---

# Memory Rules

Memory types

```
Working Memory

Conversation Memory

Semantic Memory

Procedural Memory

Episodic Memory
```

Memory provider must be interchangeable.

Support

Native

Zep

Mem0

Custom

---

# Agent Rules

Every Agent contains

```
Identity

Instructions

Tools

Memory

Knowledge

Model

Workflow

Guardrails

Evaluation

Observability
```

Agent execution must be stateless.

Memory is injected.

---

# Connector Rules

Connector lifecycle

```
Authenticate

Validate

Sync

Monitor

Retry

Recover
```

Every connector supports

Health

Logs

Scheduling

Rate Limits

---

# Workflow Rules

Flows are DAGs.

Support

Triggers

Conditions

Loops

Retries

Human Approval

Parallel Execution

Webhooks

MCP Calls

---

# Provider Rules

Providers are plugins.

Support

LLMs

Embedding

Speech

OCR

Vision

Rerankers

Graph

Vector

Every provider implements

```
initialize()

health()

execute()

shutdown()
```

---

# Knowledge Graph

Entities

Relationships

Ontology

Communities

Temporal edges

Lineage

Impact analysis

Every graph operation must be transactional.

---

# Chunking

Support

Recursive

Markdown

Code

Semantic

Table

Token

Hybrid

Never hardcode chunk size.

---

# Embeddings

Support multiple providers.

Embedding dimensions must be validated.

Never mix incompatible vectors.

---

# Observability

Capture

Latency

Token Usage

Errors

Cost

Retries

Success Rate

Model

Provider

Every execution produces a trace.

---

# Logging

Never use print().

Use structured logging.

Every log includes

```
request_id

organization

workspace

user

agent

module

duration
```

---

# Error Handling

Never expose stack traces.

Return

```
code

message

details

trace_id
```

---

# Security

Validate

Files

URLs

Prompts

SQL

Cypher

Never execute raw queries.

Always parameterize.

---

# Testing

Minimum

90%

coverage

Tests

Unit

Integration

API

Load

Security

Regression

---

# Documentation

Every feature includes

README

Architecture

API

Examples

Sequence Diagram

Permissions

Configuration

---

# Frontend Standards

React

TypeScript

Tailwind

Shadcn UI

TanStack Query

React Hook Form

Zod

Never store business logic in components.

---

# UI Principles

Enterprise

Minimal

Dark/Light

Responsive

Accessible

WCAG AA

Keyboard Navigation

Every page contains

Breadcrumb

Search

Filters

Bulk Actions

Pagination

Audit Information

---

# Dashboard Standards

Every dashboard includes

KPIs

Charts

Tables

Filters

Export

Drill Down

Refresh

---

# Performance

API

<300ms

Search

<500ms

Graph Query

<1s

Page Load

<2s

---

# Code Quality

Use

ruff

black

mypy

pytest

bandit

pre-commit

Every PR must pass all checks.

---

# Git Rules

Feature branches

```
feature/module-name
```

Bug fixes

```
fix/module-name
```

Hotfix

```
hotfix/module-name
```

---

# Pull Request Rules

Every PR includes

Summary

Architecture

Tests

Screenshots

Performance Impact

Security Impact

Breaking Changes

---

# AI Coding Rules

When implementing a feature:

1. Analyze the module.
2. Design the API.
3. Create domain models.
4. Implement services.
5. Implement repositories.
6. Write tests.
7. Generate API documentation.
8. Generate frontend.
9. Update navigation.
10. Update architecture documentation.

Never skip tests.

Never skip documentation.

Never duplicate code.

Always prefer reusable components.

Always design for enterprise scale.

Always ask:

"Can this support one million contexts and thousands of concurrent users?"

If the answer is no, redesign before implementation.