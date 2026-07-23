"""Provider service layer for managing AI model provider configurations."""

from typing import List
import uuid

from sqlalchemy.orm import Session

from apps.api.app.modules.providers.schemas import Provider, ProviderCreateRequest
from packages.enterprise.encryption import kms_engine
from runtime.models import ProviderConfig, ProviderType, Tenant, Workspace


class ProviderService:
    """Service layer managing AI providers in PostgreSQL."""

    def get_providers(self, org_id: str, db: Session) -> List[Provider]:
        """Retrieves providers from PostgreSQL based on Tenant's Workspaces."""
        tenants = db.query(Tenant).filter(Tenant.organization_id == org_id).all()
        tenant_ids = [t.id for t in tenants] if tenants else [org_id]

        workspaces = (
            db.query(Workspace)
            .filter(Workspace.tenant_id.in_(tenant_ids))
            .all()
        )
        ws_ids = [ws.id for ws in workspaces]

        results = []
        if ws_ids:
            results = (
                db.query(ProviderConfig)
                .filter(ProviderConfig.workspace_id.in_(ws_ids))
                .all()
            )

        providers = []
        for row in results:
            prov_type = (
                db.query(ProviderType)
                .filter(ProviderType.id == row.provider_type_id)
                .first()
            )
            type_code = prov_type.code if prov_type else "unknown"

            url = row.endpoint or "api.openai.com"
            model_default = "gpt-4o"

            if type_code.lower() == "anthropic":
                url = row.endpoint or "api.anthropic.com"
                model_default = "claude-3.5-sonnet"
            elif type_code.lower() == "ollama":
                url = row.endpoint or "localhost:11434"
                model_default = "llama-3-70b"

            providers.append(
                Provider(
                    id=str(row.id),
                    name=row.name,
                    url=url,
                    model=model_default,
                    status=row.status,
                    usage="0 tokens",
                )
            )

        if not providers:
            providers = [
                Provider(
                    id="prov_1",
                    name="OpenAI Default",
                    url="api.openai.com",
                    model="gpt-4o",
                    status="Active",
                    usage="1.2M tokens",
                )
            ]

        return providers

    def create_provider(
        self, org_id: str, request: ProviderCreateRequest, db: Session
    ) -> Provider:
        """Saves a new provider to PostgreSQL."""
        ptype = (
            db.query(ProviderType)
            .filter(ProviderType.code == request.provider_type)
            .first()
        )
        if not ptype:
            ptype = ProviderType(
                id=uuid.uuid4(),
                code=request.provider_type,
                name=request.provider_type.capitalize(),
            )
            db.add(ptype)

        tenants = db.query(Tenant).filter(Tenant.organization_id == org_id).all()
        tenant_id = tenants[0].id if tenants else org_id
        workspace = db.query(Workspace).filter(Workspace.tenant_id == tenant_id).first()
        if not workspace:
            workspace = Workspace(
                id=uuid.uuid4(),
                tenant_id=tenant_id,
                name="Default Workspace",
                slug="default",
            )
            db.add(workspace)
            db.flush()

        default_models = []
        if request.provider_type.lower() == "openai":
            default_models = ["gpt-4o", "text-embedding-3-small"]
        elif request.provider_type.lower() == "anthropic":
            default_models = ["claude-3.5-sonnet", "claude-3-opus"]

        configuration = {"supported_models": default_models}

        prov_id = uuid.uuid4()
        new_prov = ProviderConfig(
            id=prov_id,
            workspace_id=workspace.id,
            name=request.name,
            provider_type_id=ptype.id,
            encrypted_api_key=kms_engine.encrypt(request.api_key),
            status="Active",
            configuration=configuration,
        )

        db.add(new_prov)
        db.commit()

        url = "api.openai.com"
        model_default = "gpt-4o"
        if request.provider_type.lower() == "anthropic":
            url = "api.anthropic.com"
            model_default = "claude-3.5-sonnet"

        return Provider(
            id=str(prov_id),
            name=request.name,
            url=url,
            model=model_default,
            status="Active",
            usage="0 tokens",
        )


provider_service = ProviderService()
