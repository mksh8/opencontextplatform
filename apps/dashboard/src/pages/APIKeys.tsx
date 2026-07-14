import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

interface APIKey {
  name: string;
  key: string;
  scopes: string;
  created_at: string;
  status: string;
}

export default function APIKeys() {
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orgId = "org_alpha_123";
    
    apiClient.get(`/billing/${orgId}/apikeys`)
      .then(response => {
        setKeys(response.data);
      })
      .catch(error => console.error("Error fetching API keys:", error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>API Keys</h1>
          <p>Manage API keys and tokens.</p>
        </div>
        <button className="btn btn-primary">+ Create API Key</button>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Key</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Scopes</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Created</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Loading API keys...
                </td>
              </tr>
            ) : keys.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No API keys found.
                </td>
              </tr>
            ) : (
              keys.map((apiKey, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>{apiKey.name}</td>
                  <td style={{ padding: '16px 24px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{apiKey.key}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{apiKey.scopes}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{apiKey.created_at}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="status-indicator" style={{ color: apiKey.status === 'Active' ? '#10b981' : '#ff7b72' }}>
                      <div className="dot" style={{ background: apiKey.status === 'Active' ? '#10b981' : '#ff7b72' }}></div> 
                      {apiKey.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', cursor: 'pointer' }}>⋮</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
