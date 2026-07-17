import React from 'react';

export default function DeadLetterQueue() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Dead Letter Queue (DLQ)</h1>
          <p>Payloads that failed validation or embedding. Review, edit, and retry.</p>
        </div>
        <div>
          <button className="btn btn-secondary" style={{ marginRight: 12, padding: '10px 16px' }}>Purge All</button>
          <button className="btn btn-primary" style={{ padding: '10px 16px' }}>Retry All</button>
        </div>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Payload ID</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Source Pipeline</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Failure Reason</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Timestamp</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>dlq_msg_1</td>
              <td style={{ padding: '12px' }}>etl_gh_issues</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)' }}>Validation Error: Missing "title"</span></td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>12 mins ago</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-purple)', cursor: 'pointer', marginRight: '16px' }}>Edit Payload</span><span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Retry</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontFamily: 'monospace' }}>dlq_msg_2</td>
              <td style={{ padding: '12px' }}>etl_slack_msgs</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)' }}>Embedding Error: Max tokens exceeded (8192)</span></td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>1 hr ago</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-purple)', cursor: 'pointer', marginRight: '16px' }}>Edit Payload</span><span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }}>Retry</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
