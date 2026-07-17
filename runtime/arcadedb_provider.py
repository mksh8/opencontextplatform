import json
import uuid
from typing import Dict, Any, List
import httpx

class ArcadeDBProvider:
    """
    ArcadeDB Connection Provider for OpenContextPlatform.
    Handles connections to ArcadeDB for relational, vector, document, and graph queries using the REST API.
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
            # Query server ready status
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
            # Try to connect once
            if not self.connect():
                # For development/mocking purposes if ArcadeDB isn't running
                print(f"[WARN] ArcadeDB not connected. Mocking command: {command}")
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
            print(f"ArcadeDB Error: {e}")
            if hasattr(e, 'response') and e.response:
                print(f"Response: {e.response.text}")
            return []

    def create_schema(self):
        """Initializes the required Document and Edge types based on RFC 0011."""
        commands = [
            "CREATE DOCUMENT TYPE User IF NOT EXISTS",
            "CREATE PROPERTY User.id IF NOT EXISTS STRING",
            "CREATE PROPERTY User.email IF NOT EXISTS STRING",
            "CREATE PROPERTY User.password_hash IF NOT EXISTS STRING",
            "CREATE INDEX IF NOT EXISTS ON User (email) UNIQUE",
            
            "CREATE DOCUMENT TYPE Tenant IF NOT EXISTS",
            "CREATE PROPERTY Tenant.id IF NOT EXISTS STRING",
            
            "CREATE DOCUMENT TYPE ConnectorConfig IF NOT EXISTS",
            "CREATE PROPERTY ConnectorConfig.id IF NOT EXISTS STRING",
            "CREATE PROPERTY ConnectorConfig.tenant_id IF NOT EXISTS STRING",
            "CREATE PROPERTY ConnectorConfig.name IF NOT EXISTS STRING",
            
            "CREATE DOCUMENT TYPE ContextNode IF NOT EXISTS",
            "CREATE PROPERTY ContextNode.id IF NOT EXISTS STRING",
            "CREATE PROPERTY ContextNode.tenant_id IF NOT EXISTS STRING",
            # VECTOR property requires specific ArcadeDB syntax, skipping for now
            
            # Phase 5 Graph Schema
            "CREATE VERTEX TYPE FileNode IF NOT EXISTS",
            "CREATE PROPERTY FileNode.id IF NOT EXISTS STRING",
            "CREATE PROPERTY FileNode.name IF NOT EXISTS STRING",
            
            "CREATE VERTEX TYPE ClassNode IF NOT EXISTS",
            "CREATE PROPERTY ClassNode.id IF NOT EXISTS STRING",
            "CREATE PROPERTY ClassNode.name IF NOT EXISTS STRING",
            "CREATE PROPERTY ClassNode.docstring IF NOT EXISTS STRING",
            
            "CREATE VERTEX TYPE FunctionNode IF NOT EXISTS",
            "CREATE PROPERTY FunctionNode.id IF NOT EXISTS STRING",
            "CREATE PROPERTY FunctionNode.name IF NOT EXISTS STRING",
            "CREATE PROPERTY FunctionNode.docstring IF NOT EXISTS STRING",
            
            # Phase 6 Context Substrate Schema (Episodes and Facts)
            "CREATE VERTEX TYPE Episode IF NOT EXISTS",
            "CREATE PROPERTY Episode.id IF NOT EXISTS STRING",
            "CREATE PROPERTY Episode.tenant_id IF NOT EXISTS STRING",
            "CREATE PROPERTY Episode.source IF NOT EXISTS STRING",
            
            "CREATE VERTEX TYPE FactNode IF NOT EXISTS",
            "CREATE PROPERTY FactNode.id IF NOT EXISTS STRING",
            "CREATE PROPERTY FactNode.tenant_id IF NOT EXISTS STRING",
            "CREATE PROPERTY FactNode.content IF NOT EXISTS STRING",
            
            "CREATE EDGE TYPE HAS_PROVENANCE IF NOT EXISTS",
            "CREATE EDGE TYPE CONTAINS IF NOT EXISTS",
            "CREATE EDGE TYPE CALLS IF NOT EXISTS"
        ]
        
        for cmd in commands:
            self.execute_command("sql", cmd)

    def insert_episode(self, episode_obj: Dict[str, Any]) -> str:
        """Inserts an Episode as a Vertex in ArcadeDB."""
        self.create_schema() # Temporarily ensure schema exists
        ep_id = episode_obj.get("id", f"ep_{uuid.uuid4().hex[:8]}")
        self.execute_command("sql", """
            INSERT INTO Episode 
            SET id = :id, tenant_id = :tenant_id, source = :source
        """, {
            "id": ep_id,
            "tenant_id": episode_obj.get("tenant_id", "default"),
            "source": episode_obj.get("source", "unknown")
        })
        return ep_id

    def insert_fact(self, fact_obj: Dict[str, Any], episode_id: str) -> str:
        """Inserts a FactNode as a Vertex and links it to an Episode."""
        fact_id = fact_obj.get("id", f"fact_{uuid.uuid4().hex[:8]}")
        
        # 1. Insert the FactNode
        self.execute_command("sql", """
            INSERT INTO FactNode 
            SET id = :id, tenant_id = :tenant_id, content = :content
        """, {
            "id": fact_id,
            "tenant_id": fact_obj.get("tenant_id", "default"),
            "content": fact_obj.get("content", "")
        })
        
        # 2. Link it to the Episode via HAS_PROVENANCE
        if episode_id:
            self.execute_command("sql", """
                CREATE EDGE HAS_PROVENANCE 
                FROM (SELECT FROM FactNode WHERE id = :fact_id) 
                TO (SELECT FROM Episode WHERE id = :ep_id)
            """, {
                "fact_id": fact_id,
                "ep_id": episode_id
            })
            
        return fact_id

    def insert_context_node(self, context_obj: Dict[str, Any]) -> str:
        """Inserts a ContextObject as a Document in ArcadeDB."""
        node_id = context_obj.get("id", "generated_id")
        
        # Serialize metadata to JSON string for storage
        metadata_str = json.dumps(context_obj.get("metadata", {}))
        
        self.execute_command("sql", """
            INSERT INTO ContextNode 
            SET id = :id, tenant_id = :tenant_id, content = :content, provider = :provider, metadata_json = :metadata
        """, {
            "id": node_id,
            "tenant_id": context_obj.get("tenant_id", "default"),
            "content": context_obj.get("content", ""),
            "provider": context_obj.get("provider", ""),
            "metadata": metadata_str
        })
        
        return node_id

    def hybrid_search(
        self,
        tenant_id: str,
        query_embedding: List[float],
        limit: int = 10,
    ) -> List[Dict[str, Any]]:
        """Performs a vector search combined with graph traversal (Hybrid Search)."""
        # This will be implemented fully once embeddings are wired
        return []
