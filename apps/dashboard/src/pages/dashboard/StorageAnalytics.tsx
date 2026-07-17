import React from 'react';

export default function StorageAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Storage Analytics</h1>
        <p>ArcadeDB consumption breakdown between Vectors and Graph Edges.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Vector Storage</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>38.4 TB</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Graph Edges</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>12.1B</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Disk Utilization</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-orange)' }}>78%</p>
        </div>
      </div>
    </div>
  );
}
