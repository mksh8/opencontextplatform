import React, { useState } from 'react';

interface DirectGrant {
  id: string;
  identity: string;
  level: 'READ' | 'WRITE' | 'OWNER';
}

export default function ContextPermissions() {
  const [grants, setGrants] = useState<DirectGrant[]>([
    { id: '1', identity: 'dev_jane (User)', level: 'OWNER' },
    { id: '2', identity: 'ci_bot_1 (Service)', level: 'READ' }
  ]);

  const [isGranting, setIsGranting] = useState(false);
  const [newIdentity, setNewIdentity] = useState('');
  const [newLevel, setNewLevel] = useState<'READ' | 'WRITE' | 'OWNER'>('READ');

  const handleGrantAccess = () => {
    if (!newIdentity.trim()) return;
    
    const newGrant: DirectGrant = {
      id: Date.now().toString(),
      identity: newIdentity,
      level: newLevel
    };
    
    setGrants([...grants, newGrant]);
    setNewIdentity('');
    setNewLevel('READ');
    setIsGranting(false);
  };

  const handleRevoke = (id: string) => {
    setGrants(grants.filter(grant => grant.id !== id));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'OWNER': return 'var(--accent-blue)';
      case 'WRITE': return 'var(--accent-orange)';
      case 'READ': return 'var(--accent-green)';
      default: return 'var(--text-primary)';
    }
  };

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Context Permissions</h1>
        <p>Manage RBAC policies and ACLs for ctx_9f8a2.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="widget">
          <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Inherited Permissions</h2>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>Workspace: Engineering Core</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>All users in Engineering Core have READ access.</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>Role: Admin</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>All Admins have WRITE access.</div>
          </div>
        </div>

        <div className="widget">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px' }}>Direct Grants</h2>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => setIsGranting(true)}
            >
              + Grant Access
            </button>
          </div>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Identity</th>
                <th style={{ padding: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Level</th>
                <th style={{ padding: '8px', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isGranting && (
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '12px 8px' }}>
                    <input 
                      type="text" 
                      value={newIdentity}
                      onChange={(e) => setNewIdentity(e.target.value)}
                      placeholder="e.g. jdoe (User)" 
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', padding: '6px 10px', borderRadius: '4px', width: '100%', fontSize: '13px' }}
                    />
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <select 
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value as any)}
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', padding: '6px 10px', borderRadius: '4px', width: '100%', fontSize: '13px' }}
                    >
                      <option value="READ">READ</option>
                      <option value="WRITE">WRITE</option>
                      <option value="OWNER">OWNER</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={handleGrantAccess} style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Save</button>
                    <button onClick={() => setIsGranting(false)} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
                  </td>
                </tr>
              )}
              {grants.map((grant) => (
                <tr key={grant.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 8px' }}>{grant.identity}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ color: getLevelColor(grant.level), fontWeight: 500 }}>{grant.level}</span>
                  </td>
                  <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                    <span 
                      onClick={() => handleRevoke(grant.id)}
                      style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Revoke
                    </span>
                  </td>
                </tr>
              ))}
              {grants.length === 0 && !isGranting && (
                <tr>
                  <td colSpan={3} style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No direct grants applied.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
