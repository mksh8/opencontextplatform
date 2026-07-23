import React, { useState } from 'react';

const TABS = ['All Items', 'Agents', 'Templates', 'Connectors', 'Plugins', 'SDKs'];

const ITEMS = [
  { id: 1, name: 'Customer Support Agent', type: 'Agent', category: 'Support', publisher: 'OpenContext', installs: '12.1K', rating: 4.9, status: 'Verified', icon: '🤖', description: 'An advanced AI agent for handling customer queries, ticket routing, and response generation.', version: '1.2.0', published: 'May 11, 2024', updated: 'Jun 10, 2024', tags: ['support', 'customer-service', 'agent', '8+'] },
  { id: 2, name: 'HR Assistant Agent', type: 'Agent', category: 'HR', publisher: 'OpenContext', installs: '4.2K', rating: 4.6, status: 'Verified', icon: '👥', description: 'Streamlines HR processes with intelligent form parsing and employee query resolution.', version: '1.1.0', published: 'Apr 20, 2024', updated: 'May 30, 2024', tags: ['hr', 'assistant', 'automation'] },
  { id: 3, name: 'Data Analysis Template', type: 'Template', category: 'Data', publisher: 'DataWorks', installs: '6.1K', rating: 4.7, status: 'Verified', icon: '📊', description: 'Ready-to-use template for AI-powered data analysis pipelines.', version: '2.0.1', published: 'Mar 15, 2024', updated: 'Jun 01, 2024', tags: ['data', 'analytics', 'template'] },
  { id: 4, name: 'Slack Connector', type: 'Connector', category: 'Communication', publisher: 'OpenContext', installs: '9.8K', rating: 4.8, status: 'Verified', icon: '💬', description: 'Connect your workspace to Slack for real-time notifications and context sync.', version: '3.0.0', published: 'Feb 10, 2024', updated: 'Jun 05, 2024', tags: ['slack', 'communication', 'integration'] },
  { id: 5, name: 'Acme Inc.', type: 'Connector', category: 'Business', publisher: 'Acme Inc.', installs: '2.3K', rating: 4.5, status: 'Verified', icon: '🏢', description: 'Enterprise connector for Acme business data and workflows.', version: '1.0.5', published: 'Jan 05, 2024', updated: 'May 20, 2024', tags: ['enterprise', 'business'] },
  { id: 6, name: 'PostgreSQL Connector', type: 'Connector', category: 'Database', publisher: 'OpenContext', installs: '18.4K', rating: 4.9, status: 'Verified', icon: '🗄️', description: 'High-performance PostgreSQL connector with connection pooling and read replicas.', version: '2.1.0', published: 'Jan 01, 2024', updated: 'Jun 08, 2024', tags: ['postgres', 'database', 'sql'] },
  { id: 7, name: 'PDF Parser Plugin', type: 'Plugin', category: 'Parser', publisher: 'OpenContext', installs: '5.4K', rating: 4.5, status: 'Verified', icon: '📄', description: 'Extract and structure data from PDF documents with OCR support.', version: '1.3.0', published: 'Mar 22, 2024', updated: 'Jun 02, 2024', tags: ['pdf', 'parser', 'ocr'] },
  { id: 8, name: 'Python SDK', type: 'SDK', category: 'Language', publisher: 'OpenContext', installs: '15.2K', rating: 4.8, status: 'Verified', icon: '🐍', description: 'Official Python SDK for building integrations with OpenContextPlatform.', version: '1.5.0', published: 'Feb 01, 2024', updated: 'Jun 10, 2024', tags: ['python', 'sdk', 'official'] },
  { id: 9, name: 'JavaScript SDK', type: 'SDK', category: 'Language', publisher: 'OpenContext', installs: '11.9K', rating: 4.7, status: 'Verified', icon: '🌐', description: 'Official JavaScript/TypeScript SDK for browser and Node.js environments.', version: '1.4.2', published: 'Feb 01, 2024', updated: 'Jun 09, 2024', tags: ['javascript', 'typescript', 'sdk', 'official'] },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: 11 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ color: 'var(--text-secondary)', marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('All Items');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof ITEMS[0] | null>(ITEMS[0]);
  const [installed, setInstalled] = useState<Set<number>>(new Set());

  const filtered = ITEMS.filter(item => {
    if (activeTab !== 'All Items' && !item.type.toLowerCase().startsWith(activeTab.slice(0, -1).toLowerCase())) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-title">
          <h1>Marketplace</h1>
          <p>Discover and install agents, templates, connectors, and extensions.</p>
        </div>
        <button className="btn btn-primary">+ Publish Item</button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 20 }}>
        {TABS.map(t => (
          <div key={t} onClick={() => setActiveTab(t)} style={{ padding: '10px 18px', borderBottom: activeTab === t ? '2px solid #8b5cf6' : '2px solid transparent', color: activeTab === t ? '#fff' : 'var(--text-secondary)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{t}</div>
        ))}
      </div>

      {/* Body: list + detail panel */}
      <div style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
        {/* List */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: 13 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search marketplace..." style={{ width: '100%', padding: '7px 12px 7px 30px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <select style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>All Categories</option></select>
            <select style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>Sort: Popular</option></select>
          </div>

          {/* Table */}
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Name', 'Type', 'Category', 'Publisher', 'Installs', 'Rating', 'Status'].map(h => (
                    <th key={h} style={{ padding: '11px 14px', fontWeight: 500, textAlign: 'left', fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} onClick={() => setSelected(item)} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: selected?.id === item.id ? 'rgba(139,92,246,0.08)' : 'transparent' }}
                    onMouseEnter={e => { if (selected?.id !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    onMouseLeave={e => { if (selected?.id !== item.id) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{item.icon}</span>
                        <span style={{ color: '#fff', fontWeight: 500 }}>{item.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(59,130,246,0.12)', color: '#3b82f6', fontWeight: 500 }}>{item.type}</span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{item.category}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{item.publisher}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{item.installs}</td>
                    <td style={{ padding: '12px 14px' }}><StarRating rating={item.rating} /></td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }}>
              <span>Showing 1 to {filtered.length} of 125 items</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {['‹', '1', '2', '3', '...', '16', '›'].map((p, i) => (
                  <button key={i} style={{ width: 26, height: 26, borderRadius: 4, border: '1px solid var(--border-color)', background: p === '1' ? '#8b5cf6' : 'transparent', color: p === '1' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: 11 }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ width: 300, background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20, flexShrink: 0, overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 30 }}>{selected.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{selected.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{selected.type}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: '#3b82f6' }}>by {selected.publisher}</span>
              <span style={{ fontSize: 11, color: '#10b981' }}>✓ Verified Publisher</span>
            </div>
            <StarRating rating={selected.rating} />
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 14 }}> ({selected.installs} reviews)</div>
            <button
              onClick={() => setInstalled(prev => { const n = new Set(prev); n.has(selected.id) ? n.delete(selected.id) : n.add(selected.id); return n; })}
              className={installed.has(selected.id) ? 'btn' : 'btn btn-primary'}
              style={{ width: '100%', marginBottom: 16, fontSize: 13 }}
            >
              {installed.has(selected.id) ? '✓ Installed' : '⬇ Install'}
            </button>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Details</div>
              {[
                ['Version', selected.version],
                ['Published', selected.published],
                ['Last Updated', selected.updated],
                ['Category', selected.category],
                ['Compatibility', 'v1.0+'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                  <span style={{ color: '#fff' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Description</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selected.description}</p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Tags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selected.tags.map(t => (
                  <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(255,255,255,0.07)', color: 'var(--text-secondary)' }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginTop: 14 }}>
              <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View Documentation →</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
