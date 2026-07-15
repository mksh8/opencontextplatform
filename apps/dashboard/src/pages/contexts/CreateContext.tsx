import React from 'react';

export default function CreateContext() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Create Context</h1>
        <p>Manually inject new knowledge nodes into the graph.</p>
      </div>

      <div className="widget" style={{ maxWidth: '800px', padding: '32px' }}>
        <form>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Source Origin</label>
            <input type="text" placeholder="e.g. manual_upload, external_api" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Content Type</label>
            <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }}>
              <option value="text">Raw Text</option>
              <option value="markdown">Markdown Document</option>
              <option value="json">Structured JSON</option>
            </select>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Payload</label>
            <textarea placeholder="Enter context payload here..." style={{ width: '100%', height: '200px', padding: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontFamily: 'monospace', resize: 'vertical' }}></textarea>
          </div>

          <button type="button" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>Inject Node</button>
        </form>
      </div>
    </div>
  );
}
