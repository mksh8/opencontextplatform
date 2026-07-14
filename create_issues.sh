#!/bin/bash

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) could not be found. Please install it first."
    exit 1
fi

gh issue create \
  --title "[FEATURE] Sprint 1: Dashboard Completion & Integration" \
  --label "enhancement" \
  --body "The dashboard currently has a functional UI/UX design system and basic integration for Overview, Contexts, and Organizations. We need to implement the remaining pages and wire them up to FastAPI backend routes to make the dashboard 100% operational.

**Acceptance Criteria**
- [ ] **Billing & Usage**: Wire up \`Billing.tsx\` and \`APIKeys.tsx\` with Stripe mock backend.
- [ ] **Data Management**: Implement data fetching for \`Collections.tsx\` and \`Memories.tsx\`.
- [ ] **Ingestion & Connectors**: Wire up \`Connectors.tsx\`, \`Sources.tsx\`, and \`IngestionJobs.tsx\`.
- [ ] **Graph & Search**: Complete \`GraphExplorer.tsx\` visualization and \`Timeline.tsx\`.
- [ ] **Administration**: Wire up \`Members.tsx\`, \`RolesPermissions.tsx\`, and \`AuditLogs.tsx\`.
- [ ] **Platform Settings**: Wire up \`Settings.tsx\`, \`Providers.tsx\`, \`Models.tsx\`, and \`Webhooks.tsx\`.
- [ ] **Backend APIs**: Scaffold all missing FastAPI routes in \`apps/api/app/api/v1/\` to support the above pages."

gh issue create \
  --title "[FEATURE] Sprint 2: Specifications & Architecture" \
  --label "enhancement,documentation" \
  --body "Before we dive into the heavy database logic, we need to finalize the exact technical specifications for the Core Runtime and the MCP (Model Context Protocol).

**Acceptance Criteria**
- [ ] Finalize the OpenAPI specification for the Context Runtime.
- [ ] Write the MCP (Model Context Protocol) compatibility specification.
- [ ] Draft Architecture Decision Records (ADR) for Vector vs Graph hybrid search.
- [ ] Complete the Data Schema definitions for ArcadeDB models."

gh issue create \
  --title "[FEATURE] Sprint 3: Core Runtime & Database Engine" \
  --label "enhancement" \
  --body "Implement the core intelligence of OpenContextPlatform. Swap out the mock backend engines for real implementations using ArcadeDB.

**Acceptance Criteria**
- [ ] **ArcadeDB Provider**: Establish native connection pooling and graph/document schemas.
- [ ] **Memory Engine**: Implement Semantic and Episodic memory CRUD operations.
- [ ] **Retrieval Engine**: Implement Hybrid Search (Vector + Graph traversal).
- [ ] **Ranking Engine**: Implement context relevance scoring algorithms.
- [ ] **Prompt Builder**: Build the dynamic context-to-prompt assembly engine."

gh issue create \
  --title "[FEATURE] Sprint 4: Provider SDKs" \
  --label "enhancement" \
  --body "Build the abstraction layer that allows OCP to be provider-agnostic. Implement the first batch of official integrations.

**Acceptance Criteria**
- [ ] **LLM Provider Interface**: Implement wrappers for OpenAI, Anthropic, and Local Ollama.
- [ ] **Embedding Provider Interface**: Implement wrappers for OpenAI and BGE models.
- [ ] **Vector/Graph Interfaces**: Abstract the database calls so alternative databases (Neo4j, Pinecone) can be plugged in later."

gh issue create \
  --title "[FEATURE] Sprint 5: Connectors & Ingestion" \
  --label "enhancement" \
  --body "Build the data pipelines that ingest context from third-party tools into the OCP Knowledge Graph.

**Acceptance Criteria**
- [ ] **GitHub Connector**: Parse repositories, ASTs, Pull Requests, and Issues into the graph.
- [ ] **Slack Connector**: Ingest channel conversations and map user entities.
- [ ] **Notion Connector**: Ingest documentation and maintain hierarchical relationships.
- [ ] **Local Filesystem**: CLI tool to recursively index local directories."

gh issue create \
  --title "[FEATURE] Sprint 6: Cloud Platform" \
  --label "enhancement" \
  --body "Build the cloud infrastructure necessary to offer OpenContextPlatform as a managed SaaS solution.

**Acceptance Criteria**
- [ ] Implement multi-tenant isolation at the database level.
- [ ] Integrate Stripe for real usage-based metering and billing.
- [ ] Build the API Key generation and Redis-based Rate Limiting middleware.
- [ ] Dockerize and create Kubernetes/Helm charts for deployment."

gh issue create \
  --title "[FEATURE] Sprint 7: Enterprise Features" \
  --label "enhancement" \
  --body "Implement enterprise-grade security and compliance features required by large organizations.

**Acceptance Criteria**
- [ ] **RBAC**: Implement granular Role-Based Access Control and Policy Engine.
- [ ] **SSO**: Add SAML / OAuth SSO integration for tenant logins.
- [ ] **SCIM**: Support automated user provisioning/de-provisioning.
- [ ] **Audit Logs**: Implement immutable audit logging for all API operations.
- [ ] **Encryption**: Add at-rest encryption and KMS integrations."

echo "All 7 Sprint issues have been created in GitHub!"
