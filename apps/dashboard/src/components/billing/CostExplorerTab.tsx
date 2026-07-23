import React from 'react';

const SERVICES = ['AI Model Usage', 'Storage', 'Compute', 'Data Transfer', 'Other Services'];
const COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b', '#10b981', '#6b7280'];
const AMOUNTS = ['$5,420.00', '$2,860.00', '$2,310.00', '$1,320.00', '$540.00'];
const PCTS = [43.6, 23.0, 18.6, 10.6, 4.3];

// Stacked area chart data (30 days)
const STACKED = Array.from({ length: 30 }, (_, i) => ({
  ai:    180 + Math.sin(i * 0.4) * 60 + i * 3,
  stor:   80 + Math.sin(i * 0.3) * 25 + i * 1.5,
  comp:   65 + Math.sin(i * 0.5) * 20 + i * 1.2,
  trans:  40 + Math.sin(i * 0.6) * 15 + i * 0.8,
  other:  15 + Math.sin(i * 0.7) * 5,
}));

function StackedChart() {
  const W = 500; const H = 160;
  const toX = (i: number) => (i / 29) * W;
  const maxTotal = Math.max(...STACKED.map(d => d.ai + d.stor + d.comp + d.trans + d.other));
  const toY = (v: number) => H - (v / maxTotal) * H;

  const layers = [
    (d: typeof STACKED[0]) => d.ai + d.stor + d.comp + d.trans + d.other,
    (d: typeof STACKED[0]) => d.stor + d.comp + d.trans + d.other,
    (d: typeof STACKED[0]) => d.comp + d.trans + d.other,
    (d: typeof STACKED[0]) => d.trans + d.other,
    (d: typeof STACKED[0]) => d.other,
  ];

  return (
    <svg width="100%" height={H + 20} viewBox={`0 0 ${W} ${H + 20}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
      <defs>
        {COLORS.map((c, i) => (
          <linearGradient key={i} id={`cg${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity="0.7" />
            <stop offset="100%" stopColor={c} stopOpacity="0.3" />
          </linearGradient>
        ))}
      </defs>
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={0} y1={t * H} x2={W} y2={t * H} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {/* Stacked areas (bottom to top) */}
      {[4, 3, 2, 1, 0].map(li => {
        const top = layers[li];
        const bottom = li < 4 ? layers[li + 1] : () => 0;
        const pts = STACKED.map((d, i) =>
          `${toX(i).toFixed(1)},${toY(top(d)).toFixed(1)}`
        ).join(' ');
        const botPts = [...STACKED].reverse().map((d, i) =>
          `${toX(29 - i).toFixed(1)},${toY(bottom(d)).toFixed(1)}`
        ).join(' ');
        return (
          <polygon key={li} points={`${pts} ${botPts}`} fill={`url(#cg${li})`} />
        );
      })}
      {/* X labels */}
      {['May 12', 'May 17', 'May 22', 'May 27', 'Jun 01', 'Jun 06', 'Jun 11'].map((l, i) => (
        <text key={l} x={(i / 6) * W} y={H + 16} fontSize="9" fill="var(--text-secondary)" textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
}

function DonutChart() {
  const total = PCTS.reduce((a, b) => a + b, 0);
  let offset = 0;
  const r = 60; const cx = 80; const cy = 80;
  const circumference = 2 * Math.PI * r;

  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      {PCTS.map((pct, i) => {
        const dash = (pct / total) * circumference;
        const gap = circumference - dash;
        const rotation = (offset / total) * 360 - 90;
        offset += pct;
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={COLORS[i]} strokeWidth="20"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={0}
            transform={`rotate(${rotation} ${cx} ${cy})`} />
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">$12,450</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Total</text>
    </svg>
  );
}

export default function CostExplorerTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Group by</span>
        {['Service', 'Granularity: Daily', 'Time: Month'].map(f => (
          <select key={f} style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '5px 10px', cursor: 'pointer' }}>
            <option>{f}</option>
          </select>
        ))}
        <button style={{ marginLeft: 'auto', fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '6px 14px', cursor: 'pointer' }}>+ Export</button>
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24 }}>
        {/* Cost Over Time */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>Cost Over Time</span>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {SERVICES.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div style={{ paddingLeft: 4 }}><StackedChart /></div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 12 }}>
            Use Cost Explorer to analyze and optimize your platform spending. Export detailed reports for further analysis.
          </p>
        </div>

        {/* Cost by Service donut */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24, minWidth: 260 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Cost by Service</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><DonutChart /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SERVICES.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i], flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{s}</span>
                </div>
                <span style={{ color: '#fff', fontWeight: 600 }}>{AMOUNTS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Cost Drivers table */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 18 }}>Top Cost Drivers</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              {['Service', 'Amount', '% of Spend', 'Compute', 'Storage', '% Change'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 500, textAlign: 'left', fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { service: 'AI Model Usage', amount: '$5,420.00', pct: '43.6%', compute: '$5,420.00', storage: '$0.00', change: '+12.4%', up: true },
              { service: 'Storage', amount: '$2,860.00', pct: '23.0%', compute: '$0.00', storage: '$2,860.00', change: '+8.2%', up: true },
              { service: 'Compute', amount: '$2,310.00', pct: '18.6%', compute: '$2,310.00', storage: '$0.00', change: '+5.1%', up: true },
              { service: 'Data Transfer', amount: '$1,320.00', pct: '10.6%', compute: '$0.00', storage: '$1,320.00', change: '-2.3%', up: false },
              { service: 'Other Services', amount: '$540.00', pct: '4.3%', compute: '$340.00', storage: '$200.00', change: '+1.1%', up: true },
            ].map(r => (
              <tr key={r.service} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px', color: '#fff', fontWeight: 500 }}>{r.service}</td>
                <td style={{ padding: '12px', color: '#fff', fontWeight: 600 }}>{r.amount}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{r.pct}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{r.compute}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{r.storage}</td>
                <td style={{ padding: '12px', color: r.up ? '#10b981' : '#ef4444', fontWeight: 600 }}>{r.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
