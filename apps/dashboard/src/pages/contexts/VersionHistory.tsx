import React from 'react';

export default function VersionHistory() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Version History</h1>
        <p>Immutable audit trail of changes to context node ctx_9f8a2.</p>
      </div>

      <div className="widget" style={{ padding: '0' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff', marginBottom: '4px' }}>v2.0 (Current)</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Updated by sys_ingestion_bot • 2 mins ago</div>
          </div>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>View Diff</button>
        </div>
        
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff', marginBottom: '4px' }}>v1.1</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Updated by usr_admin_999 • 14 days ago</div>
          </div>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>View Diff</button>
        </div>

        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff', marginBottom: '4px' }}>v1.0 (Creation)</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Ingested by GithubConnector • Oct 24, 2024</div>
          </div>
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>View Diff</button>
        </div>
      </div>
    </div>
  );
}
