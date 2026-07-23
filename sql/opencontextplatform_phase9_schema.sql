-- Phase 9: Tenant Onboarding Triggers for RBAC Initialization

-- 1. Ensure all core permissions exist in the global catalog
INSERT INTO identity.permissions (id, code, resource, action, description)
VALUES 
    (gen_random_uuid(), 'context.read', 'context', 'read', 'Read Context'),
    (gen_random_uuid(), 'context.write', 'context', 'write', 'Write Context'),
    (gen_random_uuid(), 'context.delete', 'context', 'delete', 'Delete Context'),
    (gen_random_uuid(), 'agent.read', 'agent', 'read', 'Read Agent'),
    (gen_random_uuid(), 'agent.execute', 'agent', 'execute', 'Execute Agent'),
    (gen_random_uuid(), 'agent.manage', 'agent', 'manage', 'Manage Agent'),
    (gen_random_uuid(), 'connector.read', 'connector', 'read', 'Read Connector'),
    (gen_random_uuid(), 'connector.sync', 'connector', 'sync', 'Sync Connector'),
    (gen_random_uuid(), 'connector.manage', 'connector', 'manage', 'Manage Connector'),
    (gen_random_uuid(), 'billing.view', 'billing', 'view', 'View Billing'),
    (gen_random_uuid(), 'billing.manage', 'billing', 'manage', 'Manage Billing')
ON CONFLICT (code) DO NOTHING;

-- 2. Create the trigger function to seed roles
CREATE OR REPLACE FUNCTION identity.seed_default_tenant_roles()
RETURNS TRIGGER AS $$
DECLARE
    v_admin_id UUID;
    v_member_id UUID;
    v_viewer_id UUID;
BEGIN
    -- Create Admin Role
    INSERT INTO identity.roles (tenant_id, name, description)
    VALUES (NEW.id, 'admin', 'Administrator Role')
    RETURNING id INTO v_admin_id;

    -- Create Member Role
    INSERT INTO identity.roles (tenant_id, name, description)
    VALUES (NEW.id, 'member', 'Member Role')
    RETURNING id INTO v_member_id;

    -- Create Viewer Role
    INSERT INTO identity.roles (tenant_id, name, description)
    VALUES (NEW.id, 'viewer', 'Viewer Role')
    RETURNING id INTO v_viewer_id;

    -- Assign permissions to Admin (All permissions)
    INSERT INTO identity.role_permissions (role_id, permission_id)
    SELECT v_admin_id, id FROM identity.permissions;

    -- Assign permissions to Member
    INSERT INTO identity.role_permissions (role_id, permission_id)
    SELECT v_member_id, id FROM identity.permissions 
    WHERE code IN ('context.read', 'context.write', 'agent.read', 'agent.execute', 'connector.read', 'connector.sync');

    -- Assign permissions to Viewer
    INSERT INTO identity.role_permissions (role_id, permission_id)
    SELECT v_viewer_id, id FROM identity.permissions 
    WHERE code IN ('context.read', 'agent.read', 'connector.read');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Attach the trigger to the tenants table
DROP TRIGGER IF EXISTS trg_seed_default_tenant_roles ON identity.tenants;
CREATE TRIGGER trg_seed_default_tenant_roles
AFTER INSERT ON identity.tenants
FOR EACH ROW
EXECUTE FUNCTION identity.seed_default_tenant_roles();
