import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  MoreVertical, 
  AlertTriangle, 
  FolderPlus, 
  Lock, 
  Tag as TagIcon, 
  Download, 
  Trash2, 
  RefreshCw, 
  CheckCircle2
} from 'lucide-react';
import { apiClient } from '../../api/client';

const ModalWrapper = ({ title, children, footer, width = '500px', onClose }: any) => {
  const content = (
    <div className="modal-content-wrapper" style={{ width, minWidth: '320px' }}>
      <div className="action-modal" style={{ border: 'none' }}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body" style={{ overflowY: 'auto' }}>
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  if (onClose) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div onClick={e => e.stopPropagation()}>
          {content}
        </div>
      </div>
    );
  }

  return content;
};

// 1. Create Context
export const CreateContextModal = ({ onClose, onRefresh }: { onClose?: () => void, onRefresh?: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Document');
  const [source, setSource] = useState('API');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  const handleCreate = async () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await apiClient.post('/contexts', {
        title,
        description,
        type,
        source,
        content: description // Using description as initial content for now
      });
      if (onRefresh) onRefresh();
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create context");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <ModalWrapper 
    title="Create Context" onClose={onClose}
    footer={<><button className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>Cancel</button><button className="btn btn-primary" onClick={handleCreate} disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create Context'}</button></>}
  >
    <div className="modal-tabs">
      <button className={`modal-tab ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}>Basic Info</button>
      <button className={`modal-tab ${activeTab === 'source' ? 'active' : ''}`} onClick={() => setActiveTab('source')}>Source</button>
      <button className={`modal-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
      <button className={`modal-tab ${activeTab === 'advanced' ? 'active' : ''}`} onClick={() => setActiveTab('advanced')}>Advanced</button>
    </div>
    
    {error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
    
    {activeTab === 'basic' && (
      <>
        <div className="form-group">
          <label className="form-label">Title <span>*</span></label>
          <input type="text" className="form-input" placeholder="e.g. Project Roadmap Q2" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" placeholder="Brief description of this context..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <div className="char-count">{description.length}/500</div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Type <span>*</span></label>
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Document">Document</option>
            <option value="Code">Code</option>
            <option value="Conversation">Conversation</option>
          </select>
        </div>
      </>
    )}

    {activeTab === 'source' && (
      <>
        <div className="form-group">
          <label className="form-label">Source / Provider</label>
          <input type="text" className="form-input" placeholder="e.g. GitHub, Notion, API" value={source} onChange={(e) => setSource(e.target.value)} />
        </div>
      </>
    )}

    {activeTab === 'settings' && (
      <>
        <div className="form-group">
          <label className="form-label">Tags</label>
          <input type="text" className="form-input" placeholder="Add tags..." />
        </div>
      </>
    )}

    {activeTab === 'advanced' && (
      <div style={{ color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center', padding: '40px 20px' }}>
        Advanced settings will be available in a future update.
      </div>
    )}
  </ModalWrapper>
)};

// 2. Import Context
export const ImportContextModal = ({ onClose, onRefresh }: { onClose?: () => void, onRefresh?: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError("Please select a file to import");
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // For now, simulate file upload by creating a standard context node
      // with the file name as the title
      await apiClient.post('/contexts', {
        title: file.name,
        description: `Imported file: ${file.name} (${Math.round(file.size / 1024)} KB)`,
        type: 'Document',
        source: 'File Upload',
        content: `Content extracted from ${file.name}`
      });
      if (onRefresh) onRefresh();
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to import file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
  <ModalWrapper 
    title="Import Context" onClose={onClose}
    footer={<><button className="btn btn-secondary" onClick={onClose} disabled={isUploading}>Cancel</button><button className="btn btn-primary" onClick={handleImport} disabled={isUploading || !file}>{isUploading ? 'Importing...' : 'Import'}</button></>}
  >
    {error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
    
    <div className="drag-drop-zone" style={{ position: 'relative', border: file ? '2px solid var(--accent-purple)' : '1px dashed var(--border-color)', cursor: 'pointer' }} onClick={() => document.getElementById('file-upload')?.click()}>
      <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
      {file ? (
        <>
          <FileText size={32} color="var(--accent-purple)" />
          <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginTop: '8px' }}>{file.name}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{(file.size / 1024).toFixed(1)} KB</div>
          <button style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', marginTop: '8px', cursor: 'pointer', textDecoration: 'underline' }} onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remove File</button>
        </>
      ) : (
        <>
          <UploadCloud size={32} color="var(--accent-purple)" />
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>Drag & drop files here</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>or click to browse</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>Supports: PDF, DOCX, TXT, MD, CSV, JSON, HTML (Max 200MB)</div>
        </>
      )}
    </div>
    
    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '8px', marginBottom: '8px' }}>Import Settings</h4>
    
    <div className="form-group">
      <label className="form-label">Collection</label>
      <select className="form-select"><option>Select collection</option></select>
    </div>
    
    <div className="form-group">
      <label className="form-label">Chunk Size</label>
      <select className="form-select"><option>Default (1024 tokens)</option></select>
    </div>
    
    <div className="form-group">
      <label className="form-label">Metadata Mode</label>
      <select className="form-select"><option>Auto extract</option></select>
    </div>
  </ModalWrapper>
)};

// 3. View Context Details
export const ViewContextDetailsModal = ({ onClose }: { onClose?: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
  <ModalWrapper 
    title="View Context Details" onClose={onClose} width="600px"
    footer={<><button className="btn btn-secondary" onClick={onClose}>Close</button><button className="btn btn-primary" onClick={onClose}>Edit Context</button><button className="btn btn-secondary" style={{padding: '10px'}}><MoreVertical size={16} /></button></>}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
      <div style={{ width: 40, height: 40, borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FileText size={20} color="var(--text-secondary)" />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Project Roadmap Q2 Planning</h4>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ctx_71586e68</div>
      </div>
      <span style={{ fontSize: '11px', color: 'var(--accent-green)', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px', fontWeight: 500 }}>Indexed</span>
    </div>
    
    <div className="modal-tabs">
      <button className={`modal-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
      <button className={`modal-tab ${activeTab === 'metadata' ? 'active' : ''}`} onClick={() => setActiveTab('metadata')}>Metadata</button>
      <button className={`modal-tab ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>Content</button>
    </div>
    
    {activeTab === 'overview' && (
      <div className="detail-grid" style={{ marginTop: '16px' }}>
        <div className="detail-item"><span className="detail-label">Type</span><span className="detail-value">Document</span></div>
        <div className="detail-item"><span className="detail-label">Source</span><span className="detail-value">GitHub</span></div>
        <div className="detail-item"><span className="detail-label">Collection</span><span className="detail-value">Product Docs</span></div>
        
        <div className="detail-item"><span className="detail-label">Tokens</span><span className="detail-value">8,245</span></div>
        <div className="detail-item"><span className="detail-label">Size</span><span className="detail-value">1.2 MB</span></div>
        <div className="detail-item"><span className="detail-label">Created</span><span className="detail-value" style={{fontWeight: 'normal', fontSize: '12px'}}>May 12, 2024 10:30 AM</span></div>
        
        <div className="detail-item"><span className="detail-label">Updated</span><span className="detail-value" style={{fontWeight: 'normal', fontSize: '12px'}}>May 14, 2024 02:15 PM</span></div>
        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className="detail-value" style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)'}}></span> Indexed
          </span>
        </div>
      </div>
    )}

    {activeTab !== 'overview' && (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px' }}>
        Information for {activeTab} is not available yet.
      </div>
    )}
  </ModalWrapper>
)};

// 4. Edit Context
export const EditContextModal = ({ onClose, contextId, onRefresh }: { onClose?: () => void, contextId?: string, onRefresh?: () => void }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    if (!contextId) return;
    setIsSubmitting(true);
    setError('');
    
    try {
      await apiClient.put(`/contexts/${contextId}`, {
        content: content
      });
      if (onRefresh) onRefresh();
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update context");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <ModalWrapper 
    title={`Edit Context ${contextId || ''}`} onClose={onClose}
    footer={<><button className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>Cancel</button><button className="btn btn-primary" onClick={handleUpdate} disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</button></>}
  >
    {error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
    
    <div className="form-group">
      <label className="form-label">Update Content</label>
      <textarea className="form-textarea" placeholder="Enter new content to update..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
    </div>
    
    <div className="form-group">
      <label className="form-label">Type</label>
      <select className="form-select" disabled><option>Document</option></select>
    </div>
  </ModalWrapper>
)};

// 5. Delete Context
export const DeleteContextModal = ({ onClose, title = "Delete this context?", contextIds = [], onRefresh }: { onClose?: () => void, title?: string, contextIds?: string[], onRefresh?: () => void }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!contextIds.length) return;
    setIsDeleting(true);
    setError('');
    
    try {
      const idsParam = contextIds.join(',');
      await apiClient.delete(`/contexts/${idsParam}`);
      if (onRefresh) onRefresh();
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete contexts");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
  <ModalWrapper 
    title="Delete Context" onClose={onClose} width="400px"
    footer={<><button className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>Cancel</button><button className="btn danger-bg" onClick={handleDelete} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete Context'}</button></>}
  >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', padding: '16px 0' }}>
      <AlertTriangle size={32} className="danger-text" />
      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
        This action cannot be undone. All associated chunks, embeddings, and relationships will also be permanently deleted.
      </p>
      {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{error}</div>}
    </div>
    
    {contextIds.length > 0 && (
      <div style={{ background: 'var(--bg-dark)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)', maxHeight: '100px', overflowY: 'auto' }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>IDs to delete:</div>
          <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{contextIds.join(', ')}</div>
        </div>
      </div>
    )}
    
    <div className="checkbox-row" style={{ marginTop: '16px' }}>
      <input type="checkbox" id="confirm-delete" />
      <label htmlFor="confirm-delete">I understand and want to delete {contextIds.length > 1 ? 'these contexts' : 'this context'}</label>
    </div>
  </ModalWrapper>
)};

// 6. Bulk Actions
export const BulkActionsModal = ({ onClose, onSelectAction, selectedCount = 0 }: { onClose?: () => void, onSelectAction?: (action: string) => void, selectedCount?: number }) => (
  <ModalWrapper 
    title="Bulk Actions" onClose={onClose} width="400px"
    footer={<button className="btn btn-secondary" onClick={onClose}>Cancel</button>}
  >
    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedCount} contexts selected</div>
    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select an action to perform on the selected contexts.</div>
    
    <div className="bulk-action-list">
      <div className="bulk-action-item" onClick={() => onSelectAction?.('collection')}>
        <FolderPlus size={18} className="bulk-action-icon" />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Add to Collection</span>
          <span className="bulk-action-desc">Add selected contexts to a collection</span>
        </div>
      </div>
      <div className="bulk-action-item" onClick={() => onSelectAction?.('permission')}>
        <Lock size={18} className="bulk-action-icon" />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Change Permission</span>
          <span className="bulk-action-desc">Update permissions for selected contexts</span>
        </div>
      </div>
      <div className="bulk-action-item" onClick={() => onSelectAction?.('tags')}>
        <TagIcon size={18} className="bulk-action-icon" />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Add Tags</span>
          <span className="bulk-action-desc">Add tags to selected contexts</span>
        </div>
      </div>
      <div className="bulk-action-item" onClick={() => onSelectAction?.('export')}>
        <Download size={18} className="bulk-action-icon" />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Export Metadata</span>
          <span className="bulk-action-desc">Export metadata as CSV or JSON</span>
        </div>
      </div>
      <div className="bulk-action-item danger" onClick={() => onSelectAction?.('delete')}>
        <Trash2 size={18} className="bulk-action-icon" />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Delete Contexts</span>
          <span className="bulk-action-desc">Permanently delete selected contexts</span>
        </div>
      </div>
    </div>
  </ModalWrapper>
);

// 7. Add to Collection
export const AddToCollectionModal = ({ onClose, selectedCount = 0 }: { onClose?: () => void, selectedCount?: number }) => (
  <ModalWrapper 
    title="Add to Collection" onClose={onClose} width="400px"
    footer={<><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={onClose}>Add to Collection</button></>}
  >
    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedCount} contexts selected</div>
    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Add selected contexts to an existing collection.</div>
    
    <div className="form-group">
      <label className="form-label">Collection <span>*</span></label>
      <select className="form-select"><option>Product Docs</option></select>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', margin: '8px 0' }}>
      <input type="checkbox" id="create-new" defaultChecked />
      <label htmlFor="create-new">Create New Collection</label>
    </div>
    
    <div className="form-group">
      <label className="form-label">New Collection Name</label>
      <input type="text" className="form-input" placeholder="e.g. Marketing Materials" />
    </div>
    
    <div className="form-group">
      <label className="form-label">Description (optional)</label>
      <textarea className="form-textarea" placeholder="Brief description..." style={{ minHeight: '60px' }}></textarea>
      <div className="char-count">0/200</div>
    </div>
  </ModalWrapper>
);

// 8. Change Permission
export const ChangePermissionModal = ({ onClose, selectedCount = 0 }: { onClose?: () => void, selectedCount?: number }) => (
  <ModalWrapper 
    title="Change Permission" onClose={onClose} width="400px"
    footer={<><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={onClose}>Apply Permission</button></>}
  >
    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedCount} contexts selected</div>
    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Update permissions for the selected contexts.</div>
    
    <div className="form-label" style={{ marginBottom: '12px' }}>Permission Level</div>
    
    <div className="radio-group">
      <label className="radio-item">
        <input type="radio" name="perm" />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Private</span>
          <span className="bulk-action-desc">Only me</span>
        </div>
      </label>
      <label className="radio-item">
        <input type="radio" name="perm" defaultChecked />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Workspace</span>
          <span className="bulk-action-desc">All members in this workspace</span>
        </div>
      </label>
      <label className="radio-item">
        <input type="radio" name="perm" />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Organization</span>
          <span className="bulk-action-desc">All members in the organization</span>
        </div>
      </label>
      <label className="radio-item">
        <input type="radio" name="perm" />
        <div className="bulk-action-text">
          <span className="bulk-action-title">Public</span>
          <span className="bulk-action-desc">Anyone with the link</span>
        </div>
      </label>
    </div>
  </ModalWrapper>
);

// 9. Add Tags
export const AddTagsModal = ({ onClose, selectedCount = 0 }: { onClose?: () => void, selectedCount?: number }) => (
  <ModalWrapper 
    title="Add Tags" onClose={onClose} width="400px"
    footer={<><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={onClose}>Add Tags</button></>}
  >
    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedCount} contexts selected</div>
    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Add tags to organize and categorize contexts.</div>
    
    <div className="form-group" style={{ marginBottom: '16px' }}>
      <label className="form-label">Tags</label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <div className="tag-chip">q2-2024 <button><X size={12}/></button></div>
        <div className="tag-chip">planning <button><X size={12}/></button></div>
        <div className="tag-chip">roadmap <button><X size={12}/></button></div>
      </div>
      <input type="text" className="form-input" />
    </div>
    
    <div className="form-group">
      <label className="form-label">Suggested Tags</label>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="suggested-tag">project</button>
        <button className="suggested-tag">document</button>
        <button className="suggested-tag">github</button>
        <button className="suggested-tag">spec</button>
        <button className="suggested-tag">design</button>
      </div>
    </div>
  </ModalWrapper>
);

// 10. Export Contexts
export const ExportContextsModal = ({ onClose, selectedCount = 0 }: { onClose?: () => void, selectedCount?: number }) => (
  <ModalWrapper 
    title="Export Contexts" onClose={onClose} width="400px"
    footer={<><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={onClose}>Export</button></>}
  >
    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedCount} contexts selected</div>
    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Export metadata and content information.</div>
    
    <div className="form-group" style={{ marginBottom: '16px' }}>
      <label className="form-label">Export Format</label>
      <select className="form-select"><option>CSV</option></select>
    </div>
    
    <div className="toggle-row" style={{ marginBottom: '16px' }}>
      <div className="bulk-action-text">
        <span className="bulk-action-title">Include Content</span>
        <span className="bulk-action-desc">Export full content with metadata</span>
      </div>
      <div style={{ width: 36, height: 20, background: 'var(--accent-purple)', borderRadius: 10, position: 'relative' }}>
        <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', position: 'absolute', right: 2, top: 2 }}></div>
      </div>
    </div>
    
    <div className="toggle-row">
      <div className="bulk-action-text">
        <span className="bulk-action-title">Include Embeddings Info</span>
        <span className="bulk-action-desc">Export embedding statistics</span>
      </div>
      <div style={{ width: 36, height: 20, background: 'rgba(255,255,255,0.2)', borderRadius: 10, position: 'relative' }}>
        <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%', position: 'absolute', left: 2, top: 2 }}></div>
      </div>
    </div>
  </ModalWrapper>
);

// 11. Reindex Context
export const ReindexContextModal = ({ onClose }: { onClose?: () => void }) => (
  <ModalWrapper 
    title="Reindex Context" onClose={onClose} width="400px"
    footer={<><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={onClose} style={{ background: 'var(--accent-blue)', borderColor: 'var(--accent-blue)' }}>Reindex</button></>}
  >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', padding: '16px 0' }}>
      <RefreshCw size={32} color="var(--accent-blue)" />
      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Reindex this context?</h4>
      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
        This will re-process the content and update embeddings. This may take a few minutes.
      </p>
    </div>
    
    <div style={{ background: 'var(--bg-dark)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-color)' }}>
      <FileText size={16} color="var(--text-secondary)" />
      <div>
        <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>Project Roadmap Q2 Planning</div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>ctx_71586e68</div>
      </div>
    </div>
  </ModalWrapper>
);

// 12. View History
export const ViewHistoryModal = ({ onClose }: { onClose?: () => void }) => (
  <ModalWrapper 
    title="View History" onClose={onClose} width="400px"
    footer={<button className="btn btn-secondary" onClick={onClose}>Close</button>}
  >
    <div className="bulk-action-text" style={{ marginBottom: '16px' }}>
      <span className="bulk-action-title">Context History</span>
      <span className="bulk-action-desc">Project Roadmap Q2 Planning</span>
    </div>
    
    <div className="timeline-list">
      <div className="timeline-item">
        <div className="timeline-icon success"><CheckCircle2 size={10} /></div>
        <div className="timeline-content">
          <div>
            <div style={{ color: 'var(--text-primary)' }}>Context indexed</div>
          </div>
          <div className="timeline-date">May 14, 2024 02:15 PM <span style={{opacity: 0.5}}>@ system</span></div>
        </div>
      </div>
      
      <div className="timeline-item">
        <div className="timeline-icon info"><RefreshCw size={10} /></div>
        <div className="timeline-content">
          <div>
            <div style={{ color: 'var(--text-primary)' }}>Context updated</div>
          </div>
          <div className="timeline-date">May 14, 2024 11:20 AM <span style={{opacity: 0.5}}>@ test</span></div>
        </div>
      </div>
      
      <div className="timeline-item">
        <div className="timeline-icon"><TagIcon size={10} /></div>
        <div className="timeline-content">
          <div>
            <div style={{ color: 'var(--text-primary)' }}>Metadata updated</div>
          </div>
          <div className="timeline-date">May 13, 2024 04:35 PM <span style={{opacity: 0.5}}>@ test</span></div>
        </div>
      </div>
      
      <div className="timeline-item">
        <div className="timeline-icon"><FileText size={10} /></div>
        <div className="timeline-content">
          <div>
            <div style={{ color: 'var(--text-primary)' }}>Context created</div>
          </div>
          <div className="timeline-date">May 12, 2024 10:30 AM <span style={{opacity: 0.5}}>@ test</span></div>
        </div>
      </div>
    </div>
  </ModalWrapper>
);
