import React from 'react';

export default function NestedCollections() {
  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Nested Tree</h1>
          <p>Hierarchical view of organizational knowledge.</p>
        </div>
        <button className="btn btn-secondary" style={{ padding: '10px 16px' }}>Expand All</button>
      </div>

      <div className="widget" style={{ padding: '24px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 500, fontSize: '16px' }}>
              <span style={{ marginRight: '8px' }}>▼</span> 📂 Engineering Specs
            </div>
            <ul style={{ listStyle: 'none', paddingLeft: '32px', margin: '8px 0 0 0' }}>
              <li style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                  <span style={{ marginRight: '8px' }}>▼</span> 📂 Frontend Architecture (450 nodes)
                </div>
                <ul style={{ listStyle: 'none', paddingLeft: '32px', margin: '8px 0 0 0' }}>
                  <li style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>📄 React State Management RFC</li>
                  <li style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>📄 Vite Migration Plan</li>
                </ul>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                  <span style={{ marginRight: '8px' }}>▶</span> 📂 Backend Architecture (1,200 nodes)
                </div>
              </li>
            </ul>
          </li>
          
          <li style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 500, fontSize: '16px' }}>
              <span style={{ marginRight: '8px' }}>▶</span> 📂 Human Resources
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
