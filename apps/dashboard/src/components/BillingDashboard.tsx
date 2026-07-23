import React, { useState } from 'react';

// ── Reusable mini-components ──────────────────────────────────────────────

function StatCard({ icon, label, value, sub, subColor = '#10b981', donut }: any) {
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
      borderRadius: 10, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, flex: 1,
    }}>
      {donut ? (
        <div style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
          <svg width="52" height="52" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="5" />
            <circle cx="26" cy="26" r="20" fill="none" stroke="#8b5cf6" strokeWidth="5"
              strokeDasharray={`${donut * 1.257} 125.7`} strokeLinecap="round"
              transform="rotate(-90 26 26)" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
            {donut}%
          </div>
        </div>
      ) : (
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(139,92,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>
          {icon}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: subColor, marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
}

function ProgressBar({ label, used, total, usedLabel, totalLabel, color }: any) {
  const pct = Math.round((used / total) * 100);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
        <span style={{ color: '#fff', fontWeight: 500 }}>{label}</span>
        <span style={{ color: 'var(--text-secondary)' }}>{usedLabel} / {totalLabel}
          <span style={{ marginLeft: 8, color: color, fontWeight: 600 }}>{pct}%</span>
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)' }}>
        <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: color, transition: 'width 0.4s' }} />
      </div>
    </div>
  );
}

// ── Spend chart (pure SVG) ────────────────────────────────────────────────
const CHART_POINTS = [80, 120, 95, 140, 110, 160, 130, 180, 150, 200, 170, 220, 190, 170, 210, 185, 230, 200, 175, 220, 195, 240, 210, 185, 200, 220, 195, 175, 210, 230];
const W = 460; const H = 140; const PAD_X = 0; const PAD_Y = 8;
const MAX = Math.max(...CHART_POINTS) + 20;
const toX = (i: number) => PAD_X + (i / (CHART_POINTS.length - 1)) * (W - PAD_X * 2);
const toY = (v: number) => H - PAD_Y - ((v / MAX) * (H - PAD_Y * 2));

