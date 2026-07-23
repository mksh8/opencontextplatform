"""Database patch script to add missing columns."""

from sqlalchemy import text
from runtime.db import engine


def patch_database():
    """Apply schema migration patch."""
    with engine.begin() as conn:
        try:
            conn.execute(
                text(
                    "ALTER TABLE workspace.workspaces "
                    "ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();"
                )
            )
            print("Added updated_at to workspaces")
        except Exception as exc:  # pylint: disable=broad-exception-caught
            print(exc)


if __name__ == "__main__":
    patch_database()
