import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useToast } from '../contexts/ToastContext';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export default function RolesPermissions() {
  const [activeTab, setActiveTab] = useState('Roles');
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] as string[] });
  const [isCreating, setIsCreating] = useState(false);
  const { showToast } = useToast();
  const tabs = ['Roles', 'Permissions'];

  const systemPermissions = [
    { category: 'Context', perms: ['context.read', 'context.write', 'context.delete'] },
    { category: 'Agents', perms: ['agent.read', 'agent.execute', 'agent.manage'] },
    { category: 'Connectors', perms: ['connector.read', 'connector.sync', 'connector.manage'] },
    { category: 'Billing', perms: ['billing.view', 'billing.manage'] },
  ];

  const fetchRoles = () => {
    setLoading(true);
    apiClient.get('/roles')
      .then(res => setRoles(res.data))
      .catch(() => showToast('Failed to fetch roles', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.name) {
      showToast('Role name is required', 'error');
      return;
    }
    
    setIsCreating(true);
    try {
      await apiClient.post('/roles', newRole);
      showToast('Role created successfully', 'success');
      setIsCreateModalOpen(false);
      setNewRole({ name: '', description: '', permissions: [] });
      fetchRoles();
    } catch (error) {
      showToast('Failed to create role', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const togglePermission = (perm: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter(p => p !== perm)
        : [...prev.permissions, perm]
    }));
  };

  const hasPerm = (roleName: string, perm: string) => {
    const role = roles.find(r => r.name.toLowerCase() === roleName.toLowerCase());
    if (roleName.toLowerCase() === 'admin') return true; // Admins have everything usually
    return role?.permissions.includes(perm);
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Roles & Permissions</h1>
          <p>Manage roles and permissions.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>+ New Role</button>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 32, marginBottom: 24 }}>
        {tabs.map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              paddingBottom: 12, 
              borderBottom: activeTab === tab ? '2px solid var(--accent-purple)' : '2px solid transparent', 
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)', 
              fontSize: 13, 
              fontWeight: 500, 
              cursor: 'pointer' 
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeTab === 'Roles' ? (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Role</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Description</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Permissions</th>
                <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</td>
                </tr>
              ) : roles.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No roles found.</td>
                </tr>
              ) : (
                roles.map(role => (
                  <tr key={role.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500, textTransform: 'capitalize' }}>{role.name}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{role.description}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{role.permissions?.join(', ') || 'None'}</td>
                    <td style={{ padding: '16px 24px' }}>⋮</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '16px 24px', fontWeight: 500, width: '25%' }}>Permission</th>
                <th style={{ padding: '16px 24px', fontWeight: 500, textAlign: 'center' }}>Admin</th>
                <th style={{ padding: '16px 24px', fontWeight: 500, textAlign: 'center' }}>Member</th>
                <th style={{ padding: '16px 24px', fontWeight: 500, textAlign: 'center' }}>Viewer</th>
              </tr>
            </thead>
            <tbody>
              {systemPermissions.map(group => (
                <React.Fragment key={group.category}>
                  <tr>
                    <td colSpan={4} style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.02)', color: '#fff', fontWeight: 500 }}>
                      {group.category}
                    </td>
                  </tr>
                  {group.perms.map(perm => (
                    <tr key={perm} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{perm}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', width: 20, height: 20, borderRadius: 4, background: hasPerm('admin', perm) ? 'var(--accent-purple)' : 'transparent', border: hasPerm('admin', perm) ? 'none' : '1px solid var(--border-color)', alignItems: 'center', justifyContent: 'center' }}>
                          {hasPerm('admin', perm) && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', width: 20, height: 20, borderRadius: 4, background: hasPerm('member', perm) ? 'var(--accent-purple)' : 'transparent', border: hasPerm('member', perm) ? 'none' : '1px solid var(--border-color)', alignItems: 'center', justifyContent: 'center' }}>
                          {hasPerm('member', perm) && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', width: 20, height: 20, borderRadius: 4, background: hasPerm('viewer', perm) ? 'var(--accent-purple)' : 'transparent', border: hasPerm('viewer', perm) ? 'none' : '1px solid var(--border-color)', alignItems: 'center', justifyContent: 'center' }}>
                          {hasPerm('viewer', perm) && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isCreateModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="widget" style={{ width: '100%', maxWidth: 500, padding: 32, position: 'relative' }}>
            <button 
              onClick={() => setIsCreateModalOpen(false)} 
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 20 }}
            >
              ×
            </button>
            <h2 style={{ fontSize: 20, color: '#fff', marginBottom: 8 }}>Create New Role</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24 }}>Define a custom role with specific permissions.</p>
            
            <form onSubmit={handleCreateRole} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Role Name</label>
                <input 
                  type="text" 
                  value={newRole.name} 
                  onChange={e => setNewRole({...newRole, name: e.target.value})}
                  placeholder="e.g. Data Scientist"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>Description</label>
                <input 
                  type="text" 
                  value={newRole.description}
                  onChange={e => setNewRole({...newRole, description: e.target.value})}
                  placeholder="Can read data but not write"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', borderRadius: 6, color: '#fff' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>Permissions</label>
                <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6, padding: 12, background: 'rgba(0,0,0,0.1)' }}>
                  {systemPermissions.map(group => (
                    <div key={group.category} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#fff', marginBottom: 8, textTransform: 'uppercase' }}>{group.category}</div>
                      {group.perms.map(perm => (
                        <label key={perm} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
                          <input 
                            type="checkbox" 
                            checked={newRole.permissions.includes(perm)}
                            onChange={() => togglePermission(perm)}
                            style={{ accentColor: 'var(--accent-purple)' }}
                          />
                          <span style={{ fontFamily: 'monospace' }}>{perm}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button type="button" className="btn" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
