import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useToast } from '../contexts/ToastContext';

interface APIKey {
  id: string;
  name: string;
  prefix: string;
  created_at: string;
  is_active: boolean;
}

export default function APIKeysList() {
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const { showToast } = useToast();

  const fetchKeys = async () => {
    try {
      const res = await apiClient.get('/apikeys');
      setKeys(res.data);
    } catch (e) {
      showToast('Failed to fetch API keys', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await apiClient.post('/apikeys', { name: newKeyName });
      setGeneratedKey(res.data.api_key);
      fetchKeys();
    } catch (e: any) {
      showToast(e.response?.data?.detail || 'Failed to create key', 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!window.confirm("Are you sure you want to revoke this key?")) return;
    try {
      await apiClient.delete(`/apikeys/${id}`);
      showToast('Key revoked', 'success');
      fetchKeys();
    } catch (e) {
      showToast('Failed to revoke key', 'error');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Create API Key</button>
      </div>
      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Prefix</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Created</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading API keys...</td>
              </tr>
            ) : keys.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No API keys found.</td>
              </tr>
            ) : (
              keys.map((apiKey) => (
                <tr key={apiKey.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>{apiKey.name}</td>
                  <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{apiKey.prefix}...</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{new Date(apiKey.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="status-indicator" style={{ color: apiKey.is_active ? '#10b981' : '#ff7b72' }}>
                      <div className="dot" style={{ background: apiKey.is_active ? '#10b981' : '#ff7b72' }}></div> 
                      {apiKey.is_active ? 'Active' : 'Revoked'}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <button 
                      onClick={() => handleRevoke(apiKey.id)}
                      className="btn" 
                      style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '6px 12px', fontSize: '12px' }}
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
          <div style={{ background: '#171717', width: '400px', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {!generatedKey ? (
              <>
                <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#fff' }}>Create New API Key</h2>
                <form onSubmit={handleCreateKey}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Key Name</label>
                    <input 
                      type="text" 
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g. Production CI/CD"
                      required
                      style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: '6px', color: '#fff' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ background: 'transparent' }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={creating}>{creating ? 'Creating...' : 'Create'}</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#fff' }}>Key Generated</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Please copy this key now. You won't be able to see it again!</p>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', color: 'var(--accent-blue)', wordBreak: 'break-all', marginBottom: '24px' }}>
                  {generatedKey}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => { setIsModalOpen(false); setGeneratedKey(null); setNewKeyName(''); }} className="btn btn-primary">Done</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
