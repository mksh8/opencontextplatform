import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const BILLING_HISTORY = [
  { id: 'INV-2025-0501', date: 'May 1, 2025', period: 'May 1 – May 31, 2025', amount: '$4,500.00', status: 'Paid' },
  { id: 'INV-2025-0401', date: 'Apr 1, 2025', period: 'Apr 1 – Apr 30, 2025', amount: '$4,200.00', status: 'Paid' },
  { id: 'INV-2025-0301', date: 'Mar 1, 2025', period: 'Mar 1 – Mar 31, 2025', amount: '$4,000.00', status: 'Paid' },
  { id: 'INV-2025-0201', date: 'Feb 1, 2025', period: 'Feb 1 – Feb 28, 2025', amount: '$4,000.00', status: 'Paid' },
  { id: 'INV-2025-0101', date: 'Jan 1, 2025', period: 'Jan 1 – Jan 31, 2025', amount: '$4,000.00', status: 'Paid' },
];

// SVG multi-line chart data
const CHART_MONTHS = ['Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025'];
const API_REQUESTS = [2.5, 4, 5, 7, 8.5, 7.5]; // millions
const STORAGE    = [1,   2, 3, 4, 5,   5  ];     // GB (hundreds)
const ACTIVE_USR = [1,   1.5, 2, 2.5, 3, 2.5]; // hundreds

function scalePts(data: number[], max: number, W: number, H: number, pad: number) {
  const step = (W - pad * 2) / (data.length - 1);
  return data.map((v, i) => [pad + i * step, H - pad - ((v / max) * (H - pad * 2))]);
}

function polyline(pts: number[][]) {
  return pts.map(([x, y]) => `${x},${y}`).join(' ');
}

