import React from 'react';

export default function Memories() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Memories</h1>
          <p>Explore your isolated semantic memories.</p>
        </div>
        <button className="btn btn-primary">+ New Memory</button>
      </div>

      <div className="widget" style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🗄️</div>
        <h2 style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>Memory store is active</h2>
        <p style={{ fontSize: 13, maxWidth: 400, margin: '0 auto' }}>
          This section contains individual extracted memories. They are grouped into higher-level themes inside the Collections tab.
        </p>
      </div>
    </>
  );
}
