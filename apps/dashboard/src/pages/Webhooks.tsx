import React from 'react';

export default function Webhooks() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Webhooks</h1>
          <p>Configure automated data pushes to the ingestion pipeline.</p>
        </div>
        <button className="btn btn-primary">+ Create Webhook</button>
      </div>

      <div className="widget" style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
        <h2 style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>No Webhooks Configured</h2>
        <p style={{ fontSize: 13, maxWidth: 400, margin: '0 auto' }}>
          Create a webhook to allow external services to push events directly into the OpenContextPlatform ingestion queue.
        </p>
      </div>
    </>
  );
}