function UsageTrendChart() {
  const W = 580; const H = 180; const PAD = 20;
  const max = 11;
  const apiPts  = scalePts(API_REQUESTS, max, W, H, PAD);
  const storPts = scalePts(STORAGE, max, W, H, PAD);
  const usrPts  = scalePts(ACTIVE_USR, max, W, H, PAD);

  const gridLines = [0, 2.5, 5, 7.5, 10];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 180, overflow: 'visible' }}>
      {/* Grid lines */}
      {gridLines.map((v, i) => {
        const y = H - PAD - (v / max) * (H - PAD * 2);
        return (
          <g key={i}>
            <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={PAD - 4} y={y + 4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.3)">{v}M</text>
          </g>
        );
      })}
      {/* X Labels */}
      {CHART_MONTHS.map((m, i) => {
        const x = PAD + i * ((W - PAD * 2) / (CHART_MONTHS.length - 1));
        return <text key={i} x={x} y={H} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)">{m}</text>;
      })}
      {/* Lines */}
      <polyline points={polyline(apiPts)}  fill="none" stroke="#8b5cf6" strokeWidth="2" />
      <polyline points={polyline(storPts)} fill="none" stroke="#3b82f6" strokeWidth="2" />
      <polyline points={polyline(usrPts)}  fill="none" stroke="#10b981" strokeWidth="2" />
      {/* Dots - API */}
      {apiPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#8b5cf6" />)}
      {storPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" />)}
      {usrPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#10b981" />)}
    </svg>
  );
}

export default function Billing() {
  const { showToast } = useToast();
  const [usagePeriod, setUsagePeriod] = useState('This Month');
  const [chartPeriod, setChartPeriod] = useState('Last 6 Months');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>Billing & Usage</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>View your subscription, invoices and usage summary.</div>
        </div>
        <button className="btn btn-primary" style={{ background: '#7c3aed', borderColor: '#7c3aed', fontSize: 13, padding: '8px 16px' }}
          onClick={() => showToast('Opening subscription management...', 'info')}>
          Manage Subscription
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Overview Strip */}
        <div className="widget" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 20 }}>Overview</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>,
                iconBg: 'rgba(139, 92, 246, 0.15)', iconColor: '#8b5cf6',
                label: 'Current Plan', value: 'Enterprise Plan', sub: 'View plan details →', subColor: '#8b5cf6'
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
                iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#10b981',
                label: 'Current Billing Period', value: 'May 1 – May 31, 2025', sub: '31 days remaining', subColor: 'var(--text-secondary)'
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
                iconBg: 'rgba(59, 130, 246, 0.15)', iconColor: '#3b82f6',
                label: 'Amount Due', value: '$0.00', sub: 'No payment due', subColor: 'var(--text-secondary)'
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
                iconBg: 'rgba(245, 158, 11, 0.15)', iconColor: '#f59e0b',
                label: 'Next Invoice', value: 'Jun 1, 2025', sub: '$4,500.00 (est.)', subColor: 'var(--text-secondary)'
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', borderLeft: i > 0 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: item.iconBg, color: item.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: item.subColor, cursor: item.subColor === '#8b5cf6' ? 'pointer' : 'default' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Grid (3 columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>

          {/* Plan Details */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Plan Details</h3>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>Active</span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Enterprise Plan</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>$4,000.00</span>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>/ month</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Billed monthly</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, flex: 1 }}>
              {['Up to 500 users', 'Advanced security & SSO', 'Priority support', 'Unlimited projects', 'Audit logs & compliance'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {f}
                </div>
              ))}
            </div>

            <button className="btn" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}>
              View Plan Details
            </button>
          </div>

          {/* Usage Summary */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Usage Summary</h3>
              <select className="input" value={usagePeriod} onChange={e => setUsagePeriod(e.target.value)} style={{ padding: '4px 10px', fontSize: 12, width: 'auto' }}>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
              {[
                { label: 'Users', current: 312, max: 500, unit: '', pct: 62, icon: '👥', color: '#8b5cf6' },
                { label: 'Projects', current: 28, max: Infinity, unit: '', pct: 0, icon: '📁', color: '#10b981', maxLabel: 'Unlimited' },
                { label: 'API Requests', current: 2.4, max: 10, unit: 'M', pct: 24, icon: '⚡', color: '#3b82f6', maxLabel: '10M' },
                { label: 'Storage', current: 320, max: 1024, unit: ' GB', pct: 31, icon: '🗄️', color: '#f97316', maxLabel: '1 TB' },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#fff' }}>
                      <span style={{ fontSize: 16 }}>{item.icon}</span>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {item.current}{item.unit} / {item.maxLabel || item.max}{item.unit === '' && item.maxLabel ? '' : (item.maxLabel ? '' : item.unit)}
                    </div>
                  </div>
                  {item.pct > 0 && (
                    <>
                      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 3 }}></div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, textAlign: 'right' }}>{item.pct}%</div>
                    </>
                  )}
                  {item.pct === 0 && (
                    <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '5%', background: item.color, borderRadius: 3 }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
              View detailed usage <span>→</span>
            </div>
          </div>

          {/* Current Invoice */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Current Invoice</h3>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>Paid</span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Invoice #INV-2025-0501</div>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
                <span>Paid on May 1, 2025</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>May 1 – May 31, 2025</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, fontSize: 13 }}>
              {[
                { label: 'Subscription (Enterprise Plan)', amount: '$4,000.00' },
                { label: 'Additional Users (12)', amount: '$300.00' },
                { label: 'Storage Overage (20 GB)', amount: '$200.00' },
              ].map((line, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', paddingBottom: 12, borderBottom: '1px solid var(--border-color)' }}>
                  <span>{line.label}</span>
                  <span style={{ color: '#fff' }}>{line.amount}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, color: '#fff', paddingTop: 4 }}>
                <span>Total</span>
                <span>$4,500.00</span>
              </div>
            </div>

            <button className="btn" onClick={() => showToast('Opening invoice...', 'info')} style={{ width: '100%', justifyContent: 'center', fontSize: 13, marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              View Invoice
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </button>
          </div>
        </div>

        {/* Bottom Grid (2 columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>

          {/* Usage Trend Chart */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Usage Trend</h3>
              <select className="input" value={chartPeriod} onChange={e => setChartPeriod(e.target.value)} style={{ padding: '4px 10px', fontSize: 12, width: 'auto' }}>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 16, fontSize: 12 }}>
              {[
                { label: 'API Requests', color: '#8b5cf6' },
                { label: 'Storage (GB)', color: '#3b82f6' },
                { label: 'Active Users', color: '#10b981' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                  <div style={{ width: 20, height: 2, background: l.color, borderRadius: 1 }}></div>
                  {l.label}
                </div>
              ))}
            </div>

            <UsageTrendChart />

            <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer', marginTop: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              View all usage analytics <span>→</span>
            </div>
          </div>

          {/* Billing History */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' }}>Billing History</h3>
              <div style={{ color: '#8b5cf6', fontSize: 12, cursor: 'pointer' }}>View All</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: 11, marginBottom: 8 }}>
              <span style={{ flex: 1 }}>Invoice</span>
              <span style={{ width: 80 }}>Date</span>
              <span style={{ width: 130 }}>Period</span>
              <span style={{ width: 70, textAlign: 'right' }}>Amount</span>
              <span style={{ width: 60, textAlign: 'right' }}>Status</span>
              <span style={{ width: 28 }}></span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
              {BILLING_HISTORY.map((inv, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: i < BILLING_HISTORY.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', fontSize: 12 }}>
                  <span style={{ flex: 1, color: '#fff', fontFamily: 'monospace' }}>{inv.id}</span>
                  <span style={{ width: 80, color: 'var(--text-secondary)' }}>{inv.date}</span>
                  <span style={{ width: 130, color: 'var(--text-secondary)' }}>{inv.period}</span>
                  <span style={{ width: 70, textAlign: 'right', color: '#fff', fontWeight: 500 }}>{inv.amount}</span>
                  <span style={{ width: 60, textAlign: 'right' }}>
                    <span style={{ color: '#10b981', fontSize: 11 }}>{inv.status}</span>
                  </span>
                  <span style={{ width: 28, textAlign: 'right' }}>
                    <svg style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Footer */}
        <div className="widget" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', marginBottom: 2 }}>Need help with billing?</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Check our <span style={{ color: '#8b5cf6', cursor: 'pointer' }}>billing FAQ</span> or contact our support team.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn" style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              View Billing FAQ
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </button>
            <button className="btn" style={{ fontSize: 13 }} onClick={() => showToast('Opening support...', 'info')}>
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
