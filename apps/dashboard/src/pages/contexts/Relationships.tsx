import React from 'react';

export default function Relationships() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Graph Relationships</h1>
          <p>Edges connecting ctx_9f8a2 to the rest of the knowledge graph.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>+ Link Node</button>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Target Node</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Relationship Type</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Direction</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', color: 'var(--accent-blue)' }}>usr_jane</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', fontSize: '12px' }}>AUTHORED_BY</span></td>
              <td style={{ padding: '12px' }}>Outbound →</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)', cursor: 'pointer' }}>Remove</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', color: 'var(--accent-blue)' }}>repo_auth_svc</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-purple)', borderRadius: '4px', fontSize: '12px' }}>BELONGS_TO</span></td>
              <td style={{ padding: '12px' }}>Outbound →</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)', cursor: 'pointer' }}>Remove</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
