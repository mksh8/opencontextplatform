from .graph_ops import ArcadeDBGraphOperations

class NextEpisodeEdgeOperations:
    """Operations for temporal sequencing (NEXT_EPISODE)."""
    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db
