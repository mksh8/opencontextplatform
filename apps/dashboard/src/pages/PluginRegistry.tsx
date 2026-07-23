import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const TABS = ['All Plugins', 'UI Plugins', 'Workflow Plugins', 'Data Plugins', 'AI Plugins', 'Utilities'];

// Overview KPIs
const KPIS = [
  { label: 'Total Plugins', value: 242, trend: '↗ 18.5% from last month', trendUp: true },
  { label: 'Active', value: 216, trend: '89.3% of total', trendUp: true },
  { label: 'Inactive', value: 18, trend: '7.4% of total', trendUp: false },
  { label: 'Pending Review', value: 8, trend: '3.3% of total', trendUp: false },
  { label: 'Total Installs', value: '12.6K', trend: '↗ 22.1% from last month', trendUp: true }
];

// Sidebar Data
const TOP_CATEGORIES = [
  { name: 'Data Plugins', count: 88 },
  { name: 'AI Plugins', count: 62 },
  { name: 'Workflow Plugins', count: 50 },
  { name: 'Utilities', count: 34 },
  { name: 'UI Plugins', count: 10 }
];

const TOP_AUTHORS = [
  { name: 'OpenContext', count: 72 },
  { name: 'Community', count: 58 },
  { name: 'DataWorks', count: 34 },
  { name: 'Acme Inc.', count: 28 },
  { name: 'DevTeam', count: 18 }
];

// Master List of Plugins
const ALL_PLUGINS = [
  { id: 1, name: 'PDF Parser', category: 'Data Plugins', type: 'Parser', version: '1.3.0', installs: '4.2K', rating: 4.8, reviews: 112, status: 'Active', icon: '📄', description: 'Extract text and structured data from PDF documents with high accuracy.', author: 'OpenContext', releasedOn: 'Jun 05, 2024', capabilities: ['Text Extraction', 'Table Extraction', 'OCR Support'] },
  { id: 2, name: 'Slack Notifier', category: 'Utilities', type: 'Notification', version: '1.2.3', installs: '3.8K', rating: 4.7, reviews: 94, status: 'Active', icon: '💬', description: 'Send automated alerts and notifications to Slack channels.', author: 'Community', releasedOn: 'May 10, 2024', capabilities: ['Channel Posts', 'DMs', 'Block Kit'] },
  { id: 3, name: 'LangChain Integration', category: 'AI Plugins', type: 'Integration', version: '2.1.0', installs: '3.1K', rating: 4.6, reviews: 88, status: 'Active', icon: '🦜', description: 'Integrate LangChain agents and pipelines directly into your workflows.', author: 'OpenContext', releasedOn: 'Jun 01, 2024', capabilities: ['Agent Ingestion', 'Tool Binding', 'Memory Sync'] },
  { id: 4, name: 'Excel Reader', category: 'Data Plugins', type: 'Parser', version: '1.2.0', installs: '2.9K', rating: 4.6, reviews: 76, status: 'Active', icon: '📊', description: 'Parse Excel sheets (xls, xlsx) into JSON structures.', author: 'OpenContext', releasedOn: 'May 20, 2024', capabilities: ['Sheet Parsing', 'Formula Support'] },
  { id: 5, name: 'Webhook Trigger', category: 'Workflow Plugins', type: 'Trigger', version: '1.0.1', installs: '2.8K', rating: 4.5, reviews: 90, status: 'Active', icon: '🔔', description: 'Trigger context workflows based on incoming HTTP webhooks.', author: 'Community', releasedOn: 'Mar 25, 2024', capabilities: ['HTTP Listener', 'Payload Verification'] }
];

