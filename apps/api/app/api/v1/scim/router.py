"""SCIM Provisioning router endpoints."""

import datetime
from typing import Dict, Any
import uuid

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from apps.api.app.api.dependencies import get_db_session
from apps.api.app.modules.scim.schemas import SCIMUserCreate, SCIMUserResponse
from runtime.models import User

router = APIRouter(prefix="/scim", tags=["SCIM Provisioning"])


def authenticate_scim(request: Request) -> str:
    """Mock SCIM Bearer token auth"""
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return "org_alpha_123"  # Mock tenant extraction


@router.post("/Users", response_model=SCIMUserResponse)
def create_user(user: SCIMUserCreate, request: Request, db: Session = Depends(get_db_session)):
    """Create a new SCIM provisioned user."""
    tenant_id = authenticate_scim(request)

    # Check if exists
    email = user.emails[0].value if user.emails else user.userName
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=409, detail="User already exists")

    user_id = f"usr_{uuid.uuid4().hex[:12]}"
    if user.name:
        given = user.name.givenName or ""
        family = user.name.familyName or ""
        full_name = f"{given} {family}".strip()
    else:
        full_name = user.userName

    db_user = User(
        id=user_id,
        tenant_id=tenant_id,
        email=email,
        full_name=full_name,
        password_hash="scim_provisioned",  # Won't be used, SSO only
        role_name="viewer"
    )
    db.add(db_user)
    db.commit()

    now_str = datetime.datetime.utcnow().isoformat() + "Z"

    return SCIMUserResponse(
        id=user_id,
        userName=user.userName,
        name=user.name,
        emails=user.emails,
        active=True,
        meta={
            "resourceType": "User",
            "created": now_str,
            "lastModified": now_str,
        }
    )


@router.get("/Users", response_model=Dict[str, Any])
def get_users(request: Request, db: Session = Depends(get_db_session)):
    """List SCIM provisioned users."""
    tenant_id = authenticate_scim(request)
    users = db.query(User).filter(User.tenant_id == tenant_id).all()

    resources = []
    for u in users:
        resources.append({
            "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
            "id": u.id,
            "userName": u.email,
            "name": {"formatted": u.full_name},
            "emails": [{"value": u.email, "primary": True}],
            "active": True
        })

    return {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
        "totalResults": len(resources),
        "itemsPerPage": len(resources),
        "startIndex": 1,
        "Resources": resources
    }
