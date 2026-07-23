import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const TABS = ['Overview', 'All Policies', 'Security Policies', 'Data Policies', 'Access Policies', 'Retention Policies'];

const KPIS = [
  { label: 'Total Policies', value: 28, sub: 'All platform policies', trend: '', icon: '🛡️' },
  { label: 'Active', value: 24, sub: 'Currently active', trend: '↑ 20% this month', trendUp: true, icon: '✓', color: '#10b981' },
  { label: 'Draft', value: 3, sub: 'In draft status', trend: '↓ 10% this month', trendUp: false, icon: '✏️', color: '#f59e0b' },
  { label: 'Deprecated', value: 1, sub: 'Marked as deprecated', trend: '', icon: '🗑️', color: '#ef4444' },
  { label: 'Applies To', value: 'Global', sub: 'All organizations & tenants', trend: '', icon: '🌐', color: '#3b82f6' }
];

const POLICIES_DATA = [
  {
    name: 'AI Model Usage Policy',
    category: 'AI Usage',
    status: 'Active',
    scope: 'Global',
    updated: 'May 12, 2024 10:20 AM',
    updatedBy: 'Mukesh Kumar',
    priority: 'High',
    createdOn: 'May 01, 2024 10:30 AM',
    createdBy: 'Mukesh Kumar',
    description: 'Defines the acceptable use of AI models across the platform including allowed models, prohibited use cases, and usage guidelines.',
    rules: 6,
    exceptions: 2,
    enforced: '24/24',
    violations: 3
  },
  {
    name: 'Data Retention Policy',
    category: 'Data',
    status: 'Active',
    scope: 'Global',
    updated: 'May 12, 2024 09:30 AM',
    updatedBy: 'Anjali Verma',
    priority: 'Medium',
    createdOn: 'Apr 28, 2024 09:00 AM',
    createdBy: 'Anjali Verma',
    description: 'Specifies retention periods and schedules for different types of data collected across all organizations.',
    rules: 4,
    exceptions: 0,
    enforced: '24/24',
    violations: 0
  },
  {
    name: 'PII Handling Policy',
    category: 'Data',
    status: 'Active',
    scope: 'Global',
    updated: 'May 11, 2024 08:45 AM',
    updatedBy: 'Rahul Singh',
    priority: 'High',
    createdOn: 'May 02, 2024 11:15 AM',
    createdBy: 'Rahul Singh',
    description: 'Governs the ingestion, anonymization, and storage of Personally Identifiable Information within context files.',
    rules: 8,
    exceptions: 1,
    enforced: '24/24',
    violations: 1
  },
  {
    name: 'User Access Policy',
    category: 'Access',
    status: 'Active',
    scope: 'Global',
    updated: 'May 11, 2024 11:15 PM',
    updatedBy: 'Mukesh Kumar',
    priority: 'Medium',
    createdOn: 'May 03, 2024 02:30 PM',
    createdBy: 'Mukesh Kumar',
    description: 'Mandates authentication protocols and roles mapping required to access platform console features.',
    rules: 5,
    exceptions: 3,
    enforced: '24/24',
    violations: 2
  },
  {
    name: 'API Rate Limit Policy',
    category: 'Security',
    status: 'Active',
    scope: 'Global',
    updated: 'May 11, 2024 10:40 PM',
    updatedBy: 'Priya Sharma',
    priority: 'High',
    createdOn: 'May 04, 2024 09:10 AM',
    createdBy: 'Priya Sharma',
    description: 'Establishes request throttles and rate limits for platform APIs to prevent denial-of-service.',
    rules: 3,
    exceptions: 5,
    enforced: '24/24',
    violations: 14
  },
  {
    name: 'Audit Log Retention Policy',
    category: 'Security',
    status: 'Draft',
    scope: 'Global',
    updated: 'May 11, 2024 06:20 PM',
    updatedBy: 'Anjali Verma',
    priority: 'Low',
    createdOn: 'May 11, 2024 06:20 PM',
    createdBy: 'Anjali Verma',
    description: 'Draft policy laying out requirements for retaining user event logs for compliance and forensics.',
    rules: 2,
    exceptions: 0,
    enforced: '0/24',
    violations: 0
  },
  {
    name: 'Model Approval Policy',
    category: 'AI Usage',
    status: 'Active',
    scope: 'Global',
    updated: 'May 11, 2024 02:30 PM',
    updatedBy: 'Dev Team',
    priority: 'Medium',
    createdOn: 'May 05, 2024 01:20 PM',
    createdBy: 'Dev Team',
    description: 'Defines the review and approval lifecycle before adding any new LLM provider model to the platform.',
    rules: 5,
    exceptions: 1,
    enforced: '24/24',
    violations: 0
  },
  {
    name: 'Data Localization Policy',
    category: 'Data',
    status: 'Deprecated',
    scope: 'Global',
    updated: 'May 10, 2024 07:20 PM',
    updatedBy: 'System',
    priority: 'High',
    createdOn: 'Jan 15, 2024 10:00 AM',
    createdBy: 'System',
    description: 'Restricts storing context metadata outside specific regional boundaries. Deprecated in favor of regional vaults.',
    rules: 4,
    exceptions: 0,
    enforced: '0/24',
    violations: 0
  },
  {
    name: 'Third Party Access Policy',
    category: 'Access',
    status: 'Active',
    scope: 'Global',
    updated: 'May 10, 2024 05:10 PM',
    updatedBy: 'Rahul Singh',
    priority: 'Medium',
    createdOn: 'May 06, 2024 10:30 AM',
    createdBy: 'Rahul Singh',
    description: 'Details authorization rules for external tools and connectors accessing platform metadata.',
    rules: 6,
    exceptions: 2,
    enforced: '24/24',
    violations: 1
  },
  {
    name: 'Password Policy',
    category: 'Security',
    status: 'Active',
    scope: 'Global',
    updated: 'May 10, 2024 04:30 PM',
    updatedBy: 'Priya Sharma',
    priority: 'High',
    createdOn: 'May 06, 2024 08:30 AM',
    createdBy: 'Priya Sharma',
    description: 'Enforces password complexity, expiration cycle, and lockouts across all authenticating systems.',
    rules: 7,
    exceptions: 0,
    enforced: '24/24',
    violations: 0
  }
];

