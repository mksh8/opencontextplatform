import React, { useState, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

export interface PolicyRule {
  id: number;
  effect: 'Allow' | 'Deny';
  actions: string[];
  resource: string;
}

export interface PolicyPrincipal {
  id: string;
  name: string;
  type: 'Group' | 'Service' | 'User';
}

export interface PolicyItem {
  id: string;
  policyId: string;
  name: string;
  subtitle: string;
  workspace: string;
  workspaceCode: string;
  workspaceBg: string;
  resourcePattern: string;
  effect: 'Allow' | 'Deny';
  status: 'Active' | 'Pending Review' | 'Disabled';
  type: 'Custom Policy' | 'System Policy';
  lastUpdated: string;
  createdBy: string;
  createdAt: string;
  description: string;
  iconType: 'doc' | 'users' | 'shield' | 'lock' | 'code' | 'db' | 'chart' | 'user-red';
  iconColor: string;
  rules: PolicyRule[];
  principals: PolicyPrincipal[];
}

const INITIAL_POLICIES: PolicyItem[] = [
  {
    id: 'pol-1',
    policyId: 'pol_01JYE2XJ8ZQ4V6K8S8QG7T6M5N',
    name: 'Data Platform Read Access',
    subtitle: 'Read access to data platform resources',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    resourcePattern: 's3://acme-data-platform/*',
    effect: 'Allow',
    status: 'Active',
    type: 'Custom Policy',
    lastUpdated: 'May 21, 2025 10:30 AM',
    createdBy: 'Mukesh Kumar',
    createdAt: 'May 21, 2025',
    description: 'Grants read access to data platform resources for data engineering team.',
    iconType: 'doc',
    iconColor: '#10b981',
    rules: [
      { id: 1, effect: 'Allow', actions: ['s3:GetObject', 's3:ListBucket'], resource: 's3://acme-data-platform/*' },
      { id: 2, effect: 'Allow', actions: ['s3:GetBucketLocation'], resource: 's3://acme-data-platform' },
    ],
    principals: [
      { id: 'pr-1', name: 'data-engineering-team', type: 'Group' },
      { id: 'pr-2', name: 'analytics-service', type: 'Service' },
      { id: 'pr-3', name: 'john.doe@acme.com', type: 'User' },
    ],
  },
  {
    id: 'pol-2',
    policyId: 'pol_02KMF3YK9AR5W7L9T9RH8U7N6P',
    name: 'ML Models Full Access',
    subtitle: 'Full access to ML models and artifacts',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#3b82f6',
    resourcePattern: 'mlflow:*',
    effect: 'Allow',
    status: 'Active',
    type: 'Custom Policy',
    lastUpdated: 'May 21, 2025 09:15 AM',
    createdBy: 'Mukesh Kumar',
    createdAt: 'May 21, 2025',
    description: 'Full administrative access for training, logging, and registering ML models.',
    iconType: 'users',
    iconColor: '#3b82f6',
    rules: [
      { id: 1, effect: 'Allow', actions: ['mlflow:*'], resource: 'mlflow:*' },
    ],
    principals: [
      { id: 'pr-4', name: 'ai-ml-team', type: 'Group' },
      { id: 'pr-5', name: 'model-trainer-bot', type: 'Service' },
    ],
  },
  {
    id: 'pol-3',
    policyId: 'pol_03LNG4ZL0BS6X8M0U0SI9V8O7Q',
    name: 'Production Write Access',
    subtitle: 'Write access for production services',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    resourcePattern: 's3://acme-prod-data/*',
    effect: 'Allow',
    status: 'Active',
    type: 'System Policy',
    lastUpdated: 'May 20, 2025 08:45 PM',
    createdBy: 'Piyush Sharma',
    createdAt: 'May 20, 2025',
    description: 'Enables write operations for production data microservices.',
    iconType: 'shield',
    iconColor: '#8b5cf6',
    rules: [
      { id: 1, effect: 'Allow', actions: ['s3:PutObject', 's3:DeleteObject'], resource: 's3://acme-prod-data/*' },
    ],
    principals: [
      { id: 'pr-6', name: 'prod-ingestion-service', type: 'Service' },
    ],
  },
  {
    id: 'pol-4',
    policyId: 'pol_04MOH5AM1CT7Y9N1V1TJ0W9P8R',
    name: 'Finance Data Restricted',
    subtitle: 'Restrict access to finance data',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    resourcePattern: 's3://finance/*',
    effect: 'Deny',
    status: 'Active',
    type: 'Custom Policy',
    lastUpdated: 'May 20, 2025 06:20 PM',
    createdBy: 'Security System',
    createdAt: 'May 20, 2025',
    description: 'Explicitly denies access to financial records except compliance auditors.',
    iconType: 'lock',
    iconColor: '#f59e0b',
    rules: [
      { id: 1, effect: 'Deny', actions: ['s3:*'], resource: 's3://finance/*' },
    ],
    principals: [
      { id: 'pr-7', name: 'non-finance-users', type: 'Group' },
    ],
  },
  {
    id: 'pol-5',
    policyId: 'pol_05NPI6BN2DU8Z0O2W2UK1X0Q9S',
    name: 'API Services Access',
    subtitle: 'Access to API gateway and services',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    resourcePattern: 'apigateway:*',
    effect: 'Allow',
    status: 'Active',
    type: 'System Policy',
    lastUpdated: 'May 19, 2025 03:30 PM',
    createdBy: 'Rohit Verma',
    createdAt: 'May 19, 2025',
    description: 'Standard access for developers to deploy & monitor API routes.',
    iconType: 'code',
    iconColor: '#8b5cf6',
    rules: [
      { id: 1, effect: 'Allow', actions: ['apigateway:GET', 'apigateway:POST'], resource: 'apigateway:*' },
    ],
    principals: [
      { id: 'pr-8', name: 'frontend-team', type: 'Group' },
    ],
  },
  {
    id: 'pol-6',
    policyId: 'pol_06OQJ7CO3EV9A1P3X3VL2Y1R0T',
    name: 'Database Admin Access',
    subtitle: 'Admin access for databases',
    workspace: 'Security Operations',
    workspaceCode: 'SO',
    workspaceBg: '#ef4444',
    resourcePattern: 'rds:*',
    effect: 'Allow',
    status: 'Pending Review',
    type: 'Custom Policy',
    lastUpdated: 'May 19, 2025 02:15 PM',
    createdBy: 'Piyush Sharma',
    createdAt: 'May 19, 2025',
    description: 'Full database administration access pending sec-ops audit approval.',
    iconType: 'db',
    iconColor: '#3b82f6',
    rules: [
      { id: 1, effect: 'Allow', actions: ['rds:*'], resource: 'rds:*' },
    ],
    principals: [
      { id: 'pr-9', name: 'dba-lead@acme.com', type: 'User' },
    ],
  },
  {
    id: 'pol-7',
    policyId: 'pol_07PRK8DP4FW0B2Q4Y4WM3Z2S1U',
    name: 'Analytics Read Only',
    subtitle: 'Read-only access to analytics',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    resourcePattern: 'athena:*',
    effect: 'Allow',
    status: 'Active',
    type: 'Custom Policy',
    lastUpdated: 'May 18, 2025 11:10 AM',
    createdBy: 'Mukesh Kumar',
    createdAt: 'May 18, 2025',
    description: 'Read-only querying access on Athena analytics tables for business analysts.',
    iconType: 'chart',
    iconColor: '#f59e0b',
    rules: [
      { id: 1, effect: 'Allow', actions: ['athena:StartQueryExecution', 'athena:GetQueryResults'], resource: 'athena:*' },
    ],
    principals: [
      { id: 'pr-10', name: 'bi-analysts-group', type: 'Group' },
    ],
  },
  {
    id: 'pol-8',
    policyId: 'pol_08QSL9EQ5GX1C3R5Z5XN4A3T2V',
    name: 'External Partner Access',
    subtitle: 'Limited access for external partners',
    workspace: 'Marketing',
    workspaceCode: 'M',
    workspaceBg: '#ef4444',
    resourcePattern: 's3://marketing-shared/*',
    effect: 'Allow',
    status: 'Pending Review',
    type: 'Custom Policy',
    lastUpdated: 'May 18, 2025 10:25 AM',
    createdBy: 'Mukesh Kumar',
    createdAt: 'May 18, 2025',
    description: 'Restricted bucket access for external vendor asset upload.',
    iconType: 'user-red',
    iconColor: '#ef4444',
    rules: [
      { id: 1, effect: 'Allow', actions: ['s3:GetObject', 's3:PutObject'], resource: 's3://marketing-shared/*' },
    ],
    principals: [
      { id: 'pr-11', name: 'external-agency-bot', type: 'Service' },
    ],
  },
];

export default function TenantPolicies() {
  const { addToast } = useToast();

  const [policies, setPolicies] = useState<PolicyItem[]>(INITIAL_POLICIES);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('pol-1');
  const [activeTab, setActiveTab] = useState<'All' | 'System Policies' | 'Custom Policies' | 'Pending Review'>('All');
  const [inspectorTab, setInspectorTab] = useState<'Overview' | 'Rules' | 'Principals' | 'Resources' | 'Activity'>('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [workspaceFilter, setWorkspaceFilter] = useState('All');
  const [resourceFilter, setResourceFilter] = useState('All');
  const [effectFilter, setEffectFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State for "+ Create Policy"
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPolicyName, setNewPolicyName] = useState('');
  const [newPolicySubtitle, setNewPolicySubtitle] = useState('');
  const [newPolicyWorkspace, setNewPolicyWorkspace] = useState('Data Platform');
  const [newPolicyType, setNewPolicyType] = useState<'Custom Policy' | 'System Policy'>('Custom Policy');
  const [newPolicyEffect, setNewPolicyEffect] = useState<'Allow' | 'Deny'>('Allow');
  const [newPolicyResource, setNewPolicyResource] = useState('s3://acme-bucket/*');
  const [newPolicyActions, setNewPolicyActions] = useState('s3:GetObject, s3:ListBucket');
  const [newPolicyDesc, setNewPolicyDesc] = useState('');

  // Selected Policy Object
  const selectedPolicy = useMemo(() => {
    return policies.find(p => p.id === selectedPolicyId) || policies[0];
  }, [policies, selectedPolicyId]);

  const handleCreatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPolicyName.trim()) {
      addToast('Please enter a policy name', 'error');
      return;
    }

    const randomSuffix = Math.random().toString(36).substring(2, 10).toUpperCase();
    const generatedPolicyId = `pol_${randomSuffix}`;
    const actionList = newPolicyActions.split(',').map(a => a.trim()).filter(Boolean);

    const newPolicy: PolicyItem = {
      id: `pol-${Date.now()}`,
      policyId: generatedPolicyId,
      name: newPolicyName.trim(),
      subtitle: newPolicySubtitle.trim() || 'Custom access control policy',
      workspace: newPolicyWorkspace,
      workspaceCode: newPolicyWorkspace.substring(0, 2).toUpperCase(),
      workspaceBg: '#8b5cf6',
      resourcePattern: newPolicyResource,
      effect: newPolicyEffect,
      status: 'Active',
      type: newPolicyType,
      lastUpdated: 'Just now',
      createdBy: 'Mukesh Kumar',
      createdAt: 'Just now',
      description: newPolicyDesc.trim() || 'Custom access policy.',
      iconType: 'doc',
      iconColor: '#10b981',
      rules: [
        { id: 1, effect: newPolicyEffect, actions: actionList, resource: newPolicyResource },
      ],
      principals: [
        { id: `pr-${Date.now()}`, name: 'data-engineering-team', type: 'Group' },
      ],
    };

    setPolicies([newPolicy, ...policies]);
    setSelectedPolicyId(newPolicy.id);
    setIsCreateModalOpen(false);
    setNewPolicyName('');
    setNewPolicySubtitle('');
    setNewPolicyDesc('');
    addToast(`Policy "${newPolicy.name}" created successfully!`, 'success');
  };

  const handleDeletePolicy = (id: string, name: string) => {
    const updated = policies.filter(p => p.id !== id);
    setPolicies(updated);
    if (updated.length > 0) {
      setSelectedPolicyId(updated[0].id);
    }
    addToast(`Deleted policy "${name}"`, 'success');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`Copied ${label} to clipboard!`, 'info');
  };

  // KPIs
  const totalCount = 32; // matching screenshot 32
  const activeCount = 26; // matching screenshot 26
  const pendingCount = 3; // matching screenshot 3
  const deniedCount = 3; // matching screenshot 3

  // Filtered List
  const filteredPolicies = useMemo(() => {
    return policies.filter(p => {
      // Main Tab Filter
      if (activeTab === 'System Policies' && p.type !== 'System Policy') return false;
      if (activeTab === 'Custom Policies' && p.type !== 'Custom Policy') return false;
      if (activeTab === 'Pending Review' && p.status !== 'Pending Review') return false;

      // Dropdown filters
      if (workspaceFilter !== 'All' && p.workspace !== workspaceFilter) return false;
      if (resourceFilter !== 'All' && !p.resourcePattern.includes(resourceFilter.toLowerCase())) return false;
      if (effectFilter !== 'All' && p.effect !== effectFilter) return false;
      if (statusFilter !== 'All' && p.status !== statusFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSub = p.subtitle.toLowerCase().includes(q);
        const matchRes = p.resourcePattern.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchRes) return false;
      }

      return true;
    });
  }, [policies, activeTab, workspaceFilter, resourceFilter, effectFilter, statusFilter, searchQuery]);

  // Pagination calculation
  const totalFilteredCount = filteredPolicies.length;
  const totalPages = 4;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedPolicies = filteredPolicies.slice(startIndex, startIndex + itemsPerPage);

  const renderPolicyIcon = (type: PolicyItem['iconType'], color: string) => {
    switch (type) {
      case 'doc':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        );
      case 'users':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'shield':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'lock':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        );
      case 'code':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'db':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
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
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Header Section */}
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Policies</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6, margin: 0 }}>
            Create and manage access control policies to secure your resources and data.{' '}
            <a
              href="#learn-more"
              onClick={e => {
                e.preventDefault();
                addToast('Opening Policies security documentation', 'info');
              }}
              style={{ color: '#a855f7', textDecoration: 'none', marginLeft: 4 }}
            >
              Learn more ↗
            </a>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Top search bar */}
          <div style={{ position: 'relative', width: 220 }}>
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
              placeholder="Search policies..."
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                padding: '8px 12px 8px 34px',
                color: '#fff',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

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
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Create Policy <span style={{ fontSize: 10 }}>▼</span>
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
        {/* Card 1: Total Policies */}
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Policies</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalCount}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Across all workspaces
            </span>
          </div>
        </div>

        {/* Card 2: Active Policies */}
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
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Active Policies</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {activeCount}
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              81% of total policies
            </span>
          </div>
        </div>

        {/* Card 3: Pending Review */}
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
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Pending Review</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {pendingCount}
            </span>
            <span style={{ fontSize: 12, color: '#fbbf24', fontWeight: 500, marginTop: 4 }}>
              Require your attention
            </span>
          </div>
        </div>

        {/* Card 4: Denied Policies */}
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
                border: '2px solid #ef4444',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ⊘
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Denied Policies</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {deniedCount}
            </span>
            <span style={{ fontSize: 12, color: '#f87171', fontWeight: 500, marginTop: 4 }}>
              Blocked access
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Main Layout (Left Table 2.1fr + Right Detail Inspector Panel 1fr) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.1fr 1fr', gap: 24, alignItems: 'flex-start' }}>
        {/* Left Section (Tabs, Filters, Table) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Main Status Tabs */}
          <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 24 }}>
            {[
              { key: 'All', label: 'All Policies', count: 32 },
              { key: 'System Policies', label: 'System Policies', count: 8 },
              { key: 'Custom Policies', label: 'Custom Policies', count: 24 },
              { key: 'Pending Review', label: 'Pending Review', count: 3 },
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

          {/* Filter Bar (Search input + 4 Dropdowns + View toggle) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 40px', gap: 10, alignItems: 'center' }}>
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
                placeholder="Search policies by name or description..."
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
                  fontSize: 12,
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
                  padding: '9px 10px',
                  color: '#fff',
                  fontSize: 12,
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
              <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 9 }}>▼</div>
            </div>

            {/* Resource Dropdown */}
            <div style={{ position: 'relative' }}>
              <select
                value={resourceFilter}
                onChange={e => {
                  setResourceFilter(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: '9px 10px',
                  color: '#fff',
                  fontSize: 12,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="All">All Resources</option>
                <option value="s3">S3 Buckets</option>
                <option value="mlflow">ML Flow</option>
                <option value="apigateway">API Gateway</option>
                <option value="rds">RDS Databases</option>
                <option value="athena">Athena</option>
              </select>
              <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 9 }}>▼</div>
            </div>

            {/* Effect Dropdown */}
            <div style={{ position: 'relative' }}>
              <select
                value={effectFilter}
                onChange={e => {
                  setEffectFilter(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  padding: '9px 10px',
                  color: '#fff',
                  fontSize: 12,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="All">All Effect</option>
                <option value="Allow">Allow</option>
                <option value="Deny">Deny</option>
              </select>
              <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 9 }}>▼</div>
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
                  padding: '9px 10px',
                  color: '#fff',
                  fontSize: 12,
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Disabled">Disabled</option>
              </select>
              <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 9 }}>▼</div>
            </div>

            {/* View Mode Button */}
            <button
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                color: 'var(--text-secondary)',
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>
          </div>

          {/* Policies Table */}
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
                  <th style={{ padding: '12px 16px' }}>Policy Name</th>
                  <th style={{ padding: '12px 16px' }}>Workspace</th>
                  <th style={{ padding: '12px 16px' }}>Resource</th>
                  <th style={{ padding: '12px 16px' }}>Effect</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Last Updated</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPolicies.map(p => {
                  const isSelected = selectedPolicyId === p.id;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedPolicyId(p.id)}
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
                            {renderPolicyIcon(p.iconType, p.iconColor)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: isSelected ? '#a855f7' : '#fff' }}>{p.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.subtitle}</div>
                          </div>
                        </div>
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
                          {p.workspace}
                        </span>
                      </td>

                      {/* Resource */}
                      <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)' }}>
                        {p.resourcePattern}
                      </td>

                      {/* Effect */}
                      <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 12 }}>
                        {p.effect === 'Allow' ? (
                          <span style={{ color: '#34d399' }}>Allow</span>
                        ) : (
                          <span style={{ color: '#f87171' }}>Deny</span>
                        )}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 16px' }}>
                        {p.status === 'Active' && (
                          <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} /> Active
                          </span>
                        )}
                        {p.status === 'Pending Review' && (
                          <span style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fbbf24' }} /> Pending Review
                          </span>
                        )}
                        {p.status === 'Disabled' && (
                          <span style={{ background: 'rgba(107,114,128,0.15)', color: '#9ca3af', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#9ca3af' }} /> Disabled
                          </span>
                        )}
                      </td>

                      {/* Last Updated */}
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 12 }}>
                        {p.lastUpdated}
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
              {Math.min(startIndex + itemsPerPage, totalFilteredCount)} of {totalCount} policies
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

              {[1, 2, 3, 4].map(pageNum => (
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
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {renderPolicyIcon(selectedPolicy.iconType, selectedPolicy.iconColor)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{selectedPolicy.name}</h3>
                  <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: 10, padding: '2px 6px', borderRadius: 8 }}>
                    ● {selectedPolicy.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{selectedPolicy.subtitle}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                  Created on {selectedPolicy.createdAt} by {selectedPolicy.createdBy}
                </div>
              </div>
            </div>

            <button
              onClick={() => addToast('Closed policy inspector', 'info')}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 16 }}
            >
              ✕
            </button>
          </div>

          {/* Sub-tabs in Inspector */}
          <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 16 }}>
            {['Overview', 'Rules', 'Principals', 'Resources', 'Activity'].map(tab => (
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
              {/* Policy Summary Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Policy Summary</h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Policy ID</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: 11 }}>{selectedPolicy.policyId}</span>
                    <button
                      onClick={() => copyToClipboard(selectedPolicy.policyId, 'Policy ID')}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                      title="Copy Policy ID"
                    >
                      📋
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Type</span>
                  <span style={{ color: '#fff' }}>{selectedPolicy.type}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Effect</span>
                  <span style={{ color: selectedPolicy.effect === 'Allow' ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: selectedPolicy.effect === 'Allow' ? '#34d399' : '#f87171' }} />
                    {selectedPolicy.effect}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Status</span>
                  <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} />
                    {selectedPolicy.status}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Workspace</span>
                  <span style={{ background: 'rgba(139,92,246,0.15)', color: '#c084fc', padding: '2px 8px', borderRadius: 10, fontSize: 11 }}>
                    {selectedPolicy.workspace}
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Description</span>
                  <span style={{ color: '#fff', fontSize: 12, lineHeight: 1.4 }}>{selectedPolicy.description}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Last Updated</span>
                  <span style={{ color: '#fff' }}>{selectedPolicy.lastUpdated}</span>
                </div>
              </div>

              {/* Policy Rules Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Policy Rules</h4>

                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 11, fontFamily: 'monospace' }}>
                  {selectedPolicy.rules.map(rule => (
                    <div key={rule.id} style={{ display: 'grid', gridTemplateColumns: '20px 50px 1.5fr 1.5fr', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{rule.id}</span>
                      <span style={{ color: rule.effect === 'Allow' ? '#34d399' : '#f87171', fontWeight: 600 }}>{rule.effect}</span>
                      <div style={{ color: '#fff' }}>
                        {rule.actions.map(act => (
                          <div key={act}>{act}</div>
                        ))}
                      </div>
                      <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rule.resource}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Principals Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>
                    Principals ({selectedPolicy.principals.length})
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selectedPolicy.principals.map(pr => (
                    <div key={pr.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                      <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>●</span> {pr.name}
                      </span>
                      <span style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: 4, fontSize: 10 }}>
                        {pr.type}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#view-all-principals"
                  onClick={e => {
                    e.preventDefault();
                    addToast('Viewing all assigned principals', 'info');
                  }}
                  style={{ fontSize: 11, color: '#a855f7', textDecoration: 'none', display: 'inline-block', marginTop: 4, textAlign: 'right' }}
                >
                  View all ↗
                </a>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => addToast(`Editing policy ${selectedPolicy.name}`, 'info')}
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
                  Edit Policy
                </button>
                <button
                  onClick={() => handleDeletePolicy(selectedPolicy.id, selectedPolicy.name)}
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
                  Delete Policy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog for "+ Create Policy" */}
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
              maxWidth: 540,
              padding: 28,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Create Access Control Policy</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 20, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePolicy} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Policy Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Platform Read Access"
                  value={newPolicyName}
                  onChange={e => setNewPolicyName(e.target.value)}
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
                  Subtitle / Summary
                </label>
                <input
                  type="text"
                  placeholder="e.g. Read access to data platform resources"
                  value={newPolicySubtitle}
                  onChange={e => setNewPolicySubtitle(e.target.value)}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Workspace
                  </label>
                  <select
                    value={newPolicyWorkspace}
                    onChange={e => setNewPolicyWorkspace(e.target.value)}
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
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Policy Type
                  </label>
                  <select
                    value={newPolicyType}
                    onChange={e => setNewPolicyType(e.target.value as any)}
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
                    <option value="Custom Policy">Custom Policy</option>
                    <option value="System Policy">System Policy</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Effect
                  </label>
                  <select
                    value={newPolicyEffect}
                    onChange={e => setNewPolicyEffect(e.target.value as any)}
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
                    <option value="Allow">Allow</option>
                    <option value="Deny">Deny</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Resource Pattern *
                </label>
                <input
                  type="text"
                  placeholder="e.g. s3://acme-data-platform/*"
                  value={newPolicyResource}
                  onChange={e => setNewPolicyResource(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Allowed / Denied Actions (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="s3:GetObject, s3:ListBucket"
                  value={newPolicyActions}
                  onChange={e => setNewPolicyActions(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'monospace',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe access boundary and permission rules..."
                  value={newPolicyDesc}
                  onChange={e => setNewPolicyDesc(e.target.value)}
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
                  Create Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
