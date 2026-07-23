import React from 'react';
import { useToast } from '../../contexts/ToastContext';

const statusBadge = (s: string) => (
  <span style={{
    fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600,
    background: s === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
    color: s === 'Active' ? '#10b981' : '#ef4444',
  }}>{s}</span>
);

const CURRENT_SUBS = [
  { org: 'Acme Corporation', plan: 'Enterprise Plan', billing: 'Enterprise', cycle: 'Monthly', amount: '$5,000.00', status: 'Active', next: 'Jul 12, 2024' },
  { org: 'Acme Corporation', plan: 'Developer Plan', billing: 'Developer', cycle: 'Monthly', amount: '$1,500.00', status: 'Active', next: 'Jul 12, 2024' },
  { org: 'Test Plan', plan: 'Test Plan', billing: 'Internal / IBO', cycle: 'Monthly', amount: '$0.00', status: 'Active', next: 'Jul 12, 2024' },
];

const ADDON_SUBS = [
  { org: 'Acme Corporation', sub: 'Additional Storage 2 TB', cycle: 'Monthly', amount: '$200.00', status: 'Active' },
  { org: 'Acme Corporation', sub: 'Premium Support', cycle: 'Monthly', amount: '$500.00', status: 'Active' },
  { org: 'Data Organization', sub: 'Extra Compute (5GB)', cycle: 'Monthly', amount: '$150.00', status: 'Active' },
];

export default function SubscriptionsTab() {
  const { showToast } = useToast();
  const tdStyle: React.CSSProperties = { padding: '12px', color: 'var(--text-primary)', fontSize: 13 };
  const thStyle: React.CSSProperties = { padding: '10px 12px', fontWeight: 500, textAlign: 'left', color: 'var(--text-secondary)', fontSize: 12 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Current Subscriptions */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Current Subscriptions</span>
          <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => showToast('New subscription coming soon', 'success')}>+ New Subscription</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              {['Organization', 'Plan', 'Billing Cycle', 'Amount', 'Status', 'Next Billing'].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CURRENT_SUBS.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={tdStyle}>{s.org}</td>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 500 }}>{s.plan}</td>
                <td style={tdStyle}>{s.cycle}</td>
                <td style={{ ...tdStyle, fontWeight: 600, color: '#fff' }}>{s.amount}</td>
                <td style={tdStyle}>{statusBadge(s.status)}</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>{s.next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add-on Subscriptions */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Add-on Subscriptions</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              {['Organization', 'Subscription', 'Billing Cycle', 'Amount', 'Status'].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ADDON_SUBS.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={tdStyle}>{s.org}</td>
                <td style={{ ...tdStyle, color: '#fff', fontWeight: 500 }}>{s.sub}</td>
                <td style={tdStyle}>{s.cycle}</td>
                <td style={{ ...tdStyle, fontWeight: 600, color: '#fff' }}>{s.amount}</td>
                <td style={tdStyle}>{statusBadge(s.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
