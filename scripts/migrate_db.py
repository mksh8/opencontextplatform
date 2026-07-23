import sys
import os
from sqlalchemy import text

# Add project root to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from runtime.db import engine, Base
from runtime.models import *

def main():
    print("Running database migrations...")
    
    # 1. Create all missing tables (like audit_logs, roles, etc.)
    print("Creating missing tables...")
    Base.metadata.create_all(engine)
    
    # 2. Patch existing tables (like adding role_name to users)
    print("Patching existing tables...")
    with engine.connect() as conn:
        try:
            # Check if role_name exists
            conn.execute(text("SELECT role_name FROM users LIMIT 1"))
        except Exception:
            # Rollback the failed transaction first
            conn.rollback()
            try:
                print("Adding role_name column to users table...")
                conn.execute(text("ALTER TABLE users ADD COLUMN role_name VARCHAR DEFAULT 'viewer'"))
                conn.commit()
            except Exception as e:
                print(f"Error patching users table: {e}")
                
    print("Database migration complete!")

if __name__ == "__main__":
    main()
