"""Entity node operations for inserting context and graph nodes in ArcadeDB."""

import json
from typing import Any, Dict
import uuid

from packages.storage.arcadedb.operations.graph_ops import ArcadeDBGraphOperations


class EntityNodeOperations:
    """Operations for manipulating entity nodes in ArcadeDB."""

    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db

    def insert_context_node(self, context_obj: Dict[str, Any]) -> str:
        """Inserts a ContextObject as a Document in ArcadeDB."""
        node_id = context_obj.get("id", "generated_id")
        metadata_str = json.dumps(context_obj.get("metadata", {}))

        self.db.execute_command(
            "sql",
            """
            INSERT INTO ContextNode 
            SET id = :id, tenant_id = :tenant_id, content = :content, provider = :provider, metadata_json = :metadata
        """,
            {
                "id": node_id,
                "tenant_id": context_obj.get("tenant_id", "default"),
                "content": context_obj.get("content", ""),
                "provider": context_obj.get("provider", ""),
                "metadata": metadata_str,
            },
        )
        return node_id

    def insert_graph_node(self, node: Dict[str, Any]) -> str:
        """Dynamically inserts a graph vertex and its edges."""
        node_type = node.get("type", "GenericNode")
        node_id = node.get("id", f"node_{uuid.uuid4().hex[:8]}")

        self.db.execute_command("sql", f"CREATE VERTEX TYPE {node_type} IF NOT EXISTS")
        self.db.execute_command("sql", f"CREATE PROPERTY {node_type}.id IF NOT EXISTS STRING")

        params = {"id": node_id}
        set_clauses = ["id = :id"]
        for k, v in node.items():
            if k not in ["type", "id", "edge_to", "edges"]:
                safe_k = k.replace("-", "_").replace(" ", "_")
                params[safe_k] = str(v)
                set_clauses.append(f"{safe_k} = :{safe_k}")

        set_sql = ", ".join(set_clauses)
        self.db.execute_command("sql", f"INSERT INTO {node_type} SET {set_sql}", params)

        edges = node.get("edges", [])
        if "edge_to" in node:
            edges.append(node["edge_to"])

        for edge in edges:
            target_id = edge.get("target")
            label = edge.get("label", "RELATED_TO")
            if target_id:
                self.db.execute_command("sql", f"CREATE EDGE TYPE {label} IF NOT EXISTS")
                self.db.execute_command(
                    "cypher",
                    f"""
                    MATCH (s), (t)
                    WHERE s.id = '{node_id}' AND t.id = '{target_id}'
                    CREATE (s)-[e:{label}]->(t)
                """,
                )
        return node_id

    def insert_fact(self, fact_obj: Dict[str, Any]) -> str:
        """Inserts a FactNode as a Vertex."""
        fact_id = fact_obj.get("id", f"fact_{uuid.uuid4().hex[:8]}")

        self.db.execute_command(
            "sql",
            """
            INSERT INTO FactNode 
            SET id = :id, tenant_id = :tenant_id, content = :content
        """,
            {
                "id": fact_id,
                "tenant_id": fact_obj.get("tenant_id", "default"),
                "content": fact_obj.get("content", ""),
            },
        )
        return fact_id
