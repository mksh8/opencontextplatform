import React from 'react';
import { Link } from 'react-router-dom';

export default function IngestionPipelines() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Ingestion Pipelines</h1>
          <p>Active ETL pipelines processing data from external connectors.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>+ New Pipeline</button>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Pipeline ID</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Source Connector</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Nodes Processed</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Configuration</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>etl_gh_issues</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-blue)' }}>🐙 GitHub Core Sync</span></td>
              <td style={{ padding: '12px' }}>14,240</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-green)' }}>● Active</span></td>
              <td style={{ padding: '12px' }}><Link to="/ingestion/etl" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>Edit Mapping</Link></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>etl_slack_msgs</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-blue)' }}>💬 Slack: #engineering</span></td>
              <td style={{ padding: '12px' }}>8,912</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-orange)' }}>● Rate Limited</span></td>
              <td style={{ padding: '12px' }}><Link to="/ingestion/etl" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>Edit Mapping</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
