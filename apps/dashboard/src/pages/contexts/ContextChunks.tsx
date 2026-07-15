import React from 'react';

export default function ContextChunks() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Context Chunks</h1>
        <p>Breakdown of how ctx_9f8a2 was split by the recursive chunker.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="widget" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 500 }}>Chunk 1 of 4</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>450 Tokens</span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
            {"This PR fixes the race condition in the AuthProvider by memoizing the callback. Previously, if two components mounted simultaneously, the token refresh would fire twice..."}
          </div>
        </div>

        <div className="widget" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 500 }}>Chunk 2 of 4</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>392 Tokens</span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
            {"We also introduce a debounce on the login form submission. Testing: I ran the auth suite 100 times without a single race condition failure..."}
          </div>
        </div>
      </div>
    </div>
  );
}
