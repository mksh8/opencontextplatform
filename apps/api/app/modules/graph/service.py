import uuid
from typing import Dict, Any
from apps.api.app.modules.graph.schemas import GraphData, GraphNode, GraphEdge
from runtime.arcadedb_provider import ArcadeDBProvider
from packages.intelligence.code_parser import PythonASTParser

class GraphService:
    def __init__(self):
        self.parser = PythonASTParser()
        
    def get_explorer_graph(self, org_id: str, db: ArcadeDBProvider) -> GraphData:
        """Fetches live graph data from ArcadeDB and calculates a simple layout."""
        
        # 1. Fetch all Nodes
        # For simplicity, we just fetch all FileNode, ClassNode, FunctionNodes. 
        # In production, we'd limit this or filter by tenant_id.
        files = db.execute_command("sql", "SELECT * FROM FileNode LIMIT 50")
        classes = db.execute_command("sql", "SELECT * FROM ClassNode LIMIT 100")
        functions = db.execute_command("sql", "SELECT * FROM FunctionNode LIMIT 200")
        
        nodes: list[GraphNode] = []
        node_map = {}
        
        # Helper to register a node with dynamic coordinates
        def add_node(n_id, label, n_type, color, group_idx, item_idx, total_in_group):
            # Simple circular/hierarchical layout logic
            import math
            
            # Base positions by type
            type_bases = {
                "File": (300, 200),
                "Class": (300, 100),
                "Function": (300, 300)
            }
            base_x, base_y = type_bases.get(n_type, (300, 200))
            
            radius = 150
            angle = (item_idx / max(total_in_group, 1)) * 2 * math.pi
            
            x = base_x + radius * math.cos(angle)
            y = base_y + radius * math.sin(angle)
            
            # Spread out groups horizontally slightly to avoid overlapping completely
            x += (group_idx * 200)
            
            node = GraphNode(id=n_id, label=label, type=n_type, x=x, y=y, color=color)
            nodes.append(node)
            node_map[n_id] = node
            
        # Register files
        for i, f in enumerate(files):
            add_node(f["id"], f["name"], "File", "var(--accent-purple)", 0, i, len(files))
            
        # Register classes
        for i, c in enumerate(classes):
            add_node(c["id"], c["name"], "Class", "var(--accent-blue)", 1, i, len(classes))
            
        # Register functions
        for i, fn in enumerate(functions):
            add_node(fn["id"], fn["name"], "Function", "var(--accent-green)", 2, i, len(functions))
            
        # 2. Fetch Edges
        # ArcadeDB edge format: SELECT @out.id AS source, @in.id AS target, @class AS label FROM E
        edges_data = db.execute_command("sql", "SELECT @out.id AS source_id, @in.id AS target_id, @class AS label FROM CONTAINS LIMIT 500")
        
        edges: list[GraphEdge] = []
        for e in edges_data:
            # The edge out/in returns full RID or the underlying object. We need to extract the custom 'id' property.
            # However, `out.id` gives the property 'id' from the vertex.
            source = e.get("source_id")
            target = e.get("target_id")
            label = e.get("label", "CONTAINS")
            
            # Basic validation
            if source and target and source in node_map and target in node_map:
                edges.append(GraphEdge(source_id=source, target_id=target, label=label))
                
        return GraphData(nodes=nodes, edges=edges)

    def index_file(self, file_name: str, source_code: str, db: ArcadeDBProvider) -> Dict[str, Any]:
        """Parses the file and inserts the AST as a Graph in ArcadeDB."""
        ast_result = self.parser.parse_file(file_name, source_code)
        
        if "error" in ast_result:
            raise ValueError(f"Failed to parse file: {ast_result['error']}")
            
        # 1. Create FileNode
        file_id = f"file_{uuid.uuid4().hex[:8]}"
        db.execute_command("sql", "INSERT INTO FileNode SET id = :id, name = :name", {
            "id": file_id,
            "name": file_name
        })
        
        nodes_created = 1
        edges_created = 0
        
        # 2. Process Classes
        for cls in ast_result.get("classes", []):
            cls_id = f"cls_{uuid.uuid4().hex[:8]}"
            db.execute_command("sql", "INSERT INTO ClassNode SET id = :id, name = :name, docstring = :doc", {
                "id": cls_id,
                "name": cls["name"],
                "doc": cls["docstring"]
            })
            nodes_created += 1
            
            # File CONTAINS Class
            db.execute_command("sql", "CREATE EDGE CONTAINS FROM (SELECT FROM FileNode WHERE id = :f_id) TO (SELECT FROM ClassNode WHERE id = :c_id)", {
                "f_id": file_id, "c_id": cls_id
            })
            edges_created += 1
            
            # Process Methods
            for method in cls.get("methods", []):
                m_id = f"fn_{uuid.uuid4().hex[:8]}"
                db.execute_command("sql", "INSERT INTO FunctionNode SET id = :id, name = :name, docstring = :doc", {
                    "id": m_id,
                    "name": method["name"],
                    "doc": method["docstring"]
                })
                nodes_created += 1
                
                # Class CONTAINS Method
                db.execute_command("sql", "CREATE EDGE CONTAINS FROM (SELECT FROM ClassNode WHERE id = :c_id) TO (SELECT FROM FunctionNode WHERE id = :m_id)", {
                    "c_id": cls_id, "m_id": m_id
                })
                edges_created += 1
                
        # 3. Process Top-level Functions
        for func in ast_result.get("functions", []):
            f_id = f"fn_{uuid.uuid4().hex[:8]}"
            db.execute_command("sql", "INSERT INTO FunctionNode SET id = :id, name = :name, docstring = :doc", {
                "id": f_id,
                "name": func["name"],
                "doc": func["docstring"]
            })
            nodes_created += 1
            
            # File CONTAINS Function
            db.execute_command("sql", "CREATE EDGE CONTAINS FROM (SELECT FROM FileNode WHERE id = :file_id) TO (SELECT FROM FunctionNode WHERE id = :f_id)", {
                "file_id": file_id, "f_id": f_id
            })
            edges_created += 1
            
        return {
            "status": "success",
            "file_node_id": file_id,
            "nodes_created": nodes_created,
            "edges_created": edges_created,
            "ast": ast_result
        }

    def get_context_subgraph(self, context_id: str, db: ArcadeDBProvider) -> GraphData:
        """Fetches a subgraph for a specific ContextNode, including its Episodes and Facts."""
        import math
        
        episodes = db.execute_command("sql", "SELECT * FROM Episode WHERE source = :ctx", {"ctx": context_id})
        
        if not episodes:
            # Simulate background fact-extraction pipeline
            ep_id = db.insert_episode({"source": context_id, "tenant_id": "demo"})
            db.insert_fact({"id": f"f1_{uuid.uuid4().hex[:4]}", "content": f"Fact A from {context_id[:6]}"}, ep_id)
            db.insert_fact({"id": f"f2_{uuid.uuid4().hex[:4]}", "content": f"Fact B from {context_id[:6]}"}, ep_id)
            db.insert_fact({"id": f"f3_{uuid.uuid4().hex[:4]}", "content": f"Entity found in {context_id[:6]}"}, ep_id)
            episodes = db.execute_command("sql", "SELECT * FROM Episode WHERE source = :ctx", {"ctx": context_id})
            
        nodes: list[GraphNode] = []
        edges: list[GraphEdge] = []
        
        if not episodes:
            return GraphData(nodes=[], edges=[])
            
        ep = episodes[0]
        ep_id_str = ep["id"]
        
        # Add Episode Node
        nodes.append(GraphNode(id=ep_id_str, label=f"Episode", type="Episode", x=400, y=300, color="var(--accent-purple)"))
        
        # Add Context Document Node
        nodes.append(GraphNode(id=context_id, label=f"Context Document", type="Document", x=400, y=100, color="var(--accent-green)"))
        edges.append(GraphEdge(source_id=ep_id_str, target_id=context_id, label="SOURCE_DOC"))
        
        # Get FactNodes linked to this Episode
        edges_data = db.execute_command("sql", "SELECT out.id AS source_id, in.id AS target_id FROM HAS_PROVENANCE")
        fact_ids = [e.get("source_id") for e in edges_data if e.get("target_id") == ep_id_str]
        
        radius = 150
        for i, f_id in enumerate(fact_ids):
            facts = db.execute_command("sql", "SELECT * FROM FactNode WHERE id = :fid", {"fid": f_id})
            if facts:
                content = facts[0].get("content", f"Fact {i}")
                angle = (i / max(len(fact_ids), 1)) * 2 * math.pi
                x = 400 + radius * math.cos(angle)
                y = 300 + radius * math.sin(angle)
                
                nodes.append(GraphNode(id=f_id, label=content[:20], type="Fact", x=x, y=y, color="var(--accent-blue)"))
                edges.append(GraphEdge(source_id=f_id, target_id=ep_id_str, label="PROVENANCE"))
                
        return GraphData(nodes=nodes, edges=edges)

graph_service = GraphService()
