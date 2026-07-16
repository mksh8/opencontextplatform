import React from 'react';

export default function ConnectorAuth() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Authentication</h1>
        <p>Manage API credentials and OAuth tokens for mksh8/opencontextplatform.</p>
      </div>

      <div className="widget" style={{ maxWidth: '600px', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--accent-green)' }}>OAuth App Connected</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Authenticated as @mksh8</div>
          </div>
          <button className="btn btn-secondary" style={{ padding: '6px 12px' }}>Disconnect</button>
        </div>

        <form>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Personal Access Token (Fallback)</label>
            <input type="password" placeholder="ghp_************************************" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} />
          </div>

          <button type="button" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>Save Credentials</button>
        </form>
      </div>
    </div>
  );
}
