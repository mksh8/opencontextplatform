import React from 'react';

export default function ConnectorScheduling() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Pipeline Scheduling</h1>
        <p>Configure cron-based triggers for the GitHub sync pipeline.</p>
      </div>

      <div className="widget" style={{ maxWidth: '600px', padding: '32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Current Strategy</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" style={{ padding: '8px 16px' }}>Interval (Cron)</button>
            <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Webhook (Push)</button>
            <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>Manual Only</button>
          </div>
        </div>

        <form>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Cron Expression</label>
            <input type="text" defaultValue="0 * * * *" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', fontFamily: 'monospace' }} />
            <p style={{ fontSize: '13px', color: 'var(--accent-green)', marginTop: '8px' }}>Next run: in 18 minutes (Top of the hour)</p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Concurrency Policy</label>
            <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }}>
              <option value="skip">Skip if already running</option>
              <option value="queue">Queue up to 3 runs</option>
              <option value="cancel">Cancel previous run</option>
            </select>
          </div>

          <button type="button" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>Save Schedule</button>
        </form>
      </div>
    </div>
  );
}
