import os
import uuid
from sqlalchemy import text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session
from sqlalchemy.inspection import inspect
from runtime.models.identity import Organization, Tenant, User, Role, RoleAssignment, Permission

def init_database_schemas(engine):
    """
    Initializes the database schema using Alembic.
    """
    import os
    import sys
    from alembic.config import Config
    from alembic import command
    
    print("Initializing database using Alembic migrations...")
    
    # Locate alembic.ini
    alembic_cfg = Config("alembic.ini")
    
    try:
        # Programmatically run `alembic upgrade head`
        command.upgrade(alembic_cfg, "head")
        print("Database migrations applied successfully.")
    except Exception as e:
        print(f"Error applying migrations: {e}")
        import traceback
        traceback.print_exc()
        raise e

def seed_super_tenant(engine: Engine):
    """
    Seeds the global platform roles and a bootstrap Platform Owner if 
    environment variables are provided during startup.
    """
    with Session(engine) as session:
        # Seed Full Role Hierarchy
        roles_to_seed = [
            # Platform Level
            ("Platform Owner",              "Complete platform ownership"),
            ("Platform Admin",              "Manage organizations, platform settings, infrastructure"),
            ("Platform Operator",           "Daily operations, monitoring, upgrades"),
            ("Platform Support",            "Customer support with audited impersonation/support mode"),
            ("Platform Security Admin",     "Global security policies, SSO, audit, secrets"),
            ("Platform Billing Admin",      "Billing, subscriptions, invoices"),
            ("Platform Auditor",            "Read-only access to all audit logs"),
            ("Platform Marketplace Admin",  "Manage connectors, plugins, templates, SDKs"),
            # Organization Level
            ("Organization Owner",          "Complete ownership of an organization"),
            ("Organization Admin",          "Manage organization settings and users"),
            ("Organization Security Admin", "Organization security policies, SSO, SCIM"),
            ("Organization Billing Manager","Billing, invoices, subscription"),
            ("Organization Compliance Officer", "Audit and governance"),
            ("Organization Auditor",        "Read-only organization access"),
            # Tenant Level
            ("Tenant Owner",                "Owns one tenant"),
            ("Tenant Admin",                "Manages tenant operations"),
            ("Tenant Operator",             "Resource management and monitoring"),
            ("Tenant Security Admin",       "Tenant-level security and secrets"),
            ("Tenant Billing Viewer",       "View tenant resource usage"),
            # Workspace Level
            ("Workspace Owner",             "Full workspace ownership"),
            ("Workspace Admin",             "Day-to-day administration"),
            ("Project Admin",               "Manage projects within the workspace"),
            ("Team Lead",                   "Manage team members and approvals"),
            ("Viewer",                      "Read-only access"),
            # Engineering Roles
            ("AI Engineer",                 "Build AI agents, prompts, evaluations"),
            ("Data Engineer",               "Data ingestion, pipelines, catalogs"),
            ("ML Engineer",                 "Model lifecycle and training"),
            ("Prompt Engineer",             "Prompt engineering and testing"),
            ("Knowledge Engineer",          "Ontology and knowledge graph management"),
            ("Agent Developer",             "Build and deploy agents"),
            ("Workflow Developer",          "Design workflows and automations"),
            ("Integration Engineer",        "Manage connectors and APIs"),
            ("QA Engineer",                 "Test agents, workflows, and datasets"),
            # Business Roles
            ("Business Analyst",            "Analyze data and reports"),
            ("Product Manager",             "Manage product artifacts"),
            ("Data Steward",                "Metadata ownership and governance"),
            ("Domain Expert",               "Approve business glossary and ontology"),
            # Service / Non-human Roles
            ("Service Account",             "Machine-to-machine authentication"),
            ("API Client",                  "API integrations"),
            ("Automation Bot",              "Scheduled jobs and workflows"),
            ("MCP Server",                  "MCP server identity"),
            ("Agent Runtime",               "AI agent execution identity"),
        ]

        roles_dict = {}
        for role_name, role_desc in roles_to_seed:
            role = session.query(Role).filter_by(name=role_name).first()
            if not role:
                role = Role(name=role_name, description=role_desc)
                session.add(role)
            roles_dict[role_name] = role

        session.commit()

        
        # Check if any user exists
        if session.query(User).first():
            return
            
        import os
        from apps.api.app.core.config import settings
        import bcrypt
        
        admin_email = os.environ.get("BOOTSTRAP_ADMIN_EMAIL", settings.SUPER_ADMIN_EMAIL)
        admin_password = os.environ.get("BOOTSTRAP_ADMIN_PASSWORD", settings.SUPER_ADMIN_PASSWORD)
        admin_name = os.environ.get("BOOTSTRAP_ADMIN_NAME", "System Administrator")
        
        import sys
        import getpass
        
        if not (admin_email and admin_password):
            if sys.stdin.isatty():
                print("\n" + "="*50)
                print("OpenContextPlatform Setup Wizard")
                print("No bootstrap environment variables detected.")
                print("Please enter details to create the first Platform Owner.")
                print("="*50)
                admin_name = input("Platform Owner Name [System Administrator]: ") or "System Administrator"
                admin_email = input("Email: ")
                admin_password = getpass.getpass("Password: ")
                
                if not admin_email or not admin_password:
                    print("Email and password are required. Skipping bootstrap.\n")
                    return
            else:
                print("No bootstrap environment variables detected. Skipping bootstrap.\n")
                return
                
        if admin_email and admin_password:
            print("\n" + "="*50)
            print(f"Bootstrapping Platform Owner: {admin_email}")
            print("="*50)
            
            hashed_password = bcrypt.hashpw(admin_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            super_admin = User(
                id=uuid.uuid4(),
                email=admin_email,
                password_hash=hashed_password,
                full_name=admin_name,
                status="ACTIVE"
            )
            session.add(super_admin)
            session.flush() # get ID
            
            # Assign Platform Owner Role
            platform_owner_role = session.query(Role).filter_by(name="Platform Owner").first()
            if platform_owner_role:
                assignment = RoleAssignment(
                    user_id=super_admin.id,
                    role_id=platform_owner_role.id,
                    scope_type="PLATFORM"
                )
                session.add(assignment)
                
            session.commit()
            print("Success! Platform Owner bootstrapped via environment variables.")
            print("="*50 + "\n")
