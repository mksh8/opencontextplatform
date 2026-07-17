import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/client';
import { useToast } from '../../contexts/ToastContext';

export default function CreateContext() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Document');
  const [source, setSource] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !source || !content) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }
    
    setLoading(true);
    try {
      await apiClient.post('/contexts', {
        title,
        type,
        source,
        content
      });
      addToast('Context ingested successfully!', 'success');
      navigate('/contexts/all');
    } catch (error: any) {
      addToast(error.response?.data?.detail || 'Failed to ingest context', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '8px' }}>Ingest Context</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Manually feed documents, code, or messages into the unified semantic memory.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Context Title</label>
          <input 
            type="text" 
            className="search-bar" 
            style={{ width: '100%', padding: '12px 16px', fontSize: '14px', background: 'rgba(0,0,0,0.2)' }} 
            placeholder="e.g. Architecture RFC 001"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source Identifier</label>
            <input 
              type="text" 
              className="search-bar" 
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', background: 'rgba(0,0,0,0.2)' }} 
              placeholder="e.g. github/rfc-001"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Context Type</label>
            <select 
              className="search-bar" 
              style={{ width: '100%', padding: '12px 16px', fontSize: '14px', background: 'rgba(0,0,0,0.2)', appearance: 'none', cursor: 'pointer' }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Document">📄 Document</option>
              <option value="Pull Request">🐙 Pull Request</option>
              <option value="Message">💬 Message (Slack/Teams)</option>
              <option value="Code">💻 Source Code</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payload (Markdown or JSON)</label>
          <textarea 
            className="search-bar" 
            style={{ width: '100%', height: '240px', padding: '16px', fontSize: '14px', background: 'rgba(0,0,0,0.2)', fontFamily: 'monospace', resize: 'vertical' }} 
            placeholder="Paste your raw content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
          <button type="button" onClick={() => navigate('/contexts/all')} className="btn" style={{ padding: '12px 24px', fontWeight: 600, borderRadius: '8px', background: 'transparent' }}>Cancel</button>
          <button type="submit" disabled={loading} className="btn btn-primary hover-lift" style={{ padding: '12px 24px', fontWeight: 600, borderRadius: '8px', boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Ingesting...' : 'Ingest Context'}
          </button>
        </div>

      </form>
    </div>
  );
}
