import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Book, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  Filter,
  RefreshCw,
  List,
  Grid,
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  Eye,
  BarChart2,
  FolderOpen,
  Globe,
  FileText,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';

import { apiClient } from '../../api/client';

const GithubIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

import {
  CreateContextModal,
  ImportContextModal,
  ViewContextDetailsModal,
  EditContextModal,
  DeleteContextModal,
  BulkActionsModal,
  AddToCollectionModal,
  ChangePermissionModal,
  AddTagsModal,
  ExportContextsModal,
  ReindexContextModal,
  ViewHistoryModal
} from './ContextActionModals';

// We will map the backend data dynamically inside the component instead of using MOCK_DATA directly.
// Helper to get an icon based on source name
const getSourceIcon = (source: string) => {
  const s = source?.toLowerCase() || '';
  if (s.includes('github')) return <GithubIcon size={14} color="#fff" />;
  if (s.includes('web') || s.includes('http')) return <Globe size={14} color="#3b82f6" />;
  if (s.includes('slack')) return <MessageSquare size={14} color="#eab308" />;
  if (s.includes('figma') || s.includes('image')) return <ImageIcon size={14} color="#a855f7" />;
  return <FileText size={14} color="#9ca3af" />;
};

const getTypeClass = (type: string) => {
  const t = type?.toLowerCase() || '';
  if (t === 'document') return 'badge-document';
  if (t === 'code') return 'badge-code';
  if (t === 'conversation') return 'badge-conversation';
  if (t === 'image') return 'badge-image';
  return 'badge-document';
};

const Sparkline = ({ color }: { color: string }) => (
  <svg className="sparkline-svg" viewBox="0 0 100 30" preserveAspectRatio="none">
    <path 
      d="M0 25 L10 20 L20 22 L30 15 L40 18 L50 10 L60 15 L70 8 L80 12 L90 5 L100 10" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      style={{ filter: `drop-shadow(0px 4px 6px ${color}40)` }}
    />
  </svg>
);

