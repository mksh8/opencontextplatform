import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrganizationDepartments() {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    'Administration': true,
    'Engineering': true,
  });

  const toggleRow = (name: string) => {
    setExpandedRows(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const metrics = [
    { label: 'Total Departments', value: '14', trend: '↑ 17% this month', trendColor: '#10b981', icon: '🏢', iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3b82f6' },
    { label: 'Active Departments', value: '14', trend: '↑ 17% this month', trendColor: '#10b981', icon: '✓', iconBg: 'rgba(16, 185, 129, 0.1)', iconColor: '#10b981' },
    { label: 'Users in Departments', value: '186', trend: '↑ 18% this month', trendColor: '#10b981', icon: '👥', iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8b5cf6' },
  ];

  const departments = [
    {
      name: 'Administration', desc: 'Administrative and management functions', head: 'Mukesh Kumar', users: 18, status: 'Active', statusColor: '#10b981', created: 'Jan 15, 2024 10:30 AM',
      children: [
        { name: 'Finance', desc: 'Financial planning and accounting', head: 'Anjali Verma', users: 6, status: 'Active', statusColor: '#10b981', created: 'Jan 20, 2024 09:15 AM' },
        { name: 'Human Resources', desc: 'HR policies and employee relations', head: 'Rahul Singh', users: 12, status: 'Active', statusColor: '#10b981', created: 'Jan 18, 2024 11:20 AM' },
      ]
    },
    {
      name: 'Engineering', desc: 'Engineering and product development', head: 'Vikram Desai', users: 72, status: 'Active', statusColor: '#10b981', created: 'Jan 10, 2024 08:45 AM',
      children: [
        { name: 'Backend Team', desc: 'Backend services and APIs', head: 'Priya Sharma', users: 28, status: 'Active', statusColor: '#10b981', created: 'Jan 12, 2024 02:30 PM' },
        { name: 'Frontend Team', desc: 'Frontend applications and UI', head: 'Amit Patel', users: 20, status: 'Active', statusColor: '#10b981', created: 'Jan 12, 2024 02:30 PM' },
        { name: 'DevOps', desc: 'Infrastructure and deployments', head: 'Sneha Kapoor', users: 24, status: 'Active', statusColor: '#10b981', created: 'Jan 12, 2024 02:30 PM' },
      ]
    },
    { name: 'Data Science', desc: 'Data analysis and machine learning', head: 'Anjali Verma', users: 28, status: 'Active', statusColor: '#10b981', created: 'Jan 14, 2024 10:00 AM' },
    { name: 'Customer Success', desc: 'Customer support and success', head: 'Rahul Mehta', users: 23, status: 'Active', statusColor: '#10b981', created: 'Jan 16, 2024 03:45 PM' },
  ];

  const renderRow = (dept: any, depth = 0) => {
    const isExpanded = expandedRows[dept.name];
    const hasChildren = dept.children && dept.children.length > 0;
    
    return (
      <React.Fragment key={dept.name}>
        <tr onClick={(e) => {
          // Prevent navigation if clicking the expand button
          if ((e.target as HTMLElement).closest('button')) return;
          navigate('/departments/1');
        }} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', background: depth > 0 ? 'rgba(0,0,0,0.2)' : 'transparent', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = depth > 0 ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = depth > 0 ? 'rgba(0,0,0,0.2)' : 'transparent'}>
          <td style={{ padding: '16px 24px', paddingLeft: 24 + depth * 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {hasChildren ? (
                <button onClick={() => toggleRow(dept.name)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              ) : (
                <div style={{ width: 16 }}>
                  {depth > 0 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--border-color)" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>}
                </div>
              )}
              <div style={{ fontWeight: depth === 0 ? 500 : 400, color: depth === 0 ? '#fff' : 'var(--text-secondary)' }}>{dept.name}</div>
            </div>
          </td>
          <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{dept.desc}</td>
          <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{dept.head}</td>
          <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{dept.users}</td>
          <td style={{ padding: '16px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: dept.statusColor }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: dept.statusColor }}></div>
              {dept.status}
            </div>
          </td>
          <td style={{ padding: '16px 16px', color: 'var(--text-secondary)' }}>{dept.created}</td>
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
        {hasChildren && isExpanded && dept.children.map((child: any) => renderRow(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>Departments</h1>
          <p style={{ marginTop: 8 }}>Manage departments and their hierarchies.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/departments/create')} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>+</span> New Department
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
          <input type="text" placeholder="Search departments..." style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 12px 8px 36px', color: '#fff', fontSize: 13, outline: 'none' }} />
        </div>
      </div>

      {/* Main Table */}
      <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Department Name</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Description</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Head</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Users</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '16px 16px', fontWeight: 500 }}>Created On</th>
                <th style={{ padding: '16px 24px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => renderRow(dept))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Pagination */}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: 13, background: 'rgba(0,0,0,0.1)' }}>
          <div>Showing 1 to 8 of 14 departments</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn" style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>&lt;</button>
            <button className="btn btn-primary" style={{ padding: '4px 12px' }}>1</button>
            <button className="btn" style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>2</button>
            <button className="btn" style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
