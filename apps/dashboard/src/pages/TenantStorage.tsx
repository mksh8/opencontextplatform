import React, { useState, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

export interface StorageBucket {
  id: string;
  name: string;
  subtitle: string;
  workspace: string;
  workspaceCode: string;
  workspaceBg: string;
  region: string;
  storageUsedGb: number;
  percentageOfTotal: number;
  objectsCount: string;
  lastModified: string;
  status: 'Active' | 'Glacier' | 'Inactive';
  iconColor: string;
  createdDate: string;
  arn: string;
  encryption: string;
  versioning: boolean;
  objectLock: string;
  publicAccess: 'Blocked' | 'Allowed';
  tags: string[];
  standardGb: number;
  iaGb: number;
  glacierMb: number;
}

const INITIAL_BUCKETS: StorageBucket[] = [
  {
    id: 'b-1',
    name: 'acme-prod-data',
    subtitle: 'Primary production data',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    region: 'us-east-1 (N. Virginia)',
    storageUsedGb: 68.4,
    percentageOfTotal: 17,
    objectsCount: '320.1K',
    lastModified: 'May 21, 2025 10:30 AM',
    status: 'Active',
    iconColor: '#10b981',
    createdDate: 'Jan 15, 2025',
    arn: 'arn:aws:s3:::acme-prod-data',
    encryption: 'SSE-S3',
    versioning: true,
    objectLock: '—',
    publicAccess: 'Blocked',
    tags: ['environment: production', 'team: data-platform', 'tier: hot'],
    standardGb: 64.1,
    iaGb: 3.8,
    glacierMb: 512,
  },
  {
    id: 'b-2',
    name: 'acme-ml-models',
    subtitle: 'ML models and artifacts',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#3b82f6',
    region: 'us-west-2 (Oregon)',
    storageUsedGb: 45.7,
    percentageOfTotal: 11,
    objectsCount: '152.6K',
    lastModified: 'May 21, 2025 09:15 AM',
    status: 'Active',
    iconColor: '#3b82f6',
    createdDate: 'Feb 01, 2025',
    arn: 'arn:aws:s3:::acme-ml-models',
    encryption: 'SSE-KMS',
    versioning: true,
    objectLock: '—',
    publicAccess: 'Blocked',
    tags: ['environment: production', 'team: ai-lab'],
    standardGb: 40.2,
    iaGb: 5.5,
    glacierMb: 0,
  },
  {
    id: 'b-3',
    name: 'acme-backups',
    subtitle: 'Automated backups',
    workspace: 'Security Operations',
    workspaceCode: 'SO',
    workspaceBg: '#8b5cf6',
    region: 'us-east-1 (N. Virginia)',
    storageUsedGb: 38.9,
    percentageOfTotal: 10,
    objectsCount: '85.4K',
    lastModified: 'May 20, 2025 11:45 PM',
    status: 'Active',
    iconColor: '#8b5cf6',
    createdDate: 'Dec 10, 2024',
    arn: 'arn:aws:s3:::acme-backups',
    encryption: 'SSE-S3',
    versioning: true,
    objectLock: 'Compliance Mode',
    publicAccess: 'Blocked',
    tags: ['environment: production', 'type: backup'],
    standardGb: 20.0,
    iaGb: 15.0,
    glacierMb: 3900,
  },
  {
    id: 'b-4',
    name: 'acme-logs',
    subtitle: 'Application logs',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#f59e0b',
    region: 'ap-south-1 (Mumbai)',
    storageUsedGb: 28.1,
    percentageOfTotal: 7,
    objectsCount: '412.7K',
    lastModified: 'May 20, 2025 08:20 PM',
    status: 'Active',
    iconColor: '#f59e0b',
    createdDate: 'Mar 12, 2025',
    arn: 'arn:aws:s3:::acme-logs',
    encryption: 'SSE-S3',
    versioning: false,
    objectLock: '—',
    publicAccess: 'Blocked',
    tags: ['environment: production', 'type: telemetry'],
    standardGb: 22.0,
    iaGb: 6.1,
    glacierMb: 0,
  },
  {
    id: 'b-5',
    name: 'acme-temp',
    subtitle: 'Temporary files',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    region: 'us-east-1 (N. Virginia)',
    storageUsedGb: 12.6,
    percentageOfTotal: 3,
    objectsCount: '24.2K',
    lastModified: 'May 20, 2025 05:10 PM',
    status: 'Active',
    iconColor: '#06b6d4',
    createdDate: 'Apr 05, 2025',
    arn: 'arn:aws:s3:::acme-temp',
    encryption: 'None',
    versioning: false,
    objectLock: '—',
    publicAccess: 'Blocked',
    tags: ['environment: staging', 'auto-delete: 7d'],
    standardGb: 12.6,
    iaGb: 0,
    glacierMb: 0,
  },
  {
    id: 'b-6',
    name: 'acme-archive',
    subtitle: 'Archived data',
    workspace: 'Data Platform',
    workspaceCode: 'SP',
    workspaceBg: '#8b5cf6',
    region: 'eu-west-1 (Ireland)',
    storageUsedGb: 8.3,
    percentageOfTotal: 2,
    objectsCount: '15.3K',
    lastModified: 'May 19, 2025 04:30 PM',
    status: 'Glacier',
    iconColor: '#6b7280',
    createdDate: 'Nov 20, 2024',
    arn: 'arn:aws:s3:::acme-archive',
    encryption: 'SSE-KMS',
    versioning: true,
    objectLock: '—',
    publicAccess: 'Blocked',
    tags: ['environment: archive', 'storage-class: glacier'],
    standardGb: 0,
    iaGb: 0.3,
    glacierMb: 8000,
  },
  {
    id: 'b-7',
    name: 'acme-public-assets',
    subtitle: 'Public assets and docs',
    workspace: 'Marketing',
    workspaceCode: 'M',
    workspaceBg: '#ef4444',
    region: 'us-east-1 (N. Virginia)',
    storageUsedGb: 6.2,
    percentageOfTotal: 2,
    objectsCount: '9.1K',
    lastModified: 'May 18, 2025 02:25 PM',
    status: 'Active',
    iconColor: '#ef4444',
    createdDate: 'Jan 08, 2025',
    arn: 'arn:aws:s3:::acme-public-assets',
    encryption: 'SSE-S3',
    versioning: true,
    objectLock: '—',
    publicAccess: 'Allowed',
    tags: ['environment: public', 'cdn: enabled'],
    standardGb: 6.2,
    iaGb: 0,
    glacierMb: 0,
  },
  {
    id: 'b-8',
    name: 'acme-test',
    subtitle: 'Testing and QA',
    workspace: 'Product Development',
    workspaceCode: 'PD',
    workspaceBg: '#3b82f6',
    region: 'us-west-2 (Oregon)',
    storageUsedGb: 3.8,
    percentageOfTotal: 1,
    objectsCount: '3.2K',
    lastModified: 'May 18, 2025 01:10 PM',
    status: 'Inactive',
    iconColor: '#4b5563',
    createdDate: 'Apr 20, 2025',
    arn: 'arn:aws:s3:::acme-test',
    encryption: 'None',
    versioning: false,
    objectLock: '—',
    publicAccess: 'Blocked',
    tags: ['environment: test'],
    standardGb: 3.8,
    iaGb: 0,
    glacierMb: 0,
  },
  {
    id: 'b-9',
    name: 'acme-analytics-raw',
    subtitle: 'Clickstream and event streams',
    workspace: 'Data Platform',
    workspaceCode: 'DP',
    workspaceBg: '#8b5cf6',
    region: 'us-east-1 (N. Virginia)',
    storageUsedGb: 15.4,
    percentageOfTotal: 4,
    objectsCount: '180.2K',
    lastModified: 'May 17, 2025 09:00 AM',
    status: 'Active',
    iconColor: '#10b981',
    createdDate: 'Feb 10, 2025',
    arn: 'arn:aws:s3:::acme-analytics-raw',
    encryption: 'SSE-S3',
    versioning: true,
    objectLock: '—',
    publicAccess: 'Blocked',
    tags: ['environment: production', 'pipeline: streaming'],
    standardGb: 14.0,
    iaGb: 1.4,
    glacierMb: 0,
  },
  {
    id: 'b-10',
    name: 'acme-vector-embeddings',
    subtitle: 'OpenContext vector store dumps',
    workspace: 'AI Innovation Lab',
    workspaceCode: 'AI',
    workspaceBg: '#3b82f6',
    region: 'us-west-2 (Oregon)',
    storageUsedGb: 19.8,
    percentageOfTotal: 5,
    objectsCount: '95.0K',
    lastModified: 'May 16, 2025 04:15 PM',
    status: 'Active',
    iconColor: '#3b82f6',
    createdDate: 'Feb 22, 2025',
    arn: 'arn:aws:s3:::acme-vector-embeddings',
    encryption: 'SSE-KMS',
    versioning: true,
    objectLock: '—',
    publicAccess: 'Blocked',
    tags: ['environment: production', 'type: vector'],
    standardGb: 18.0,
    iaGb: 1.8,
    glacierMb: 0,
  },
];

export default function TenantStorage() {
  const { addToast } = useToast();

  const [buckets, setBuckets] = useState<StorageBucket[]>(INITIAL_BUCKETS);
  const [selectedBucketId, setSelectedBucketId] = useState<string>('b-1');
  const [mainTab, setMainTab] = useState<'Buckets' | 'Object Browser' | 'Lifecycle Rules' | 'Access Policies' | 'Activity Logs'>('Buckets');
  const [inspectorTab, setInspectorTab] = useState<'Overview' | 'Access' | 'Lifecycle' | 'Metrics' | 'Permissions'>('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [workspaceFilter, setWorkspaceFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State for "+ Create Bucket"
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBucketName, setNewBucketName] = useState('');
  const [newBucketSubtitle, setNewBucketSubtitle] = useState('');
  const [newBucketWorkspace, setNewBucketWorkspace] = useState('Data Platform');
  const [newBucketRegion, setNewBucketRegion] = useState('us-east-1 (N. Virginia)');
  const [newBucketEncryption, setNewBucketEncryption] = useState('SSE-S3');
  const [newBucketQuota, setNewBucketQuota] = useState('20');

  // Currently Selected Bucket Object
  const selectedBucket = useMemo(() => {
    return buckets.find(b => b.id === selectedBucketId) || buckets[0];
  }, [buckets, selectedBucketId]);

  const handleCreateBucket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBucketName.trim()) {
      addToast('Please enter a bucket name', 'error');
      return;
    }

    const formattedName = newBucketName.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const newBucket: StorageBucket = {
      id: `b-${Date.now()}`,
      name: formattedName,
      subtitle: newBucketSubtitle.trim() || 'New storage bucket',
      workspace: newBucketWorkspace,
      workspaceCode: newBucketWorkspace.substring(0, 2).toUpperCase(),
      workspaceBg: '#8b5cf6',
      region: newBucketRegion,
      storageUsedGb: 0.1,
      percentageOfTotal: 1,
      objectsCount: '1',
      lastModified: 'Just now',
      status: 'Active',
      iconColor: '#10b981',
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      arn: `arn:aws:s3:::${formattedName}`,
      encryption: newBucketEncryption,
      versioning: true,
      objectLock: '—',
      publicAccess: 'Blocked',
      tags: ['environment: production'],
      standardGb: 0.1,
      iaGb: 0,
      glacierMb: 0,
    };

    setBuckets([newBucket, ...buckets]);
    setSelectedBucketId(newBucket.id);
    setIsCreateModalOpen(false);
    setNewBucketName('');
    setNewBucketSubtitle('');
    addToast(`Storage bucket "${newBucket.name}" created successfully!`, 'success');
  };

  const handleDeleteBucket = (id: string, name: string) => {
    const updated = buckets.filter(b => b.id !== id);
    setBuckets(updated);
    if (updated.length > 0) {
      setSelectedBucketId(updated[0].id);
    }
    addToast(`Deleted bucket "${name}"`, 'success');
  };

  // Metrics
  const totalBucketsCount = 18; // matching design screenshot 18
  const totalStorageGb = 248; // matching design 248 GB
  const maxStorageGb = 400;
  const storagePercentage = Math.round((totalStorageGb / maxStorageGb) * 100);

  // Filtered Buckets
  const filteredBuckets = useMemo(() => {
    return buckets.filter(b => {
      if (workspaceFilter !== 'All' && b.workspace !== workspaceFilter) return false;
      if (regionFilter !== 'All' && !b.region.includes(regionFilter)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = b.name.toLowerCase().includes(q);
        const matchWs = b.workspace.toLowerCase().includes(q);
        const matchSub = b.subtitle.toLowerCase().includes(q);
        if (!matchName && !matchWs && !matchSub) return false;
      }
      return true;
    });
  }, [buckets, workspaceFilter, regionFilter, searchQuery]);

  // Pagination calculation
  const totalFilteredCount = filteredBuckets.length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const paginatedBuckets = filteredBuckets.slice(startIndex, startIndex + itemsPerPage);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Copied to clipboard!', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Header Section */}
      <div className="page-header" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Storage</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6, margin: 0 }}>
            Manage and monitor your organization's object storage buckets and usage.{' '}
            <a
              href="#learn-more"
              onClick={e => {
                e.preventDefault();
                addToast('Opening Storage documentation', 'info');
              }}
              style={{ color: '#a855f7', textDecoration: 'none', marginLeft: 4 }}
            >
              Learn more ↗
            </a>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Top Search bar */}
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
              placeholder="Search storage..."
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
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Create Bucket
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
        {/* Card 1: Total Buckets */}
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
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Buckets</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalBucketsCount}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Across all workspaces
            </span>
          </div>
        </div>

        {/* Card 2: Total Storage Used */}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Storage Used</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              {totalStorageGb} GB
            </span>
            <div style={{ fontSize: 11, color: '#10b981', marginTop: 4 }}>
              {storagePercentage}% <span style={{ color: 'var(--text-secondary)' }}>of 400 GB used</span>
            </div>
            <div
              style={{
                width: '100%',
                height: 5,
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                marginTop: 6,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${storagePercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981, #8b5cf6)',
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Total Objects */}
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Total Objects</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              1.2M
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              ↑ 12% <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
            </span>
          </div>
        </div>

        {/* Card 4: Average Object Size */}
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
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Average Object Size</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginTop: 2 }}>
              198 KB
            </span>
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500, marginTop: 4 }}>
              -5% <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Left Buckets Table 2fr + Right Detail Inspector Panel 1fr) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.1fr 1fr', gap: 24, alignItems: 'flex-start' }}>
        {/* Left Section (Tabs, Filters, Table) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Main Storage Tabs */}
          <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 24 }}>
            {[
              'Buckets',
              'Object Browser',
              'Lifecycle Rules',
              'Access Policies',
              'Activity Logs',
            ].map(t => (
              <button
                key={t}
                onClick={() => setMainTab(t as any)}
                style={{
                  background: 'none',
                  border: 'none',
                  paddingBottom: 12,
                  marginBottom: -1,
                  borderBottom: mainTab === t ? '2px solid #8b5cf6' : '2px solid transparent',
                  color: mainTab === t ? '#fff' : 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: mainTab === t ? 600 : 500,
                  cursor: 'pointer',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Filter Bar (Search input + Workspace dropdown + Region dropdown) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 40px', gap: 12, alignItems: 'center' }}>
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
                placeholder="Search buckets by name or workspace..."
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

            {/* Region Dropdown */}
            <div style={{ position: 'relative' }}>
              <select
                value={regionFilter}
                onChange={e => {
                  setRegionFilter(e.target.value);
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
                <option value="All">All Regions</option>
                <option value="us-east-1">us-east-1</option>
                <option value="us-west-2">us-west-2</option>
                <option value="ap-south-1">ap-south-1</option>
                <option value="eu-west-1">eu-west-1</option>
              </select>
              <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: 10 }}>▼</div>
            </div>

            {/* List/Grid View Button */}
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

          {/* Buckets Table */}
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
                  <th style={{ padding: '12px 16px' }}>Bucket Name</th>
                  <th style={{ padding: '12px 16px' }}>Workspace</th>
                  <th style={{ padding: '12px 16px' }}>Region</th>
                  <th style={{ padding: '12px 16px' }}>Storage Used</th>
                  <th style={{ padding: '12px 16px' }}>Objects</th>
                  <th style={{ padding: '12px 16px' }}>Last Modified</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}></th>
                </tr>
              </thead>
              <tbody>
                {paginatedBuckets.map(b => {
                  const isSelected = selectedBucketId === b.id;
                  return (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedBucketId(b.id)}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: isSelected ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      {/* Bucket Name */}
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
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={b.iconColor} strokeWidth="2">
                              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                            </svg>
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: isSelected ? '#a855f7' : '#fff' }}>{b.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{b.subtitle}</div>
                          </div>
                        </div>
                      </td>

                      {/* Workspace */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: b.workspaceBg,
                              color: '#fff',
                              fontSize: 10,
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {b.workspaceCode}
                          </div>
                          <span style={{ color: '#fff', fontSize: 12 }}>{b.workspace}</span>
                        </div>
                      </td>

                      {/* Region */}
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 12 }}>
                        {b.region}
                      </td>

                      {/* Storage Used */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ color: '#fff', fontWeight: 600 }}>{b.storageUsedGb} GB</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{b.percentageOfTotal}%</div>
                      </td>

                      {/* Objects */}
                      <td style={{ padding: '14px 16px', color: '#fff' }}>{b.objectsCount}</td>

                      {/* Last Modified */}
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: 12 }}>
                        {b.lastModified}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 16px' }}>
                        {b.status === 'Active' && (
                          <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} /> Active
                          </span>
                        )}
                        {b.status === 'Glacier' && (
                          <span style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#60a5fa' }} /> Glacier
                          </span>
                        )}
                        {b.status === 'Inactive' && (
                          <span style={{ background: 'rgba(107,114,128,0.15)', color: '#9ca3af', fontSize: 11, padding: '2px 8px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#9ca3af' }} /> Inactive
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
              {Math.min(startIndex + itemsPerPage, totalFilteredCount)} of {totalBucketsCount} buckets
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

              {[1, 2, 3].map(pageNum => (
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
                onClick={() => setCurrentPage(p => Math.min(3, p + 1))}
                disabled={validCurrentPage === 3}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-color)',
                  color: validCurrentPage === 3 ? 'rgba(255,255,255,0.2)' : '#fff',
                  borderRadius: 6,
                  width: 32,
                  height: 32,
                  cursor: validCurrentPage === 3 ? 'not-allowed' : 'pointer',
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedBucket.iconColor} strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>{selectedBucket.name}</h3>
                  <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: 10, padding: '2px 6px', borderRadius: 8 }}>
                    ● Active
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{selectedBucket.subtitle}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                  Created on {selectedBucket.createdDate} • {selectedBucket.region}
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

          {/* Sub-tabs in Inspector */}
          <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 16 }}>
            {['Overview', 'Access', 'Lifecycle', 'Metrics', 'Permissions'].map(tab => (
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

          {/* Inspector Content Overview */}
          {inspectorTab === 'Overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Storage Summary Section */}
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 12, margin: 0 }}>Storage Summary</h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  {/* SVG Donut Chart */}
                  <div style={{ position: 'relative', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="100" height="100" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="3.8"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3.8"
                        strokeDasharray="85, 100"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3.8"
                        strokeDasharray="10, 100"
                        strokeDashoffset="-85"
                      />
                    </svg>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{selectedBucket.storageUsedGb} GB</div>
                      <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Used</div>
                    </div>
                  </div>

                  {/* Storage breakdown legend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 140 }}>
                      <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6' }} /> Standard
                      </span>
                      <span style={{ color: '#fff', fontWeight: 500 }}>{selectedBucket.standardGb} GB</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 140 }}>
                      <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} /> Infrequent Access
                      </span>
                      <span style={{ color: '#fff', fontWeight: 500 }}>{selectedBucket.iaGb} GB</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 140 }}>
                      <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Glacier
                      </span>
                      <span style={{ color: '#fff', fontWeight: 500 }}>{selectedBucket.glacierMb} MB</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#detailed-metrics"
                  onClick={e => {
                    e.preventDefault();
                    addToast('Opening detailed storage metrics', 'info');
                  }}
                  style={{ fontSize: 12, color: '#a855f7', textDecoration: 'none', display: 'inline-block', marginTop: 12 }}
                >
                  View detailed metrics →
                </a>
              </div>

              {/* Bucket Information Section */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>Bucket Information</h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Bucket ARN</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: 11 }}>{selectedBucket.arn}</span>
                    <button
                      onClick={() => copyToClipboard(selectedBucket.arn)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                      title="Copy ARN"
                    >
                      📋
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Encryption</span>
                  <span style={{ color: '#fff' }}>{selectedBucket.encryption}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Versioning</span>
                  <span style={{ color: selectedBucket.versioning ? '#34d399' : 'var(--text-secondary)' }}>
                    {selectedBucket.versioning ? '✓ Enabled' : 'Disabled'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Object Lock</span>
                  <span style={{ color: '#fff' }}>{selectedBucket.objectLock}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Public Access</span>
                  <span style={{ color: selectedBucket.publicAccess === 'Blocked' ? '#ef4444' : '#34d399' }}>
                    {selectedBucket.publicAccess === 'Blocked' ? '✕ Blocked' : '✓ Allowed'}
                  </span>
                </div>

                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Tags</span>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selectedBucket.tags.map(t => (
                      <span key={t} style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>
                        {t}
                      </span>
                    ))}
                    <span style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>
                      +2
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Inspector Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                <button
                  onClick={() => addToast(`Editing bucket ${selectedBucket.name}`, 'info')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Edit Bucket
                </button>
                <button
                  onClick={() => handleDeleteBucket(selectedBucket.id, selectedBucket.name)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#ef4444',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Delete Bucket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog for "+ Create Bucket" */}
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
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Create Storage Bucket</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 20, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBucket} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Bucket Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. acme-prod-data"
                  value={newBucketName}
                  onChange={e => setNewBucketName(e.target.value)}
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
                  Subtitle / Purpose
                </label>
                <input
                  type="text"
                  placeholder="e.g. Primary production data"
                  value={newBucketSubtitle}
                  onChange={e => setNewBucketSubtitle(e.target.value)}
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
                    value={newBucketWorkspace}
                    onChange={e => setNewBucketWorkspace(e.target.value)}
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
                    Region
                  </label>
                  <select
                    value={newBucketRegion}
                    onChange={e => setNewBucketRegion(e.target.value)}
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
                    <option value="us-east-1 (N. Virginia)">us-east-1 (N. Virginia)</option>
                    <option value="us-west-2 (Oregon)">us-west-2 (Oregon)</option>
                    <option value="ap-south-1 (Mumbai)">ap-south-1 (Mumbai)</option>
                    <option value="eu-west-1 (Ireland)">eu-west-1 (Ireland)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Encryption
                  </label>
                  <select
                    value={newBucketEncryption}
                    onChange={e => setNewBucketEncryption(e.target.value)}
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
                    <option value="SSE-S3">SSE-S3 (Amazon Managed)</option>
                    <option value="SSE-KMS">SSE-KMS (KMS Key)</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                    Quota Limit (GB)
                  </label>
                  <input
                    type="number"
                    value={newBucketQuota}
                    onChange={e => setNewBucketQuota(e.target.value)}
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
                  Create Bucket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
