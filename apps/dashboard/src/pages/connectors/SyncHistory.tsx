import React from 'react';
import { Link } from 'react-router-dom';

export default function SyncHistory() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Sync History</h1>
        <p>Audit log of past ingestion runs for this pipeline.</p>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Run ID</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Trigger</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Started</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Duration</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Records</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>run_a92f1</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)', borderRadius: '4px', fontSize: '12px' }}>Schedule</span></td>
              <td style={{ padding: '12px' }}>42 mins ago</td>
              <td style={{ padding: '12px' }}>45s</td>
              <td style={{ padding: '12px' }}>+12 nodes</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-green)' }}>● Success</span></td>
              <td style={{ padding: '12px' }}><Link to="/connectors/logs" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>View Logs</Link></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>run_8f11a</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-purple)', borderRadius: '4px', fontSize: '12px' }}>Manual</span></td>
              <td style={{ padding: '12px' }}>3 hours ago</td>
              <td style={{ padding: '12px' }}>12s</td>
              <td style={{ padding: '12px' }}>0 nodes</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)' }}>● Failed</span></td>
              <td style={{ padding: '12px' }}><Link to="/connectors/logs" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>View Logs</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
