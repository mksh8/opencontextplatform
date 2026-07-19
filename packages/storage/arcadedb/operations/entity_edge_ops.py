from .graph_ops import ArcadeDBGraphOperations

class EntityEdgeOperations:
    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db

    def create_edge(self, source_id: str, target_id: str, label: str):
        self.db.execute_command("sql", f"CREATE EDGE TYPE {label} IF NOT EXISTS")
        # Use Cypher to avoid SQL keyword parsing issues with 'in' and 'out'
        self.db.execute_command("cypher", f"""
            MATCH (s), (t)
            WHERE s.id = '{source_id}' AND t.id = '{target_id}'
            CREATE (s)-[e:{label}]->(t)
        """)
