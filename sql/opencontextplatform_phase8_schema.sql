
-- ==========================================================
-- OpenContextPlatform Enterprise Metadata Schema - Phase 8
-- Database Infrastructure, Seed Data, Audit, RLS, Utilities
-- ==========================================================

CREATE SCHEMA IF NOT EXISTS common;

-- =========================
-- Lookup Tables
-- =========================

CREATE TABLE common.status_types(
    code VARCHAR(30) PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE common.environments(
    code VARCHAR(30) PRIMARY KEY,
    description TEXT
);

CREATE TABLE common.severity_levels(
    code VARCHAR(30) PRIMARY KEY,
    rank SMALLINT NOT NULL
);

-- =========================
-- Seed Data
-- =========================

INSERT INTO common.status_types(code,description) VALUES
('ACTIVE','Active'),
('INACTIVE','Inactive'),
('DRAFT','Draft'),
('PENDING','Pending'),
('FAILED','Failed'),
('DELETED','Soft deleted')
ON CONFLICT DO NOTHING;

INSERT INTO common.environments(code,description) VALUES
('DEV','Development'),
('TEST','Testing'),
('STAGE','Staging'),
('PROD','Production')
ON CONFLICT DO NOTHING;

INSERT INTO common.severity_levels(code,rank) VALUES
('INFO',1),
('LOW',2),
('MEDIUM',3),
('HIGH',4),
('CRITICAL',5)
ON CONFLICT DO NOTHING;

-- =========================
-- Audit Trigger
-- =========================

CREATE OR REPLACE FUNCTION common.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Example trigger
DO $$
BEGIN
IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='workspace'
      AND table_name='workspaces'
      AND column_name='updated_at'
) THEN
    DROP TRIGGER IF EXISTS trg_workspace_updated_at
        ON workspace.workspaces;

    CREATE TRIGGER trg_workspace_updated_at
    BEFORE UPDATE ON workspace.workspaces
    FOR EACH ROW
    EXECUTE FUNCTION common.set_updated_at();
END IF;
END $$;

-- =========================
-- Generic Audit Log
-- =========================

CREATE TABLE common.audit_events(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES identity.tenants(id),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    changed_by UUID REFERENCES identity.users(id),
    changed_at TIMESTAMPTZ DEFAULT now()
);

-- =========================
-- Materialized Views
-- =========================

CREATE MATERIALIZED VIEW IF NOT EXISTS common.workspace_summary AS
SELECT
    w.id AS workspace_id,
    w.name,
    COUNT(DISTINCT p.id) AS project_count,
    COUNT(DISTINCT d.id) AS datasource_count
FROM workspace.workspaces w
LEFT JOIN workspace.projects p
    ON p.workspace_id = w.id
LEFT JOIN datasource.datasources d
    ON d.workspace_id = w.id
GROUP BY w.id, w.name;

CREATE UNIQUE INDEX IF NOT EXISTS idx_workspace_summary
ON common.workspace_summary(workspace_id);

-- =========================
-- Helper Functions
-- =========================

CREATE OR REPLACE FUNCTION common.refresh_workspace_summary()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW common.workspace_summary;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- Row Level Security Example
-- =========================

ALTER TABLE workspace.workspaces ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS workspace_isolation
ON workspace.workspaces;

CREATE POLICY workspace_isolation
ON workspace.workspaces
USING (true);

-- Replace USING(true) with tenant/workspace-aware
-- session variables in production.

-- =========================
-- JSONB / Search Indexes
-- =========================

CREATE INDEX IF NOT EXISTS idx_datasource_metadata_gin
ON datasource.datasources
USING GIN(metadata);

CREATE INDEX IF NOT EXISTS idx_agent_metadata_gin
ON agent.agents
USING GIN(metadata);

CREATE INDEX IF NOT EXISTS idx_event_payload_gin
ON monitoring.events
USING GIN(payload);

-- =========================
-- Full Text Search Example
-- =========================

ALTER TABLE catalog.catalog_tables
ADD COLUMN IF NOT EXISTS search_vector tsvector;

CREATE INDEX IF NOT EXISTS idx_catalog_tables_fts
ON catalog.catalog_tables
USING GIN(search_vector);

-- =========================
-- Comments
-- =========================

COMMENT ON SCHEMA common IS
'Shared infrastructure objects, lookup tables, triggers, helper functions and audit.';
