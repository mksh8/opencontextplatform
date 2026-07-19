
-- OpenContextPlatform Enterprise Metadata Schema - Phase 5
-- Lineage, Ontology, Observability, Notifications

CREATE SCHEMA IF NOT EXISTS lineage;
CREATE SCHEMA IF NOT EXISTS ontology;
CREATE SCHEMA IF NOT EXISTS monitoring;
CREATE SCHEMA IF NOT EXISTS notification;

-- =========================
-- Lineage
-- =========================

CREATE TABLE lineage.lineage_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id),
    datasource_id UUID REFERENCES datasource.datasources(id),
    job_name VARCHAR(255) NOT NULL,
    engine VARCHAR(100),
    status VARCHAR(30) DEFAULT 'PENDING',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE lineage.lineage_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lineage_job_id UUID REFERENCES lineage.lineage_jobs(id) ON DELETE CASCADE,
    snapshot_version INTEGER NOT NULL,
    graph_hash VARCHAR(128),
    snapshot_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(lineage_job_id,snapshot_version)
);

CREATE TABLE lineage.metadata_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    version INTEGER NOT NULL,
    change_type VARCHAR(50),
    changed_by UUID REFERENCES identity.users(id),
    change_summary TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(entity_type,entity_id,version)
);

-- =========================
-- Ontology
-- =========================

CREATE TABLE ontology.ontologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    namespace VARCHAR(255),
    description TEXT,
    version VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workspace_id,name)
);

CREATE TABLE ontology.concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ontology_id UUID REFERENCES ontology.ontologies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    concept_type VARCHAR(100),
    description TEXT,
    properties JSONB DEFAULT '{}'::jsonb,
    UNIQUE(ontology_id,name)
);

CREATE TABLE ontology.concept_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_concept_id UUID REFERENCES ontology.concepts(id) ON DELETE CASCADE,
    target_concept_id UUID REFERENCES ontology.concepts(id) ON DELETE CASCADE,
    relationship_type VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =========================
-- Monitoring / Observability
-- =========================

CREATE TABLE monitoring.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    event_type VARCHAR(100),
    source VARCHAR(100),
    severity VARCHAR(30),
    payload JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE monitoring.metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    metric_name VARCHAR(255),
    metric_value NUMERIC(18,6),
    labels JSONB DEFAULT '{}'::jsonb,
    recorded_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE monitoring.traces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trace_id VARCHAR(128) UNIQUE,
    span_id VARCHAR(128),
    parent_span_id VARCHAR(128),
    service_name VARCHAR(255),
    operation_name VARCHAR(255),
    duration_ms INTEGER,
    status VARCHAR(30),
    started_at TIMESTAMPTZ
);

CREATE TABLE monitoring.llm_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_run_id UUID REFERENCES agent.agent_runs(id),
    provider_config_id UUID REFERENCES provider.provider_configs(id),
    model_name VARCHAR(255),
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    total_tokens INTEGER,
    estimated_cost NUMERIC(12,6),
    latency_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================
-- Notifications
-- =========================

CREATE TABLE notification.channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255),
    channel_type VARCHAR(50),
    configuration JSONB DEFAULT '{}'::jsonb,
    UNIQUE(workspace_id,name)
);

CREATE TABLE notification.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID REFERENCES notification.channels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES identity.users(id),
    event_type VARCHAR(100),
    enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE notification.deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES notification.subscriptions(id) ON DELETE CASCADE,
    status VARCHAR(30),
    payload JSONB,
    sent_at TIMESTAMPTZ,
    acknowledged_at TIMESTAMPTZ
);

CREATE INDEX idx_lineage_jobs_status ON lineage.lineage_jobs(status);
CREATE INDEX idx_events_type ON monitoring.events(event_type);
CREATE INDEX idx_metrics_name_time ON monitoring.metrics(metric_name, recorded_at);
CREATE INDEX idx_llm_usage_model ON monitoring.llm_usage(model_name);
