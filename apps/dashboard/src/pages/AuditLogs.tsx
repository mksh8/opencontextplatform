import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const MOCK_AUDIT_LOGS = [
  { time: 'May 21, 2025 10:24:31 AM', user: { name: 'Mukesh Kumar', email: 'admin@acme.com', init: 'MK', bg: '#8b5cf6' }, action: 'User Login', resource: 'Authentication', resourceId: '-', ip: '203.0.113.45', status: 'Success' },
  { time: 'May 21, 2025 10:15:12 AM', user: { name: 'Sara Chen', email: 'sara.chen@acme.com', init: 'SC', bg: '#3b82f6' }, action: 'Created Project', resource: 'Project', resourceId: 'proj_8f3a7b', ip: '203.0.113.66', status: 'Success' },
  { time: 'May 21, 2025 10:10:05 AM', user: { name: 'Rohit Patel', email: 'rohit.patel@acme.com', init: 'RP', bg: '#10b981' }, action: 'Updated User Role', resource: 'User', resourceId: 'user_3c91ab', ip: '203.0.113.12', status: 'Success' },
  { time: 'May 21, 2025 09:58:44 AM', user: { name: 'Sara Chen', email: 'sara.chen@acme.com', init: 'SC', bg: '#3b82f6' }, action: 'Deleted API Key', resource: 'API Key', resourceId: 'api_1e7d9c', ip: '203.0.113.66', status: 'Failed' },
  { time: 'May 21, 2025 09:42:19 AM', user: { name: 'Alex Morgan', email: 'alex.morgan@acme.com', init: 'AM', bg: '#f59e0b' }, action: 'Updated Settings', resource: 'Organization', resourceId: 'org_8f3a7b', ip: '203.0.113.77', status: 'Success' },
  { time: 'May 21, 2025 09:30:11 AM', user: { name: 'Mukesh Kumar', email: 'admin@acme.com', init: 'MK', bg: '#8b5cf6' }, action: 'Invited User', resource: 'User', resourceId: 'user_7b2d1f', ip: '203.0.113.45', status: 'Success' },
  { time: 'May 21, 2025 09:15:00 AM', user: { name: 'Rohit Patel', email: 'rohit.patel@acme.com', init: 'RP', bg: '#10b981' }, action: 'Accessed Data', resource: 'Dataset', resourceId: 'ds_9a0f21', ip: '203.0.113.12', status: 'Success' },
  { time: 'May 21, 2025 09:02:33 AM', user: { name: 'Sara Chen', email: 'sara.chen@acme.com', init: 'SC', bg: '#3b82f6' }, action: 'Exported Data', resource: 'Report', resourceId: 'rpt_2d8c3e', ip: '203.0.113.66', status: 'Success' },
  { time: 'May 21, 2025 08:45:22 AM', user: { name: 'Alex Morgan', email: 'alex.morgan@acme.com', init: 'AM', bg: '#f59e0b' }, action: 'Changed Password', resource: 'User', resourceId: 'user_5e3f2a', ip: '203.0.113.77', status: 'Success' },
  { time: 'May 21, 2025 08:30:10 AM', user: { name: 'Mukesh Kumar', email: 'admin@acme.com', init: 'MK', bg: '#8b5cf6' }, action: 'Disabled User', resource: 'User', resourceId: 'user_0f8b7c', ip: '203.0.113.45', status: 'Warning' }
];

