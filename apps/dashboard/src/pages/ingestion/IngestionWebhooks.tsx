import React from 'react';

export default function IngestionWebhooks() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Inbound Webhooks</h1>
          <p>Endpoints configured to receive real-time POST payloads into the ETL pipelines.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>+ Generate Webhook</button>
      </div>

      <div className="widget" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Slack Event Listener</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>Routes to: <span style={{ color: 'var(--accent-blue)' }}>etl_slack_msgs</span></p>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontFamily: 'monospace', color: '#fff', fontSize: '14px', marginRight: '16px' }}>https://api.opencontext.com/v1/webhooks/in/wh_9x8f2a1b</span>
              <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>Copy</button>
            </div>
          </div>
          <div>
            <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green)', borderRadius: '4px', fontSize: '12px' }}>● Active</span>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Webhook Secret (For HMAC Signature Verification)</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="password" value="secret_************************" readOnly style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: 'var(--text-secondary)', fontFamily: 'monospace', width: '300px', marginRight: '12px' }} />
            <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>Reveal</button>
          </div>
        </div>
      </div>
    </div>
  );
}
