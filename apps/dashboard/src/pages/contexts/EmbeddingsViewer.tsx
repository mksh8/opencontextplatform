import React from 'react';

export default function EmbeddingsViewer() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Embeddings</h1>
        <p>Vector representations stored in ArcadeDB for ctx_9f8a2.</p>
      </div>

      <div className="widget" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Model Configuration</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Embedding Model</div>
            <div style={{ fontSize: '16px', fontWeight: 500 }}>text-embedding-3-small</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Dimensions</div>
            <div style={{ fontSize: '16px', fontWeight: 500 }}>1536</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Distance Metric</div>
            <div style={{ fontSize: '16px', fontWeight: 500 }}>Cosine Similarity</div>
          </div>
        </div>
      </div>

      <div className="widget">
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Vector Array (Preview)</h2>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', color: 'var(--accent-blue)', whiteSpace: 'pre-wrap', lineHeight: '1.6', wordBreak: 'break-all' }}>
          [0.01241, -0.05219, 0.11482, -0.00921, 0.04312, -0.19324, 0.04821, 0.11244, -0.00124, 0.08321, ... 1526 more dimensions]
        </div>
      </div>
    </div>
  );
}
