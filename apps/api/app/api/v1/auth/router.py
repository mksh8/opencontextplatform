from fastapi import APIRouter, HTTPException
import logging
from apps.api.app.modules.auth.service import auth_service
from apps.api.app.modules.auth.schemas import UserProfile

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/me", response_model=UserProfile)
def get_current_user():
    """Get the currently authenticated user's profile."""
    try:
        return auth_service.get_current_user()
    except Exception:
        logger.exception("Failed to retrieve user profile")
        raise HTTPException(status_code=500, detail="Internal Server Error")
