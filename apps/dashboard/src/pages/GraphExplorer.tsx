import React from 'react';

export default function GraphExplorer() {
  return (
    <>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div className="page-title">
          <h1>Graph Explorer</h1>
          <p>Explore semantic relationships between entities.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, height: 'calc(100vh - 180px)' }}>
        
        {/* Left Sidebar: Entity Types */}
        <div className="widget" style={{ width: 220, flexShrink: 0, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Entity Types</div>
          <select className="search-bar" style={{ width: '100%', marginBottom: 24 }}>
            <option>All Types</option>
            <option>Code</option>
            <option>Documentation</option>
          </select>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" defaultChecked /> File</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>12.4K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" defaultChecked /> Function</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>45.2K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" defaultChecked /> Class</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>8.1K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" /> Module</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>1.2K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" /> Issue</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>3.4K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" /> PR</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>2.1K</span>
            </label>
          </div>
        </div>

        {/* Center Graph Area */}
        <div className="widget" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="100%" height="100%" viewBox="0 0 600 400">
            {/* Edges */}
            <line x1="300" y1="200" x2="150" y2="100" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="300" y1="200" x2="450" y2="100" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="300" y1="200" x2="150" y2="300" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="300" y1="200" x2="450" y2="300" stroke="var(--border-color)" strokeWidth="2" />

            {/* Central Node */}
            <circle cx="300" cy="200" r="30" fill="var(--accent-purple)" />
            <text x="300" y="235" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="500">UserService.py</text>

            {/* Connecting Nodes */}
            <rect x="90" y="80" width="120" height="40" rx="20" fill="var(--bg-panel)" stroke="var(--accent-blue)" strokeWidth="2" />
            <text x="150" y="104" fill="var(--text-primary)" fontSize="10" textAnchor="middle">AuthService.py</text>
            <text x="210" y="145" fill="var(--text-secondary)" fontSize="9">imports</text>

            <rect x="390" y="80" width="120" height="40" rx="20" fill="var(--bg-panel)" stroke="var(--accent-green)" strokeWidth="2" />
            <text x="450" y="104" fill="var(--text-primary)" fontSize="10" textAnchor="middle">UserController.py</text>
            <text x="360" y="145" fill="var(--text-secondary)" fontSize="9">called_by</text>

            <rect x="90" y="280" width="120" height="40" rx="20" fill="var(--bg-panel)" stroke="var(--accent-yellow)" strokeWidth="2" />
            <text x="150" y="304" fill="var(--text-primary)" fontSize="10" textAnchor="middle">Database.py</text>
            <text x="200" y="260" fill="var(--text-secondary)" fontSize="9">uses</text>

            <rect x="390" y="280" width="120" height="40" rx="20" fill="var(--bg-panel)" stroke="#ff7b72" strokeWidth="2" />
            <text x="450" y="304" fill="var(--text-primary)" fontSize="10" textAnchor="middle">PR #452</text>
            <text x="380" y="260" fill="var(--text-secondary)" fontSize="9">modified_in</text>
          </svg>
        </div>

        {/* Right Sidebar: Entity Details */}
        <div className="widget" style={{ width: 260, flexShrink: 0, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Entity Details</div>
          
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📄</div>
            <div>
              <div style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>AuthService.py</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>File</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Repository</span>
              <span style={{ color: '#fff' }}>OpenContextPlatform</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Path</span>
              <span style={{ color: '#fff' }}>/src/services/</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Language</span>
              <span style={{ color: '#fff' }}>Python</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Last Modified</span>
              <span style={{ color: '#fff' }}>2 days ago</span>
            </div>
          </div>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>Related Entities (12)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="tag" style={{ border: '1px solid var(--border-color)' }}>UserService.py</span>
              <span className="tag" style={{ border: '1px solid var(--border-color)' }}>JWT.py</span>
              <span className="tag" style={{ border: '1px solid var(--border-color)' }}>PR #452</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
