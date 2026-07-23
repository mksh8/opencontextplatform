"""Organization service for managing organizations, members, and tenants."""

import datetime
from typing import List
import uuid

import bcrypt
from fastapi import HTTPException

from apps.api.app.modules.organizations.schemas import (
    MemberResponse,
    OrganizationCreateRequest,
    OrganizationResponse,
    TenantResponse,
)
from runtime.db import SessionLocal
from runtime.models import Organization, Role, RoleAssignment, Tenant, User, Workspace


class OrganizationService:
    """Service layer managing organizations, onboarding, members, and status updates."""

    def create_organization(self, request: OrganizationCreateRequest) -> OrganizationResponse:
        """Creates a new organization, default tenant, default workspace, and owner."""
        db = SessionLocal()
        try:
            # 1. Create Organization
            org_id = uuid.uuid4()
            org = Organization(
                id=org_id,
                code=f"org_{org_id.hex[:8]}",
                name=request.name,
                display_name=request.display_name,
                description=request.description,
                website=request.website,
                industry=request.industry,
            )

            # 2. Create Default Tenant
            tenant_id = uuid.uuid4()
            tenant = Tenant(
                id=tenant_id,
                organization_id=org_id,
                code=f"tenant_{tenant_id.hex[:8]}",
                name="Default Tenant",
            )

            # 3. Create Default Workspace
            workspace_id = uuid.uuid4()
            workspace = Workspace(
                id=workspace_id,
                tenant_id=tenant_id,
                name="Default Workspace",
                slug=f"ws_{workspace_id.hex[:8]}",
            )

            # 4. Find or Create Organization Owner
            user = db.query(User).filter(User.email == request.owner_email).first()
            if not user:
                user_id = uuid.uuid4()
                default_password = "ChangeMe123!"
                hashed_password = bcrypt.hashpw(
                    default_password.encode("utf-8"), bcrypt.gensalt()
                ).decode("utf-8")

                user = User(
                    id=user_id,
                    email=request.owner_email,
                    full_name=request.owner_name,
                    password_hash=hashed_password,
                    status="INVITED",
                )
                db.add(user)

            db.add(org)
            db.add(tenant)
            db.add(workspace)
            db.flush()

            # 5. Assign Role
            org_owner_role = db.query(Role).filter_by(name="Organization Owner").first()
            if org_owner_role:
                role_assignment = RoleAssignment(
                    user_id=user.id,
                    role_id=org_owner_role.id,
                    scope_type="ORGANIZATION",
                    scope_id=org.id,
                )
                db.add(role_assignment)

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
                workspaces=[{"id": str(workspace.id), "name": workspace.name, "role": "Owner"}],
                tenant_count=1,
                member_count=1,
                status="ACTIVE",
                created_at=datetime.datetime.now().strftime("%b %d, %Y"),
            )
        except Exception as exc:
            db.rollback()
            raise exc
        finally:
            db.close()

    def get_user_organizations(self, _user_id: str = None) -> List[OrganizationResponse]:
        """Returns organizations from the database, counting members via role assignments."""
        db = SessionLocal()
        try:
            orgs = db.query(Organization).all()

            result = []
            for org in orgs:
                tenants = db.query(Tenant).filter(Tenant.organization_id == org.id).all()
                workspaces_data = []

                for tenant in tenants:
                    workspaces = (
                        db.query(Workspace).filter(Workspace.tenant_id == tenant.id).all()
                    )
                    for ws in workspaces:
                        workspaces_data.append({
                            "id": str(ws.id),
                            "name": ws.name,
                            "role": "Owner",
                        })

                member_count = db.query(RoleAssignment).filter(
                    RoleAssignment.scope_type == "ORGANIZATION",
                    RoleAssignment.scope_id == org.id,
                ).count()

                created_str = (
                    org.created_at.strftime("%b %d, %Y")
                    if org.created_at
                    else datetime.datetime.now().strftime("%b %d, %Y")
                )

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
                        tenant_count=len(tenants),
                        member_count=member_count,
                        status=org.status or "ACTIVE",
                        created_at=created_str,
                    )
                )

            return result
        finally:
            db.close()

    def get_organization_members(self, org_id: str) -> List[MemberResponse]:
        """Returns all members of a specific organization using RoleAssignments."""
        db = SessionLocal()
        try:
            assignments = (
                db.query(RoleAssignment, User, Role)
                .join(User, RoleAssignment.user_id == User.id)
                .join(Role, RoleAssignment.role_id == Role.id)
                .filter(
                    RoleAssignment.scope_type == "ORGANIZATION",
                    RoleAssignment.scope_id == org_id,
                )
                .all()
            )

            if not assignments:
                return []

            return [
                MemberResponse(
                    id=str(user.id),
                    name=user.full_name or user.email,
                    email=user.email,
                    role=role.name,
                    status=user.status or "Active",
                    last_active="Active",
                )
                for _assignment, user, role in assignments
            ]
        finally:
            db.close()

    def get_organization_tenants(self, org_id: str) -> List[TenantResponse]:
        """Returns all tenants belonging to a specific organization."""
        db = SessionLocal()
        try:
            tenants = db.query(Tenant).filter(Tenant.organization_id == org_id).all()
            return [
                TenantResponse(
                    id=str(tenant.id),
                    name=tenant.name,
                    code=tenant.code,
                    status=tenant.status or "ACTIVE",
                    created_at=(
                        tenant.created_at.strftime("%b %d, %Y")
                        if tenant.created_at
                        else datetime.datetime.now().strftime("%b %d, %Y")
                    ),
                )
                for tenant in tenants
            ]
        finally:
            db.close()

    def update_organization_status(self, org_id: str, status: str) -> OrganizationResponse:
        """Updates the status of an organization."""
        db = SessionLocal()
        try:
            org = db.query(Organization).filter(Organization.id == org_id).first()
            if not org:
                raise HTTPException(status_code=404, detail="Organization not found")

            org.status = status
            db.commit()

            return self._build_org_response(org, db)
        except Exception as exc:
            db.rollback()
            raise exc
        finally:
            db.close()

    def _build_org_response(self, org: Organization, db) -> OrganizationResponse:
        tenants = db.query(Tenant).filter(Tenant.organization_id == org.id).all()
        workspaces_data = []
        for tenant in tenants:
            workspaces = db.query(Workspace).filter(Workspace.tenant_id == tenant.id).all()
            for ws in workspaces:
                workspaces_data.append({
                    "id": str(ws.id),
                    "name": ws.name,
                    "role": "Owner",
                })

        member_count = db.query(RoleAssignment).filter(
            RoleAssignment.scope_type == "ORGANIZATION",
            RoleAssignment.scope_id == org.id,
        ).count()

        created_str = (
            org.created_at.strftime("%b %d, %Y")
            if org.created_at
            else datetime.datetime.now().strftime("%b %d, %Y")
        )

        return OrganizationResponse(
            id=str(org.id),
            name=org.name,
            slug=org.code,
            plan="Enterprise",
            display_name=org.display_name,
            description=org.description,
            website=org.website,
            industry=org.industry,
            workspaces=workspaces_data,
            tenant_count=len(tenants),
            member_count=member_count,
            status=org.status or "ACTIVE",
            created_at=created_str,
        )


organization_service = OrganizationService()
