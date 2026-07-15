import React from 'react';
import { Link } from 'react-router-dom';

export default function AllContexts() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>All Contexts</h1>
          <p>Global registry of all ingested multi-modal knowledge nodes.</p>
        </div>
        <Link to="/contexts/create" className="btn btn-primary" style={{ padding: '10px 16px', textDecoration: 'none' }}>+ Create Context</Link>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>ID</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Source</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Type</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Tokens</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}>ctx_9f8a2</td>
              <td style={{ padding: '12px' }}>github/PR-142</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-purple)', borderRadius: '4px', fontSize: '12px' }}>Pull Request</span></td>
              <td style={{ padding: '12px' }}>1,240</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-green)' }}>● Indexed</span></td>
              <td style={{ padding: '12px' }}><Link to="/contexts/details" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>View Details</Link></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}>ctx_2b1c4</td>
              <td style={{ padding: '12px' }}>slack/C01A...</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)', borderRadius: '4px', fontSize: '12px' }}>Message</span></td>
              <td style={{ padding: '12px' }}>45</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-green)' }}>● Indexed</span></td>
              <td style={{ padding: '12px' }}><Link to="/contexts/details" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>View Details</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