// UI Plugins
const UI_PLUGINS = [
  { id: 11, name: 'Chart.js Visualization', type: 'Visualization', version: '1.2.0', status: 'Active', installs: '2.5K', rating: 4.7, reviews: 64, icon: '📈', description: 'Beautiful charts and graphs using Chart.js library.', author: 'OpenContext' },
  { id: 12, name: 'Advanced Table', type: 'Table', version: '1.1.3', status: 'Active', installs: '1.3K', rating: 4.6, reviews: 48, icon: '📋', description: 'Advanced data table with sorting, filtering, and pagination.', author: 'Community' },
  { id: 13, name: 'Code Editor', type: 'Editor', version: '1.0.5', status: 'Active', installs: '1.1K', rating: 4.5, reviews: 32, icon: '📝', description: 'Monaco code editor integration for the platform console.', author: 'OpenContext' },
  { id: 14, name: 'File Explorer', type: 'Files', version: '1.2.1', status: 'Active', installs: '1.3K', rating: 4.6, reviews: 29, icon: '📁', description: 'File explorer component with drag & drop uploading.', author: 'OpenContext' },
  { id: 15, name: 'Form Builder', type: 'Form', version: '1.1.0', status: 'Active', installs: '1.1K', rating: 4.4, reviews: 18, icon: '🛠️', description: 'Drag and drop form builder for custom workflows.', author: 'Community' }
];

// Workflow Plugins
const WORKFLOW_PLUGINS = [
  { id: 21, name: 'Webhook Trigger', type: 'Trigger', version: '1.0.1', status: 'Active', installs: '2.8K', rating: 4.5, reviews: 90, icon: '🔔', description: 'Trigger workflows via webhook calls.', author: 'OpenContext' },
  { id: 22, name: 'Schedule Trigger', type: 'Trigger', version: '1.1.0', status: 'Active', installs: '2.2K', rating: 4.6, reviews: 76, icon: '⏰', description: 'Execute workflows at specific cron intervals.', author: 'OpenContext' },
  { id: 23, name: 'HTTP Request', type: 'Action', version: '1.2.3', status: 'Active', installs: '1.9K', rating: 4.7, reviews: 88, icon: '🌐', description: 'Make HTTP requests inside workflows.', author: 'Community' },
  { id: 24, name: 'Send Email', type: 'Action', version: '1.1.2', status: 'Active', installs: '1.7K', rating: 4.5, reviews: 42, icon: '📧', description: 'Send email notifications from workflows.', author: 'Community' },
  { id: 25, name: 'Delay', type: 'Utility', version: '1.0.1', status: 'Active', installs: '1.4K', rating: 4.3, reviews: 19, icon: '⏱️', description: 'Pause workflow execution for a set time.', author: 'Community' }
];

// Data Plugins
const DATA_PLUGINS = [
  { id: 31, name: 'PDF Parser', type: 'Parser', version: '1.3.0', status: 'Active', installs: '4.2K', rating: 4.8, reviews: 112, icon: '📄', description: 'Extract text and structured data from PDF files.', author: 'OpenContext' },
  { id: 32, name: 'Excel Reader', type: 'Parser', version: '1.2.0', status: 'Active', installs: '2.9K', rating: 4.6, reviews: 76, icon: '📊', description: 'Parse Excel spreadsheet files.', author: 'OpenContext' },
  { id: 33, name: 'CSV Reader', type: 'Parser', version: '2.0.0', status: 'Active', installs: '2.6K', rating: 4.5, reviews: 54, icon: '🗃️', description: 'Parse flat CSV files.', author: 'Community' },
  { id: 34, name: 'JSON Parser', type: 'Parser', version: '2.1.0', status: 'Active', installs: '2.1K', rating: 4.7, reviews: 128, icon: '⚙', description: 'High performance JSON parser with schema validation.', author: 'Community' },
  { id: 35, name: 'XML Parser', type: 'Parser', version: '1.0.6', status: 'Active', installs: '1.6K', rating: 4.4, reviews: 33, icon: '📁', description: 'Parse legacy XML datasets.', author: 'Community' }
];

