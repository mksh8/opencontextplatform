-- OpenContextPlatform Enterprise Metadata Schema (Phase 1)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS identity;
CREATE SCHEMA IF NOT EXISTS workspace;
CREATE SCHEMA IF NOT EXISTS datasource;
CREATE SCHEMA IF NOT EXISTS connector;
CREATE SCHEMA IF NOT EXISTS provider;

CREATE TABLE identity.organizations(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 code VARCHAR(100) UNIQUE NOT NULL,
 name VARCHAR(255) NOT NULL,
 display_name VARCHAR(255),
 description TEXT,
 website VARCHAR(255),
 industry VARCHAR(100),
 status VARCHAR(30) DEFAULT 'ACTIVE',
 metadata JSONB DEFAULT '{}'::jsonb,
 created_at TIMESTAMPTZ DEFAULT now(),
 updated_at TIMESTAMPTZ DEFAULT now(),
 deleted_at TIMESTAMPTZ);

CREATE TABLE identity.tenants(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 organization_id UUID NOT NULL REFERENCES identity.organizations(id),
 code VARCHAR(100) NOT NULL,
 name VARCHAR(255) NOT NULL,
 status VARCHAR(30) DEFAULT 'ACTIVE',
 metadata JSONB DEFAULT '{}'::jsonb,
 created_at TIMESTAMPTZ DEFAULT now(),
 updated_at TIMESTAMPTZ DEFAULT now(),
 UNIQUE(organization_id,code));

CREATE TABLE identity.users(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 tenant_id UUID NOT NULL REFERENCES identity.tenants(id),
 email VARCHAR(320) NOT NULL,
 password_hash TEXT NOT NULL,
 first_name VARCHAR(100),
 last_name VARCHAR(100),
 display_name VARCHAR(255),
 full_name VARCHAR(255),
 role_name VARCHAR(100) DEFAULT 'viewer',
 status VARCHAR(30) DEFAULT 'ACTIVE',
 metadata JSONB DEFAULT '{}'::jsonb,
 created_at TIMESTAMPTZ DEFAULT now(),
 updated_at TIMESTAMPTZ DEFAULT now(),
 UNIQUE(tenant_id,email));

CREATE TABLE identity.roles(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 tenant_id UUID NOT NULL REFERENCES identity.tenants(id),
 name VARCHAR(100) NOT NULL,
 description TEXT,
 UNIQUE(tenant_id,name));

CREATE TABLE identity.permissions(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 code VARCHAR(200) UNIQUE NOT NULL,
 resource VARCHAR(100) NOT NULL,
 action VARCHAR(100) NOT NULL,
 description TEXT);

CREATE TABLE identity.role_permissions(
 role_id UUID REFERENCES identity.roles(id) ON DELETE CASCADE,
 permission_id UUID REFERENCES identity.permissions(id) ON DELETE CASCADE,
 PRIMARY KEY(role_id,permission_id));

CREATE TABLE identity.user_roles(
 user_id UUID REFERENCES identity.users(id) ON DELETE CASCADE,
 role_id UUID REFERENCES identity.roles(id) ON DELETE CASCADE,
 PRIMARY KEY(user_id,role_id));

CREATE TABLE workspace.workspaces(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 tenant_id UUID NOT NULL REFERENCES identity.tenants(id),
 name VARCHAR(255) NOT NULL,
 slug VARCHAR(255) NOT NULL,
 description TEXT,
 metadata JSONB DEFAULT '{}'::jsonb,
 created_at TIMESTAMPTZ DEFAULT now(),
 updated_at TIMESTAMPTZ DEFAULT now(),
 UNIQUE(tenant_id,slug));

CREATE TABLE workspace.projects(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id),
 name VARCHAR(255) NOT NULL,
 description TEXT,
 status VARCHAR(30) DEFAULT 'ACTIVE',
 metadata JSONB DEFAULT '{}'::jsonb,
 created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE datasource.datasource_types(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 code VARCHAR(100) UNIQUE NOT NULL,
 name VARCHAR(255) NOT NULL,
 category VARCHAR(100),
 supports_catalog BOOLEAN DEFAULT TRUE,
 supports_lineage BOOLEAN DEFAULT FALSE);

CREATE TABLE datasource.datasources(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id),
 datasource_type_id UUID NOT NULL REFERENCES datasource.datasource_types(id),
 name VARCHAR(255) NOT NULL,
 host VARCHAR(255),
 port INT,
 database_name VARCHAR(255),
 status VARCHAR(30) DEFAULT 'ACTIVE',
 metadata JSONB DEFAULT '{}'::jsonb,
 created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE connector.connector_types(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 code VARCHAR(100) UNIQUE NOT NULL,
 name VARCHAR(255) NOT NULL);

CREATE TABLE connector.connector_configs(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id),
 connector_type_id UUID NOT NULL REFERENCES connector.connector_types(id),
 name VARCHAR(255) NOT NULL,
 configuration JSONB NOT NULL,
 status VARCHAR(30) DEFAULT 'ACTIVE',
 created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE provider.provider_types(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 code VARCHAR(100) UNIQUE NOT NULL,
 name VARCHAR(255) NOT NULL);

CREATE TABLE provider.provider_configs(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id),
 provider_type_id UUID NOT NULL REFERENCES provider.provider_types(id),
 name VARCHAR(255) NOT NULL,
 endpoint VARCHAR(500),
 encrypted_api_key TEXT,
 configuration JSONB DEFAULT '{}'::jsonb,
 status VARCHAR(30) DEFAULT 'ACTIVE',
 created_at TIMESTAMPTZ DEFAULT now());

CREATE INDEX idx_users_email ON identity.users(email);
CREATE INDEX idx_workspace_tenant ON workspace.workspaces(tenant_id);
CREATE INDEX idx_datasource_workspace ON datasource.datasources(workspace_id);
CREATE INDEX idx_provider_workspace ON provider.provider_configs(workspace_id);
