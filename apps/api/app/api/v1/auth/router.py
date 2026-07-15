from fastapi import APIRouter, HTTPException
import logging
from apps.api.app.modules.auth.service import auth_service
from apps.api.app.modules.auth.schemas import (
    UserProfile, 
    LoginRequest, 
    SignupRequest, 
    TenantCreateRequest,
    TokenResponse
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    """Authenticate and return JWT."""
    try:
        return auth_service.login(request)
    except Exception:
        logger.exception("Login failed")
        raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/signup", response_model=TokenResponse)
def signup(request: SignupRequest):
    """Create new account and return JWT."""
    try:
        return auth_service.signup(request)
    except Exception:
        logger.exception("Signup failed")
        raise HTTPException(status_code=400, detail="Signup failed")

@router.post("/onboard")
def onboard_tenant(request: TenantCreateRequest):
    """Provision a new organization tenant."""
    try:
        return auth_service.onboard_tenant(request)
    except Exception:
        logger.exception("Tenant onboarding failed")
        raise HTTPException(status_code=500, detail="Provisioning failed")

@router.get("/me", response_model=UserProfile)
def get_current_user():
    """Get the currently authenticated user's profile."""
    try:
        return auth_service.get_current_user()
    except Exception:
        logger.exception("Failed to retrieve user profile")
        raise HTTPException(status_code=500, detail="Internal Server Error")
