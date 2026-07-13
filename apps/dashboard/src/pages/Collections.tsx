import React from 'react';

export default function Collections() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Collections</h1>
          <p>Organize contexts into semantic memory collections.</p>
        </div>
        <div className="filters">
          <button className="btn">All Types ⌄</button>
          <button className="btn">All Workspaces ⌄</button>
          <button className="btn btn-primary">+ New Memory</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32 }}>
        {/* Left Sidebar for Types */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12, letterSpacing: '0.05em' }}>Memory Types</div>
          <div className="nav-item active" style={{ marginLeft: 0, padding: '8px 12px' }}>Backend Development</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>API Documentation</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>Bug Fixes & Issues</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>Project Planning</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>Architecture Decisions</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>Meeting Notes</div>
        </div>

        {/* Grid of Collection Cards */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="widget" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>💬</span>
                <h3 style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>User prefers detailed explanations</h3>
              </div>
              <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>User mentioned they prefer comprehensive explanations with practical examples over brief answers.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text-secondary)' }}>
              <span className="tag" style={{ color: 'var(--accent-blue)', background: 'rgba(59, 130, 246, 0.1)' }}>Documentation</span>
              <span>2 mins ago</span>
            </div>
          </div>

          <div className="widget" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>🛡️</span>
                <h3 style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>API authentication implementation</h3>
              </div>
              <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Decided to use JWT tokens with refresh token rotation for better security.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text-secondary)' }}>
              <span className="tag" style={{ color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.1)' }}>Engineering</span>
              <span>1h ago</span>
            </div>
          </div>
          
          <div className="widget" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>🗄️</span>
                <h3 style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>Discussion about vector database selection</h3>
              </div>
              <span style={{ color: 'var(--text-secondary)' }}>⋮</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Comparing LanceDB vs Pinecone vs Milvus for our specific use case.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text-secondary)' }}>
              <span className="tag" style={{ color: 'var(--accent-green)', background: 'rgba(16, 185, 129, 0.1)' }}>Architecture</span>
              <span>3h ago</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
