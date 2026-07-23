import React, { useState, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

export interface AIProviderItem {
  id: string;
  name: string;
  subtitle: string;
  type: 'SaaS' | 'Cloud' | 'Self-hosted';
  status: 'Active' | 'Paused' | 'Error';
  modelsCount: number;
  lastChecked: string;
  updatedBy: string;
  iconBg: string;
  iconType: 'openai' | 'anthropic' | 'google' | 'azure' | 'aws' | 'cohere' | 'mistral' | 'ollama' | 'custom';
}

const INITIAL_PROVIDERS: AIProviderItem[] = [
  {
    id: 'prov-1',
    name: 'OpenAI',
    subtitle: 'OpenAI API',
    type: 'SaaS',
    status: 'Active',
    modelsCount: 18,
    lastChecked: 'May 21, 2025 10:30 AM',
    updatedBy: 'Mukesh Kumar',
    iconBg: '#1f2937',
    iconType: 'openai',
  },
  {
    id: 'prov-2',
    name: 'Anthropic',
    subtitle: 'Claude API',
    type: 'SaaS',
    status: 'Active',
    modelsCount: 10,
    lastChecked: 'May 21, 2025 10:25 AM',
    updatedBy: 'Mukesh Kumar',
    iconBg: '#374151',
    iconType: 'anthropic',
  },
  {
    id: 'prov-3',
    name: 'Google Vertex AI',
    subtitle: 'Google Cloud',
    type: 'Cloud',
    status: 'Active',
    modelsCount: 24,
    lastChecked: 'May 21, 2025 10:20 AM',
    updatedBy: 'Piyush Sharma',
    iconBg: '#1f2937',
    iconType: 'google',
  },
  {
    id: 'prov-4',
    name: 'Azure OpenAI',
    subtitle: 'Microsoft Azure',
    type: 'Cloud',
    status: 'Active',
    modelsCount: 16,
    lastChecked: 'May 21, 2025 10:15 AM',
    updatedBy: 'Rohit Verma',
    iconBg: '#1e3a8a',
    iconType: 'azure',
  },
  {
    id: 'prov-5',
    name: 'AWS Bedrock',
    subtitle: 'Amazon Web Services',
    type: 'Cloud',
    status: 'Active',
    modelsCount: 12,
    lastChecked: 'May 21, 2025 10:00 AM',
    updatedBy: 'Mukesh Kumar',
    iconBg: '#064e3b',
    iconType: 'aws',
  },
  {
    id: 'prov-6',
    name: 'Cohere',
    subtitle: 'Cohere API',
    type: 'SaaS',
    status: 'Paused',
    modelsCount: 8,
    lastChecked: 'May 21, 2025 09:50 AM',
    updatedBy: 'Mukesh Kumar',
    iconBg: '#1f2937',
    iconType: 'cohere',
  },
  {
    id: 'prov-7',
    name: 'Mistral AI',
    subtitle: 'Mistral API',
    type: 'SaaS',
    status: 'Error',
    modelsCount: 7,
    lastChecked: 'May 21, 2025 09:30 AM',
    updatedBy: 'Piyush Sharma',
    iconBg: '#7c2d12',
    iconType: 'mistral',
  },
  {
    id: 'prov-8',
    name: 'Ollama',
    subtitle: 'Self-hosted',
    type: 'Self-hosted',
    status: 'Active',
    modelsCount: 6,
    lastChecked: 'May 21, 2025 09:10 AM',
    updatedBy: 'Rohit Verma',
    iconBg: '#111827',
    iconType: 'ollama',
  },
];

export default function TenantAIProviders() {
  const { addToast } = useToast();

  const [providers, setProviders] = useState<AIProviderItem[]>(INITIAL_PROVIDERS);
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Paused' | 'Error'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProvName, setNewProvName] = useState('');
  const [newProvSubtitle, setNewProvSubtitle] = useState('');
  const [newProvType, setNewProvType] = useState<'SaaS' | 'Cloud' | 'Self-hosted'>('SaaS');
  const [newProvApiKey, setNewProvApiKey] = useState('');
  const [newProvModels, setNewProvModels] = useState('5');

  // Menu dropdown state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleAddProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvName.trim()) {
      addToast('Please enter a provider name', 'error');
      return;
    }

    const newProv: AIProviderItem = {
      id: `prov-${Date.now()}`,
      name: newProvName.trim(),
      subtitle: newProvSubtitle.trim() || `${newProvName} API`,
      type: newProvType,
      status: 'Active',
      modelsCount: parseInt(newProvModels, 10) || 5,
      lastChecked: 'Just now',
      updatedBy: 'Mukesh Kumar',
      iconBg: '#1f2937',
      iconType: 'custom',
    };

    setProviders([newProv, ...providers]);
    setIsAddModalOpen(false);
    setNewProvName('');
    setNewProvSubtitle('');
    setNewProvApiKey('');
    setNewProvModels('5');
    addToast(`AI Provider "${newProv.name}" added successfully!`, 'success');
  };

  const handleToggleStatus = (id: string, currentStatus: AIProviderItem['status']) => {
    const nextStatus: AIProviderItem['status'] = currentStatus === 'Active' ? 'Paused' : 'Active';
    setProviders(prev => prev.map(p => (p.id === id ? { ...p, status: nextStatus } : p)));
    setOpenMenuId(null);
    addToast(`Provider status changed to ${nextStatus}`, 'info');
  };

  const handleDeleteProvider = (id: string, name: string) => {
    setProviders(prev => prev.filter(p => p.id !== id));
    setOpenMenuId(null);
    addToast(`Deleted provider "${name}"`, 'success');
  };

  // Stats calculation
  const totalCount = providers.length;
  const activeCount = providers.filter(p => p.status === 'Active').length;
  const pausedCount = providers.filter(p => p.status === 'Paused').length;
  const errorCount = providers.filter(p => p.status === 'Error').length;

  // Filtered providers
  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      // Tab filter
      if (activeTab === 'Active' && p.status !== 'Active') return false;
      if (activeTab === 'Paused' && p.status !== 'Paused') return false;
      if (activeTab === 'Error' && p.status !== 'Error') return false;

      // Type dropdown filter
      if (typeFilter !== 'All' && p.type !== typeFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle) return false;
      }

      return true;
    });
  }, [providers, activeTab, typeFilter, searchQuery]);

  // Pagination calculation
  const totalFilteredCount = filteredProviders.length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedTableProviders = filteredProviders.slice(startIndex, startIndex + itemsPerPage);

  const renderLogo = (iconType: AIProviderItem['iconType'], name: string) => {
    switch (iconType) {
      case 'openai':
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#000',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 18,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            ☯
          </div>
        );
      case 'anthropic':
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#d97706',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            AI
          </div>
        );
      case 'google':
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #4285f4, #ea4335, #fbbc05, #34a853)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            G
          </div>
        );
      case 'azure':
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#0078d4',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            A
          </div>
        );
      case 'aws':
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#0d9488',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            ☁️
          </div>
        );
      case 'cohere':
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#059669',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            C
          </div>
        );
      case 'mistral':
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#ea580c',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            M
          </div>
        );
      case 'ollama':
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#fff',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            🦙
          </div>
        );
      default:
        return (
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: '#6b7280',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {name.substring(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>AI Providers</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6, margin: 0 }}>
            Connect and manage AI/ML providers to power your applications and agents.{' '}
            <a
              href="#learn-more"
              onClick={e => {
                e.preventDefault();
                addToast('Opening AI Provider documentation', 'info');
              }}
              style={{ color: '#a855f7', textDecoration: 'none', marginLeft: 4 }}
            >
              Learn more ↗
            </a>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => addToast('Help & Guide: AI Providers configuration', 'info')}
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
            onClick={() => setIsAddModalOpen(true)}
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
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Provider
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
        {/* Card 1: Total Providers */}
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Providers</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalCount}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              All configured providers
            </span>
          </div>
        </div>

        {/* Card 2: Active Providers */}
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
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Active Providers</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {activeCount}
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              Currently available
            </span>
          </div>
        </div>

        {/* Card 3: Paused Providers */}
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
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#f59e0b',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ▌▌
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Paused Providers</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {pausedCount}
            </span>
            <span style={{ fontSize: 12, color: '#f59e0b', fontWeight: 500, marginTop: 4 }}>
              Temporarily paused
            </span>
          </div>
        </div>

        {/* Card 4: Error Providers */}
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
              ✕
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Error Providers</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {errorCount}
            </span>
            <span style={{ fontSize: 12, color: '#ef4444', fontWeight: 500, marginTop: 4 }}>
              Connection error
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Tab Row */}
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
        {/* Left Status Tabs */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { key: 'All', label: 'All Providers', count: totalCount },
            { key: 'Active', label: 'Active', count: activeCount },
            { key: 'Paused', label: 'Paused', count: pausedCount },
            { key: 'Error', label: 'Error', count: errorCount },
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

        {/* Right Search, Type dropdown, View Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Search field */}
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
              placeholder="Search providers by name..."
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
                padding: '8px 12px 8px 34px',
                color: '#fff',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          {/* Type dropdown */}
          <div style={{ position: 'relative', width: 140 }}>
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
                padding: '8px 12px',
                color: '#fff',
                fontSize: 13,
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
              }}
            >
              <option value="All">All Types</option>
              <option value="SaaS">SaaS</option>
              <option value="Cloud">Cloud</option>
              <option value="Self-hosted">Self-hosted</option>
            </select>
            <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
          </div>

          {/* View mode toggle */}
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
                padding: '5px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                padding: '5px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      </div>

      {/* Grid View (4 columns x 2 rows cards display) */}
      {viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {filteredProviders.map(p => (
            <div
              key={p.id}
              className="widget"
              style={{
                background: 'var(--bg-panel)',
                border: '1px solid var(--border-color)',
                borderRadius: 12,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {renderLogo(p.iconType, p.name)}
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>{p.name}</h4>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.subtitle}</span>
                  </div>
                </div>

                {/* Status Badge */}
                {p.status === 'Active' && (
                  <span
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#34d399',
                      fontSize: 11,
                      fontWeight: 500,
                      padding: '2px 8px',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} />
                    Active
                  </span>
                )}
                {p.status === 'Paused' && (
                  <span
                    style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      color: '#fbbf24',
                      fontSize: 11,
                      fontWeight: 500,
                      padding: '2px 8px',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fbbf24' }} />
                    Paused
                  </span>
                )}
                {p.status === 'Error' && (
                  <span
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#f87171',
                      fontSize: 11,
                      fontWeight: 500,
                      padding: '2px 8px',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f87171' }} />
                    Error
                  </span>
                )}
              </div>

              {/* Models Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: 12,
                }}
              >
                <span>Models</span>
                <span style={{ fontWeight: 600, color: '#fff' }}>{p.modelsCount}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Configured Providers Table Section */}
      <div
        className="widget"
        style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-color)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            fontSize: 15,
            fontWeight: 600,
            color: '#fff',
          }}
        >
          Configured Providers
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '12px 20px' }}>Provider</th>
              <th style={{ padding: '12px 20px' }}>Type</th>
              <th style={{ padding: '12px 20px' }}>Status</th>
              <th style={{ padding: '12px 20px' }}>Models</th>
              <th style={{ padding: '12px 20px' }}>Last Checked</th>
              <th style={{ padding: '12px 20px' }}>Updated By</th>
              <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTableProviders.map(p => {
              const isMenuOpen = openMenuId === p.id;
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {renderLogo(p.iconType, p.name)}
                      <span style={{ fontWeight: 600, color: '#fff' }}>{p.name}</span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-secondary)',
                        fontSize: 12,
                        padding: '3px 10px',
                        borderRadius: 6,
                      }}
                    >
                      {p.type}
                    </span>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    {p.status === 'Active' && (
                      <span style={{ color: '#34d399', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399' }} />
                        Active
                      </span>
                    )}
                    {p.status === 'Paused' && (
                      <span style={{ color: '#fbbf24', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
                        Paused
                      </span>
                    )}
                    {p.status === 'Error' && (
                      <span style={{ color: '#f87171', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171' }} />
                        Error
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '14px 20px', fontWeight: 500 }}>{p.modelsCount}</td>

                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: p.status === 'Active' ? '#34d399' : p.status === 'Paused' ? '#fbbf24' : '#f87171',
                        }}
                      />
                      {p.lastChecked}
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>{p.updatedBy}</td>

                  <td style={{ padding: '14px 20px', textAlign: 'right', position: 'relative' }}>
                    <button
                      onClick={() => setOpenMenuId(isMenuOpen ? null : p.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: 18,
                      }}
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
                          width: 150,
                          textAlign: 'left',
                        }}
                      >
                        <div
                          onClick={() => handleToggleStatus(p.id, p.status)}
                          style={{ padding: '8px 14px', fontSize: 13, color: '#fff', cursor: 'pointer' }}
                        >
                          {p.status === 'Active' ? 'Pause Provider' : 'Activate Provider'}
                        </div>
                        <div
                          onClick={() => handleDeleteProvider(p.id, p.name)}
                          style={{ padding: '8px 14px', fontSize: 13, color: '#ef4444', cursor: 'pointer' }}
                        >
                          Delete Provider
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
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
          {Math.min(startIndex + itemsPerPage, totalFilteredCount)} of {totalFilteredCount} providers
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

      {/* Modal Dialog for "+ Add Provider" */}
      {isAddModalOpen && (
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
              maxWidth: 500,
              padding: 28,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Add AI Provider</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 20, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProvider} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Provider Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. OpenAI, Together AI"
                  value={newProvName}
                  onChange={e => setNewProvName(e.target.value)}
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
                  Subtitle / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. OpenAI API"
                  value={newProvSubtitle}
                  onChange={e => setNewProvSubtitle(e.target.value)}
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
                    Type
                  </label>
                  <select
                    value={newProvType}
                    onChange={e => setNewProvType(e.target.value as any)}
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
                    <option value="SaaS">SaaS</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Self-hosted">Self-hosted</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Models Count
                  </label>
                  <input
                    type="number"
                    value={newProvModels}
                    onChange={e => setNewProvModels(e.target.value)}
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
                  API Key / Endpoint Secret
                </label>
                <input
                  type="password"
                  placeholder="sk-..."
                  value={newProvApiKey}
                  onChange={e => setNewProvApiKey(e.target.value)}
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
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
                  Add Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
