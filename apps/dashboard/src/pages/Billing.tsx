import React from 'react';

export default function Billing() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Billing & Usage</h1>
          <p>Monitor your usage and billing.</p>
        </div>
        <button className="btn">May 12 - Jun 12, 2024 📅</button>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 32, marginBottom: 24 }}>
        <div style={{ paddingBottom: 12, borderBottom: '2px solid var(--accent-purple)', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Overview</div>
        <div style={{ paddingBottom: 12, color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}>Usage</div>
        <div style={{ paddingBottom: 12, color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}>Invoices</div>
      </div>

      {/* KPI GRID */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi-card" style={{ padding: '16px' }}>
          <div className="kpi-data">
            <h3>Total Tokens</h3>
            <div className="value" style={{ fontSize: 20 }}>2.45B <span className="trend-up">↑ 18.7%</span></div>
          </div>
        </div>
        <div className="kpi-card" style={{ padding: '16px' }}>
          <div className="kpi-data">
            <h3>Total Queries</h3>
            <div className="value" style={{ fontSize: 20 }}>245.6K <span className="trend-up">↑ 15.2%</span></div>
          </div>
        </div>
        <div className="kpi-card" style={{ padding: '16px' }}>
          <div className="kpi-data">
            <h3>Storage Used</h3>
            <div className="value" style={{ fontSize: 20 }}>128.4 GB <span className="trend-up">↑ 5.2%</span></div>
          </div>
        </div>
        <div className="kpi-card" style={{ padding: '16px' }}>
          <div className="kpi-data">
            <h3>Estimated Cost</h3>
            <div className="value" style={{ fontSize: 20 }}>$245.60 <span className="trend-up" style={{ color: '#ff7b72' }}>↑ 1.2%</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        
        {/* Usage Over Time */}
        <div className="widget" style={{ padding: 24 }}>
          <div className="widget-header">
            <span className="widget-title">Usage Over Time</span>
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <span style={{ color: 'var(--accent-purple)' }}>— Tokens</span>
              <span style={{ color: 'var(--accent-blue)' }}>— Requests</span>
            </div>
          </div>
          
          <div className="line-chart-mock" style={{ height: 250 }}>
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="25" x2="100" y2="25" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="var(--border-color)" strokeWidth="0.5" />
              
              <path d="M0,80 Q10,60 20,70 T40,40 T60,60 T80,30 T100,20" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" />
              <path d="M0,90 Q10,75 20,85 T40,60 T60,70 T80,45 T100,30" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" />
            </svg>
            <div style={{ position: 'absolute', left: -20, top: 0, fontSize: 10, color: 'var(--text-secondary)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span>200M</span><span>150M</span><span>100M</span><span>50M</span><span>0</span>
            </div>
            <div style={{ position: 'absolute', bottom: -20, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-secondary)' }}>
              <span>May 12</span><span>May 19</span><span>May 26</span><span>Jun 02</span><span>Jun 09</span><span>Jun 12</span>
            </div>
          </div>
        </div>

        {/* Top Services by Cost */}
        <div className="widget" style={{ padding: 24 }}>
          <div className="widget-header">
            <span className="widget-title">Top Services by Cost</span>
          </div>
          
          <div className="bar-row">
            <div className="bar-label">LLM Requests</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '58%', background: 'var(--accent-purple)' }}></div></div>
            <div className="bar-value">$142.40 <span style={{ fontSize: 10 }}>58.0%</span></div>
          </div>
          <div className="bar-row">
            <div className="bar-label">Embeddings</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '27%', background: 'var(--accent-blue)' }}></div></div>
            <div className="bar-value">$67.30 <span style={{ fontSize: 10 }}>27.4%</span></div>
          </div>
          <div className="bar-row">
            <div className="bar-label">Vector Search</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '10%', background: 'var(--accent-green)' }}></div></div>
            <div className="bar-value">$24.80 <span style={{ fontSize: 10 }}>10.1%</span></div>
          </div>
          <div className="bar-row">
            <div className="bar-label">Graph DB</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '3%', background: 'var(--accent-yellow)' }}></div></div>
            <div className="bar-value">$8.40 <span style={{ fontSize: 10 }}>3.4%</span></div>
          </div>
          <div className="bar-row">
            <div className="bar-label">Other</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '1%', background: 'var(--text-secondary)' }}></div></div>
            <div className="bar-value">$2.70 <span style={{ fontSize: 10 }}>1.1%</span></div>
          </div>
          
          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <span style={{ fontSize: 12, color: 'var(--accent-blue)', cursor: 'pointer' }}>View Invoices</span>
          </div>
        </div>

      </div>
    </>
  );
}
