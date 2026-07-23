import React, { useState, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

export interface SecretItem {
  id: string;
  keyName: string;
  subtitle: string;
  category: 'API Tokens' | 'Database Credentials' | 'Certificates & Keys' | 'Environment Vars';
  environment: 'Production' | 'Staging' | 'Development';
  workspace: string;
  workspaceCode: string;
  workspaceBg: string;
  maskedValue: string;
  realValue: string;
  isRevealed?: boolean;
  rotationPolicy: string;
  lastUpdated: string;
  updatedBy: string;
  status: 'Active' | 'Expiring' | 'Revoked';
  expiresInDays?: number;
}

const INITIAL_SECRETS: SecretItem[] = [
  {
    id: 'sec-1',
    keyName: 'OPENAI_API_KEY',
    subtitle: 'Primary API key for GPT-4o model inference',
    category: 'API Tokens',
    environment: 'Production',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#8b5cf6',
    maskedValue: 'sk-proj-••••••••••••••••••••••••',
    realValue: 'sk-proj-948fjk209310492810948210948201',
    rotationPolicy: 'Auto (30 days)',
    lastUpdated: 'May 21, 2025 10:30 AM',
    updatedBy: 'Mukesh Kumar',
    status: 'Active',
  },
  {
    id: 'sec-2',
    keyName: 'POSTGRES_DB_PASSWORD',
    subtitle: 'Production database superuser credential',
    category: 'Database Credentials',
    environment: 'Production',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#3b82f6',
    maskedValue: '••••••••••••••••••••',
    realValue: 'P@ssw0rd_Super_Secure_2025!',
    rotationPolicy: 'Auto (60 days)',
    lastUpdated: 'May 20, 2025 04:15 PM',
    updatedBy: 'Mukesh Kumar',
    status: 'Active',
  },
  {
    id: 'sec-3',
    keyName: 'JWT_SIGNING_SECRET',
    subtitle: 'HS256 symmetric key for auth token signing',
    category: 'Certificates & Keys',
    environment: 'Production',
    workspace: 'Security Operations',
    workspaceCode: 'SO',
    workspaceBg: '#ef4444',
    maskedValue: '••••••••••••••••••••••••••••••••',
    realValue: 'c7d9a1e4f6b80235791abdcef0123456789abcdef',
    rotationPolicy: 'Manual',
    lastUpdated: 'May 19, 2025 11:20 AM',
    updatedBy: 'Piyush Sharma',
    status: 'Active',
  },
  {
    id: 'sec-4',
    keyName: 'ANTHROPIC_CLAUDE_TOKEN',
    subtitle: 'API access key for Claude 3.5 Sonnet',
    category: 'API Tokens',
    environment: 'Production',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#8b5cf6',
    maskedValue: 'sk-ant-••••••••••••••••••••••••',
    realValue: 'sk-ant-api03-8201948102948102948102948',
    rotationPolicy: 'Auto (30 days)',
    lastUpdated: 'May 18, 2025 08:45 PM',
    updatedBy: 'Mukesh Kumar',
    status: 'Expiring',
    expiresInDays: 3,
  },
  {
    id: 'sec-5',
    keyName: 'AWS_SECRET_ACCESS_KEY',
    subtitle: 'S3 storage & Bedrock IAM credential',
    category: 'Environment Vars',
    environment: 'Staging',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    maskedValue: '••••••••••••••••••••••••••••••••••••••••',
    realValue: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    rotationPolicy: 'Auto (90 days)',
    lastUpdated: 'May 17, 2025 02:10 PM',
    updatedBy: 'Rohit Verma',
    status: 'Active',
  },
  {
    id: 'sec-6',
    keyName: 'STRIPE_WEBHOOK_SECRET',
    subtitle: 'HMAC signature key for billing telemetry',
    category: 'API Tokens',
    environment: 'Production',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#3b82f6',
    maskedValue: 'whsec_••••••••••••••••••••••••',
    realValue: 'whsec_920184910294810294810294810294',
    rotationPolicy: 'Manual',
    lastUpdated: 'May 15, 2025 09:30 AM',
    updatedBy: 'Mukesh Kumar',
    status: 'Active',
  },
  {
    id: 'sec-7',
    keyName: 'SSL_TLS_PRIVATE_KEY',
    subtitle: 'RSA 4096 private key for TLS endpoint',
    category: 'Certificates & Keys',
    environment: 'Development',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    maskedValue: '-----BEGIN PRIVATE KEY----- ••••',
    realValue: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...',
    rotationPolicy: 'Manual',
    lastUpdated: 'May 12, 2025 06:15 PM',
    updatedBy: 'Rohit Verma',
    status: 'Revoked',
  },
  {
    id: 'sec-8',
    keyName: 'REDIS_CACHE_PASSWORD',
    subtitle: 'AUTH token for cluster caching tier',
    category: 'Database Credentials',
    environment: 'Staging',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#3b82f6',
    maskedValue: '••••••••••••••••',
    realValue: 'redis_staging_pass_99812',
    rotationPolicy: 'Auto (60 days)',
    lastUpdated: 'May 10, 2025 10:00 AM',
    updatedBy: 'Piyush Sharma',
    status: 'Active',
  },
];

export default function TenantSecrets() {
  const { addToast } = useToast();

  const [secrets, setSecrets] = useState<SecretItem[]>(INITIAL_SECRETS);
  const [activeTab, setActiveTab] = useState<'All' | 'API Tokens' | 'Database Credentials' | 'Certificates & Keys' | 'Environment Vars'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [envFilter, setEnvFilter] = useState('All');
  const [workspaceFilter, setWorkspaceFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'recently_updated' | 'name'>('recently_updated');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State for "+ Create Secret"
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'API Tokens' | 'Database Credentials' | 'Certificates & Keys' | 'Environment Vars'>('API Tokens');
  const [newEnv, setNewEnv] = useState<'Production' | 'Staging' | 'Development'>('Production');
  const [newWorkspace, setNewWorkspace] = useState('AI Innovation Lab');
  const [newValue, setNewValue] = useState('');
  const [newRotation, setNewRotation] = useState('Auto (30 days)');

  // Dropdown open ID
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleCreateSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim() || !newValue.trim()) {
      addToast('Please provide both Key Name and Secret Value', 'error');
      return;
    }

    const formattedKey = newKeyName.toUpperCase().replace(/[^A-Z0-9_]+/g, '_');
    const newSecret: SecretItem = {
      id: `sec-${Date.now()}`,
      keyName: formattedKey,
      subtitle: newSubtitle.trim() || 'Custom encrypted secret token.',
      category: newCategory,
      environment: newEnv,
      workspace: newWorkspace,
      workspaceCode: newWorkspace.substring(0, 2).toUpperCase(),
      workspaceBg: '#8b5cf6',
      maskedValue: '••••••••••••••••••••',
      realValue: newValue,
      rotationPolicy: newRotation,
      lastUpdated: 'Just now',
      updatedBy: 'Mukesh Kumar',
      status: 'Active',
    };

    setSecrets([newSecret, ...secrets]);
    setIsCreateModalOpen(false);
    setNewKeyName('');
    setNewSubtitle('');
    setNewValue('');
    addToast(`Secret "${newSecret.keyName}" created successfully!`, 'success');
  };

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => {
      const nextState = !prev[id];
      if (nextState) {
        addToast('Secret revealed temporarily', 'info');
      }
      return { ...prev, [id]: nextState };
    });
  };

  const copySecretValue = (val: string, name: string) => {
    navigator.clipboard.writeText(val);
    addToast(`Copied value for "${name}" to clipboard`, 'info');
  };

  const handleRotateSecret = (id: string, name: string) => {
    setSecrets(prev =>
      prev.map(s =>
        s.id === id
          ? {
              ...s,
              lastUpdated: 'Just now',
              status: 'Active',
              expiresInDays: undefined,
            }
          : s
      )
    );
    setOpenMenuId(null);
    addToast(`Secret "${name}" rotated successfully!`, 'success');
  };

  const handleDeleteSecret = (id: string, name: string) => {
    setSecrets(prev => prev.filter(s => s.id !== id));
    setOpenMenuId(null);
    addToast(`Deleted secret "${name}"`, 'success');
  };

  // KPI Calculations
  const totalCount = secrets.length;
  const activeCount = secrets.filter(s => s.status === 'Active').length;
  const rotatedCount = secrets.filter(s => s.rotationPolicy.startsWith('Auto')).length;
  const expiringCount = secrets.filter(s => s.status === 'Expiring' || (s.expiresInDays && s.expiresInDays <= 7)).length;

  // Filtered Secrets
  const filteredSecrets = useMemo(() => {
    return secrets.filter(s => {
      // Category Tab Filter
      if (activeTab !== 'All' && s.category !== activeTab) return false;

      // Env Filter
      if (envFilter !== 'All' && s.environment !== envFilter) return false;

      // Workspace Filter
      if (workspaceFilter !== 'All' && s.workspace !== workspaceFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = s.keyName.toLowerCase().includes(q);
        const matchSub = s.subtitle.toLowerCase().includes(q);
        const matchWs = s.workspace.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchWs) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.keyName.localeCompare(b.keyName);
      }
      return 0;
    });
  }, [secrets, activeTab, envFilter, workspaceFilter, searchQuery, sortBy]);

  // Pagination calculation
  const totalFilteredCount = filteredSecrets.length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedSecrets = filteredSecrets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Secrets</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6, margin: 0 }}>
            Securely store, rotate, and manage environment variables, API tokens, and encryption keys.{' '}
            <a
              href="#learn-more"
              onClick={e => {
                e.preventDefault();
                addToast('Opening Secrets management documentation', 'info');
              }}
              style={{ color: '#a855f7', textDecoration: 'none', marginLeft: 4 }}
            >
              Learn more ↗
            </a>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => addToast('Help: Secrets Vault Security & KMS Integration', 'info')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 18,
              padding: 4,
            }}
            title="Help"
          >
            ?
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 18px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Create Secret
          </button>
        </div>
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {/* Card 1: Total Secrets */}
        <div
          className="widget"
          style={{
            padding: '20px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: 'rgba(234, 179, 8, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 22 }}>🤫</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Secrets</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalCount}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Configured across workspaces
            </span>
          </div>
        </div>

        {/* Card 2: Active Secrets */}
        <div
          className="widget"
          style={{
            padding: '20px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#10b981',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              ✓
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Active Secrets</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {activeCount}
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              Currently active
            </span>
          </div>
        </div>

        {/* Card 3: Auto-Rotated */}
        <div
          className="widget"
          style={{
            padding: '20px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: 'rgba(139, 92, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Auto-Rotated</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {rotatedCount}
            </span>
            <span style={{ fontSize: 12, color: '#c084fc', fontWeight: 500, marginTop: 4 }}>
              Scheduled rotation enabled
            </span>
          </div>
        </div>

        {/* Card 4: Expiring Soon */}
        <div
          className="widget"
          style={{
            padding: '20px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Expiring Soon</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {expiringCount}
            </span>
            <span style={{ fontSize: 12, color: '#fbbf24', fontWeight: 500, marginTop: 4 }}>
              Expires within 7 days
            </span>
          </div>
        </div>
      </div>

      {/* Tabs and Controls Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: 12,
          gap: 16,
        }}
      >
        {/* Left Category Tabs */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { key: 'All', label: 'All Secrets', count: totalCount },
            { key: 'API Tokens', label: 'API Tokens', count: secrets.filter(s => s.category === 'API Tokens').length },
            { key: 'Database Credentials', label: 'Database Credentials', count: secrets.filter(s => s.category === 'Database Credentials').length },
            { key: 'Certificates & Keys', label: 'Certificates & Keys', count: secrets.filter(s => s.category === 'Certificates & Keys').length },
            { key: 'Environment Vars', label: 'Environment Vars', count: secrets.filter(s => s.category === 'Environment Vars').length },
          ].map(t => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => {
                  setActiveTab(t.key as any);
                  setCurrentPage(1);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  paddingBottom: 12,
                  marginBottom: -13,
                  borderBottom: isActive ? '2px solid #8b5cf6' : '2px solid transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s ease',
                }}
              >
                {t.label} {t.count > 0 && <span style={{ opacity: 0.8, fontSize: 13 }}>({t.count})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Inputs Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {/* Search Field */}
        <div style={{ position: 'relative' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by key name or workspace..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '10px 14px 10px 40px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
            }}
          />
        </div>

        {/* Environment Filter Dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={envFilter}
            onChange={e => {
              setEnvFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '10px 12px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="All">All Environments</option>
            <option value="Production">Production</option>
            <option value="Staging">Staging</option>
            <option value="Development">Development</option>
          </select>
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
        </div>

        {/* Workspace Filter Dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={workspaceFilter}
            onChange={e => {
              setWorkspaceFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '10px 12px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="All">All Workspaces</option>
            <option value="AI Innovation Lab">AI Innovation Lab</option>
            <option value="Data Platform">Data Platform</option>
            <option value="Security Operations">Security Operations</option>
            <option value="Product Development">Product Development</option>
          </select>
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
        </div>

        {/* Sort Dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '10px 12px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="recently_updated">Sort by: Recently Updated</option>
            <option value="name">Sort by: Key Name (A-Z)</option>
          </select>
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
        </div>
      </div>

      {/* Main Secrets Table */}
      <div
        className="widget"
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '14px 20px' }}>Secret Name</th>
              <th style={{ padding: '14px 20px' }}>Environment</th>
              <th style={{ padding: '14px 20px' }}>Workspace</th>
              <th style={{ padding: '14px 20px' }}>Secret Value</th>
              <th style={{ padding: '14px 20px' }}>Rotation</th>
              <th style={{ padding: '14px 20px' }}>Last Updated</th>
              <th style={{ padding: '14px 20px' }}>Status</th>
              <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSecrets.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No secrets found matching filters.
                </td>
              </tr>
            ) : (
              paginatedSecrets.map(s => {
                const isRevealed = revealedIds[s.id];
                const isMenuOpen = openMenuId === s.id;
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff' }}>
                    {/* Secret Name */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 8,
                            background: 'rgba(234, 179, 8, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 16,
                          }}
                        >
                          🔑
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontFamily: 'monospace', color: '#fff', fontSize: 14 }}>
                            {s.keyName}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{s.subtitle}</div>
                        </div>
                      </div>
                    </td>

                    {/* Environment */}
                    <td style={{ padding: '14px 20px' }}>
                      {s.environment === 'Production' && (
                        <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: 11, padding: '3px 10px', borderRadius: 12, fontWeight: 500 }}>
                          Production
                        </span>
                      )}
                      {s.environment === 'Staging' && (
                        <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontSize: 11, padding: '3px 10px', borderRadius: 12, fontWeight: 500 }}>
                          Staging
                        </span>
                      )}
                      {s.environment === 'Development' && (
                        <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: 11, padding: '3px 10px', borderRadius: 12, fontWeight: 500 }}>
                          Development
                        </span>
                      )}
                    </td>

                    {/* Workspace */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            background: s.workspaceBg,
                            color: '#fff',
                            fontSize: 9,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {s.workspaceCode}
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>{s.workspace}</span>
                      </div>
                    </td>

                    {/* Secret Value & Toggle Reveal / Copy */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '6px 10px', width: 'fit-content' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 12, color: isRevealed ? '#34d399' : 'var(--text-secondary)' }}>
                          {isRevealed ? s.realValue : s.maskedValue}
                        </span>
                        <button
                          onClick={() => toggleReveal(s.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13 }}
                          title={isRevealed ? 'Hide secret' : 'Reveal secret'}
                        >
                          {isRevealed ? '🙈' : '👁️'}
                        </button>
                        <button
                          onClick={() => copySecretValue(s.realValue, s.keyName)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13 }}
                          title="Copy secret to clipboard"
                        >
                          📋
                        </button>
                      </div>
                    </td>

                    {/* Rotation */}
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: 12 }}>
                      {s.rotationPolicy}
                    </td>

                    {/* Last Updated */}
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: 12 }}>
                      <div>{s.lastUpdated}</div>
                      <div style={{ fontSize: 11, opacity: 0.7 }}>by {s.updatedBy}</div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 20px' }}>
                      {s.status === 'Active' && (
                        <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: 11, padding: '3px 10px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} /> Active
                        </span>
                      )}
                      {s.status === 'Expiring' && (
                        <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: 11, padding: '3px 10px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fbbf24' }} /> Expiring in {s.expiresInDays}d
                        </span>
                      )}
                      {s.status === 'Revoked' && (
                        <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: 11, padding: '3px 10px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f87171' }} /> Revoked
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 20px', textAlign: 'right', position: 'relative' }}>
                      <button
                        onClick={() => setOpenMenuId(isMenuOpen ? null : s.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18 }}
                      >
                        ⋮
                      </button>

                      {isMenuOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 36,
                            right: 20,
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 8,
                            padding: '6px 0',
                            zIndex: 40,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                            width: 160,
                            textAlign: 'left',
                          }}
                        >
                          <div
                            onClick={() => handleRotateSecret(s.id, s.keyName)}
                            style={{ padding: '8px 14px', fontSize: 13, color: '#fff', cursor: 'pointer' }}
                          >
                            Rotate Secret
                          </div>
                          <div
                            onClick={() => copySecretValue(s.realValue, s.keyName)}
                            style={{ padding: '8px 14px', fontSize: 13, color: '#fff', cursor: 'pointer' }}
                          >
                            Copy Secret
                          </div>
                          <div
                            onClick={() => handleDeleteSecret(s.id, s.keyName)}
                            style={{ padding: '8px 14px', fontSize: 13, color: '#ef4444', cursor: 'pointer' }}
                          >
                            Delete Secret
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--text-secondary)',
          fontSize: 13,
        }}
      >
        <div>
          Showing {totalFilteredCount === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, totalFilteredCount)} of {totalFilteredCount} secrets
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={validCurrentPage === 1}
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-color)',
              color: validCurrentPage === 1 ? 'rgba(255,255,255,0.2)' : '#fff',
              borderRadius: 6,
              width: 32,
              height: 32,
              cursor: validCurrentPage === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              style={{
                background: pageNum === validCurrentPage ? '#7c3aed' : 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                borderRadius: 6,
                width: 32,
                height: 32,
                fontWeight: pageNum === validCurrentPage ? 600 : 400,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={validCurrentPage === totalPages}
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-color)',
              color: validCurrentPage === totalPages ? 'rgba(255,255,255,0.2)' : '#fff',
              borderRadius: 6,
              width: 32,
              height: 32,
              cursor: validCurrentPage === totalPages ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* Modal Dialog for "+ Create Secret" */}
      {isCreateModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-color)',
              borderRadius: 16,
              width: '100%',
              maxWidth: 520,
              padding: 28,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Create Encrypted Secret</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 20, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSecret} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Secret Key Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. OPENAI_API_KEY"
                  value={newKeyName}
                  onChange={e => setNewKeyName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Secret Value *
                </label>
                <input
                  type="password"
                  placeholder="Enter secret token or key value..."
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Description / Purpose
                </label>
                <input
                  type="text"
                  placeholder="Primary API key for production GPT-4o model inference"
                  value={newSubtitle}
                  onChange={e => setNewSubtitle(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: 13,
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: 13,
                    }}
                  >
                    <option value="API Tokens">API Tokens</option>
                    <option value="Database Credentials">Database Credentials</option>
                    <option value="Certificates & Keys">Certificates & Keys</option>
                    <option value="Environment Vars">Environment Vars</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Environment
                  </label>
                  <select
                    value={newEnv}
                    onChange={e => setNewEnv(e.target.value as any)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: 13,
                    }}
                  >
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Workspace
                  </label>
                  <select
                    value={newWorkspace}
                    onChange={e => setNewWorkspace(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: 13,
                    }}
                  >
                    <option value="AI Innovation Lab">AI Innovation Lab</option>
                    <option value="Data Platform">Data Platform</option>
                    <option value="Security Operations">Security Operations</option>
                    <option value="Product Development">Product Development</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Rotation Policy
                  </label>
                  <select
                    value={newRotation}
                    onChange={e => setNewRotation(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: 13,
                    }}
                  >
                    <option value="Auto (30 days)">Auto (30 days)</option>
                    <option value="Auto (60 days)">Auto (60 days)</option>
                    <option value="Auto (90 days)">Auto (90 days)</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '10px 16px',
                    color: 'var(--text-secondary)',
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 20px',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Create Secret
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
