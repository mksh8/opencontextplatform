import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrganizationUsers() {
  const navigate = useNavigate();
  const metrics = [
    { label: 'Total Users', value: '248', trend: '↑ 18% this month', trendColor: '#10b981', icon: '👥', iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3b82f6' },
    { label: 'Active Users', value: '186', trend: '↑ 22% this month', trendColor: '#10b981', icon: '✓', iconBg: 'rgba(16, 185, 129, 0.1)', iconColor: '#10b981' },
    { label: 'New Users', value: '42', trend: '↑ 16% this month', trendColor: '#10b981', icon: '👤+', iconBg: 'rgba(245, 158, 11, 0.1)', iconColor: '#f59e0b' },
    { label: 'Deactivated Users', value: '24', trend: '↑ 8% this month', trendColor: '#10b981', icon: '🚫', iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8b5cf6' },
    { label: 'Invitations Pending', value: '8', trend: '↓ 5% this month', trendColor: '#ef4444', icon: '🕒', iconBg: 'rgba(234, 179, 8, 0.1)', iconColor: '#eab308' },
  ];

  const users = [
    { initials: 'PS', name: 'Priya Sharma', email: 'priya.sharma@acme.com', role: 'Developer', roleColor: '#a855f7', roleBg: 'rgba(168, 85, 247, 0.15)', dept: 'Engineering', status: 'Active', statusColor: '#10b981', lastActive: 'May 21, 2024 10:30 AM', avatarBg: '#8b5cf6' },
    { initials: 'RK', name: 'Rahul Kumar', email: 'rahul.kumar@acme.com', role: 'Analyst', roleColor: '#3b82f6', roleBg: 'rgba(59, 130, 246, 0.15)', dept: 'Data Science', status: 'Active', statusColor: '#10b981', lastActive: 'May 21, 2024 09:15 AM', avatarBg: '#3b82f6' },
    { initials: 'AS', name: 'Anjali Singh', email: 'anjali.singh@acme.com', role: 'Admin', roleColor: '#ef4444', roleBg: 'rgba(239, 68, 68, 0.15)', dept: 'Administration', status: 'Active', statusColor: '#10b981', lastActive: 'May 21, 2024 08:45 AM', avatarBg: '#64748b' },
    { initials: 'VD', name: 'Vikram Desai', email: 'vikram.desai@acme.com', role: 'Viewer', roleColor: '#10b981', roleBg: 'rgba(16, 185, 129, 0.15)', dept: 'Product', status: 'Active', statusColor: '#10b981', lastActive: 'May 20, 2024 06:20 PM', avatarBg: '#10b981' },
    { initials: 'MG', name: 'Megha Gupta', email: 'megha.gupta@acme.com', role: 'Developer', roleColor: '#a855f7', roleBg: 'rgba(168, 85, 247, 0.15)', dept: 'Engineering', status: 'Active', statusColor: '#10b981', lastActive: 'May 20, 2024 05:10 PM', avatarBg: '#f59e0b' },
    { initials: 'NP', name: 'Nitin Patel', email: 'nitin.patel@acme.com', role: 'Analyst', roleColor: '#3b82f6', roleBg: 'rgba(59, 130, 246, 0.15)', dept: 'Marketing', status: 'Inactive', statusColor: '#ef4444', lastActive: 'May 19, 2024 04:00 PM', avatarBg: '#06b6d4' },
    { initials: 'SK', name: 'Sneha Kapoor', email: 'sneha.kapoor@acme.com', role: 'Developer', roleColor: '#a855f7', roleBg: 'rgba(168, 85, 247, 0.15)', dept: 'Engineering', status: 'Inactive', statusColor: '#ef4444', lastActive: 'May 18, 2024 02:30 PM', avatarBg: '#3b82f6' },
    { initials: 'AB', name: 'Amit Bansal', email: 'amit.bansal@acme.com', role: 'Admin', roleColor: '#ef4444', roleBg: 'rgba(239, 68, 68, 0.15)', dept: 'Administration', status: 'Deactivated', statusColor: '#64748b', lastActive: 'May 10, 2024 11:20 AM', avatarBg: '#f97316' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>Users</h1>
          <p style={{ marginTop: 8 }}>Manage users and their roles within your organization.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/members/create')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>+</span> Invite User
          </button>
          <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export
          </button>
        </div>
      </div>

      {/* Header */}

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
          <input type="text" placeholder="Search users..." style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 12px 8px 36px', color: '#fff', fontSize: 13, outline: 'none' }} />
        </div>
        <select style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 32px 8px 12px', color: '#fff', fontSize: 13, outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px top 50%', backgroundSize: '10px auto' }}>
          <option>All Status</option>
        </select>
        <select style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 32px 8px 12px', color: '#fff', fontSize: 13, outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px top 50%', backgroundSize: '10px auto' }}>
          <option>All Roles</option>
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
                <th style={{ padding: '16px 24px', width: 40 }}><input type="checkbox" style={{ cursor: 'pointer' }} /></th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>User</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Email</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Role</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Department</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Last Active</th>
                <th style={{ padding: '16px 24px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} onClick={() => navigate('/members/1')} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '16px 24px' }}><input type="checkbox" style={{ cursor: 'pointer' }} /></td>
                  <td style={{ padding: '16px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
                        {u.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, color: '#fff' }}>{u.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: '16px 16px' }}>
                    <span style={{ background: u.roleBg, color: u.roleColor, padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500 }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{u.dept}</td>
                  <td style={{ padding: '16px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: u.statusColor }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: u.statusColor }}></div>
                      {u.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{u.lastActive}</td>
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
          <div>Showing 1 to 8 of 248 users</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn" style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>&lt;</button>
            <button className="btn btn-primary" style={{ padding: '4px 12px' }}>1</button>
            <button className="btn" style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>2</button>
            <button className="btn" style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>3</button>
            <span style={{ padding: '4px 8px', display: 'flex', alignItems: 'center' }}>...</span>
            <button className="btn" style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>31</button>
            <button className="btn" style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
