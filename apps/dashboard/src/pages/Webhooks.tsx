import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: string;
}

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orgId = "org_alpha_123";
    apiClient.get(`/webhooks/${orgId}`)
      .then(response => {
        setWebhooks(response.data);
      })
      .catch(error => console.error("Error fetching webhooks:", error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Webhooks</h1>
          <p>Configure automated data pushes to the ingestion pipeline.</p>
        </div>
        <button className="btn btn-primary">+ Create Webhook</button>
      </div>

      {loading ? (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>Loading webhooks...</div>
      ) : webhooks.length === 0 ? (
        <div className="widget" style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
          <h2 style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>No Webhooks Configured</h2>
          <p style={{ fontSize: 13, maxWidth: 400, margin: '0 auto' }}>
            Create a webhook to allow external services to push events directly into the OpenContextPlatform ingestion queue.
          </p>
        </div>
      ) : (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Name</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Events</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map(wh => (
                <tr key={wh.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 500, color: '#fff' }}>{wh.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{wh.url}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {wh.events.map(event => (
                      <span key={event} className="tag" style={{ border: '1px solid var(--border-color)', marginRight: 4 }}>{event}</span>
                    ))}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="status-indicator" style={{ color: wh.status === 'Active' ? '#10b981' : 'var(--text-secondary)' }}>
                      <div className="dot" style={{ background: wh.status === 'Active' ? '#10b981' : 'var(--text-secondary)' }}></div> 
                      {wh.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', cursor: 'pointer' }}>⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
