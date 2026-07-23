import React, { useState, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

export interface APIKeyItem {
  id: string;
  name: string;
  subtitle: string;
  keyId: string;
  fullSecretKey: string;
  workspace: string;
  workspaceCode: string;
  workspaceBg: string;
  type: 'User' | 'Service';
  createdAt: string;
  createdBy: string;
  lastUsed: string;
  expiresAt: string;
  expiresInDaysText?: string;
  status: 'Active' | 'Expiring' | 'Revoked' | 'Expired';
  iconType: 'code' | 'bot' | 'chart' | 'gear' | 'phone' | 'webhook' | 'network' | 'box' | 'custom';
  iconColor: string;
  description: string;
}

const INITIAL_API_KEYS: APIKeyItem[] = [
  {
    id: 'key-1',
    name: 'Production API Key',
    subtitle: 'Main production application',
    keyId: 'ak_live_8f3a7b2c4d5e',
    fullSecretKey: 'ak_live_8f3a7b2c4d5e_9481029481029481029481029481',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    type: 'User',
    createdAt: 'May 21, 2025 10:30 AM',
    createdBy: 'Mukesh Kumar',
    lastUsed: 'May 21, 2025 02:15 PM',
    expiresAt: 'June 21, 2025 10:30 AM',
    expiresInDaysText: 'Expires in 30 days',
    status: 'Active',
    iconType: 'code',
    iconColor: '#8b5cf6',
    description: 'Main API key for production application and services',
  },
  {
    id: 'key-2',
    name: 'AI Agent Key',
    subtitle: 'AI agents and automation',
    keyId: 'ak_live_3d9f6a7b8c1d',
    fullSecretKey: 'ak_live_3d9f6a7b8c1d_8201948102948102948102948102',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#3b82f6',
    type: 'Service',
    createdAt: 'May 21, 2025 09:15 AM',
    createdBy: 'Mukesh Kumar',
    lastUsed: 'May 21, 2025 01:42 PM',
    expiresAt: 'August 21, 2025 09:15 AM',
    status: 'Active',
    iconType: 'bot',
    iconColor: '#3b82f6',
    description: 'Autonomous AI agent execution key with read/write context access',
  },
  {
    id: 'key-3',
    name: 'Analytics Service Key',
    subtitle: 'Analytics microservice',
    keyId: 'ak_live_6b7c9d0e1f2a',
    fullSecretKey: 'ak_live_6b7c9d0e1f2a_7102948102948102948102948102',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    type: 'Service',
    createdAt: 'May 20, 2025 08:45 PM',
    createdBy: 'Piyush Sharma',
    lastUsed: 'May 21, 2025 11:05 AM',
    expiresAt: 'November 20, 2025 08:45 PM',
    status: 'Active',
    iconType: 'chart',
    iconColor: '#10b981',
    description: 'Telemetry and event ingestion API key for analytics ingestion pipeline',
  },
  {
    id: 'key-4',
    name: 'Dev Environment Key',
    subtitle: 'Development environment',
    keyId: 'ak_test_1a2b3c4d5e6f',
    fullSecretKey: 'ak_test_1a2b3c4d5e6f_1948102948102948102948102948',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    type: 'User',
    createdAt: 'May 20, 2025 06:20 PM',
    createdBy: 'Rohit Verma',
    lastUsed: 'May 20, 2025 09:30 PM',
    expiresAt: 'Never',
    status: 'Active',
    iconType: 'gear',
    iconColor: '#f59e0b',
    description: 'Local sandbox testing key for local developer environment',
  },
  {
    id: 'key-5',
    name: 'Mobile App Key',
    subtitle: 'Mobile application access',
    keyId: 'ak_live_9e8d7c6b5a4f',
    fullSecretKey: 'ak_live_9e8d7c6b5a4f_3019481029481029481029481029',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    type: 'User',
    createdAt: 'May 19, 2025 03:30 PM',
    createdBy: 'Rohit Verma',
    lastUsed: 'May 21, 2025 10:10 AM',
    expiresAt: 'May 28, 2025 03:30 PM',
    expiresInDaysText: 'Expires in 7 days',
    status: 'Expiring',
    iconType: 'phone',
    iconColor: '#ef4444',
    description: 'iOS and Android client SDK key for mobile app authentication',
  },
  {
    id: 'key-6',
    name: 'Webhook Key',
    subtitle: 'Webhook notifications',
    keyId: 'ak_live_2f3e4d5c6b7a',
    fullSecretKey: 'ak_live_2f3e4d5c6b7a_5910294810294810294810294810',
    workspace: 'Security Operations',
    workspaceCode: 'SO',
    workspaceBg: '#ef4444',
    type: 'Service',
    createdAt: 'May 19, 2025 02:15 PM',
    createdBy: 'Piyush Sharma',
    lastUsed: 'May 19, 2025 06:45 PM',
    expiresAt: 'Revoked on May 19',
    status: 'Revoked',
    iconType: 'webhook',
    iconColor: '#9ca3af',
    description: 'Deprecated webhook signature key for event callbacks',
  },
  {
    id: 'key-7',
    name: 'Third Party Integration',
    subtitle: 'External service integration',
    keyId: 'ak_live_7g8h9i0j1k2l',
    fullSecretKey: 'ak_live_7g8h9i0j1k2l_4810294810294810294810294810',
    workspace: 'Marketing',
    workspaceCode: 'M',
    workspaceBg: '#ef4444',
    type: 'Service',
    createdAt: 'May 18, 2025 11:10 AM',
    createdBy: 'Mukesh Kumar',
    lastUsed: 'May 18, 2025 03:20 PM',
    expiresAt: 'Revoked on May 18',
    status: 'Revoked',
    iconType: 'network',
    iconColor: '#8b5cf6',
    description: 'HubSpot & Salesforce CRM integration access key',
  },
  {
    id: 'key-8',
    name: 'Test Key',
    subtitle: 'Testing and QA',
    keyId: 'ak_test_0z1x2c3v4b5n',
    fullSecretKey: 'ak_test_0z1x2c3v4b5n_6019481029481029481029481029',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    type: 'User',
    createdAt: 'May 18, 2025 10:25 AM',
    createdBy: 'Rohit Verma',
    lastUsed: 'May 19, 2025 01:15 PM',
    expiresAt: 'May 20, 2025 10:25 AM',
    status: 'Expired',
    iconType: 'box',
    iconColor: '#f59e0b',
    description: 'Automated integration testing key for CI/CD runners',
  },
  {
    id: 'key-9',
    name: 'Stripe Payment Webhook Key',
    subtitle: 'Billing events subscriber',
    keyId: 'ak_live_4k5l6m7n8o9p',
    fullSecretKey: 'ak_live_4k5l6m7n8o9p_7102948102948102948102948102',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    type: 'Service',
    createdAt: 'May 15, 2025 08:00 AM',
    createdBy: 'Mukesh Kumar',
    lastUsed: 'May 21, 2025 02:00 PM',
    expiresAt: 'August 15, 2025 08:00 AM',
    status: 'Active',
    iconType: 'code',
    iconColor: '#8b5cf6',
    description: 'Stripe webhook receiver API authentication key',
  },
  {
    id: 'key-10',
    name: 'Vector Database Sync Key',
    subtitle: 'ArcadeDB vector sync pipeline',
    keyId: 'ak_live_1q2w3e4r5t6y',
    fullSecretKey: 'ak_live_1q2w3e4r5t6y_8201948102948102948102948102',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#3b82f6',
    type: 'Service',
    createdAt: 'May 14, 2025 04:30 PM',
    createdBy: 'Piyush Sharma',
    lastUsed: 'May 21, 2025 01:00 PM',
    expiresAt: 'August 14, 2025 04:30 PM',
    status: 'Active',
    iconType: 'bot',
    iconColor: '#3b82f6',
    description: 'High-throughput embedding sync key for knowledge graph pipeline',
  },
];

export default function TenantAPIKeys() {
  const { addToast } = useToast();

  const [apiKeys, setApiKeys] = useState<APIKeyItem[]>(INITIAL_API_KEYS);
  const [selectedKeyId, setSelectedKeyId] = useState<string>('key-1');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Expiring Soon' | 'Revoked'>('All');
  const [inspectorTab, setInspectorTab] = useState<'Overview' | 'Permissions' | 'Activity' | 'Usage'>('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [workspaceFilter, setWorkspaceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State for "+ Create API Key"
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeySubtitle, setNewKeySubtitle] = useState('');
  const [newKeyWorkspace, setNewKeyWorkspace] = useState('Data Platform');
  const [newKeyType, setNewKeyType] = useState<'User' | 'Service'>('User');
  const [newKeyExpiry, setNewKeyExpiry] = useState('30 days');
  const [newKeyDesc, setNewKeyDesc] = useState('');

  // Selected API Key Object
  const selectedKey = useMemo(() => {
    return apiKeys.find(k => k.id === selectedKeyId) || apiKeys[0];
  }, [apiKeys, selectedKeyId]);

  const handleCreateAPIKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      addToast('Please enter an API key name', 'error');
      return;
    }

    const randomSuffix = Math.random().toString(36).substring(2, 12);
    const generatedId = `ak_live_${randomSuffix}`;
    const newKey: APIKeyItem = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      subtitle: newKeySubtitle.trim() || 'Custom API token',
      keyId: generatedId,
      fullSecretKey: `${generatedId}_secret_${Date.now()}`,
      workspace: newKeyWorkspace,
      workspaceCode: newKeyWorkspace.substring(0, 2).toUpperCase(),
      workspaceBg: '#8b5cf6',
      type: newKeyType,
      createdAt: 'Just now',
      createdBy: 'Mukesh Kumar',
      lastUsed: 'Never',
      expiresAt: newKeyExpiry === 'Never' ? 'Never' : `In ${newKeyExpiry}`,
      status: 'Active',
      iconType: 'code',
      iconColor: '#8b5cf6',
      description: newKeyDesc.trim() || 'Custom created API key.',
    };

    setApiKeys([newKey, ...apiKeys]);
    setSelectedKeyId(newKey.id);
    setIsCreateModalOpen(false);
    setNewKeyName('');
    setNewKeySubtitle('');
    setNewKeyDesc('');
    addToast(`API Key "${newKey.name}" created successfully!`, 'success');
  };

  const handleRevokeKey = (id: string, name: string) => {
    setApiKeys(prev =>
      prev.map(k => (k.id === id ? { ...k, status: 'Revoked', expiresAt: 'Revoked' } : k))
    );
    addToast(`Revoked API key "${name}"`, 'info');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`Copied ${label} to clipboard!`, 'info');
  };

  // KPIs
  const totalCount = 28; // matching design screenshot 28
  const activeCount = 21; // matching design 21
  const expiringCount = 2; // matching design 2
  const revokedCount = 5; // matching design 5

  // Filtered List
  const filteredKeys = useMemo(() => {
    return apiKeys.filter(k => {
      // Main Tab Filter
      if (activeTab === 'Active' && k.status !== 'Active') return false;
      if (activeTab === 'Expiring Soon' && k.status !== 'Expiring') return false;
      if (activeTab === 'Revoked' && k.status !== 'Revoked' && k.status !== 'Expired') return false;

      // Dropdown filters
      if (workspaceFilter !== 'All' && k.workspace !== workspaceFilter) return false;
      if (typeFilter !== 'All' && k.type !== typeFilter) return false;
      if (statusFilter !== 'All' && k.status !== statusFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = k.name.toLowerCase().includes(q);
        const matchKeyId = k.keyId.toLowerCase().includes(q);
        const matchSub = k.subtitle.toLowerCase().includes(q);
        if (!matchName && !matchKeyId && !matchSub) return false;
      }

      return true;
    });
  }, [apiKeys, activeTab, workspaceFilter, typeFilter, statusFilter, searchQuery]);

  // Pagination calculation
  const totalFilteredCount = filteredKeys.length;
  const totalPages = 4; // matching design page numbers 1 2 3 ... 4
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedKeys = filteredKeys.slice(startIndex, startIndex + itemsPerPage);

  const renderIcon = (type: APIKeyItem['iconType'], color: string) => {
    switch (type) {
      case 'code':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'bot':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8.01" y2="16" />
            <line x1="16" y1="16" x2="16.01" y2="16" />
          </svg>
        );
      case 'chart':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      case 'gear':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 'phone':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        );
      case 'webhook':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <path d="M13 6h3a2 2 0 0 1 2 2v7" />
            <line x1="6" y1="9" x2="6" y2="21" />
          </svg>
        );
      case 'network':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v6" />
            <path d="M12 15v6" />
            <path d="M3 12h6" />
            <path d="M15 12h6" />
          </svg>
        );
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Header Section */}
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>API Keys</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6, margin: 0 }}>
            Create and manage API keys to authenticate API requests and access tenant resources.{' '}
            <a
              href="#learn-more"
              onClick={e => {
                e.preventDefault();
                addToast('Opening API Keys documentation', 'info');
              }}
              style={{ color: '#a855f7', textDecoration: 'none', marginLeft: 4 }}
            >
              Learn more ↗
            </a>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => addToast('Help: API Authentication & Key Security Guide', 'info')}
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
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Create API Key
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {/* Card 1: Total API Keys */}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total API Keys</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalCount}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Across all workspaces
            </span>
          </div>
        </div>

        {/* Card 2: Active Keys */}
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
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Active Keys</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {activeCount}
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              75% of total keys
            </span>
          </div>
        </div>

        {/* Card 3: Expiring Soon */}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
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
              Within next 30 days
            </span>
          </div>
        </div>

        {/* Card 4: Revoked Keys */}
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
              background: 'rgba(239, 68, 68, 0.15)',
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
                background: '#ef4444',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              !
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Revoked Keys</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {revokedCount}
            </span>
            <span style={{ fontSize: 12, color: '#f87171', fontWeight: 500, marginTop: 4 }}>
              18% of total keys
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Main Layout (Left Keys Table 2.1fr + Right Detail Inspector Panel 1fr) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.1fr 1fr', gap: 24, alignItems: 'flex-start' }}>
        {/* Left Section (Tabs, Filters, Table) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status Tabs */}
          <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 24 }}>
            {[
              { key: 'All', label: 'All Keys', count: totalCount },
              { key: 'Active', label: 'Active', count: activeCount },
              { key: 'Expiring Soon', label: 'Expiring Soon', count: expiringCount },
              { key: 'Revoked', label: 'Revoked', count: revokedCount },
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
                    marginBottom: -1,
                    borderBottom: isActive ? '2px solid #8b5cf6' : '2px solid transparent',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {t.label} ({t.count})
                </button>
              );
            })}
          </div>

          {/* Filter Bar (Search input + 3 Dropdowns + View toggle) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 40px', gap: 12, alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search API keys by name, key ID or prefix..."
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
                  padding: '9px 12px 9px 34px',
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>

            {/* Workspace Dropdown */}
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
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="All">All Workspaces</option>
                <option value="Data Platform">Data Platform</option>
                <option value="AI Innovation Lab">AI Innovation Lab</option>
                <option value="Security Operations">Security Operations</option>
                <option value="Product Development">Product Development</option>
                <option value="Marketing">Marketing</option>
              </select>
              <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
            </div>

            {/* Type Dropdown */}
            <div style={{ position: 'relative' }}>
              <select
                value={typeFilter}
                onChange={e => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="All">All Types</option>
                <option value="User">User</option>
                <option value="Service">Service</option>
              </select>
              <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
            </div>

            {/* Status Dropdown */}
            <div style={{ position: 'relative' }}>
              <select
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: 13,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Expiring">Expiring</option>
                <option value="Revoked">Revoked</option>
                <option value="Expired">Expired</option>
              </select>
              <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
            </div>

            {/* View Mode Button */}
            <button
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                color: 'var(--text-secondary)',
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>
          </div>

          {/* API Keys Table */}
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
                  <th style={{ padding: '12px 16px' }}>Name</th>
                  <th style={{ padding: '12px 16px' }}>Key ID</th>
                  <th style={{ padding: '12px 16px' }}>Workspace</th>
                  <th style={{ padding: '12px 16px' }}>Type</th>
                  <th style={{ padding: '12px 16px' }}>Created At ↓</th>
                  <th style={{ padding: '12px 16px' }}>Last Used</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedKeys.map(k => {
                  const isSelected = selectedKeyId === k.id;
                  return (
                    <tr
                      key={k.id}
                      onClick={() => setSelectedKeyId(k.id)}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: isSelected ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      {/* Name */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              background: 'rgba(0,0,0,0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}
                          >
                            {renderIcon(k.iconType, k.iconColor)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: isSelected ? '#a855f7' : '#fff' }}>{k.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{k.subtitle}</div>
                          </div>
                        </div>
                      </td>

                      {/* Key ID */}
                      <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)' }}>
                        {k.keyId}
                      </td>

                      {/* Workspace */}
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            color: '#fff',
                            fontSize: 12,
                            padding: '3px 10px',
                            borderRadius: 6,
                          }}
                        >
                          {k.workspace}
                        </span>
                      </td>

                      {/* Type */}
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 12 }}>
                        {k.type}
                      </td>

                      {/* Created At */}
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 12 }}>
                        {k.createdAt}
                      </td>

                      {/* Last Used */}
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 12 }}>
                        {k.lastUsed}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 16px' }}>
                        {k.status === 'Active' && (
                          <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} /> Active
                          </span>
                        )}
                        {k.status === 'Expiring' && (
                          <span style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fbbf24' }} /> Expiring
                          </span>
                        )}
                        {k.status === 'Revoked' && (
                          <span style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f87171' }} /> Revoked
                          </span>
                        )}
                        {k.status === 'Expired' && (
                          <span style={{ background: 'rgba(107,114,128,0.15)', color: '#9ca3af', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#9ca3af' }} /> Expired
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 16px', textAlign: 'right', color: 'var(--text-secondary)' }}>
                        ⋮
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Controls */}
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
              {Math.min(startIndex + itemsPerPage, totalFilteredCount)} of {totalCount} API keys
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

              {[1, 2, 3, '...', 4].map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  style={{
                    background: page === validCurrentPage ? '#7c3aed' : 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    color: page === '...' ? 'var(--text-secondary)' : '#fff',
                    borderRadius: 6,
                    width: 32,
                    height: 32,
                    fontWeight: page === validCurrentPage ? 600 : 400,
                    cursor: page === '...' ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {page}
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
        </div>

        {/* Right Detail Inspector Side Panel */}
        <div
          className="widget"
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            position: 'sticky',
            top: 20,
          }}
        >
          {/* Inspector Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: 'rgba(139, 92, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {renderIcon(selectedKey.iconType, selectedKey.iconColor)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{selectedKey.name}</h3>
                  <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: 10, padding: '2px 6px', borderRadius: 8 }}>
                    ● {selectedKey.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{selectedKey.subtitle}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                  Created on {selectedKey.createdAt} by {selectedKey.createdBy}
                </div>
              </div>
            </div>

            <button
              onClick={() => addToast('Closed inspector', 'info')}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 16 }}
            >
              ✕
            </button>
          </div>

          {/* Inspector Sub-tabs */}
          <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 16 }}>
            {['Overview', 'Permissions', 'Activity', 'Usage'].map(tab => (
              <button
                key={tab}
                onClick={() => setInspectorTab(tab as any)}
                style={{
                  background: 'none',
                  border: 'none',
                  paddingBottom: 8,
                  marginBottom: -1,
                  borderBottom: inspectorTab === tab ? '2px solid #8b5cf6' : '2px solid transparent',
                  color: inspectorTab === tab ? '#fff' : 'var(--text-secondary)',
                  fontSize: 12,
                  fontWeight: inspectorTab === tab ? 600 : 500,
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Inspector Content: Overview */}
          {inspectorTab === 'Overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Key Details Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Key Details</h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Key ID</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: 11 }}>{selectedKey.keyId}</span>
                    <button
                      onClick={() => copyToClipboard(selectedKey.keyId, 'Key ID')}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                      title="Copy Key ID"
                    >
                      📋
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Type</span>
                  <span style={{ color: '#c084fc', fontWeight: 500 }}>{selectedKey.type}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Workspace</span>
                  <span style={{ background: 'rgba(139,92,246,0.15)', color: '#c084fc', padding: '2px 8px', borderRadius: 10, fontSize: 11 }}>
                    {selectedKey.workspace}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Status</span>
                  <span style={{ color: selectedKey.status === 'Active' ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: selectedKey.status === 'Active' ? '#34d399' : '#f87171' }} />
                    {selectedKey.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Created At</span>
                  <span style={{ color: '#fff' }}>{selectedKey.createdAt}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Created By</span>
                  <span style={{ color: '#fff' }}>{selectedKey.createdBy}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Last Used</span>
                  <span style={{ color: '#fff' }}>{selectedKey.lastUsed}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Expires At</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#fff' }}>{selectedKey.expiresAt}</div>
                    {selectedKey.expiresInDaysText && (
                      <div style={{ color: '#fbbf24', fontSize: 11, marginTop: 2 }}>
                        ⌛ {selectedKey.expiresInDaysText}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* API Key Masked Box Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>API Key</h4>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: 0 }}>
                  This is the only time the key will be shown. Please copy and store it securely.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 12px', marginTop: 4 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: isSecretRevealed ? '#34d399' : 'var(--text-secondary)' }}>
                    {isSecretRevealed ? selectedKey.fullSecretKey : '••••••••••••••••••••••••••••••••'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => {
                        setIsSecretRevealed(!isSecretRevealed);
                        addToast(isSecretRevealed ? 'API Key hidden' : 'API Key revealed', 'info');
                      }}
                      style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}
                    >
                      {isSecretRevealed ? 'Hide' : 'Show'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(selectedKey.fullSecretKey, 'API Key')}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14 }}
                      title="Copy full key"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Description</h4>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {selectedKey.description}
                </p>
              </div>

              {/* Bottom Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => addToast(`Editing API key ${selectedKey.name}`, 'info')}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Edit Key
                </button>
                <button
                  onClick={() => handleRevokeKey(selectedKey.id, selectedKey.name)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#ef4444',
                    borderRadius: 8,
                    padding: '10px 12px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Revoke Key
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog for "+ Create API Key" */}
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
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Create API Key</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 20, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAPIKey} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Key Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Production API Key"
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
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Subtitle / Application Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Main production application"
                  value={newKeySubtitle}
                  onChange={e => setNewKeySubtitle(e.target.value)}
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
                    Workspace
                  </label>
                  <select
                    value={newKeyWorkspace}
                    onChange={e => setNewKeyWorkspace(e.target.value)}
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
                    <option value="Data Platform">Data Platform</option>
                    <option value="AI Innovation Lab">AI Innovation Lab</option>
                    <option value="Security Operations">Security Operations</option>
                    <option value="Product Development">Product Development</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Type
                  </label>
                  <select
                    value={newKeyType}
                    onChange={e => setNewKeyType(e.target.value as any)}
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
                    <option value="User">User</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Expiration Policy
                </label>
                <select
                  value={newKeyExpiry}
                  onChange={e => setNewKeyExpiry(e.target.value)}
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
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                  <option value="90 days">90 days</option>
                  <option value="Never">Never</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the primary access purpose for this API key..."
                  value={newKeyDesc}
                  onChange={e => setNewKeyDesc(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: 13,
                    resize: 'none',
                  }}
                />
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
                  Create API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
