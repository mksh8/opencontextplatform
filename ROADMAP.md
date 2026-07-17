# OpenContextPlatform

> **The Open Standard for AI Context**

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](#license)
[![Status](https://img.shields.io/badge/status-Architecture%20Phase-orange.svg)](#roadmap)
[![Version](https://img.shields.io/badge/version-v0.1.0--alpha-green.svg)](#roadmap)

OpenContextPlatform (OCP) is an open-source, provider-agnostic **Context Runtime** that enables AI agents, coding assistants, and enterprise AI applications to retrieve, enrich, manage, rank, and reason over contextual knowledge.

Unlike traditional memory frameworks, OpenContextPlatform provides a complete context infrastructure that supports:

* AI Agents
* Coding Assistants
* Enterprise AI
* Multi-Agent Systems
* RAG Applications
* AI Copilots
* Knowledge Platforms

---

# Vision

Build the **universal Context Infrastructure** for AI.

Just as:

* Kubernetes standardized container orchestration
* Terraform standardized infrastructure provisioning
* OpenTelemetry standardized observability
* Supabase simplified backend development

**OpenContextPlatform aims to standardize contextual intelligence.**

---

# Mission

Enable every AI application to use the same context infrastructure regardless of:

* LLM
* Embedding Model
* Vector Database
* Graph Database
* Storage
* Deployment Platform

Developers should be able to bring their own providers or use managed services.

---

# Core Principles

* API First
* Specification First
* Documentation First
* Plugin First
* Provider Agnostic
* Cloud Native
* Enterprise Ready
* Open Standards
* Developer Experience First

---

# Architecture

```text
                 AI Applications

 Claude Code
 Cursor
 OpenAI Agents SDK
 LangGraph
 CrewAI
 VS Code
 Custom Agents

                SDK / MCP / REST / gRPC

                       │

              OpenContext Runtime

                       │

 ┌────────────────────────────────────┐
 │ Context API                        │
 │ Memory Engine                      │
 │ Retrieval Engine                   │
 │ Ranking Engine                     │
 │ Prompt Builder                     │
 │ Knowledge Graph                    │
 │ Context Compression                │
 └────────────────────────────────────┘

                       │

          Provider Abstraction Layer

                       │

 LLM • Embeddings • Graph DB • Vector DB • Storage • Connectors
```

---

# Key Features

## Context Runtime

* Context Management
* Memory Management
* Context Retrieval
* Hybrid Search
* Prompt Assembly
* Context Ranking
* Context Compression

## Memory

* Session Memory
* User Memory
* Project Memory
* Organization Memory
* Episodic Memory
* Semantic Memory
* Procedural Memory

## Retrieval

* Vector Search
* Graph Search
* Hybrid Retrieval
* Metadata Search
* Keyword Search
* Temporal Search

## Knowledge Graph

* Entity Extraction
* Relationship Mapping
* Context Timeline
* Semantic Graph
* Repository Graph

---

# Primary Database

OpenContextPlatform uses **ArcadeDB** as the default unified database engine for the core runtime, natively handling:

* **Relational Data**
* **Vector Embeddings**
* **NoSQL Documents**
* **Graph Relationships**

---

# Bring Your Own Providers

## LLM

* OpenAI
* Anthropic
* Google Gemini
* Ollama
* Azure OpenAI
* Custom Providers

## Embedding Models

* OpenAI
* VoyageAI
* BGE
* Nomic
* Ollama
* Custom Models

## Vector Databases

* LanceDB
* Qdrant
* Pinecone
* Milvus
* Weaviate
* Chroma

## Graph Databases

* Neo4j
* ArcadeDB
* Kùzu
* Amazon Neptune
* JanusGraph

## Storage

* PostgreSQL
* MySQL
* MongoDB
* Amazon S3
* MinIO
* Azure Blob
* Google Cloud Storage

---

# Connectors

* GitHub
* GitLab
* Bitbucket
* Jira
* Slack
* Notion
* Confluence
* Google Drive
* SharePoint
* Filesystem
* SQL Databases
* REST APIs
* MCP Connectors

---

# SDKs

* Python
* TypeScript
* Go

**Planned**

* Java
* .NET
* Rust

---

# Deployment

* Local Development
* Docker
* Docker Compose
* Kubernetes
* Helm
* Terraform
* AWS
* Azure
* Google Cloud

---

# Repository Structure

```text
OpenContextPlatform/

book/
docs/
specs/
rfcs/
adr/

apps/
runtime/
packages/
providers/
connectors/
sdks/
deployments/
examples/
tests/
scripts/

.github/
.ai/

README.md
ROADMAP.md
AGENTS.md
CODEX.md
CLAUDE.md
```

---

# Roadmap

## Phase 1 — Foundation

**Status:** ✅ Complete

### Goals

* Repository bootstrap
* Architecture Book
* Product Requirements Document
* RFC process
* ADR templates
* CI/CD
* Development standards
* Monorepo structure

---

## Phase 2 — Context Runtime

**Status:** 🚧 In Progress

### Deliverables

* Context Runtime
* Context API
* Memory Engine
* Retrieval Engine
* Ranking Engine
* Prompt Builder
* Context Timeline
* Search API

---

## Phase 3 — Provider SDK

**Status:** 🚧 In Progress

### Deliverables

* Provider SDK
* LLM Provider
* Embedding Provider
* Graph Provider
* Vector Provider
* Storage Provider
* Cache Provider

---

## Phase 4 — Connector SDK

**Status:** ⏳ Backlog

### Deliverables

* GitHub
* GitLab
* Jira
* Slack
* Notion
* Confluence
* SQL
* Filesystem
* REST API
* MCP Connectors

---

## Phase 5 — Coding Context

**Status:** ⏳ Backlog

### Deliverables

* Repository Indexer
* AST Parser
* Dependency Graph
* Symbol Graph
* Call Graph
* Pull Request Graph
* Issue Graph
* Documentation Graph
* Code Search
* Architecture Graph

---

## Phase 6 — Dashboard

**Status:** 🚧 In Progress

### Deliverables

* UI/UX Design System
* Admin Dashboard
* Organizations
* Workspaces
* Provider Configuration
* Connector Management
* Monitoring
* Usage Analytics

---

## Phase 7 — Cloud Platform

**Status:** ⏳ Backlog

### Deliverables

* Managed Runtime
* Billing
* Usage Metering
* API Keys
* Hosted Providers
* Hosted Connectors

---

## Phase 8 — Enterprise

**Status:** ⏳ Backlog

### Deliverables

* RBAC
* SSO
* SCIM
* Audit Logs
* Policy Engine
* Encryption
* Secret Management
* Compliance

---

## Phase 9 — Marketplace

**Status:** ⏳ Backlog

### Deliverables

* Provider Marketplace
* Connector Marketplace
* Plugin Marketplace
* Templates
* Community Extensions

---

# Development Workflow

Every feature follows the same lifecycle. **It is a strict rule that a GitHub Issue MUST be created before any implementation begins.**

```text
GitHub Issue
 ↓
RFC
 ↓
Architecture
 ↓
UI/UX Design
 ↓
API Design
 ↓
Database Design
 ↓
Implementation
 ↓
Testing
 ↓
Documentation
 ↓
Review
 ↓
Release
```

---

# Definition of Done

A feature is considered complete only when:

* Architecture approved
* Code implemented
* Unit tests added
* Integration tests passing
* Documentation updated
* Examples included
* Benchmarks completed (where applicable)
* Code reviewed
* CI passing

---

# Documentation

The project documentation is organized into:

* **book/** — Architecture Book
* **docs/** — Developer Documentation
* **specs/** — Technical Specifications
* **rfcs/** — Request for Comments
* **adr/** — Architecture Decision Records

---

# Contributing

We welcome contributions from the community.

Please read:

* `CONTRIBUTING.md`
* `CODE_OF_CONDUCT.md`
* `AGENTS.md`
* `CODEX.md`
* `CLAUDE.md`

before opening a pull request.

---

# License

Apache License 2.0

---

# Project Status

| Component      | Status         |
| -------------- | -------------- |
| Vision         | ✅ Complete     |
| Roadmap        | ✅ Complete     |
| Architecture   | ✅ Complete     |
| Specifications | 🚧 In Progress |
| Runtime        | 🚧 In Progress |
| SDK            | 🚧 In Progress |
| Connectors     | ⏳ Backlog      |
| Dashboard      | 🚧 In Progress |
| Cloud          | ⏳ Backlog      |
| Enterprise     | ⏳ Backlog      |

---

# Long-Term Goal

OpenContextPlatform aims to become the **standard context infrastructure for AI**, enabling any agent, framework, or enterprise application to share a common, open, extensible approach to contextual intelligence.
