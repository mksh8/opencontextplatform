import React from 'react';

export default function ConnectorLogs() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Worker Logs</h1>
        <p>Raw stdout/stderr stream from run_8f11a.</p>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '16px' }}>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 500, fontSize: '14px' }}>Log Stream</span>
          <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer' }}>Download .log</span>
        </div>
        <div style={{ 
          flex: 1, 
          padding: '24px', 
          background: '#0d1117', 
          color: '#c9d1d9', 
          fontFamily: 'monospace', 
          fontSize: '13px', 
          lineHeight: '1.6',
          overflowY: 'auto'
        }}>
          <div>[2024-10-24 14:00:01] INFO: Initializing GitHub connector task...</div>
          <div>[2024-10-24 14:00:02] INFO: Connecting to target repo mksh8/opencontextplatform...</div>
          <div>[2024-10-24 14:00:02] INFO: Fetched 45 new PR events since last checkpoint.</div>
          <div style={{ color: '#ff7b72' }}>[2024-10-24 14:00:05] ERROR: GitHub API rate limit exceeded. Retry-After: 3600s.</div>
          <div style={{ color: '#ff7b72' }}>[2024-10-24 14:00:05] ERROR: Task run_8f11a failed. Exiting worker loop.</div>
        </div>
      </div>
    </div>
  );
}
