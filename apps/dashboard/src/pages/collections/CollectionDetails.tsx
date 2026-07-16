import React from 'react';
import { Link } from 'react-router-dom';

export default function CollectionDetails() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Engineering Specs</h1>
          <p>Collection ID: col_14af9 | Created Oct 12, 2024</p>
        </div>
        <div>
          <Link to="/collections/permissions" className="btn btn-secondary" style={{ marginRight: 12, padding: '10px 16px', textDecoration: 'none' }}>Permissions</Link>
          <button className="btn btn-primary" style={{ padding: '10px 16px' }}>+ Add Context</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Contexts Inside</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>14,230</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Storage</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>2.4 GB</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Search Volume (24h)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-green)' }}>1.2K Queries</p>
        </div>
      </div>

      <div className="widget">
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Attached Contexts</h2>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>ID</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Source</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Tokens</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}><Link to="/contexts/details" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>ctx_9f8a2</Link></td>
              <td style={{ padding: '12px' }}>github/PR-142</td>
              <td style={{ padding: '12px' }}>1,240</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-green)' }}>● Indexed</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '12px' }}><Link to="/contexts/details" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>ctx_b214c</Link></td>
              <td style={{ padding: '12px' }}>github/Issue-912</td>
              <td style={{ padding: '12px' }}>450</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'var(--accent-green)' }}>● Indexed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
