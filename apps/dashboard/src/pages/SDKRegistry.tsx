import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const TABS = ['Overview', 'All SDKs', 'Official SDKs', 'Community SDKs', 'Languages', 'Frameworks'];

// Overview KPIs
const KPIS = [
  { label: 'Total SDKs', value: 68, trend: '↗ 12% from last month', trendUp: true },
  { label: 'Official SDKs', value: 24, trend: '↗ 8% from last month', trendUp: true },
  { label: 'Community SDKs', value: 44, trend: '↘ 5% from last month', trendUp: false },
  { label: 'Downloads', value: '25.6K', trend: '↗ 22% from last month', trendUp: true },
  { label: 'Active Integrations', value: 132, trend: '↗ 10% from last month', trendUp: true }
];

// Top SDKs by Downloads
const TOP_SDKS = [
  { name: 'OpenContext Python SDK', language: 'Python', downloads: '6.2K' },
  { name: 'OpenContext JavaScript SDK', language: 'JavaScript', downloads: '4.8K' },
  { name: 'OpenContext Go SDK', language: 'Go', downloads: '2.8K' },
  { name: 'OpenContext .NET SDK', language: '.NET', downloads: '2.1K' },
  { name: 'OpenContext Java SDK', language: 'Java', downloads: '1.7K' }
];

// Recent releases
const RECENT_SDKS = [
  { name: 'OpenContext Rust SDK', language: 'Rust', version: 'v0.1.0', date: 'May 10, 2024' },
  { name: 'OpenContext PHP SDK', language: 'PHP', version: 'v1.0.0', date: 'May 5, 2024' },
  { name: 'OpenContext Swift SDK', language: 'Swift', version: 'v1.0.0', date: 'May 3, 2024' },
  { name: 'OpenContext Kotlin SDK', language: 'Kotlin', version: 'v0.1.0', date: 'May 2, 2024' },
  { name: 'OpenContext Dart SDK', language: 'Dart', version: 'v0.1.0', date: 'Apr 30, 2024' }
];

// Master list of all SDKs
const ALL_SDKS = [
  { id: 1, name: 'OpenContext Python SDK', language: 'Python', version: '1.5.0', type: 'Official', downloads: '6.2K', rating: 4.8, status: 'Active', icon: '🐍', desc: 'Python SDK for building apps and integrations.', compat: 'Python 3.8+' },
  { id: 2, name: 'OpenContext JavaScript SDK', language: 'JavaScript', version: '1.4.0', type: 'Official', downloads: '4.8K', rating: 4.7, status: 'Active', icon: '🌐', desc: 'JavaScript/TypeScript SDK for web applications.', compat: 'Node 16+' },
  { id: 3, name: 'OpenContext Go SDK', language: 'Go', version: '1.2.0', type: 'Official', downloads: '2.8K', rating: 4.6, status: 'Active', icon: '🐹', desc: 'Go SDK for high-performance applications.', compat: 'Go 1.18+' },
  { id: 4, name: 'OpenContext .NET SDK', language: '.NET', version: '1.1.0', type: 'Official', downloads: '2.1K', rating: 4.5, status: 'Active', icon: '🔵', desc: '.NET SDK for enterprise applications.', compat: '.NET 6.0+' },
  { id: 5, name: 'OpenContext Java SDK', language: 'Java', version: '1.3.0', type: 'Official', downloads: '1.7K', rating: 4.6, status: 'Active', icon: '☕', desc: 'Java SDK for enterprise integrations.', compat: 'Java 11+' },
  { id: 6, name: 'OpenContext PHP SDK', language: 'PHP', version: '1.0.0', type: 'Community', downloads: '1.1K', rating: 4.3, status: 'Active', icon: '🐘', desc: 'PHP SDK and Composer package.', compat: 'PHP 8.0+' },
  { id: 7, name: 'OpenContext Rust SDK', language: 'Rust', version: '0.1.0', type: 'Community', downloads: '842', rating: 4.2, status: 'Active', icon: '🦀', desc: 'Rust bindings for OpenContext API.', compat: 'Rust 2021' },
  { id: 8, name: 'OpenContext Swift SDK', language: 'Swift', version: '1.0.0', type: 'Community', downloads: '623', rating: 4.4, status: 'Active', icon: '🦅', desc: 'Swift SDK for iOS/macOS integrations.', compat: 'Swift 5.7+' }
];

