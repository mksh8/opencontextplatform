import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  last_active: string;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We hardcode org_id for now as we don't have global auth state yet
    const orgId = "org_alpha_123";
    
    apiClient.get(`/organizations/${orgId}/members`)
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => console.error("Error fetching members:", error))
      .finally(() => setLoading(false));
  }, []);
        <div className="page-title">
          <h1>Members</h1>
          <p>Manage members in your organization.</p>
        </div>
        <button className="btn btn-primary">+ Invite Member</button>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Member</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Role</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Last Active</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Loading members...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No members found.
                </td>
              </tr>
            ) : (
              members.map(member => (
                <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff`} style={{ width: 32, height: 32, borderRadius: '50%' }} alt={member.name} />
                    <div>
                      <div style={{ fontWeight: 500, color: '#fff' }}>{member.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{member.email}</div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{member.role}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="status-indicator" style={{ color: member.status === 'Active' ? '#10b981' : 'var(--text-secondary)' }}>
                      <div className="dot" style={{ background: member.status === 'Active' ? '#10b981' : 'var(--text-secondary)' }}></div> 
                      {member.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{member.last_active}</td>
                  <td style={{ padding: '16px 24px', cursor: 'pointer' }}>⋮</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
