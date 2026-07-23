import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TenantDetails() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Breadcrumbs */}
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/tenants')}>Tenants</span>
        <span>&gt;</span>
        <span style={{ color: '#fff' }}>Acme Corporation</span>
      </div>

      {/* Top Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, background: '#6d28d9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 600 }}>
              AC
            </div>
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: '50%', background: '#10b981', border: '3px solid var(--bg-color)' }}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#fff' }}>Acme Corporation</h1>
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                  Active
                </span>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Leading the future of AI-powered innovation</div>
            </div>
            
            <div style={{ display: 'flex', gap: 32, color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
              <div>
                <div style={{ fontSize: 11, marginBottom: 4 }}>Tenant ID</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff' }}>
                  <span style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>ten_01H7K8Q32BF159T6X2M5NQ0R4Y</span>
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
          <button className="btn btn-primary" onClick={() => navigate('/tenants/1/edit')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', borderColor: '#7c3aed' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit Tenant
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
          { title: 'Workspaces', value: '24', trend: '↑ 20%', icon: '📦', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', link: 'View all workspaces' },
          { title: 'Users', value: '186', trend: '↑ 18%', icon: '👥', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', link: 'View all members' },
          { title: 'Storage Used', value: '820 GB', trend: '41% of 2 TB used', icon: '🗄️', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', link: 'View storage', trendColor: 'var(--text-secondary)' },
          { title: 'AI Providers', value: '6', trend: '↑ 12%', icon: '⚡', color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', link: 'View providers' },
          { title: 'Monthly Spend', value: '$2,450.00', trend: '↑ 15%', icon: '$', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)', link: 'View billing' },
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
              <div style={{ color: 'var(--text-secondary)' }}><span style={{ color: metric.trendColor || '#10b981' }}>{metric.trend}</span> {metric.trend.includes('% of') ? '' : 'this month'}</div>
            </div>
            <div style={{ color: '#a855f7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, marginTop: 'auto' }}>{metric.link} <span style={{ fontSize: 14 }}>→</span></div>
          </div>
        ))}
      </div>

      {/* Middle Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Tenant Information */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Tenant Information</h3>
            <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tenant Name</span>
              <span style={{ color: '#fff' }}>Acme Corporation</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Description</span>
              <span style={{ color: '#fff' }}>Leading the future of AI-powered innovation</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Domain</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#fff' }}>acme.com</span>
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>Verified</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Status</span>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                Active
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tenant Admin</span>
              <span style={{ color: '#fff' }}>Priya Sharma (priya.sharma@acme.com)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Time Zone</span>
              <span style={{ color: '#fff' }}>(GMT-07:00) Pacific Time (US & Canada)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Default Language</span>
              <span style={{ color: '#fff' }}>English</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Data Region</span>
              <span style={{ color: '#fff' }}>US (N. Virginia)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Plan</span>
              <div><span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>Enterprise</span></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Valid Until</span>
              <span style={{ color: '#fff' }}>Jan 21, 2025 • 01:30 PM</span>
            </div>
          </div>
        </div>

        {/* Subscription & Quotas */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Subscription & Quotas</h3>
            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all usage <span>→</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Plan</span>
                <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>Enterprise</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Workspaces Limit</span>
                <span style={{ color: '#fff' }}>Unlimited</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Users Limit</span>
                <span style={{ color: '#fff' }}>500</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Storage Limit</span>
                <span style={{ color: '#fff' }}>2 TB</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>AI Requests / Month</span>
                <span style={{ color: '#fff' }}>10 M</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>API Requests / Month</span>
                <span style={{ color: '#fff' }}>50 M</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Data Retention</span>
                <span style={{ color: '#fff' }}>90 Days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Next Billing Date</span>
                <span style={{ color: '#fff' }}>Jun 21, 2024 • 01:30 PM</span>
              </div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              {/* Donut Chart */}
              <div style={{ width: 140, height: 140, position: 'relative' }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="98 153.3" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="75.4 175.9" strokeDashoffset="-98" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="55.3 196" strokeDashoffset="-173.4" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#eab308" strokeWidth="20" strokeDasharray="22.6 228.7" strokeDashoffset="-228.7" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>820 GB</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>of 2 TB used</div>
                </div>
              </div>
              
              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12, width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6' }}></div><span style={{ color: 'var(--text-secondary)' }}>Vector Store</span></div>
                  <div style={{ color: '#fff' }}>320 GB (39%)</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }}></div><span style={{ color: 'var(--text-secondary)' }}>Object Storage</span></div>
                  <div style={{ color: '#fff' }}>250 GB (30%)</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div><span style={{ color: 'var(--text-secondary)' }}>Databases</span></div>
                  <div style={{ color: '#fff' }}>180 GB (22%)</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#eab308' }}></div><span style={{ color: 'var(--text-secondary)' }}>Logs & Others</span></div>
                  <div style={{ color: '#fff' }}>70 GB (9%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Area (4 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 24 }}>
        {/* Tenant Admins */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Tenant Admins</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
            {[
              { init: 'PS', name: 'Priya Sharma', email: 'priya.sharma@acme.com', role: 'Owner', bg: '#8b5cf6' },
              { init: 'RS', name: 'Rahul Singh', email: 'rahul.singh@acme.com', role: 'Admin', bg: '#3b82f6' },
              { init: 'AV', name: 'Anjali Verma', email: 'anjali.verma@acme.com', role: 'Admin', bg: '#10b981' },
            ].map((admin, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: admin.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500 }}>
                    {admin.init}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: 13, marginBottom: 2 }}>{admin.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{admin.email}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>{admin.role}</span>
                  <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all admins <span>→</span>
          </div>
        </div>

        {/* Security & Access */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Security & Access</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SSO (SAML 2.0)</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Enabled</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>MFA</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Enforced</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SCIM Provisioning</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Enabled</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>IP Allowlist</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Configured</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Session Timeout</span>
              <span style={{ color: '#fff' }}>8 hours</span>
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
            View security settings <span>→</span>
          </div>
        </div>

        {/* Integrations */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Integrations</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>☁️</span>
                <span style={{ color: '#fff' }}>AWS</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#10b981' }}>Connected</span>
                <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>🌐</span>
                <span style={{ color: '#fff' }}>Google Cloud</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#10b981' }}>Connected</span>
                <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16, color: '#3b82f6' }}>▲</span>
                <span style={{ color: '#fff' }}>Azure</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#10b981' }}>Connected</span>
                <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16, color: '#ef4444' }}>💠</span>
                <span style={{ color: '#fff' }}>Databricks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#10b981' }}>Connected</span>
                <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
              </div>
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all integrations <span>→</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ color: 'var(--text-secondary)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Recent Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--text-secondary)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Workspace "AI Research" created</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 21, 2024 • 10:15 AM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--text-secondary)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>User Rahul Singh added</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 21, 2024 • 09:45 AM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--text-secondary)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>AI Provider OpenAI configured</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 20, 2024 • 04:30 PM</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ color: 'var(--text-secondary)' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
              <div>
                <div style={{ color: '#fff', marginBottom: 2 }}>Subscription plan updated</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>May 18, 2024 • 02:10 PM</div>
              </div>
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 4 }}>
            View all activity <span>→</span>
          </div>
        </div>
      </div>

      {/* Lowest Section (Notes) */}
      <div className="widget" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg style={{ color: 'var(--text-secondary)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Notes</h3>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>No notes added yet.</div>
        </div>
        <button className="btn" style={{ fontSize: 13, color: '#8b5cf6', borderColor: 'var(--border-color)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          Add Note
        </button>
      </div>

    </div>
  );
}
