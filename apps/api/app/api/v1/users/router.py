import uuid
import datetime
import logging
import bcrypt
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from runtime.db import SessionLocal
from runtime.models.identity import User, Role, RoleAssignment

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/users", tags=["Users"])


class PlatformUserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    scope: str
    status: str
    created_at: str


class InviteUserRequest(BaseModel):
    email: str
    full_name: str
    role_name: str = "Platform Operator"


@router.get("", response_model=List[PlatformUserResponse])
def list_platform_users():
    """List all users in the platform with their highest-scope role."""
    db = SessionLocal()
    try:
        users = db.query(User).all()
        result = []
        for user in users:
            # Get the highest priority role assignment
            assignment = (
                db.query(RoleAssignment, Role)
                .join(Role, RoleAssignment.role_id == Role.id)
                .filter(RoleAssignment.user_id == user.id)
                .first()
            )
            role_name = assignment[1].name if assignment else "No Role"
            scope = assignment[0].scope_type if assignment else "NONE"
            result.append(
                PlatformUserResponse(
                    id=str(user.id),
                    name=user.full_name or user.email,
                    email=user.email,
                    role=role_name,
                    scope=scope,
                    status=user.status or "ACTIVE",
                    created_at=user.created_at.strftime("%b %d, %Y") if user.created_at else "-",
                )
            )
        return result
    except Exception as e:
        logger.exception("Failed to list platform users")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


@router.post("/invite", response_model=PlatformUserResponse)
def invite_platform_user(request: InviteUserRequest):
    """Invite a new user to the platform and assign them a platform-level role."""
    db = SessionLocal()
    try:
        # Check if user already exists
        existing = db.query(User).filter(User.email == request.email).first()
        if existing:
            raise HTTPException(status_code=409, detail=f"User with email {request.email} already exists")

        # Find requested role
        role = db.query(Role).filter(Role.name == request.role_name).first()
        if not role:
            raise HTTPException(status_code=404, detail=f"Role '{request.role_name}' not found")

        # Create user with INVITED status and temporary password
        temp_password = "ChangeMe123!"
        hashed = bcrypt.hashpw(temp_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        user = User(
            id=uuid.uuid4(),
            email=request.email,
            full_name=request.full_name,
            password_hash=hashed,
            status="INVITED",
        )
        db.add(user)
        db.flush()

        # Assign platform-level role
        assignment = RoleAssignment(
            user_id=user.id,
            role_id=role.id,
            scope_type="PLATFORM",
        )
        db.add(assignment)
        db.commit()

        logger.info(f"Invited platform user: {request.email} with role {request.role_name}")
        return PlatformUserResponse(
            id=str(user.id),
            name=user.full_name,
            email=user.email,
            role=role.name,
            scope="PLATFORM",
            status=user.status,
            created_at=datetime.datetime.now().strftime("%b %d, %Y"),
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.exception("Failed to invite platform user")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


class UserStatusRequest(BaseModel):
    status: str


@router.put("/{user_id}/status")
def update_user_status(user_id: str, request: UserStatusRequest):
    """Update a platform user's status (ACTIVE / INACTIVE)."""
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.status = request.status.upper()
        db.commit()
        return {"id": user_id, "status": user.status}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.exception("Failed to update user status")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()
