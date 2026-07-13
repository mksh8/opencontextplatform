import React from 'react';

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Dashboard</h1>
          <p>Overview of your OpenContextPlatform</p>
        </div>
        <div className="filters">
          <button className="btn">All Workspaces ⌄</button>
          <button className="btn">May 12 - Jun 12, 2024 📅</button>
          <button className="btn btn-primary">+ New Context</button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)' }}>📦</div>
          <div className="kpi-data">
            <h3>Total Contexts</h3>
            <div className="value">128.4K <span className="trend-up">↑ 12.5%</span></div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>vs Apr 12 - May 12</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}>🗄️</div>
          <div className="kpi-data">
            <h3>Total Memories</h3>
            <div className="value">96.7K <span className="trend-up">↑ 8.3%</span></div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>vs Apr 12 - May 12</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)' }}>◎</div>
          <div className="kpi-data">
            <h3>Total Tokens</h3>
            <div className="value">2.45B <span className="trend-up">↑ 18.7%</span></div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>vs Apr 12 - May 12</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent-yellow)' }}>🔍</div>
          <div className="kpi-data">
            <h3>Total Queries</h3>
            <div className="value">245.6K <span className="trend-up">↑ 15.2%</span></div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>vs Apr 12 - May 12</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)' }}>📈</div>
          <div className="kpi-data">
            <h3>Avg. Retrieval Score</h3>
            <div className="value">0.86 <span className="trend-up">↑ 3.4%</span></div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>vs Apr 12 - May 12</div>
          </div>
        </div>
      </div>

      {/* MIDDLE ROW WIDGETS */}
      <div className="widgets-grid">
        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">Context Ingestion & Retrieval</span>
            <button className="btn" style={{ padding: '4px 12px', fontSize: 12 }}>Daily ⌄</button>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 12 }}>
            <span style={{ color: 'var(--accent-purple)' }}>— Ingestion</span>
            <span style={{ color: 'var(--accent-blue)' }}>— Retrieval</span>
          </div>
          <div className="line-chart-mock">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="20" x2="100" y2="20" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="60" x2="100" y2="60" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="var(--border-color)" strokeWidth="0.5" />
              <path d="M0,80 Q10,70 20,80 T40,60 T60,50 T80,50 T100,40" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" />
              <path d="M0,95 Q10,90 20,95 T40,85 T60,80 T80,75 T100,65" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" />
            </svg>
            <div style={{ position: 'absolute', left: -20, top: 0, fontSize: 10, color: 'var(--text-secondary)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span>100K</span><span>80K</span><span>60K</span><span>40K</span><span>20K</span><span>0</span>
            </div>
            <div style={{ position: 'absolute', bottom: -20, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-secondary)' }}>
              <span>May 12</span><span>May 19</span><span>May 26</span><span>Jun 02</span><span>Jun 09</span><span>Jun 12</span>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">Top Connectors</span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer', background: 'var(--bg-dark)', padding: '4px 12px', borderRadius: 4, border: '1px solid var(--border-color)' }}>View all</span>
          </div>
          
          <div className="bar-row">
            <div className="bar-label">🐙 GitHub</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '85%', background: 'var(--accent-purple)' }}></div></div>
            <div className="bar-value">32.4K</div>
          </div>
          <div className="bar-row">
            <div className="bar-label">💬 Slack</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '60%', background: 'var(--accent-blue)' }}></div></div>
            <div className="bar-value">18.7K</div>
          </div>
          <div className="bar-row">
            <div className="bar-label">📓 Notion</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '50%', background: 'var(--accent-green)' }}></div></div>
            <div className="bar-value">16.2K</div>
          </div>
          <div className="bar-row">
            <div className="bar-label">🔷 Jira</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '40%', background: 'var(--accent-yellow)' }}></div></div>
            <div className="bar-value">12.8K</div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">Context Distribution</span>
          </div>
          <div className="donut-mock">
            <div className="donut-inner">
              <span>128.4K</span>
              <small>Total</small>
            </div>
          </div>
          <div style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 12 }}>
              <span><span style={{ color: 'var(--accent-purple)' }}>●</span> Code</span>
              <span style={{ color: 'var(--text-secondary)' }}>48.6%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 12 }}>
              <span><span style={{ color: 'var(--accent-blue)' }}>●</span> Documentation</span>
              <span style={{ color: 'var(--text-secondary)' }}>24.7%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
