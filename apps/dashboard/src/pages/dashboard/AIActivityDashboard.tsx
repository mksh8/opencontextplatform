import React from 'react';

export default function AIActivityDashboard() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>AI Activity Dashboard</h1>
        <p>Real-time monitor of LLM generations and RAG reasoning paths.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Generations (24h)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>1.2M</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Avg Time to First Token</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>240ms</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Hallucination Rate</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-green)' }}>0.02%</p>
        </div>
      </div>
    </div>
  );
}
