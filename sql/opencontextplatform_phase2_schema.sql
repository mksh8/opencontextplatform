
-- OpenContextPlatform Enterprise Metadata Schema - Phase 2
-- Governance, Catalog, Quality, Search

CREATE SCHEMA IF NOT EXISTS catalog;
CREATE SCHEMA IF NOT EXISTS governance;
CREATE SCHEMA IF NOT EXISTS quality;
CREATE SCHEMA IF NOT EXISTS search;

-- =========================
-- Catalog
-- =========================

CREATE TABLE catalog.catalogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(workspace_id,name)
);

CREATE TABLE catalog.catalog_databases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    catalog_id UUID NOT NULL REFERENCES catalog.catalogs(id) ON DELETE CASCADE,
    datasource_id UUID REFERENCES datasource.datasources(id),
    name VARCHAR(255) NOT NULL,
    engine VARCHAR(100),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(catalog_id,name)
);

CREATE TABLE catalog.catalog_schemas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    database_id UUID NOT NULL REFERENCES catalog.catalog_databases(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(database_id,name)
);

CREATE TABLE catalog.catalog_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schema_id UUID NOT NULL REFERENCES catalog.catalog_schemas(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    table_type VARCHAR(50),
    description TEXT,
    row_count BIGINT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(schema_id,name)
);

CREATE TABLE catalog.catalog_columns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_id UUID NOT NULL REFERENCES catalog.catalog_tables(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    data_type VARCHAR(100) NOT NULL,
    ordinal_position INTEGER,
    nullable BOOLEAN DEFAULT TRUE,
    is_primary_key BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(table_id,name)
);

CREATE TABLE catalog.catalog_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schema_id UUID NOT NULL REFERENCES catalog.catalog_schemas(id),
    name VARCHAR(255) NOT NULL,
    definition TEXT,
    UNIQUE(schema_id,name)
);

-- =========================
-- Governance
-- =========================

CREATE TABLE governance.business_glossaries(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE governance.glossary_terms(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    glossary_id UUID REFERENCES governance.business_glossaries(id) ON DELETE CASCADE,
    term VARCHAR(255) NOT NULL,
    definition TEXT,
    steward_user_id UUID REFERENCES identity.users(id),
    UNIQUE(glossary_id,term)
);

CREATE TABLE governance.tags(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20),
    UNIQUE(workspace_id,name)
);

CREATE TABLE governance.tag_assignments(
    tag_id UUID REFERENCES governance.tags(id) ON DELETE CASCADE,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    PRIMARY KEY(tag_id,entity_type,entity_id)
);

CREATE TABLE governance.classifications(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE governance.owners(
    entity_type VARCHAR(100),
    entity_id UUID,
    user_id UUID REFERENCES identity.users(id),
    ownership_type VARCHAR(50),
    PRIMARY KEY(entity_type,entity_id,user_id)
);

-- =========================
-- Data Quality
-- =========================

CREATE TABLE quality.quality_rules(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace.workspaces(id),
    name VARCHAR(255) NOT NULL,
    rule_type VARCHAR(100),
    configuration JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE quality.quality_checks(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id UUID REFERENCES quality.quality_rules(id),
    table_id UUID REFERENCES catalog.catalog_tables(id),
    status VARCHAR(30),
    score NUMERIC(5,2),
    executed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE quality.quality_issues(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    check_id UUID REFERENCES quality.quality_checks(id),
    severity VARCHAR(20),
    message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =========================
-- Search
-- =========================

CREATE TABLE search.saved_searches(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES identity.users(id),
    name VARCHAR(255),
    query TEXT NOT NULL,
    filters JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE search.search_history(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES identity.users(id),
    query TEXT,
    result_count INTEGER,
    searched_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_catalog_table_name ON catalog.catalog_tables(name);
CREATE INDEX idx_catalog_column_name ON catalog.catalog_columns(name);
CREATE INDEX idx_glossary_term ON governance.glossary_terms(term);
CREATE INDEX idx_quality_status ON quality.quality_checks(status);
