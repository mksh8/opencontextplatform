from fastapi import APIRouter
from apps.api.app.api.v1.contexts.router import router as contexts_router
from apps.api.app.api.v1.metrics.router import router as metrics_router
from apps.api.app.api.v1.search.router import router as search_router

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(contexts_router)
v1_router.include_router(metrics_router)
v1_router.include_router(search_router)
