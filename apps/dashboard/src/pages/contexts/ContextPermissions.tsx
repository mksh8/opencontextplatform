import React from 'react';

export default function ContextPermissions() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Context Permissions</h1>
        <p>Manage RBAC policies and ACLs for ctx_9f8a2.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="widget">
          <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Inherited Permissions</h2>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>Workspace: Engineering Core</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>All users in Engineering Core have READ access.</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>Role: Admin</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>All Admins have WRITE access.</div>
          </div>
        </div>

        <div className="widget">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px' }}>Direct Grants</h2>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>+ Grant Access</button>
          </div>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Identity</th>
                <th style={{ padding: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Level</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 8px' }}>dev_jane (User)</td>
                <td style={{ padding: '12px 8px' }}><span style={{ color: 'var(--accent-blue)' }}>OWNER</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 8px' }}>ci_bot_1 (Service)</td>
                <td style={{ padding: '12px 8px' }}><span style={{ color: 'var(--accent-green)' }}>READ</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
