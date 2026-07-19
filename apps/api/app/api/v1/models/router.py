from fastapi import APIRouter, HTTPException, Depends
import logging
from apps.api.app.modules.models.service import model_service
from apps.api.app.modules.models.schemas import ModelListResponse
from apps.api.app.api.dependencies import get_db_session
from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/models", tags=["Models"])

@router.get("/{org_id}", response_model=ModelListResponse)
def get_models(org_id: str, db: Session = Depends(get_db_session)):
    """Get all models available for an organization."""
    try:
        return model_service.get_models(org_id, db)
    except Exception:
        logger.exception("Failed to retrieve models")
        raise HTTPException(status_code=500, detail="Internal Server Error")
