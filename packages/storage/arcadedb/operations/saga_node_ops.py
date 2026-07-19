from .graph_ops import ArcadeDBGraphOperations

class SagaNodeOperations:
    """Operations for workflow/Saga nodes."""
    def __init__(self, db: ArcadeDBGraphOperations):
        self.db = db
