import os
import sys

# Add project root to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from runtime.arcadedb_provider import ArcadeDBProvider

def main():
    print("Initializing ArcadeDB OpenContext Schema...")
    
    provider = ArcadeDBProvider(
        host="localhost",
        port=2480,
        database="opencontext",
        username="root",
        password="opencontext" # from docker-compose
    )
    
    if not provider.connect():
        print("ERROR: Cannot connect to ArcadeDB. Is it running via docker-compose?")
        sys.exit(1)
        
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
