import React, { useState, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

export interface WorkspaceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'Active' | 'Paused' | 'Archived';
  isDefault?: boolean;
  iconBg: string;
  iconType: 'layers' | 'chart' | 'code' | 'cart' | 'shield' | 'archive' | 'custom';
  customIcon?: string;
  tags: string[];
  projectsCount: number;
  membersCount: number;
  storageGb: number;
  owner: string;
  updatedAt: string;
}

const INITIAL_WORKSPACES: WorkspaceItem[] = [
  {
    id: 'ws-1',
    name: 'AI Innovation Lab',
    slug: 'workspace-ai-lab',
    description: 'Main workspace for AI/ML experimentation and production workloads.',
    status: 'Active',
    isDefault: true,
    iconBg: 'rgba(139, 92, 246, 0.2)',
    iconType: 'layers',
    tags: ['AI/ML', 'RAG', 'Agents'],
    projectsCount: 12,
    membersCount: 24,
    storageGb: 86,
    owner: 'Alex Chen',
    updatedAt: '2026-07-22T10:00:00Z',
  },
  {
    id: 'ws-2',
    name: 'Data Platform',
    slug: 'workspace-data',
    description: 'Analytics and data engineering platform for enterprise data workloads.',
    status: 'Active',
    iconBg: 'rgba(59, 130, 246, 0.2)',
    iconType: 'chart',
    tags: ['Data Engineering', 'Analytics', 'Lakehouse'],
    projectsCount: 8,
    membersCount: 18,
    storageGb: 72,
    owner: 'Sarah Jenkins',
    updatedAt: '2026-07-21T16:30:00Z',
  },
  {
    id: 'ws-3',
    name: 'Product Development',
    slug: 'workspace-product',
    description: 'Product engineering and application development.',
    status: 'Active',
    iconBg: 'rgba(16, 185, 129, 0.2)',
    iconType: 'code',
    tags: ['Development', 'APIs', 'Web Apps'],
    projectsCount: 10,
    membersCount: 32,
    storageGb: 54,
    owner: 'Tech Lead',
    updatedAt: '2026-07-20T14:15:00Z',
  },
  {
    id: 'ws-4',
    name: 'Research & POCs',
    slug: 'workspace-research',
    description: 'Experimental projects and proof of concepts.',
    status: 'Active',
    iconBg: 'rgba(245, 158, 11, 0.2)',
    iconType: 'cart',
    tags: ['Research', 'POC', 'Innovation'],
    projectsCount: 6,
    membersCount: 14,
    storageGb: 18,
    owner: 'Alex Chen',
    updatedAt: '2026-07-19T09:45:00Z',
  },
  {
    id: 'ws-5',
    name: 'Security Operations',
    slug: 'workspace-security',
    description: 'Security monitoring and governance solutions.',
    status: 'Paused',
    iconBg: 'rgba(239, 68, 68, 0.2)',
    iconType: 'shield',
    tags: ['Security', 'Compliance', 'Monitoring'],
    projectsCount: 4,
    membersCount: 10,
    storageGb: 12,
    owner: 'SecOps',
    updatedAt: '2026-07-18T11:20:00Z',
  },
  {
    id: 'ws-6',
    name: 'Legacy Systems',
    slug: 'workspace-legacy',
    description: 'Archived workspace for legacy applications.',
    status: 'Archived',
    iconBg: 'rgba(107, 114, 128, 0.2)',
    iconType: 'archive',
    tags: ['Legacy', 'Archive'],
    projectsCount: 8,
    membersCount: 6,
    storageGb: 6,
    owner: 'Admin',
    updatedAt: '2026-07-10T08:00:00Z',
  },
  {
    id: 'ws-7',
    name: 'Customer Success & CRM',
    slug: 'workspace-crm',
    description: 'Workspace for integrations with Salesforce, HubSpot, and support tools.',
    status: 'Active',
    iconBg: 'rgba(59, 130, 246, 0.2)',
    iconType: 'chart',
    tags: ['CRM', 'Integrations', 'Support'],
    projectsCount: 5,
    membersCount: 12,
    storageGb: 22,
    owner: 'Sarah Jenkins',
    updatedAt: '2026-07-09T15:00:00Z',
  },
  {
    id: 'ws-8',
    name: 'DevOps & Infrastructure',
    slug: 'workspace-devops',
    description: 'CI/CD deployment context, Terraform modules, and Kubernetes configs.',
    status: 'Active',
    iconBg: 'rgba(16, 185, 129, 0.2)',
    iconType: 'code',
    tags: ['DevOps', 'Kubernetes', 'CI/CD'],
    projectsCount: 7,
    membersCount: 15,
    storageGb: 40,
    owner: 'Tech Lead',
    updatedAt: '2026-07-08T12:00:00Z',
  },
  {
    id: 'ws-9',
    name: 'Finance & Billing Systems',
    slug: 'workspace-finance',
    description: 'Stripe integration pipelines and billing telemetry analytics.',
    status: 'Active',
    iconBg: 'rgba(139, 92, 246, 0.2)',
    iconType: 'layers',
    tags: ['Finance', 'Stripe', 'Analytics'],
    projectsCount: 3,
    membersCount: 8,
    storageGb: 15,
    owner: 'Admin',
    updatedAt: '2026-07-05T10:30:00Z',
  },
  {
    id: 'ws-10',
    name: 'Mobile Apps Engine',
    slug: 'workspace-mobile',
    description: 'iOS and Android build pipelines and context services.',
    status: 'Active',
    iconBg: 'rgba(245, 158, 11, 0.2)',
    iconType: 'cart',
    tags: ['Mobile', 'iOS', 'Android'],
    projectsCount: 4,
    membersCount: 11,
    storageGb: 28,
    owner: 'Tech Lead',
    updatedAt: '2026-07-04T17:20:00Z',
  },
  {
    id: 'ws-11',
    name: 'LLM Fine-tuning & Benchmarks',
    slug: 'workspace-llm-eval',
    description: 'Evaluation benchmarks, synthetic data pipelines, and prompt datasets.',
    status: 'Active',
    iconBg: 'rgba(139, 92, 246, 0.2)',
    iconType: 'layers',
    tags: ['LLM', 'Eval', 'Datasets'],
    projectsCount: 9,
    membersCount: 20,
    storageGb: 65,
    owner: 'Alex Chen',
    updatedAt: '2026-07-02T13:40:00Z',
  },
  {
    id: 'ws-12',
    name: 'Internal Knowledge Base',
    slug: 'workspace-kb',
    description: 'Company-wide documentation index, Notion sync, and Slack bots.',
    status: 'Active',
    iconBg: 'rgba(59, 130, 246, 0.2)',
    iconType: 'chart',
    tags: ['Docs', 'RAG', 'Knowledge'],
    projectsCount: 2,
    membersCount: 45,
    storageGb: 35,
    owner: 'Admin',
    updatedAt: '2026-07-01T09:00:00Z',
  },
];

