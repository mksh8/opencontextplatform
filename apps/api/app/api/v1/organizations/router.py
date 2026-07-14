from fastapi import APIRouter, HTTPException
import logging
from typing import List
from apps.api.app.modules.organizations.service import organization_service
from apps.api.app.modules.organizations.schemas import (
    OrganizationResponse,
    MemberResponse,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/organizations", tags=["Organizations"])


@router.get("/", response_model=List[OrganizationResponse])
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
