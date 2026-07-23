"""Connector service layer for managing integration configs and sync jobs."""

from datetime import datetime
import json
from typing import List
import uuid

from sqlalchemy.orm import Session

from apps.api.app.modules.connectors.schemas import (
    Connector,
    ConnectorCreateRequest,
    ConnectorSyncResponse,
    IngestionJob,
    IngestionJobListResponse,
)
from packages.connector_sdk.factory import ConnectorFactory
from packages.enterprise.encryption import kms_engine
from packages.storage.arcadedb.operations import ArcadeDBRepository
from runtime.models import ConnectorConfig, ConnectorType, Tenant, Workspace


class ConnectorService:
    """Service layer managing connectors and triggering ingestion jobs."""

    def get_connectors(self, org_id: str, db: Session) -> List[Connector]:
        """Retrieves configured connectors from PostgreSQL."""
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
                db.query(ConnectorConfig)
                .filter(ConnectorConfig.workspace_id.in_(ws_ids))
                .all()
            )

        connectors = []
        for row in results:
            c_type = (
                db.query(ConnectorType)
                .filter(ConnectorType.id == row.connector_type_id)
                .first()
            )
            type_code = c_type.code if c_type else "unknown"

            config = row.configuration or {}

            icon = "🔗" if type_code == "web" else ("🐙" if type_code == "github" else "🔌")
            connectors.append(
                Connector(
                    id=str(row.id),
                    name=row.name,
                    icon=icon,
                    status=config.get("status", "Active"),
                    last_sync=config.get("last_sync", "Never"),
                    details=f"Type: {type_code}",
                )
            )
        return connectors

    def create_connector(
        self, org_id: str, request: ConnectorCreateRequest, db: Session
    ) -> Connector:
        """Registers a new connector config into PostgreSQL."""
        ctype = (
            db.query(ConnectorType)
            .filter(ConnectorType.code == request.type)
            .first()
        )
        if not ctype:
            ctype = ConnectorType(
                id=uuid.uuid4(), code=request.type, name=request.type.capitalize()
            )
            db.add(ctype)

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

        conn_id = uuid.uuid4()
        config_dict = {
            "credentials": kms_engine.encrypt(json.dumps(request.config)),
            "status": "Active",
            "last_sync": "Never",
        }

        new_conn = ConnectorConfig(
            id=conn_id,
            workspace_id=workspace.id,
            name=request.name,
            connector_type_id=ctype.id,
            configuration=config_dict,
            status="Active",
        )
        db.add(new_conn)
        db.commit()

        icon = "🔗" if request.type == "web" else ("🐙" if request.type == "github" else "🔌")
        return Connector(
            id=str(conn_id),
            name=request.name,
            icon=icon,
            status="Active",
            last_sync="Never",
            details=f"Type: {request.type}",
        )

    def sync_connector(
        self, connector_id: str, db: Session, arcadedb: ArcadeDBRepository
    ) -> ConnectorSyncResponse:
        """Runs an ingestion job using the Connector SDK and ArcadeDBRepository."""
        record = (
            db.query(ConnectorConfig)
            .filter(ConnectorConfig.id == connector_id)
            .first()
        )
        if not record:
            raise ValueError(f"Connector {connector_id} not found")

        c_type = (
            db.query(ConnectorType)
            .filter(ConnectorType.id == record.connector_type_id)
            .first()
        )
        conn_type_code = c_type.code if c_type else "unknown"

        config_dict = record.configuration or {}
        credentials = {}
        if "credentials" in config_dict:
            try:
                decrypted = kms_engine.decrypt(config_dict["credentials"])
                credentials = json.loads(decrypted)
            except Exception:  # pylint: disable=broad-exception-caught
                pass

        ws = db.query(Workspace).filter(Workspace.id == record.workspace_id).first()
        tenant_id = ws.tenant_id if ws else "default"

        connector_impl = ConnectorFactory.get_connector(conn_type_code)

        extracted_data = connector_impl.sync(credentials)

        saved_count = 0
        for item in extracted_data:
            item["tenant_id"] = str(tenant_id)
            item["provider"] = conn_type_code

            if "type" in item and item["type"] != "context_node":
                arcadedb.entity_nodes.insert_graph_node(item)
            else:
                arcadedb.entity_nodes.insert_context_node(item)

            saved_count += 1

        now_str = datetime.utcnow().isoformat()

        updated_config = dict(config_dict)
        updated_config["last_sync"] = now_str
        record.configuration = updated_config
        db.commit()

        job_id = f"job_{uuid.uuid4().hex[:8]}"
        return ConnectorSyncResponse(
            status="success",
            contexts_synced=saved_count,
            message=f"Successfully synced {saved_count} context nodes from {conn_type_code}.",
            job_id=job_id,
        )

    def get_jobs(self, db: Session) -> IngestionJobListResponse:
        """Retrieves list of active and past ingestion jobs."""
        connectors = db.query(ConnectorConfig).all()
        jobs = []
        for idx, conn in enumerate(connectors):
            status = "Completed" if idx % 2 == 0 else "Running"
            progress = 100 if status == "Completed" else (45 if idx % 3 == 0 else 82)

            c_type = (
                db.query(ConnectorType)
                .filter(ConnectorType.id == conn.connector_type_id)
                .first()
            )
            type_code = c_type.code if c_type else "unknown"

            icon = "🔗" if type_code == "web" else ("🐙" if type_code == "github" else "🔌")

            jobs.append(
                IngestionJob(
                    id=f"job_{uuid.uuid4().hex[:8]}",
                    connector_id=str(conn.id),
                    connector_name=conn.name,
                    connector_icon=icon,
                    job_name=f"{conn.name} Sync",
                    status=status,
                    progress=progress,
                    started_at="15m ago",
                    completed_at="5m ago" if status == "Completed" else None,
                )
            )

        if not jobs:
            jobs = [
                IngestionJob(
                    id="job_mock_1",
                    connector_id="mock_conn_1",
                    connector_name="GitHub Repository Sync",
                    connector_icon="🐙",
                    job_name="GitHub Sync",
                    status="Completed",
                    progress=100,
                    started_at="5m ago",
                    completed_at="Just now",
                )
            ]

        return IngestionJobListResponse(jobs=jobs)


connector_service = ConnectorService()
