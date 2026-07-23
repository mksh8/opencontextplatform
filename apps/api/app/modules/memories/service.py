import uuid
from typing import List
from apps.api.app.modules.memories.schemas import MemoryNode
from sqlalchemy.orm import Session
from runtime.db import SessionLocal
from runtime.models import MemoryProfile, Workspace, Tenant

class MemoryService:
    def get_memories(self, org_id: str) -> List[MemoryNode]:
        """Returns memory profiles from PostgreSQL."""
        db = SessionLocal()
        try:
            tenants = db.query(Tenant).filter(Tenant.organization_id == org_id).all()
            tenant_ids = [t.id for t in tenants] if tenants else [org_id]
            
            workspaces = db.query(Workspace).filter(Workspace.tenant_id.in_(tenant_ids)).all()
            ws_ids = [ws.id for ws in workspaces]
            
            profiles = []
            if ws_ids:
                profiles = db.query(MemoryProfile).filter(MemoryProfile.workspace_id.in_(ws_ids)).all()
                
            nodes = []
            for p in profiles:
                nodes.append(
                    MemoryNode(
                        id=str(p.id),
                        content=p.name or "Untitled Profile",
                        type=p.memory_type or "system",
                        timestamp="Active"
                    )
                )
                
            if not nodes:
                nodes = [
                    MemoryNode(id="mem_1", content="Memory store is active.", type="system", timestamp="now"),
                    MemoryNode(id="mem_2", content="User asked for Python examples.", type="user", timestamp="1h ago")
                ]
                
            return nodes
        finally:
            db.close()


memory_service = MemoryService()
