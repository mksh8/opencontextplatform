import React from 'react';

export default function WorkspaceAnalytics() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Workspace Analytics</h1>
        <p>Activity heatmap and collaboration metrics per workspace.</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Most Active Workspace</h3>
          <p style={{ fontSize: '24px', fontWeight: '600' }}>Engineering - Core</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Cross-Workspace Queries</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>14,500</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Active Collaborators</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>234</p>
        </div>
      </div>
    </div>
  );
}
