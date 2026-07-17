import uuid
import json
from typing import List
from datetime import datetime
from apps.api.app.modules.connectors.schemas import Connector, ConnectorCreateRequest, ConnectorSyncResponse
from sqlalchemy.orm import Session
from runtime.models import ConnectorConfig
from runtime.memory_engine import MemoryEngine
from packages.connector_sdk.factory import ConnectorFactory

class ConnectorService:
    def get_connectors(self, org_id: str, db: Session) -> List[Connector]:
        """Retrieves configured connectors from PostgreSQL."""
        results = db.query(ConnectorConfig).filter(ConnectorConfig.tenant_id == org_id).all()
        connectors = []
        for row in results:
            # We parse some metadata out of credentials_json if needed, for now mock status/last_sync
            config = {}
            if row.credentials_json:
                try:
                    config = json.loads(row.credentials_json)
                except:
                    pass
            connectors.append(
                Connector(
                    id=row.id,
                    name=row.name,
                    icon="🔌",
                    status=config.get("status", "Active"),
                    last_sync=config.get("last_sync", "Never"),
                    details=f"Type: {row.connector_type}"
                )
            )
        return connectors

    def create_connector(self, org_id: str, request: ConnectorCreateRequest, db: Session) -> Connector:
        """Registers a new connector config into PostgreSQL."""
        conn_id = f"conn_{uuid.uuid4().hex[:8]}"
        config_json = json.dumps({
            **request.config,
            "status": "Active",
            "last_sync": "Never"
        })
        
        new_conn = ConnectorConfig(
            id=conn_id,
            tenant_id=org_id,
            name=request.name,
            connector_type=request.type,
            credentials_json=config_json
        )
        db.add(new_conn)
        db.commit()
        
        return Connector(
            id=conn_id,
            name=request.name,
            icon="🔌",
            status="Active",
            last_sync="Never",
            details=f"Type: {request.type}"
        )
        
    def sync_connector(self, connector_id: str, db: Session, memory: MemoryEngine) -> ConnectorSyncResponse:
        """Runs an ingestion job using the Connector SDK and MemoryEngine."""
        # 1. Fetch connector config
        record = db.query(ConnectorConfig).filter(ConnectorConfig.id == connector_id).first()
        if not record:
            raise ValueError(f"Connector {connector_id} not found")
            
        conn_type = record.connector_type
        config = {}
        if record.credentials_json:
            try:
                config = json.loads(record.credentials_json)
            except:
                pass
            
        tenant_id = record.tenant_id or "default"
            
        # 2. Instantiate Connector SDK
        connector_impl = ConnectorFactory.get_connector(conn_type)
        
        # 3. Extract Raw Data
        extracted_data = connector_impl.sync(config)
        
        # 4. Save to MemoryEngine
        saved_count = 0
        for item in extracted_data:
            item["tenant_id"] = tenant_id
            item["provider"] = conn_type
            memory.save_memory(item)
            saved_count += 1
            
        # 5. Update last sync time
        now_str = datetime.utcnow().isoformat()
        config["last_sync"] = now_str
        record.credentials_json = json.dumps(config)
        db.commit()
            
        return ConnectorSyncResponse(
            status="success",
            contexts_synced=saved_count,
            message=f"Successfully synced {saved_count} context nodes from {conn_type}."
        )

connector_service = ConnectorService()
