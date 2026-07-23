from fastapi import APIRouter, Depends, HTTPException
import logging
from apps.api.app.api.dependencies import get_db_session
from sqlalchemy.orm import Session
from apps.api.app.modules.auth.service import auth_service
from apps.api.app.modules.auth.schemas import (
    UserProfile, 
    LoginRequest, 
    TokenResponse
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db_session)):
    """Authenticate and return JWT."""
    try:
        return auth_service.login(request, db)
    except ValueError as e:
        logger.error(f"Login validation error: {e}")
        raise HTTPException(status_code=401, detail=str(e))
    except Exception:
        logger.exception("Login failed")
        raise HTTPException(status_code=401, detail="Invalid credentials")



@router.get("/me", response_model=UserProfile)
def get_current_user():
    """Get the currently authenticated user's profile."""
    try:
        return auth_service.get_current_user()
    except Exception:
        logger.exception("Failed to retrieve user profile")
        raise HTTPException(status_code=500, detail="Internal Server Error")

from pydantic import BaseModel
class SSOLoginRequest(BaseModel):
    provider: str  # 'saml', 'oauth_azure', 'oauth_google'
    tenant_id: str

@router.post("/sso")
def sso_login(request: SSOLoginRequest):
    """Initiates an SSO login flow for enterprise tenants."""
    from packages.enterprise.sso_provider import SSOManager
    sso = SSOManager(provider=request.provider)
    redirect_url = sso.get_authorization_url(request.tenant_id)
    return {"redirect_url": redirect_url}
