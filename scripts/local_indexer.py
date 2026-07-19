import os
import sys
import argparse
import requests

API_URL = "http://127.0.0.1:8000/api/v1/graph/index-code"

def get_auth_token():
    """Fetches a JWT token for the admin user to use the API."""
    login_url = "http://127.0.0.1:8000/api/v1/auth/login"
    try:
        response = requests.post(login_url, json={"email": "admin@opencontext.com", "password": "password"})
        if response.status_code == 200:
            return response.json().get("access_token")
    except Exception as e:
        print(f"Failed to authenticate: {e}")
    return None

def index_directory(directory: str, token: str):
    """Recursively walks through a directory and sends Python files to the indexing API."""
    headers = {"Authorization": f"Bearer {token}"}
    
    total_files = 0
    success_count = 0
    
    for root, dirs, files in os.walk(directory):
        # Skip hidden directories and virtual environments
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('venv', '__pycache__', 'node_modules')]
        
        for file in files:
            if file.endswith(".py"):
                file_path = os.path.join(root, file)
                total_files += 1
                
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        source_code = f.read()
                        
                    payload = {
                        "file_name": os.path.relpath(file_path, start=directory),
                        "source_code": source_code
                    }
                    
                    res = requests.post(API_URL, json=payload, headers=headers)
                    if res.status_code == 200:
                        data = res.json()
                        print(f"✅ Indexed {file_path}: Created {data.get('nodes_created', 0)} nodes.")
                        success_count += 1
                    else:
                        print(f"❌ Failed {file_path}: {res.text}")
                except Exception as e:
                    print(f"⚠️ Error reading {file_path}: {e}")
                    
    print(f"\nIndexing complete! Successfully indexed {success_count} out of {total_files} Python files.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Index local codebase into OpenContextPlatform")
    parser.add_argument("directory", help="The local directory path to index", type=str)
    args = parser.parse_args()
    
    if not os.path.isdir(args.directory):
        print(f"Error: {args.directory} is not a valid directory.")
        sys.exit(1)
        
    print("Authenticating...")
    token = get_auth_token()
    
    if not token:
        print("Authentication failed. Cannot index files.")
        sys.exit(1)
        
    print(f"Starting indexing for directory: {args.directory}")
    index_directory(args.directory, token)
