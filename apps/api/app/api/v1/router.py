from fastapi import APIRouter
from apps.api.app.api.v1.contexts.router import router as contexts_router
from apps.api.app.api.v1.metrics.router import router as metrics_router
from apps.api.app.api.v1.search.router import router as search_router
from apps.api.app.api.v1.auth.router import router as auth_router
from apps.api.app.api.v1.organizations.router import router as organizations_router
from apps.api.app.api.v1.billing.router import router as billing_router
from apps.api.app.api.v1.collections.router import router as collections_router
from apps.api.app.api.v1.memories.router import router as memories_router
from apps.api.app.api.v1.graph.router import router as graph_router
from apps.api.app.api.v1.connectors.router import router as connectors_router
from apps.api.app.api.v1.providers.router import router as providers_router
from apps.api.app.api.v1.models.router import router as models_router
from apps.api.app.api.v1.webhooks.router import router as webhooks_router
from apps.api.app.api.v1.apikeys.router import router as apikeys_router
from apps.api.app.api.v1.roles.router import router as roles_router
from apps.api.app.api.v1.auditlogs.router import router as auditlogs_router
from apps.api.app.api.v1.scim.router import router as scim_router
from apps.api.app.api.v1.users.router import router as users_router

v1_router = APIRouter()

v1_router.include_router(auth_router)
v1_router.include_router(users_router)
v1_router.include_router(organizations_router)
v1_router.include_router(contexts_router)
v1_router.include_router(metrics_router)
v1_router.include_router(search_router)
v1_router.include_router(billing_router)
v1_router.include_router(collections_router)
v1_router.include_router(memories_router)
v1_router.include_router(graph_router)
v1_router.include_router(connectors_router)
v1_router.include_router(providers_router)
v1_router.include_router(models_router)
v1_router.include_router(webhooks_router)
v1_router.include_router(apikeys_router)
v1_router.include_router(roles_router)
v1_router.include_router(auditlogs_router)
v1_router.include_router(scim_router)
