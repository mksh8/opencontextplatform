import React from 'react';

export default function CreateConnector() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Create Source Pipeline</h1>
        <p>Configure a new integration to ingest data.</p>
      </div>

      <div className="widget" style={{ maxWidth: '600px', padding: '32px' }}>
        <form>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Integration Type</label>
            <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }}>
              <option value="github">GitHub</option>
              <option value="slack">Slack</option>
              <option value="notion">Notion</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Pipeline Name</label>
            <input type="text" placeholder="e.g. Core Mono-repo Sync" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} />
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Target Collection</label>
            <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }}>
              <option value="eng">Engineering Specs</option>
              <option value="hr">Human Resources</option>
            </select>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>All ingested contexts from this pipeline will be placed in this collection.</p>
          </div>

          <button type="button" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>Continue to Authentication &rarr;</button>
        </form>
      </div>
    </div>
  );
}
