from typing import List
from apps.api.app.modules.models.schemas import ModelItem, ModelListResponse
from sqlalchemy.orm import Session
from runtime.models import ProviderConfig, Workspace, Tenant


class ModelService:
    def get_models(self, org_id: str, db: Session) -> ModelListResponse:
        """Retrieves available models based on active providers in PostgreSQL."""
        tenants = db.query(Tenant).filter(Tenant.organization_id == org_id).all()
        tenant_ids = [t.id for t in tenants] if tenants else [org_id]
        
        workspaces = db.query(Workspace).filter(Workspace.tenant_id.in_(tenant_ids)).all()
        ws_ids = [ws.id for ws in workspaces]
        
        providers = []
        if ws_ids:
            providers = db.query(ProviderConfig).filter(ProviderConfig.workspace_id.in_(ws_ids)).all()
            
        models = []
        
        for prov in providers:
            # Parse configuration
            config = prov.configuration or {}
            supported_models = config.get("supported_models", [])
                
            for m_name in supported_models:
                m_type = "Embedding" if "embedding" in m_name.lower() else "LLM"
                models.append(
                    ModelItem(
                        id=f"{prov.id}_{m_name}",
                        name=m_name,
                        provider=prov.name,
                        type=m_type,
                        status="Active",
                        last_used="Never"
                    )
                )
                
        # If no models (because no providers or empty array), return fallback
        if len(models) == 0:
            # Fallback mock for UI testing before provider is added
            models = [
                ModelItem(id="mock_m1", name="gpt-4o", provider="OpenAI Default", type="LLM", status="Active", last_used="Just now")
            ]
            
        return ModelListResponse(models=models)

model_service = ModelService()
