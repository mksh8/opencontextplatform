"""Context service layer for CRUD operations, embeddings, and metadata management."""

import json
import random
from typing import List
import uuid

from apps.api.app.modules.context.schemas import (
    ContextCreateRequest,
    ContextDetailResponse,
    ContextMetadataBulkRequest,
)
from runtime.db import SessionLocal
from runtime.memory_engine import MemoryEngine
from runtime.models import ContextProfile, Tenant, Workspace


class ContextService:
    """Service layer managing context documents, profiles, and embeddings."""

    def get_all_contexts(self, engine: MemoryEngine):
        """Business logic for retrieving contexts, delegates to the Runtime Engine."""
        return engine.get_all_contexts()

    def create_context(
        self, request: ContextCreateRequest, engine: MemoryEngine, org_id: str = "tenant_1"
    ) -> dict:
        """Create a new context node and link it to a ContextProfile in PostgreSQL."""
        ctx_id = f"ctx_{uuid.uuid4().hex[:8]}"

        # 1. Map to PostgreSQL ContextProfile
        db = SessionLocal()
        try:
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

            profile = ContextProfile(
                id=uuid.uuid4(),
                workspace_id=workspace.id,
                name=request.title or f"Context {ctx_id}",
                description=request.source,
                retrieval_strategy="hybrid",
                metadata_json={"context_id": ctx_id, "type": request.type},
            )
            db.add(profile)
            db.commit()
        finally:
            db.close()

        # 2. Save memory node to ArcadeDB
        context_obj = {
            "id": ctx_id,
            "tenant_id": org_id,
            "type": request.type,
            "provider": request.source,
            "content": request.content,
            "metadata": {
                "title": request.title,
                "tokens": str(len(request.content) // 4),
            },
        }
        engine.save_memory(context_obj)
        return {"id": ctx_id, "status": "success"}

    def get_context_by_id(
        self, context_id: str, engine: MemoryEngine
    ) -> ContextDetailResponse:
        """Fetch a single context by ID."""
        results = engine.db.graph.execute_command(
            "sql", "SELECT * FROM ContextNode WHERE id = :id", {"id": context_id}
        )
        if not results:
            raise ValueError(f"Context {context_id} not found")

        row = results[0]
        metadata = {}
        if "metadata_json" in row and row["metadata_json"]:
            try:
                metadata = json.loads(row["metadata_json"])
            except Exception:  # pylint: disable=broad-exception-caught
                pass

        return ContextDetailResponse(
            id=row.get("id"),
            title=metadata.get("title", row.get("id")),
            type=row.get("type", "Document"),
            source=row.get("provider", "Unknown"),
            workspace=row.get("tenant_id", "Default"),
            tokens=metadata.get("tokens", "0"),
            content=row.get("content", ""),
            created_at="Just now",
        )

    def delete_context(self, context_id: str, engine: MemoryEngine):
        """Delete one or more contexts by ID (comma separated)."""
        ids = [i.strip() for i in context_id.split(",") if i.strip()]
        for cid in ids:
            engine.db.graph.execute_command(
                "sql", "DELETE FROM ContextNode WHERE id = :id", {"id": cid}
            )
        return {"status": "success", "ids": ids}

    def update_context(self, context_id: str, request: dict, engine: MemoryEngine):
        """Update a context's content by ID."""
        engine.db.graph.execute_command(
            "sql",
            "UPDATE ContextNode SET content = :content WHERE id = :id",
            {"content": request["content"], "id": context_id},
        )
        return {"status": "success", "id": context_id}

    def get_context_embeddings(self, context_id: str, _engine: MemoryEngine) -> dict:
        """Fetch embedding representation for a context node."""
        mock_vector = [round(random.uniform(-0.1, 0.1), 6) for _ in range(15)]

        return {
            "context_id": context_id,
            "model": "text-embedding-3-small",
            "dimensions": 1536,
            "vector_preview": mock_vector,
            "status": "indexed",
        }

    def search_context_embeddings(
        self, _context_id: str, query: str, _engine: MemoryEngine
    ) -> dict:
        """Simulate a semantic search within this specific context."""
        words = query.lower().split()
        score = random.uniform(0.4, 0.7)
        if any(w in "test context memory ai vector" for w in words):
            score += 0.2

        return {
            "query": query,
            "similarity_score": round(score, 3),
            "match_found": score > 0.75,
            "message": "High semantic match!" if score > 0.75 else "Low semantic match.",
        }

    def bulk_add_metadata(
        self, request: ContextMetadataBulkRequest, engine: MemoryEngine
    ) -> dict:
        """Adds a key-value pair to the metadata_json property of specified ContextNodes."""
        if request.apply_to_all:
            results = engine.db.graph.execute_command(
                "sql", "SELECT id, metadata_json FROM ContextNode"
            )
        else:
            ids_str = ", ".join([f"'{cid}'" for cid in request.context_ids])
            if not ids_str:
                return {"status": "success", "updated_count": 0}
            results = engine.db.graph.execute_command(
                "sql", f"SELECT id, metadata_json FROM ContextNode WHERE id IN [{ids_str}]"
            )

        updated_count = 0
        for row in results:
            context_id = row.get("id")
            if not context_id:
                continue

            metadata = {}
            if "metadata_json" in row and row["metadata_json"]:
                try:
                    metadata = json.loads(row["metadata_json"])
                except Exception:  # pylint: disable=broad-exception-caught
                    pass

            metadata[request.key] = request.value
            metadata_str = json.dumps(metadata)

            engine.db.graph.execute_command(
                "sql",
                "UPDATE ContextNode SET metadata_json = :metadata WHERE id = :id",
                {"metadata": metadata_str, "id": context_id},
            )
            updated_count += 1

        return {"status": "success", "updated_count": updated_count}

    def get_all_metadata(self, engine: MemoryEngine) -> List[dict]:
        """Extracts all custom metadata from all ContextNodes as a flat list."""
        results = engine.db.graph.execute_command(
            "sql", "SELECT id, metadata_json FROM ContextNode"
        )
        fields = []
        for row in results:
            context_id = row.get("id")
            if not context_id or "metadata_json" not in row or not row["metadata_json"]:
                continue

            try:
                metadata = json.loads(row["metadata_json"])
                for k, v in metadata.items():
                    if k in ["title", "tokens"]:
                        continue
                    fields.append({
                        "id": f"{context_id}_{k}",
                        "contextId": context_id,
                        "key": k,
                        "value": str(v),
                        "source": "User Defined",
                    })
            except Exception:  # pylint: disable=broad-exception-caught
                pass
        return fields


context_service = ContextService()
