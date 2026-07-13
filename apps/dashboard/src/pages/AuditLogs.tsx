import React from 'react';

export default function AuditLogs() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Audit Logs</h1>
          <p>View system audit logs.</p>
        </div>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>User</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Action</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Resource</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>IP Address</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Mukesh+Kumar&background=10b981&color=fff" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <span style={{ fontWeight: 500, color: '#fff' }}>Mukesh Kumar</span>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Updated Context</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Context #1234</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>192.168.1.1</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2m ago</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Alice+Johnson&background=8b5cf6&color=fff" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <span style={{ fontWeight: 500, color: '#fff' }}>Alice Johnson</span>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Created Memory</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Context #5678</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>192.168.1.2</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>5m ago</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Bob+Smith&background=3b82f6&color=fff" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <span style={{ fontWeight: 500, color: '#fff' }}>Bob Smith</span>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Deleted Context</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Context #9012</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>192.168.1.3</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>15m ago</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Charlie+Brown&background=eab308&color=fff" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <span style={{ fontWeight: 500, color: '#fff' }}>Charlie Brown</span>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Added Member</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Member #4321</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>192.168.1.4</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>1h ago</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Diana+Prince&background=ff7b72&color=fff" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                <span style={{ fontWeight: 500, color: '#fff' }}>Diana Prince</span>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Changed Settings</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Settings</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>192.168.1.5</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2h ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
