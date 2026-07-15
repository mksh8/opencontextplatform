import React from 'react';

export default function ContextHealth() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Context Health</h1>
        <p>Monitor chunking efficiency, orphaned nodes, and vector quality.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Orphaned Nodes</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-orange)' }}>14,230</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Vector Density</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>94%</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Graph Connectivity</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>High</p>
        </div>
      </div>
    </div>
  );
}
