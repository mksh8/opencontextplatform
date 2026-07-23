import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { useToast } from '../contexts/ToastContext';

export default function Organizations() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgDisplayName, setNewOrgDisplayName] = useState('');
  const [newOrgDescription, setNewOrgDescription] = useState('');
  const [newOrgWebsite, setNewOrgWebsite] = useState('');
  const [newOrgIndustry, setNewOrgIndustry] = useState('');
  const [newOrgOwnerName, setNewOrgOwnerName] = useState('');
  const [newOrgOwnerEmail, setNewOrgOwnerEmail] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // Active selected org for actions & right pane
  const [activeMenuOrgId, setActiveMenuOrgId] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [tabData, setTabData] = useState<any[]>([]);
  const [loadingTabData, setLoadingTabData] = useState(false);
  
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
    const handleClickOutside = () => setActiveMenuOrgId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedOrg && (activeTab === 'Tenants' || activeTab === 'Users')) {
      setLoadingTabData(true);
      const endpoint = activeTab === 'Users' ? 'members' : 'tenants';
      apiClient.get(`/organizations/${selectedOrg.id}/${endpoint}`)
        .then(res => {
          setTabData(res.data);
        })
        .catch(err => {
          console.error(`Failed to load ${endpoint}`, err);
        })
        .finally(() => setLoadingTabData(false));
    }
  }, [selectedOrg, activeTab]);

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName) {
      showToast('Organization name is required', 'error');
      return;
    }
    if (!newOrgOwnerName || !newOrgOwnerEmail) {
      showToast('Owner Name and Email are required', 'error');
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
        industry: newOrgIndustry || undefined,
        owner_name: newOrgOwnerName,
        owner_email: newOrgOwnerEmail
      });
      showToast('Organization created successfully', 'success');
      setIsCreateModalOpen(false);
      setNewOrgName('');
      setNewOrgDisplayName('');
      setNewOrgDescription('');
      setNewOrgWebsite('');
      setNewOrgIndustry('');
      setNewOrgOwnerName('');
      setNewOrgOwnerEmail('');
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

  const handleRowClick = (org: any) => {
    setSelectedOrg(org);
    setActiveTab('Overview');
  };

  const handleDelete = () => {
    showToast('Delete function not implemented yet', 'error');
  };

  const handleToggleStatus = async (org: any) => {
    const newStatus = org.status?.toUpperCase() === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await apiClient.put(`/organizations/${org.id}/status`, { status: newStatus });
      showToast(`Organization marked as ${newStatus}`, 'success');
      fetchOrganizations();
      if (selectedOrg?.id === org.id) {
        setSelectedOrg({ ...selectedOrg, status: newStatus });
      }
      setActiveMenuOrgId(null);
    } catch (err) {
      showToast('Failed to update organization status', 'error');
    }
  };
  
  const totalUsers = organizations.reduce((acc, org) => acc + (org.member_count || 0), 0);
  const totalTenants = organizations.reduce((acc, org) => acc + (org.tenant_count || org.workspaces?.length || 0), 0);
  const activeOrgs = organizations.filter(o => o.status === 'ACTIVE' || o.status === 'Active').length;
  
  return (
    <>
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3"/></svg>
            </span>
            Organizations
          </h1>
          <p style={{ marginTop: 8 }}>Manage all organizations in the platform. Create, view and manage organizations and their settings.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>+ Create Organization</button>
      </div>

      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Organizations', value: organizations.length, trend: '14% from last month', trendUp: true, icon: '🏢' },
          { label: 'Active Organizations', value: activeOrgs, trend: '11% from last month', trendUp: true, icon: '✅' },
          { label: 'Total Users', value: totalUsers.toLocaleString(), trend: '18% from last month', trendUp: true, icon: '👥' },
          { label: 'Total Tenants', value: totalTenants.toLocaleString(), trend: '8% from last month', trendUp: true, icon: '🛡️' },
          { label: 'Revenue (MRR)', value: '$128,450', trend: '16% from last month', trendUp: true, icon: '💰' }
        ].map((metric, idx) => (
          <div key={idx} className="widget" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {metric.icon}
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 4 }}>{metric.label}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{metric.value}</div>
              <div style={{ fontSize: 11, color: metric.trendUp ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                {metric.trendUp ? '↗' : '↘'} {metric.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Split View */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        
        {/* Left Pane: Master Table */}
        <div className="widget" style={{ flex: 1, padding: 0, overflow: 'visible', minHeight: 400 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>All Organizations</h2>
          </div>
          
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" placeholder="Search organizations..." style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 12px 8px 36px', color: '#fff', fontSize: 13 }} />
              <svg style={{ position: 'absolute', left: 12, top: 10, color: 'var(--text-secondary)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filters</button>
            <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path><path d="M19 3h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path><path d="M9 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"></path><path d="M19 13h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"></path></svg> Columns</button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 24px', fontWeight: 500 }}>Organization</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Tenants</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Users</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Created At</th>
                <th style={{ padding: '12px 24px', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading organizations...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#ff7b72' }}>{error}</td></tr>
              ) : (
                organizations.map(org => (
                  <tr 
                    key={org.id} 
                    onClick={() => handleRowClick(org)}
                    style={{ 
                      borderBottom: '1px solid var(--border-color)', 
                      cursor: 'pointer',
                      background: selectedOrg?.id === org.id ? 'rgba(255,255,255,0.03)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => { if (selectedOrg?.id !== org.id) e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; }}
                    onMouseLeave={e => { if (selectedOrg?.id !== org.id) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div style={{ width: 36, height: 36, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>
                        {org.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, color: '#fff', marginBottom: 2 }}>{org.display_name || org.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{org.website || org.slug + '.com'}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 16px' }}>
                      {org.status?.toUpperCase() === 'SUSPENDED' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 10px', borderRadius: 20 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }}></div> Suspended
                        </span>
                      ) : org.status?.toUpperCase() === 'INACTIVE' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 10px', borderRadius: 20 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }}></div> Inactive
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: 20 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div> Active
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px 16px', color: 'var(--text-primary)' }}>{org.tenant_count || org.workspaces?.length || 0}</td>
                    <td style={{ padding: '16px 16px', color: 'var(--text-primary)' }}>{org.member_count || 0}</td>
                    <td style={{ padding: '16px 16px', color: 'var(--text-primary)' }}>{org.created_at}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', position: 'relative' }}>
                      <button 
                        onClick={(e) => handleActionClick(e, org.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18, padding: '4px 8px', borderRadius: 4 }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        ⋮
                      </button>
                      {activeMenuOrgId === org.id && (
                        <div style={{ position: 'absolute', right: 24, top: 40, background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 0', zIndex: 10, minWidth: 120, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                          <div style={{ padding: '8px 16px', color: '#fff', cursor: 'pointer', fontSize: 13, textAlign: 'left' }} onClick={() => handleRowClick(org)}>View Details</div>
                          <div style={{ padding: '8px 16px', color: '#fff', cursor: 'pointer', fontSize: 13, textAlign: 'left' }} onClick={() => handleToggleStatus(org)}>{org.status?.toUpperCase() === 'ACTIVE' ? 'Deactivate' : 'Activate'}</div>
                          <div style={{ padding: '8px 16px', color: '#ef4444', cursor: 'pointer', fontSize: 13, textAlign: 'left' }} onClick={handleDelete}>Delete</div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>
            <div>Showing 1 to {organizations.length} of {organizations.length} results</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn" style={{ padding: '4px 8px' }}>&lt;</button>
              <button className="btn btn-primary" style={{ padding: '4px 10px' }}>1</button>
              <button className="btn" style={{ padding: '4px 8px' }}>&gt;</button>
            </div>
          </div>
        </div>

        {/* Right Pane: Details Sidebar */}
        {selectedOrg && (
          <div className="widget" style={{ width: 400, flexShrink: 0, padding: 0, position: 'sticky', top: 24 }}>
            <div style={{ padding: 24, borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
              <button onClick={() => setSelectedOrg(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18 }}>×</button>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600 }}>
                  {selectedOrg.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 style={{ margin: '0 0 4px 0', fontSize: 18, fontWeight: 600 }}>{selectedOrg.display_name || selectedOrg.name}</h2>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{selectedOrg.website || selectedOrg.slug + '.com'}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', padding: '0 16px', overflowX: 'auto' }}>
              {['Overview', 'Tenants', 'Users', 'Settings', 'Audit Logs'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none', border: 'none', padding: '16px 12px', fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
                    color: activeTab === tab ? 'var(--accent-purple)' : 'var(--text-secondary)',
                    borderBottom: activeTab === tab ? '2px solid var(--accent-purple)' : '2px solid transparent',
                    fontWeight: activeTab === tab ? 500 : 400
                  }}
                >{tab}</button>
              ))}
            </div>

            <div style={{ padding: 24, minHeight: 400 }}>
              {activeTab === 'Overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Organization ID</div>
                    <div style={{ color: '#fff', fontFamily: 'monospace', wordBreak: 'break-all' }}>{selectedOrg.id}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Status</div>
                    <div style={{ color: selectedOrg.status?.toUpperCase() === 'INACTIVE' ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: selectedOrg.status?.toUpperCase() === 'INACTIVE' ? '#ef4444' : '#10b981' }}></div> {selectedOrg.status?.toUpperCase() === 'INACTIVE' ? 'Inactive' : selectedOrg.status || 'Active'}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Created At</div>
                    <div style={{ color: '#fff' }}>{selectedOrg.created_at}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Created By</div>
                    <div style={{ color: '#fff' }}>System Admin</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Description</div>
                    <div style={{ color: '#fff', lineHeight: 1.5 }}>{selectedOrg.description || `${selectedOrg.name} is a global leader in innovative solutions.`}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Website</div>
                    <div style={{ color: 'var(--accent-purple)' }}>{selectedOrg.website || `https://${selectedOrg.slug}.com`}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Industry</div>
                    <div style={{ color: '#fff' }}>{selectedOrg.industry || 'Technology'}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Plan</div>
                    <div><span style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>{selectedOrg.plan || 'Enterprise'}</span></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, fontSize: 13 }}>
                    <div style={{ color: 'var(--text-secondary)' }}>Subscription</div>
                    <div><span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>Active</span></div>
                  </div>
                </div>
              )}
              

              {activeTab === 'Users' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {loadingTabData ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>Loading users...</div>
                  ) : tabData.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>No users found.</div>
                  ) : (
                    tabData.map(user => (
                      <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: 32, height: 32, background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
                          {user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 500, color: '#fff', fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>
                          {user.role}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'Tenants' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {loadingTabData ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>Loading tenants...</div>
                  ) : tabData.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>No tenants found.</div>
                  ) : (
                    tabData.map(tenant => (
                      <div key={tenant.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: 32, height: 32, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
                          {tenant.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 500, color: '#fff', fontSize: 13 }}>{tenant.name}</div>
                          <div style={{ color: 'var(--text-secondary)', fontSize: 11, fontFamily: 'monospace' }}>{tenant.code}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: tenant.status === 'ACTIVE' ? '#10b981' : 'var(--text-secondary)' }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: tenant.status === 'ACTIVE' ? '#10b981' : 'var(--text-secondary)' }}></div>
                          {tenant.status || 'Active'}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {(activeTab === 'Settings' || activeTab === 'Audit Logs') && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--text-secondary)', fontSize: 13, background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.1)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12, opacity: 0.5 }}>
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <div>This tab is currently under development.</div>
                  <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>Module schema expansion pending.</div>
                </div>
              )}
            </div>

            <div style={{ padding: 24, borderTop: '1px solid var(--border-color)', display: 'flex', gap: 12 }}>
              <button className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Edit
              </button>
              <button onClick={handleDelete} className="btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Delete
              </button>
            </div>
          </div>
        )}
      </div>

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

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Owner Name *</label>
                  <input 
                    type="text" 
                    value={newOrgOwnerName} 
                    onChange={e => setNewOrgOwnerName(e.target.value)}
                    placeholder="e.g. John Doe"
                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Owner Email *</label>
                  <input 
                    type="email" 
                    value={newOrgOwnerEmail} 
                    onChange={e => setNewOrgOwnerEmail(e.target.value)}
                    placeholder="john@example.com"
                    style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                    required
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
    </>
  );
}
