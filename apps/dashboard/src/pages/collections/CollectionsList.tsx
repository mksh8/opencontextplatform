import React from 'react';
import { Link } from 'react-router-dom';

export default function CollectionsList() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>All Collections</h1>
          <p>Global registry of all top-level organizational knowledge boundaries.</p>
        </div>
        <Link to="/collections/create" className="btn btn-primary" style={{ padding: '10px 16px', textDecoration: 'none' }}>+ Create Collection</Link>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Description</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Contexts</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Created By</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>Engineering Specs</td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>All PRs, design docs, and RFCs</td>
              <td style={{ padding: '12px' }}>14,230</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-blue)' }}>dev_jane</span></td>
              <td style={{ padding: '12px' }}><Link to="/collections/details" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>Manage</Link></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px', fontWeight: 500 }}>Customer Support</td>
              <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Zendesk tickets and knowledge base</td>
              <td style={{ padding: '12px' }}>8,450</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-blue)' }}>sys_sync_bot</span></td>
              <td style={{ padding: '12px' }}><Link to="/collections/details" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>Manage</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
