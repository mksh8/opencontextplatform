import React from 'react';

export default function IngestionJobs() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Ingestion Jobs</h1>
          <p>Monitor and manage ingestion jobs.</p>
        </div>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Job</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Connector</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Progress</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Started At</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, color: '#fff' }}>GitHub Repository Sync</div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>🐙 GitHub</td>
              <td style={{ padding: '16px 24px' }}><div className="tag" style={{ color: 'var(--accent-green)', background: 'rgba(16, 185, 129, 0.1)', display: 'inline-block' }}>✓ Completed</div></td>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--border-color)', borderRadius: 2 }}><div style={{ width: '100%', height: '100%', background: 'var(--accent-green)', borderRadius: 2 }}></div></div>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>100%</span>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>5m ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, color: '#fff' }}>Slack Channel Sync</div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>💬 Slack</td>
              <td style={{ padding: '16px 24px' }}><div className="tag" style={{ color: 'var(--accent-blue)', background: 'rgba(59, 130, 246, 0.1)', display: 'inline-block' }}>↻ Running</div></td>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--border-color)', borderRadius: 2 }}><div style={{ width: '45%', height: '100%', background: 'var(--accent-blue)', borderRadius: 2 }}></div></div>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>45%</span>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>12m ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, color: '#fff' }}>Notion Database Sync</div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>📓 Notion</td>
              <td style={{ padding: '16px 24px' }}><div className="tag" style={{ color: 'var(--accent-blue)', background: 'rgba(59, 130, 246, 0.1)', display: 'inline-block' }}>↻ Running</div></td>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--border-color)', borderRadius: 2 }}><div style={{ width: '82%', height: '100%', background: 'var(--accent-blue)', borderRadius: 2 }}></div></div>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>82%</span>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>15m ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, color: '#fff' }}>Jira Project Sync</div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>🔷 Jira</td>
              <td style={{ padding: '16px 24px' }}><div className="tag" style={{ color: '#ff7b72', background: 'rgba(255, 123, 114, 0.1)', display: 'inline-block' }}>✕ Failed</div></td>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--border-color)', borderRadius: 2 }}><div style={{ width: '12%', height: '100%', background: '#ff7b72', borderRadius: 2 }}></div></div>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>12%</span>
                </div>
              </td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2h ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
