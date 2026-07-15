import React from 'react';

export default function MetadataViewer() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Metadata & Tags</h1>
          <p>Custom key-value pairs assigned to ctx_9f8a2.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>+ Add Field</button>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Key</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Value</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Source</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>author_email</td>
              <td style={{ padding: '12px' }}>jane@acme.com</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', fontSize: '12px' }}>System Extracted</span></td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)', cursor: 'pointer' }}>Delete</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>environment</td>
              <td style={{ padding: '12px' }}>production</td>
              <td style={{ padding: '12px' }}><span style={{ padding: '4px 8px', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-purple)', borderRadius: '4px', fontSize: '12px' }}>User Defined</span></td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)', cursor: 'pointer' }}>Delete</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
