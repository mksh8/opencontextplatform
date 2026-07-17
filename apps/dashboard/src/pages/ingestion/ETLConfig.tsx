import React from 'react';

export default function ETLConfig() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Field Mapping (ETL)</h1>
          <p>Map incoming JSON properties to OpenContext Nodes and Edges.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>Save Mapping</button>
      </div>

      <div className="widget" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Node Schema: Context (GitHub Issue)</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Context Title</label>
            <input type="text" defaultValue="issue.title" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontFamily: 'monospace' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Context Body (To be chunked & embedded)</label>
            <input type="text" defaultValue="issue.body" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '6px', color: '#fff', fontFamily: 'monospace' }} />
          </div>
        </div>

        <h2 style={{ fontSize: '16px', marginBottom: '16px', marginTop: '32px' }}>Graph Relationships (Edges)</h2>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
          <span style={{ fontSize: '14px' }}>(This Context)</span>
          <span style={{ color: 'var(--accent-green)' }}>-[:AUTHORED_BY]-&gt;</span>
          <span style={{ fontSize: '14px' }}>(User node matching: </span>
          <input type="text" defaultValue="issue.user.login" style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontFamily: 'monospace', width: '200px' }} />
          <span style={{ fontSize: '14px' }}>)</span>
        </div>

        <button className="btn btn-secondary" style={{ marginTop: '16px', padding: '8px 16px' }}>+ Add Edge Mapping</button>
      </div>
    </div>
  );
}
