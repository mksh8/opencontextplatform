import React from 'react';

export default function TagsManager() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Tags Manager</h1>
          <p>Global taxonomy assigned across contexts.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '10px 16px' }}>+ Create Tag</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ padding: '8px 16px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue)', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.5)', cursor: 'pointer' }}>#architecture (142 nodes)</span>
        <span style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green)', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.5)', cursor: 'pointer' }}>#security-review (85 nodes)</span>
        <span style={{ padding: '8px 16px', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-orange)', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.5)', cursor: 'pointer' }}>#deprecated (12 nodes)</span>
        <span style={{ padding: '8px 16px', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-purple)', borderRadius: '20px', border: '1px solid rgba(124, 58, 237, 0.5)', cursor: 'pointer' }}>#q3-planning (420 nodes)</span>
      </div>
    </div>
  );
}
