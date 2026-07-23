from .graph_ops import ArcadeDBGraphOperations

class EpisodicEdgeOperations:
    """Operations for semantic linking between episodes."""
    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db
