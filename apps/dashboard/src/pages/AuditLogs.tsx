import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useToast } from '../contexts/ToastContext';

interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  status: string;
  timestamp: string;
  details?: any;
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    apiClient.get('/auditlogs')
      .then(res => setLogs(res.data))
      .catch(() => showToast('Failed to fetch audit logs', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Audit Logs</h1>
          <p>View system audit logs.</p>
        </div>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>User</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Action</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Resource</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No audit logs found.</td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(log.actor)}&background=random&color=fff`} style={{ width: 24, height: 24, borderRadius: '50%' }} />
                    <span style={{ fontWeight: 500, color: '#fff' }}>{log.actor}</span>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{log.action}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{log.target}</td>
                  <td style={{ padding: '16px 24px', color: log.status === 'success' || log.status === 'allow' ? '#10b981' : '#ef4444' }}>{log.status}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
