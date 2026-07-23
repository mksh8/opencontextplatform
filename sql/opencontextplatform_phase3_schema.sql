
-- OpenContextPlatform Enterprise Metadata Schema - Phase 3
-- AI Providers, Models, Prompt Registry, Agent Registry

CREATE SCHEMA IF NOT EXISTS ai;
CREATE SCHEMA IF NOT EXISTS agent;

-- =====================================================
-- AI PROVIDERS
-- =====================================================

CREATE TABLE ai.embedding_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_config_id UUID NOT NULL REFERENCES provider.provider_configs(id) ON DELETE CASCADE,
    model_name VARCHAR(255) NOT NULL,
    dimensions INTEGER NOT NULL,
    max_tokens INTEGER,
    supports_batch BOOLEAN DEFAULT TRUE,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(provider_config_id, model_name)
);

CREATE TABLE ai.chat_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_config_id UUID NOT NULL REFERENCES provider.provider_configs(id) ON DELETE CASCADE,
    model_name VARCHAR(255) NOT NULL,
    context_window INTEGER,
    max_output_tokens INTEGER,
    supports_streaming BOOLEAN DEFAULT TRUE,
    supports_tools BOOLEAN DEFAULT FALSE,
    supports_vision BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(provider_config_id, model_name)
);

CREATE TABLE ai.reranker_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_config_id UUID NOT NULL REFERENCES provider.provider_configs(id) ON DELETE CASCADE,
    model_name VARCHAR(255) NOT NULL,
    max_documents INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ai.model_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_model_id UUID REFERENCES ai.chat_models(id),
    embedding_model_id UUID REFERENCES ai.embedding_models(id),
    input_cost NUMERIC(12,6),
    output_cost NUMERIC(12,6),
    currency VARCHAR(10) DEFAULT 'USD',
    effective_from TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- PROMPT REGISTRY
-- =====================================================

CREATE TABLE ai.prompt_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    latest_version INTEGER DEFAULT 1,
    created_by UUID REFERENCES identity.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workspace_id, name)
);

CREATE TABLE ai.prompt_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES ai.prompt_templates(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    system_prompt TEXT,
    user_prompt TEXT,
    configuration JSONB DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES identity.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(template_id, version)
);

CREATE TABLE ai.prompt_variables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt_version_id UUID NOT NULL REFERENCES ai.prompt_versions(id) ON DELETE CASCADE,
    variable_name VARCHAR(255) NOT NULL,
    data_type VARCHAR(50),
    default_value TEXT,
    required BOOLEAN DEFAULT FALSE,
    UNIQUE(prompt_version_id, variable_name)
);

CREATE TABLE ai.prompt_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt_version_id UUID REFERENCES ai.prompt_versions(id),
    user_id UUID REFERENCES identity.users(id),
    provider_config_id UUID REFERENCES provider.provider_configs(id),
    model_name VARCHAR(255),
    input_tokens INTEGER,
    output_tokens INTEGER,
    latency_ms INTEGER,
    status VARCHAR(30),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- AGENT REGISTRY
-- =====================================================

CREATE TABLE agent.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    agent_type VARCHAR(100),
    status VARCHAR(30) DEFAULT 'ACTIVE',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES identity.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workspace_id, name)
);

CREATE TABLE agent.agent_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES agent.agents(id) ON DELETE CASCADE,
    version INTEGER NOT NULL,
    description TEXT,
    graph_definition JSONB,
    configuration JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(agent_id, version)
);

CREATE TABLE agent.tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    tool_type VARCHAR(100),
    endpoint VARCHAR(500),
    schema_definition JSONB,
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(workspace_id, name)
);

CREATE TABLE agent.agent_tools (
    agent_version_id UUID REFERENCES agent.agent_versions(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES agent.tools(id) ON DELETE CASCADE,
    required BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(agent_version_id, tool_id)
);

CREATE TABLE agent.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    skill_definition JSONB,
    UNIQUE(workspace_id, name)
);

CREATE TABLE agent.agent_skills (
    agent_version_id UUID REFERENCES agent.agent_versions(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES agent.skills(id) ON DELETE CASCADE,
    PRIMARY KEY(agent_version_id, skill_id)
);

CREATE TABLE agent.agent_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_version_id UUID REFERENCES agent.agent_versions(id),
    user_id UUID REFERENCES identity.users(id),
    session_id UUID,
    status VARCHAR(30),
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    total_tokens INTEGER,
    total_cost NUMERIC(12,6),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE agent.agent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_run_id UUID REFERENCES agent.agent_runs(id) ON DELETE CASCADE,
    log_level VARCHAR(20),
    message TEXT,
    event_time TIMESTAMPTZ DEFAULT now(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_agents_name ON agent.agents(name);
CREATE INDEX idx_prompt_template_name ON ai.prompt_templates(name);
CREATE INDEX idx_agent_runs_status ON agent.agent_runs(status);
CREATE INDEX idx_prompt_execution_created_at ON ai.prompt_executions(created_at);
