import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { Loader2, Plus, X } from 'lucide-react';

interface Connector {
  id: string;
  name: string;
  icon: string;
  status: string;
  last_sync: string;
  details: string;
}

export default function Connectors() {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newConnectorName, setNewConnectorName] = useState('');
  const [newConnectorType, setNewConnectorType] = useState('github');

  const orgId = "org_alpha_123";

  const fetchConnectors = () => {
    setLoading(true);
    apiClient.get(`/connectors/${orgId}`)
      .then(response => {
        setConnectors(response.data);
      })
      .catch(error => console.error("Error fetching connectors:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchConnectors();
  }, []);

  const handleAddConnector = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConnectorName.trim()) return;

    setSubmitting(true);
    try {
      await apiClient.post(`/connectors/${orgId}`, {
        name: newConnectorName,
        type: newConnectorType,
        config: {}
      });
      setShowModal(false);
      setNewConnectorName('');
      fetchConnectors();
    } catch (error) {
      console.error("Error adding connector:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSync = async (connectorId: string) => {
    try {
      await apiClient.post(`/connectors/${connectorId}/sync`);
      fetchConnectors(); // refresh sync time
    } catch (error) {
      console.error("Error syncing connector:", error);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Connectors</h1>
          <p>Manage your data connectors.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} style={{ marginRight: '8px' }} /> Add Connector
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {loading ? (
          <div style={{ color: 'var(--text-secondary)' }}>Loading connectors...</div>
        ) : (
          connectors.map(connector => (
            <div className="widget" style={{ padding: 20 }} key={connector.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontSize: 24 }}>{connector.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500 }}>{connector.name}</h3>
                    <div style={{ fontSize: 11, color: connector.status === 'Active' || connector.status === 'Connected' ? 'var(--accent-green)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div className="dot" style={{ background: connector.status === 'Active' || connector.status === 'Connected' ? 'var(--accent-green)' : 'var(--text-secondary)' }}></div> 
                      {connector.status}
                    </div>
                  </div>
                </div>
                <div className="dropdown">
                  <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', padding: '0 8px' }}>⋮</span>
                  <div className="dropdown-content" style={{ position: 'absolute', right: 0, top: '24px', background: '#1c2128', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px', zIndex: 10, display: 'none' }}>
                    <div style={{ padding: '8px 12px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-primary)' }} onClick={() => handleSync(connector.id)}>Sync Now</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Last sync:</span> 
                  {new Date(connector.last_sync).toLocaleString() !== 'Invalid Date' ? new Date(connector.last_sync).toLocaleString() : connector.last_sync}
                </span>
                <button className="btn" style={{ padding: '4px 12px', fontSize: '12px' }} onClick={() => handleSync(connector.id)}>Sync Now</button>
              </div>
            </div>
          ))
        )}

        {/* Add Custom */}
        <div className="widget" onClick={() => setShowModal(true)} style={{ padding: 20, border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500 }}>+ Add Custom Connector</div>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="widget" style={{ width: '400px', padding: '0' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Add Connector</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddConnector} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Connector Name</label>
                <input 
                  type="text" 
                  className="input" 
                  value={newConnectorName}
                  onChange={e => setNewConnectorName(e.target.value)}
                  placeholder="e.g. Acme Corp Slack" 
                  required
                  style={{ width: '100%', padding: '8px 12px', background: '#0d1117', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Connector Type</label>
                <select 
                  className="input"
                  value={newConnectorType}
                  onChange={e => setNewConnectorType(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', background: '#0d1117', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px' }}
                >
                  <option value="github">GitHub</option>
                  <option value="slack">Slack</option>
                  <option value="notion">Notion</option>
                  <option value="web">Web Scraper</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {submitting ? <Loader2 size={14} className="spin" /> : null} Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
