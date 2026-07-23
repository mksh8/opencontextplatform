import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const TABS = ['General', 'Login Page', 'Email Templates', 'Custom Domain', 'Favicon & App Icon'];

export default function Branding() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('General');
  const [primaryColor, setPrimaryColor] = useState('#7C3AED');
  const [secondaryColor, setSecondaryColor] = useState('#2563EB');
  const [hidePlatform, setHidePlatform] = useState(false);
  const [darkDefault, setDarkDefault] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <div onClick={onChange} style={{ width: 44, height: 24, borderRadius: 12, background: value ? '#7c3aed' : 'var(--border-color)', position: 'relative', cursor: 'pointer', transition: '0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: value ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>Branding</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Customize your organization's brand identity and how it appears across the platform.</div>
        </div>
        <button className="btn btn-primary" style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={() => showToast('Branding settings saved successfully', 'success')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 24 }}>
        {TABS.map(t => (
          <div key={t} onClick={() => setActiveTab(t)} style={{ padding: '10px 18px', borderBottom: activeTab === t ? '2px solid #8b5cf6' : '2px solid transparent', color: activeTab === t ? '#fff' : 'var(--text-secondary)', fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>{t}</div>
        ))}
      </div>

      {activeTab === 'General' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Organization Identity */}
            <div className="widget" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Organization Identity</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>These details will represent your organization across the platform.</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Organization Name</label>
                  <input type="text" className="input" defaultValue="Acme Corporation" style={{ width: '100%', fontSize: 13 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Tagline </span>
                    <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: 11 }}>(Optional)</span>
                  </label>
                  <input type="text" className="input" defaultValue="Build. Scale. Succeed." style={{ width: '100%', fontSize: 13 }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Light Logo */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Logo</label>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>This logo will appear in the sidebar, header and other places.</div>
                  <div style={{ border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: 'rgba(0,0,0,0.1)' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 12, background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700 }}>A</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button className="btn" style={{ fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        Change Logo
                      </button>
                      <span style={{ color: '#ef4444', fontSize: 12, cursor: 'pointer' }}>Remove</span>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Recommended: PNG or SVG, max 2MB</div>
                  </div>
                </div>

                {/* Dark Mode Logo */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Dark Mode Logo </span>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic' }}>(Optional)</span>
                  </label>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>Used in dark mode and on dark backgrounds.</div>
                  <div style={{ border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: 'rgba(0,0,0,0.3)' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700 }}>A</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button className="btn" style={{ fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        Change Logo
                      </button>
                      <span style={{ color: '#ef4444', fontSize: 12, cursor: 'pointer' }}>Remove</span>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Recommended: PNG or SVG, max 2MB</div>
                  </div>
                </div>
              </div>

              {/* Colors & Fonts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Primary Brand Color</label>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 10 }}>This color will be used for buttons, links, highlights and other UI elements.</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} style={{ width: 36, height: 36, borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }} />
                    <input type="text" className="input" value={primaryColor.toUpperCase()} onChange={e => setPrimaryColor(e.target.value)} style={{ flex: 1, fontSize: 13, fontFamily: 'monospace' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Secondary Color </span>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic' }}>(Optional)</span>
                  </label>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 10, height: 16 }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} style={{ width: 36, height: 36, borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }} />
                    <input type="text" className="input" value={secondaryColor.toUpperCase()} onChange={e => setSecondaryColor(e.target.value)} style={{ flex: 1, fontSize: 13, fontFamily: 'monospace' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Font Family</label>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>Select the default font family for your organization.</div>
                  <select className="input" style={{ width: '100%', fontSize: 13 }}>
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>DM Sans</option>
                    <option>Outfit</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, marginBottom: 8 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Brand Voice </span>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic' }}>(Optional)</span>
                  </label>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>This will be used to personalize system communications.</div>
                  <select className="input" style={{ width: '100%', fontSize: 13 }}>
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Formal</option>
                    <option>Casual</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Branding Options */}
            <div className="widget" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 24px 0', color: '#fff' }}>Additional Branding Options</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
                    iconBg: 'rgba(139,92,246,0.15)', iconColor: '#8b5cf6',
                    label: 'Custom CSS', sub: 'Add custom CSS to further customize the look and feel.',
                    action: <button className="btn" style={{ fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => showToast('Opening CSS editor...', 'info')}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Edit CSS</button>
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
                    iconBg: 'rgba(59,130,246,0.15)', iconColor: '#3b82f6',
                    label: 'Hide Platform Branding', sub: 'Remove "Powered by" and platform branding from the interface.',
                    action: <Toggle value={hidePlatform} onChange={() => setHidePlatform(p => !p)} />
                  },
                  {
                    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
                    iconBg: 'rgba(16,185,129,0.15)', iconColor: '#10b981',
                    label: 'Dark Mode as Default', sub: 'Make dark mode the default theme for all users.',
                    action: <Toggle value={darkDefault} onChange={() => setDarkDefault(p => !p)} />
                  },
                ].map((item, i, arr) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: item.iconBg, color: item.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#fff', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.sub}</div>
                    </div>
                    {item.action}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Live Preview */}
            <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Live Preview</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 20 }}>See how your branding looks across the platform.</div>

              {/* Mini preview UI */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: 10, overflow: 'hidden', fontSize: 11 }}>
                {/* Mini topbar */}
                <div style={{ background: '#0f1117', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: primaryColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>A</div>
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 500 }}>Acme Corporation</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 4, padding: '3px 8px', color: 'var(--text-secondary)', fontSize: 10, width: 80 }}>Search anything...</div>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#8b5cf6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9 }}>MK</div>
                  </div>
                </div>
                {/* Mini layout */}
                <div style={{ display: 'flex', background: '#0c0e16' }}>
                  {/* Mini sidebar */}
                  <div style={{ width: 80, background: '#0f1117', borderRight: '1px solid var(--border-color)', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {['Home', 'Dashboard', 'Projects', 'Analytics', 'Settings'].map((item, i) => (
                      <div key={i} style={{ padding: '4px 6px', borderRadius: 4, background: i === 1 ? primaryColor : 'transparent', color: i === 1 ? '#fff' : 'var(--text-secondary)', fontSize: 9 }}>{item}</div>
                    ))}
                  </div>
                  {/* Mini content */}
                  <div style={{ flex: 1, padding: 12 }}>
                    <div style={{ color: '#fff', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Welcome back, Mukesh! 👋</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 9, marginBottom: 10 }}>Here's what's happening with your workspace today.</div>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                      {[
                        { label: 'Total Projects', value: '24', trend: '↑ 12%' },
                        { label: 'Active Users', value: '156', trend: '↑ 8%' },
                        { label: 'API Calls', value: '2.4M', trend: '↑ 18%' },
                      ].map((k, j) => (
                        <div key={j} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 4, padding: '6px 8px', border: '1px solid var(--border-color)' }}>
                          <div style={{ color: 'var(--text-secondary)', fontSize: 8, marginBottom: 2 }}>{k.label}</div>
                          <div style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{k.value}</div>
                          <div style={{ color: '#10b981', fontSize: 8 }}>{k.trend} this month</div>
                        </div>
                      ))}
                    </div>
                    {/* Mini chart */}
                    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 4, padding: 8, border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ color: '#fff', fontSize: 9, fontWeight: 500 }}>Usage Overview</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: 8 }}>This Month</span>
                      </div>
                      <svg viewBox="0 0 200 50" style={{ width: '100%', height: 40 }}>
                        <polyline points="0,40 40,25 80,30 120,15 160,20 200,10" fill="none" stroke={primaryColor} strokeWidth="2" />
                        <polyline points="0,45 40,35 80,38 120,28 160,32 200,22" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.6" />
                        <text x="0" y="49" fill="rgba(255,255,255,0.3)" fontSize="6">May 1</text>
                        <text x="45" y="49" fill="rgba(255,255,255,0.3)" fontSize="6">May 7</text>
                        <text x="90" y="49" fill="rgba(255,255,255,0.3)" fontSize="6">May 14</text>
                        <text x="140" y="49" fill="rgba(255,255,255,0.3)" fontSize="6">May 21</text>
                        <text x="175" y="49" fill="rgba(255,255,255,0.3)" fontSize="6">May 31</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Guidelines */}
            <div className="widget" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Brand Guidelines</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 20 }}>Download branding assets and guidelines for your organization.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '📄', name: 'Brand Guidelines', meta: 'PDF • 1.2 MB' },
                  { icon: '🗜️', name: 'Logo Pack (ZIP)', meta: 'ZIP • 3.4 MB' },
                  { icon: '🎨', name: 'Color Palette', meta: 'PDF • 0.8 MB' },
                ].map((file, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(0,0,0,0.15)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 20 }}>{file.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, color: '#fff', marginBottom: 2 }}>{file.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{file.meta}</div>
                      </div>
                    </div>
                    <button className="btn" style={{ padding: '4px 8px' }} onClick={() => showToast(`Downloading ${file.name}...`, 'info')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : activeTab === 'Login Page' ? (
        <LoginPageTab primaryColor={primaryColor} showToast={showToast} />
      ) : activeTab === 'Email Templates' ? (
        <EmailTemplatesTab primaryColor={primaryColor} showToast={showToast} />
      ) : activeTab === 'Custom Domain' ? (
        <CustomDomainTab showToast={showToast} />
      ) : activeTab === 'Favicon & App Icon' ? (
        <FaviconAppIconTab showToast={showToast} />
      ) : (
        <div className="widget" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎨</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>The <strong style={{ color: '#fff' }}>{activeTab}</strong> settings are coming soon.</p>
        </div>
      )}
    </div>
  );
}

