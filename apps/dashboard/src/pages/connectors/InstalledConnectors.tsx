import React from 'react';
import { Link } from 'react-router-dom';

export default function InstalledConnectors() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Installed Connectors</h1>
          <p>Active data pipelines running in this workspace.</p>
        </div>
        <Link to="/connectors/marketplace" className="btn btn-primary" style={{ padding: '10px 16px', textDecoration: 'none' }}>+ Install New</Link>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Integration</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Schedule</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontSize: '24px' }}>🐙</td>
              <td style={{ padding: '12px', fontWeight: 500 }}>mksh8/opencontextplatform</td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>@hourly</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-green)' }}>● Healthy</span></td>
              <td style={{ padding: '12px' }}><Link to="/connectors/details" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>Manage</Link></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontSize: '24px' }}>💬</td>
              <td style={{ padding: '12px', fontWeight: 500 }}>Slack: #engineering</td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Real-time (Webhook)</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)' }}>● Rate Limited</span></td>
              <td style={{ padding: '12px' }}><Link to="/connectors/details" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>Manage</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
