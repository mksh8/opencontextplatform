import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDetails() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Breadcrumbs */}
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/members')}>Users</span>
        <span>&gt;</span>
        <span style={{ color: '#fff' }}>Priya Sharma</span>
      </div>

      {/* Top Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#6d28d9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 600 }}>
              PS
            </div>
            <div style={{ position: 'absolute', bottom: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: '#10b981', border: '2px solid var(--bg-color)' }}></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0, color: '#fff' }}>Priya Sharma</h1>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                Active
              </span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Senior Data Engineer</div>
            <div style={{ display: 'flex', gap: 24, color: 'var(--text-secondary)', fontSize: 13, marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                priya.sharma@acme.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +1 415-555-0142
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/members/1/edit')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', borderColor: '#7c3aed' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit User
          </button>
          <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            More Actions
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
          </button>
        </div>
      </div>

      {/* Secondary Header Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, paddingBottom: 24, borderBottom: '1px solid var(--border-color)', marginBottom: 32 }}>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 8 }}>User ID</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}>usr_01H7K8Q32BF159T6X2M5NQ0R4Y</span>
            <svg style={{ cursor: 'pointer' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 8 }}>User Type</div>
          <div>
            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500 }}>Internal</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 4 }}>Joined On</div>
            <div style={{ color: '#fff', fontSize: 13 }}>Jan 21, 2024 • 01:30 PM</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 4 }}>Last Login</div>
            <div style={{ color: '#fff', fontSize: 13 }}>May 21, 2024 • 10:30 AM</div>
          </div>
        </div>
      </div>

      {/* Middle Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Role & Access Card */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ color: '#8b5cf6' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Role & Access</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Organization Role</span>
              <span style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Org Member</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Platform Role</span>
              <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Developer</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Access Level</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Standard</span>
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 13, cursor: 'pointer', marginTop: 32, display: 'flex', alignItems: 'center', gap: 6 }}>
            View all roles and permissions <span>→</span>
          </div>
        </div>

        {/* Organization Details Card */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ color: '#8b5cf6' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><path d="M9 22v-4h6v4"></path><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Organization Details</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Department</span>
              <span style={{ color: '#8b5cf6', cursor: 'pointer' }}>Engineering</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Manager</span>
              <span style={{ color: '#8b5cf6', cursor: 'pointer' }}>Rahul Singh</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Location</span>
              <span style={{ color: '#fff' }}>San Francisco, CA</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Language</span>
              <span style={{ color: '#fff' }}>English</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Time Zone</span>
              <span style={{ color: '#fff' }}>(GMT-07:00) Pacific Time (US & Canada)</span>
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 13, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
            View all organization details <span>→</span>
          </div>
        </div>
      </div>

      {/* Bottom Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
        {/* Memberships Card */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ color: '#8b5cf6' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Memberships</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Groups
              </div>
              <span style={{ color: '#fff', fontWeight: 500 }}>4</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><path d="M9 22v-4h6v4"></path><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path></svg>
                Departments
              </div>
              <span style={{ color: '#fff', fontWeight: 500 }}>1</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Tenants
              </div>
              <span style={{ color: '#fff', fontWeight: 500 }}>3</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                Workspaces
              </div>
              <span style={{ color: '#fff', fontWeight: 500 }}>5</span>
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 13, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
            View all memberships <span>→</span>
          </div>
        </div>

        {/* Security Card */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ color: '#8b5cf6' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Security</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>MFA</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Enabled</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>SSO</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Enabled</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Password Policy</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Compliant</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', marginTop: 'auto' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Last changed 34 days ago
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 13, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
            View security settings <span>→</span>
          </div>
        </div>

        {/* Quick Activity Card */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ color: '#8b5cf6' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Quick Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Password last changed
              </div>
              <span style={{ color: '#fff' }}>Apr 18, 2024</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                Active sessions
              </div>
              <span style={{ color: '#fff' }}>2</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                API access
              </div>
              <span style={{ color: '#fff' }}>3 keys</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Last activity
              </div>
              <span style={{ color: '#fff' }}>May 21, 2024 10:30 AM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Account status
              </div>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 6, fontWeight: 500 }}>Active</span>
            </div>
          </div>
          <div style={{ color: '#8b5cf6', fontSize: 13, cursor: 'pointer', marginTop: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
            View all activity <span>→</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Full Width */}
      <div className="widget" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Recent Activity</h3>
        <button className="btn" style={{ fontSize: 13, color: '#8b5cf6', borderColor: 'var(--border-color)', display: 'flex', alignItems: 'center', gap: 6 }}>
          View all activity <span>→</span>
        </button>
      </div>
    </div>
  );
}
