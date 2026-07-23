
-- OpenContextPlatform Enterprise Metadata Schema - Phase 4
-- Workflow Engine, Context Registry, Memory Policies, MCP Registry

CREATE SCHEMA IF NOT EXISTS workflow;
CREATE SCHEMA IF NOT EXISTS context;
CREATE SCHEMA IF NOT EXISTS memory;
CREATE SCHEMA IF NOT EXISTS mcp;

-- =========================
-- Workflow Engine
-- =========================

CREATE TABLE workflow.workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    workflow_type VARCHAR(100),
    status VARCHAR(30) DEFAULT 'DRAFT',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES identity.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workspace_id,name)
);

CREATE TABLE workflow.workflow_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID NOT NULL REFERENCES workflow.workflows(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    definition JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workflow_id,version)
);

CREATE TABLE workflow.workflow_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_version_id UUID NOT NULL REFERENCES workflow.workflow_versions(id) ON DELETE CASCADE,
    node_key VARCHAR(100) NOT NULL,
    node_type VARCHAR(100) NOT NULL,
    configuration JSONB DEFAULT '{}'::jsonb,
    UNIQUE(workflow_version_id,node_key)
);

CREATE TABLE workflow.workflow_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_version_id UUID NOT NULL REFERENCES workflow.workflow_versions(id) ON DELETE CASCADE,
    source_node_id UUID NOT NULL REFERENCES workflow.workflow_nodes(id) ON DELETE CASCADE,
    target_node_id UUID NOT NULL REFERENCES workflow.workflow_nodes(id) ON DELETE CASCADE,
    edge_type VARCHAR(50) DEFAULT 'DEFAULT'
);

CREATE TABLE workflow.workflow_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_version_id UUID REFERENCES workflow.workflow_versions(id),
    status VARCHAR(30),
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    initiated_by UUID REFERENCES identity.users(id),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE workflow.workflow_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_run_id UUID REFERENCES workflow.workflow_runs(id) ON DELETE CASCADE,
    node_id UUID REFERENCES workflow.workflow_nodes(id),
    status VARCHAR(30),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    output JSONB
);

-- =========================
-- Context Registry
-- =========================

CREATE TABLE context.context_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    retrieval_strategy VARCHAR(100),
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(workspace_id,name)
);

CREATE TABLE context.context_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES context.context_profiles(id) ON DELETE CASCADE,
    name VARCHAR(255),
    template JSONB NOT NULL,
    version INTEGER DEFAULT 1
);

CREATE TABLE context.context_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255),
    max_tokens INTEGER,
    ttl_hours INTEGER,
    compression_strategy VARCHAR(100),
    configuration JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE context.context_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    agent_run_id UUID REFERENCES agent.agent_runs(id),
    profile_id UUID REFERENCES context.context_profiles(id),
    policy_id UUID REFERENCES context.context_policies(id),
    started_at TIMESTAMPTZ DEFAULT now(),
    ended_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =========================
-- Memory
-- =========================

CREATE TABLE memory.memory_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255),
    memory_type VARCHAR(100),
    retention_days INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE memory.memory_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES memory.memory_profiles(id) ON DELETE CASCADE,
    importance_threshold NUMERIC(5,2),
    consolidation_interval VARCHAR(50),
    expiration_strategy VARCHAR(100),
    configuration JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE memory.memory_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES memory.memory_profiles(id),
    job_type VARCHAR(100),
    status VARCHAR(30),
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    result JSONB
);

-- =========================
-- MCP Registry
-- =========================

CREATE TABLE mcp.mcp_servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    endpoint VARCHAR(500),
    transport VARCHAR(50),
    authentication_type VARCHAR(50),
    configuration JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    UNIQUE(workspace_id,name)
);

CREATE TABLE mcp.mcp_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    server_id UUID REFERENCES mcp.mcp_servers(id) ON DELETE CASCADE,
    tool_name VARCHAR(255) NOT NULL,
    description TEXT,
    input_schema JSONB,
    output_schema JSONB,
    UNIQUE(server_id,tool_name)
);

CREATE TABLE mcp.mcp_tool_permissions (
    tool_id UUID REFERENCES mcp.mcp_tools(id) ON DELETE CASCADE,
    role_id UUID REFERENCES identity.roles(id) ON DELETE CASCADE,
    PRIMARY KEY(tool_id,role_id)
);

CREATE TABLE mcp.mcp_tool_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES mcp.mcp_tools(id),
    agent_run_id UUID REFERENCES agent.agent_runs(id),
    executed_by UUID REFERENCES identity.users(id),
    status VARCHAR(30),
    latency_ms INTEGER,
    request JSONB,
    response JSONB,
    executed_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_workflow_runs_status ON workflow.workflow_runs(status);
CREATE INDEX idx_context_sessions_agent_run ON context.context_sessions(agent_run_id);
CREATE INDEX idx_memory_jobs_status ON memory.memory_jobs(status);
CREATE INDEX idx_mcp_exec_time ON mcp.mcp_tool_executions(executed_at);