function SpendChart() {
  const linePath = CHART_POINTS.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
  const areaPath = linePath + ` L${toX(CHART_POINTS.length - 1)},${H} L${toX(0)},${H} Z`;
  const xLabels = ['May 12', 'May 17', 'May 22', 'May 27', 'Jun 01', 'Jun 06', 'Jun 11'];

  return (
    <div style={{ position: 'relative' }}>
      {/* Y-axis labels */}
      <div style={{ position: 'absolute', left: -36, top: 0, bottom: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-secondary)' }}>
        {['$2,000', '$1,500', '$1,000', '$500', '$0'].map(l => <span key={l}>{l}</span>)}
      </div>
      <svg width="100%" height={H + 20} viewBox={`0 0 ${W} ${H + 20}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1={0} y1={PAD_Y + t * (H - PAD_Y * 2)} x2={W} y2={PAD_Y + t * (H - PAD_Y * 2)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        <path d={areaPath} fill="url(#spendGrad)" />
        <path d={linePath} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      {/* X-axis labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-secondary)', marginTop: 4 }}>
        {xLabels.map(l => <span key={l}>{l}</span>)}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export default function BillingDashboard() {
  const COST_DRIVERS = [
    { name: 'AI Model Usage', icon: '🤖', amount: '$5,420.00', pct: 43.6, color: '#8b5cf6', bar: 44 },
    { name: 'Storage',        icon: '💾', amount: '$2,860.00', pct: 23.0, color: '#3b82f6', bar: 23 },
    { name: 'Compute',        icon: '⚡', amount: '$2,310.00', pct: 18.6, color: '#f59e0b', bar: 19 },
    { name: 'Data Transfer',  icon: '🔄', amount: '$1,320.00', pct: 10.6, color: '#10b981', bar: 11 },
    { name: 'Other Services', icon: '📦', amount: '$540.00',   pct: 4.3,  color: '#6b7280', bar: 4  },
  ];

  const INVOICES = [
    { id: 'INV-2024-0612', date: 'Jun 12, 2024', org: 'Acme Corporation', amount: '$5,000.00', status: 'Paid' },
    { id: 'INV-2024-0512', date: 'May 12, 2024', org: 'Acme Corporation', amount: '$4,850.00', status: 'Paid' },
    { id: 'INV-2024-0412', date: 'Apr 12, 2024', org: 'Acme Corporation', amount: '$4,700.00', status: 'Paid' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>

      {/* ── LEFT COLUMN ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Spend Over Time */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>Spend Over Time</span>
            <select style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '4px 10px', cursor: 'pointer' }}>
              <option>Daily</option><option>Weekly</option><option>Monthly</option>
            </select>
          </div>
          <div style={{ paddingLeft: 40 }}>
            <SpendChart />
          </div>
        </div>

        {/* Top Cost Drivers */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>Top Cost Drivers</span>
            <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span>Amount</span>
              <span style={{ width: 80, textAlign: 'right' }}>% of Spend</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {COST_DRIVERS.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 14, width: 22, flexShrink: 0 }}>{d.icon}</span>
                <span style={{ fontSize: 13, color: 'var(--text-primary)', width: 130, flexShrink: 0 }}>{d.name}</span>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.07)' }}>
                  <div style={{ height: '100%', width: `${d.bar}%`, borderRadius: 3, background: d.color }} />
                </div>
                <span style={{ fontSize: 13, color: '#fff', width: 80, textAlign: 'right', flexShrink: 0, fontWeight: 500 }}>{d.amount}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 42, textAlign: 'right', flexShrink: 0 }}>{d.pct}%</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View full usage analytics →</span>
          </div>
        </div>

        {/* Recent Invoices */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>Recent Invoices</span>
            <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View all invoices →</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {['Invoice ID', 'Date', 'Organization', 'Amount', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '8px 12px', fontWeight: 500, textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INVOICES.map(inv => (
                <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 12px', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 12 }}>{inv.id}</td>
                  <td style={{ padding: '12px 12px', color: 'var(--text-primary)' }}>{inv.date}</td>
                  <td style={{ padding: '12px 12px', color: '#fff' }}>{inv.org}</td>
                  <td style={{ padding: '12px 12px', color: '#fff', fontWeight: 600 }}>{inv.amount}</td>
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 12px', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 16 }} title="Download">⬇</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Current Plan */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 14 }}>Current Plan</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏢</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>Enterprise</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Billed Monthly</div>
            </div>
            <span style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600 }}>Active</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>$5,000.00</span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', alignSelf: 'flex-end' }}>/month</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 16 }}>Next billing date: Jul 12, 2024</div>
          <button style={{
            width: '100%', padding: '9px', borderRadius: 7, fontSize: 13, fontWeight: 600,
            background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)',
            color: '#fff', cursor: 'pointer',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            Manage Subscription
          </button>
        </div>

        {/* Usage Summary */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Usage Summary</span>
            <select style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 5, color: '#fff', padding: '3px 8px', cursor: 'pointer' }}>
              <option>This Month</option><option>Last Month</option>
            </select>
          </div>
          <ProgressBar label="AI Requests" used={2.45} total={5} usedLabel="2.45M" totalLabel="5M" color="#8b5cf6" />
          <ProgressBar label="Storage" used={1.2} total={2} usedLabel="1.2 TB" totalLabel="2 TB" color="#f59e0b" />
          <ProgressBar label="Compute Hours" used={4120} total={10000} usedLabel="4,120" totalLabel="10,000" color="#10b981" />
          <ProgressBar label="Data Transfer" used={820} total={2048} usedLabel="820 GB" totalLabel="2 TB" color="#3b82f6" />
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View all usage details →</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Payment Methods</span>
            <span style={{ fontSize: 11, color: '#3b82f6', cursor: 'pointer' }}>Manage →</span>
          </div>
          {[
            { type: 'Visa', last4: '4242', exp: 'Expires 12/26', color: '#1a56db', isDefault: true },
            { type: 'Mastercard', last4: '8888', exp: 'Expires 08/25', color: '#ef4444', isDefault: false },
          ].map(card => (
            <div key={card.last4} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 8, marginBottom: 10,
            }}>
              <div style={{
                width: 36, height: 24, borderRadius: 4, background: card.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>
                {card.type.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{card.type} •••• {card.last4}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{card.exp}</div>
              </div>
              {card.isDefault && (
                <span style={{ fontSize: 10, background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', padding: '2px 7px', borderRadius: 4, fontWeight: 600 }}>Default</span>
              )}
            </div>
          ))}
          <button style={{
            width: '100%', padding: '9px', borderRadius: 7, fontSize: 13, fontWeight: 500,
            background: 'transparent', border: '1px dashed rgba(255,255,255,0.15)',
            color: 'var(--text-secondary)', cursor: 'pointer', marginTop: 4,
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#8b5cf6')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
          >
            + Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}