/* ─── Favicon & App Icon Tab ────────────────────────────── */
function FaviconAppIconTab({ showToast }: { showToast: (msg: string, type: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 300px', gap: 24, alignItems: 'start' }}>
      
      {/* Column 1: Upload and Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="widget" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Favicon & App Icon</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Upload and manage favicons and app icons for your organization.</div>

          {/* Favicon Section */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Favicon (Browser Tab)</h4>
            <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>Recommended: 32x32px or 64x64px (PNG, ICO, SVG)</div>
            
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ width: 80, height: 80, borderRadius: 16, background: '#fff', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>A</div>
              </div>
              <div style={{ flex: 1, border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 12, padding: '16px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', cursor: 'pointer' }}
                onClick={() => showToast('Favicon upload simulation initiated', 'info')}>
                <svg style={{ color: 'var(--text-secondary)', marginBottom: 8 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span style={{ fontSize: 13, color: '#fff', fontWeight: 500, marginBottom: 2 }}>Upload new favicon</span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>PNG, ICO, SVG (max 2MB)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
              {[
                { size: '16x16', dim: 16, fs: 10 },
                { size: '32x32', dim: 32, fs: 16 },
                { size: '48x48', dim: 48, fs: 22 },
                { size: '64x64', dim: 64, fs: 28 },
              ].map((f, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: f.dim, height: f.dim, borderRadius: f.dim > 16 ? 8 : 4, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: f.fs, fontWeight: 700 }}>A</div>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.size}</span>
                </div>
              ))}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '24px 0' }} />

          {/* App Icon Section */}
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>App Icon (PWA / Mobile)</h4>
            <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>Recommended: 192x192px or 512x512px (PNG)</div>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ width: 80, height: 80, borderRadius: 16, background: '#fff', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700 }}>A</div>
              </div>
              <div style={{ flex: 1, border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 12, padding: '16px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', cursor: 'pointer' }}
                onClick={() => showToast('App Icon upload simulation initiated', 'info')}>
                <svg style={{ color: 'var(--text-secondary)', marginBottom: 8 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span style={{ fontSize: 13, color: '#fff', fontWeight: 500, marginBottom: 2 }}>Upload new app icon</span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>PNG (max 2MB)</span>
              </div>
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 12 }}>Common sizes preview</div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
              {[
                { size: '192x192', dim: 36, fs: 18 },
                { size: '512x512', dim: 48, fs: 24 },
                { size: '180x180 (iOS)', dim: 60, fs: 30 },
                { size: '512x512 (Android)', dim: 72, fs: 36 },
              ].map((f, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: f.dim, height: f.dim, borderRadius: idx === 2 ? 14 : 10, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: f.fs, fontWeight: 700 }}>A</div>
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 80 }}>{f.size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div style={{ display: 'flex', gap: 10, padding: '12px 16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
          <svg style={{ color: '#3b82f6', flexShrink: 0, marginTop: 1 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <span>Changes may take a few minutes to reflect across all platforms.</span>
        </div>
      </div>

      {/* Column 2: Live Platform Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="widget" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 16px 0', color: '#fff' }}>Preview Across Platforms</h3>

          {/* Browser Tab Preview */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Browser Tab</div>
            <div style={{ background: '#1e293b', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 6, padding: '8px 12px', background: '#0f172a', alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24' }}></div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                
                {/* Simulated Tab */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1e293b', padding: '4px 10px', borderRadius: '6px 6px 0 0', fontSize: 11, color: '#fff', marginLeft: 12, borderBottom: 'none' }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700 }}>A</div>
                  <span>Acme Corporation</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 9, cursor: 'pointer', marginLeft: 4 }}>×</span>
                </div>
              </div>
              {/* Address bar */}
              <div style={{ padding: '6px 12px', background: '#1e293b', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 8, color: 'var(--text-secondary)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                </div>
                <div style={{ flex: 1, background: '#0f172a', borderRadius: 4, padding: '3px 10px', fontSize: 10, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <span>https://app.acmecorp.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bookmarks Preview */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Bookmarks / Shortcuts</div>
            <div style={{ background: '#1e293b', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 5, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>A</div>
              <span style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>Acme Corporation</span>
            </div>
          </div>

          {/* PWA Install Prompt */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>PWA Install Prompt (Mobile)</div>
            <div style={{ background: '#0f172a', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', padding: 16, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 10, fontWeight: 600, marginBottom: 12 }}>
                <span>9:41</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span>📶</span><span>🔋</span>
                </div>
              </div>
              
              {/* Prompt Box */}
              <div style={{ background: '#1e293b', borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>A</div>
                  <div>
                    <div style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>Acme Corporation</div>
                    <div style={{ fontSize: 9, color: 'var(--text-secondary)' }}>app.acmecorp.com</div>
                  </div>
                </div>
                <button style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 16, padding: '4px 14px', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => showToast('Install simulated', 'info')}>Install</button>
              </div>
            </div>
          </div>

          {/* iOS Home Screen */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>iOS Home Screen</div>
            <div style={{ background: '#0f172a', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 10, fontWeight: 600, marginBottom: 12 }}>
                <span>9:41</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span>📶</span><span>🔋</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💬</div>
                  <span style={{ fontSize: 8, color: '#fff' }}>Messages</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: '#fff', color: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700 }}>
                    <span style={{ color: 'red', fontSize: 6 }}>MON</span>
                    <span>21</span>
                  </div>
                  <span style={{ fontSize: 8, color: '#fff' }}>Calendar</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🖼️</div>
                  <span style={{ fontSize: 8, color: '#fff' }}>Photos</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>A</div>
                  <span style={{ fontSize: 8, color: '#fff' }}>Acme</span>
                </div>
              </div>
            </div>
          </div>

          {/* Android Home Screen */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Android Home Screen</div>
            <div style={{ background: '#0f172a', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 10, fontWeight: 600, marginBottom: 12 }}>
                <span>11:30</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span>📶</span><span>🔋</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✉️</div>
                  <span style={{ fontSize: 8, color: '#fff' }}>Gmail</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🌐</div>
                  <span style={{ fontSize: 8, color: '#fff' }}>Chrome</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📍</div>
                  <span style={{ fontSize: 8, color: '#fff' }}>Maps</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>A</div>
                  <span style={{ fontSize: 8, color: '#fff' }}>Acme</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Column 3: Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Icon Guidelines */}
        <div className="widget" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 16px 0', color: '#fff' }}>Icon Guidelines</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Use a simple, high-contrast design',
              'Avoid small text or intricate details',
              'Square format works best',
              'Transparent background recommended',
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: 'var(--text-secondary)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Formats */}
        <div className="widget" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px 0', color: '#fff' }}>Favicon Formats Supported</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {['PNG', 'ICO', 'SVG'].map((f, i) => (
              <span key={i} style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Current Settings */}
        <div className="widget" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 16px 0', color: '#fff' }}>Current Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Favicon</span>
              <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
                favicon.ico
                <span style={{ color: '#10b981', fontSize: 11 }}>✓ Active</span>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>App Icon</span>
              <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
                app-icon.png
                <span style={{ color: '#10b981', fontSize: 11 }}>✓ Active</span>
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Last Updated</span>
              <span style={{ color: '#fff' }}>May 21, 2025 10:15 AM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Updated By</span>
              <span style={{ color: '#fff' }}>Mukesh Kumar</span>
            </div>
          </div>
        </div>

        {/* Reset to Default */}
        <div className="widget" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 6px 0', color: '#fff' }}>Reset to Default</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 14 }}>Revert to platform default icons.</div>
          <button className="btn" style={{ width: '100%', justifyContent: 'center', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => showToast('Reverted to defaults', 'info')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            Reset
          </button>
        </div>

        {/* Need Help */}
        <div className="widget" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 6px 0', color: '#fff' }}>Need help?</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 12 }}>Read our docs on branding and icon best practices.</div>
          <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => showToast('Opening docs...', 'info')}>
            View Documentation <span>↗</span>
          </div>
        </div>

      </div>

    </div>
  );
}


/* ─── Custom Domain Tab ──────────────────────────────────── */
function CustomDomainTab({ showToast }: { showToast: (msg: string, type: string) => void }) {
  const [domain] = useState('app.acmecorp.com');

  const CopyBtn = ({ text }: { text: string }) => (
    <svg onClick={() => { navigator.clipboard?.writeText(text); showToast('Copied to clipboard', 'success'); }} style={{ color: 'var(--text-secondary)', cursor: 'pointer', flexShrink: 0 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Custom Domain Input */}
        <div className="widget" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Custom Domain</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Set up a custom domain for your organization to use across the platform.</div>

          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Enter your custom domain</label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: '1px solid rgba(16,185,129,0.4)', borderRadius: 8, background: 'rgba(16,185,129,0.04)' }}>
              <span style={{ flex: 1, fontSize: 13, color: '#fff' }}>{domain}</span>
              <span style={{ fontSize: 11, color: '#10b981', fontWeight: 500 }}>Verified</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <button style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#ef4444', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}
              onClick={() => showToast('Remove domain confirmation required', 'error')}>
              Remove Domain
            </button>
          </div>

          {/* Status Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20, padding: 16, background: 'rgba(0,0,0,0.15)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#10b981' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <div>
                  <div style={{ fontWeight: 500 }}>Domain is active</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Your custom domain is connected and secure.</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Last Verified</div>
              <div style={{ fontSize: 13, color: '#fff' }}>May 21, 2025 10:30 AM</div>
            </div>
          </div>
        </div>

        {/* DNS Configuration */}
        <div className="widget" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>DNS Configuration</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>Add the following DNS records to your domain provider.</div>

          {/* DNS Table */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 80px 1fr 60px 80px', gap: 0, padding: '10px 16px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>Type</span>
              <span>Name / Host</span>
              <span>Value / Points to</span>
              <span>TTL</span>
              <span>Status</span>
            </div>
            {[
              { type: 'CNAME', name: 'app', value: 'cname.vercel-dns.com', ttl: '3600', status: 'Verified' },
              { type: 'CNAME', name: 'www', value: 'cname.vercel-dns.com', ttl: '3600', status: 'Verified' },
              { type: 'TXT', name: '@', value: 'vc-domain-verify=acmecorp-com-abc123', ttl: '3600', status: 'Verified' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 80px 1fr 60px 80px', gap: 0, padding: '14px 16px', borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none', alignItems: 'center', fontSize: 12 }}>
                <span style={{ color: '#a855f7', fontFamily: 'monospace', fontWeight: 500 }}>{row.type}</span>
                <span style={{ color: '#fff' }}>{row.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 11 }}>{row.value}</span>
                  <CopyBtn text={row.value} />
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>{row.ttl}</span>
                <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Verified
                </span>
              </div>
            ))}
          </div>

          {/* DNS note */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, padding: '12px 16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
            <svg style={{ color: '#3b82f6', flexShrink: 0, marginTop: 1 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <div>
              DNS changes may take up to 24–48 hours to propagate globally.{' '}
              <span style={{ color: '#3b82f6', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                Learn more about DNS setup
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </span>
            </div>
          </div>
        </div>

        {/* SSL Certificate */}
        <div className="widget" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <svg style={{ color: '#10b981' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>SSL Certificate</h3>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20 }}>Your custom domain is secured with an SSL certificate.</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: 16, alignItems: 'center', padding: '16px', background: 'rgba(0,0,0,0.1)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12 }}>
            <div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Certificate Provider</div>
              <div style={{ color: '#fff', fontWeight: 500 }}>Let's Encrypt</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Status</div>
              <div style={{ color: '#10b981', fontWeight: 500 }}>Active</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Valid From</div>
              <div style={{ color: '#fff' }}>May 21, 2025</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Valid Until</div>
              <div style={{ color: '#fff' }}>Aug 19, 2025</div>
            </div>
            <button className="btn" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
              onClick={() => showToast('Renewing certificate...', 'info')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              Renew Certificate
            </button>
          </div>
        </div>

      </div>

      {/* Right Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Domain Overview */}
        <div className="widget" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Domain Overview</h3>
            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>Active</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 20 }}>Your custom domain configuration summary.</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 12 }}>
            {[
              { label: 'Domain', value: domain, color: '#fff' },
              { label: 'Status', value: '● Active', color: '#10b981' },
              { label: 'SSL', value: '🔒 Secure', color: '#10b981' },
              { label: 'Redirect www', value: 'Enabled', color: '#fff' },
              { label: 'HSTS', value: 'Enabled', color: '#fff' },
              { label: 'Force HTTPS', value: 'Enabled', color: '#fff' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < 5 ? 14 : 0, borderBottom: i < 5 ? '1px solid var(--border-color)' : 'none' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                <span style={{ color: row.color, fontFamily: row.label === 'Domain' ? 'monospace' : 'inherit', fontSize: row.label === 'Domain' ? 11 : 12 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Enabled */}
        <div className="widget" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 20px 0', color: '#fff' }}>Features Enabled</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { title: 'Custom login URL', desc: 'Users will login using your custom domain' },
              { title: 'Branded emails', desc: 'Emails will be sent from your custom domain' },
              { title: 'Password reset', desc: 'Password reset links will use your custom domain' },
              { title: 'API access', desc: 'API requests can be made using your domain' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: '#fff', marginBottom: 2 }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help */}
        <div className="widget" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>Need Help?</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>Check our documentation or reach out to support.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn" style={{ width: '100%', justifyContent: 'center', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => showToast('Opening documentation...', 'info')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              View Documentation
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </button>
            <button className="btn" style={{ width: '100%', justifyContent: 'center', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => showToast('Opening support...', 'info')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Email Templates Tab ────────────────────────────────── */
const TEMPLATES = [
  { id: 1, name: 'Welcome Email', desc: 'Sent to new users after registration', category: 'Onboarding', categoryColor: '#8b5cf6', updated: 'May 21, 2025 10:15 AM', status: 'Active', icon: '✉️', iconBg: '#4f46e5' },
  { id: 2, name: 'Email Verification', desc: "Verify user's email address", category: 'Onboarding', categoryColor: '#8b5cf6', updated: 'May 21, 2025 09:45 AM', status: 'Active', icon: '✉️', iconBg: '#4f46e5' },
  { id: 3, name: 'Password Reset', desc: 'Sent when user resets password', category: 'Security', categoryColor: '#10b981', updated: 'May 20, 2025 04:30 PM', status: 'Active', icon: '🔑', iconBg: '#059669' },
  { id: 4, name: 'Invite to Workspace', desc: 'Invite users to join workspace', category: 'Collaboration', categoryColor: '#f59e0b', updated: 'May 19, 2025 02:10 PM', status: 'Active', icon: '👤', iconBg: '#d97706' },
  { id: 5, name: 'Billing Invoice', desc: 'Sent when invoice is generated', category: 'Billing', categoryColor: '#3b82f6', updated: 'May 19, 2025 11:20 AM', status: 'Active', icon: '💳', iconBg: '#2563eb' },
  { id: 6, name: 'Subscription Renewal', desc: 'Subscription renewal reminder', category: 'Billing', categoryColor: '#3b82f6', updated: 'May 18, 2025 10:00 AM', status: 'Draft', icon: '🔄', iconBg: '#1d4ed8' },
  { id: 7, name: 'Security Alert', desc: 'Important security notifications', category: 'Security', categoryColor: '#10b981', updated: 'May 18, 2025 09:10 AM', status: 'Active', icon: '🛡️', iconBg: '#dc2626' },
  { id: 8, name: 'Product Update', desc: 'Product updates and announcements', category: 'Updates', categoryColor: '#ec4899', updated: 'May 17, 2025 06:40 PM', status: 'Active', icon: '📢', iconBg: '#7c3aed' },
];

function EmailTemplatesTab({ primaryColor, showToast }: { primaryColor: string; showToast: (msg: string, type: string) => void }) {
  const [selected, setSelected] = useState(TEMPLATES[0]);
  const [previewTab, setPreviewTab] = useState<'Edit' | 'Preview' | 'Settings'>('Preview');
  const [previewAs, setPreviewAs] = useState('New User');
  const [previewMode, setPreviewMode] = useState<'Desktop' | 'Mobile'>('Desktop');
  const [search, setSearch] = useState('');

  const filtered = TEMPLATES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 24, alignItems: 'start' }}>

      {/* Left: Template List */}
      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Email Templates</h3>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Customize the content and design of emails sent to your users.</div>
          </div>
          <button className="btn btn-primary" style={{ background: primaryColor, borderColor: primaryColor, fontSize: 12, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => showToast('New template editor opening...', 'info')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            New Template
          </button>
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: 12, padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 10, top: 9, color: 'var(--text-secondary)' }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..." className="input" style={{ width: '100%', paddingLeft: 32, fontSize: 12 }} />
          </div>
          <select className="input" style={{ width: 140, fontSize: 12 }}>
            <option>All Categories</option>
            <option>Onboarding</option>
            <option>Security</option>
            <option>Billing</option>
            <option>Collaboration</option>
          </select>
        </div>

        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 100px 140px 80px 36px', gap: 0, padding: '10px 24px', background: 'rgba(0,0,0,0.1)', borderBottom: '1px solid var(--border-color)', fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
          <span>Template Name</span>
          <span>Category</span>
          <span>Last Updated</span>
          <span>Status</span>
          <span></span>
        </div>

        {/* Rows */}
        {filtered.map(t => (
          <div key={t.id} onClick={() => setSelected(t)} style={{ display: 'grid', gridTemplateColumns: '2fr 100px 140px 80px 36px', gap: 0, padding: '14px 24px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: selected.id === t.id ? 'rgba(139,92,246,0.08)' : 'transparent', transition: 'background 0.15s', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: t.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 500, marginBottom: 2 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.desc}</div>
              </div>
            </div>
            <div>
              <span style={{ background: `${t.categoryColor}22`, color: t.categoryColor, padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 500 }}>{t.category}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.updated}</div>
            <div>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: t.status === 'Active' ? '#10b981' : '#f59e0b' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.status === 'Active' ? '#10b981' : '#f59e0b' }}></div>
                {t.status}
              </span>
            </div>
            <div>
              <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div style={{ padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--text-secondary)' }}>
          <span>Showing 1 to {filtered.length} of 8 templates</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <button style={{ width: 26, height: 26, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>&lt;</button>
            <button style={{ width: 26, height: 26, background: primaryColor, border: 'none', color: '#fff', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}>1</button>
            <button style={{ width: 26, height: 26, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>&gt;</button>
          </div>
        </div>
      </div>

      {/* Right: Preview Panel */}
      <div className="widget" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Preview header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{selected.name}</span>
              <span style={{ background: `${selected.categoryColor}22`, color: selected.categoryColor, padding: '2px 8px', borderRadius: 4, fontSize: 10 }}>{selected.category}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#10b981' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                Active
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </div>
          </div>
          {/* Sub tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-color)', marginBottom: -17 }}>
            {(['Edit', 'Preview', 'Settings'] as const).map(tab => (
              <div key={tab} onClick={() => setPreviewTab(tab)} style={{ padding: '6px 14px', fontSize: 12, color: previewTab === tab ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', borderBottom: previewTab === tab ? '2px solid #8b5cf6' : '2px solid transparent', fontWeight: previewTab === tab ? 500 : 400 }}>{tab}</div>
            ))}
          </div>
        </div>

        {previewTab === 'Preview' ? (
          <>
            {/* Preview controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                Preview as
                <select value={previewAs} onChange={e => setPreviewAs(e.target.value)} className="input" style={{ fontSize: 11, padding: '3px 8px', width: 'auto' }}>
                  <option>New User</option>
                  <option>Existing User</option>
                  <option>Admin</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['Desktop', 'Mobile'] as const).map(m => (
                  <button key={m} onClick={() => setPreviewMode(m)} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, border: `1px solid ${previewMode === m ? '#8b5cf6' : 'var(--border-color)'}`, background: previewMode === m ? 'rgba(139,92,246,0.15)' : 'transparent', color: previewMode === m ? '#fff' : 'var(--text-secondary)', cursor: 'pointer' }}>{m}</button>
                ))}
                <button className="btn" style={{ fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}
                  onClick={() => showToast(`Test email sent to admin@acme.com`, 'success')}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  Send Test Email
                </button>
              </div>
            </div>

            {/* Email Preview */}
            <div style={{ padding: 20, background: 'rgba(0,0,0,0.15)', flex: 1 }}>
              <div style={{ maxWidth: previewMode === 'Mobile' ? 320 : '100%', margin: '0 auto', background: '#ffffff', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                {/* Email header bar */}
                <div style={{ background: '#f8f9fa', padding: '12px 24px', borderBottom: '1px solid #e9ecef', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: primaryColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>A</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>Acme Corporation</span>
                </div>

                {/* Email body */}
                <div style={{ padding: '28px 32px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
                  <h2 style={{ color: '#1a1a1a', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                    Welcome to Acme Corporation, {'{{first_name}}'} 👋
                  </h2>
                  <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>
                    We're excited to have you on board. Your account has been successfully created. Here's what you can do next.
                  </p>

                  {/* Action cards */}
                  <div style={{ background: '#f8f9fa', borderRadius: 10, padding: '16px 20px', textAlign: 'left', marginBottom: 24 }}>
                    {[
                      { icon: '🚀', title: 'Get started', desc: 'Explore your workspace and set up your profile.' },
                      { icon: '👥', title: 'Invite your team', desc: 'Collaborate with your colleagues and get more done.' },
                      { icon: '❓', title: 'Need help?', desc: 'Check out our documentation or contact support.' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < 2 ? '1px solid #e9ecef' : 'none' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: i === 0 ? `${primaryColor}22` : i === 1 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <div style={{ color: '#1a1a1a', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                          <div style={{ color: '#777', fontSize: 12 }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <div style={{ background: primaryColor, color: '#fff', borderRadius: 6, padding: '11px 32px', display: 'inline-block', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 20 }}>Go to Dashboard</div>

                  <p style={{ color: '#777', fontSize: 12, marginBottom: 16 }}>
                    If you have any questions, feel free to reply to this email.
                  </p>
                  <p style={{ color: '#555', fontSize: 12, marginBottom: 0 }}>Thanks,<br /><strong>The Acme Team</strong></p>

                  {/* Social icons */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 24, marginBottom: 16 }}>
                    {['𝕏', 'in', '📌'].map((icon, i) => (
                      <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: '#374151', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer' }}>{icon}</div>
                    ))}
                  </div>
                  <div style={{ color: '#aaa', fontSize: 10, paddingTop: 12, borderTop: '1px solid #e9ecef' }}>
                    © 2025 Acme Corporation. All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : previewTab === 'Edit' ? (
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Subject Line</label>
              <input className="input" defaultValue={`Welcome to Acme Corporation, {{first_name}}!`} style={{ width: '100%', fontSize: 13 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Preheader Text</label>
              <input className="input" defaultValue="Your account has been successfully created." style={{ width: '100%', fontSize: 13 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Body Content</label>
              <textarea className="input" rows={6} style={{ width: '100%', fontSize: 12, resize: 'vertical', fontFamily: 'monospace' }} defaultValue={`We're excited to have you on board.\n\nYour account has been successfully created.\n\nHere's what you can do next:\n- Get started\n- Invite your team\n- Need help?`}></textarea>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" style={{ background: primaryColor, borderColor: primaryColor, fontSize: 12 }} onClick={() => showToast('Template saved!', 'success')}>Save Changes</button>
              <button className="btn" style={{ fontSize: 12 }} onClick={() => setPreviewTab('Preview')}>Preview</button>
            </div>
          </div>
        ) : (
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, fontSize: 13 }}>
            {[
              { label: 'Template Name', value: selected.name },
              { label: 'Category', value: selected.category },
              { label: 'From Name', value: 'Acme Corporation' },
              { label: 'From Email', value: 'noreply@acme.com' },
              { label: 'Reply-to', value: 'support@acme.com' },
            ].map((field, i) => (
              <div key={i}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{field.label}</label>
                <input className="input" defaultValue={field.value} style={{ width: '100%', fontSize: 13 }} />
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 13, color: '#fff' }}>Template Status</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Active', 'Draft'].map(s => (
                  <button key={s} style={{ fontSize: 11, padding: '4px 12px', borderRadius: 5, border: `1px solid ${selected.status === s ? '#8b5cf6' : 'var(--border-color)'}`, background: selected.status === s ? 'rgba(139,92,246,0.15)' : 'transparent', color: selected.status === s ? '#fff' : 'var(--text-secondary)', cursor: 'pointer' }}>{s}</button>
                ))}
              </div>
            </div>
            <button className="btn btn-primary" style={{ background: primaryColor, borderColor: primaryColor, fontSize: 12, marginTop: 4 }} onClick={() => showToast('Settings saved!', 'success')}>Save Settings</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Login Page Tab ─────────────────────────────────────── */
function LoginPageTab({ primaryColor, showToast }: { primaryColor: string; showToast: (msg: string, type: string) => void }) {
  const [layout, setLayout] = useState<'left' | 'right'>('left');
  const [bgType, setBgType] = useState<'solid' | 'image'>('image');
  const [showOrgName, setShowOrgName] = useState(true);
  const [showPowered, setShowPowered] = useState(true);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <div onClick={onChange} style={{ width: 44, height: 24, borderRadius: 12, background: value ? '#7c3aed' : 'rgba(255,255,255,0.1)', position: 'relative', cursor: 'pointer', transition: '0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: value ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: '0.2s' }}></div>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>

      {/* Left: Settings Panel */}
      <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Login Page Settings</h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Customize the login experience for your users.</div>
        </div>

        {/* Layout */}
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>Layout</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {(['left', 'right'] as const).map(opt => (
              <div key={opt} onClick={() => setLayout(opt)} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, border: `1px solid ${layout === opt ? '#8b5cf6' : 'var(--border-color)'}`, background: layout === opt ? 'rgba(139,92,246,0.1)' : 'transparent', cursor: 'pointer', fontSize: 12, color: layout === opt ? '#fff' : 'var(--text-secondary)' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${layout === opt ? '#8b5cf6' : 'rgba(255,255,255,0.2)'}`, background: layout === opt ? '#8b5cf6' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {layout === opt && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }}></div>}
                </div>
                Image on {opt === 'left' ? 'Left' : 'Right'}
              </div>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>Logo</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 8, background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, flexShrink: 0 }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
                <button className="btn" style={{ fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Change Logo
                </button>
                <span style={{ color: '#ef4444', fontSize: 12, cursor: 'pointer', alignSelf: 'center' }}>Remove</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Recommended: PNG or SVG, max 2MB</div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>Background</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(['solid', 'image'] as const).map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: bgType === opt ? '#fff' : 'var(--text-secondary)' }}>
                <div onClick={() => setBgType(opt)} style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${bgType === opt ? '#8b5cf6' : 'rgba(255,255,255,0.2)'}`, background: bgType === opt ? '#8b5cf6' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {bgType === opt && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }}></div>}
                </div>
                {opt === 'solid' ? 'Solid Color' : 'Image / Illustration'}
              </label>
            ))}
          </div>
          {bgType === 'image' && (
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: 50, height: 36, borderRadius: 4, background: 'linear-gradient(135deg, #1a1040, #3b1f6b, #0f2040)', flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#fff', marginBottom: 2 }}>login-bg.jpg</div>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Recommended: 1920x1080px</div>
              </div>
              <svg style={{ color: '#ef4444', cursor: 'pointer', flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </div>
          )}
        </div>

        {/* Primary Color */}
        <div>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>Primary Color</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="color" value={primaryColor} readOnly style={{ width: 32, height: 32, borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }} />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.15)' }}>
              <span style={{ fontSize: 12, color: '#fff', fontFamily: 'monospace' }}>{primaryColor.toUpperCase()}</span>
              <svg style={{ color: 'var(--text-secondary)' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
          </div>
        </div>

        {/* Toggles */}
        {[
          { label: 'Show Organization Name', value: showOrgName, onChange: () => setShowOrgName(p => !p) },
          { label: 'Show "Powered by"', value: showPowered, onChange: () => setShowPowered(p => !p) },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: '#fff' }}>{item.label}</span>
            <Toggle value={item.value} onChange={item.onChange} />
          </div>
        ))}

        {/* Custom CSS */}
        <div style={{ padding: '14px 16px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <svg style={{ color: '#8b5cf6', marginTop: 2, flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#fff', marginBottom: 2 }}>Custom CSS <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: 11 }}>(Optional)</span></div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Add custom CSS to further customize the login page.</div>
          </div>
          <button className="btn" style={{ fontSize: 11, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }} onClick={() => showToast('Opening CSS editor...', 'info')}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit CSS
          </button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div className="widget" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Preview header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 4px 0', color: '#fff' }}>Live Preview</h3>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>This is how your login page will look for your users.</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['desktop', 'tablet', 'mobile'] as const).map(mode => (
                <label key={mode} onClick={() => setPreviewMode(mode)} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12, color: previewMode === mode ? '#fff' : 'var(--text-secondary)', padding: '4px 10px', borderRadius: 6, background: previewMode === mode ? 'rgba(139,92,246,0.2)' : 'transparent', border: previewMode === mode ? '1px solid rgba(139,92,246,0.4)' : '1px solid transparent' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', border: `2px solid ${previewMode === mode ? '#8b5cf6' : 'rgba(255,255,255,0.2)'}`, background: previewMode === mode ? '#8b5cf6' : 'transparent' }}></div>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Preview area */}
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: 24, minHeight: 420, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: previewMode === 'desktop' ? '100%' : previewMode === 'tablet' ? 560 : 320, maxWidth: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', height: 400 }}>

              {/* Image side */}
              {layout === 'left' && (
                <div style={{ flex: 1, background: 'linear-gradient(160deg, #1a0b3b 0%, #2d1060 40%, #0f1f45 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative', overflow: 'hidden' }}>
                  {/* Stars */}
                  {[...Array(20)].map((_, i) => (
                    <div key={i} style={{ position: 'absolute', width: Math.random() > 0.5 ? 2 : 1, height: Math.random() > 0.5 ? 2 : 1, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', top: `${5 + (i * 17) % 80}%`, left: `${(i * 23) % 90}%` }}></div>
                  ))}
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: primaryColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700 }}>A</div>
                  {showOrgName && <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Acme Corporation</div>}
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Build. Scale. Succeed.</div>
                  {/* Mountains silhouette */}
                  <svg viewBox="0 0 300 80" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                    <path d="M0,80 L60,30 L120,55 L180,15 L240,45 L300,25 L300,80 Z" fill="rgba(0,0,0,0.4)" />
                    <path d="M0,80 L40,50 L100,65 L160,35 L220,55 L280,40 L300,50 L300,80 Z" fill="rgba(0,0,0,0.5)" />
                  </svg>
                </div>
              )}

              {/* Form side */}
              <div style={{ width: layout === 'left' ? 280 : '100%', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 28px', flexShrink: 0 }}>
                <div style={{ color: '#111', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Welcome back 👋</div>
                <div style={{ color: '#555', fontSize: 12, marginBottom: 24 }}>Sign in to continue to your account</div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#333', marginBottom: 6, fontWeight: 500 }}>Email address</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 10px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    <span style={{ fontSize: 11, color: '#999' }}>Enter your email</span>
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: '#333', marginBottom: 6, fontWeight: 500 }}>Password</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 10px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      <span style={{ fontSize: 11, color: '#999' }}>Enter your password</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, fontSize: 11 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#555' }}>
                    <input type="checkbox" style={{ width: 11, height: 11 }} />
                    Remember me
                  </label>
                  <span style={{ color: primaryColor, cursor: 'pointer' }}>Forgot password?</span>
                </div>

                <div style={{ background: primaryColor, color: '#fff', borderRadius: 6, padding: '9px', textAlign: 'center', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginBottom: 14 }}>Sign in</div>

                <div style={{ textAlign: 'center', color: '#888', fontSize: 10, marginBottom: 14 }}>or</div>

                {[
                  { icon: '🌐', label: 'Continue with Google', border: '#dadce0' },
                  { icon: '🪟', label: 'Continue with Microsoft', border: '#dadce0' },
                ].map((btn, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: `1px solid ${btn.border}`, borderRadius: 6, padding: '7px', fontSize: 11, color: '#333', cursor: 'pointer', marginBottom: 8 }}>
                    <span>{btn.icon}</span> {btn.label}
                  </div>
                ))}

                <div style={{ textAlign: 'center', fontSize: 10, color: '#888', marginTop: 8 }}>
                  Don't have an account? <span style={{ color: primaryColor, cursor: 'pointer' }}>Contact your administrator</span>
                </div>
              </div>

              {/* Image side — right */}
              {layout === 'right' && (
                <div style={{ flex: 1, background: 'linear-gradient(160deg, #1a0b3b, #0f1f45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: '#fff', fontSize: 14, textAlign: 'center', opacity: 0.7 }}>Illustration</div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom info bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              Changes you make here will apply to all users in your organization.
            </div>
            <button className="btn" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => showToast('Reset to default settings', 'info')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
