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
  const { addToast } = useToast();
  const tabs = ['LLM Providers', 'Embedding Providers', 'Vector Providers', 'Graph Providers', 'Storage Providers'];

  useEffect(() => {
    const orgId = "org_alpha_123";
    apiClient.get(`/providers/${orgId}`)
      .then(response => {
        setProviders(response.data);
      })
      .catch(error => console.error("Error fetching providers:", error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Providers</h1>
          <p>Configure your AI and data providers.</p>
        </div>
        <button className="btn btn-primary" onClick={() => addToast('Add Provider flow coming soon!', 'success')}>+ Add Provider</button>
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
    </>
  );
}
