import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const TABS = ['All Items', 'Agents', 'Templates', 'Connectors', 'Plugins', 'SDKs'];

// 1. All Items Data
const CATEGORY_STATS = [
  { name: 'Agents', count: 245, desc: 'Intelligent AI agents', icon: '🤖' },
  { name: 'Templates', count: 128, desc: 'Workflow & project templates', icon: '📋' },
  { name: 'Connectors', count: 186, desc: 'Data & service connectors', icon: '🔌' },
  { name: 'Plugins', count: 242, desc: 'Extend platform capabilities', icon: '🧩' },
  { name: 'SDKs', count: 64, desc: 'Development SDKs', icon: '💻' }
];

const TOP_PICKS = [
  { id: '1', name: 'Document Q&A Agent', publisher: 'OpenContext', rating: '4.8 (312)', icon: '🤖', type: 'Agent', color: '#8b5cf6' },
  { id: '2', name: 'RAG Pipeline Template', publisher: 'DataWorks', rating: '4.7 (189)', icon: '📋', type: 'Template', color: '#3b82f6' },
  { id: '3', name: 'PostgreSQL Connector', publisher: 'Community', rating: '4.6 (156)', icon: '🐘', type: 'Connector', color: '#10b981' },
  { id: '4', name: 'PDF Parser Plugin', publisher: 'OpenContext', rating: '4.5 (112)', icon: '📄', type: 'Plugin', color: '#ef4444' },
  { id: '5', name: 'Python SDK', publisher: 'OpenContext', rating: '4.8 (312)', icon: '🐍', type: 'SDK', color: '#f59e0b' }
];

// 2. Tab listings data
const AGENTS = [
  { id: 1, name: 'Customer Support Agent', publisher: 'OpenContext', rating: 4.8, reviews: 312, installs: '12.5K', desc: 'AI agent for handling customer queries, ticket routing, and response generation.', tags: ['Customer Support', 'LLM', 'RAG'], price: 'Free', icon: '🤖' },
  { id: 2, name: 'Data Analyst Agent', publisher: 'DataWorks', rating: 4.7, reviews: 189, installs: '9.8K', desc: 'Agent for performing data cleaning, SQL generation and visualization.', tags: ['Data Analysis', 'Pandas', 'Visualization'], price: 'Free', icon: '📊' },
  { id: 3, name: 'Research Assistant Agent', publisher: 'Community', rating: 4.6, reviews: 156, installs: '7.6K', desc: 'Web-research, summarization and source citation.', tags: ['Research', 'Web Search', 'Summarization'], price: 'Free', icon: '🔎' },
  { id: 4, name: 'SQL Query Agent', publisher: 'OpenContext', rating: 4.6, reviews: 143, installs: '6.1K', desc: 'Generate and execute SQL queries from natural language.', tags: ['Database', 'SQL', 'NL2SQL'], price: 'Free', icon: '🗄️' }
];

const TEMPLATES = [
  { id: 1, name: 'RAG Application Template', publisher: 'DataWorks', rating: 4.8, reviews: 152, installs: '10.2K', desc: 'End-to-end RAG application with document ingestion, chunking, and retrieval.', tags: ['RAG', 'Vector DB', 'LLM'], price: 'Free', icon: '📋' },
  { id: 2, name: 'Chatbot Workflow Template', publisher: 'OpenContext', rating: 4.7, reviews: 128, installs: '9.1K', desc: 'Build a production-ready chatbot with memory and tools.', tags: ['Chatbot', 'Memory', 'Tools'], price: 'Free', icon: '💬' },
  { id: 3, name: 'ETL Pipeline Template', publisher: 'Community', rating: 4.6, reviews: 184, installs: '8.7K', desc: 'Extract, transform and load data from multiple sources.', tags: ['ETL', 'Data Pipeline', 'Batch'], price: 'Free', icon: '⚙️' },
  { id: 4, name: 'Data Quality Monitoring Template', publisher: 'DataWorks', rating: 4.6, reviews: 98, installs: '5.4K', desc: 'Monitor data quality and get alerts on anomalies.', tags: ['Data Quality', 'Monitoring', 'Alerts'], price: 'Free', icon: '📈' }
];