export default function AuditLogs() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleExport = () => {
    showToast('Exporting audit logs as CSV...', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>Audit Logs</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Track and review actions performed across your organization.</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" onClick={handleExport} style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Logs
          </button>
          <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Filters Widget */}
        <div className="widget" style={{ padding: 20, display: 'flex', gap: 24, alignItems: 'flex-end' }}>
          <div style={{ flex: 1.5 }}>
            <label style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>Date Range</label>
            <div style={{ position: 'relative' }}>
              <input type="text" className="input" defaultValue="May 15, 2025 – May 21, 2025" style={{ width: '100%', fontSize: 13 }} />
              <svg style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>User / Actor</label>
            <select className="input" style={{ width: '100%', fontSize: 13 }}>
              <option>All Users</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>Action</label>
            <select className="input" style={{ width: '100%', fontSize: 13 }}>
              <option>All Actions</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>Resource</label>
            <select className="input" style={{ width: '100%', fontSize: 13 }}>
              <option>All Resources</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>Status</label>
            <select className="input" style={{ width: '100%', fontSize: 13 }}>
              <option>All Status</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, paddingBottom: 2 }}>
            <button className="btn btn-primary" style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: 12, padding: '8px 16px' }}>Apply Filters</button>
            <div style={{ color: '#8b5cf6', fontSize: 12, textAlign: 'center', cursor: 'pointer' }}>Reset</div>
          </div>
        </div>

        {/* KPIs Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {[
            { title: 'Total Events', value: '1,248', trend: '↑ 12%', trendType: 'up', icon: <><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></>, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)' },
            { title: 'Users', value: '156', trend: '↑ 8%', trendType: 'up', icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
            { title: 'Successful Events', value: '892', trend: '↑ 15%', trendType: 'up', icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></>, color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
            { title: 'Failed Events', value: '23', trend: '↓ 5%', trendType: 'down', icon: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></>, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
            { title: 'Critical Events', value: '4', trend: '↓ 20%', trendType: 'down', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></>, color: '#d946ef', bg: 'rgba(217, 70, 239, 0.15)' },
          ].map((kpi, i) => (
            <div key={i} className="widget" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {kpi.icon}
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#fff', fontSize: 24, fontWeight: 600, lineHeight: 1, marginBottom: 6 }}>{kpi.value}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{kpi.title}</span>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                <span style={{ color: kpi.trendType === 'up' ? (i === 3 || i === 4 ? '#ef4444' : '#10b981') : (i === 3 || i === 4 ? '#10b981' : '#ef4444') }}>{kpi.trend}</span> vs last 7 days
              </div>
            </div>
          ))}
        </div>

        {/* Table Area */}
        <div className="widget" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Audit Logs</h3>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Showing 1 to 10 of 1,248 events</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                Refresh
              </button>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                Columns
              </button>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 24px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  Time <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 15 12 20 17 15"></polyline><polyline points="7 9 12 4 17 9"></polyline></svg>
                </th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>User / Actor</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Action</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Resource</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Resource ID</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>IP Address</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_AUDIT_LOGS.map((log, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', ':hover': { background: 'rgba(255,255,255,0.02)' } }}>
                  <td style={{ padding: '16px 24px', color: '#fff', whiteSpace: 'nowrap' }}>{log.time}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: log.user.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500 }}>
                        {log.user.init}
                      </div>
                      <div>
                        <div style={{ color: '#fff', marginBottom: 2 }}>{log.user.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{log.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{log.action}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{log.resource}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{log.resourceId}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{log.ip}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 12,
                      background: log.status === 'Success' ? 'rgba(16,185,129,0.1)' : log.status === 'Failed' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                      color: log.status === 'Success' ? '#10b981' : log.status === 'Failed' ? '#ef4444' : '#f59e0b',
                      border: `1px solid ${log.status === 'Success' ? 'rgba(16,185,129,0.2)' : log.status === 'Failed' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}`
                    }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <svg onClick={() => navigate(`/audit/${idx + 1}`)} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Pagination */}
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
              Rows per page
              <select className="input" style={{ width: 64, padding: '4px 8px', fontSize: 12 }}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
              <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>&lt;</button>
              <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#7c3aed', border: 'none', color: '#fff', borderRadius: 4, cursor: 'pointer' }}>1</button>
              <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>2</button>
              <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>3</button>
              <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>4</button>
              <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>5</button>
              <span style={{ color: 'var(--text-secondary)', margin: '0 4px' }}>...</span>
              <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>125</button>
              <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>&gt;</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
