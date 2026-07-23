# OpenContextPlatform SaaS Architecture

This document outlines the architectural hierarchy and boundary definitions for the OpenContextPlatform, mirroring enterprise SaaS platforms (Databricks, Snowflake, GitHub Enterprise).

## Hierarchy Overview

```text
OpenContextPlatform (Platform Owner)
│
├── Organization (Company)
│   │
│   ├── Tenant (Business Unit / Environment)
│   │     │
│   │     ├── Workspace
│   │     │      ├── Projects
│   │     │      ├── Agents
│   │     │      ├── Workflows
│   │     │      ├── Data Sources
│   │     │      ├── Knowledge Graph
│   │     │      ├── Models
│   │     │      └── Users
│   │     │
│   │     └── Workspace...
│   │
│   └── Tenant...
│
└── Organization...
```

## Relationship & Data Model
- **Platform** manages many **Organizations**
- **Organization** owns many **Tenants**
- **Tenant** owns many **Workspaces**
- **Workspace** owns many **Projects**

### Database Schema Concept
```text
organization
      │
      ├── tenant (organization_id)
      │
      ├── workspace (tenant_id)
      │
      ├── project (workspace_id)
```

---

## Entity Definitions

### 1. Organization
An organization represents a legal or business entity (e.g., Microsoft, ABC Bank, Acme Corporation).
**Stores:** Company Profile, Billing Account, Subscription, Branding, Security Policies, Domains, Global Users, Enterprise Settings.

### 2. Tenant
A tenant is an isolated environment inside an organization (e.g., Production, Development, Retail Banking).
**Contains:** Isolated data, isolated RBAC, isolated AI resources, isolated storage, and isolated secrets.

### 3. Workspace
Workspace is where actual work happens (e.g., AI Team, Data Platform, Fraud Detection).
**Contains:** Projects, Agents, Workflows, MCP Servers, Data Sources, Vector DB, Context Graph, Ontology, Prompt Library, Memory, Evaluation, Documents.

---

## Role Based Access Control (RBAC)

| Role | Scope | Responsibilities |
| :--- | :--- | :--- |
| **Platform Owner** | Global | Manage all organizations, billing, marketplace, infrastructure |
| **Platform Admin** | Global | Platform operations, monitoring, support |
| **Organization Owner** | Organization | Company settings, tenants, enterprise policies, users |
| **Organization Admin** | Organization | User administration, governance, security |
| **Tenant Owner** | Tenant | Tenant lifecycle, quotas, workspaces, tenant-level AI resources |
| **Tenant Admin** | Tenant | Operational management within a tenant |
| **Workspace Admin** | Workspace | Projects, agents, workflows, data sources, team |
| **Project Admin** | Project | Project configuration and delivery |
| **Developer / Engineer**| Workspace | Build agents, pipelines, models, workflows |
| **Viewer** | Workspace | Read-only access |

---

## Console Access & Role Matrix

Console access is treated separately from RBAC permissions. A user first gets access to one or more consoles (Platform, Organization, Tenant, Workspace). Within each console, RBAC determines what actions they can perform.

### 1. Platform Console
*Only for OpenContextPlatform operators.*

**Roles:**
- Platform Owner (Full)
- Platform Admin (Full)
- Platform Operations (Limited)
- Platform Support (Read + Support)
- Billing Admin (Billing Only)
- Security Admin (Security)
- Auditor (Read Only)

**Modules:**
Dashboard, Organizations, Global Users, Billing, Marketplace, Global AI Providers, Connector Registry, Plugin Registry, SDK Registry, Global Policies, Audit Logs, Platform Health, Licensing, Support, Feature Flags.

### 2. Organization Console
*One organization only (e.g. Acme Corporation).*

**Roles:**
- Organization Owner (Full)
- Organization Admin (Full except delete)
- Security Admin (Security)
- Billing Manager (Billing)
- Compliance Officer (Audit)
- Tenant Owner (Read Only)
- Workspace Admin (Read Only)
- Platform Admin (Optional Support Mode)

**Modules:**
Dashboard, Company Profile, Tenants, Users, Groups, Departments, Roles, SSO, SCIM, Branding, Domains, Billing, Invoices, Subscription, Usage, Organization Policies, Audit Logs.

### 3. Tenant Console
*One tenant only (e.g. Retail Banking).*

**Roles:**
- Tenant Owner (Full)
- Tenant Admin (Full)
- Tenant Operator (Limited)
- Workspace Admin (Read)
- Developer (Read)
- Organization Owner (Read All)
- Platform Admin (Support Mode)

**Modules:**
Dashboard, Tenant Settings, Workspaces, Users, Secrets, AI Providers, Storage, Quota, Policies, API Keys, Monitoring, Logs, Usage.

### 4. Workspace Console
*Where engineers work daily.*

**Roles:**
- Workspace Owner (Full)
- Workspace Admin (Full)
- Project Admin (Project Only)
- AI/Data/ML Engineer (Development)
- Prompt Engineer (Prompt Studio)
- Business Analyst / Viewer (Read Only)

**Modules:**
Projects, Catalog, Datasources, Connectors, Pipelines, Ontology, Knowledge Graph, Agents, Workflows, Prompt Studio, Context Engine, Memory, Documents, Search, Evaluations, Observability.

---

## Access Matrix

| Role | Platform | Organization | Tenant | Workspace |
| :--- | :--- | :--- | :--- | :--- |
| **Platform Owner** | ✅ | ✅ (Support) | ✅ (Support) | ✅ (Support) |
| **Platform Admin** | ✅ | ✅ (Support) | ✅ (Support) | ✅ (Support) |
| **Platform Support** | ✅ | ✅ (Support) | ✅ (Support) | ✅ (Support) |
| **Organization Owner** | ❌ | ✅ | ✅ | ✅ |
| **Organization Admin** | ❌ | ✅ | ✅ | ✅ |
| **Security Admin** | ❌ | ✅ | ✅ | Read |
| **Billing Manager** | ❌ | Billing | Read | Read |
| **Tenant Owner** | ❌ | Read | ✅ | ✅ |
| **Tenant Admin** | ❌ | Read | ✅ | ✅ |
| **Workspace Owner**| ❌ | ❌ | Read | ✅ |
| **Workspace Admin**| ❌ | ❌ | Read | ✅ |
| **Project Admin** | ❌ | ❌ | ❌ | Project Scope |
| **AI/Data/ML Eng** | ❌ | ❌ | Read | ✅ |
| **Business Analyst**| ❌ | Read | Read | Read |
| **Viewer** | ❌ | ❌ | ❌ | Read |

### Support Mode
One feature that distinguishes mature enterprise SaaS platforms is a Support Mode for platform administrators. Rather than giving them unrestricted customer access, organization owners can explicitly grant temporary, audited access. Every action is logged, sessions are time-limited, and the customer can revoke access at any time.