const CONNECTORS = [
  { id: 1, name: 'Amazon S3', publisher: 'OpenContext', rating: 4.8, reviews: 256, installs: '18.5K', desc: 'Connect to Amazon S3 to store and retrieve files.', tags: ['Storage', 'AWS'], price: 'Free', icon: '🪣' },
  { id: 2, name: 'Snowflake', publisher: 'Community', rating: 4.7, reviews: 143, installs: '13.4K', desc: 'Connect to Snowflake data warehouse.', tags: ['Database', 'Cloud'], price: 'Free', icon: '❄️' },
  { id: 3, name: 'PostgreSQL', publisher: 'OpenContext', rating: 4.6, reviews: 198, installs: '11.3K', desc: 'Connect to PostgreSQL database.', tags: ['Database', 'SQL'], price: 'Free', icon: '🐘' },
  { id: 4, name: 'Google BigQuery', publisher: 'Community', rating: 4.5, reviews: 112, installs: '8.8K', desc: 'Connect to Google BigQuery.', tags: ['Database', 'Google Cloud'], price: 'Free', icon: '🔵' }
];

const PLUGINS = [
  { id: 1, name: 'PDF Parser Plugin', publisher: 'OpenContext', rating: 4.8, reviews: 112, installs: '10.1K', desc: 'Extract text and structured data from PDF documents.', tags: ['Parser', 'PDF', 'OCR'], price: 'Free', icon: '📄' },
  { id: 2, name: 'Slack Notifier Plugin', publisher: 'Community', rating: 4.7, reviews: 94, installs: '8.4K', desc: 'Send notifications to Slack channels.', tags: ['Notification', 'Slack'], price: 'Free', icon: '💬' },
  { id: 3, name: 'Email Sender Plugin', publisher: 'Community', rating: 4.6, reviews: 76, installs: '7.3K', desc: 'Send emails from workflows and agents.', tags: ['Email', 'Notification'], price: 'Free', icon: '📧' },
  { id: 4, name: 'Web Search Plugin', publisher: 'OpenContext', rating: 4.5, reviews: 88, installs: '6.5K', desc: 'Search the web and return relevant results.', tags: ['Search', 'Web'], price: 'Free', icon: '🌐' }
];

const SDKS = [
  { id: 1, name: 'OpenContext Python SDK', publisher: 'OpenContext', rating: 4.8, reviews: 312, downloads: '25.8K', desc: 'Python SDK for building apps and integrations.', tags: ['Python', 'SDK'], price: 'Free', icon: '🐍' },
  { id: 2, name: 'OpenContext JavaScript SDK', publisher: 'OpenContext', rating: 4.7, reviews: 245, downloads: '18.3K', desc: 'JavaScript/TypeScript SDK for web applications.', tags: ['JavaScript', 'SDK'], price: 'Free', icon: '🌐' },
  { id: 3, name: 'OpenContext Go SDK', publisher: 'OpenContext', rating: 4.6, reviews: 92, downloads: '8.1K', desc: 'Go SDK for high-performance applications.', tags: ['Go', 'SDK'], price: 'Free', icon: '🐹' },
  { id: 4, name: 'OpenContext .NET SDK', publisher: 'OpenContext', rating: 4.5, reviews: 64, downloads: '5.2K', desc: '.NET SDK for enterprise applications.', tags: ['.NET', 'SDK'], price: 'Free', icon: '🔵' }
];

// Sidebar Widget lists
const AGENT_CATEGORIES = [
  { name: 'All Categories', count: 245 },
  { name: 'Customer Support', count: 48 },
  { name: 'Data Analysis', count: 42 },
  { name: 'Productivity', count: 35 },
  { name: 'Research', count: 31 },
  { name: 'Marketing', count: 28 },
  { name: 'Development', count: 22 },
  { name: 'Finance', count: 19 },
  { name: 'HR', count: 16 }
];

const TEMPLATE_CATEGORIES = [
  { name: 'All Categories', count: 128 },
  { name: 'Data Engineering', count: 38 },
  { name: 'AI/ML', count: 32 },
  { name: 'Chatbots', count: 24 },
  { name: 'Analytics', count: 18 },
  { name: 'Automation', count: 10 },
  { name: 'DevOps', count: 6 }
];