const COMMUNITY_SDKS = [
  { id: 11, name: 'OpenContext PHP SDK', language: 'PHP', author: 'DevTeam', version: '1.0.0', downloads: '1.1K', rating: 4.3, status: 'Active', icon: '🐘' },
  { id: 12, name: 'OpenContext Rust SDK', language: 'Rust', author: 'Rustaceans', version: '0.1.0', downloads: '842', rating: 4.2, status: 'Active', icon: '🦀' },
  { id: 13, name: 'OpenContext Swift SDK', language: 'Swift', author: 'iOS Devs', version: '1.0.0', downloads: '623', rating: 4.4, status: 'Active', icon: '🦅' },
  { id: 14, name: 'OpenContext Kotlin SDK', language: 'Kotlin', author: 'KotlinDevs', version: '0.1.0', downloads: '512', rating: 4.1, status: 'Active', icon: '🚀' },
  { id: 15, name: 'OpenContext Ruby SDK', language: 'Ruby', author: 'RubyGuild', version: '0.1.0', downloads: '250', rating: 4.0, status: 'Active', icon: '💎' },
  { id: 16, name: 'OpenContext Elixir SDK', language: 'Elixir', author: 'ElixirLabs', version: '0.1.0', downloads: '150', rating: 4.3, status: 'Active', icon: '🧪' },
  { id: 17, name: 'OpenContext R SDK', language: 'R', author: 'DataWizards', version: '0.1.0', downloads: '98', rating: 4.1, status: 'Active', icon: '📊' }
];

// Frameworks List
const FRAMEWORKS = [
  { name: 'Node.js', type: 'Web Frameworks', sdks: 32, downloads: '8.2K', date: 'May 12, 2024' },
  { name: 'Django', type: 'Backend Frameworks', sdks: 24, downloads: '6.1K', date: 'May 11, 2024' },
  { name: 'FastAPI', type: 'Backend Frameworks', sdks: 18, downloads: '5.8K', date: 'May 10, 2024' },
  { name: 'React Native', type: 'Mobile Frameworks', sdks: 15, downloads: '4.2K', date: 'May 10, 2024' },
  { name: 'Next.js', type: 'Web Frameworks', sdks: 14, downloads: '3.9K', date: 'May 08, 2024' },
  { name: 'Spring Boot', type: 'Backend Frameworks', sdks: 10, downloads: '2.5K', date: 'May 07, 2024' }
];

