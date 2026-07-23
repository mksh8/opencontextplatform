import React from 'react';

const SERVICES = [
  { name: 'AI Requests', used: 2.45, total: 5, usedLabel: '2.45M', totalLabel: '5M', pct: 49, color: '#8b5cf6', trend: [30,45,38,55,42,60,52,68,58,72,65,80,70,75,72,78,74,80,76,82] },
  { name: 'Storage', used: 1.2, total: 2, usedLabel: '1.2 TB', totalLabel: '2 TB', pct: 60, color: '#f59e0b', trend: [20,22,24,25,26,28,30,32,34,38,40,42,45,48,50,52,54,56,58,60] },
  { name: 'Compute Hours', used: 4120, total: 10000, usedLabel: '4,120', totalLabel: '10,000', pct: 41, color: '#10b981', trend: [25,30,28,35,32,40,38,45,40,48,44,50,46,52,48,50,46,52,44,50] },
  { name: 'Data Transfer', used: 820, total: 2048, usedLabel: '820 GB', totalLabel: '2 TB', pct: 40, color: '#3b82f6', trend: [15,18,20,22,25,28,30,32,35,36,35,38,36,40,38,40,38,42,40,40] },
  { name: 'Vector DB Storage', used: 0.95, total: 1.75, usedLabel: '950 GB', totalLabel: '1.75 TB', pct: 54, color: '#ec4899', trend: [10,15,18,20,25,28,30,35,38,40,42,45,46,48,50,52,52,54,53,54] },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data); const min = Math.min(...data);
  const W = 80; const H = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min + 1)) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={W} height={H}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function UsageTab() {
  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {['All Organizations', 'This Month'].map(f => (
            <select key={f} style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '6px 12px', cursor: 'pointer' }}>
              <option>{f}</option>
            </select>
          ))}
        </div>
        <button style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '6px 14px', cursor: 'pointer' }}>+ Export</button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { icon: '🤖', label: 'AI Requests', value: '2.45M', sub: 'of 5M', pct: 49, color: '#8b5cf6' },
          { icon: '💾', label: 'Storage', value: '1.2 TB', sub: 'of 2 TB', pct: 60, color: '#f59e0b' },
          { icon: '⚡', label: 'Compute Hours', value: '4,120', sub: 'of 10,000', pct: 41, color: '#10b981' },
          { icon: '🔄', label: 'Data Transfer', value: '820 GB', sub: 'of 2 TB', pct: 40, color: '#3b82f6' },
        ].map(c => (
          <div key={c.label} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '18px 20px', flex: 1, minWidth: 160 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.label}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>{c.sub} <span style={{ color: c.color, fontWeight: 600 }}>{c.pct}%</span></div>
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)' }}>
              <div style={{ height: '100%', width: `${c.pct}%`, borderRadius: 3, background: c.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Usage by Service table */}
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 18 }}>Usage by Service</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              {['Service', 'Usage', 'Limit', '% Used', 'Trend', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 500, textAlign: 'left', fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERVICES.map(s => (
              <tr key={s.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '14px 12px', color: '#fff', fontWeight: 500 }}>{s.name}</td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 100, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', flexShrink: 0 }}>
                      <div style={{ height: '100%', width: `${s.pct}%`, borderRadius: 3, background: s.color }} />
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{s.usedLabel}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 12px', color: 'var(--text-secondary)', fontSize: 12 }}>{s.totalLabel}</td>
                <td style={{ padding: '14px 12px', color: s.pct > 75 ? '#ef4444' : s.pct > 50 ? '#f59e0b' : '#10b981', fontWeight: 600 }}>{s.pct}%</td>
                <td style={{ padding: '14px 12px' }}><MiniSparkline data={s.trend} color={s.color} /></td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600, background: s.pct > 80 ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.12)', color: s.pct > 80 ? '#ef4444' : '#10b981' }}>
                    {s.pct > 80 ? 'Critical' : 'Normal'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
