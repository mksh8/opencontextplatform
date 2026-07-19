from .graph_ops import ArcadeDBGraphOperations

class CommunityEdgeOperations:
    """Operations for edges linking members to communities."""
    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db
