import uuid
from typing import List
import datetime
from runtime.db import SessionLocal
from runtime.models import User, Organization, Tenant, Workspace
from apps.api.app.modules.organizations.schemas import (
    OrganizationResponse,
    OrganizationCreateRequest,
    MemberResponse,
)


class OrganizationService:
    def create_organization(self, request: OrganizationCreateRequest) -> OrganizationResponse:
        """Creates a new organization and default tenant."""
        db = SessionLocal()
        try:
            org_id = uuid.uuid4()
            org = Organization(
                id=org_id,
                code=f"org_{org_id.hex[:8]}",
                name=request.name,
                display_name=request.display_name,
                description=request.description,
                website=request.website,
                industry=request.industry
            )
            
            # Must also create a default tenant for the organization because RBAC depends on it
            tenant_id = uuid.uuid4()
            tenant = Tenant(
                id=tenant_id,
                organization_id=org_id,
                code=f"tenant_{tenant_id.hex[:8]}",
                name="Default Tenant"
            )
            
            db.add(org)
            db.add(tenant)
            db.commit()
            
            return OrganizationResponse(
                id=str(org.id),
                name=org.name,
                slug=org.code,
                plan=request.plan or "Enterprise",
                display_name=org.display_name,
                description=org.description,
                website=org.website,
                industry=org.industry,
                workspaces=[],
                member_count=0,
                status="ACTIVE",
                created_at=datetime.datetime.now().strftime("%b %d, %Y")
            )
        finally:
            db.close()

    def get_user_organizations(self, user_id: str = None) -> List[OrganizationResponse]:
        """Returns organizations from the database."""
        db = SessionLocal()
        try:
            # In a fully authenticated flow, we would filter by the user's tenants.
            # For now, we return all organizations for the dashboard.
            orgs = db.query(Organization).all()
            
            result = []
            for org in orgs:
                tenants = db.query(Tenant).filter(Tenant.organization_id == org.id).all()
                workspaces_data = []
                
                for tenant in tenants:
                    workspaces = db.query(Workspace).filter(Workspace.tenant_id == tenant.id).all()
                    for ws in workspaces:
                        workspaces_data.append({
                            "id": str(ws.id),
                            "name": ws.name,
                            "role": "Owner"  # Using Owner as default for now
                        })
                
                
                # Fetch members logic
                tenant_ids = [t.id for t in tenants]
                member_count = db.query(User).filter(User.tenant_id.in_(tenant_ids)).count() if tenant_ids else 0
                
                result.append(
                    OrganizationResponse(
                        id=str(org.id),
                        name=org.name,
                        slug=org.code,
                        plan="Enterprise",
                        display_name=org.display_name,
                        description=org.description,
                        website=org.website,
                        industry=org.industry,
                        workspaces=workspaces_data,
                        member_count=member_count,
                        status=org.status or "ACTIVE",
                        created_at=org.created_at.strftime("%b %d, %Y") if org.created_at else datetime.datetime.now().strftime("%b %d, %Y")
                    )
                )
            
            # If no orgs exist yet, return a mock to prevent empty dashboard
            if not result:
                return [
                    OrganizationResponse(
                        id="org_alpha_123",
                        name="Alpha Corp",
                        slug="alpha-corp",
                        plan="Enterprise",
                        display_name="Alpha Corporation",
                        description="Default organization",
                        website="alpha.example.com",
                        industry="Technology",
                        workspaces=[
                            {"id": "ws_1", "name": "Engineering Core", "role": "Owner"}
                        ],
                        member_count=1,
                        status="ACTIVE",
                        created_at=datetime.datetime.now().strftime("%b %d, %Y")
                    )
                ]
                
            return result
        finally:
            db.close()

    def get_organization_members(self, org_id: str) -> List[MemberResponse]:
        """Returns all members of a specific organization."""
        db = SessionLocal()
        try:
            # Handle mock org_id fallback gracefully
            if org_id == "org_alpha_123":
                return [
                    MemberResponse(
                        id="user_001",
                        name="Mukesh Kumar",
                        email="mukesh@example.com",
                        role="Owner",
                        status="Active",
                        last_active="2m ago"
                    )
                ]
                
            tenants = db.query(Tenant).filter(Tenant.organization_id == org_id).all()
            tenant_ids = [t.id for t in tenants]
            
            if not tenant_ids:
                return []
                
            users = db.query(User).filter(User.tenant_id.in_(tenant_ids)).all()
            
            return [
                MemberResponse(
                    id=str(u.id),
                    name=u.full_name or u.email,
                    email=u.email,
                    role=u.role_name.capitalize() if getattr(u, 'role_name', None) else "Member",
                    status="Active",
                    last_active="Active"
                ) for u in users
            ]
        finally:
            db.close()


organization_service = OrganizationService()
