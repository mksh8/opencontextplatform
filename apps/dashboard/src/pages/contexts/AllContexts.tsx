import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../api/client';
import { useToast } from '../../contexts/ToastContext';

interface ContextItem {
  id: string;
  title: string;
  type: string;
  source: string;
  workspace: string;
  tokens: string;
  updated: string;
}

export default function AllContexts() {
  const [contexts, setContexts] = useState<ContextItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContexts();
  }, []);

  const fetchContexts = async () => {
    try {
      const response = await apiClient.get('/contexts');
      setContexts(response.data.data || []);
    } catch (error) {
      addToast('Failed to load contexts', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Context Registry</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Global registry of all ingested multi-modal knowledge nodes.</p>
        </div>
        <Link to="/contexts/create" className="btn btn-primary hover-lift" style={{ padding: '12px 24px', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)' }}>+ Create Context</Link>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title & ID</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tokens</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton Loader
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="skeleton" style={{ height: '20px', width: '150px', marginBottom: '8px' }}></div>
                    <div className="skeleton" style={{ height: '14px', width: '80px' }}></div>
                  </td>
                  <td style={{ padding: '16px 24px' }}><div className="skeleton" style={{ height: '20px', width: '100px' }}></div></td>
                  <td style={{ padding: '16px 24px' }}><div className="skeleton" style={{ height: '24px', width: '80px', borderRadius: '12px' }}></div></td>
                  <td style={{ padding: '16px 24px' }}><div className="skeleton" style={{ height: '20px', width: '60px' }}></div></td>
                  <td style={{ padding: '16px 24px' }}><div className="skeleton" style={{ height: '20px', width: '80px' }}></div></td>
                </tr>
              ))
            ) : contexts.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={5} style={{ padding: '64px 24px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                      🗂️
                    </div>
                    <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>No contexts found</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', margin: '0 auto', fontSize: '14px' }}>
                      Get started by ingesting your first document, PR, or slack message.
                    </p>
                    <Link to="/contexts/create" className="btn btn-primary" style={{ marginTop: '8px', textDecoration: 'none' }}>Create First Context</Link>
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              contexts.map((ctx) => (
                <tr 
                  key={ctx.id} 
                  style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 92, 246, 0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => navigate(`/contexts/details/${ctx.id}`)}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{ctx.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{ctx.id}</div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{ctx.source}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ padding: '6px 12px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-purple)', borderRadius: '16px', fontSize: '12px', fontWeight: 600, border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                      {ctx.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-primary)', fontWeight: 500 }}>{ctx.tokens}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontSize: '13px', fontWeight: 500 }}>
                      <span className="dot" style={{ background: 'var(--accent-green)', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                      Indexed
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
