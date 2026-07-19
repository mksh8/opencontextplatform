import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { useToast } from '../contexts/ToastContext';

export default function Organizations() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgDisplayName, setNewOrgDisplayName] = useState('');
  const [newOrgDescription, setNewOrgDescription] = useState('');
  const [newOrgWebsite, setNewOrgWebsite] = useState('');
  const [newOrgIndustry, setNewOrgIndustry] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // Active selected org for actions
  const [activeMenuOrgId, setActiveMenuOrgId] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null);
  
  const { showToast } = useToast();

  const fetchOrganizations = () => {
    setLoading(true);
    apiClient.get('/organizations')
      .then(res => {
        setOrganizations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load organizations", err);
        setError("Failed to load organizations from API");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrganizations();
    
    // Close menu when clicking outside
    const handleClickOutside = () => setActiveMenuOrgId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName) {
      showToast('Organization name is required', 'error');
      return;
    }
    
    setIsCreating(true);
    try {
      await apiClient.post('/organizations', { 
        name: newOrgName, 
        plan: 'Enterprise',
        display_name: newOrgDisplayName || undefined,
        description: newOrgDescription || undefined,
        website: newOrgWebsite || undefined,
        industry: newOrgIndustry || undefined
      });
      showToast('Organization created successfully', 'success');
      setIsCreateModalOpen(false);
      setNewOrgName('');
      setNewOrgDisplayName('');
      setNewOrgDescription('');
      setNewOrgWebsite('');
      setNewOrgIndustry('');
      fetchOrganizations();
    } catch (error) {
      showToast('Failed to create organization', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleActionClick = (e: React.MouseEvent, orgId: string) => {
    e.stopPropagation();
    setActiveMenuOrgId(activeMenuOrgId === orgId ? null : orgId);
  };

  const handleMenuAction = (action: string, org: any) => {
    setActiveMenuOrgId(null);
    setSelectedOrg(org);
    if (action === 'View Details') {
      setIsDetailsModalOpen(true);
    } else if (action === 'Settings') {
      setIsSettingsModalOpen(true);
    }
  };
  
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Organizations</h1>
          <p>Manage organizations.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>+ New Organization</button>
      </div>

      {/* Metrics Header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 24 }}>
        <div className="widget" style={{ padding: '20px 24px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 8 }}>Total Organizations</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: '#fff' }}>{organizations.length}</div>
        </div>
        <div className="widget" style={{ padding: '20px 24px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 8 }}>Active Workspaces</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: '#fff' }}>{organizations.reduce((acc, org) => acc + (org.workspaces?.length || 0), 0)}</div>
        </div>
        <div className="widget" style={{ padding: '20px 24px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 8 }}>Total Members</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: '#fff' }}>{organizations.reduce((acc, org) => acc + (org.member_count || 0), 0)}</div>
        </div>
      </div>

      {/* Card Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading organizations...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#ff7b72' }}>{error}</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {organizations.map(org => (
            <div key={org.id} className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <button 
                  onClick={(e) => handleActionClick(e, org.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 20, padding: '4px 8px', borderRadius: 4 }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  ⋮
                </button>
                {activeMenuOrgId === org.id && (
                  <div style={{ position: 'absolute', right: 0, top: 32, background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 0', zIndex: 10, minWidth: 140, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                    <div 
                      onClick={() => handleMenuAction('View Details', org)}
                      style={{ padding: '8px 16px', color: '#fff', cursor: 'pointer', fontSize: 13, display: 'block' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      View Details
                    </div>
                    <div 
                      onClick={() => handleMenuAction('Settings', org)}
                      style={{ padding: '8px 16px', color: '#fff', cursor: 'pointer', fontSize: 13, display: 'block' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      Settings
                    </div>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, var(--accent-purple), #8B5CF6)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 600, boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)' }}>
                  {org.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: 16, color: '#fff' }}>{org.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.1)', padding: '2px 8px', borderRadius: 12, fontWeight: 500 }}>{org.plan}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}><div className="status-indicator" style={{ display: 'inline-flex', marginRight: 4 }}><div className="dot" style={{ width: 6, height: 6, background: '#10b981' }}></div></div> {org.status || 'Active'}</span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, padding: '16px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Workspaces</div>
                  <div style={{ fontSize: 16, color: '#fff', fontWeight: 500 }}>{org.workspaces?.length || 0}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Members</div>
                  <div style={{ fontSize: 16, color: '#fff', fontWeight: 500 }}>{org.member_count || 0}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Created on {org.created_at || 'Recently'}
                </div>
                <button 
                  onClick={() => handleMenuAction('View Details', org)}
                  style={{ background: 'transparent', border: '1px solid var(--border-color)', color: '#fff', padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreateModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="widget" style={{ width: '100%', maxWidth: 400, padding: 32, position: 'relative' }}>
            <button 
              onClick={() => setIsCreateModalOpen(false)} 
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 20 }}
            >
              ×
            </button>
            <h2 style={{ fontSize: 20, color: '#fff', marginBottom: 8 }}>Create Organization</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Set up a new organization and tenant space.</p>
            
            <form onSubmit={handleCreateOrganization} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Organization Name *</label>
                <input 
                  type="text" 
                  value={newOrgName} 
                  onChange={e => setNewOrgName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Display Name</label>
                <input 
                  type="text" 
                  value={newOrgDisplayName} 
                  onChange={e => setNewOrgDisplayName(e.target.value)}
                  placeholder="e.g. Acme Corporation"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Description</label>
                <textarea 
                  value={newOrgDescription} 
                  onChange={e => setNewOrgDescription(e.target.value)}
                  placeholder="A brief description of the organization"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff', minHeight: 60 }} 
                />
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Industry</label>
                  <input 
                    type="text" 
                    value={newOrgIndustry} 
                    onChange={e => setNewOrgIndustry(e.target.value)}
                    placeholder="e.g. Technology"
                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Website</label>
                  <input 
                    type="text" 
                    value={newOrgWebsite} 
                    onChange={e => setNewOrgWebsite(e.target.value)}
                    placeholder="https://example.com"
                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button type="button" className="btn" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Organization'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDetailsModalOpen && selectedOrg && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="widget" style={{ width: '100%', maxWidth: 500, padding: 32, position: 'relative' }}>
            <button 
              onClick={() => setIsDetailsModalOpen(false)} 
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 20 }}
            >
              ×
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, background: 'var(--accent-purple)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20 }}>
                {selectedOrg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: 20, color: '#fff', margin: 0 }}>{selectedOrg.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>ID: {selectedOrg.id}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Current Plan</div>
                <div style={{ fontSize: 16, color: '#fff', fontWeight: 500 }}>{selectedOrg.plan}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Workspaces</div>
                <div style={{ fontSize: 16, color: '#fff', fontWeight: 500 }}>{selectedOrg.workspaces?.length || 0} active</div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 8, border: '1px solid var(--border-color)', marginBottom: 24 }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#fff' }}>Organization Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px 16px', fontSize: 13 }}>
                <div style={{ color: 'var(--text-secondary)' }}>Display Name:</div>
                <div style={{ color: '#fff' }}>{selectedOrg.display_name || '-'}</div>
                <div style={{ color: 'var(--text-secondary)' }}>Industry:</div>
                <div style={{ color: '#fff' }}>{selectedOrg.industry || '-'}</div>
                <div style={{ color: 'var(--text-secondary)' }}>Website:</div>
                <div style={{ color: 'var(--accent-purple)' }}>{selectedOrg.website || '-'}</div>
                <div style={{ color: 'var(--text-secondary)' }}>Description:</div>
                <div style={{ color: '#fff' }}>{selectedOrg.description || '-'}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button type="button" className="btn btn-primary" onClick={() => setIsDetailsModalOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {isSettingsModalOpen && selectedOrg && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="widget" style={{ width: '100%', maxWidth: 400, padding: 32, position: 'relative' }}>
            <button 
              onClick={() => setIsSettingsModalOpen(false)} 
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 20 }}
            >
              ×
            </button>
            <h2 style={{ fontSize: 20, color: '#fff', marginBottom: 8 }}>Organization Settings</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Update preferences for {selectedOrg.name}.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Organization Name</label>
                <input 
                  type="text" 
                  defaultValue={selectedOrg.name} 
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Display Name</label>
                <input 
                  type="text" 
                  defaultValue={selectedOrg.display_name} 
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Website</label>
                <input 
                  type="text" 
                  defaultValue={selectedOrg.website} 
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Industry</label>
                <input 
                  type="text" 
                  defaultValue={selectedOrg.industry} 
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Internal Slug</label>
                <input 
                  type="text" 
                  defaultValue={selectedOrg.slug} 
                  disabled
                  style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 12px', borderRadius: 6, color: 'var(--text-secondary)' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button type="button" className="btn" onClick={() => setIsSettingsModalOpen(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  showToast('Settings saved successfully', 'success');
                  setIsSettingsModalOpen(false);
                }}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
