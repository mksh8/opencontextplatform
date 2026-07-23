import React, { useState, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

export interface QuotaItem {
  id: string;
  name: string;
  subtitle: string;
  workspace: string;
  workspaceCode: string;
  workspaceBg: string;
  category: 'Compute' | 'Storage' | 'API' | 'AI Models' | 'Network';
  used: number;
  limit: number;
  unit: string;
  status: 'Normal' | 'Warning' | 'Critical' | 'Exceeded';
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  resetPeriod: string;
  lastReset: string;
  nextReset: string;
  iconType: 'cpu' | 'hdd' | 'api' | 'brain' | 'network' | 'memory' | 'gpu' | 'bandwidth';
  iconColor: string;
  requestable: boolean;
}

const INITIAL_QUOTAS: QuotaItem[] = [
  {
    id: 'q-1',
    name: 'API Requests',
    subtitle: 'REST & GraphQL API calls',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    category: 'API',
    used: 847500,
    limit: 1000000,
    unit: 'requests/mo',
    status: 'Warning',
    trend: 'up',
    trendValue: '+12%',
    resetPeriod: 'Monthly',
    lastReset: 'Jul 1, 2025',
    nextReset: 'Aug 1, 2025',
    iconType: 'api',
    iconColor: '#f59e0b',
    requestable: true,
  },
  {
    id: 'q-2',
    name: 'Storage Capacity',
    subtitle: 'Total allocated storage',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#3b82f6',
    category: 'Storage',
    used: 380,
    limit: 500,
    unit: 'GB',
    status: 'Normal',
    trend: 'up',
    trendValue: '+5%',
    resetPeriod: 'None',
    lastReset: '—',
    nextReset: '—',
    iconType: 'hdd',
    iconColor: '#3b82f6',
    requestable: true,
  },
  {
    id: 'q-3',
    name: 'LLM Token Usage',
    subtitle: 'GPT-4o & GPT-4.1 tokens',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#3b82f6',
    category: 'AI Models',
    used: 4200000,
    limit: 5000000,
    unit: 'tokens/mo',
    status: 'Warning',
    trend: 'up',
    trendValue: '+18%',
    resetPeriod: 'Monthly',
    lastReset: 'Jul 1, 2025',
    nextReset: 'Aug 1, 2025',
    iconType: 'brain',
    iconColor: '#a855f7',
    requestable: true,
  },
  {
    id: 'q-4',
    name: 'Compute Hours',
    subtitle: 'vCPU processing time',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    category: 'Compute',
    used: 1250,
    limit: 2000,
    unit: 'hours/mo',
    status: 'Normal',
    trend: 'down',
    trendValue: '-3%',
    resetPeriod: 'Monthly',
    lastReset: 'Jul 1, 2025',
    nextReset: 'Aug 1, 2025',
    iconType: 'cpu',
    iconColor: '#10b981',
    requestable: true,
  },
  {
    id: 'q-5',
    name: 'Embedding Generations',
    subtitle: 'text-embedding-3-small',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    category: 'AI Models',
    used: 920000,
    limit: 1000000,
    unit: 'embeddings/mo',
    status: 'Critical',
    trend: 'up',
    trendValue: '+22%',
    resetPeriod: 'Monthly',
    lastReset: 'Jul 1, 2025',
    nextReset: 'Aug 1, 2025',
    iconType: 'brain',
    iconColor: '#ef4444',
    requestable: true,
  },
  {
    id: 'q-6',
    name: 'Concurrent Connections',
    subtitle: 'Max simultaneous connections',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    category: 'Network',
    used: 485,
    limit: 500,
    unit: 'connections',
    status: 'Exceeded',
    trend: 'up',
    trendValue: '+8%',
    resetPeriod: 'None',
    lastReset: '—',
    nextReset: '—',
    iconType: 'network',
    iconColor: '#ef4444',
    requestable: true,
  },
  {
    id: 'q-7',
    name: 'GPU Memory',
    subtitle: 'Allocated GPU VRAM',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#3b82f6',
    category: 'Compute',
    used: 28,
    limit: 48,
    unit: 'GB',
    status: 'Normal',
    trend: 'stable',
    trendValue: '0%',
    resetPeriod: 'None',
    lastReset: '—',
    nextReset: '—',
    iconType: 'gpu',
    iconColor: '#06b6d4',
    requestable: true,
  },
  {
    id: 'q-8',
    name: 'Bandwidth',
    subtitle: 'Monthly data transfer',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    category: 'Network',
    used: 180,
    limit: 500,
    unit: 'GB/mo',
    status: 'Normal',
    trend: 'down',
    trendValue: '-7%',
    resetPeriod: 'Monthly',
    lastReset: 'Jul 1, 2025',
    nextReset: 'Aug 1, 2025',
    iconType: 'bandwidth',
    iconColor: '#10b981',
    requestable: true,
  },
  {
    id: 'q-9',
    name: 'Memory Allocation',
    subtitle: 'Max RAM per workspace',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    category: 'Compute',
    used: 52,
    limit: 64,
    unit: 'GB',
    status: 'Warning',
    trend: 'up',
    trendValue: '+4%',
    resetPeriod: 'None',
    lastReset: '—',
    nextReset: '—',
    iconType: 'memory',
    iconColor: '#f59e0b',
    requestable: true,
  },
  {
    id: 'q-10',
    name: 'Ingestion Rate',
    subtitle: 'Records per second limit',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    category: 'API',
    used: 8500,
    limit: 10000,
    unit: 'records/sec',
    status: 'Warning',
    trend: 'up',
    trendValue: '+15%',
    resetPeriod: 'None',
    lastReset: '—',
    nextReset: '—',
    iconType: 'api',
    iconColor: '#f59e0b',
    requestable: true,
  },
];

type TabKey = 'All Quotas' | 'Compute' | 'Storage' | 'API' | 'AI Models' | 'Network';
type SortKey = 'name' | 'usage' | 'status' | 'workspace';
type SortDir = 'asc' | 'desc';

const ITEMS_PER_PAGE = 6;

export default function TenantQuota() {
  const { addToast } = useToast();
  const [quotas, setQuotas] = useState<QuotaItem[]>(INITIAL_QUOTAS);
  const [activeTab, setActiveTab] = useState<TabKey>('All Quotas');
  const [searchQuery, setSearchQuery] = useState('');
  const [workspaceFilter, setWorkspaceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuota, setSelectedQuota] = useState<QuotaItem | null>(null);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustTarget, setAdjustTarget] = useState<QuotaItem | null>(null);
  const [newLimit, setNewLimit] = useState('');
  const [adjustReason, setAdjustReason] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const tabs: TabKey[] = ['All Quotas', 'Compute', 'Storage', 'API', 'AI Models', 'Network'];

  const tabCounts = useMemo(() => {
    const counts: Record<TabKey, number> = {
      'All Quotas': quotas.length,
      Compute: 0, Storage: 0, API: 0, 'AI Models': 0, Network: 0,
    };
    quotas.forEach(q => { counts[q.category] = (counts[q.category] || 0) + 1; });
    return counts;
  }, [quotas]);

  // Summary metrics
  const totalQuotas = quotas.length;
  const warningCount = quotas.filter(q => q.status === 'Warning').length;
  const criticalCount = quotas.filter(q => q.status === 'Critical' || q.status === 'Exceeded').length;
  const normalCount = quotas.filter(q => q.status === 'Normal').length;

  const workspaces = useMemo(() => Array.from(new Set(quotas.map(q => q.workspace))), [quotas]);

  const filtered = useMemo(() => {
    let list = [...quotas];
    if (activeTab !== 'All Quotas') list = list.filter(q => q.category === activeTab);
    if (searchQuery) {
      const lq = searchQuery.toLowerCase();
      list = list.filter(q => q.name.toLowerCase().includes(lq) || q.subtitle.toLowerCase().includes(lq));
    }
    if (workspaceFilter !== 'all') list = list.filter(q => q.workspace === workspaceFilter);
    if (statusFilter !== 'all') list = list.filter(q => q.status === statusFilter);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'usage') cmp = (a.used / a.limit) - (b.used / b.limit);
      else if (sortKey === 'status') {
        const order = { Exceeded: 0, Critical: 1, Warning: 2, Normal: 3 };
        cmp = order[a.status] - order[b.status];
      } else if (sortKey === 'workspace') cmp = a.workspace.localeCompare(b.workspace);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [quotas, activeTab, searchQuery, workspaceFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((validCurrentPage - 1) * ITEMS_PER_PAGE, validCurrentPage * ITEMS_PER_PAGE);

  const formatNumber = (n: number): string => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  const getUsagePercent = (q: QuotaItem) => Math.min(100, Math.round((q.used / q.limit) * 100));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return '#10b981';
      case 'Warning': return '#f59e0b';
      case 'Critical': return '#ef4444';
      case 'Exceeded': return '#dc2626';
      default: return '#64748b';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Normal': return 'rgba(16, 185, 129, 0.12)';
      case 'Warning': return 'rgba(245, 158, 11, 0.12)';
      case 'Critical': return 'rgba(239, 68, 68, 0.12)';
      case 'Exceeded': return 'rgba(220, 38, 38, 0.15)';
      default: return 'rgba(100, 116, 139, 0.12)';
    }
  };

  const getUsageBarColor = (percent: number) => {
    if (percent >= 100) return 'linear-gradient(90deg, #dc2626, #ef4444)';
    if (percent >= 90) return 'linear-gradient(90deg, #ef4444, #f87171)';
    if (percent >= 75) return 'linear-gradient(90deg, #f59e0b, #fbbf24)';
    return 'linear-gradient(90deg, #10b981, #34d399)';
  };

  const getQuotaIcon = (iconType: string) => {
    switch (iconType) {
      case 'cpu': return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <rect x="9" y="9" width="6" height="6"/>
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>
        </svg>
      );
      case 'hdd': return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12H2"/>
          <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
          <line x1="6" y1="16" x2="6.01" y2="16"/>
          <line x1="10" y1="16" x2="10.01" y2="16"/>
        </svg>
      );
      case 'api': return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 20l4-16"/>
          <path d="M6 8l-4 4 4 4"/>
          <path d="M18 8l4 4-4 4"/>
        </svg>
      );
      case 'brain': return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44A2.5 2.5 0 015 17.5a2.5 2.5 0 01.49-4.78A2.5 2.5 0 017 9.5a2.5 2.5 0 012.5-2.5"/>
          <path d="M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44A2.5 2.5 0 0019 17.5a2.5 2.5 0 00-.49-4.78A2.5 2.5 0 0017 9.5a2.5 2.5 0 00-2.5-2.5"/>
        </svg>
      );
      case 'network': return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10"/>
        </svg>
      );
      case 'memory': return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/>
          <path d="M6 6V4M10 6V4M14 6V4M18 6V4M6 18v2M10 18v2M14 18v2M18 18v2"/>
        </svg>
      );
      case 'gpu': return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="10" rx="2"/>
          <path d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2"/>
          <circle cx="8" cy="12" r="1.5"/>
          <circle cx="16" cy="12" r="1.5"/>
          <path d="M11 10v4M13 10v4"/>
        </svg>
      );
      case 'bandwidth': return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0114.08 0"/>
          <path d="M1.42 9a16 16 0 0121.16 0"/>
          <path d="M8.53 16.11a6 6 0 016.95 0"/>
          <circle cx="12" cy="20" r="1"/>
        </svg>
      );
      default: return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      );
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return '↕';
    return sortDir === 'asc' ? '↑' : '↓';
  };

  const handleRequestIncrease = (quota: QuotaItem) => {
    setAdjustTarget(quota);
    setNewLimit(String(Math.round(quota.limit * 1.5)));
    setAdjustReason('');
    setIsAdjustModalOpen(true);
  };

  const handleSubmitAdjust = () => {
    if (!adjustTarget) return;
    const newLimitVal = parseInt(newLimit);
    if (isNaN(newLimitVal) || newLimitVal <= 0) {
      addToast('Please enter a valid limit value', 'error');
      return;
    }
    setQuotas(prev => prev.map(q => q.id === adjustTarget.id ? {
      ...q,
      limit: newLimitVal,
      status: (q.used / newLimitVal) >= 1 ? 'Exceeded' :
              (q.used / newLimitVal) >= 0.9 ? 'Critical' :
              (q.used / newLimitVal) >= 0.75 ? 'Warning' : 'Normal',
    } : q));
    addToast(`Quota limit for "${adjustTarget.name}" updated to ${formatNumber(newLimitVal)} ${adjustTarget.unit}`, 'success');
    setIsAdjustModalOpen(false);
    setAdjustTarget(null);
  };

  const handleRowClick = (quota: QuotaItem) => {
    setSelectedQuota(selectedQuota?.id === quota.id ? null : quota);
  };

  // ──────────────────────── Render ────────────────────────
  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
      {/* ───── Header ───── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: '#fff' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </span>
            Quota Management
          </h1>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 6, marginBottom: 0 }}>Monitor and manage resource quotas across workspaces</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => addToast('Quota report exported successfully', 'success')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', fontSize: 13, fontWeight: 500,
              color: '#cbd5e1', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Report
          </button>
          <button
            onClick={() => addToast('Request quota increase form opened', 'info')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', fontSize: 13, fontWeight: 600,
              color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', border: 'none',
              borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(139, 92, 246, 0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(139, 92, 246, 0.3)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Request Increase
          </button>
        </div>
      </div>

      {/* ───── Metric Cards ───── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {/* Total Quotas */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 22px',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Total Quotas</span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(139, 92, 246, 0.12)', color: '#a78bfa' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </span>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.5px' }}>{totalQuotas}</span>
          <span style={{ fontSize: 12, color: '#64748b' }}>across {workspaces.length} workspaces</span>
        </div>

        {/* Normal */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 22px',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Normal</span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#10b981', letterSpacing: '-0.5px' }}>{normalCount}</span>
          <span style={{ fontSize: 12, color: '#64748b' }}>within healthy limits</span>
        </div>

        {/* Warning */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 22px',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Warning</span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </span>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#f59e0b', letterSpacing: '-0.5px' }}>{warningCount}</span>
          <span style={{ fontSize: 12, color: '#64748b' }}>approaching limits</span>
        </div>

        {/* Critical / Exceeded */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '20px 22px',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Critical / Exceeded</span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'rgba(239, 68, 68, 0.12)', color: '#f87171' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </span>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#ef4444', letterSpacing: '-0.5px' }}>{criticalCount}</span>
          <span style={{ fontSize: 12, color: '#64748b' }}>require attention</span>
        </div>
      </div>

      {/* ───── Tabs ───── */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            style={{
              padding: '8px 16px', fontSize: 13, fontWeight: activeTab === tab ? 600 : 500,
              color: activeTab === tab ? '#f1f5f9' : '#94a3b8',
              background: activeTab === tab ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              border: activeTab === tab ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
              borderRadius: 7, cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {tab}
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '1px 7px', borderRadius: 10,
              background: activeTab === tab ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255,255,255,0.06)',
              color: activeTab === tab ? '#c4b5fd' : '#64748b',
            }}>{tabCounts[tab]}</span>
          </button>
        ))}
      </div>

      {/* ───── Search & Filters ───── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 280px', minWidth: 220 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search quotas..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            style={{
              width: '100%', padding: '9px 14px 9px 36px', fontSize: 13, color: '#e2e8f0',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <select
          value={workspaceFilter}
          onChange={e => { setWorkspaceFilter(e.target.value); setCurrentPage(1); }}
          style={{
            padding: '9px 14px', fontSize: 13, color: '#e2e8f0',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, outline: 'none', cursor: 'pointer', minWidth: 160,
          }}
        >
          <option value="all">All Workspaces</option>
          {workspaces.map(w => <option key={w} value={w}>{w}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          style={{
            padding: '9px 14px', fontSize: 13, color: '#e2e8f0',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, outline: 'none', cursor: 'pointer', minWidth: 140,
          }}
        >
          <option value="all">All Statuses</option>
          <option value="Normal">Normal</option>
          <option value="Warning">Warning</option>
          <option value="Critical">Critical</option>
          <option value="Exceeded">Exceeded</option>
        </select>
      </div>

      {/* ───── Main Content: Table + Detail Panel ───── */}
      <div style={{ display: 'flex', gap: 20 }}>
        {/* Quota Table */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, overflow: 'hidden',
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedQuota ? '2fr 1fr 2fr 100px 120px' : '2fr 1fr 1fr 2fr 100px 120px',
              padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <span onClick={() => handleSort('name')} style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', userSelect: 'none' }}>
                Quota {getSortIcon('name')}
              </span>
              {!selectedQuota && (
                <span onClick={() => handleSort('workspace')} style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', userSelect: 'none' }}>
                  Workspace {getSortIcon('workspace')}
                </span>
              )}
              <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</span>
              <span onClick={() => handleSort('usage')} style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', userSelect: 'none' }}>
                Usage {getSortIcon('usage')}
              </span>
              <span onClick={() => handleSort('status')} style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', userSelect: 'none' }}>
                Status {getSortIcon('status')}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</span>
            </div>

            {/* Table Rows */}
            {paginated.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" style={{ marginBottom: 12 }}>
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <p style={{ fontSize: 14, color: '#94a3b8', margin: 0 }}>No quotas match your filters</p>
              </div>
            ) : (
              paginated.map(quota => {
                const percent = getUsagePercent(quota);
                const isSelected = selectedQuota?.id === quota.id;
                const isHovered = hoveredRow === quota.id;
                return (
                  <div
                    key={quota.id}
                    onClick={() => handleRowClick(quota)}
                    onMouseEnter={() => setHoveredRow(quota.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: selectedQuota ? '2fr 1fr 2fr 100px 120px' : '2fr 1fr 1fr 2fr 100px 120px',
                      padding: '14px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: isSelected ? 'rgba(139, 92, 246, 0.08)' : isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                      alignItems: 'center',
                      borderLeft: isSelected ? '3px solid #8b5cf6' : '3px solid transparent',
                    }}
                  >
                    {/* Quota Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: `rgba(${quota.iconColor === '#8b5cf6' ? '139,92,246' : quota.iconColor === '#3b82f6' ? '59,130,246' : quota.iconColor === '#10b981' ? '16,185,129' : quota.iconColor === '#f59e0b' ? '245,158,11' : quota.iconColor === '#a855f7' ? '168,85,247' : quota.iconColor === '#ef4444' ? '239,68,68' : quota.iconColor === '#06b6d4' ? '6,182,212' : quota.iconColor === '#dc2626' ? '220,38,38' : '100,116,139'}, 0.15)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: quota.iconColor, flexShrink: 0,
                      }}>
                        {getQuotaIcon(quota.iconType)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{quota.name}</div>
                        <div style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{quota.subtitle}</div>
                      </div>
                    </div>

                    {/* Workspace */}
                    {!selectedQuota && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 6, background: quota.workspaceBg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>{quota.workspaceCode}</div>
                        <span style={{ fontSize: 12, color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{quota.workspace}</span>
                      </div>
                    )}

                    {/* Category */}
                    <div>
                      <span style={{
                        fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 6,
                        background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
                      }}>{quota.category}</span>
                    </div>

                    {/* Usage Bar */}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{formatNumber(quota.used)} <span style={{ color: '#64748b', fontWeight: 400 }}>/ {formatNumber(quota.limit)}</span></span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: percent >= 90 ? '#ef4444' : percent >= 75 ? '#f59e0b' : '#10b981' }}>{percent}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: 3, width: `${Math.min(100, percent)}%`,
                          background: getUsageBarColor(percent),
                          transition: 'width 0.5s ease',
                        }} />
                      </div>
                      <div style={{ fontSize: 10, color: '#64748b', marginTop: 3 }}>{quota.unit}</div>
                    </div>

                    {/* Status */}
                    <div>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600,
                        padding: '4px 10px', borderRadius: 6,
                        background: getStatusBg(quota.status), color: getStatusColor(quota.status),
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: getStatusColor(quota.status) }} />
                        {quota.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRequestIncrease(quota); }}
                        title="Adjust Limit"
                        style={{
                          width: 30, height: 30, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.04)', color: '#94a3b8',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.15s', fontSize: 14,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)'; e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10M6 20v-4M18 20v-8"/></svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); addToast(`Refreshing "${quota.name}" usage data...`, 'info'); }}
                        title="Refresh"
                        style={{
                          width: 30, height: 30, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.04)', color: '#94a3b8',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.15s', fontSize: 14,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)'; e.currentTarget.style.color = '#93c5fd'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.01)',
              }}>
                <span style={{ fontSize: 12, color: '#64748b' }}>
                  Showing {(validCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(validCurrentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={validCurrentPage === 1}
                    style={{
                      width: 30, height: 30, borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.04)',
                      color: validCurrentPage === 1 ? '#475569' : '#cbd5e1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: validCurrentPage === 1 ? 'not-allowed' : 'pointer',
                      fontSize: 14, transition: 'all 0.15s',
                    }}
                  >‹</button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      style={{
                        width: 30, height: 30, borderRadius: 6,
                        border: validCurrentPage === i + 1 ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid rgba(255,255,255,0.08)',
                        background: validCurrentPage === i + 1 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.04)',
                        color: validCurrentPage === i + 1 ? '#c4b5fd' : '#94a3b8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontSize: 12, fontWeight: validCurrentPage === i + 1 ? 600 : 400,
                        transition: 'all 0.15s',
                      }}
                    >{i + 1}</button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={validCurrentPage === totalPages}
                    style={{
                      width: 30, height: 30, borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.04)',
                      color: validCurrentPage === totalPages ? '#475569' : '#cbd5e1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: validCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                      fontSize: 14, transition: 'all 0.15s',
                    }}
                  >›</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ───── Detail Panel ───── */}
        {selectedQuota && (
          <div style={{
            width: 370, flexShrink: 0, background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14,
            padding: 0, overflow: 'hidden',
          }}>
            {/* Detail Header */}
            <div style={{
              padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `rgba(${selectedQuota.iconColor === '#8b5cf6' ? '139,92,246' : selectedQuota.iconColor === '#3b82f6' ? '59,130,246' : selectedQuota.iconColor === '#10b981' ? '16,185,129' : selectedQuota.iconColor === '#f59e0b' ? '245,158,11' : selectedQuota.iconColor === '#a855f7' ? '168,85,247' : selectedQuota.iconColor === '#ef4444' ? '239,68,68' : selectedQuota.iconColor === '#06b6d4' ? '6,182,212' : selectedQuota.iconColor === '#dc2626' ? '220,38,38' : '100,116,139'}, 0.15)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: selectedQuota.iconColor,
                }}>
                  {getQuotaIcon(selectedQuota.iconType)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9' }}>{selectedQuota.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{selectedQuota.subtitle}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedQuota(null)}
                style={{
                  width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
                  background: 'transparent', color: '#64748b', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}
              >×</button>
            </div>

            {/* Usage Ring */}
            <div style={{ padding: '24px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ position: 'relative', display: 'inline-block', width: 120, height: 120 }}>
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="52" fill="none"
                    stroke={getStatusColor(selectedQuota.status)}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - Math.min(1, selectedQuota.used / selectedQuota.limit))}`}
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9' }}>{getUsagePercent(selectedQuota)}%</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>used</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>{formatNumber(selectedQuota.used)}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Used</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>{formatNumber(selectedQuota.limit)}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Limit</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>{formatNumber(selectedQuota.limit - selectedQuota.used)}</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Remaining</div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div style={{ padding: '16px 20px' }}>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12, marginTop: 0 }}>Details</h4>
              {[
                { label: 'Status', value: selectedQuota.status, isStatus: true },
                { label: 'Category', value: selectedQuota.category },
                { label: 'Workspace', value: selectedQuota.workspace },
                { label: 'Unit', value: selectedQuota.unit },
                { label: 'Trend', value: selectedQuota.trendValue, isTrend: true },
                { label: 'Reset Period', value: selectedQuota.resetPeriod },
                { label: 'Last Reset', value: selectedQuota.lastReset },
                { label: 'Next Reset', value: selectedQuota.nextReset },
              ].map((detail, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0', borderBottom: i < 7 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{detail.label}</span>
                  {detail.isStatus ? (
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 5,
                      background: getStatusBg(detail.value!), color: getStatusColor(detail.value!),
                    }}>
                      <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: getStatusColor(detail.value!), marginRight: 5 }} />
                      {detail.value}
                    </span>
                  ) : (detail as any).isTrend ? (
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: selectedQuota.trend === 'up' ? '#ef4444' : selectedQuota.trend === 'down' ? '#10b981' : '#64748b',
                    }}>
                      {selectedQuota.trend === 'up' ? '↑' : selectedQuota.trend === 'down' ? '↓' : '→'} {detail.value}
                    </span>
                  ) : (
                    <span style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 500 }}>{detail.value}</span>
                  )}
                </div>
              ))}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button
                  onClick={() => handleRequestIncrease(selectedQuota)}
                  style={{
                    flex: 1, padding: '9px 14px', fontSize: 12, fontWeight: 600,
                    color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    border: 'none', borderRadius: 8, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >Adjust Limit</button>
                <button
                  onClick={() => addToast(`Usage history opened for "${selectedQuota.name}"`, 'info')}
                  style={{
                    flex: 1, padding: '9px 14px', fontSize: 12, fontWeight: 600,
                    color: '#cbd5e1', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                >View History</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ───── Adjust Limit Modal ───── */}
      {isAdjustModalOpen && adjustTarget && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)',
        }} onClick={() => setIsAdjustModalOpen(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 480, background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Adjust Quota Limit</h3>
                <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0' }}>{adjustTarget.name}</p>
              </div>
              <button
                onClick={() => setIsAdjustModalOpen(false)}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
                  background: 'transparent', color: '#94a3b8', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}
              >×</button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 24px' }}>
              {/* Current Usage Summary */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: 16, marginBottom: 20,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>Current Usage</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: getStatusColor(adjustTarget.status) }}>{getUsagePercent(adjustTarget)}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{
                    height: '100%', borderRadius: 4,
                    width: `${Math.min(100, getUsagePercent(adjustTarget))}%`,
                    background: getUsageBarColor(getUsagePercent(adjustTarget)),
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
                  <span>{formatNumber(adjustTarget.used)} {adjustTarget.unit} used</span>
                  <span>{formatNumber(adjustTarget.limit)} {adjustTarget.unit} limit</span>
                </div>
              </div>

              {/* New Limit Input */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>New Limit ({adjustTarget.unit})</label>
                <input
                  type="number"
                  value={newLimit}
                  onChange={e => setNewLimit(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px', fontSize: 14, color: '#e2e8f0',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8, outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                {newLimit && parseInt(newLimit) > 0 && (
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>
                    New usage would be <strong style={{ color: '#e2e8f0' }}>{Math.round((adjustTarget.used / parseInt(newLimit)) * 100)}%</strong> of the new limit
                  </div>
                )}
              </div>

              {/* Reason */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>Reason for adjustment (optional)</label>
                <textarea
                  value={adjustReason}
                  onChange={e => setAdjustReason(e.target.value)}
                  placeholder="Explain why the quota limit needs to be changed..."
                  rows={3}
                  style={{
                    width: '100%', padding: '10px 14px', fontSize: 13, color: '#e2e8f0',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8, outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', justifyContent: 'flex-end', gap: 10,
            }}>
              <button
                onClick={() => setIsAdjustModalOpen(false)}
                style={{
                  padding: '9px 18px', fontSize: 13, fontWeight: 500,
                  color: '#94a3b8', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              >Cancel</button>
              <button
                onClick={handleSubmitAdjust}
                style={{
                  padding: '9px 22px', fontSize: 13, fontWeight: 600,
                  color: '#fff', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  border: 'none', borderRadius: 8, cursor: 'pointer',
                  transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(139, 92, 246, 0.3)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(139, 92, 246, 0.3)'; }}
              >Apply Change</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
