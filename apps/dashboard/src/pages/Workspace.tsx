import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import MembersList from '../components/MembersList';
import APIKeysList from '../components/APIKeysList';
import BillingDashboard from '../components/BillingDashboard';

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

      {activeTab === 'Overview' && (
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
      )}

      {activeTab === 'Members' && <MembersList />}
      
      {activeTab === 'API Keys' && <APIKeysList />}
      
      {(activeTab === 'Usage' || activeTab === 'Billing') && <BillingDashboard />}
      
      {activeTab === 'Settings' && (
        <div style={{ display: 'grid', gap: 24, maxWidth: 800 }}>
          <div className="widget" style={{ padding: 32 }}>
            <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>Workspace Details</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Update your workspace settings and profile.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Workspace Name</label>
                <input type="text" defaultValue="Engineering Workspace" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>URL Slug</label>
                <input type="text" defaultValue="engineering-workspace" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff', fontFamily: 'monospace' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <button className="btn btn-primary" onClick={() => addToast('Settings saved successfully', 'success')}>Save Changes</button>
              </div>
            </div>
          </div>

          <div className="widget" style={{ padding: 32, border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <h3 style={{ fontSize: 18, color: '#ef4444', marginBottom: 8 }}>Danger Zone</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Irreversible and destructive actions.</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>Archive Workspace</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Mark this workspace as read-only. Integrations will be paused.</p>
              </div>
              <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Archive</button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>Delete Workspace</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Permanently remove this workspace and all of its data. This cannot be undone.</p>
              </div>
              <button className="btn" style={{ background: '#ef4444', color: '#fff' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
