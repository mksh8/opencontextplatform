import React from 'react';

export default function Organizations() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Organizations</h1>
          <p>Manage organizations.</p>
        </div>
        <button className="btn btn-primary">+ New Organization</button>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Organization</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Members</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Workspaces</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Plan</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, background: 'var(--accent-purple)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>A</div>
                <div style={{ fontWeight: 500, color: '#fff' }}>Acme Corp</div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>24</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>5</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Enterprise</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, background: 'var(--accent-blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>O</div>
                <div style={{ fontWeight: 500, color: '#fff' }}>Open Source Community</div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>128</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>8</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Community</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, background: 'var(--accent-green)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>S</div>
                <div style={{ fontWeight: 500, color: '#fff' }}>Startup Inc</div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>12</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>3</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Pro</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, background: 'var(--accent-yellow)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>R</div>
                <div style={{ fontWeight: 500, color: '#fff' }}>Research Lab</div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>18</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>4</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Pro</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
