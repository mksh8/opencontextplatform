import React from 'react';
import { Link } from 'react-router-dom';

export default function ConnectorDetails() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>mksh8/opencontextplatform</h1>
          <p>GitHub Integration | Target: Engineering Specs</p>
        </div>
        <div>
          <button className="btn btn-primary" style={{ padding: '10px 16px' }}>Force Sync Now</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        <Link to="/connectors/auth" className="widget" style={{ flex: 1, textDecoration: 'none', padding: '24px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <h3 style={{ color: 'var(--accent-blue)', marginBottom: '8px' }}>Authentication</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>OAuth Tokens & API Keys</p>
        </Link>
        <Link to="/connectors/scheduling" className="widget" style={{ flex: 1, textDecoration: 'none', padding: '24px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <h3 style={{ color: 'var(--accent-green)', marginBottom: '8px' }}>Scheduling</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Cron jobs & Webhooks</p>
        </Link>
        <Link to="/connectors/sync" className="widget" style={{ flex: 1, textDecoration: 'none', padding: '24px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
          <h3 style={{ color: 'var(--accent-purple)', marginBottom: '8px' }}>Sync History</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Ingestion logs & records</p>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Contexts Ingested</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>1,248</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Last Sync</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>42 mins ago</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Uptime</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-green)' }}>99.9%</p>
        </div>
      </div>
    </div>
  );
}
