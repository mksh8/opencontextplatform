-- OpenContextPlatform Enterprise Metadata Schema - Phase 6
CREATE SCHEMA IF NOT EXISTS billing;
CREATE SCHEMA IF NOT EXISTS marketplace;
CREATE SCHEMA IF NOT EXISTS plugin;
CREATE SCHEMA IF NOT EXISTS sdk;

CREATE TABLE billing.plans(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 code VARCHAR(100) UNIQUE NOT NULL,
 name VARCHAR(255) NOT NULL,
 billing_period VARCHAR(20) NOT NULL,
 price NUMERIC(12,2) NOT NULL,
 currency VARCHAR(10) DEFAULT 'USD',
 features JSONB DEFAULT '{}'::jsonb,
 active BOOLEAN DEFAULT TRUE,
 created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE billing.subscriptions(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 tenant_id UUID REFERENCES identity.tenants(id),
 plan_id UUID REFERENCES billing.plans(id),
 status VARCHAR(30) DEFAULT 'ACTIVE',
 started_at TIMESTAMPTZ DEFAULT now(),
 expires_at TIMESTAMPTZ,
 auto_renew BOOLEAN DEFAULT TRUE);

CREATE TABLE billing.licenses(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 subscription_id UUID REFERENCES billing.subscriptions(id) ON DELETE CASCADE,
 license_key VARCHAR(255) UNIQUE NOT NULL,
 seat_limit INT,
 expires_at TIMESTAMPTZ);

CREATE TABLE billing.usage_metrics(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 tenant_id UUID REFERENCES identity.tenants(id),
 workspace_id UUID REFERENCES workspace.workspaces(id),
 metric_type VARCHAR(100),
 quantity NUMERIC(18,4),
 recorded_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE billing.invoices(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 subscription_id UUID REFERENCES billing.subscriptions(id),
 invoice_number VARCHAR(100) UNIQUE,
 amount NUMERIC(12,2),
 status VARCHAR(30),
 issued_at TIMESTAMPTZ);

CREATE TABLE marketplace.categories(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 name VARCHAR(255) UNIQUE,
 description TEXT);

CREATE TABLE marketplace.items(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 category_id UUID REFERENCES marketplace.categories(id),
 publisher_tenant_id UUID REFERENCES identity.tenants(id),
 name VARCHAR(255),
 item_type VARCHAR(100),
 version VARCHAR(50),
 metadata JSONB DEFAULT '{}'::jsonb);

CREATE TABLE marketplace.installations(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 item_id UUID REFERENCES marketplace.items(id),
 workspace_id UUID REFERENCES workspace.workspaces(id),
 installed_by UUID REFERENCES identity.users(id),
 installed_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE plugin.plugins(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 workspace_id UUID REFERENCES workspace.workspaces(id),
 name VARCHAR(255),
 plugin_type VARCHAR(100),
 version VARCHAR(50),
 configuration JSONB DEFAULT '{}'::jsonb);

CREATE TABLE plugin.plugin_versions(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 plugin_id UUID REFERENCES plugin.plugins(id) ON DELETE CASCADE,
 version VARCHAR(50),
 artifact_uri TEXT,
 released_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE plugin.plugin_dependencies(
 plugin_version_id UUID REFERENCES plugin.plugin_versions(id) ON DELETE CASCADE,
 depends_on_plugin_version_id UUID REFERENCES plugin.plugin_versions(id),
 PRIMARY KEY(plugin_version_id,depends_on_plugin_version_id));

CREATE TABLE sdk.sdk_releases(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 language VARCHAR(50),
 version VARCHAR(50),
 repository_url TEXT,
 documentation_url TEXT,
 released_at TIMESTAMPTZ DEFAULT now(),
 UNIQUE(language,version));

CREATE TABLE sdk.sdk_downloads(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 sdk_release_id UUID REFERENCES sdk.sdk_releases(id) ON DELETE CASCADE,
 downloaded_by UUID REFERENCES identity.users(id),
 downloaded_at TIMESTAMPTZ DEFAULT now(),
 client_ip INET);

CREATE INDEX idx_bill_sub_tenant ON billing.subscriptions(tenant_id);
CREATE INDEX idx_market_item_type ON marketplace.items(item_type);
CREATE INDEX idx_plugin_name ON plugin.plugins(name);
CREATE INDEX idx_sdk_release ON sdk.sdk_releases(language,version);
