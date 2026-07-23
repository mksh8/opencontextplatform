import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const INTEGRATIONS = [
  { id: 1, name: 'Slack', sub: 'Communication', category: 'Communication', categoryColor: '#3b82f6', status: 'Connected', lastSynced: 'May 21, 2025 10:12 AM', icon: '💬', iconBg: '#4A154B' },
  { id: 2, name: 'Google Workspace', sub: 'Email, Drive, Calendar', category: 'Productivity', categoryColor: '#10b981', status: 'Connected', lastSynced: 'May 21, 2025 09:45 AM', icon: '📧', iconBg: '#1a73e8' },
  { id: 3, name: 'AWS', sub: 'Cloud Services', category: 'Cloud', categoryColor: '#f59e0b', status: 'Connected', lastSynced: 'May 21, 2025 08:30 AM', icon: '☁️', iconBg: '#232f3e' },
  { id: 4, name: 'GitHub', sub: 'Source Control', category: 'Developer Tools', categoryColor: '#8b5cf6', status: 'Connection Issue', lastSynced: 'May 21, 2025 07:15 AM', icon: '🐱', iconBg: '#24292e' },
  { id: 5, name: 'Datadog', sub: 'Monitoring & Observability', category: 'Monitoring', categoryColor: '#ec4899', status: 'Connected', lastSynced: 'May 20, 2025 11:40 PM', icon: '🐶', iconBg: '#632ca6' },
  { id: 6, name: 'Microsoft Teams', sub: 'Communication', category: 'Communication', categoryColor: '#3b82f6', status: 'Not Connected', lastSynced: '—', icon: '💼', iconBg: '#5059C9' },
  { id: 7, name: 'Zendesk', sub: 'Support', category: 'Support', categoryColor: '#14b8a6', status: 'Not Connected', lastSynced: '—', icon: '🎫', iconBg: '#03363D' },
  { id: 8, name: 'Snowflake', sub: 'Data Warehouse', category: 'Data', categoryColor: '#6366f1', status: 'Not Connected', lastSynced: '—', icon: '❄️', iconBg: '#29b5e8' },
];

const STATUS_COLOR: Record<string, string> = {
  'Connected': '#10b981',
  'Connection Issue': '#f59e0b',
  'Not Connected': 'var(--text-secondary)',
};

