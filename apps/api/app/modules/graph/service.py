from apps.api.app.modules.graph.schemas import GraphData, GraphNode, GraphEdge


class GraphService:
    def get_explorer_graph(self, org_id: str) -> GraphData:
        """Returns mock graph data for Explorer."""
        return GraphData(
            nodes=[
                GraphNode(id="n1", label="UserService.py", type="File", x=300, y=200, color="var(--accent-purple)"),
                GraphNode(id="n2", label="AuthService.py", type="File", x=150, y=100, color="var(--accent-blue)"),
                GraphNode(id="n3", label="UserController.py", type="File", x=450, y=100, color="var(--accent-green)"),
                GraphNode(id="n4", label="Database.py", type="File", x=150, y=300, color="var(--accent-yellow)"),
                GraphNode(id="n5", label="PR #452", type="PR", x=450, y=300, color="#ff7b72"),
            ],
            edges=[
                GraphEdge(source_id="n1", target_id="n2", label="imports"),
                GraphEdge(source_id="n1", target_id="n3", label="called_by"),
                GraphEdge(source_id="n1", target_id="n4", label="uses"),
                GraphEdge(source_id="n1", target_id="n5", label="modified_in"),
            ]
        )


graph_service = GraphService()
