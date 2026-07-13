import React from 'react';

export default function Settings() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Settings</h1>
          <p>Manage your platform settings.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32 }}>
        
        {/* Left Inner Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div className="nav-item active" style={{ marginLeft: 0, padding: '10px 12px' }}>General</div>
          <div className="nav-item" style={{ marginLeft: 0, padding: '10px 12px' }}>Security</div>
          <div className="nav-item" style={{ marginLeft: 0, padding: '10px 12px' }}>Authentication & SSO</div>
          <div className="nav-item" style={{ marginLeft: 0, padding: '10px 12px' }}>Billing</div>
          <div className="nav-item" style={{ marginLeft: 0, padding: '10px 12px' }}>Integrations</div>
          <div className="nav-item" style={{ marginLeft: 0, padding: '10px 12px' }}>Advanced</div>
          <div className="nav-item" style={{ marginLeft: 0, padding: '10px 12px' }}>Tenant Configuration</div>
          <div className="nav-item" style={{ marginLeft: 0, padding: '10px 12px' }}>API Keys</div>
        </div>

        {/* Settings Form Area */}
        <div className="widget" style={{ flex: 1, padding: 32 }}>
          <h2 style={{ fontSize: 18, color: '#fff', fontWeight: 500, marginBottom: 24 }}>General Settings</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#fff', marginBottom: 8 }}>Platform Name</label>
              <input type="text" className="search-bar" defaultValue="OpenContextPlatform" style={{ width: '100%', maxWidth: 400 }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#fff', marginBottom: 8 }}>Platform Description</label>
              <textarea className="search-bar" style={{ width: '100%', maxWidth: 400, height: 80, resize: 'none', fontFamily: 'inherit' }} defaultValue="The Open Standard for AI Context"></textarea>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#fff', marginBottom: 8 }}>Default Workspace</label>
              <select className="search-bar" style={{ width: '100%', maxWidth: 400, cursor: 'pointer' }}>
                <option>Default Workspace</option>
                <option>Engineering</option>
                <option>Product</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#fff', marginBottom: 8 }}>Timezone</label>
              <select className="search-bar" style={{ width: '100%', maxWidth: 400, cursor: 'pointer' }}>
                <option>UTC (Coordinated Universal Time)</option>
                <option>PST (Pacific Standard Time)</option>
                <option>EST (Eastern Standard Time)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#fff', marginBottom: 8 }}>Language</label>
              <select className="search-bar" style={{ width: '100%', maxWidth: 400, cursor: 'pointer' }}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary">Save Changes</button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
