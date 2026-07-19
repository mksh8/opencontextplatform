import httpx
import json
import os
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class ArcadeDBGraphOperations:
    """
    Core graph operations, connection management, and transaction execution for ArcadeDB.
    Replaces the monolithic ArcadeDBProvider core functions.
    """
    def __init__(
        self,
        host: str = "localhost",
        port: int = 2480,
        database: str = "opencontext",
        username: str = "root",
        password: str = "opencontext",
    ):
        self.host = host
        self.port = port
        self.database = database
        self.username = username
        self.password = password
        self.base_url = f"http://{host}:{port}/api/v1"
        self._connected = False
        self.client = httpx.Client(
            auth=(self.username, self.password),
            timeout=10.0
        )

    def connect(self) -> bool:
        """Establish connection to the ArcadeDB instance."""
        try:
            response = httpx.get(f"http://{self.host}:{self.port}/api/v1/ready")
            if response.status_code == 204:
                self._connected = True
                return True
        except httpx.RequestError:
            pass
        self._connected = False
        return False
        
    def execute_command(self, language: str, command: str, parameters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """Executes a command via ArcadeDB REST API."""
        if not self._connected:
            if not self.connect():
                logger.warning(f"ArcadeDB not connected. Mocking command: {command}")
                return []
                
        url = f"{self.base_url}/command/{self.database}"
        payload = {
            "language": language,
            "command": command
        }
        if parameters:
            payload["params"] = parameters
            
        try:
            response = self.client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            return data.get("result", [])
        except httpx.HTTPError as e:
            logger.error(f"ArcadeDB Error: {e}")
            if hasattr(e, 'response') and e.response:
                logger.error(f"Response: {e.response.text}")
            return []

    def create_schema(self):
        """Initializes the required Document and Edge types dynamically from ontology.json."""
        ontology_path = os.path.join(os.path.dirname(__file__), "..", "ontology.json")
        try:
            with open(ontology_path, "r") as f:
                ontology = json.load(f)
        except Exception as e:
            logger.error(f"Failed to load ontology.json: {e}")
            return
            
        commands = []
        
        # 1. Create Documents
        for doc in ontology.get("documents", []):
            name = doc["name"]
            commands.append(f"CREATE DOCUMENT TYPE {name} IF NOT EXISTS")
            for prop_name, prop_type in doc.get("properties", {}).items():
                commands.append(f"CREATE PROPERTY {name}.{prop_name} IF NOT EXISTS {prop_type}")
            for idx in doc.get("indexes", []):
                commands.append(idx)
                
        # 2. Create Vertices
        for vertex in ontology.get("vertices", []):
            name = vertex["name"]
            commands.append(f"CREATE VERTEX TYPE {name} IF NOT EXISTS")
            for prop_name, prop_type in vertex.get("properties", {}).items():
                commands.append(f"CREATE PROPERTY {name}.{prop_name} IF NOT EXISTS {prop_type}")
                
        # 3. Create Edges
        for edge_name in ontology.get("edges", []):
            commands.append(f"CREATE EDGE TYPE {edge_name} IF NOT EXISTS")
            
        # Execute dynamically generated DDL
        for cmd in commands:
            self.execute_command("sql", cmd)
