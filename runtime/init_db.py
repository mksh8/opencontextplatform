import os
import uuid
from sqlalchemy import text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session
from sqlalchemy.inspection import inspect
from runtime.models.identity import Organization, Tenant, User, Role, RolePermission, Permission

def init_database_schemas(engine: Engine):
    """
    Runs the initial enterprise SQL migration scripts if the database
    has not been initialized yet.
    """
    inspector = inspect(engine)
    # Check if the primary table from phase 1 exists
    if inspector.has_table("organizations", schema="identity"):
        print("Database schemas already initialized. Skipping migration script execution.")
        return

    print("Initializing database with enterprise schemas...")
    
    # Path to the sql directory
    base_dir = os.path.dirname(os.path.dirname(__file__))
    sql_dir = os.path.join(base_dir, "sql")
    
    phases = [
        "opencontextplatform_phase1_schema.sql",
        "opencontextplatform_phase2_schema.sql",
        "opencontextplatform_phase3_schema.sql",
        "opencontextplatform_phase4_schema.sql",
        "opencontextplatform_phase5_schema.sql",
        "opencontextplatform_phase6_schema.sql",
        "opencontextplatform_phase7_schema.sql",
        "opencontextplatform_phase8_schema.sql",
        "opencontextplatform_phase9_schema.sql",
    ]
    
    with engine.begin() as conn:
        for phase_file in phases:
            file_path = os.path.join(sql_dir, phase_file)
            if os.path.exists(file_path):
                print(f"Executing {phase_file}...")
                with open(file_path, "r") as f:
                    sql_content = f.read()
                    conn.execute(text(sql_content))
            else:
                print(f"Warning: {file_path} not found.")
                
    print("Enterprise schemas initialized successfully.")

def seed_super_tenant(engine: Engine):
    """
    Seeds a super organization, super tenant, and super admin user on startup
    if the database is entirely empty.
    """
    with Session(engine) as session:
        # If any organization exists, skip
        if session.query(Organization).first():
            return
            
        print("\n" + "="*50)
        print("Initial Platform Setup Detected!")
        print("="*50)
        
        from apps.api.app.core.config import settings
        import bcrypt
        
        org_name = settings.SUPER_ORG_NAME
        tenant_name = settings.SUPER_TENANT_NAME
        admin_email = settings.SUPER_ADMIN_EMAIL
        admin_password = settings.SUPER_ADMIN_PASSWORD
        
        if not org_name:
            org_name = input("Enter super organization name (e.g. OpenContext): ").strip()
        if not tenant_name:
            tenant_name = input("Enter super tenant name (e.g. Default Tenant): ").strip()
        if not admin_email:
            admin_email = input("Enter super admin email (e.g. admin@opencontext.com): ").strip()
        if not admin_password:
            import getpass
            admin_password = getpass.getpass("Enter super admin password: ").strip()
            
        org_id = uuid.uuid4()
        tenant_id = uuid.UUID("00000000-0000-0000-0000-000000000001") # Use the valid hardcoded UUID to match dependencies mock for now
        
        org = Organization(id=org_id, code="super_org", name=org_name)
        tenant = Tenant(id=tenant_id, organization_id=org_id, code="super_tenant", name=tenant_name)
        
        session.add(org)
        session.add(tenant)
        session.commit() # The Postgres trigger will generate roles (admin, member, viewer) for this tenant!
        
        # Now fetch the newly generated admin role
        admin_role = session.query(Role).filter(Role.tenant_id == tenant_id, Role.name == 'admin').first()
        
        # Create Super Admin User
        hashed_password = bcrypt.hashpw(admin_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        super_admin = User(
            id=uuid.uuid4(),
            tenant_id=tenant_id,
            email=admin_email,
            password_hash=hashed_password,
            full_name="Super Administrator",
            role_name="admin" # Backwards compatibility
        )
        session.add(super_admin)
        
        # If we need global system permissions, we could map them here. 
        # By default, the admin role gets all permissions thanks to our trigger.
        
        session.commit()
        print("\nSuccess! Super Organization and Super Admin seeded.")
        print("="*50 + "\n")
