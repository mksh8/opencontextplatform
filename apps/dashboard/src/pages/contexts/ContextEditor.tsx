import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../../api/client';
import { useToast } from '../../contexts/ToastContext';

export default function ContextEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchContext();
    }
  }, [id]);

  const fetchContext = async () => {
    try {
      const response = await apiClient.get(`/contexts/${id}`);
      setContent(response.data.content || '');
      setTitle(response.data.title || id);
    } catch (error) {
      addToast('Failed to load context for editing', 'error');
      navigate('/contexts/all');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.put(`/contexts/${id}`, { content });
      addToast('Context payload updated successfully!', 'success');
      navigate(`/contexts/details/${id}`);
    } catch (error) {
      addToast('Failed to update context payload', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="dashboard-content">Loading editor...</div>;
  }

  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to={`/contexts/details/${id}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>← Back to Details</Link>
          <h1>Context Editor</h1>
          <p>Manually edit the raw payload of <strong>{title}</strong> ({id}).</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn" onClick={() => navigate(`/contexts/details/${id}`)}>Cancel</button>
          <button 
            className="btn btn-primary" 
            style={{ padding: '10px 16px' }} 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '16px' }}>
          <span style={{ color: 'var(--accent-blue)', fontWeight: 500, fontSize: '14px', cursor: 'pointer' }}>Raw Payload</span>
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter context payload here..."
        />
      </div>
    </div>
  );
}
