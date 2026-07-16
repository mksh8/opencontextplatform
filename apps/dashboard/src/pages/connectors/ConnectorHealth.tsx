import React from 'react';

export default function ConnectorHealth() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Health Telemetry</h1>
        <p>API rate limit and uptime tracking for GitHub pipeline.</p>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>API Calls (24h)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>4,520</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Rate Limit Cap</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-orange)' }}>85%</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Processing Latency</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>245ms</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="widget" style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>API Rate Limit Burn Down (Chart loading...)</p>
        </div>
        <div className="widget">
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Recent Failures</h3>
          <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', lineHeight: '2' }}>
            <li><span style={{ color: 'var(--accent-orange)' }}>HTTP 429</span> Too Many Requests</li>
            <li><span style={{ color: 'var(--accent-orange)' }}>HTTP 403</span> Forbidden (Token expired)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
