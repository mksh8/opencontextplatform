import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function Workspace() {
  const [activeTab, setActiveTab] = useState('Overview');
  const { addToast } = useToast();

  const tabs = ['Overview', 'Members', 'Settings', 'API Keys', 'Usage', 'Billing'];
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Engineering Workspace</h1>
          <p>Manage your engineering workspace context.</p>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 32, marginBottom: 24 }}>
        {tabs.map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              paddingBottom: 12, 
              borderBottom: activeTab === tab ? '2px solid var(--accent-purple)' : '2px solid transparent', 
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)', 
              fontSize: 13, 
              fontWeight: 500, 
              cursor: 'pointer' 
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeTab === 'Overview' ? (
        <>


      {/* KPI GRID for Workspace */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)' }}>📦</div>
          <div className="kpi-data">
            <h3>Total Contexts</h3>
            <div className="value">45.2K <span className="trend-up">↑ 5.2%</span></div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}>🗄️</div>
          <div className="kpi-data">
            <h3>Memories</h3>
            <div className="value">32.1K <span className="trend-up">↑ 12.1%</span></div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)' }}>◎</div>
          <div className="kpi-data">
            <h3>Tokens Usage</h3>
            <div className="value">1.2B <span className="trend-up">↑ 2.4%</span></div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent-yellow)' }}>👥</div>
          <div className="kpi-data">
            <h3>Active Members</h3>
            <div className="value">82 <span className="trend-up">↑ 14.5%</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        
        {/* Recent Activity */}
        <div className="widget" style={{ padding: 24 }}>
          <div className="widget-header">
            <span className="widget-title">Recent Activity</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🐙</div>
              <div>
                <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>New context ingested from GitHub</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>pull_request: "Fix memory leak in connector"</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>2m ago</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🗄️</div>
              <div>
                <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Memory updated</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>collection: "Architecture Decisions"</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>1h ago</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
              <div>
                <div style={{ fontSize: 13, color: '#fff', marginBottom: 4 }}>Collection "Backend Development" created</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>by John Doe</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>2h ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="widget" style={{ padding: 24 }}>
          <div className="widget-header">
            <span className="widget-title">Top Contributors</span>
          </div>
          
          <div className="list-item" style={{ paddingTop: 0 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} />
              <div>
                <div style={{ fontSize: 13, color: '#fff' }}>John Doe</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>12.4K additions</div>
              </div>
            </div>
          </div>
          <div className="list-item">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src="https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} />
              <div>
                <div style={{ fontSize: 13, color: '#fff' }}>Jane Smith</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>8.2K additions</div>
              </div>
            </div>
          </div>
          <div className="list-item">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src="https://ui-avatars.com/api/?name=Mike+Johnson&background=10b981&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} />
              <div>
                <div style={{ fontSize: 13, color: '#fff' }}>Mike Johnson</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>5.1K additions</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      </>
      ) : (
        <div className="widget" style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>The {activeTab} section is currently under development.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => addToast(`Subscribed to ${activeTab} updates!`, 'success')}>Notify me when available</button>
        </div>
      )}
    </>
  );
}
