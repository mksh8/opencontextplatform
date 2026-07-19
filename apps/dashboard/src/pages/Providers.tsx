import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useToast } from '../contexts/ToastContext';

interface Provider {
  id: string;
  name: string;
  url: string;
  model: string;
  status: string;
  usage: string;
}

export default function Providers() {
  const [activeTab, setActiveTab] = useState('LLM Providers');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', provider_type: 'OpenAI', api_key: '' });
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();
  const tabs = ['LLM Providers', 'Embedding Providers', 'Vector Providers', 'Graph Providers', 'Storage Providers'];
  const orgId = "org_alpha_123";

  const fetchProviders = () => {
    setLoading(true);
    apiClient.get(`/providers/${orgId}`)
      .then(response => {
        setProviders(response.data);
      })
      .catch(error => console.error("Error fetching providers:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleAddProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post(`/providers/${orgId}`, formData);
      addToast('Provider added successfully!', 'success');
      setShowModal(false);
      setFormData({ name: '', provider_type: 'OpenAI', api_key: '' });
      fetchProviders();
    } catch (error) {
      console.error(error);
      addToast('Failed to add provider', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Providers</h1>
          <p>Configure your AI and data providers.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Provider</button>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 32, marginBottom: 24 }}>
        {tabs.map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              paddingBottom: 12, 
              borderBottom: activeTab === tab ? '2px solid var(--accent-purple)' : '2px solid transparent', 
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)', 
              fontSize: 13, 
              fontWeight: 500, 
              cursor: 'pointer' 
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeTab === 'LLM Providers' ? (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Provider</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Model</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Usage / Experience</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Loading providers...
                </td>
              </tr>
            ) : providers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No providers found.
                </td>
              </tr>
            ) : (
              providers.map(provider => (
                <tr key={provider.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 500, color: '#fff' }}>{provider.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{provider.url}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}><span className="tag" style={{ border: '1px solid var(--border-color)' }}>{provider.model}</span></td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="status-indicator" style={{ color: provider.status === 'Active' ? '#10b981' : 'var(--text-secondary)' }}>
                      <div className="dot" style={{ background: provider.status === 'Active' ? '#10b981' : 'var(--text-secondary)' }}></div> 
                      {provider.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{provider.usage}</td>
                  <td style={{ padding: '16px 24px', cursor: 'pointer' }}>⋮</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="widget" style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>The {activeTab} section is currently under development.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => addToast(`Subscribed to ${activeTab} updates!`, 'success')}>Notify me when available</button>
        </div>
      )}

      {/* Add Provider Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="widget" style={{ width: 450, padding: 24 }}>
            <h3 style={{ marginTop: 0, marginBottom: 24, fontSize: 18, color: '#fff' }}>Add AI Provider</h3>
            <form onSubmit={handleAddProvider}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>Provider Type</label>
                <select 
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 14 }}
                  value={formData.provider_type}
                  onChange={e => setFormData({...formData, provider_type: e.target.value})}
                  required
                >
                  <option value="OpenAI">OpenAI</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="Ollama">Ollama (Local)</option>
                  <option value="Google">Google Gemini</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>Display Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. My OpenAI Account"
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 14 }}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>API Key</label>
                <input 
                  type="password" 
                  placeholder="sk-..."
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 14 }}
                  value={formData.api_key}
                  onChange={e => setFormData({...formData, api_key: e.target.value})}
                  required
                />
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8 }}>Your key is encrypted before being stored.</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" className="btn" style={{ background: 'transparent', border: '1px solid var(--border-color)' }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Provider'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
