import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupDetails() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Breadcrumbs */}
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/groups')}>Groups</span>
        <span>&gt;</span>
        <span style={{ color: '#fff' }}>AI Engineering Team</span>
      </div>

      {/* Top Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, background: '#6d28d9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 600 }}>
              AI
            </div>
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: '#10b981', border: '3px solid var(--bg-color)' }}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#fff' }}>AI Engineering Team</h1>
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                  Active
                </span>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Group for AI/ML engineers working on platform and product initiatives.</div>
            </div>
            
            <div style={{ display: 'flex', gap: 32, color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
              <div>
                <div style={{ fontSize: 11, marginBottom: 4 }}>Group ID</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
                  <span style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>grp_01H7K8Q32BF159T6X2M5NQ0R4Y</span>
                  <svg style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ marginTop: 2 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, marginBottom: 4 }}>Created On</div>
                  <div style={{ color: '#fff' }}>Jan 21, 2024 • 01:30 PM</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ marginTop: 2 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, marginBottom: 4 }}>Created By</div>
                  <div style={{ color: '#fff' }}>Mukesh Kumar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/groups/1/edit')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', borderColor: '#7c3aed' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit Group
          </button>
          <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            More Actions
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { title: 'Members', value: '24', trend: '↑ 18%', icon: '👥', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', link: 'View all members' },
          { title: 'Departments', value: '3', trend: '', icon: '🏢', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', link: 'View departments' },
          { title: 'Users', value: '22', trend: 'Direct members', icon: '👤', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', link: 'View users', trendColor: 'var(--text-secondary)' },
          { title: 'Permissions', value: '28', trend: 'Effective permissions', icon: '🛡️', color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', link: 'View permissions', trendColor: 'var(--text-secondary)' },
          { title: 'Workspaces', value: '7', trend: 'Assigned workspaces', icon: '📦', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)', link: 'View workspaces', trendColor: 'var(--text-secondary)' },
        ].map((metric, i) => (
          <div key={i} className="widget" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: metric.bg, color: metric.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {metric.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 4 }}>{metric.title}</span>
                <span style={{ color: '#fff', fontSize: 24, fontWeight: 600, lineHeight: 1 }}>{metric.value}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, minHeight: 18 }}>
              {metric.trend && <div style={{ color: 'var(--text-secondary)' }}><span style={{ color: metric.trendColor || '#10b981' }}>{metric.trend}</span> {metric.trend.includes('↑') ? 'this month' : ''}</div>}
            </div>
            <div style={{ color: '#a855f7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, marginTop: 'auto' }}>{metric.link} <span style={{ fontSize: 14 }}>→</span></div>
          </div>
        ))}
      </div>

      {/* Middle Area (3 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
        
        {/* Group Information */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ color: 'var(--text-secondary)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Group Information</h3>
            </div>
            <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, fontSize: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Group Name</span>
              <span style={{ color: '#fff' }}>AI Engineering Team</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Description</span>
              <span style={{ color: '#fff', lineHeight: 1.4 }}>Group for AI/ML engineers working on platform and product initiatives.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Group Type</span>
              <span style={{ color: '#fff' }}>Security Group</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Status</span>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                Active
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Visibility</span>
              <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                Organization
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Created On</span>
              <span style={{ color: '#fff' }}>Jan 21, 2024 • 01:30 PM</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Last Updated</span>
              <span style={{ color: '#fff' }}>May 21, 2024 • 10:30 AM</span>
            </div>
          </div>
        </div>

        {/* Group Owners */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ color: 'var(--text-secondary)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Group Owners (2)</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {[
              { init: 'PS', name: 'Priya Sharma', email: 'priya.sharma@acme.com', role: 'Primary Owner', bg: '#8b5cf6' },
              { init: 'RS', name: 'Rahul Singh', email: 'rahul.singh@acme.com', role: 'Owner', bg: '#3b82f6' },
            ].map((owner, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: owner.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500 }}>
                    {owner.init}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, marginBottom: 2 }}>{owner.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{owner.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ background: owner.role.includes('Primary') ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.05)', color: owner.role.includes('Primary') ? '#8b5cf6' : 'var(--text-secondary)', border: owner.role.includes('Primary') ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>{owner.role}</span>
                  <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
            View and manage owners <span>→</span>
          </div>
        </div>

        {/* Departments */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Departments (3)</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {[
              { name: 'Engineering', members: '12 members' },
              { name: 'Data Science', members: '8 members' },
              { name: 'Platform Engineering', members: '4 members' },
            ].map((dept, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ color: '#10b981' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><path d="M9 22v-4h6v4"></path><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path></svg>
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, marginBottom: 2 }}>{dept.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{dept.members}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Area (3 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
        
        {/* Users List */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Users (22)</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>
          
          {/* Table Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: 11, marginBottom: 12 }}>
            <div>User</div>
            <div style={{ display: 'flex', gap: 24, width: 140, justifyContent: 'space-between' }}>
              <span>Role in Group</span>
              <span>Joined On</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {[
              { init: 'AV', name: 'Anjali Verma', email: 'anjali.verma@acme.com', role: 'Member', joined: 'Jan 21, 2024', bg: '#10b981' },
              { init: 'AM', name: 'Arjun Mehta', email: 'arjun.mehta@acme.com', role: 'Member', joined: 'Jan 21, 2024', bg: '#f97316' },
              { init: 'SK', name: 'Sneha Kapoor', email: 'sneha.kapoor@acme.com', role: 'Member', joined: 'Jan 22, 2024', bg: '#8b5cf6' },
              { init: 'VK', name: 'Vikram Desai', email: 'vikram.desai@acme.com', role: 'Member', joined: 'Jan 23, 2024', bg: '#14b8a6' },
            ].map((user, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: user.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500 }}>
                    {user.init}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: 12, marginBottom: 2 }}>{user.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{user.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, width: 140, justifyContent: 'space-between' }}>
                  <span style={{ color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 4, fontSize: 10 }}>{user.role}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 11, whiteSpace: 'nowrap' }}>{user.joined}</span>
                  <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: -12 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all 22 users <span>→</span>
          </div>
        </div>

        {/* Permissions */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Permissions (28)</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: '#fff' }}>Workspaces</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>7</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: '#fff' }}>AI Providers</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>4</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: '#fff' }}>Storage</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>5</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: '#fff' }}>API Keys</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>6</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ color: '#fff' }}>Secrets</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>3</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#fff' }}>Billing & Usage</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>3</span>
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all permissions <span>→</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Recent Activity</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: '#10b981' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Priya Sharma added 3 users to the group</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 21, 2024 • 10:15 AM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: '#eab308' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Updated permissions for workspace "AI Research"</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 20, 2024 • 04:30 PM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: '#a855f7' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Assigned to workspace "AI Platform"</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 19, 2024 • 02:20 PM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: '#3b82f6' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Rahul Singh made Priya Sharma as primary owner</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 18, 2024 • 11:45 AM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--text-secondary)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Group description updated</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 15, 2024 • 09:10 AM</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
