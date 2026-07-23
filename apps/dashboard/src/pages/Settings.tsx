import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function Settings() {
  const { showToast } = useToast();
  
  const [preferences, setPreferences] = useState({
    invite: true,
    require2fa: true,
    export: true
  });

  const handleSave = () => {
    showToast('Organization settings saved successfully', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>General Settings</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Manage your organization details, preferences and settings.</div>
        </div>
        <button className="btn btn-primary" onClick={handleSave} style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: 13, padding: '8px 16px' }}>
          Save Changes
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Top Grid: Profile and Preferences */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          
          {/* Organization Profile */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Organization Profile</h3>
            <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Update your organization information and details.</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Organization Name</label>
                <input type="text" className="input" defaultValue="Acme Corporation" style={{ width: '100%', fontSize: 13 }} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Organization ID</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="text" className="input" defaultValue="org_8f3a7b6c2d9e4a1b" readOnly style={{ width: '100%', fontSize: 13, fontFamily: 'monospace' }} />
                  <button className="btn" style={{ padding: '0 12px', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </button>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Description</label>
                <textarea className="input" rows={3} defaultValue="Building the future with AI-powered solutions and intelligent automation." style={{ width: '100%', fontSize: 13, resize: 'vertical' }}></textarea>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Website</label>
                <input type="text" className="input" defaultValue="https://acme.com" style={{ width: '100%', fontSize: 13 }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Industry</label>
                  <select className="input" style={{ width: '100%', fontSize: 13 }}>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Organization Size</label>
                  <select className="input" style={{ width: '100%', fontSize: 13 }}>
                    <option>201-500 employees</option>
                    <option>501-1000 employees</option>
                    <option>1000+ employees</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preferences */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Preferences</h3>
            <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Configure your organization preferences.</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Allow members to invite others</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Allow organization members to invite new users.</div>
                </div>
                <div 
                  onClick={() => setPreferences(p => ({...p, invite: !p.invite}))}
                  style={{ width: 44, height: 24, borderRadius: 12, background: preferences.invite ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
                >
                  <div style={{ position: 'absolute', top: 2, left: preferences.invite ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Require 2FA for all members</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Enforce two-factor authentication for all users.</div>
                </div>
                <div 
                  onClick={() => setPreferences(p => ({...p, require2fa: !p.require2fa}))}
                  style={{ width: 44, height: 24, borderRadius: 12, background: preferences.require2fa ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
                >
                  <div style={{ position: 'absolute', top: 2, left: preferences.require2fa ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Session timeout</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Automatically log out inactive users.</div>
                </div>
                <select className="input" style={{ width: 140, fontSize: 13, padding: '8px 12px' }}>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>12 hours</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Default language</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Select default language for the organization.</div>
                </div>
                <select className="input" style={{ width: 140, fontSize: 13, padding: '8px 12px' }}>
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Allow data export</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Allow members to export organization data.</div>
                </div>
                <div 
                  onClick={() => setPreferences(p => ({...p, export: !p.export}))}
                  style={{ width: 44, height: 24, borderRadius: 12, background: preferences.export ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s' }}
                >
                  <div style={{ position: 'absolute', top: 2, left: preferences.export ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Organization Logo */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Organization Logo</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Upload and manage your organization logo.</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Upload Area */}
            <div style={{ border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'rgba(0,0,0,0.1)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#6d28d9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 600 }}>
                AC
              </div>
              <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Change Logo
              </button>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>PNG, JPG or SVG. Max size 2MB.</div>
            </div>

            {/* Preview Area */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Preview</div>
              <div style={{ background: '#0f111a', border: '1px solid var(--border-color)', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#6d28d9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>
                    AC
                  </div>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>Acme Corporation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--text-secondary)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, position: 'relative' }}>
                    MK
                    <div style={{ position: 'absolute', bottom: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', border: '2px solid #0f111a' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Contact Information</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Update organization contact details.</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Primary Contact Name</label>
              <input type="text" className="input" defaultValue="Mukesh Kumar" style={{ width: '100%', fontSize: 13 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Email</label>
              <input type="email" className="input" defaultValue="admin@acme.com" style={{ width: '100%', fontSize: 13 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Phone</label>
              <input type="tel" className="input" defaultValue="+91 98765 43210" style={{ width: '100%', fontSize: 13 }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
