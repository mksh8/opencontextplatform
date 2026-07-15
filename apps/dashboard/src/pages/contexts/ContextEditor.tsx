import React from 'react';

export default function ContextEditor() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Context Editor</h1>
          <p>Manually edit the raw payload of ctx_9f8a2.</p>
        </div>
        <div>
          <button className="btn btn-primary" style={{ padding: '10px 16px' }}>Save Changes</button>
        </div>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '16px' }}>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 500, fontSize: '14px', cursor: 'pointer' }}>Raw JSON</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer' }}>Rich Text (Markdown)</span>
        </div>
        <textarea 
          style={{
            flex: 1,
            width: '100%',
            background: 'transparent',
            border: 'none',
            padding: '24px',
            color: 'var(--text-primary)',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            resize: 'none',
            outline: 'none'
          }}
          defaultValue={"{\n  \"title\": \"Update authentication flow\",\n  \"body\": \"This PR fixes the race condition in the AuthProvider by memoizing the callback...\",\n  \"author\": \"dev_jane\"\n}"}
        />
      </div>
    </div>
  );
}
