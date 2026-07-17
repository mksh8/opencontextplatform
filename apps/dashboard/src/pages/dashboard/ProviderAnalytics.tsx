import React from 'react';

export default function ProviderAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Provider Analytics</h1>
        <p>Latency and success rates across all connected model providers.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Best Latency</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-blue)' }}>Groq (18ms)</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>API Error Rate</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>0.01%</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Rate Limit Hits</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-orange)' }}>12</p>
        </div>
      </div>
    </div>
  );
}
