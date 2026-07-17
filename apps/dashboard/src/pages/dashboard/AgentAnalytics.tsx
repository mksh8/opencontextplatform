import React from 'react';

export default function AgentAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Agent Analytics</h1>
        <p>Tool usage, action execution rates, and autonomous loop limits.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Executions</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>142.5K</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Most Used Tool</h3>
          <p style={{ fontSize: '24px', fontWeight: '600', color: 'var(--accent-purple)' }}>HybridSearchTool</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Max Loop Exhaustion</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-orange)' }}>14%</p>
        </div>
      </div>
    </div>
  );
}
