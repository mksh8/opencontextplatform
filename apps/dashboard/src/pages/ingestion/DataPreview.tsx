import React from 'react';

export default function DataPreview() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Data Preview</h1>
        <p>Inspect raw JSON payloads arriving from the Connectors before ETL transformation.</p>
      </div>

      <div className="widget" style={{ padding: 0, display: 'flex', minHeight: '600px' }}>
        <div style={{ width: '300px', borderRight: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 500 }}>Incoming Payloads</div>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(139, 92, 246, 0.1)', cursor: 'pointer' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent-purple)' }}>github.issue.opened</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>payload_9a8f2 (2 mins ago)</div>
          </div>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
            <div style={{ fontSize: '13px', fontWeight: 500 }}>slack.message.posted</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>payload_b412x (5 mins ago)</div>
          </div>
        </div>
        
        <div style={{ flex: 1, padding: '24px', background: '#0d1117', color: '#c9d1d9', fontFamily: 'monospace', fontSize: '13px', overflowY: 'auto' }}>
          <pre style={{ margin: 0 }}>
{`{
  "action": "opened",
  "issue": {
    "url": "https://api.github.com/repos/mksh8/opencontextplatform/issues/21",
    "id": 194123412,
    "number": 21,
    "title": "[BUG] Dead Letter Queue not rendering",
    "user": {
      "login": "dev_jane",
      "id": 918231
    },
    "body": "When navigating to the DLQ, the table is empty despite there being 5 rejected payloads.",
    "created_at": "2024-10-24T14:32:00Z"
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
