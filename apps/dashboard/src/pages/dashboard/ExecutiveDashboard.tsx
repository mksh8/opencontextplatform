import React from 'react';

export default function ExecutiveDashboard() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Executive Dashboard</h1>
        <p>High-level KPIs across the entire OpenContextPlatform</p>
      </div>
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Active Tenants</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>1,248</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Ingested Data</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>42.8 TB</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Context Nodes</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>945.2M</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Monthly Active Agents</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>8,450</p>
        </div>
      </div>
      <div className="widget" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Executive Summary Charts loading...</p>
      </div>
    </div>
  );
}
