from .graph_ops import ArcadeDBGraphOperations
from .entity_node_ops import EntityNodeOperations
from .episode_node_ops import EpisodeNodeOperations
from .entity_edge_ops import EntityEdgeOperations
from .has_episode_edge_ops import HasEpisodeEdgeOperations
from .search_ops import SearchOperations

class ArcadeDBRepository:
    """
    Unified entrypoint for the Storage Layer.
    Aggregates all specific node and edge operations.
    """
    def __init__(self):
        self.graph = ArcadeDBGraphOperations()
        self.entity_nodes = EntityNodeOperations(self.graph)
        self.episode_nodes = EpisodeNodeOperations(self.graph)
        self.entity_edges = EntityEdgeOperations(self.graph)
        self.provenance_edges = HasEpisodeEdgeOperations(self.graph)
        self.search = SearchOperations(self.graph)

# Global singleton repository
db_repository = ArcadeDBRepository()
