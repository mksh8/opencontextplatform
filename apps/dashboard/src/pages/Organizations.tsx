import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export default function Organizations() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get('/organizations')
      .then(res => {
        setOrganizations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load organizations", err);
        setError("Failed to load organizations from API");
        setLoading(false);
      });
  }, []);
  
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Organizations</h1>
          <p>Manage organizations.</p>
        </div>
        <button className="btn btn-primary">+ New Organization</button>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Organization</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Members</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Workspaces</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Plan</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading organizations...</td></tr>
            ) : error ? (
              <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#ff7b72' }}>{error}</td></tr>
            ) : (
              organizations.map(org => (
                <tr key={org.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 24, height: 24, background: 'var(--accent-purple)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      {org.name.charAt(0)}
                    </div>
                    <div style={{ fontWeight: 500, color: '#fff' }}>{org.name}</div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>-</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{org.workspaces?.length || 0}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{org.plan}</td>
                  <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
                  <td style={{ padding: '16px 24px' }}>⋮</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