// AI Plugins
const AI_PLUGINS = [
  { id: 41, name: 'LangChain Integration', type: 'Integration', version: '2.1.0', status: 'Active', installs: '3.1K', rating: 4.6, reviews: 88, icon: '🦜', description: 'Integrate LangChain agents and pipelines.', author: 'OpenContext' },
  { id: 42, name: 'OpenAI Connector', type: 'LLM', version: '1.3.3', status: 'Active', installs: '2.8K', rating: 4.8, reviews: 216, icon: '🧠', description: 'Seamlessly integrate OpenAI models into your workflows.', author: 'OpenContext' },
  { id: 43, name: 'Hugging Face Inference', type: 'Model', version: '1.2.1', status: 'Active', installs: '2.3K', rating: 4.5, reviews: 92, icon: '🤗', description: 'Run Hugging Face models.', author: 'Community' },
  { id: 44, name: 'Sentence Transformer', type: 'Embedding', version: '1.1.0', status: 'Active', installs: '1.9K', rating: 4.6, reviews: 62, icon: '🧬', description: 'Generate text embedding vectors.', author: 'Community' },
  { id: 45, name: 'Vector Search', type: 'Search', version: '1.0.8', status: 'Active', installs: '1.4K', rating: 4.4, reviews: 31, icon: '🔍', description: 'Vector search using semantic indexing.', author: 'OpenContext' }
];

// Utilities Plugins
const UTILITIES_PLUGINS = [
  { id: 51, name: 'Slack Notifier', type: 'Notification', version: '1.2.3', status: 'Active', installs: '3.8K', rating: 4.7, reviews: 94, icon: '💬', description: 'Send messages to Slack channels.', author: 'Community' },
  { id: 52, name: 'Email Sender', type: 'Notification', version: '1.1.1', status: 'Active', installs: '2.5K', rating: 4.6, reviews: 76, icon: '📧', description: 'SMTP action node for email alerts.', author: 'Community' },
  { id: 53, name: 'Logger', type: 'Logging', version: '1.0.9', status: 'Active', installs: '2.0K', rating: 4.5, reviews: 52, icon: '🗒️', description: 'Structured logger with file rotation.', author: 'Community' },
  { id: 54, name: 'Cache Manager', type: 'Cache', version: '1.1.0', status: 'Active', installs: '1.8K', rating: 4.6, reviews: 40, icon: '💾', description: 'Redis and in-memory caching.', author: 'Community' },
  { id: 55, name: 'Config Manager', type: 'Config', version: '1.0.7', status: 'Active', installs: '1.4K', rating: 4.4, reviews: 26, icon: '⚙️', description: 'Centralized config properties.', author: 'Community' }
];

