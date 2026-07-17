import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/client';
import { useToast } from '../../contexts/ToastContext';
import { RelationshipsTab } from './RelationshipsTab';
import { EmbeddingsTab } from './EmbeddingsTab';

interface ContextDetail {
  id: string;
  title: string;
  type: string;
  source: string;
  workspace: string;
  tokens: string;
  content: string;
  created_at: string;
}

export default function ContextDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [context, setContext] = useState<ContextDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchContext();
    }
  }, [id]);

  const fetchContext = async () => {
    try {
      const response = await apiClient.get(`/contexts/${id}`);
      setContext(response.data);
    } catch (error) {
      addToast('Failed to load context details', 'error');
      navigate('/contexts/all');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this context node? This action cannot be undone.')) return;
    
    setDeleting(true);
    try {
      await apiClient.delete(`/contexts/${id}`);
      addToast('Context node deleted successfully', 'success');
      navigate('/contexts/all');
    } catch (error) {
      addToast('Failed to delete context', 'error');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-content" style={{ padding: '32px' }}>
        <div className="skeleton" style={{ height: '40px', width: '300px', marginBottom: '12px' }}></div>
        <div className="skeleton" style={{ height: '20px', width: '200px', marginBottom: '32px' }}></div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="glass-panel" style={{ height: '400px' }}><div className="skeleton" style={{ height: '100%', width: '100%' }}></div></div>
          <div className="glass-panel" style={{ height: '400px' }}><div className="skeleton" style={{ height: '100%', width: '100%' }}></div></div>
        </div>
      </div>
    );
  }

  if (!context) return null;

  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <Link to="/contexts/all" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>← Back to Registry</Link>
          <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}>{context.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'monospace' }}>Node ID: {context.id} • {context.source}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn"
            style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.05)', fontWeight: 600 }}
            onClick={() => navigate(`/contexts/editor/${context.id}`)}
          >
            ✏️ Edit Context
          </button>
          <button 
            className="btn" 
            style={{ padding: '10px 16px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', backgroundColor: 'rgba(239, 68, 68, 0.05)', fontWeight: 600 }}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Node'}
          </button>
        </div>
      </div>

      <div className="tabs-container" style={{ display: 'flex', gap: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px', overflowX: 'auto' }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'history', label: 'Version History' },
          { id: 'metadata', label: 'Metadata & Tags' },
          { id: 'permissions', label: 'Permissions' },
          { id: 'embeddings', label: 'Embeddings' },
          { id: 'chunks', label: 'Chunks' },
          { id: 'relationships', label: 'Relationships' }
        ].map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              padding: '12px 0', 
              color: activeTab === tab.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-blue)' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? 600 : 500,
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Content Payload</h2>
              <button className="btn" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px' }}>Copy JSON</button>
            </div>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '13px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
              {context.content || "// No payload available"}
            </div>
          </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Node Properties</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Node ID</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '13px' }}>{context.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Created At</span>
                <span style={{ color: 'var(--text-primary)', fontSize: '13px' }}>{context.created_at}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Context Type</span>
                <span style={{ padding: '4px 10px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-purple)', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{context.type}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Token Count</span>
                <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}>{context.tokens}</span>
              </div>
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Graph Operations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="btn hover-lift" style={{ width: '100%', padding: '12px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-purple)', border: '1px solid rgba(124, 58, 237, 0.2)', borderRadius: '8px', fontWeight: 600, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✨ Generate AI Summary
              </button>
              <button className="btn hover-lift" style={{ width: '100%', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', color: 'var(--text-primary)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontWeight: 500, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🕰️ View Version History
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

      {activeTab === 'history' && (
        <div className="widget" style={{ padding: '0' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Version History</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>Immutable audit trail of changes to this context node.</p>
          </div>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff', marginBottom: '4px' }}>v2.0 (Current)</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Updated by API • Just now</div>
            </div>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>View Diff</button>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#fff', marginBottom: '4px' }}>v1.0 (Creation)</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Created • {context.created_at}</div>
            </div>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>View Diff</button>
          </div>
        </div>
      )}

      {activeTab === 'relationships' && (
        <RelationshipsTab contextId={context.id} />
      )}

      {activeTab === 'embeddings' && (
        <EmbeddingsTab contextId={context.id} />
      )}

      {activeTab !== 'overview' && activeTab !== 'history' && activeTab !== 'relationships' && activeTab !== 'embeddings' && (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>Coming Soon</h3>
          <p>The {activeTab} integration for live database data is currently under development.</p>
        </div>
      )}

    </div>
  );
}
