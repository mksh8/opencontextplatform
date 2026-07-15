import React from 'react';
import { Link } from 'react-router-dom';

export default function ContextDetails() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Context Details</h1>
          <p>Detailed view of node ctx_9f8a2 (github/PR-142)</p>
        </div>
        <div>
          <Link to="/contexts/editor" className="btn btn-secondary" style={{ marginRight: 12, padding: '10px 16px', textDecoration: 'none' }}>Edit Content</Link>
          <Link to="/contexts/relationships" className="btn btn-primary" style={{ padding: '10px 16px', textDecoration: 'none' }}>View Graph</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="widget" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Content Payload</h2>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
            {"{\n  \"title\": \"Update authentication flow\",\n  \"body\": \"This PR fixes the race condition in the AuthProvider by memoizing the callback...\",\n  \"author\": \"dev_jane\"\n}"}
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="widget" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Node Properties</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>ID</span>
              <span style={{ fontFamily: 'monospace' }}>ctx_9f8a2</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Created At</span>
              <span>Oct 24, 2024</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Token Count</span>
              <span>1,240</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Chunk Count</span>
              <Link to="/contexts/chunks" style={{ color: 'var(--accent-blue)' }}>4 Chunks</Link>
            </div>
          </div>
          
          <div className="widget" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Quick Actions</h3>
            <Link to="/contexts/summary" style={{ display: 'block', padding: '12px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-purple)', borderRadius: '6px', textAlign: 'center', textDecoration: 'none', marginBottom: '12px' }}>✨ Generate AI Summary</Link>
            <Link to="/contexts/history" style={{ display: 'block', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', borderRadius: '6px', textAlign: 'center', textDecoration: 'none' }}>🕰️ View Version History</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
