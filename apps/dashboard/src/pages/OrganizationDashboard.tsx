import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function OrganizationDashboard() {
  const { user } = useAuth();

  const metrics = [
    { label: 'Tenants', value: '12', trend: '↑ 20% this month', icon: '🛡️', bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
    { label: 'Users', value: '248', trend: '↑ 18% this month', icon: '👥', bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
    { label: 'Groups', value: '36', trend: '↑ 12% this month', icon: '👨‍👩‍👧‍👦', bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' },
    { label: 'Departments', value: '14', trend: '↑ 10% this month', icon: '🏢', bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
    { label: 'Active Users', value: '186', trend: '↑ 22% this month', icon: '📈', bg: 'rgba(234, 179, 8, 0.1)', color: '#eab308' },
  ];

  const recentUsers = [
    { initials: 'PS', name: 'Priya Sharma', email: 'priya.sharma@acme.com', role: 'Developer', time: '2h ago', bg: '#8b5cf6' },
    { initials: 'RK', name: 'Rahul Kumar', email: 'rahul.kumar@acme.com', role: 'Analyst', time: '5h ago', bg: '#3b82f6' },
    { initials: 'AS', name: 'Anjali Singh', email: 'anjali.singh@acme.com', role: 'Admin', time: '1d ago', bg: '#64748b' },
    { initials: 'VD', name: 'Vikram Desai', email: 'vikram.desai@acme.com', role: 'Viewer', time: '2d ago', bg: '#64748b' },
    { initials: 'MG', name: 'Megha Gupta', email: 'megha.gupta@acme.com', role: 'Developer', time: '2d ago', bg: '#64748b' },
  ];

  const recentGroups = [
    { icon: '👥', name: 'AI Engineers', desc: 'Group for AI engineering team', users: '24 users' },
    { icon: '👥', name: 'Data Scientists', desc: 'Group for data science team', users: '18 users', iconBg: 'rgba(139, 92, 246, 0.1)', iconColor: '#8b5cf6' },
    { icon: '🛡️', name: 'Platform Admins', desc: 'Admins with platform access', users: '6 users' },
    { icon: '📦', name: 'Product Team', desc: 'Product management group', users: '15 users', iconBg: 'rgba(59, 130, 246, 0.1)', iconColor: '#3b82f6' },
    { icon: '🎧', name: 'Support Team', desc: 'Customer support team', users: '12 users', iconBg: 'rgba(234, 179, 8, 0.1)', iconColor: '#eab308' },
  ];

  const usageOverview = [
    { label: 'Users', current: 248, max: 500, maxStr: '500', color: '#3b82f6', icon: '👥' },
    { label: 'Storage', current: 820, max: 2000, maxStr: '2 TB', currentStr: '820 GB', color: '#10b981', icon: '🗄️' },
    { label: 'API Calls', current: 1200000, max: 5000000, maxStr: '5M', currentStr: '1.2M', color: '#eab308', icon: '🔌' },
    { label: 'Workspaces', current: 36, max: 100, maxStr: '100', color: '#8b5cf6', icon: '💻' },
  ];

  return (
    <>
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            Organization Console
          </h1>
          <p style={{ marginTop: 8 }}>Manage your organization, users, groups, departments and settings.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>+</span> Invite User
          </button>
          <button className="btn" style={{ padding: '8px 12px' }}>⋮</button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        {metrics.map((metric, idx) => (
          <div key={idx} className="widget" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: metric.bg, color: metric.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                {metric.icon}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>{metric.label}</div>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{metric.value}</div>
              <div style={{ fontSize: 12, color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
                {metric.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24, marginBottom: 24 }}>
        {/* User Activity Overview */}
        <section className="widget" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>User Activity Overview</h2>
            <button className="btn" style={{ fontSize: 12, padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>Last 30 Days ⌄</button>
          </div>
          
          <div style={{ flex: 1, minHeight: 200, position: 'relative' }}>
            {/* Mock Line Chart */}
            <svg width="100%" height="200" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="20" x2="100" y2="20" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="60" x2="100" y2="60" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="var(--border-color)" strokeWidth="0.5" />
              <path d="M0,60 L5,55 L10,65 L15,50 L20,45 L25,55 L30,40 L35,30 L40,45 L45,60 L50,45 L55,30 L60,15 L65,30 L70,25 L75,40 L80,35 L85,45 L90,65 L95,45 L100,20" fill="none" stroke="var(--accent-purple)" strokeWidth="2" />
              
              {/* Dots */}
              {[
                {x: 0, y: 60}, {x: 5, y: 55}, {x: 10, y: 65}, {x: 15, y: 50}, {x: 20, y: 45}, {x: 25, y: 55}, {x: 30, y: 40}, {x: 35, y: 30}, {x: 40, y: 45}, {x: 45, y: 60}, {x: 50, y: 45}, {x: 55, y: 30}, {x: 60, y: 15}, {x: 65, y: 30}, {x: 70, y: 25}, {x: 75, y: 40}, {x: 80, y: 35}, {x: 85, y: 45}, {x: 90, y: 65}, {x: 95, y: 45}, {x: 100, y: 20}
              ].map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="1.5" fill="var(--accent-purple)" />
              ))}
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'absolute', left: -20, top: 0, bottom: 0, height: 200, fontSize: 10, color: 'var(--text-secondary)' }}>
              <span>250</span>
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: 'var(--text-secondary)' }}>
              <span>Apr 21</span>
              <span>Apr 28</span>
              <span>May 5</span>
              <span>May 12</span>
              <span>May 19</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, marginTop: 24, borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>186</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Active Users</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>42</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>New Users</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>24</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Deactivated Users</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>8</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Invitations Pending</div>
            </div>
          </div>
        </section>

        {/* Organization Information */}
        <section className="widget" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>Organization Information</h2>
            <button className="btn" style={{ fontSize: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: 'none' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Edit
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, fontSize: 13 }}>
                <div style={{ color: 'var(--text-secondary)' }}>Organization Name</div>
                <div style={{ color: '#fff' }}>Acme Corporation</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, fontSize: 13 }}>
                <div style={{ color: 'var(--text-secondary)' }}>Organization ID</div>
                <div style={{ color: '#fff', fontFamily: 'monospace' }}>org_8f3a7d2c9e</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, fontSize: 13, alignItems: 'center' }}>
                <div style={{ color: 'var(--text-secondary)' }}>Plan</div>
                <div><span style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 500 }}>Enterprise</span></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, fontSize: 13 }}>
                <div style={{ color: 'var(--text-secondary)' }}>Verified Domain</div>
                <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> acme.com
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, fontSize: 13 }}>
                <div style={{ color: 'var(--text-secondary)' }}>Country / Region</div>
                <div style={{ color: '#fff' }}>United States</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, fontSize: 13 }}>
                <div style={{ color: 'var(--text-secondary)' }}>Created On</div>
                <div style={{ color: '#fff' }}>Jan 15, 2024 10:30 AM</div>
              </div>
            </div>
            
            <div style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ height: 120, background: 'rgba(59, 130, 246, 0.05)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#3b82f6', fontSize: 28, fontWeight: 800, letterSpacing: 1, lineHeight: 1 }}>ACME</div>
                <div style={{ color: '#fff', fontSize: 10, letterSpacing: 2, marginTop: 4 }}>CORPORATION</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 4 }}>Description</div>
                <div style={{ color: '#fff', fontSize: 11, lineHeight: 1.5 }}>
                  Acme Corporation is using OpenContextPlatform to build and scale AI-powered solutions across the organization.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        {/* Recent Users */}
        <section className="widget" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Recent Users</h2>
            <a href="#" style={{ fontSize: 13, color: 'var(--accent-purple)', textDecoration: 'none' }}>View all</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {recentUsers.map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
                  {u.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.email}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4, color: 'var(--text-secondary)' }}>{u.role}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{u.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Groups */}
        <section className="widget" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Recent Groups</h2>
            <a href="#" style={{ fontSize: 13, color: 'var(--accent-purple)', textDecoration: 'none' }}>View all</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {recentGroups.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: g.iconBg || 'rgba(255,255,255,0.05)', color: g.iconColor || 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                  {g.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.desc}</div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{g.users}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Overview */}
        <section className="widget" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 15, margin: 0, fontWeight: 600 }}>Usage Overview</h2>
            <a href="#" style={{ fontSize: 13, color: 'var(--accent-purple)', textDecoration: 'none' }}>View details</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {usageOverview.map((item, i) => {
              const percent = Math.round((item.current / item.max) * 100);
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
                      <span style={{ background: 'rgba(255,255,255,0.05)', width: 24, height: 24, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                      {item.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{item.currentStr || item.current} / {item.maxStr}</span>
                      <span style={{ color: '#fff', fontWeight: 500, width: 30, textAlign: 'right' }}>{percent}%</span>
                    </div>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percent}%`, background: item.color, borderRadius: 2 }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
