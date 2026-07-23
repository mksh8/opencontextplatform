import React from 'react';
import { useToast } from '../../contexts/ToastContext';

const BUDGETS = [
  { name: 'Monthly Spend Budget', scope: 'Platform',     limit: '$20,000', used: '$12,450.00', pct: 63, status: 'On Track' },
  { name: 'Active Org Budget',    scope: 'Organization', limit: '$10,000', used: '$6,200.00',  pct: 62, status: 'On Track' },
  { name: 'Dev Workspace Budget', scope: 'Workspace',    limit: '$1,500',  used: '$1,450.00',  pct: 97, status: 'Critical' },
];

const ALERTS = [
  { name: 'Monthly Spend Alert', scope: 'Platform',   condition: 'Spend > 80% of budget', threshold: '80%', triggered: 'Jun 08, 2024 10:23 AM', status: 'Active' },
  { name: 'Active Org Budget Alert', scope: 'Organization', condition: 'Spend > 90% of budget', threshold: '90%', triggered: 'Jun 05, 2024 02:13 PM', status: 'Active' },
  { name: 'Storage Usage Alert',  scope: 'Platform',   condition: 'Storage > 80% of limit', threshold: '80%', triggered: 'Jun 07, 2024 09:08 AM', status: 'Fired' },
  { name: 'Compute Mount Alert',  scope: 'Workspace',  condition: 'Compute > 90% of budget', threshold: '90%', triggered: 'Jun 09, 2024 11:23 AM', status: 'Active' },
];

export default function BudgetsAlertsTab() {
  const { showToast } = useToast();

  const statusStyle = (s: string): React.CSSProperties => ({
    fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600,
    background: s === 'Critical' || s === 'Fired' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.12)',
    color: s === 'Critical' || s === 'Fired' ? '#ef4444' : '#10b981',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Summary cards */}
      <div style={{ display: 'flex', gap: 14 }}>
        {[
          { label: 'Total Budget', value: '$20,000', sub: 'Annual budget', color: '#8b5cf6' },
          { label: 'Budget Used', value: '63%', sub: '$12,450 / $20,000', color: '#f59e0b' },
          { label: 'Active Subscriptions', value: '3', sub: 'Across all organizations', color: '#10b981' },
        ].map(c => (
          <div key={c.label} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '18px 20px', flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: c.color, marginBottom: 4 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Budgets table */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Budgets</span>
          <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => showToast('New budget coming soon', 'success')}>+ New Budget</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              {['Budget', 'Scope', 'Budget Limit', 'Budget Used', '% Used', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 500, textAlign: 'left', fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BUDGETS.map(b => (
              <tr key={b.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 12px', color: '#fff', fontWeight: 500 }}>{b.name}</td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', fontWeight: 500 }}>{b.scope}</span>
                </td>
                <td style={{ padding: '14px 12px', color: 'var(--text-primary)' }}>{b.limit}</td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 80, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)' }}>
                      <div style={{ height: '100%', width: `${b.pct}%`, borderRadius: 3, background: b.pct > 90 ? '#ef4444' : b.pct > 60 ? '#f59e0b' : '#10b981' }} />
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{b.used}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 12px', fontWeight: 600, color: b.pct > 90 ? '#ef4444' : b.pct > 60 ? '#f59e0b' : '#10b981' }}>{b.pct}%</td>
                <td style={{ padding: '14px 12px' }}><span style={statusStyle(b.status)}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'right', marginTop: 12 }}>
          <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View all budgets →</span>
        </div>
      </div>

      {/* Alerts table */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Alerts</span>
          <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => showToast('New alert policy coming soon', 'success')}>+ New Alert Policy</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              {['Alert Name', 'Scope', 'Condition', 'Threshold', 'Last Triggered', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 500, textAlign: 'left', fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALERTS.map(a => (
              <tr key={a.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 12px', color: '#fff', fontWeight: 500 }}>{a.name}</td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(59,130,246,0.12)', color: '#3b82f6', fontWeight: 500 }}>{a.scope}</span>
                </td>
                <td style={{ padding: '14px 12px', color: 'var(--text-secondary)', fontSize: 12 }}>{a.condition}</td>
                <td style={{ padding: '14px 12px', color: '#fff', fontWeight: 600 }}>{a.threshold}</td>
                <td style={{ padding: '14px 12px', color: 'var(--text-secondary)', fontSize: 12 }}>{a.triggered}</td>
                <td style={{ padding: '14px 12px' }}><span style={statusStyle(a.status)}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
