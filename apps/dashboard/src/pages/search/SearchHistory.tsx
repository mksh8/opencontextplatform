import React from 'react';

export default function SearchHistory() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Search History</h1>
        <p>Audit log of all queries executed in this workspace.</p>
      </div>

      <div className="widget" style={{ padding: '0' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 500 }}>"kubernetes deployment strategies"</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>2 mins ago</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <span>Type: <span style={{ color: 'var(--accent-blue)' }}>Hybrid</span></span>
            <span>Latency: 142ms</span>
            <span>Results Clicked: ctx_b214c</span>
            <span>By: dev_jane</span>
          </div>
        </div>
        
        <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 500 }}>MATCH (u:User)-[:OWNS]->(c:Context)</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>1 hour ago</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <span>Type: <span style={{ color: 'var(--accent-purple)' }}>Graph</span></span>
            <span>Latency: 310ms</span>
            <span>Results: 14 nodes</span>
            <span>By: admin_bob</span>
          </div>
        </div>
      </div>
    </div>
  );
}