export default function Integrations() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('All Integrations');
  const [selected, setSelected] = useState(INTEGRATIONS[0]);
  const [search, setSearch] = useState('');

  const filtered = INTEGRATIONS.filter(i => {
    const matchTab = activeTab === 'All Integrations' || (activeTab === 'Connected' && i.status === 'Connected') || (activeTab === 'Available' && i.status === 'Not Connected');
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sub.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>Integrations</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Connect and manage third-party services and tools with your organization.</div>
        </div>
        <button className="btn btn-primary" style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={() => showToast('Add Integration flow coming soon', 'info')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Integration
        </button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 20 }}>
        {['All Integrations', 'Connected', 'Available'].map(t => (
          <div key={t} onClick={() => setActiveTab(t)} style={{ padding: '10px 18px', borderBottom: activeTab === t ? '2px solid #8b5cf6' : '2px solid transparent', color: activeTab === t ? '#fff' : 'var(--text-secondary)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{t}</div>
        ))}
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 12, top: 10, color: 'var(--text-secondary)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search integrations by name or category..." className="input" style={{ width: '100%', paddingLeft: 36, fontSize: 13 }} />
        </div>
        <select className="input" style={{ width: 160, fontSize: 13 }}><option>All Categories</option><option>Communication</option><option>Productivity</option><option>Cloud</option><option>Developer Tools</option></select>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { value: '12', label: 'Total Integrations', sub: 'Across all categories', icon: '📦', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
          { value: '8', label: 'Connected', sub: 'Active integrations', icon: '✓', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
          { value: '1', label: 'Connection Issues', sub: 'Requires attention', icon: '⚠️', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
          { value: '3', label: 'Not Connected', sub: 'Available to connect', icon: '🔌', color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.05)' },
        ].map((k, i) => (
          <div key={i} className="widget" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: k.bg, color: k.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{k.icon}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: 13, color: '#fff', marginTop: 4, marginBottom: 2 }}>{k.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content (table + details panel) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        
        {/* Integration Table */}
        <div className="widget" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#fff' }}>Your Integrations</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '10px 24px', fontWeight: 500 }}>Integration</th>
                <th style={{ padding: '10px 16px', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '10px 16px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '10px 16px', fontWeight: 500 }}>Last Synced</th>
                <th style={{ padding: '10px 24px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(intg => (
                <tr key={intg.id} onClick={() => setSelected(intg)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: selected.id === intg.id ? 'rgba(139,92,246,0.08)' : 'transparent', transition: 'background 0.15s' }}>
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: intg.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{intg.icon}</div>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 500 }}>{intg.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{intg.sub}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: `${intg.categoryColor}22`, color: intg.categoryColor, padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>{intg.category}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: STATUS_COLOR[intg.status], fontSize: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLOR[intg.status] }}></div>
                      {intg.status}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{intg.lastSynced}</td>
                  <td style={{ padding: '14px 24px', textAlign: 'right' }}>
                    {intg.status === 'Not Connected'
                      ? <button className="btn btn-primary" style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: 11, padding: '4px 12px' }} onClick={e => { e.stopPropagation(); showToast(`Connecting ${intg.name}...`, 'info'); }}>Connect</button>
                      : <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', fontSize: 12, color: 'var(--text-secondary)' }}>
            <span>Showing 1 to {filtered.length} of 12 integrations</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button style={{ width: 28, height: 28, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>&lt;</button>
              <button style={{ width: 28, height: 28, background: '#7c3aed', border: 'none', color: '#fff', borderRadius: 4, cursor: 'pointer' }}>1</button>
              <button style={{ width: 28, height: 28, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>2</button>
              <button style={{ width: 28, height: 28, background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>&gt;</button>
            </div>
          </div>
        </div>

        {/* Integration Details Panel */}
        <div className="widget" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#fff' }}>Integration Details</h3>
          </div>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
            {/* Selected integration header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: selected.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{selected.icon}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{selected.name}</span>
                  <span style={{ background: `${STATUS_COLOR[selected.status]}22`, color: STATUS_COLOR[selected.status], padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500 }}>{selected.status}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selected.sub}</div>
              </div>
            </div>

            {selected.status === 'Connected' || selected.status === 'Connection Issue' ? (
              <>
                {/* Details */}
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
                  Send notifications, alerts and updates to your {selected.name} channels.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 12, borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
                  {[
                    { label: 'Connected Workspace', value: 'Acme Corp Slack', link: true },
                    { label: 'Connected By', value: 'Mukesh Kumar' },
                    { label: 'Connected On', value: 'May 10, 2025 02:30 PM' },
                    { label: 'Permission Scope', value: 'Channels: 3, Users: 25' },
                    { label: 'Webhooks', value: '2 active', link: true },
                  ].map((d, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
                      <span style={{ color: d.link ? '#8b5cf6' : '#fff', cursor: d.link ? 'pointer' : 'default' }}>{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* Sync Information */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 14 }}>Sync Information</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Last Synced</span>
                      <span style={{ color: '#fff' }}>{selected.lastSynced}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Sync Status</span>
                      <span style={{ color: selected.status === 'Connection Issue' ? '#f59e0b' : '#10b981' }}>
                        {selected.status === 'Connection Issue' ? 'Failed' : 'Successful'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Next Sync</span>
                      <span style={{ color: '#fff' }}>May 21, 2025 10:42 AM</span>
                    </div>
                  </div>
                  <button className="btn" style={{ width: '100%', justifyContent: 'center', fontSize: 12, marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}
                    onClick={() => showToast(`Syncing ${selected.name}...`, 'info')}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    Sync Now
                  </button>
                </div>

                {/* Actions */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 14 }}>Actions</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn" style={{ flex: 1, justifyContent: 'center', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                      onClick={() => showToast(`Reconfiguring ${selected.name}...`, 'info')}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                      Reconfigure
                    </button>
                    <button style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#ef4444', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                      onClick={() => showToast(`Disconnecting ${selected.name}...`, 'error')}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      Disconnect
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, color: 'var(--text-secondary)', textAlign: 'center' }}>
                <div style={{ fontSize: 40 }}>{selected.icon}</div>
                <div style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{selected.name}</div>
                <div style={{ fontSize: 12 }}>{selected.sub} integration is not yet connected.</div>
                <button className="btn btn-primary" style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: 13 }}
                  onClick={() => showToast(`Connecting ${selected.name}...`, 'info')}>Connect Now</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
