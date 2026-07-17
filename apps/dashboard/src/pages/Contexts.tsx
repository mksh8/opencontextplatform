import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { useToast } from '../contexts/ToastContext';

interface ContextItem {
  id: string;
  title: string;
  type: string;
  source: string;
  workspace: string;
  tokens: string;
  updated: string;
}

export default function Contexts() {
  const { addToast } = useToast();
  const [contexts, setContexts] = useState<ContextItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get('/contexts')
      .then(res => {
        setContexts(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch contexts:", err);
        setError("Failed to load data from backend.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Contexts</h1>
          <p>Manage and explore all contexts across your organizations.</p>
        </div>
        <button className="btn btn-primary" onClick={() => addToast('New Context flow starting...', 'info')}>+ New Context</button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <input type="text" className="search-bar" placeholder="🔍 Search contexts..." style={{ flex: 1 }} />
        <select className="search-bar" style={{ width: 160 }}><option>All Types ⌄</option></select>
        <select className="search-bar" style={{ width: 160 }}><option>All Sources ⌄</option></select>
        <select className="search-bar" style={{ width: 160 }}><option>All Workspaces ⌄</option></select>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        <div className="widget" style={{ flex: 2, padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Context</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Source</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Workspace</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Tokens</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading from backend...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#ff7b72' }}>{error} <br/><span style={{fontSize: 11}}>Make sure FastAPI is running on port 8000</span></td></tr>
              ) : (
                contexts.map(ctx => (
                  <tr key={ctx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 32, height: 32, background: 'var(--bg-dark)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📄</div>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>{ctx.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{ctx.id}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}><span className="tag">{ctx.type}</span></td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{ctx.source}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{ctx.workspace}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{ctx.tokens}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{ctx.updated}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--text-secondary)' }}>
            <span>Showing 1 to {contexts.length} of 129 results</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" style={{ padding: '4px 8px' }}>&lt;</button>
              <button className="btn" style={{ padding: '4px 8px', background: 'var(--accent-purple)', borderColor: 'var(--accent-purple)', color: '#fff' }}>1</button>
              <button className="btn" style={{ padding: '4px 8px' }}>2</button>
              <button className="btn" style={{ padding: '4px 8px' }}>3</button>
              <button className="btn" style={{ padding: '4px 8px' }}>&gt;</button>
            </div>
          </div>
        </div>

        <div className="widget" style={{ flex: 1, padding: 24 }}>
          <h3 style={{ fontSize: 14, color: '#fff', fontWeight: 500, marginBottom: 24 }}>Memory Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Type</span>
              <span className="tag" style={{ color: 'var(--accent-green)' }}>Behavior</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Collection</span>
              <span style={{ color: '#fff' }}>Engineering</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tokens</span>
              <span style={{ color: '#fff' }}>4.5K</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Score</span>
              <span style={{ color: '#fff' }}>84/100</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Access Level</span>
              <span className="tag" style={{ border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)' }}>Admin Only</span>
            </div>
          </div>

          <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-dark)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            This context contains detailed code examples and memory mappings for recent API gateway fixes.
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn" style={{ flex: 1 }} onClick={() => addToast('Edit feature coming soon.', 'info')}>✎ Edit</button>
            <button className="btn" style={{ flex: 1, color: '#ff7b72', borderColor: 'rgba(255, 123, 114, 0.2)' }} onClick={() => addToast('Context deleted.', 'error')}>🗑 Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}
