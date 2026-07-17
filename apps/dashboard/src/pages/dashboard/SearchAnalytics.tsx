import React from 'react';

export default function SearchAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Search Analytics</h1>
        <p>Popular semantic queries and Reciprocal Rank Fusion latency.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Hybrid Queries (24h)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>85.2K</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Avg Search Latency</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>112ms</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Zero-Result Rate</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-green)' }}>1.2%</p>
        </div>
      </div>
    </div>
  );
}