export default function Policies() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState<any>(POLICIES_DATA[0]);
  const [detailTab, setDetailTab] = useState('Overview');
  const { showToast } = useToast();

  const getFilteredPolicies = () => {
    let list = POLICIES_DATA;
    if (activeTab !== 'Overview' && activeTab !== 'All Policies') {
      const catMapping: Record<string, string> = {
        'Security Policies': 'Security',
        'Data Policies': 'Data',
        'Access Policies': 'Access',
        'Retention Policies': 'Retention Policies'
      };
      const filterCat = catMapping[activeTab];
      list = list.filter(p => p.category === filterCat);
    }
    if (search) {
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    return list;
  };

  const filtered = getFilteredPolicies();

  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>Global Policies</h1>
          <p style={{ marginTop: 4 }}>Define and manage platform-wide policies that apply across all organizations and tenants.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => showToast('New policy wizard coming soon!', 'info')} style={{ padding: '8px 16px', fontSize: 13 }}>+ New Policy</button>
          <button className="btn btn-secondary" style={{ padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⋮</button>
        </div>
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
                color: kpi.color || '#fff'
              }}>
                {kpi.icon}
              </div>
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 4 }}>{kpi.label}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{kpi.value}</div>
                <div style={{ fontSize: 10, color: kpi.trendUp ? '#10b981' : kpi.trendUp === false ? '#ef4444' : 'var(--text-secondary)' }}>
                  {kpi.sub} {kpi.trend && `● ${kpi.trend}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Master Detail split layout */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          
          {/* Table List (left side) */}
          <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
            {/* Table Filters */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: 13 }}>🔍</span>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search policies..."
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
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px', height: 32 }}><option>All Status</option></select>
              <button className="btn btn-secondary" style={{ height: 32, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>🎛️ Filters</button>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Policy Name', 'Category', 'Status', 'Scope', 'Last Updated', 'Updated By', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, idx) => (
                  <tr
                    key={idx}
                    onClick={() => setSelectedPolicy(p)}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      background: selectedPolicy?.name === p.name ? 'rgba(139,92,246,0.06)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{
                          padding: 6,
                          borderRadius: 6,
                          background: 'rgba(255,255,255,0.04)',
                          color: p.status === 'Active' ? '#10b981' : p.status === 'Draft' ? '#f59e0b' : '#ef4444',
                          display: 'inline-flex'
                        }}>🔏</span>
                        <span style={{ color: '#fff', fontWeight: 500 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.category}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 4,
                        background: p.status === 'Active' ? 'rgba(16,185,129,0.12)' : p.status === 'Draft' ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                        color: p.status === 'Active' ? '#10b981' : p.status === 'Draft' ? '#f59e0b' : '#ef4444',
                        fontWeight: 500
                      }}>
                        ● {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>🌐 {p.scope}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.updated}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.updatedBy}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={e => e.stopPropagation()}>
                      👁️ ✏️ ⋮
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Showing 1 to {filtered.length} of 28 policies</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {['‹', '1', '2', '3', '4', '›'].map((p, i) => (
                  <button key={i} style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid var(--border-color)', background: p === '1' ? '#8b5cf6' : 'transparent', color: p === '1' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: 11 }}>{p}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Detail Panel */}
          {selectedPolicy && (
            <div className="widget" style={{ width: 380, padding: 0, overflow: 'hidden', flexShrink: 0 }}>
              
              {/* Detail Header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Policy Details</span>
                <span style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setSelectedPolicy(null)}>✕</span>
              </div>

              {/* Identity Banner */}
              <div style={{ padding: 20, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: 'rgba(139, 92, 246, 0.12)',
                  color: '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22
                }}>
                  🛡️
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>{selectedPolicy.name}</h3>
                    <span style={{
                      fontSize: 10,
                      padding: '1px 6px',
                      borderRadius: 4,
                      background: selectedPolicy.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                      color: selectedPolicy.status === 'Active' ? '#10b981' : '#ef4444',
                      fontWeight: 600
                    }}>
                      ● {selectedPolicy.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{selectedPolicy.category} Policy</div>
                </div>
              </div>

              {/* Tabs inside panel */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', padding: '0 20px' }}>
                {['Overview', `Rules (${selectedPolicy.rules})`, 'Applies To (All)', 'History'].map(tb => {
                  const label = tb.split(' ')[0];
                  return (
                    <div
                      key={tb}
                      onClick={() => setDetailTab(label)}
                      style={{
                        padding: '10px 12px',
                        borderBottom: detailTab === label ? '2px solid #8b5cf6' : '2px solid transparent',
                        color: detailTab === label ? '#fff' : 'var(--text-secondary)',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {tb}
                    </div>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div style={{ padding: 20 }}>
                {detailTab === 'Overview' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>Description</div>
                      <p style={{ fontSize: 12, color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
                        {selectedPolicy.description}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        ['Category', selectedPolicy.category],
                        ['Scope', `${selectedPolicy.scope} (All Organizations & Tenants)`],
                        ['Priority', selectedPolicy.priority === 'High' ? '🔴 High' : selectedPolicy.priority === 'Medium' ? '🟡 Medium' : '🟢 Low'],
                        ['Created On', selectedPolicy.createdOn],
                        ['Created By', selectedPolicy.createdBy],
                        ['Last Updated', selectedPolicy.updated],
                        ['Last Updated By', selectedPolicy.updatedBy]
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                          <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                          <span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Policy Summary grid */}
                    <div style={{ marginTop: 8 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 10 }}>Policy Summary</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                        {[
                          { label: 'Rules', val: selectedPolicy.rules, icon: '📋' },
                          { label: 'Exceptions', val: selectedPolicy.exceptions, icon: '⚠️' },
                          { label: 'Enforced', val: selectedPolicy.enforced, sub: 'Organizations', icon: '🛡️', color: '#10b981' },
                          { label: 'Violations (30d)', val: selectedPolicy.violations, icon: '🛑', color: selectedPolicy.violations > 0 ? '#ef4444' : '#fff' }
                        ].map((stat, idx) => (
                          <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: 10, borderRadius: 6 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{stat.label}</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: stat.color || '#fff', marginTop: 2 }}>{stat.val}</div>
                                {stat.sub && <div style={{ fontSize: 8, color: 'var(--text-secondary)' }}>{stat.sub}</div>}
                              </div>
                              <span style={{ fontSize: 16 }}>{stat.icon}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <button className="btn btn-primary" onClick={() => showToast(`Edit wizard for ${selectedPolicy.name} coming soon`, 'info')} style={{ width: '100%', marginTop: 8, padding: '10px' }}>
                      Edit Policy
                    </button>
                  </div>
                )}

                {detailTab !== 'Overview' && (
                  <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 12 }}>
                    {detailTab} data is currently synchronized and audited.
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
}
