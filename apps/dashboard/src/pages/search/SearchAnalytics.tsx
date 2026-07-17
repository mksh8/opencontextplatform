import React from 'react';

export default function SearchAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Search Analytics</h1>
        <p>Performance metrics and query trends across the platform.</p>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Queries (24h)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>14,592</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Avg Latency (Semantic)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-green)' }}>85ms</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Avg Latency (Hybrid)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-blue)' }}>140ms</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Zero-Result Rate</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-orange)' }}>2.4%</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="widget" style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Query Volume over Time (Chart loading...)</p>
        </div>
        <div className="widget">
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Top Search Terms</h3>
          <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', lineHeight: '2' }}>
            <li>"API rate limits"</li>
            <li>"Onboarding flow"</li>
            <li>"Stripe webhook"</li>
            <li>"Redis connection"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
