from fastapi import APIRouter, HTTPException
import logging
from typing import List
from apps.api.app.modules.organizations.service import organization_service
from apps.api.app.modules.organizations.schemas import (
    OrganizationResponse,
    OrganizationCreateRequest,
    MemberResponse,
    TenantResponse,
    StatusUpdateRequest
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/organizations", tags=["Organizations"])

@router.post("", response_model=OrganizationResponse)
def create_organization(request: OrganizationCreateRequest):
    """Creates a new organization."""
    try:
        return organization_service.create_organization(request)
    except Exception:
        logger.exception("Failed to create organization")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("", response_model=List[OrganizationResponse])
def get_organizations():
    """Get all organizations the authenticated user belongs to."""
    try:
        return organization_service.get_user_organizations()
    except Exception:
        logger.exception("Failed to retrieve organizations")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/{org_id}/members", response_model=List[MemberResponse])
def get_members(org_id: str):
    """Get all members of a specific organization."""
    try:
        return organization_service.get_organization_members(org_id)
    except Exception:
        logger.exception(f"Failed to retrieve members for {org_id}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/{org_id}/tenants", response_model=List[TenantResponse])
def get_tenants(org_id: str):
    """Get all tenants of a specific organization."""
    try:
        return organization_service.get_organization_tenants(org_id)
    except Exception:
        logger.exception(f"Failed to retrieve tenants for {org_id}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.put("/{org_id}/status", response_model=OrganizationResponse)
def update_status(org_id: str, request: StatusUpdateRequest):
    """Update organization status."""
    try:
        return organization_service.update_organization_status(org_id, request.status)
    except Exception:
        logger.exception(f"Failed to update status for {org_id}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

