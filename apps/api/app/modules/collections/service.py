"""Collections service for retrieving memory collections."""

from typing import List

from apps.api.app.modules.collections.schemas import CollectionItem


class CollectionService:
    """Service layer for memory collections."""

    def get_collections(self, _org_id: str) -> List[CollectionItem]:
        """Returns mock semantic memory collections."""
        return [
            CollectionItem(
                id="col_1",
                icon="💬",
                title="User prefers detailed explanations",
                description=(
                    "User mentioned they prefer comprehensive explanations "
                    "with practical examples over brief answers."
                ),
                tag="Documentation",
                tag_color="var(--accent-blue)",
                tag_bg="rgba(59, 130, 246, 0.1)",
                time_ago="2 mins ago",
            ),
            CollectionItem(
                id="col_2",
                icon="🛡️",
                title="API authentication implementation",
                description=(
                    "Decided to use JWT tokens with refresh token rotation for "
                    "better security."
                ),
                tag="Engineering",
                tag_color="var(--accent-purple)",
                tag_bg="rgba(139, 92, 246, 0.1)",
                time_ago="1h ago",
            ),
            CollectionItem(
                id="col_3",
                icon="🗄️",
                title="Discussion about vector database selection",
                description=(
                    "Comparing LanceDB vs Pinecone vs Milvus for our specific use case."
                ),
                tag="Architecture",
                tag_color="var(--accent-green)",
                tag_bg="rgba(16, 185, 129, 0.1)",
                time_ago="3h ago",
            ),
        ]


collection_service = CollectionService()
