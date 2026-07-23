import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrganizationGroups() {
  const navigate = useNavigate();
  const metrics = [
    { label: 'Total Groups', value: '36', trend: '↑ 15% this month', trendColor: '#10b981', icon: '👥', iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8b5cf6' },
    { label: 'Active Groups', value: '32', trend: '↑ 12% this month', trendColor: '#10b981', icon: '✓', iconBg: 'rgba(16, 185, 129, 0.1)', iconColor: '#10b981' },
    { label: 'Inactive Groups', value: '4', trend: '↑ 5% this month', trendColor: '#10b981', icon: '⏸️', iconBg: 'rgba(245, 158, 11, 0.1)', iconColor: '#f59e0b' },
    { label: 'Users in Groups', value: '186', trend: '↑ 10% this month', trendColor: '#10b981', icon: '👥', iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3b82f6' },
  ];

  const groups = [
    { initials: 'PA', name: 'Platform Admins', desc: 'Full access to platform settings and management', dept: 'Administration', users: 8, status: 'Active', statusColor: '#10b981', created: 'May 01, 2024 10:00 AM', avatarBg: '#8b5cf6' },
    { initials: 'DV', name: 'Developers', desc: 'Access to development resources and tools', dept: 'Engineering', users: 42, status: 'Active', statusColor: '#10b981', created: 'Apr 25, 2024 09:30 AM', avatarBg: '#3b82f6' },
    { initials: 'DS', name: 'Data Scientists', desc: 'Access to data and analytics tools', dept: 'Data Science', users: 28, status: 'Active', statusColor: '#10b981', created: 'Apr 20, 2024 02:15 PM', avatarBg: '#8b5cf6' },
    { initials: 'HR', name: 'HR Team', desc: 'Human resources and employee management', dept: 'Human Resources', users: 15, status: 'Inactive', statusColor: '#ef4444', created: 'Apr 15, 2024 11:45 AM', avatarBg: '#f43f5e' },
    { initials: 'ST', name: 'Support Team', desc: 'Customer support and ticket management', dept: 'Customer Success', users: 23, status: 'Active', statusColor: '#10b981', created: 'Apr 10, 2024 03:20 PM', avatarBg: '#8b5cf6' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>Groups</h1>
          <p style={{ marginTop: 8 }}>Manage groups and set permissions for users.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/groups/create')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>+</span> New Group
          </button>
          <button className="btn" style={{ padding: '8px 12px' }}>⋮</button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, overflowX: 'auto' }}>
        {metrics.map((m, i) => (
          <div key={i} className="widget" style={{ flex: 1, minWidth: 200, padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, background: m.iconBg, color: m.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {m.icon}
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 12, color: m.trendColor, display: 'flex', alignItems: 'center', gap: 4 }}>
                {m.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 280 }}>
          <svg style={{ position: 'absolute', left: 12, top: 10, color: 'var(--text-secondary)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search groups..." style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 12px 8px 36px', color: '#fff', fontSize: 13, outline: 'none' }} />
        </div>
        <select style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 32px 8px 12px', color: '#fff', fontSize: 13, outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px top 50%', backgroundSize: '10px auto' }}>
          <option>All Status</option>
        </select>
        <select style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 32px 8px 12px', color: '#fff', fontSize: 13, outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px top 50%', backgroundSize: '10px auto' }}>
          <option>All Departments</option>
        </select>
        <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters
        </button>
      </div>

      {/* Main Table */}
      <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Group Name</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Description</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Department</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Users</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Created On</th>
                <th style={{ padding: '16px 24px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g, i) => (
                <tr key={i} onClick={() => navigate('/groups/1')} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: g.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                        👥
                      </div>
                      <div style={{ fontWeight: 500, color: '#fff' }}>{g.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{g.desc}</td>
                  <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{g.dept}</td>
                  <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{g.users}</td>
                  <td style={{ padding: '16px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: g.statusColor }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: g.statusColor }}></div>
                      {g.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{g.created}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Pagination */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: 13, background: 'rgba(0,0,0,0.1)' }}>
          <div>Showing 1 to 5 of 36 groups</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn" style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>&lt;</button>
            <button className="btn btn-primary" style={{ padding: '4px 12px' }}>1</button>
            <button className="btn" style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>2</button>
            <button className="btn" style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>3</button>
            <span style={{ padding: '4px 8px', display: 'flex', alignItems: 'center' }}>...</span>
            <button className="btn" style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>8</button>
            <button className="btn" style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
