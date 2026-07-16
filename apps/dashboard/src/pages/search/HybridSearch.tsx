import React from 'react';

export default function HybridSearch() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Hybrid Search (RRF)</h1>
        <p>Combines Semantic Search with BM25 Keyword Search using Reciprocal Rank Fusion.</p>
      </div>

      <div className="widget" style={{ marginBottom: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <input type="text" placeholder="Enter query..." style={{ flex: 1, padding: '16px', fontSize: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '6px', color: '#fff' }} />
          <button className="btn btn-primary" style={{ padding: '0 32px', fontSize: '16px' }}>Search</button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Semantic Weight (Alpha)</span>
              <span style={{ fontSize: '13px', color: 'var(--accent-purple)' }}>0.75</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" defaultValue="0.75" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Keyword Weight (1 - Alpha)</span>
              <span style={{ fontSize: '13px', color: 'var(--accent-blue)' }}>0.25</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" defaultValue="0.25" style={{ width: '100%' }} disabled />
          </div>
        </div>
      </div>

      <div className="widget">
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Fused Results (0)</h2>
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Execute a query to see RRF blended results.
        </div>
      </div>
    </div>
  );
}
