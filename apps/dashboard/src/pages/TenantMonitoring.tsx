import React, { useState, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

// ─── Types ───
interface AlertItem {
  id: string;
  title: string;
  subtitle: string;
  service: string;
  serviceBg: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Resolved' | 'Acknowledged';
  startedAt: string;
}

interface ServiceHealth {
  name: string;
  status: 'Healthy' | 'Degraded' | 'Down';
  color: string;
}

interface ActivityItem {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
}

interface ServiceMetric {
  name: string;
  requests: number;
  percent: number;
  color: string;
}

interface ResponseMetric {
  name: string;
  ms: number;
  color: string;
}

// ─── Mock Data ───
const ALERTS: AlertItem[] = [
  { id: 'a1', title: 'High error rate detected', subtitle: 'Error rate is above 1% for 5 minutes', service: 'AI Service', serviceBg: '#8b5cf6', severity: 'High', status: 'Active', startedAt: 'May 21, 2025 10:32 AM' },
  { id: 'a2', title: 'Slow response time', subtitle: 'p95 response time is above 1000ms', service: 'AI Service', serviceBg: '#8b5cf6', severity: 'Medium', status: 'Active', startedAt: 'May 21, 2025 10:25 AM' },
  { id: 'a3', title: 'High CPU utilization', subtitle: 'CPU usage is above 80% for 10 minutes', service: 'Workspace Service', serviceBg: '#10b981', severity: 'Medium', status: 'Resolved', startedAt: 'May 21, 2025 09:45 AM' },
  { id: 'a4', title: 'Memory pressure warning', subtitle: 'Memory usage exceeds 85% threshold', service: 'Database', serviceBg: '#f59e0b', severity: 'Low', status: 'Resolved', startedAt: 'May 21, 2025 08:15 AM' },
  { id: 'a5', title: 'Certificate expiry warning', subtitle: 'TLS certificate expires in 14 days', service: 'API Gateway', serviceBg: '#3b82f6', severity: 'Low', status: 'Acknowledged', startedAt: 'May 20, 2025 11:00 PM' },
];

const SERVICES_HEALTH: ServiceHealth[] = [
  { name: 'API Gateway', status: 'Healthy', color: '#10b981' },
  { name: 'Auth Service', status: 'Healthy', color: '#10b981' },
  { name: 'Workspace Service', status: 'Healthy', color: '#10b981' },
  { name: 'AI Service', status: 'Healthy', color: '#10b981' },
  { name: 'Storage Service', status: 'Healthy', color: '#10b981' },
  { name: 'Database', status: 'Healthy', color: '#10b981' },
  { name: 'Vector DB', status: 'Healthy', color: '#10b981' },
  { name: 'File Storage (S3)', status: 'Healthy', color: '#10b981' },
  { name: 'Message Queue (Kafka)', status: 'Healthy', color: '#10b981' },
];

const ACTIVITIES: ActivityItem[] = [
  { id: 'act1', icon: '🔑', iconColor: '#3b82f6', title: 'New API key created', subtitle: 'by Piyush Sharma', time: '10:30 AM' },
  { id: 'act2', icon: '💻', iconColor: '#8b5cf6', title: 'Workspace "Data Platform" created', subtitle: 'by Rohit Verma', time: '09:45 AM' },
  { id: 'act3', icon: '📜', iconColor: '#f59e0b', title: 'Policy "Read Access" updated', subtitle: 'by Mukesh Kumar', time: '09:20 AM' },
  { id: 'act4', icon: '🗄️', iconColor: '#10b981', title: 'Storage bucket "acme-raw-data" created', subtitle: 'by Devansh Singh', time: '08:55 AM' },
  { id: 'act5', icon: '⚡', iconColor: '#a855f7', title: 'AI provider "OpenAI" connected', subtitle: 'by Vishal Patel', time: '08:40 AM' },
];

const SERVICE_METRICS: ServiceMetric[] = [
  { name: 'AI Service', requests: 450000, percent: 36.6, color: '#8b5cf6' },
  { name: 'API Gateway', requests: 320000, percent: 26.0, color: '#3b82f6' },
  { name: 'Workspace Service', requests: 200000, percent: 16.3, color: '#10b981' },
  { name: 'Storage Service', requests: 150000, percent: 12.2, color: '#f59e0b' },
  { name: 'Others', requests: 110000, percent: 8.9, color: '#64748b' },
];

const RESPONSE_METRICS: ResponseMetric[] = [
  { name: 'AI Service', ms: 820, color: '#ef4444' },
  { name: 'API Gateway', ms: 320, color: '#f59e0b' },
  { name: 'Workspace Service', ms: 210, color: '#10b981' },
  { name: 'Storage Service', ms: 180, color: '#3b82f6' },
  { name: 'Auth Service', ms: 140, color: '#8b5cf6' },
];

type TabKey = 'Overview' | 'Infrastructure' | 'Services' | 'API' | 'Databases' | 'Workspaces';

// ─── Sparkline/Chart helpers ───
const generateRequestsData = (): number[] => [
  8000, 6500, 5200, 4800, 5500, 7200, 9800, 15000, 22000, 28000, 35000, 38000,
  36000, 32000, 29000, 25000, 21000, 18000, 15500, 13000, 11000, 9500, 8200, 7800,
];

const generateErrorRateData = (): number[] => [
  0.12, 0.10, 0.08, 0.09, 0.11, 0.15, 0.18, 0.22, 0.35, 0.42, 0.55, 0.65,
  0.72, 0.58, 0.45, 0.38, 0.30, 0.25, 0.20, 0.18, 0.15, 0.14, 0.12, 0.11,
];

const TIME_LABELS = [
  '12:00 AM', '', '04:00 AM', '', '08:00 AM', '', '12:00 PM', '', '04:00 PM', '', '08:00 PM', '',
];

export default function TenantMonitoring() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>('Overview');
  const [timeRange, setTimeRange] = useState('Last 24 hours');

  const tabs: TabKey[] = ['Overview', 'Infrastructure', 'Services', 'API', 'Databases', 'Workspaces'];

  const requestsData = useMemo(() => generateRequestsData(), []);
  const errorRateData = useMemo(() => generateErrorRateData(), []);

  const formatK = (n: number): string => {
    if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return n.toString();
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f97316';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#3b82f6';
      default: return '#64748b';
    }
  };
  const getSeverityBg = (sev: string) => {
    switch (sev) {
      case 'Critical': return 'rgba(239, 68, 68, 0.15)';
      case 'High': return 'rgba(249, 115, 22, 0.15)';
      case 'Medium': return 'rgba(245, 158, 11, 0.15)';
      case 'Low': return 'rgba(59, 130, 246, 0.12)';
      default: return 'rgba(100, 116, 139, 0.12)';
    }
  };
  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Active': return '#10b981';
      case 'Resolved': return '#64748b';
      case 'Acknowledged': return '#f59e0b';
      default: return '#64748b';
    }
  };

  // ── Area chart builder ──
  const buildAreaPath = (data: number[], width: number, height: number, padY = 16) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    const points = data.map((v, i) => ({
      x: i * stepX,
      y: padY + (height - 2 * padY) * (1 - (v - min) / range),
    }));
    // smooth cubic bezier
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx1 = prev.x + stepX * 0.4;
      const cpx2 = curr.x - stepX * 0.4;
      d += ` C${cpx1},${prev.y} ${cpx2},${curr.y} ${curr.x},${curr.y}`;
    }
    const fill = d + ` L${points[points.length - 1].x},${height} L${points[0].x},${height} Z`;
    return { line: d, fill };
  };

  // ── Donut chart builder ──
  const buildDonut = (metrics: ServiceMetric[], cx: number, cy: number, r: number, strokeWidth: number) => {
    const total = metrics.reduce((s, m) => s + m.requests, 0);
    let startAngle = -90;
    const circumference = 2 * Math.PI * r;
    return metrics.map((m) => {
      const angle = (m.requests / total) * 360;
      const dashLength = (m.requests / total) * circumference;
      const dashOffset = circumference - dashLength;
      const rotation = startAngle;
      startAngle += angle;
      return { ...m, dashLength, dashOffset, rotation, circumference };
    });
  };

  const donutSegments = useMemo(() => buildDonut(SERVICE_METRICS, 90, 90, 70, 28), []);

  // ────────────────────────── Render ──────────────────────────
  return (
    <div style={{ padding: '28px 32px', maxWidth: 1440, margin: '0 auto' }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Monitoring</h1>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4, marginBottom: 0 }}>Real-time overview of your platform's performance, health, and usage.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            style={{
              padding: '8px 14px', fontSize: 13, color: '#cbd5e1',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, outline: 'none', cursor: 'pointer',
            }}
          >
            <option value="Last 1 hour">Last 1 hour</option>
            <option value="Last 6 hours">Last 6 hours</option>
            <option value="Last 24 hours">Last 24 hours</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
          </select>
          <button
            onClick={() => addToast('Dashboard refreshed with latest metrics', 'success')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13, fontWeight: 600,
              color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', border: 'none',
              borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 2px 10px rgba(139, 92, 246, 0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(139, 92, 246, 0.3)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
            Refresh
          </button>
        </div>
      </div>

      {/* ── Main 3-column layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        {/* Left: main content */}
        <div>
          {/* ── 5 Metric Cards ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
            {/* Overall Health */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 8, background: 'rgba(16, 185, 129, 0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Overall Health</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#10b981' }}>Healthy</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>All systems operational</div>
            </div>

            {/* Uptime */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 8, background: 'rgba(139, 92, 246, 0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Uptime</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>99.98%</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>↑ 0.02% vs yesterday</div>
            </div>

            {/* Total Requests */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 8, background: 'rgba(59, 130, 246, 0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10M6 20v-4M18 20v-8"/></svg>
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Total Requests</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>1.23M</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>↑ 12.5% vs yesterday</div>
            </div>

            {/* Error Rate */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 8, background: 'rgba(239, 68, 68, 0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Error Rate</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>0.18%</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>↓ 0.05% vs yesterday</div>
            </div>

            {/* Avg Response Time */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 8, background: 'rgba(245, 158, 11, 0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Avg. Response Time</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>245 ms</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>↓ 18 ms vs yesterday</div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 18px', fontSize: 13, fontWeight: activeTab === tab ? 600 : 500,
                  color: activeTab === tab ? '#f1f5f9' : '#64748b',
                  background: 'transparent', border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #8b5cf6' : '2px solid transparent',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Charts Row 1: Requests + Error Rate ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {/* Requests Over Time */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Requests Over Time</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                </div>
                <select style={{
                  padding: '4px 10px', fontSize: 11, color: '#94a3b8',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 6, outline: 'none', cursor: 'pointer',
                }}>
                  <option>Total Requests</option>
                  <option>Success Rate</option>
                  <option>Error Count</option>
                </select>
              </div>
              {/* Y-axis labels + chart */}
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 20 }}>
                  {['40K', '30K', '20K', '10K', '0'].map(l => (
                    <span key={l} style={{ fontSize: 10, color: '#475569', whiteSpace: 'nowrap' }}>{l}</span>
                  ))}
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <svg width="100%" viewBox="0 0 500 160" preserveAspectRatio="none" style={{ display: 'block' }}>
                    {/* Grid lines */}
                    {[0, 40, 80, 120, 160].map(y => (
                      <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    ))}
                    {/* Area fill */}
                    <defs>
                      <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={buildAreaPath(requestsData, 500, 160).fill} fill="url(#reqGrad)" />
                    <path d={buildAreaPath(requestsData, 500, 160).line} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  {/* X-axis labels */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    {TIME_LABELS.map((l, i) => (
                      <span key={i} style={{ fontSize: 9, color: '#475569' }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Rate Over Time */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Error Rate Over Time</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                </div>
                <select style={{
                  padding: '4px 10px', fontSize: 11, color: '#94a3b8',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 6, outline: 'none', cursor: 'pointer',
                }}>
                  <option>Error Rate (%)</option>
                  <option>Error Count</option>
                  <option>5xx Errors</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 20 }}>
                  {['0.8%', '0.6%', '0.4%', '0.2%', '0%'].map(l => (
                    <span key={l} style={{ fontSize: 10, color: '#475569', whiteSpace: 'nowrap' }}>{l}</span>
                  ))}
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <svg width="100%" viewBox="0 0 500 160" preserveAspectRatio="none" style={{ display: 'block' }}>
                    {[0, 40, 80, 120, 160].map(y => (
                      <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    ))}
                    <defs>
                      <linearGradient id="errGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={buildAreaPath(errorRateData, 500, 160).fill} fill="url(#errGrad)" />
                    <path d={buildAreaPath(errorRateData, 500, 160).line} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    {TIME_LABELS.map((l, i) => (
                      <span key={i} style={{ fontSize: 9, color: '#475569' }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Charts Row 2: Donut + Response Time ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {/* Top Services by Requests */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Top Services by Requests</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {/* Donut Chart */}
                <div style={{ position: 'relative', width: 160, height: 160, flexShrink: 0 }}>
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    {donutSegments.map((seg, i) => (
                      <circle
                        key={i}
                        cx="80" cy="80" r={seg.circumference / (2 * Math.PI)}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="24"
                        strokeDasharray={`${seg.dashLength} ${seg.dashOffset}`}
                        transform={`rotate(${seg.rotation} 80 80)`}
                        strokeLinecap="butt"
                      />
                    ))}
                  </svg>
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>1.23M</div>
                    <div style={{ fontSize: 10, color: '#64748b' }}>Total</div>
                  </div>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {SERVICE_METRICS.map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: '#94a3b8', flex: 1 }}>{m.name}</span>
                      <span style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 600, whiteSpace: 'nowrap' }}>{formatK(m.requests)} ({m.percent}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Response Time (p95) */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Response Time (p95)</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {RESPONSE_METRICS.map((m, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: '#cbd5e1' }}>{m.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{m.ms} ms</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 4,
                        width: `${Math.min(100, (m.ms / 1000) * 100)}%`,
                        background: `linear-gradient(90deg, ${m.color}, ${m.color}cc)`,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                ))}
                {/* X-axis */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  {['0 ms', '250 ms', '500 ms', '750 ms', '1000 ms'].map(l => (
                    <span key={l} style={{ fontSize: 9, color: '#475569' }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Recent Alerts Table ── */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>Recent Alerts</span>
            </div>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 100px 100px 1.2fr 80px',
              padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              {['Alert', 'Service', 'Severity', 'Status', 'Started At', 'Actions'].map(h => (
                <span key={h} style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {ALERTS.slice(0, 3).map((alert, i) => (
              <div
                key={alert.id}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 100px 100px 1.2fr 80px',
                  padding: '14px 20px', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  alignItems: 'center', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Alert */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: alert.severity === 'High' ? 'rgba(249, 115, 22, 0.12)' : alert.severity === 'Medium' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: getSeverityColor(alert.severity), flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{alert.title}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{alert.subtitle}</div>
                  </div>
                </div>

                {/* Service */}
                <div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6,
                    background: `${alert.serviceBg}20`, color: alert.serviceBg,
                  }}>{alert.service}</span>
                </div>

                {/* Severity */}
                <div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 6,
                    background: getSeverityBg(alert.severity), color: getSeverityColor(alert.severity),
                  }}>{alert.severity}</span>
                </div>

                {/* Status */}
                <div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: getStatusColor(alert.status) }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: getStatusColor(alert.status) }} />
                    {alert.status}
                  </span>
                </div>

                {/* Started At */}
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{alert.startedAt}</div>

                {/* Actions */}
                <div>
                  <button
                    onClick={() => addToast(`Viewing alert: ${alert.title}`, 'info')}
                    style={{
                      padding: '5px 14px', fontSize: 11, fontWeight: 600,
                      color: '#c4b5fd', background: 'rgba(139, 92, 246, 0.12)',
                      border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: 6,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)'; }}
                  >View</button>
                </div>
              </div>
            ))}
            {/* View all link */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <button
                onClick={() => addToast('Opening full alerts view...', 'info')}
                style={{
                  background: 'transparent', border: 'none', fontSize: 12, fontWeight: 600,
                  color: '#8b5cf6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                View all alerts
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* System Health */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>System Health</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </div>
              <button
                onClick={() => addToast('Viewing full system health dashboard', 'info')}
                style={{ background: 'transparent', border: 'none', fontSize: 11, fontWeight: 600, color: '#8b5cf6', cursor: 'pointer' }}
              >View all</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SERVICES_HEALTH.map((svc, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: svc.color }} />
                    <span style={{ fontSize: 12, color: '#cbd5e1' }}>{svc.name}</span>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: svc.status === 'Healthy' ? '#10b981' : svc.status === 'Degraded' ? '#f59e0b' : '#ef4444',
                  }}>{svc.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Summary */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Alerts Summary</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </div>
              <span style={{ fontSize: 10, color: '#64748b' }}>Last 24 hours</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {/* Total Alerts */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px',
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>Total Alerts</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>12</div>
                <div style={{ fontSize: 10, color: '#64748b' }}>↑ 2 vs yesterday</div>
              </div>
              {/* Critical */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px',
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>Critical</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#ef4444' }}>2</div>
                <div style={{ fontSize: 10, color: '#64748b' }}>↑ 1 vs yesterday</div>
              </div>
              {/* Warning */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px',
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>Warning</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#f59e0b' }}>6</div>
                <div style={{ fontSize: 10, color: '#64748b' }}>↑ 1 vs yesterday</div>
              </div>
              {/* Resolved */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px',
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>Resolved</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#10b981' }}>10</div>
                <div style={{ fontSize: 10, color: '#64748b' }}>↑ 3 vs yesterday</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Recent Activity</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </div>
              <button
                onClick={() => addToast('Opening full activity log', 'info')}
                style={{ background: 'transparent', border: 'none', fontSize: 11, fontWeight: 600, color: '#8b5cf6', cursor: 'pointer' }}
              >View all</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {ACTIVITIES.map((act, i) => (
                <div key={act.id} style={{
                  display: 'flex', gap: 10, padding: '10px 0',
                  borderBottom: i < ACTIVITIES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 7,
                    background: `${act.iconColor}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0,
                  }}>{act.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{act.title}</div>
                    <div style={{ fontSize: 10, color: '#64748b' }}>{act.subtitle}</div>
                  </div>
                  <span style={{ fontSize: 10, color: '#475569', whiteSpace: 'nowrap', flexShrink: 0 }}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
