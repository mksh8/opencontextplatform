from typing import List
from apps.api.app.modules.organizations.schemas import (
    OrganizationResponse,
    MemberResponse,
)


class OrganizationService:
    def get_user_organizations(self) -> List[OrganizationResponse]:
        """Returns mock multi-tenant organizations for the current user."""
        return [
            OrganizationResponse(
                id="org_alpha_123",
                name="Alpha Corp",
                slug="alpha-corp",
                plan="Enterprise",
                workspaces=[
                    {"id": "ws_1", "name": "Engineering", "role": "Admin"},
                    {"id": "ws_2", "name": "Marketing", "role": "Viewer"},
                ],
            ),
            OrganizationResponse(
                id="org_beta_456",
                name="Beta Startup",
                slug="beta-startup",
                plan="Pro",
                workspaces=[{"id": "ws_3", "name": "Core Product", "role": "Owner"}],
            ),
        ]

    def get_organization_members(self, org_id: str) -> List[MemberResponse]:
        """Returns mock members for a given organization."""
        return [
            MemberResponse(
                id="usr_1",
                name="Alice Smith",
                email="alice@example.com",
                role="Admin",
                status="Active",
                last_active="2m ago",
            ),
            MemberResponse(
                id="usr_2",
                name="Bob Jones",
                email="bob@example.com",
                role="Member",
                status="Invited",
                last_active="Never",
            ),
            MemberResponse(
                id="usr_3",
                name="Charlie Brown",
                email="charlie@example.com",
                role="Viewer",
                status="Active",
                last_active="1h ago",
            ),
        ]


organization_service = OrganizationService()
