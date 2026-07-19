from .graph_ops import ArcadeDBGraphOperations

class HasEpisodeEdgeOperations:
    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db

    def link_fact_to_episode(self, fact_id: str, episode_id: str):
        """Links a FactNode to its source Episode via HAS_PROVENANCE."""
        self.db.execute_command("cypher", f"""
            MATCH (f:FactNode), (e:Episode)
            WHERE f.id = '{fact_id}' AND e.id = '{episode_id}'
            CREATE (f)-[:HAS_PROVENANCE]->(e)
        """)
