import React from 'react';

export default function CostAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Cost Analytics</h1>
        <p>Token usage, vector storage costs, and Stripe billing projections.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>MTD Spend</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>$1,245.50</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Projected EOM</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>$3,100.00</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Most Expensive LLM</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-purple)' }}>GPT-4o</p>
        </div>
      </div>
    </div>
  );
}
