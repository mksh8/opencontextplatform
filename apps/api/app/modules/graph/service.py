"""Graph service for topology exploration and AST code graph indexing."""

import math
from typing import Any, Dict, List
import uuid

from apps.api.app.modules.graph.schemas import GraphData, GraphEdge, GraphNode
from packages.intelligence.code_parser import PythonASTParser
from packages.storage.arcadedb.operations import ArcadeDBRepository


class GraphService:
    """Service layer for graph topology visualization and AST code indexing."""

    def __init__(self):
        self.parser = PythonASTParser()

    def get_explorer_graph(self, _org_id: str, db: ArcadeDBRepository) -> GraphData:
        """Fetches live graph data from ArcadeDB and calculates a simple layout."""
        files = db.graph.execute_command("sql", "SELECT * FROM FileNode LIMIT 50")
        classes = db.graph.execute_command("sql", "SELECT * FROM ClassNode LIMIT 100")
        functions = db.graph.execute_command("sql", "SELECT * FROM FunctionNode LIMIT 200")

        nodes: List[GraphNode] = []
        node_map = {}

        def add_node(n_id, label, n_type, color, group_idx, item_idx, total_in_group):
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
            x += (group_idx * 200)

            node = GraphNode(id=n_id, label=label, type=n_type, x=x, y=y, color=color)
            nodes.append(node)
            node_map[n_id] = node

        for i, f in enumerate(files):
            add_node(f["id"], f["name"], "File", "var(--accent-purple)", 0, i, len(files))

        for i, c in enumerate(classes):
            add_node(c["id"], c["name"], "Class", "var(--accent-blue)", 1, i, len(classes))

        for i, fn in enumerate(functions):
            add_node(fn["id"], fn["name"], "Function", "var(--accent-green)", 2, i, len(functions))

        edges_data = db.graph.execute_command(
            "cypher",
            "MATCH (s)-[e:CONTAINS]->(t) "
            "RETURN s.id AS source_id, t.id AS target_id, 'CONTAINS' AS label LIMIT 500"
        )

        edges: List[GraphEdge] = []
        for e in edges_data:
            source = e.get("source_id")
            target = e.get("target_id")
            label = e.get("label", "CONTAINS")

            if source and target and source in node_map and target in node_map:
                edges.append(GraphEdge(source_id=source, target_id=target, label=label))

        return GraphData(nodes=nodes, edges=edges)

    def index_file(
        self, file_name: str, source_code: str, db: ArcadeDBRepository
    ) -> Dict[str, Any]:
        """Parses the file and inserts the AST as a Graph in ArcadeDB."""
        ast_result = self.parser.parse_file(file_name, source_code)

        if "error" in ast_result:
            raise ValueError(f"Failed to parse file: {ast_result['error']}")

        file_id = f"file_{uuid.uuid4().hex[:8]}"
        db.graph.execute_command(
            "sql", "INSERT INTO FileNode SET id = :id, name = :name", {
                "id": file_id,
                "name": file_name
            }
        )

        nodes_created = 1
        edges_created = 0

        for cls in ast_result.get("classes", []):
            cls_id = f"cls_{uuid.uuid4().hex[:8]}"
            db.graph.execute_command(
                "sql",
                "INSERT INTO ClassNode SET id = :id, name = :name, docstring = :doc",
                {"id": cls_id, "name": cls["name"], "doc": cls["docstring"]}
            )
            nodes_created += 1

            db.entity_edges.create_edge(file_id, cls_id, "CONTAINS")
            edges_created += 1

            for method in cls.get("methods", []):
                m_id = f"fn_{uuid.uuid4().hex[:8]}"
                db.graph.execute_command(
                    "sql",
                    "INSERT INTO FunctionNode SET id = :id, name = :name, docstring = :doc",
                    {"id": m_id, "name": method["name"], "doc": method["docstring"]}
                )
                nodes_created += 1

                db.entity_edges.create_edge(cls_id, m_id, "CONTAINS")
                edges_created += 1

        for func in ast_result.get("functions", []):
            f_id = f"fn_{uuid.uuid4().hex[:8]}"
            db.graph.execute_command(
                "sql",
                "INSERT INTO FunctionNode SET id = :id, name = :name, docstring = :doc",
                {"id": f_id, "name": func["name"], "doc": func["docstring"]}
            )
            nodes_created += 1

            db.entity_edges.create_edge(file_id, f_id, "CONTAINS")
            edges_created += 1

        return {
            "status": "success",
            "file_node_id": file_id,
            "nodes_created": nodes_created,
            "edges_created": edges_created,
            "ast": ast_result
        }

    def get_context_subgraph(
        self, context_id: str, db: ArcadeDBRepository
    ) -> GraphData:
        """Fetches a subgraph for a specific ContextNode, including its Episodes and Facts."""
        episodes = db.graph.execute_command(
            "sql", "SELECT * FROM Episode WHERE source = :ctx", {"ctx": context_id}
        )

        if not episodes:
            ep_id = db.episode_nodes.insert_episode(
                {"source": context_id, "tenant_id": "demo"}
            )

            fact1_id = db.entity_nodes.insert_fact(
                {"id": f"f1_{uuid.uuid4().hex[:4]}", "content": f"Fact A from {context_id[:6]}"}
            )
            db.provenance_edges.link_fact_to_episode(fact1_id, ep_id)

            fact2_id = db.entity_nodes.insert_fact(
                {"id": f"f2_{uuid.uuid4().hex[:4]}", "content": f"Fact B from {context_id[:6]}"}
            )
            db.provenance_edges.link_fact_to_episode(fact2_id, ep_id)

            fact3_id = db.entity_nodes.insert_fact(
                {"id": f"f3_{uuid.uuid4().hex[:4]}", "content": f"Entity in {context_id[:6]}"}
            )
            db.provenance_edges.link_fact_to_episode(fact3_id, ep_id)

            episodes = db.graph.execute_command(
                "sql", "SELECT * FROM Episode WHERE source = :ctx", {"ctx": context_id}
            )

        nodes: List[GraphNode] = []
        edges: List[GraphEdge] = []

        if not episodes:
            return GraphData(nodes=[], edges=[])

        ep = episodes[0]
        ep_id_str = ep["id"]

        nodes.append(
            GraphNode(
                id=ep_id_str,
                label="Episode",
                type="Episode",
                x=400,
                y=300,
                color="var(--accent-purple)",
            )
        )

        nodes.append(
            GraphNode(
                id=context_id,
                label="Context Document",
                type="Document",
                x=400,
                y=100,
                color="var(--accent-green)",
            )
        )
        edges.append(GraphEdge(source_id=ep_id_str, target_id=context_id, label="SOURCE_DOC"))

        edges_data = db.graph.execute_command(
            "cypher",
            "MATCH (s)-[e:HAS_PROVENANCE]->(t) RETURN s.id AS source_id, t.id AS target_id"
        )
        fact_ids = [e.get("source_id") for e in edges_data if e.get("target_id") == ep_id_str]

        radius = 150
        for i, f_id in enumerate(fact_ids):
            facts = db.graph.execute_command(
                "sql", "SELECT * FROM FactNode WHERE id = :fid", {"fid": f_id}
            )
            if facts:
                content = facts[0].get("content", f"Fact {i}")
                angle = (i / max(len(fact_ids), 1)) * 2 * math.pi
                x = 400 + radius * math.cos(angle)
                y = 300 + radius * math.sin(angle)

                nodes.append(
                    GraphNode(
                        id=f_id,
                        label=content[:20],
                        type="Fact",
                        x=x,
                        y=y,
                        color="var(--accent-blue)",
                    )
                )
                edges.append(
                    GraphEdge(source_id=f_id, target_id=ep_id_str, label="PROVENANCE")
                )

        return GraphData(nodes=nodes, edges=edges)


graph_service = GraphService()