export default function PluginRegistry() {
  const [activeTab, setActiveTab] = useState('All Plugins');
  const [search, setSearch] = useState('');
  const [selectedPlugin, setSelectedPlugin] = useState<any>(null);
  const [installedPlugins, setInstalledPlugins] = useState<Set<number>>(new Set());
  const { showToast } = useToast();

  const handleInstallToggle = (id: number, name: string) => {
    const isInst = installedPlugins.has(id);
    setInstalledPlugins(prev => {
      const next = new Set(prev);
      isInst ? next.delete(id) : next.add(id);
      return next;
    });
    showToast(isInst ? `Uninstalled ${name}` : `Installed ${name} successfully`, 'success');
  };

  // Get active list based on selected tab
  const getTabList = () => {
    switch (activeTab) {
      case 'UI Plugins': return UI_PLUGINS;
      case 'Workflow Plugins': return WORKFLOW_PLUGINS;
      case 'Data Plugins': return DATA_PLUGINS;
      case 'AI Plugins': return AI_PLUGINS;
      case 'Utilities': return UTILITIES_PLUGINS;
      default: return ALL_PLUGINS;
    }
  };

  const currentList = getTabList().filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  // Auto-select first item in list for detail panel if none selected
  const activeDetail = selectedPlugin || currentList[0];

  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>Plugin Registry</h1>
          <p style={{ marginTop: 4 }}>Extend platform capabilities with plugins.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>+ New Plugin</button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 20, overflowX: 'auto' }}>
        {TABS.map(t => (
          <div
            key={t}
            onClick={() => {
              setActiveTab(t);
              setSearch('');
              setSelectedPlugin(null);
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

      {/* 1. All Plugins Tab (Table + KPIs + Sidebars) */}
      {activeTab === 'All Plugins' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* KPIs */}
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
                  color: kpi.label === 'Active' ? '#10b981' : kpi.label === 'Inactive' ? '#ef4444' : '#fff'
                }}>
                  {kpi.label === 'Total Plugins' ? '🔌' : kpi.label === 'Active' ? '✓' : kpi.label === 'Inactive' ? '⏸' : kpi.label === 'Pending Review' ? '⏳' : '📥'}
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 4 }}>{kpi.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{kpi.value}</div>
                  <div style={{ fontSize: 11, color: kpi.trendUp ? '#10b981' : '#ef4444' }}>
                    {kpi.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table List & Sidebar Split */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12 }}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search plugins..."
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
                <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>All Categories</option></select>
                <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>Sort: Most Popular</option></select>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    {['Plugin', 'Category', 'Type', 'Version', 'Installs', 'Rating', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentList.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{p.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{p.name}</span></div></td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.category}</td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.type}</td>
                      <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>{p.version}</td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.installs}</td>
                      <td style={{ padding: '14px 16px' }}>⭐ {p.rating}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{p.status}</span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>✏️ 🗑️</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Showing 1 to {currentList.length} of 242 plugins</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['‹', '1', '2', '3', '...', '25', '›'].map((p, i) => (
                    <button key={i} style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid var(--border-color)', background: p === '1' ? '#8b5cf6' : 'transparent', color: p === '1' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: 11 }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 20, flexShrink: 0 }}>
              <div className="widget" style={{ padding: '16px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Top Categories</div>
                {TOP_CATEGORIES.map((cat, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{cat.count}</span>
                  </div>
                ))}
              </div>

              <div className="widget" style={{ padding: '16px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Top Authors</div>
                {TOP_AUTHORS.map((auth, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{auth.name}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{auth.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Category Tabs (UI Plugins, Workflow Plugins, Data Plugins, AI Plugins, Utilities) */}
      {activeTab !== 'All Plugins' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Left Cards List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="widget" style={{ padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: 13 }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={`Search ${activeTab.toLowerCase()}...`}
                  style={{
                    width: '100%',
                    padding: '7px 12px 7px 34px',
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    color: '#fff',
                    fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px', height: 32 }}><option>All Categories</option></select>
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px', height: 32 }}><option>Sort: Most Popular</option></select>
              <button className="btn btn-secondary" style={{ height: 32, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>🎛️ Filters</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {currentList.map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlugin(p)}
                  className="widget"
                  style={{
                    padding: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    background: activeDetail?.id === p.id ? 'rgba(139,92,246,0.08)' : 'var(--bg-panel)',
                    border: activeDetail?.id === p.id ? '1px solid rgba(139,92,246,0.4)' : '1px solid var(--border-color)',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 28, padding: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>{p.icon}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: 0 }}>{p.name}</h4>
                        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>by {p.author}</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 8px 0', lineHeight: 1.5 }}>{p.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--text-secondary)' }}>
                        <span>Version {p.version}</span>
                        <span>●</span>
                        <span>{p.installs} installs</span>
                        <span>●</span>
                        <span>⭐ {p.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => handleInstallToggle(p.id, p.name)}
                      className={installedPlugins.has(p.id) ? 'btn btn-secondary' : 'btn btn-primary'}
                      style={{ padding: '6px 14px', fontSize: 12 }}
                    >
                      {installedPlugins.has(p.id) ? '✓ Installed' : '➕ Install'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Detail Panel */}
          {activeDetail && (
            <div className="widget" style={{ width: 310, padding: 20, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 32, padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>{activeDetail.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 4 }}>{activeDetail.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{activeTab.slice(0, -1)} / {activeDetail.type}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500, marginTop: 6 }}>
                    ● Active
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <button className="btn btn-primary" onClick={() => handleInstallToggle(activeDetail.id, activeDetail.name)} style={{ flex: 1, padding: '7px 12px', fontSize: 12 }}>
                  {installedPlugins.has(activeDetail.id) ? '✓ Installed' : 'View Details'}
                </button>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>
                {activeDetail.description || 'High performance plugin engine with seamless workflows support.'}
              </p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Configuration</div>
                {[
                  ['Category', activeDetail.type],
                  ['Downloads', activeDetail.installs],
                  ['Added By', activeDetail.author],
                  ['Rating', `⭐ ${activeDetail.rating} (${activeDetail.reviews || '48'})`]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
                <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>View Documentation →</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
