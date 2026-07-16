import React from 'react';

export default function CollectionAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Collection Analytics</h1>
        <p>Telemetry isolated to the "Engineering Specs" collection.</p>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Queries (7d)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>8,421</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Tokens Consumed</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>4.2M</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Est. Cost (MTD)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-orange)' }}>$124.50</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="widget" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Top Sub-Collections Chart loading...</p>
        </div>
        <div className="widget" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Most Accessed Contexts list loading...</p>
        </div>
      </div>
    </div>
  );
}
