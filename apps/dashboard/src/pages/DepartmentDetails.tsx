import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function DepartmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Breadcrumbs */}
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/departments')}>Departments</span>
        <span>&gt;</span>
        <span style={{ color: '#fff' }}>Engineering</span>
      </div>

      {/* Top Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, background: '#6d28d9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#fff' }}>Engineering</h1>
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                  Active
                </span>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Handles platform engineering, backend services, and infrastructure.</div>
            </div>
            
            <div style={{ display: 'flex', gap: 32, color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
              <div>
                <div style={{ fontSize: 11, marginBottom: 4 }}>Department ID</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
                  <span style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>dep_01H7K80Q32BF159T6K2MSN0QR4Y</span>
                  <svg style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ marginTop: 2 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, marginBottom: 4 }}>Created On</div>
                  <div style={{ color: '#fff' }}>Jan 15, 2024 • 09:45 AM</div>
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
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', borderColor: '#7c3aed' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit Department
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
          { title: 'Members', value: '35', trend: '↑ 16% this month', icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, icon2: <circle cx="9" cy="7" r="4"></circle>, icon3: <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>, icon4: <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', link: 'View all members' },
          { title: 'Groups', value: '6', trend: '', icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>, icon2: <circle cx="9" cy="7" r="4"></circle>, icon3: <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>, icon4: <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', link: 'View groups' },
          { title: 'Managers', value: '3', trend: '', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>, color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', link: 'View managers' },
          { title: 'Related Tenants', value: '4', trend: '', icon: <path d="M3 21h18"></path>, icon2: <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>, icon3: <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path>, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', link: 'View tenants' },
          { title: 'Workspaces Access', value: '18', trend: '', icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>, icon2: <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>, icon3: <line x1="12" y1="22.08" x2="12" y2="12"></line>, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)', link: 'View workspaces' },
        ].map((metric, i) => (
          <div key={i} className="widget" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: metric.bg, color: metric.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {metric.icon}
                  {metric.icon2}
                  {metric.icon3}
                  {metric.icon4}
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 4 }}>{metric.title}</span>
                <span style={{ color: '#fff', fontSize: 24, fontWeight: 600, lineHeight: 1 }}>{metric.value}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, minHeight: 18 }}>
              {metric.trend && <div style={{ color: 'var(--text-secondary)' }}><span style={{ color: '#10b981' }}>{metric.trend.split(' ')[0] + ' ' + metric.trend.split(' ')[1]}</span> {metric.trend.split(' ').slice(2).join(' ')}</div>}
            </div>
            <div style={{ color: '#8b5cf6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, marginTop: 'auto' }}>{metric.link} <span style={{ fontSize: 14 }}>→</span></div>
          </div>
        ))}
      </div>

      {/* Middle Area (3 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
        
        {/* Department Information */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Department Information</h3>
            <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, fontSize: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Department Name</span>
              <span style={{ color: '#fff' }}>Engineering</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Description</span>
              <span style={{ color: '#fff', lineHeight: 1.4 }}>Handles platform engineering, backend services, and infrastructure.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Head of Department</span>
              <span style={{ color: '#8b5cf6' }}>Rahul Singh (rahul.singh@acme.com)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Department Type</span>
              <span style={{ color: '#fff' }}>Functional</span>
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
              <span style={{ color: 'var(--text-secondary)' }}>Location</span>
              <span style={{ color: '#fff' }}>San Francisco, CA</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Created On</span>
              <span style={{ color: '#fff' }}>Jan 15, 2024 • 09:45 AM</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Last Updated</span>
              <span style={{ color: '#fff' }}>May 21, 2024 • 10:30 AM</span>
            </div>
          </div>
        </div>

        {/* Managers */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Managers (3)</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
            {[
              { init: 'RS', name: 'Rahul Singh', email: 'rahul.singh@acme.com', role: 'Department Head', bg: '#3b82f6' },
              { init: 'PS', name: 'Priya Sharma', email: 'priya.sharma@acme.com', role: 'Manager', bg: '#8b5cf6' },
              { init: 'AR', name: 'Amit Rawat', email: 'amit.rawat@acme.com', role: 'Manager', bg: '#10b981' },
            ].map((mgr, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: mgr.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500 }}>
                    {mgr.init}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, marginBottom: 2 }}>{mgr.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{mgr.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ background: mgr.role.includes('Head') ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.05)', color: mgr.role.includes('Head') ? '#a855f7' : 'var(--text-secondary)', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>{mgr.role}</span>
                  <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
            View and manage managers <span>→</span>
          </div>
        </div>

        {/* Group Distribution */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Group Distribution</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
            
            {/* SVG Donut Chart */}
            <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                {/* AI Engineering Team (33%) - Blue */}
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="33 67" strokeDashoffset="0"></circle>
                {/* Backend Team (17%) - Purple */}
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="17 83" strokeDashoffset="-33"></circle>
                {/* DevOps Team (17%) - Green */}
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="17 83" strokeDashoffset="-50"></circle>
                {/* Data Platform (17%) - Orange */}
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#f97316" strokeWidth="4" strokeDasharray="17 83" strokeDashoffset="-67"></circle>
                {/* QA Engineering (17%) - Yellow */}
                <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#eab308" strokeWidth="4" strokeDasharray="16 84" strokeDashoffset="-84"></circle>
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 24, fontWeight: 600, color: '#fff', lineHeight: 1 }}>6</span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Groups</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, fontSize: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}></div>
                  AI Engineering Team
                </div>
                <span style={{ color: '#fff' }}>2 (33%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6' }}></div>
                  Backend Team
                </div>
                <span style={{ color: '#fff' }}>1 (17%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                  DevOps Team
                </div>
                <span style={{ color: '#fff' }}>1 (17%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316' }}></div>
                  Data Platform Team
                </div>
                <span style={{ color: '#fff' }}>1 (17%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }}></div>
                  QA Engineering Team
                </div>
                <span style={{ color: '#fff' }}>1 (17%)</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* Bottom Area (3 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
        
        {/* Members List */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Members (35)</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: 11, marginBottom: 12 }}>
            <div>User</div>
            <div style={{ display: 'flex', gap: 24, width: 140, justifyContent: 'space-between' }}>
              <span>Role</span>
              <span>Joined On</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {[
              { init: 'SK', name: 'Sneha Kapoor', email: 'sneha.kapoor@acme.com', role: 'Sr. Software Engineer', joined: 'Jan 16, 2024', bg: '#8b5cf6' },
              { init: 'VK', name: 'Vikram Desai', email: 'vikram.desai@acme.com', role: 'DevOps Engineer', joined: 'Jan 18, 2024', bg: '#10b981' },
              { init: 'AM', name: 'Arjun Mehta', email: 'arjun.mehta@acme.com', role: 'Backend Engineer', joined: 'Jan 20, 2024', bg: '#f59e0b' },
              { init: 'AV', name: 'Anjali Verma', email: 'anjali.verma@acme.com', role: 'Data Engineer', joined: 'Jan 21, 2024', bg: '#10b981' },
              { init: 'NP', name: 'Neha Patel', email: 'neha.patel@acme.com', role: 'QA Engineer', joined: 'Jan 22, 2024', bg: '#ef4444' },
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
                  <span style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: 9 }}>{user.role}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 10, whiteSpace: 'nowrap' }}>{user.joined}</span>
                  <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: -12 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all 35 members <span>→</span>
          </div>
        </div>

        {/* Workspace Access */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Workspace Access (18)</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: 11, marginBottom: 12 }}>
            <div>Workspace</div>
            <div>Members</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, fontSize: 13 }}>
            {[
              { name: 'AI Research', members: 12, iconColor: '#a855f7' },
              { name: 'Data Platform', members: 8, iconColor: '#10b981' },
              { name: 'Backend Services', members: 7, iconColor: '#3b82f6' },
              { name: 'DevOps Infrastructure', members: 5, iconColor: '#f97316' },
              { name: 'Product Analytics', members: 3, iconColor: '#eab308' },
            ].map((ws, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ color: ws.iconColor }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                  <span style={{ color: '#fff' }}>{ws.name}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{ws.members}</span>
              </div>
            ))}
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all workspaces <span>→</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Recent Activity</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <span>→</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: '#8b5cf6' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Priya Sharma added 3 users to Engineering department</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 21, 2024 • 10:15 AM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: '#10b981' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Amit Rawat updated department managers</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 20, 2024 • 04:30 PM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: '#f97316' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Linked group "Backend Team" to Engineering department</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 19, 2024 • 02:20 PM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: '#3b82f6' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Updated workspace access for 5 workspaces</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 18, 2024 • 11:45 AM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--text-secondary)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Department description updated</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 15, 2024 • 09:10 AM</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
