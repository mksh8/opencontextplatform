"""Authentication router endpoints."""

import logging

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from apps.api.app.api.dependencies import get_db_session
from apps.api.app.modules.auth.schemas import (
    LoginRequest,
    TokenResponse,
    UserProfile,
)
from apps.api.app.modules.auth.service import auth_service
from packages.enterprise.sso_provider import SSOManager

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])


class SSOLoginRequest(BaseModel):
    """Schema for SSO login requests."""
    provider: str  # 'saml', 'oauth_azure', 'oauth_google'
    tenant_id: str


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db_session)):
    """Authenticate and return JWT."""
    try:
        return auth_service.login(request, db)
    except ValueError as e:
        logger.error("Login validation error: %s", e)
        raise HTTPException(status_code=401, detail=str(e)) from e
    except Exception as exc:
        logger.exception("Login failed")
        raise HTTPException(status_code=401, detail="Invalid credentials") from exc


@router.get("/me", response_model=UserProfile)
def get_current_user():
    """Get the currently authenticated user's profile."""
    try:
        return auth_service.get_current_user()
    except Exception as exc:
        logger.exception("Failed to retrieve user profile")
        raise HTTPException(status_code=500, detail="Internal Server Error") from exc


@router.post("/sso")
def sso_login(request: SSOLoginRequest):
    """Initiates an SSO login flow for enterprise tenants."""
    sso = SSOManager(provider=request.provider)
    redirect_url = sso.get_authorization_url(request.tenant_id)
    return {"redirect_url": redirect_url}