const CONNECTOR_CATEGORIES = [
  { name: 'All Categories', count: 186 },
  { name: 'Databases', count: 64 },
  { name: 'Storage', count: 48 },
  { name: 'Messaging', count: 28 },
  { name: 'Cloud Services', count: 16 },
  { name: 'Others', count: 8 }
];

const PLUGIN_CATEGORIES = [
  { name: 'All Categories', count: 242 },
  { name: 'Data', count: 88 },
  { name: 'Productivity', count: 64 },
  { name: 'Communication', count: 42 },
  { name: 'Utilities', count: 28 },
  { name: 'Security', count: 12 }
];

const SDK_LANGUAGES = [
  { name: 'All Languages', count: 64 },
  { name: 'Python', count: 18 },
  { name: 'JavaScript', count: 12 },
  { name: '.NET', count: 10 },
  { name: 'Go', count: 8 },
  { name: 'Java', count: 6 },
  { name: 'Others', count: 10 }
];

const TOP_AUTHORS = [
  { name: 'OpenContext', count: 56 },
  { name: 'DataWorks', count: 42 },
  { name: 'Community', count: 38 },
  { name: 'Acme Inc.', count: 28 },
  { name: 'DevTeam', count: 18 }
];

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('All Items');
  const [search, setSearch] = useState('');
  const [installedItems, setInstalledItems] = useState<Set<string>>(new Set());
  const { showToast } = useToast();

  const handleInstallToggle = (id: string, name: string) => {
    const isInst = installedItems.has(id);
    setInstalledItems(prev => {
      const next = new Set(prev);
      isInst ? next.delete(id) : next.add(id);
      return next;
    });
    showToast(isInst ? `Uninstalled ${name}` : `Installed ${name} successfully`, 'success');
  };

  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>Marketplace</h1>
          <p style={{ marginTop: 4 }}>Discover, install and manage agents, templates, connectors, plugins and SDKs.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>+ Publish Item</button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 20 }}>
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
              transition: 'all 0.2s'
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* RENDER ACTIVE TAB */}

      {/* 1. All Items Tab */}
      {activeTab === 'All Items' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Hero Banner Card */}
          <div className="widget" style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 16
          }}>
            <div style={{ maxWidth: '55%', zIndex: 1 }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>Build Faster with the Marketplace</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                Explore high-quality assets from the community and install with one click.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-primary" onClick={() => setActiveTab('Agents')} style={{ padding: '10px 20px', fontSize: 13 }}>Explore Now</button>
                <button className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: 13 }}>Learn More</button>
              </div>
            </div>
            
            {/* Geometric SVG Art for background */}
            <div style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)', opacity: 0.8, pointerEvents: 'none' }}>
              <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
                <circle cx="110" cy="90" r="70" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1.5" />
                <rect x="50" y="30" width="120" height="120" rx="16" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" />
                <path d="M110 50 L150 110 L70 110 Z" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" />
                <circle cx="110" cy="90" r="10" fill="#8b5cf6" />
                <circle cx="50" cy="30" r="6" fill="#3b82f6" />
                <circle cx="170" cy="150" r="6" fill="#10b981" />
              </svg>
            </div>
          </div>

          {/* Popular Categories Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {CATEGORY_STATS.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab(cat.name)}
                style={{
                  padding: '16px',
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(139,92,246,0.4)'}
                onMouseLeave={e => e.currentTarget.style.border = '1px solid var(--border-color)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 20 }}>{cat.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{cat.count}</span>
                </div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 13, marginBottom: 4 }}>{cat.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{cat.desc}</div>
              </div>
            ))}
          </div>

          {/* Top Picks Section */}
          <div className="widget" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ fontSize: 15, margin: 0, fontWeight: 600, color: '#fff' }}>Top Picks</h2>
              <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View all</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
              {TOP_PICKS.map(item => (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.type === 'SDK' ? 'SDKs' : item.type + 's')}
                  style={{
                    padding: '16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 12,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <span style={{ fontSize: 24, padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>{item.icon}</span>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: `${item.color}20`, color: item.color, fontWeight: 600 }}>{item.type}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: 13, marginBottom: 2, height: 36, overflow: 'hidden' }}>{item.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 6 }}>by {item.publisher}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#f59e0b' }}>★</span> {item.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. List Tabs (Agents, Templates, Connectors, Plugins, SDKs) */}
      {activeTab !== 'All Items' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          
          {/* Left Column: Listings */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Filters Row */}
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
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px', height: 32 }}>
                <option>All Categories</option>
              </select>
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px', height: 32 }}>
                <option>Sort: Most Popular</option>
              </select>
              <button className="btn btn-secondary" style={{ height: 32, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <span>🎛️</span> Filters
              </button>
            </div>

            {/* Vertical List of Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Fetch appropriate mock list */}
              {(activeTab === 'Agents' ? AGENTS :
                activeTab === 'Templates' ? TEMPLATES :
                activeTab === 'Connectors' ? CONNECTORS :
                activeTab === 'Plugins' ? PLUGINS : SDKS)
                .filter(item => !search || item.name.toLowerCase().includes(search.toLowerCase()))
                .map(item => (
                  <div
                    key={item.id}
                    className="widget"
                    style={{
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 20
                    }}
                  >
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flex: 1 }}>
                      <span style={{ fontSize: 32, padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 12, display: 'inline-flex' }}>
                        {item.icon}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>{item.name}</h3>
                          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>by {item.publisher}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ color: '#f59e0b' }}>★</span>
                            <strong style={{ color: '#fff' }}>{item.rating}</strong>
                            <span>({item.reviews || '256'})</span>
                          </span>
                          <span>●</span>
                          <span>{('installs' in item) ? `${item.installs} installs` : `${item.downloads} downloads`}</span>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {item.tags.map(t => (
                            <span key={t} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Price & Button Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, minWidth: 100 }}>
                      <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>{item.price || 'Free'}</span>
                      {activeTab === 'SDKs' ? (
                        <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: 12 }}>View</button>
                      ) : activeTab === 'Templates' ? (
                        <button className="btn btn-primary" onClick={() => showToast(`Used template: ${item.name}`, 'success')} style={{ padding: '6px 14px', fontSize: 12 }}>Use Template</button>
                      ) : (
                        <button
                          onClick={() => handleInstallToggle(`${activeTab}-${item.id}`, item.name)}
                          className={installedItems.has(`${activeTab}-${item.id}`) ? 'btn btn-secondary' : 'btn btn-primary'}
                          style={{ padding: '6px 14px', fontSize: 12 }}
                        >
                          {installedItems.has(`${activeTab}-${item.id}`) ? '✓ Installed' : '➕ Install'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
              <span>Showing 1 to 4 of 245 items</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {['‹', '1', '2', '3', '...', '25', '›'].map((p, i) => (
                  <button
                    key={i}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 4,
                      border: '1px solid var(--border-color)',
                      background: p === '1' ? '#8b5cf6' : 'transparent',
                      color: p === '1' ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 11
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Categories & Authors widgets */}
          <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 20, flexShrink: 0 }}>
            {/* Categories list */}
            <div className="widget" style={{ padding: '16px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Categories</div>
              {(activeTab === 'Agents' ? AGENT_CATEGORIES :
                activeTab === 'Templates' ? TEMPLATE_CATEGORIES :
                activeTab === 'Connectors' ? CONNECTOR_CATEGORIES :
                activeTab === 'Plugins' ? PLUGIN_CATEGORIES : SDK_LANGUAGES)
                .map((cat, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 12, cursor: 'pointer' }}>
                    <span style={{ color: idx === 0 ? '#fff' : 'var(--text-secondary)', fontWeight: idx === 0 ? 600 : 400 }}>{cat.name}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{cat.count}</span>
                  </div>
                ))}
            </div>

            {/* Authors list */}
            <div className="widget" style={{ padding: '16px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Top Authors</div>
              {TOP_AUTHORS.map((auth, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 12, cursor: 'pointer' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{auth.name}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{auth.count}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 12, paddingTop: 10, fontSize: 11, color: '#3b82f6', cursor: 'pointer' }}>
                View all authors →
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
