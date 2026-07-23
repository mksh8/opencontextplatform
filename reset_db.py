"""Database reset helper script."""

import os
import sys

from sqlalchemy import text

# Add current directory to path so we can import from runtime and apps
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from runtime.db import engine  # pylint: disable=wrong-import-position
from runtime.init_db import init_database_schemas, seed_super_tenant  # pylint: disable=wrong-import-position


def reset_database():
    """Drop all database schemas and re-initialize."""
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


if __name__ == "__main__":
    reset_database()
