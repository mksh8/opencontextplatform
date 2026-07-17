import React from 'react';

export default function SemanticSearch() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Semantic Search</h1>
        <p>Pure vector-based similarity search against ArcadeDB embeddings.</p>
      </div>

      <div className="widget" style={{ marginBottom: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <input type="text" placeholder="Enter natural language query..." style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} />
          <button className="btn btn-primary" style={{ padding: '0 24px' }}>Vectorize & Search</button>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <span>Model: <strong style={{ color: '#fff' }}>text-embedding-3-small</strong></span>
          <span>Top K: <strong style={{ color: '#fff' }}>10</strong></span>
          <span>Similarity Threshold: <strong style={{ color: '#fff' }}>0.75</strong></span>
        </div>
      </div>

      <div className="widget">
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Results (0)</h2>
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Execute a query to see semantically similar context nodes.
        </div>
      </div>
    </div>
  );
}
