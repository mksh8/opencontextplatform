import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const TABS = ['Overview', 'Providers'];

const KPIS = [
  { label: 'Total Providers', value: 12, trend: 'Configured across platform' },
  { label: 'Active Providers', value: 8, trend: 'Fully operational', color: '#10b981' },
  { label: 'Inactive Providers', value: 3, trend: 'Disabled temporarily', color: '#f59e0b' },
  { label: 'Error', value: 1, trend: 'Requires attention', color: '#ef4444' }
];

const INITIAL_PROVIDERS = [
  { id: 1, name: 'OpenAI', type: 'LLM', models: 24, status: 'Active', region: 'Global', lastSync: 'May 12, 2024 10:30 AM' },
  { id: 2, name: 'Anthropic', type: 'LLM', models: 15, status: 'Active', region: 'Global', lastSync: 'May 12, 2024 09:15 AM' },
  { id: 3, name: 'Google Vertex AI', type: 'LLM', models: 32, status: 'Active', region: 'us-central1', lastSync: 'May 12, 2024 08:45 AM' },
  { id: 4, name: 'Azure OpenAI', type: 'LLM', models: 18, status: 'Active', region: 'eastus', lastSync: 'May 12, 2024 07:20 AM' },
  { id: 5, name: 'AWS Bedrock', type: 'LLM', models: 20, status: 'Inactive', region: 'us-east-1', lastSync: 'May 11, 2024 09:10 PM' },
  { id: 6, name: 'Cohere', type: 'LLM', models: 10, status: 'Active', region: 'Global', lastSync: 'May 11, 2024 10:05 PM' },
  { id: 7, name: 'Hugging Face', type: 'Embedding', models: 56, status: 'Active', region: 'Global', lastSync: 'May 11, 2024 09:40 PM' },
  { id: 8, name: 'Ollama', type: 'LLM', models: 8, status: 'Error', region: 'On-Premise', lastSync: 'May 11, 2024 08:30 PM' }
];

export default function Providers() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [providers, setProviders] = useState(INITIAL_PROVIDERS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'LLM', models: 1, region: 'Global' });
  const { showToast } = useToast();

  const handleAddProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    const newProv = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      models: Number(formData.models),
      status: 'Active',
      region: formData.region,
      lastSync: new Date().toLocaleString()
    };
    
    setProviders([newProv, ...providers]);
    setShowModal(false);
    setFormData({ name: '', type: 'LLM', models: 1, region: 'Global' });
    showToast('AI Provider added successfully!', 'success');
  };

  const filteredProviders = providers.filter(p => {
    if (!search) return true;
    const s = search.toLowerCase();
    return p.name.toLowerCase().includes(s) || p.type.toLowerCase().includes(s) || p.region.toLowerCase().includes(s);
  });

  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>Global AI Providers</h1>
          <p style={{ marginTop: 4 }}>Manage AI providers available across the platform.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ padding: '8px 16px', fontSize: 13 }}>+ Add Provider</button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 20 }}>
        {TABS.map(t => (
          <div
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: '10px 18px',
              borderBottom: activeTab === t ? '2px solid #8b5cf6' : '2px solid transparent',
              color: activeTab === t ? '#fff' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* KPIs (Shown on Overview tab) */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {KPIS.map((kpi, idx) => (
              <div key={idx} className="widget" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: kpi.color || '#fff'
                }}>
                  {kpi.label.includes('Total') ? '⚡' : kpi.label.includes('Active') ? '✓' : kpi.label.includes('Inactive') ? '⏸' : '⚠️'}
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 4 }}>{kpi.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{kpi.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                    {kpi.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: 13 }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search providers..."
                  style={{
                    width: '100%',
                    padding: '7px 12px 7px 34px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    color: '#fff',
                    fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px', height: 32 }}><option>All Providers</option></select>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Provider', 'Type', 'Models', 'Status', 'Region', 'Last Sync', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px', color: '#fff', fontWeight: 500 }}>{p.name}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.type}</td>
                    <td style={{ padding: '14px 16px', color: '#fff' }}>{p.models}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 4,
                        background: p.status === 'Active' ? 'rgba(16,185,129,0.12)' : p.status === 'Inactive' ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                        color: p.status === 'Active' ? '#10b981' : p.status === 'Inactive' ? '#f59e0b' : '#ef4444',
                        fontWeight: 500
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.region}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.lastSync}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', cursor: 'pointer' }}>✏️ 🗑️ 🔄</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Providers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {providers.map(p => (
            <div key={p.id} className="widget" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>⚡</span>
                <span style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: p.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                  color: p.status === 'Active' ? '#10b981' : '#ef4444',
                  fontWeight: 600
                }}>{p.status}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: '0 0 4px 0' }}>{p.name}</h3>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14 }}>Type: {p.type} | Region: {p.region}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Models: <strong>{p.models}</strong></span>
                <span style={{ color: 'var(--text-secondary)' }}>Sync: {p.lastSync.split(',')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Provider Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="widget" style={{ width: 450, padding: 24 }}>
            <h3 style={{ marginTop: 0, marginBottom: 24, fontSize: 18, color: '#fff' }}>Add AI Provider</h3>
            <form onSubmit={handleAddProvider}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>Provider Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Google Vertex AI"
                  style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 14 }}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>Type</label>
                <select 
                  style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 14 }}
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option>LLM</option>
                  <option>Embedding</option>
                  <option>Vector</option>
                  <option>Graph</option>
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>Models Count</label>
                <input 
                  type="number" 
                  style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 14 }}
                  value={formData.models}
                  onChange={e => setFormData({...formData, models: Number(e.target.value)})}
                  required
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>Region</label>
                <input 
                  type="text" 
                  placeholder="e.g. us-central1"
                  style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 14 }}
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value})}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Provider</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
