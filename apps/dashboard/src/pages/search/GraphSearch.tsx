import React from 'react';

export default function GraphSearch() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Graph Search</h1>
        <p>Cypher-style queries against the ArcadeDB knowledge graph.</p>
      </div>

      <div className="widget" style={{ marginBottom: '24px', padding: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <textarea 
            placeholder="MATCH (c:Context)-[:BELONGS_TO]->(col:Collection) WHERE col.name = 'Engineering Specs' RETURN c LIMIT 25" 
            style={{ width: '100%', height: '120px', padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#fff', fontFamily: 'monospace', resize: 'vertical' }}
          />
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 24px' }}>Execute Graph Query</button>
      </div>

      <div className="widget">
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Resulting Subgraph</h2>
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Run a Cypher query to render the interactive node graph here.
        </div>
      </div>
    </div>
  );
}
