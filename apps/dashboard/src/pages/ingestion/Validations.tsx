import React from 'react';

export default function Validations() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Ingestion Validations</h1>
          <p>Reject malformed payloads before they pollute the knowledge graph.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>Save JSON Schema</button>
      </div>

      <div className="widget" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>JSONSchema Validation Rule</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Payloads failing this schema will be routed to the Dead Letter Queue (DLQ).</p>
        
        <textarea 
          defaultValue={`{
  "type": "object",
  "required": ["issue"],
  "properties": {
    "issue": {
      "type": "object",
      "required": ["title", "body"],
      "properties": {
        "title": { "type": "string", "minLength": 5 },
        "body": { "type": "string", "minLength": 10 }
      }
    }
  }
}`}
          style={{ width: '100%', height: '300px', padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#fff', fontFamily: 'monospace', resize: 'vertical' }}
        />
      </div>
    </div>
  );
}
