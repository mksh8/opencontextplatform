import React from 'react';

export default function Members() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Members</h1>
          <p>Manage members in your organization.</p>
        </div>
        <button className="btn btn-primary">+ Invite Member</button>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Member</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Role</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Last Active</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Mukesh+Kumar&background=10b981&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 500, color: '#fff' }}>Mukesh Kumar</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>mukesh@example.com</div>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Owner</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Just now</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Alice+Johnson&background=8b5cf6&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 500, color: '#fff' }}>Alice Johnson</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>alice@example.com</div>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Admin</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>5m ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Bob+Smith&background=3b82f6&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 500, color: '#fff' }}>Bob Smith</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>bob@example.com</div>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Member</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>1h ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Charlie+Brown&background=eab308&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 500, color: '#fff' }}>Charlie Brown</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>charlie@example.com</div>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Member</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2h ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Diana+Prince&background=ff7b72&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 500, color: '#fff' }}>Diana Prince</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>diana@example.com</div>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Viewer</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator" style={{ color: 'var(--text-secondary)' }}><div className="dot" style={{ background: 'var(--text-secondary)' }}></div> Inactive</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2d ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
