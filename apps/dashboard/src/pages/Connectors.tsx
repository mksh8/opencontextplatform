import React from 'react';

export default function Connectors() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Connectors</h1>
          <p>Manage your data connectors.</p>
        </div>
        <button className="btn btn-primary">+ Add Connector</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        
        {/* GitHub */}
        <div className="widget" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 24 }}>🐙</div>
              <div>
                <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>GitHub</h3>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}><div className="dot"></div> Connected</div>
              </div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last sync: 2m ago</span>
            <span>128 repositories</span>
          </div>
        </div>

        {/* Slack */}
        <div className="widget" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 24 }}>💬</div>
              <div>
                <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>Slack</h3>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}><div className="dot"></div> Connected</div>
              </div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last sync: 15m ago</span>
            <span>42 channels</span>
          </div>
        </div>

        {/* Notion */}
        <div className="widget" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 24 }}>📓</div>
              <div>
                <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>Notion</h3>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}><div className="dot"></div> Connected</div>
              </div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last sync: 1h ago</span>
            <span>8 workspaces</span>
          </div>
        </div>

        {/* Confluence */}
        <div className="widget" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 24 }}>🌊</div>
              <div>
                <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>Confluence</h3>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}><div className="dot"></div> Connected</div>
              </div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last sync: 3h ago</span>
            <span>12 spaces</span>
          </div>
        </div>

        {/* Jira */}
        <div className="widget" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 24 }}>🔷</div>
              <div>
                <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>Jira</h3>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}><div className="dot"></div> Connected</div>
              </div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last sync: 2m ago</span>
            <span>24 projects</span>
          </div>
        </div>

        {/* PostgreSQL */}
        <div className="widget" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 24 }}>🐘</div>
              <div>
                <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>PostgreSQL</h3>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}><div className="dot"></div> Connected</div>
              </div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last sync: 5m ago</span>
            <span>3 databases</span>
          </div>
        </div>

        {/* Filesystem */}
        <div className="widget" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 24 }}>📁</div>
              <div>
                <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>Filesystem</h3>
                <div style={{ fontSize: 11, color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 4 }}><div className="dot"></div> Connected</div>
              </div>
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last sync: 10m ago</span>
            <span>8 directories</span>
          </div>
        </div>

        {/* Add Custom */}
        <div className="widget" style={{ padding: 20, border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500 }}>+ Add Custom Connector</div>
        </div>

      </div>
    </>
  );
}
