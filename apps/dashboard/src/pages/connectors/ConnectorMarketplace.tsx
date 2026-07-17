import React from 'react';
import { Link } from 'react-router-dom';

export default function ConnectorMarketplace() {
  const connectors = [
    { name: 'GitHub', icon: '🐙', desc: 'Sync PRs, Issues, and Code', color: '#fff' },
    { name: 'Slack', icon: '💬', desc: 'Ingest channels and DMs', color: '#E01E5A' },
    { name: 'Jira', icon: '🎫', desc: 'Agile epics and tickets', color: '#0052CC' },
    { name: 'Notion', icon: '📓', desc: 'Internal docs and wikis', color: '#fff' },
    { name: 'Confluence', icon: '📘', desc: 'Enterprise knowledge base', color: '#172B4D' },
    { name: 'Google Drive', icon: '📁', desc: 'Docs, Sheets, and Slides', color: '#0F9D58' },
  ];

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Connector Marketplace</h1>
        <p>Browse and install first-party data integrations for OpenContextPlatform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {connectors.map(c => (
          <div key={c.name} className="widget" style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px', marginRight: '16px' }}>{c.icon}</span>
              <h2 style={{ fontSize: '18px', margin: 0 }}>{c.name}</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', flex: 1 }}>{c.desc}</p>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/connectors/create" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px', textDecoration: 'none' }}>Install</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
