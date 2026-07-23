import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function SecuritySSO() {
  const { showToast } = useToast();
  
  const [settings, setSettings] = useState({
    emailPassword: true,
    sso: true,
    mfaAll: true,
    mfaAdmins: true,
    ipAllowlist: true
  });

  const handleSave = () => {
    showToast('Security & SSO settings saved successfully', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>Security & SSO</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Manage authentication methods, access controls and security policies.</div>
        </div>
        <button className="btn btn-primary" onClick={handleSave} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: 13, padding: '8px 16px' }}>
          Save Changes
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Top Grid: Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Authentication Methods */}
            <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Authentication Methods</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Manage how users sign in to your organization.</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Email & Password</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Allow users to sign in with email and password.</div>
                  </div>
                  <div 
                    onClick={() => setSettings(s => ({...s, emailPassword: !s.emailPassword}))}
                    style={{ width: 44, height: 24, borderRadius: 12, background: settings.emailPassword ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
                  >
                    <div style={{ position: 'absolute', top: 2, left: settings.emailPassword ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Single Sign-On (SSO)</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Enable SSO via your identity provider.</div>
                  </div>
                  <div 
                    onClick={() => setSettings(s => ({...s, sso: !s.sso}))}
                    style={{ width: 44, height: 24, borderRadius: 12, background: settings.sso ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
                  >
                    <div style={{ position: 'absolute', top: 2, left: settings.sso ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Identity Provider</label>
                  <select className="input" style={{ width: '100%', fontSize: 13 }}>
                    <option>Okta</option>
                    <option>Auth0</option>
                    <option>Azure AD</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>SSO Configuration</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Configure your identity provider connection.</div>
                  </div>
                  <button className="btn" style={{ fontSize: 12, padding: '4px 12px' }}>Configure</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>SSO Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                    Active
                  </div>
                </div>

              </div>
            </div>

            {/* Multi-Factor Authentication (MFA) */}
            <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Multi-Factor Authentication (MFA)</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Add an extra layer of security for your users.</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Require MFA for all users</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Enforce multi-factor authentication for all users.</div>
                  </div>
                  <div 
                    onClick={() => setSettings(s => ({...s, mfaAll: !s.mfaAll}))}
                    style={{ width: 44, height: 24, borderRadius: 12, background: settings.mfaAll ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
                  >
                    <div style={{ position: 'absolute', top: 2, left: settings.mfaAll ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>MFA for Admins</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Require MFA for all admin users.</div>
                  </div>
                  <div 
                    onClick={() => setSettings(s => ({...s, mfaAdmins: !s.mfaAdmins}))}
                    style={{ width: 44, height: 24, borderRadius: 12, background: settings.mfaAdmins ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
                  >
                    <div style={{ position: 'absolute', top: 2, left: settings.mfaAdmins ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Single Sign-On (SSO) Details */}
            <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Single Sign-On (SSO) Details</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Configure your SSO connection.</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>SSO Login URL</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" className="input" defaultValue="https://acme.okta.com/app/acme/login" readOnly style={{ width: '100%', fontSize: 13 }} />
                    <button className="btn" style={{ padding: '0 12px', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Audience (SP Entity ID)</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" className="input" defaultValue="https://app.acme.com" readOnly style={{ width: '100%', fontSize: 13 }} />
                    <button className="btn" style={{ padding: '0 12px', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Issuer URL</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" className="input" defaultValue="https://acme.okta.com/oauth2/default" readOnly style={{ width: '100%', fontSize: 13 }} />
                    <button className="btn" style={{ padding: '0 12px', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Certificate</label>
                  <div style={{ background: 'rgba(0,0,0,0.1)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <svg style={{ color: 'var(--text-secondary)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      <div>
                        <div style={{ color: '#fff', fontSize: 13, marginBottom: 2 }}>okta_cert.pem</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>Expires on 12 Jun 2026</div>
                      </div>
                    </div>
                    <button className="btn" style={{ fontSize: 12, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      Download
                    </button>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Session & Access */}
            <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Session & Access</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Manage user sessions and access controls.</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Session timeout</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Automatically log out inactive users.</div>
                  </div>
                  <select className="input" style={{ width: 140, fontSize: 13, padding: '8px 12px' }}>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Idle session timeout</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Log out users after a period of inactivity.</div>
                  </div>
                  <select className="input" style={{ width: 140, fontSize: 13, padding: '8px 12px' }}>
                    <option>8 hours</option>
                    <option>12 hours</option>
                    <option>24 hours</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Remember me duration</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Duration for persistent login.</div>
                  </div>
                  <select className="input" style={{ width: 140, fontSize: 13, padding: '8px 12px' }}>
                    <option>7 days</option>
                    <option>14 days</option>
                    <option>30 days</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* IP Allowlist */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>IP Allowlist</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Restrict access to your organization from specific IP addresses.</div>
            </div>
            <div 
              onClick={() => setSettings(s => ({...s, ipAllowlist: !s.ipAllowlist}))}
              style={{ width: 44, height: 24, borderRadius: 12, background: settings.ipAllowlist ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
            >
              <div style={{ position: 'absolute', top: 2, left: settings.ipAllowlist ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Enable IP Allowlist</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Only allow access from whitelisted IP addresses.</div>
            </div>
            <button className="btn" style={{ fontSize: 13, padding: '6px 16px' }}>Manage IPs</button>
          </div>
        </div>

      </div>
    </div>
  );
}
