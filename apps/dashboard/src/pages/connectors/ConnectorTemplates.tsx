import React from 'react';
import { Link } from 'react-router-dom';

export default function ConnectorTemplates() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Connector Templates</h1>
          <p>Pre-built, community-driven configurations for standard data pipelines.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div className="widget" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Salesforce Sync</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Standard configuration to pull Accounts, Contacts, and Opportunities into the graph.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>Official</span>
            <Link to="/connectors/create" className="btn btn-secondary" style={{ padding: '6px 12px', textDecoration: 'none' }}>Use Template</Link>
          </div>
        </div>

        <div className="widget" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Zendesk Support Base</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Ingest all public help center articles and categorize them automatically.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>Official</span>
            <Link to="/connectors/create" className="btn btn-secondary" style={{ padding: '6px 12px', textDecoration: 'none' }}>Use Template</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
