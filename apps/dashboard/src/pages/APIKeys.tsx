import React from 'react';

export default function APIKeys() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>API Keys</h1>
          <p>Manage API keys and tokens.</p>
        </div>
        <button className="btn btn-primary">+ Create API Key</button>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Key</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Scopes</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Created</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Production Key</td>
              <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>ocp_live_••••••••</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>All</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>May 10, 2024</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Development Key</td>
              <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>ocp_dev_••••••••</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Read, Write</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>May 11, 2024</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Read Only Key</td>
              <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>ocp_ro_••••••••</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Read</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>May 12, 2024</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Service Key</td>
              <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>ocp_svc_••••••••</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>All</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>May 13, 2024</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator" style={{ color: '#ff7b72' }}><div className="dot" style={{ background: '#ff7b72' }}></div> Revoked</div></td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
