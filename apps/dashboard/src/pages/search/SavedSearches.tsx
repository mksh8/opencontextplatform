import React from 'react';

export default function SavedSearches() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Saved Searches</h1>
          <p>Parametrized queries saved for recurring retrieval tasks.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>+ Save Current Query</button>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Type</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Query Payload</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>Latest HR Policies</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)', borderRadius: '4px', fontSize: '12px' }}>Hybrid</span></td>
              <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--text-secondary)' }}>"employee handbook updates"</td>
              <td style={{ padding: '12px' }}><button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>Run</button></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>Orphaned Contexts</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-purple)', borderRadius: '4px', fontSize: '12px' }}>Graph</span></td>
              <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--text-secondary)' }}>MATCH (c:Context) WHERE NOT (c)-[]-() RETURN c</td>
              <td style={{ padding: '12px' }}><button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>Run</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