export default function SDKRegistry() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>SDK Registry</h1>
          <p style={{ marginTop: 4 }}>Discover, download and integrate SDKs for OpenContextPlatform.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>+ Publish SDK</button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 20, overflowX: 'auto' }}>
        {TABS.map(t => (
          <div
            key={t}
            onClick={() => {
              setActiveTab(t);
              setSearch('');
            }}
            style={{
              padding: '10px 18px',
              borderBottom: activeTab === t ? '2px solid #8b5cf6' : '2px solid transparent',
              color: activeTab === t ? '#fff' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* 1. Overview Tab view */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {KPIS.map((kpi, idx) => (
              <div key={idx} className="widget" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: kpi.label.includes('Official') ? '#10b981' : kpi.label.includes('Community') ? '#ef4444' : '#fff'
                }}>
                  {kpi.label === 'Total SDKs' ? '📦' : kpi.label === 'Official SDKs' ? '🛡️' : kpi.label === 'Community SDKs' ? '👥' : kpi.label === 'Downloads' ? '📥' : '🔗'}
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 4 }}>{kpi.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{kpi.value}</div>
                  <div style={{ fontSize: 10, color: kpi.trendUp ? '#10b981' : '#ef4444' }}>
                    {kpi.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* First split row (Downloads line chart & Top SDKs list) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
            {/* Downloads Over Time Chart */}
            <div className="widget" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, margin: 0, fontWeight: 600, color: '#fff' }}>Downloads Over Time</h3>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Daily</span>
              </div>
              {/* Responsive SVG Line Chart */}
              <div style={{ height: 160, width: '100%', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,120 Q62.5,40 125,80 T250,50 T375,100 T500,30 L500,150 L0,150 Z" fill="url(#chart-grad)" />
                  <path d="M0,120 Q62.5,40 125,80 T250,50 T375,100 T500,30" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
                  {/* Grid Lines */}
                  <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                  <line x1="0" y1="10" x2="500" y2="10" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                </svg>
                {/* Labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--text-secondary)' }}>
                  <span>May 12</span>
                  <span>May 19</span>
                  <span>May 26</span>
                  <span>Jun 02</span>
                  <span>Jun 09</span>
                </div>
              </div>
            </div>

            {/* Top SDKs List */}
            <div className="widget" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: 14, margin: 0, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Top SDKs by Downloads</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {TOP_SDKS.map((sdk, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 500 }}>{sdk.name.replace('OpenContext ', '')}</div>
                      <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{sdk.language}</span>
                    </div>
                    <span style={{ fontWeight: 600, color: '#8b5cf6' }}>{sdk.downloads}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second split row (Language donut, Recent release, Active integrations) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 20 }}>
            {/* Language Donut */}
            <div className="widget" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 14, margin: 0, fontWeight: 600, color: '#fff', marginBottom: 14 }}>SDKs by Language</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                <div style={{ width: 80, height: 80, position: 'relative' }}>
                  <svg width="80" height="80" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="47 53" strokeDashoffset="25" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="21 79" strokeDashoffset="-22" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="12 88" strokeDashoffset="-43" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate((-50%, -50%))', textAlign: 'center', fontSize: 10, marginTop: '-12px', marginLeft: '-20px', width: 40 }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 12 }}>68</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 8 }}>Total</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, color: 'var(--text-secondary)', flex: 1 }}>
                  <div>🔵 Python: <strong style={{ color: '#fff' }}>47%</strong></div>
                  <div>🔵 JS: <strong style={{ color: '#fff' }}>21%</strong></div>
                  <div>🔵 Go: <strong style={{ color: '#fff' }}>12%</strong></div>
                </div>
              </div>
            </div>

            {/* Recent SDK Releases */}
            <div className="widget" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: 14, margin: 0, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Recent SDKs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {RECENT_SDKS.map((sdk, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                    <div>
                      <span style={{ color: '#fff', fontWeight: 500 }}>{sdk.name.replace('OpenContext ', '')}</span>
                      <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', marginLeft: 6 }}>{sdk.version}</span>
                    </div>
                    <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{sdk.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Integrations gauge */}
            <div className="widget" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 14, margin: 0, fontWeight: 600, color: '#fff' }}>SDK Integrations</h3>
                <span style={{ fontSize: 11, color: '#3b82f6', cursor: 'pointer' }}>View all</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                <div style={{ width: 80, height: 80, position: 'relative' }}>
                  <svg width="80" height="80" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="77 23" strokeDashoffset="25" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate((-50%, -50%))', textAlign: 'center', fontSize: 10, marginTop: '-12px', marginLeft: '-20px', width: 40 }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 12 }}>132</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 8 }}>Total</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <div>🟢 Active: <strong style={{ color: '#fff' }}>102 (77%)</strong></div>
                  <div>🟡 Inactive: <strong style={{ color: '#fff' }}>20 (15%)</strong></div>
                  <div>🔴 Error: <strong style={{ color: '#fff' }}>10 (8%)</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. All SDKs Tab view */}
      {activeTab === 'All SDKs' && (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search SDKs..."
              style={{
                flex: 1,
                padding: '7px 12px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: '#fff',
                fontSize: 13
              }}
            />
            <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>All Languages</option></select>
            <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>All Categories</option></select>
            <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>Sort: Most Popular</option></select>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {['SDK', 'Language', 'Version', 'Type', 'Downloads', 'Rating', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_SDKS.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase())).map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{s.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{s.name}</span></div></td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{s.language}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>{s.version}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{s.type}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{s.downloads}</td>
                  <td style={{ padding: '14px 16px' }}>⭐ {s.rating}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{s.status}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>✏️ 🗑️</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. Official SDKs Tab (Grid of Cards) */}
      {activeTab === 'Official SDKs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {ALL_SDKS.filter(s => s.type === 'Official').map(s => (
            <div key={s.id} className="widget" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 32, padding: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>{s.icon}</span>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: '0 0 4px 0' }}>{s.name}</h4>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-secondary)' }}>
                    <span>Language: <strong>{s.language}</strong></span>
                    <span>●</span>
                    <span>Version {s.version}</span>
                    <span>●</span>
                    <span>{s.downloads}</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-secondary" onClick={() => showToast(`Opening documentation for ${s.name}`, 'success')} style={{ fontSize: 12, padding: '6px 12px' }}>View SDK</button>
            </div>
          ))}
        </div>
      )}

      {/* 4. Community SDKs Tab view */}
      {activeTab === 'Community SDKs' && (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {['SDK', 'Language', 'Author', 'Version', 'Downloads', 'Rating', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMMUNITY_SDKS.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{s.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{s.name}</span></div></td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{s.language}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{s.author}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>{s.version}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{s.downloads}</td>
                  <td style={{ padding: '14px 16px' }}>⭐ {s.rating}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Languages Tab view */}
      {activeTab === 'Languages' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          {/* Progress Bars */}
          <div className="widget" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: 14, margin: '0 0 16px 0', fontWeight: 600, color: '#fff' }}>All SDKs by Language</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { name: 'Python', pct: 47, color: '#8b5cf6', count: '32 SDKs' },
                { name: 'JavaScript', pct: 21, color: '#3b82f6', count: '14 SDKs' },
                { name: 'Go', pct: 12, color: '#10b981', count: '8 SDKs' },
                { name: 'Java', pct: 9, color: '#f59e0b', count: '6 SDKs' },
                { name: 'Other', pct: 11, color: 'var(--text-secondary)', count: '8 SDKs' }
              ].map(lang => (
                <div key={lang.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{lang.name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{lang.pct}% ({lang.count})</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${lang.pct}%`, height: '100%', background: lang.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="widget" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: 14, margin: '0 0 16px 0', fontWeight: 600, color: '#fff' }}>SDK Support Matrix</h3>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Languages list includes official packages, community bindings, and runtime adapters.
            </p>
          </div>
        </div>
      )}

      {/* 6. Frameworks Tab view */}
      {activeTab === 'Frameworks' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          {/* Framework Table */}
          <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Framework', 'Type', 'SDKs Linked', 'Downloads', 'Last Updated'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FRAMEWORKS.map((f, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px', color: '#fff', fontWeight: 500 }}>{f.name}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{f.type}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-primary)' }}>{f.sdks}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{f.downloads}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{f.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Popular sidebar */}
          <div className="widget" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: 14, margin: '0 0 16px 0', fontWeight: 600, color: '#fff' }}>Popular Frameworks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Node.js', count: '4.1K' },
                { name: 'Django', count: '3.2K' },
                { name: 'FastAPI', count: '3.1K' },
                { name: 'React Native', count: '1.8K' },
                { name: 'Spring Boot', count: '1.7K' }
              ].map(f => (
                <div key={f.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{f.name}</span>
                  <span style={{ fontWeight: 600, color: '#fff' }}>{f.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
