
-- ==========================================================
-- OpenContextPlatform Enterprise Metadata Schema - Phase 7
-- Enterprise Administration & Platform Operations
-- ==========================================================

CREATE SCHEMA IF NOT EXISTS system;
CREATE SCHEMA IF NOT EXISTS scheduler;
CREATE SCHEMA IF NOT EXISTS secrets;

-- ==========================================================
-- SYSTEM SETTINGS
-- ==========================================================

CREATE TABLE system.feature_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    flag_key VARCHAR(200) NOT NULL,
    flag_name VARCHAR(255) NOT NULL,
    description TEXT,
    enabled BOOLEAN DEFAULT FALSE,
    rollout_percentage NUMERIC(5,2) DEFAULT 100,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES identity.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workspace_id, flag_key)
);

CREATE TABLE system.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scope VARCHAR(30) NOT NULL, -- GLOBAL/TENANT/WORKSPACE
    tenant_id UUID REFERENCES identity.tenants(id),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    setting_key VARCHAR(255) NOT NULL,
    setting_value JSONB NOT NULL,
    is_secret BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES identity.users(id),
    updated_by UUID REFERENCES identity.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE system.configuration_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    profile_name VARCHAR(255) NOT NULL,
    description TEXT,
    configuration JSONB NOT NULL,
    version INTEGER DEFAULT 1,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workspace_id, profile_name)
);

-- ==========================================================
-- SECRET MANAGEMENT
-- ==========================================================

CREATE TABLE secrets.secret_stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    provider VARCHAR(100) NOT NULL,
    endpoint VARCHAR(500),
    configuration JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE secrets.secrets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    secret_store_id UUID REFERENCES secrets.secret_stores(id) ON DELETE CASCADE,
    secret_key VARCHAR(255) NOT NULL,
    encrypted_value TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    rotation_enabled BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(secret_store_id, secret_key)
);

CREATE TABLE secrets.secret_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    secret_id UUID REFERENCES secrets.secrets(id),
    user_id UUID REFERENCES identity.users(id),
    action VARCHAR(50),
    ip_address INET,
    accessed_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================================
-- JOB SCHEDULER
-- ==========================================================

CREATE TABLE scheduler.job_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    job_name VARCHAR(255) NOT NULL,
    job_type VARCHAR(100),
    cron_expression VARCHAR(100),
    configuration JSONB DEFAULT '{}'::jsonb,
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workspace_id, job_name)
);

CREATE TABLE scheduler.job_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_definition_id UUID REFERENCES scheduler.job_definitions(id) ON DELETE CASCADE,
    status VARCHAR(30),
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    execution_log TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE scheduler.background_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    task_name VARCHAR(255),
    task_type VARCHAR(100),
    status VARCHAR(30),
    priority SMALLINT DEFAULT 5,
    payload JSONB,
    result JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- ==========================================================
-- MAINTENANCE
-- ==========================================================

CREATE TABLE system.maintenance_windows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    title VARCHAR(255),
    description TEXT,
    starts_at TIMESTAMPTZ,
    ends_at TIMESTAMPTZ,
    maintenance_type VARCHAR(100),
    created_by UUID REFERENCES identity.users(id)
);

CREATE TABLE system.system_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_name VARCHAR(255),
    component_type VARCHAR(100),
    status VARCHAR(30),
    health_score NUMERIC(5,2),
    details JSONB,
    checked_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================================
-- INDEXES
-- ==========================================================

CREATE INDEX idx_feature_flag_key
ON system.feature_flags(flag_key);

CREATE INDEX idx_system_setting_key
ON system.system_settings(setting_key);

CREATE INDEX idx_scheduler_status
ON scheduler.job_runs(status);

CREATE INDEX idx_background_task_status
ON scheduler.background_tasks(status);

CREATE INDEX idx_secret_access_time
ON secrets.secret_access_logs(accessed_at);

CREATE INDEX idx_system_health_component
ON system.system_health(component_name);
