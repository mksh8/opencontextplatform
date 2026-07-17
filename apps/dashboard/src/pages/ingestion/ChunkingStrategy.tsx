import React from 'react';

export default function ChunkingStrategy() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Chunking Strategy</h1>
        <p>Configure how large text blocks (issue.body) are split before embedding.</p>
      </div>

      <div className="widget" style={{ maxWidth: '700px', padding: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <div style={{ flex: 1, padding: '16px', border: '1px solid rgba(139, 92, 246, 0.5)', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', cursor: 'pointer' }}>
            <h3 style={{ fontSize: '15px', color: 'var(--accent-purple)', marginBottom: '8px' }}>Recursive Character</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Splits on paragraphs, sentences, then words to keep logical context together.</p>
          </div>
          <div style={{ flex: 1, padding: '16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', opacity: 0.7 }}>
            <h3 style={{ fontSize: '15px', marginBottom: '8px' }}>Markdown Header</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Splits document based on H1, H2, H3 markdown tags.</p>
          </div>
        </div>

        <form>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Chunk Size (Tokens)</label>
            <input type="number" defaultValue="512" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Chunk Overlap (Tokens)</label>
            <input type="number" defaultValue="50" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Overlap prevents context loss between adjacent chunks.</p>
          </div>

          <button type="button" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>Save Strategy</button>
        </form>
      </div>
    </div>
  );
}
