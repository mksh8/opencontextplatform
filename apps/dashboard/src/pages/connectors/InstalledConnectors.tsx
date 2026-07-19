import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/client';
import { useToast } from '../../contexts/ToastContext';

export default function InstalledConnectors() {
  const [connectors, setConnectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchConnectors = async () => {
    try {
      const orgId = "org_alpha_123";
      const res = await apiClient.get(`/connectors/${orgId}`);
      setConnectors(res.data);
    } catch (e) {
      showToast('Failed to fetch connectors', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectors();
  }, []);

  const handleSync = async (connectorId: string) => {
    setSyncing(connectorId);
    try {
      const res = await apiClient.post(`/connectors/${connectorId}/sync`);
      showToast(res.data.message || 'Sync started!', 'success');
      fetchConnectors();
    } catch (e: any) {
      showToast(e.response?.data?.detail || 'Sync failed', 'error');
    } finally {
      setSyncing(null);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Installed Connectors</h1>
          <p>Active data pipelines running in this workspace.</p>
        </div>
        <Link to="/connectors/marketplace" className="btn btn-primary" style={{ padding: '10px 16px', textDecoration: 'none' }}>+ Install New</Link>
      </div>

      <div className="widget">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading connectors...</div>
        ) : connectors.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No connectors installed yet. <Link to="/connectors/marketplace" style={{ color: 'var(--accent-blue)' }}>Browse Marketplace</Link>
          </div>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Last Sync</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {connectors.map(conn => (
                <tr key={conn.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px', fontSize: '24px' }}>{conn.icon || '🔌'}</td>
                  <td style={{ padding: '12px', fontWeight: 500 }}>{conn.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{conn.last_sync || 'Never'}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ color: conn.status === 'Active' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
                      ● {conn.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button 
                      onClick={() => handleSync(conn.id)}
                      disabled={syncing === conn.id}
                      className="btn"
                      style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        padding: '6px 12px', 
                        fontSize: '13px',
                        cursor: syncing === conn.id ? 'not-allowed' : 'pointer',
                        opacity: syncing === conn.id ? 0.5 : 1
                      }}
                    >
                      {syncing === conn.id ? 'Syncing...' : 'Sync Now'}
                    </button>
                    <Link to="/connectors/details" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>Manage</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
