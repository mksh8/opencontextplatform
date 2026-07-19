import os
import sys

# Add project root to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from packages.storage.arcadedb.operations import db_repository

def main():
    print("Initializing ArcadeDB OpenContext Schema...")
    
    print("Connecting to ArcadeDB...")
    if not db_repository.graph.connect():
        print("Failed to connect to ArcadeDB. Ensure it is running on localhost:2480")
        sys.exit(1)
        
    print("Creating OpenContext schema...")
    db_repository.graph.create_schema()
        
    print("Connected successfully. Creating database if it doesn't exist...")
    try:
        import httpx
        # Send create database command to the server endpoint
        res = httpx.post(
            f"http://localhost:2480/api/v1/server",
            auth=("root", "opencontext"),
            json={"command": "create database opencontext"}
        )
        if res.status_code == 200:
            print("Database created or already exists.")
        else:
            print(f"Server response: {res.text}")
    except Exception as e:
        print(f"Error creating database: {e}")

    print("Creating schema...")
    provider.create_schema()
    print("Schema initialized successfully!")

if __name__ == "__main__":
    main()
