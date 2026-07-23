import React from 'react';

const INVOICES = [
  { id: 'INV-2024-0612', date: 'Jun 12, 2024', org: 'Acme Corporation', period: 'Jun 12 – Jun 12, 2024', amount: '$5,000.00', status: 'Paid' },
  { id: 'INV-2024-0512', date: 'May 12, 2024', org: 'Acme Corporation', period: 'May 12 – Jun 12, 2024', amount: '$4,850.00', status: 'Paid' },
  { id: 'INV-2024-0412', date: 'Apr 12, 2024', org: 'Acme Corporation', period: 'Apr 12 – May 12, 2024', amount: '$4,700.00', status: 'Paid' },
  { id: 'INV-2024-0312', date: 'Mar 12, 2024', org: 'Acme Corporation', period: 'Mar 12 – Apr 12, 2024', amount: '$4,500.00', status: 'Paid' },
  { id: 'INV-2024-0212', date: 'Feb 12, 2024', org: 'Acme Corporation', period: 'Feb 12 – Mar 12, 2024', amount: '$4,200.00', status: 'Paid' },
  { id: 'INV-2024-0112', date: 'Jan 12, 2024', org: 'Acme Corporation', period: 'Jan 12 – Feb 12, 2024', amount: '$3,950.00', status: 'Paid' },
];

const card = { background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '18px 20px', flex: 1 } as React.CSSProperties;

export default function InvoicesTab() {
  return (
    <div>
      {/* KPI row */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { icon: '📄', label: 'Total Invoiced', value: '$53,200.00', sub: '↑ 12.5% from last month', subColor: '#10b981' },
          { icon: '✅', label: 'Total Paid', value: '$48,700.00', sub: '↑ 10.2% from last month', subColor: '#10b981' },
          { icon: '🔔', label: 'Next Invoice', value: '$4,500.00', sub: 'Due Jul 12, 2024', subColor: '#f59e0b' },
          { icon: '⚠️', label: 'Overdue', value: '$0.00', sub: 'No overdue invoices', subColor: 'var(--text-secondary)' },
        ].map(c => (
          <div key={c.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(139,92,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 3 }}>{c.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{c.value}</div>
              <div style={{ fontSize: 11, color: c.subColor, marginTop: 3 }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Invoice Banner */}
      <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, padding: '16px 24px' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>Next Invoice</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>$5,250 <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-secondary)' }}>due on Jul 12, 2024</span></div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
          ⬇ Download Latest Invoice
        </button>
      </div>

      {/* Table */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Invoices</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <select style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '5px 10px', cursor: 'pointer' }}>
              <option>All Organizations</option>
            </select>
            <button style={{ fontSize: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '5px 14px', cursor: 'pointer' }}>Filter</button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              {['Invoice ID', 'Date', 'Organization', 'Period', 'Amount', 'Status', ''].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 500, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map(inv => (
              <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: 12 }}>{inv.id}</td>
                <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{inv.date}</td>
                <td style={{ padding: '12px', color: '#fff' }}>{inv.org}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: 12 }}>{inv.period}</td>
                <td style={{ padding: '12px', fontWeight: 600, color: '#fff' }}>{inv.amount}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{inv.status}</span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 16 }}>⬇</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span>Showing 1 to 6 of 12 invoices</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['‹', '1', '2', '3', '›'].map((p, i) => (
              <button key={i} style={{ width: 28, height: 28, borderRadius: 5, border: '1px solid var(--border-color)', background: p === '1' ? '#8b5cf6' : 'transparent', color: p === '1' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: 12 }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
