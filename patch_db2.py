from runtime.db import engine
from sqlalchemy import text

with engine.begin() as conn:
    try:
        conn.execute(text("ALTER TABLE workspace.workspaces ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();"))
        print("Added updated_at to workspaces")
    except Exception as e:
        print(e)
