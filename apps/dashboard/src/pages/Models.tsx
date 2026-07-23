import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useToast } from '../contexts/ToastContext';

interface ModelItem {
  id: string;
  name: string;
  provider: string;
  type: string;
  status: string;
  last_used: string;
}

export default function Models() {
  const [activeTab, setActiveTab] = useState('LLM Models');
  const [models, setModels] = useState<ModelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const tabs = ['LLM Models', 'Embedding Models', 'Vector Models'];
  const orgId = "org_alpha_123";

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/models/${orgId}`)
      .then(response => {
        setModels(response.data.models || []);
      })
      .catch(error => console.error("Error fetching models:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredModels = models.filter(m => {
    if (activeTab === 'LLM Models') return m.type === 'LLM';
    if (activeTab === 'Embedding Models') return m.type === 'Embedding';
    return false; // Vector Models empty for now
  });

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Models</h1>
          <p>Manage models for your providers.</p>
        </div>
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

      {activeTab === 'LLM Models' || activeTab === 'Embedding Models' ? (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Model</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Provider</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Type</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Last Used</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Loading models...
                </td>
              </tr>
            ) : filteredModels.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No {activeTab.toLowerCase()} found. Try adding a provider first.
                </td>
              </tr>
            ) : (
              filteredModels.map(model => (
                <tr key={model.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>{model.name}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{model.provider}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{model.type}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="status-indicator" style={{ color: model.status === 'Active' ? '#10b981' : 'var(--text-secondary)' }}>
                      <div className="dot" style={{ background: model.status === 'Active' ? '#10b981' : 'var(--text-secondary)' }}></div> 
                      {model.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{model.last_used}</td>
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
