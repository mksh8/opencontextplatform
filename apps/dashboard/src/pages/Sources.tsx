import React from 'react';

export default function Sources() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Sources</h1>
          <p>Manage raw data origins for your connectors.</p>
        </div>
        <button className="btn btn-primary">+ Add Source</button>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Source Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Connector Type</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Items Synced</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Engineering Monorepo</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>GitHub</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>1.2M lines</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>#architecture-decisions</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Slack</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>4.5K messages</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
