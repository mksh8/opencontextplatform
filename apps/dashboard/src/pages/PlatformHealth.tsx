import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const TABS = ['Overview', 'Services', 'Infrastructure', 'Alerts'];

const SERVICES = [
  { name: 'API Gateway', status: 'Healthy', color: '#10b981' },
  { name: 'Authentication Service', status: 'Healthy', color: '#10b981' },
  { name: 'User Service', status: 'Healthy', color: '#10b981' },
  { name: 'Organization Service', status: 'Healthy', color: '#10b981' },
  { name: 'Billing Service', status: 'Healthy', color: '#10b981' },
  { name: 'AI Provider Service', status: 'Healthy', color: '#10b981' },
  { name: 'Storage Service', status: 'Warning', color: '#f59e0b' },
  { name: 'Notification Service', status: 'Healthy', color: '#10b981' }
];

const INFRASTRUCTURE = [
  { name: 'Main DB Cluster (ArcadeDB)', status: 'Healthy', usage: '34% capacity' },
  { name: 'Vector DB (pgvector)', status: 'Healthy', usage: '12% capacity' },
  { name: 'Redis Cache', status: 'Healthy', usage: '48% memory' },
  { name: 'MinIO Object Storage', status: 'Healthy', usage: '28% storage' },
  { name: 'Kubernetes Nodes', status: 'Healthy', usage: '6/6 active' }
];

const ALERTS = [
  { id: 1, severity: 'Warning', service: 'Storage Service', message: 'MinIO storage threshold exceeded 85% on node-2.', time: '10 mins ago' },
  { id: 2, severity: 'Warning', service: 'AI Provider Service', message: 'Ollama endpoint latency spike: > 1500ms response time.', time: '23 mins ago' }
];

export default function PlatformHealth() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('System health metrics refreshed successfully', 'success');
    }, 1000);
  };

  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>System Health</h1>
          <p style={{ marginTop: 4 }}>Monitor the health and status of platform services.</p>
        </div>
        <button className="btn btn-secondary" onClick={handleRefresh} disabled={refreshing} style={{ padding: '8px 16px', fontSize: 13 }}>
          {refreshing ? 'Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 20 }}>
        {TABS.map(t => (
          <div
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: '10px 18px',
              borderBottom: activeTab === t ? '2px solid #8b5cf6' : '2px solid transparent',
              color: activeTab === t ? '#fff' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* RENDER TAB CONTENTS */}

      {/* 1. Overview Tab */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Health KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <div className="widget" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#10b981' }}>✓</div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 4 }}>Overall Status</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 2 }}>Healthy</div>
                <div style={{ fontSize: 10, color: '#10b981' }}>100% Uptime</div>
              </div>
            </div>

            <div className="widget" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#10b981' }}>⚙️</div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 4 }}>Services</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 2 }}>47 / 48</div>
                <div style={{ fontSize: 10, color: '#10b981' }}>Healthy</div>
              </div>
            </div>

            <div className="widget" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#10b981' }}>💻</div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 4 }}>Infrastructure</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 2 }}>23 / 23</div>
                <div style={{ fontSize: 10, color: '#10b981' }}>Healthy</div>
              </div>
            </div>

            <div className="widget" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#f59e0b' }}>⚠️</div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 4 }}>Alerts</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 2 }}>2 Warnings</div>
                <div style={{ fontSize: 10, color: '#f59e0b' }}>Needs attention</div>
              </div>
            </div>
          </div>

          {/* Service Status and System Metrics Split */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: 20 }}>
            {/* Service Status widget */}
            <div className="widget" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: 14, margin: '0 0 16px 0', fontWeight: 600, color: '#fff' }}>Service Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SERVICES.map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                    <span style={{ color: 'var(--text-primary)' }}>{s.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
                      <span style={{ color: s.color, fontWeight: 500 }}>{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 16, paddingTop: 12, fontSize: 12, color: '#3b82f6', cursor: 'pointer' }} onClick={() => setActiveTab('Services')}>
                View all services →
              </div>
            </div>

            {/* System Metrics widget */}
            <div className="widget" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, margin: 0, fontWeight: 600, color: '#fff' }}>System Metrics</h3>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Last 24 Hours</span>
              </div>

              {/* Sparklines grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                {[
                  { name: 'CPU Usage', val: '32%', color: '#8b5cf6', data: [20, 25, 45, 30, 32, 28, 40, 32] },
                  { name: 'Memory Usage', val: '61%', color: '#3b82f6', data: [58, 60, 59, 61, 62, 60, 61, 61] },
                  { name: 'Disk Usage', val: '45%', color: '#10b981', data: [44, 44, 45, 45, 45, 45, 45, 45] },
                  { name: 'Network I/O', val: '128 MB/s', color: '#f59e0b', data: [90, 110, 150, 120, 130, 115, 128, 128] }
                ].map(metric => (
                  <div key={metric.name} style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11, color: 'var(--text-secondary)' }}>
                      <span>{metric.name}</span>
                      <strong style={{ color: '#fff', fontSize: 12 }}>{metric.val}</strong>
                    </div>
                    {/* SVG Sparkline */}
                    <div style={{ height: 40 }}>
                      <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path
                          d={`M ${metric.data.map((v, i) => `${(i / (metric.data.length - 1)) * 100} ${30 - (v / 100) * 30}`).join(' L ')}`}
                          fill="none"
                          stroke={metric.color}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Services Tab */}
      {activeTab === 'Services' && (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {['Service Name', 'Version', 'Uptime', 'Latency', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', color: '#fff', fontWeight: 500 }}>{s.name}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>v1.2.0</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>99.98%</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>12 ms</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: s.status === 'Healthy' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: s.color, fontWeight: 500 }}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. Infrastructure Tab */}
      {activeTab === 'Infrastructure' && (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {['Component', 'Capacity / Usage', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INFRASTRUCTURE.map((infra, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', color: '#fff', fontWeight: 500 }}>{infra.name}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{infra.usage}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{infra.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Alerts Tab */}
      {activeTab === 'Alerts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ALERTS.map(alert => (
            <div key={alert.id} className="widget" style={{ borderLeft: '4px solid #f59e0b', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 11, padding: '2px 6px', background: 'rgba(245,158,11,0.12)', color: '#f59e0b', borderRadius: 4, fontWeight: 600 }}>{alert.severity}</span>
                  <strong style={{ fontSize: 13, color: '#fff' }}>{alert.service}</strong>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{alert.message}</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{alert.time}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
