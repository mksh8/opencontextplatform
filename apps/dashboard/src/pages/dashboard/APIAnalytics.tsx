import React from 'react';

export default function APIAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>API Analytics</h1>
        <p>Rate limits, 4xx/5xx error tracking, and overall API health.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Requests per minute</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>4,250</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>P99 Latency</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>340ms</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>5xx Errors</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-green)' }}>0</p>
        </div>
      </div>
    </div>
  );
}