export default function TenantWorkspaces() {
  const { addToast } = useToast();

  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>(INITIAL_WORKSPACES);
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Paused' | 'Archived'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'recently_updated' | 'name' | 'projects' | 'storage'>('recently_updated');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newWsName, setNewWsName] = useState('');
  const [newWsSlug, setNewWsSlug] = useState('');
  const [newWsDesc, setNewWsDesc] = useState('');
  const [newWsTags, setNewWsTags] = useState('');
  const [newWsOwner, setNewWsOwner] = useState('Alex Chen');
  const [newWsQuota, setNewWsQuota] = useState('50');

  // Menu Dropdown Open ID
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Auto-generate slug when name changes in create modal
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewWsName(val);
    const slugified = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setNewWsSlug(slugified ? `workspace-${slugified}` : '');
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) {
      addToast('Please enter a workspace name', 'error');
      return;
    }

    const tagList = newWsTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newWorkspace: WorkspaceItem = {
      id: `ws-${Date.now()}`,
      name: newWsName.trim(),
      slug: newWsSlug || `workspace-${Date.now()}`,
      description: newWsDesc.trim() || 'Custom created workspace.',
      status: 'Active',
      iconBg: 'rgba(139, 92, 246, 0.2)',
      iconType: 'layers',
      tags: tagList.length > 0 ? tagList : ['General'],
      projectsCount: 1,
      membersCount: 1,
      storageGb: parseInt(newWsQuota, 10) || 10,
      owner: newWsOwner,
      updatedAt: new Date().toISOString(),
    };

    setWorkspaces([newWorkspace, ...workspaces]);
    setIsCreateModalOpen(false);
    setNewWsName('');
    setNewWsSlug('');
    setNewWsDesc('');
    setNewWsTags('');
    addToast(`Workspace "${newWorkspace.name}" created successfully!`, 'success');
  };

  const handleToggleStatus = (id: string, currentStatus: WorkspaceItem['status']) => {
    const nextStatusMap: Record<WorkspaceItem['status'], WorkspaceItem['status']> = {
      Active: 'Paused',
      Paused: 'Active',
      Archived: 'Active',
    };
    const nextStatus = nextStatusMap[currentStatus];

    setWorkspaces(prev =>
      prev.map(ws => (ws.id === id ? { ...ws, status: nextStatus } : ws))
    );
    setOpenMenuId(null);
    addToast(`Workspace status changed to ${nextStatus}`, 'info');
  };

  const handleArchiveWorkspace = (id: string) => {
    setWorkspaces(prev =>
      prev.map(ws => (ws.id === id ? { ...ws, status: 'Archived' } : ws))
    );
    setOpenMenuId(null);
    addToast('Workspace archived', 'info');
  };

  const handleDeleteWorkspace = (id: string, name: string) => {
    setWorkspaces(prev => prev.filter(ws => ws.id !== id));
    setOpenMenuId(null);
    addToast(`Deleted workspace "${name}"`, 'success');
  };

  // Stats calculation
  const totalWorkspacesCount = workspaces.length;
  const activeWorkspacesCount = workspaces.filter(w => w.status === 'Active').length;
  const pausedWorkspacesCount = workspaces.filter(w => w.status === 'Paused').length;
  const archivedWorkspacesCount = workspaces.filter(w => w.status === 'Archived').length;
  const totalProjectsCount = workspaces.reduce((acc, w) => acc + w.projectsCount, 0);
  const totalStorageGb = workspaces.reduce((acc, w) => acc + w.storageGb, 0);
  const maxStorageGb = 400;
  const storagePercentage = Math.min(100, Math.round((totalStorageGb / maxStorageGb) * 100));

  // Filtered & Sorted Workspaces
  const filteredWorkspaces = useMemo(() => {
    return workspaces.filter(ws => {
      // Tab filter
      if (activeTab === 'Active' && ws.status !== 'Active') return false;
      if (activeTab === 'Paused' && ws.status !== 'Paused') return false;
      if (activeTab === 'Archived' && ws.status !== 'Archived') return false;

      // Status dropdown filter
      if (statusFilter !== 'All' && ws.status !== statusFilter) return false;

      // Owner filter
      if (ownerFilter !== 'All' && ws.owner !== ownerFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ws.name.toLowerCase().includes(q);
        const matchesSlug = ws.slug.toLowerCase().includes(q);
        const matchesDesc = ws.description.toLowerCase().includes(q);
        const matchesTag = ws.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesSlug && !matchesDesc && !matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'recently_updated') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'projects') {
        return b.projectsCount - a.projectsCount;
      }
      if (sortBy === 'storage') {
        return b.storageGb - a.storageGb;
      }
      return 0;
    });
  }, [workspaces, activeTab, statusFilter, ownerFilter, searchQuery, sortBy]);

  // Pagination calculation
  const totalFilteredCount = filteredWorkspaces.length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedWorkspaces = filteredWorkspaces.slice(startIndex, startIndex + itemsPerPage);

  const renderIcon = (type: WorkspaceItem['iconType']) => {
    switch (type) {
      case 'layers':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      case 'chart':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      case 'code':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'cart':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        );
      case 'shield':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'archive':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <polyline points="21 8 21 21 3 21 3 8" />
            <rect x="1" y="3" width="22" height="5" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
        );
      default:
        return <span>📦</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Header section */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div className="page-title">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Workspaces</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6, margin: 0 }}>
            Create and manage isolated workspaces for your teams and projects.
          </p>
        </div>
      </div>

      {/* KPI Stats Row (4 Cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {/* Card 1: Total Workspaces */}
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
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Workspaces</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalWorkspacesCount}
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              ↑ 20% <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
            </span>
          </div>
        </div>

        {/* Card 2: Active Workspaces */}
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
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Active Workspaces</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {activeWorkspacesCount}
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              ↑ 11% <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
            </span>
          </div>
        </div>

        {/* Card 3: Total Projects */}
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
              background: 'rgba(59, 130, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Projects</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalProjectsCount}
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              ↑ 18% <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
            </span>
          </div>
        </div>

        {/* Card 4: Storage Used */}
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
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Storage Used</span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{storagePercentage}% of 400 GB</span>
            </div>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalStorageGb} GB
            </span>
            <div
              style={{
                width: '100%',
                height: 6,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                marginTop: 8,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${storagePercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #8b5cf6, #a855f7)',
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs and Controls Row */}
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
        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { key: 'All', label: 'All Workspaces', count: totalWorkspacesCount },
            { key: 'Active', label: 'Active', count: activeWorkspacesCount },
            { key: 'Paused', label: 'Paused', count: pausedWorkspacesCount },
            { key: 'Archived', label: 'Archived', count: archivedWorkspacesCount },
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

        {/* Right side controls (View as switcher + Create Workspace button) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
            <span>View as</span>
            <div
              style={{
                display: 'flex',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                padding: 3,
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                title="Grid View"
                style={{
                  background: viewMode === 'grid' ? '#1f2937' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: viewMode === 'grid' ? '#fff' : 'var(--text-secondary)',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="List View"
                style={{
                  background: viewMode === 'list' ? '#1f2937' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: viewMode === 'list' ? '#fff' : 'var(--text-secondary)',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
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
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Create Workspace
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
            placeholder="Search workspaces by name, description or tags..."
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

        {/* Status Filter Dropdown */}
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
              padding: '10px 12px',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="All">Status: All Status</option>
            <option value="Active">Status: Active</option>
            <option value="Paused">Status: Paused</option>
            <option value="Archived">Status: Archived</option>
          </select>
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
        </div>

        {/* Owner Filter Dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={ownerFilter}
            onChange={e => {
              setOwnerFilter(e.target.value);
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
            <option value="All">Owner: All Owners</option>
            <option value="Alex Chen">Owner: Alex Chen</option>
            <option value="Sarah Jenkins">Owner: Sarah Jenkins</option>
            <option value="Tech Lead">Owner: Tech Lead</option>
            <option value="SecOps">Owner: SecOps</option>
            <option value="Admin">Owner: Admin</option>
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
            <option value="name">Sort by: Name (A-Z)</option>
            <option value="projects">Sort by: Most Projects</option>
            <option value="storage">Sort by: Storage Used</option>
          </select>
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
        </div>
      </div>

      {/* Main Workspace Display Content (Grid vs List View) */}
      {paginatedWorkspaces.length === 0 ? (
        <div
          className="widget"
          style={{
            padding: 48,
            textAlign: 'center',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 36 }}>🔍</div>
          <h3 style={{ color: '#fff', fontSize: 18, margin: 0 }}>No workspaces found</h3>
          <p style={{ fontSize: 13, margin: 0 }}>Try refining your search query or clear your status filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View Layout (3 columns) */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {paginatedWorkspaces.map(ws => {
            const isMenuOpen = openMenuId === ws.id;
            return (
              <div
                key={ws.id}
                className="widget"
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 12,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 16,
                  position: 'relative',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                {/* Top Card Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: ws.iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {renderIcon(ws.iconType)}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: 0 }}>{ws.name}</h3>
                        {ws.isDefault && (
                          <span
                            style={{
                              background: 'rgba(139, 92, 246, 0.2)',
                              color: '#c084fc',
                              fontSize: 11,
                              fontWeight: 500,
                              padding: '2px 8px',
                              borderRadius: 10,
                            }}
                          >
                            Default
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace', marginTop: 2 }}>
                        {ws.slug}
                      </div>
                    </div>
                  </div>

                  {/* Top Right Status Badge & Menu */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
                    {ws.status === 'Active' && (
                      <span
                        style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          fontSize: 11,
                          fontWeight: 500,
                          padding: '3px 8px',
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
                        Active
                      </span>
                    )}
                    {ws.status === 'Paused' && (
                      <span
                        style={{
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: '#fbbf24',
                          fontSize: 11,
                          fontWeight: 500,
                          padding: '3px 8px',
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
                        Paused
                      </span>
                    )}
                    {ws.status === 'Archived' && (
                      <span
                        style={{
                          background: 'rgba(107, 114, 128, 0.15)',
                          color: '#9ca3af',
                          fontSize: 11,
                          fontWeight: 500,
                          padding: '3px 8px',
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#9ca3af' }} />
                        Archived
                      </span>
                    )}

                    <button
                      onClick={() => setOpenMenuId(isMenuOpen ? null : ws.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: 4,
                        fontSize: 18,
                        lineHeight: 1,
                      }}
                    >
                      ⋮
                    </button>

                    {/* Options Menu Dropdown */}
                    {isMenuOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 28,
                          right: 0,
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 8,
                          padding: '6px 0',
                          zIndex: 30,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                          width: 160,
                        }}
                      >
                        <div
                          onClick={() => {
                            addToast(`Opening workspace ${ws.name}`, 'info');
                            setOpenMenuId(null);
                          }}
                          style={{ padding: '8px 14px', fontSize: 13, color: '#fff', cursor: 'pointer' }}
                        >
                          View Details
                        </div>
                        <div
                          onClick={() => handleToggleStatus(ws.id, ws.status)}
                          style={{ padding: '8px 14px', fontSize: 13, color: '#fff', cursor: 'pointer' }}
                        >
                          {ws.status === 'Active' ? 'Pause Workspace' : 'Activate Workspace'}
                        </div>
                        {ws.status !== 'Archived' && (
                          <div
                            onClick={() => handleArchiveWorkspace(ws.id)}
                            style={{ padding: '8px 14px', fontSize: 13, color: '#fbbf24', cursor: 'pointer' }}
                          >
                            Archive Workspace
                          </div>
                        )}
                        <div
                          onClick={() => handleDeleteWorkspace(ws.id, ws.name)}
                          style={{ padding: '8px 14px', fontSize: 13, color: '#ef4444', cursor: 'pointer' }}
                        >
                          Delete Workspace
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    margin: 0,
                    minHeight: 38,
                  }}
                >
                  {ws.description}
                </p>

                {/* Tags Pills */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {ws.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-secondary)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: 11,
                        padding: '3px 10px',
                        borderRadius: 14,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Footer Info */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    📁 {ws.projectsCount} Projects
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    👥 {ws.membersCount} Members
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    💾 {ws.storageGb} GB
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View Layout */
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
                <th style={{ padding: '14px 16px' }}>Workspace</th>
                <th style={{ padding: '14px 16px' }}>Status</th>
                <th style={{ padding: '14px 16px' }}>Tags</th>
                <th style={{ padding: '14px 16px' }}>Projects</th>
                <th style={{ padding: '14px 16px' }}>Members</th>
                <th style={{ padding: '14px 16px' }}>Storage</th>
                <th style={{ padding: '14px 16px' }}>Owner</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWorkspaces.map(ws => (
                <tr key={ws.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 6, background: ws.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {renderIcon(ws.iconType)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{ws.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{ws.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 10, background: ws.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: ws.status === 'Active' ? '#34d399' : '#fbbf24' }}>
                      {ws.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {ws.tags.slice(0, 2).map(t => (
                        <span key={t} style={{ fontSize: 10, background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4, color: 'var(--text-secondary)' }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>{ws.projectsCount}</td>
                  <td style={{ padding: '14px 16px' }}>{ws.membersCount}</td>
                  <td style={{ padding: '14px 16px' }}>{ws.storageGb} GB</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{ws.owner}</td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleToggleStatus(ws.id, ws.status)}
                      style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'pointer', fontSize: 12, marginRight: 12 }}
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => handleDeleteWorkspace(ws.id, ws.name)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          color: 'var(--text-secondary)',
          fontSize: 13,
        }}
      >
        <div>
          Showing {totalFilteredCount === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, totalFilteredCount)} of {totalFilteredCount} workspaces
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

      {/* Modal Dialog for "+ Create Workspace" */}
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
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Create New Workspace</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 20, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWorkspace} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Workspace Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI Innovation Lab"
                  value={newWsName}
                  onChange={handleNameChange}
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
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="workspace-slug"
                  value={newWsSlug}
                  onChange={e => setNewWsSlug(e.target.value)}
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
                  placeholder="Describe the primary purpose of this workspace..."
                  value={newWsDesc}
                  onChange={e => setNewWsDesc(e.target.value)}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="AI/ML, RAG, Agents"
                    value={newWsTags}
                    onChange={e => setNewWsTags(e.target.value)}
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

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Initial Storage Quota (GB)
                  </label>
                  <input
                    type="number"
                    value={newWsQuota}
                    onChange={e => setNewWsQuota(e.target.value)}
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
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Workspace Owner
                </label>
                <select
                  value={newWsOwner}
                  onChange={e => setNewWsOwner(e.target.value)}
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
                  <option value="Alex Chen">Alex Chen</option>
                  <option value="Sarah Jenkins">Sarah Jenkins</option>
                  <option value="Tech Lead">Tech Lead</option>
                  <option value="SecOps">SecOps</option>
                  <option value="Mukesh Kumar">Mukesh Kumar</option>
                </select>
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
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
