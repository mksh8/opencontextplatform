import React from 'react';

export default function Timeline() {
  return (
    <>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div className="page-title">
          <h1>Timeline</h1>
          <p>View your context timeline.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, height: 'calc(100vh - 180px)' }}>
        
        {/* Graph Area */}
        <div className="widget" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
            Zoom: 100%
          </div>
          
          {/* SVG Graph Mockup */}
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            {/* Edges */}
            <line x1="400" y1="300" x2="250" y2="150" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="400" y1="300" x2="550" y2="150" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="400" y1="300" x2="200" y2="300" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="400" y1="300" x2="600" y2="300" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="400" y1="300" x2="300" y2="450" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="400" y1="300" x2="500" y2="450" stroke="var(--border-color)" strokeWidth="2" />
            
            {/* Center Node (Auth System) */}
            <circle cx="400" cy="300" r="40" fill="var(--accent-blue)" opacity="0.2" />
            <circle cx="400" cy="300" r="30" fill="var(--accent-blue)" />
            <text x="400" y="305" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="600">Authentication</text>
            <text x="400" y="318" fill="rgba(255,255,255,0.7)" fontSize="8" textAnchor="middle">System</text>

            {/* Child Nodes */}
            <circle cx="250" cy="150" r="20" fill="var(--accent-purple)" />
            <text x="250" y="185" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">JWT Logic</text>

            <circle cx="550" cy="150" r="20" fill="var(--accent-green)" />
            <text x="550" y="185" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Slack Discussion</text>

            <circle cx="200" cy="300" r="20" fill="var(--accent-yellow)" />
            <text x="200" y="335" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Jira Epic</text>

            <circle cx="600" cy="300" r="20" fill="var(--accent-blue)" />
            <text x="600" y="335" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Documentation</text>

            <circle cx="300" cy="450" r="20" fill="#d29922" />
            <text x="300" y="485" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">User Feedback</text>

            <circle cx="500" cy="450" r="20" fill="#ff7b72" />
            <text x="500" y="485" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Security Audit</text>
          </svg>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="widget" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Timeline Filters</h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              <button className="btn" style={{ flex: 1, padding: '6px 8px' }}>All Types ⌄</button>
              <button className="btn" style={{ flex: 1, padding: '6px 8px' }}>All Sources ⌄</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: '#fff' }}>June 2024</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <span style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>&lt;</span>
                <span style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>&gt;</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, textAlign: 'center', fontSize: 12, color: '#fff' }}>
              <span style={{ color: 'var(--text-secondary)' }}>26</span>
              <span style={{ color: 'var(--text-secondary)' }}>27</span>
              <span style={{ color: 'var(--text-secondary)' }}>28</span>
              <span style={{ color: 'var(--text-secondary)' }}>29</span>
              <span style={{ color: 'var(--text-secondary)' }}>30</span>
              <span style={{ color: 'var(--text-secondary)' }}>31</span>
              <span>1</span>
              <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
              <span>9</span><span>10</span><span>11</span>
              <span style={{ background: 'var(--accent-purple)', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>12</span>
              <span>13</span><span>14</span><span>15</span>
              <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="nav-item active" style={{ marginLeft: 0, padding: '8px 12px' }}>Today</div>
              <div className="nav-item" style={{ marginLeft: 0, padding: '8px 12px' }}>Last 7 days</div>
              <div className="nav-item" style={{ marginLeft: 0, padding: '8px 12px' }}>Last 30 days</div>
              <div className="nav-item" style={{ marginLeft: 0, padding: '8px 12px' }}>Custom range</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