export default function AllContexts() {
  const [activeTab, setActiveTab] = useState('All Contexts');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const [contexts, setContexts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContexts = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/contexts');
      // API returns { data: [...], total: ... }
      if (response.data && response.data.data) {
        setContexts(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch contexts', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContexts();
  }, []);

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const toggleAll = () => {
    if (selectedRows.size === contexts.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(contexts.map(d => d.id)));
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveDropdown(null);
  };

  const handleAction = (e: React.MouseEvent, action: string, ctxId?: string) => {
    e.stopPropagation();
    if (ctxId) setActiveDropdown(null);
    setActiveModal(action);
  };

  return (
    <div className="dashboard-content" style={{ position: 'relative', paddingBottom: selectedRows.size > 0 ? '100px' : '24px' }}>
      
      {/* Modals */}
      {activeModal === 'create' && <CreateContextModal onClose={closeModal} onRefresh={fetchContexts} />}
      {activeModal === 'import' && <ImportContextModal onClose={closeModal} onRefresh={fetchContexts} />}
      {activeModal === 'delete' && <DeleteContextModal onClose={closeModal} contextIds={Array.from(selectedRows)} onRefresh={() => { fetchContexts(); setSelectedRows(new Set()); }} title={selectedRows.size > 1 ? `Delete ${selectedRows.size} contexts?` : "Delete context?"} />}
      {activeModal === 'delete_single' && activeDropdown && <DeleteContextModal onClose={closeModal} contextIds={[activeDropdown]} onRefresh={fetchContexts} title="Delete this context?" />}
      {activeModal === 'bulk' && <BulkActionsModal onClose={closeModal} onSelectAction={(action) => setActiveModal(action)} selectedCount={selectedRows.size} />}
      {activeModal === 'collection' && <AddToCollectionModal onClose={closeModal} selectedCount={selectedRows.size} />}
      {activeModal === 'permission' && <ChangePermissionModal onClose={closeModal} selectedCount={selectedRows.size} />}
      {activeModal === 'tags' && <AddTagsModal onClose={closeModal} selectedCount={selectedRows.size} />}
      {activeModal === 'export' && <ExportContextsModal onClose={closeModal} selectedCount={selectedRows.size} />}
      {activeModal === 'reindex' && <ReindexContextModal onClose={closeModal} />}
      {activeModal === 'history' && <ViewHistoryModal onClose={closeModal} />}
      {activeModal === 'edit' && activeDropdown && <EditContextModal onClose={closeModal} contextId={activeDropdown} onRefresh={fetchContexts} />}
      {activeModal === 'view' && <ViewContextDetailsModal onClose={closeModal} />}

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>Context Registry</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Global registry of all ingested multi-modal knowledge nodes.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setActiveModal('create')} className="btn btn-primary hover-lift" style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: 500, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>+</span> Create Context
          </button>
          <button onClick={() => setActiveModal('import')} className="btn btn-secondary hover-lift" style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: 500, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
            <Database size={16} /> Import Context <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Book size={18} color="var(--accent-purple)" />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Contexts</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>1,248</div>
            <div style={{ fontSize: '12px', marginTop: '4px', display: 'flex', gap: '6px' }}>
              <span style={{ color: 'var(--accent-purple)' }}>+18.3%</span> <span style={{ color: 'var(--text-secondary)' }}>vs last 30 days</span>
            </div>
          </div>
          <Sparkline color="var(--accent-purple)" />
        </div>

        <div className="kpi-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} color="var(--accent-green)" />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Indexed Contexts</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>1,186</div>
            <div style={{ fontSize: '12px', marginTop: '4px', display: 'flex', gap: '6px' }}>
              <span style={{ color: 'var(--accent-green)' }}>95.0%</span> <span style={{ color: 'var(--text-secondary)' }}>of total</span>
            </div>
          </div>
          <Sparkline color="var(--accent-green)" />
        </div>

        <div className="kpi-card" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} color="var(--accent-blue)" />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Failed Indexing</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>12</div>
            <div style={{ fontSize: '12px', marginTop: '4px', display: 'flex', gap: '6px' }}>
              <span style={{ color: 'var(--accent-blue)' }}>-2.1%</span> <span style={{ color: 'var(--text-secondary)' }}>vs last 30 days</span>
            </div>
          </div>
          <Sparkline color="var(--accent-blue)" />
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0' }}>
        <div style={{ padding: '24px' }}>
          <div className="tabs-container">
            {['All Contexts', 'Documents', 'Code', 'Web', 'Knowledge Base', 'Conversations', 'Images', 'Audio', 'Video', 'Other'].map(tab => (
              <button 
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="filter-bar">
            <div className="filter-left">
              <div className="input-icon-wrapper">
                <Search size={16} />
                <input type="text" placeholder="Search by title, id or source..." className="search-input" />
              </div>
              <button className="select-btn">All Sources <ChevronDown size={14} /></button>
              <button className="select-btn">All Types <ChevronDown size={14} /></button>
              <button className="select-btn">All Status <ChevronDown size={14} /></button>
              <button className="select-btn">All Collections <ChevronDown size={14} /></button>
              <button className="select-btn"><Filter size={14} /> More Filters <ChevronDown size={14} /></button>
            </div>
            <div className="filter-right">
              <button className="icon-btn"><RefreshCw size={14} /></button>
              <div style={{ display: 'flex', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <button className="icon-btn" style={{ border: 'none', borderRadius: 0, borderRight: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)' }}><List size={14} color="#fff" /></button>
                <button className="icon-btn" style={{ border: 'none', borderRadius: 0 }}><Grid size={14} /></button>
              </div>
            </div>
          </div>
          
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Showing {contexts.length} results
          </div>
        </div>

        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading contexts...</div>
        ) : (
        <table className="mock-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <th style={{ width: '40px', textAlign: 'center' }}>
                <input type="checkbox" checked={selectedRows.size === contexts.length && contexts.length > 0} onChange={toggleAll} />
              </th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Title & ID</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Source</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Type</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Collection</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Tokens</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Size</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Status</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Updated</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contexts.map((ctx) => (
              <tr 
                key={ctx.id} 
                style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background-color 0.2s', backgroundColor: selectedRows.has(ctx.id) ? 'rgba(139, 92, 246, 0.05)' : 'transparent' }}
                onMouseEnter={(e) => { if (!selectedRows.has(ctx.id)) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={(e) => { if (!selectedRows.has(ctx.id)) e.currentTarget.style.backgroundColor = 'transparent' }}
                onClick={() => toggleRow(ctx.id)}
              >
                <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={selectedRows.has(ctx.id)} onChange={() => toggleRow(ctx.id)} />
                </td>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{ctx.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{ctx.id}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {getSourceIcon(ctx.source)}
                    <span style={{ color: 'var(--text-secondary)' }}>{ctx.source}</span>
                  </div>
                </td>
                <td>
                  <span className={getTypeClass(ctx.type)} style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 500 }}>
                    {ctx.type}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FolderOpen size={14} color="var(--accent-yellow)" />
                    <span style={{ color: 'var(--text-secondary)' }}>{ctx.workspace}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{ctx.tokens}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{ctx.size || 'N/A'}</td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontSize: '12px', fontWeight: 500 }}>
                    <span className="dot" style={{ background: 'var(--accent-green)', width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block' }}></span>
                    {ctx.status || 'Indexed'}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{ctx.updated}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/contexts/details/${ctx.id}`); }}
                      style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', borderRadius: '4px' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-purple)'; e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'inherit'; e.currentTarget.style.background = 'transparent'; }}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/contexts/summary`); }}
                      style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', borderRadius: '4px' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-blue)'; e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'inherit'; e.currentTarget.style.background = 'transparent'; }}
                      title="Analytics"
                    >
                      <BarChart2 size={16} />
                    </button>
                    <div style={{ position: 'relative' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === ctx.id ? null : ctx.id); }}
                        style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', borderRadius: '4px' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'inherit'; e.currentTarget.style.background = 'transparent'; }}
                        title="More Actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {activeDropdown === ctx.id && (
                        <div 
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: '32px',
                            background: 'var(--bg-panel)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            zIndex: 100,
                            minWidth: '180px',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'
                          }}
                        >
                          <button className="bulk-action-item" style={{ padding: '8px 12px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '13px' }} onClick={(e) => handleAction(e, 'edit', ctx.id)}>
                            ✏️ Edit Context
                          </button>
                          <button className="bulk-action-item" style={{ padding: '8px 12px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '13px' }} onClick={(e) => handleAction(e, 'tags', ctx.id)}>
                            🔖 Add Tags
                          </button>
                          <button className="bulk-action-item" style={{ padding: '8px 12px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '13px' }} onClick={(e) => handleAction(e, 'permission', ctx.id)}>
                            🔐 Permissions
                          </button>
                          <button className="bulk-action-item" style={{ padding: '8px 12px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '13px' }} onClick={(e) => handleAction(e, 'reindex', ctx.id)}>
                            🔄 Reindex
                          </button>
                          <button className="bulk-action-item" style={{ padding: '8px 12px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '13px' }} onClick={(e) => handleAction(e, 'history', ctx.id)}>
                            📜 History
                          </button>
                          <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }}></div>
                          <button className="bulk-action-item danger" style={{ padding: '8px 12px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', fontSize: '13px' }} onClick={(e) => handleAction(e, 'delete_single', ctx.id)}>
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}

        <div className="pagination-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            Rows per page
            <button className="select-btn" style={{ padding: '4px 10px' }}>10 <ChevronDown size={14} /></button>
          </div>
          <div className="page-controls">
            <button className="page-btn"><ChevronLeft size={16} /></button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span style={{ padding: '0 8px' }}>...</span>
            <button className="page-btn">125</button>
            <button className="page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Floating Bulk Actions Bar */}
      {selectedRows.size > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg-panel)',
          border: '1px solid var(--accent-purple)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.5)',
          borderRadius: '12px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          zIndex: 900
        }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>
            {selectedRows.size} row{selectedRows.size > 1 ? 's' : ''} selected
          </div>
          <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }}></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setActiveModal('collection')} className="btn btn-secondary hover-lift" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px' }}>
              Add to Collection
            </button>
            <button onClick={() => setActiveModal('export')} className="btn btn-secondary hover-lift" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px' }}>
              Export
            </button>
            <button onClick={() => setActiveModal('bulk')} className="btn btn-secondary hover-lift" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', background: 'rgba(255,255,255,0.05)' }}>
              More Actions <ChevronDown size={14} style={{ marginLeft: 4 }} />
            </button>
          </div>
          <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }}></div>
          <button onClick={() => setSelectedRows(new Set())} className="icon-btn" style={{ background: 'transparent', border: 'none', width: 'auto', padding: '4px' }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
