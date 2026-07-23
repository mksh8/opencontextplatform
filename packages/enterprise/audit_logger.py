import json
import logging
import datetime
from typing import Dict, Any

# In a real enterprise system, this would write to a specialized immutable log stream (e.g. AWS CloudWatch, Datadog)
# For OCP Managed SaaS, we write it to PostgreSQL.
logger = logging.getLogger("audit_logger")
logger.setLevel(logging.INFO)

from runtime.db import SessionLocal
from runtime.models import AuditLogEntry
import uuid

class AuditLogger:
    """
    Append-only ledger for all critical data governance actions.
    Emits structured JSON logs and writes to the DB for dashboard querying.
    """
    
    @staticmethod
    def log_event(action: str, actor: str, target: str, status: str, details: Dict[str, Any] = None, tenant_id: str = None):
        """
        Records a compliance event.
        :param action: The action taken (e.g. 'read_context', 'delete_vector')
        :param actor: The identity performing the action (e.g. 'user_123', 'system_cron')
        :param target: The resource being acted upon
        :param status: 'allow', 'deny', 'success', 'failure'
        :param details: Extra metadata
        :param tenant_id: The tenant id
        """
        event = {
            "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
            "action": action,
            "actor": actor,
            "target": target,
            "status": status,
            "details": details or {}
        }
        
        # Write structured JSON to the audit stream
        logger.info(json.dumps(event))
        
        # Persist to DB
        if tenant_id:
            try:
                db = SessionLocal()
                db_entry = AuditLogEntry(
                    id=f"al_{uuid.uuid4().hex[:16]}",
                    tenant_id=tenant_id,
                    actor=actor,
                    action=action,
                    target=target,
                    status=status,
                    details=details or {},
                    timestamp=datetime.datetime.utcnow()
                )
                db.add(db_entry)
                db.commit()
                db.close()
            except Exception as e:
                logger.error(f"Failed to write audit log to DB: {e}")
                
        return event
