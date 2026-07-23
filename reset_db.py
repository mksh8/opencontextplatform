import os
import sys

# Add current directory to path so we can import from runtime and apps
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from runtime.db import engine
from sqlalchemy import text
from runtime.init_db import init_database_schemas, seed_super_tenant


with engine.begin() as conn:
    schemas_to_drop = [
        "identity", "workspace", "datasource", "connector", "provider",
        "catalog", "governance", "quality", "search", 
        "ai", "agent", "workflow", "context", "memory", "mcp",
        "lineage", "ontology", "monitoring", "notification",
        "billing", "marketplace", "plugin", "sdk",
        "system", "scheduler", "secrets", "common"
    ]
    for schema in schemas_to_drop:
        conn.execute(text(f"DROP SCHEMA IF EXISTS {schema} CASCADE;"))
        
    # Also drop Alembic's version tracking table so it runs migrations again
    conn.execute(text("DROP TABLE IF EXISTS alembic_version;"))


init_database_schemas(engine)
seed_super_tenant(engine)
print("Database reset successfully.")
