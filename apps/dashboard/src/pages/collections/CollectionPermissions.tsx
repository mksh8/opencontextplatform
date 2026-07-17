import React from 'react';

export default function CollectionPermissions() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Collection Permissions</h1>
          <p>Manage RBAC policies for the "Engineering Specs" collection.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>+ Assign Role</button>
      </div>

      <div className="widget">
        <h2 style={{ fontSize: '16px', marginBottom: '8px' }}>Boundary Policies</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>Permissions granted here cascade down to all 14,230 contexts inside this collection.</p>

        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Identity (User/Group)</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Role</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Granted By</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>Group: Platform Engineers</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-blue)' }}>COLLECTION_ADMIN</span></td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>System</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)', cursor: 'pointer' }}>Revoke</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>User: usr_jane</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-green)' }}>CONTRIBUTOR</span></td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>admin_bob</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)', cursor: 'pointer' }}>Revoke</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
