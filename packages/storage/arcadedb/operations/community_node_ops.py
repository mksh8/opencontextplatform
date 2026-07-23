from .graph_ops import ArcadeDBGraphOperations

class CommunityNodeOperations:
    """Operations for clustered community nodes for hierarchical RAG."""
    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db
