from fastapi import APIRouter, Depends
from apps.api.app.modules.context.service import context_service
from apps.api.app.api.dependencies import get_memory_engine
from runtime.memory_engine import MemoryEngine

router = APIRouter(
    prefix="/contexts",
    tags=["Contexts"]
)

@router.get("/")
def get_contexts(engine: MemoryEngine = Depends(get_memory_engine)):
    """Endpoint returning ingested context data, delegated to service."""
    return context_service.get_all_contexts(engine)
