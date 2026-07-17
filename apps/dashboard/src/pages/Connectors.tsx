import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

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

  useEffect(() => {
    const orgId = "org_alpha_123";
    apiClient.get(`/connectors/${orgId}`)
      .then(response => {
        setConnectors(response.data);
      })
      .catch(error => console.error("Error fetching connectors:", error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Connectors</h1>
          <p>Manage your data connectors.</p>
        </div>
        <button className="btn btn-primary">+ Add Connector</button>
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
                    <div style={{ fontSize: 11, color: connector.status === 'Connected' ? 'var(--accent-green)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div className="dot" style={{ background: connector.status === 'Connected' ? 'var(--accent-green)' : 'var(--text-secondary)' }}></div> 
                      {connector.status}
                    </div>
                  </div>
                </div>
                <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>⋮</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Last sync: {connector.last_sync}</span>
                <span>{connector.details}</span>
              </div>
            </div>
          ))
        )}

        {/* Add Custom */}
        <div className="widget" style={{ padding: 20, border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500 }}>+ Add Custom Connector</div>
        </div>

      </div>
    </>
  );
}
