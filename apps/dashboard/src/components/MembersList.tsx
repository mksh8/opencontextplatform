import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../api/client';

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: string;
  scope: string;
  status: string;
  created_at: string;
}

interface Props {
  refreshTrigger?: number;
  onDeactivate?: (user: PlatformUser) => void;
  onCopyEmail?: (email: string) => void;
}

export default function MembersList({ refreshTrigger = 0, onDeactivate, onCopyEmail }: Props) {
  const [members, setMembers] = useState<PlatformUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiClient.get('/users')
      .then(res => setMembers(res.data))
      .catch(err => console.error('Error fetching platform users:', err))
      .finally(() => setLoading(false));
  }, [refreshTrigger]);

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setActiveMenu(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const statusColor = (s: string) =>
    s?.toUpperCase() === 'ACTIVE' ? '#10b981' :
    s?.toUpperCase() === 'INVITED' ? '#f59e0b' : '#ef4444';

  const scopeBg = (s: string) =>
    s === 'PLATFORM' ? 'rgba(139,92,246,0.15)' :
    s === 'ORGANIZATION' ? 'rgba(59,130,246,0.15)' :
    s === 'TENANT' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.08)';

  const scopeColor = (s: string) =>
    s === 'PLATFORM' ? '#8b5cf6' :
    s === 'ORGANIZATION' ? '#3b82f6' :
    s === 'TENANT' ? '#10b981' : 'var(--text-secondary)';

  return (
    <div className="widget" style={{ padding: 0, overflow: 'visible' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            <th style={{ padding: '14px 24px', fontWeight: 500 }}>User</th>
            <th style={{ padding: '14px 16px', fontWeight: 500 }}>Role</th>
            <th style={{ padding: '14px 16px', fontWeight: 500 }}>Scope</th>
            <th style={{ padding: '14px 16px', fontWeight: 500 }}>Status</th>
            <th style={{ padding: '14px 16px', fontWeight: 500 }}>Joined</th>
            <th style={{ padding: '14px 24px', fontWeight: 500 }}></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Loading users...
              </td>
            </tr>
          ) : members.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No users found. Invite your first user!
              </td>
            </tr>
          ) : (
            members.map(member => (
              <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'rgba(139,92,246,0.15)', color: '#8b5cf6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700, flexShrink: 0,
                    }}>
                      {(member.name || member.email).substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, color: '#fff' }}>{member.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{member.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-primary)' }}>{member.role}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    fontSize: 11, padding: '2px 8px', borderRadius: 4,
                    background: scopeBg(member.scope), color: scopeColor(member.scope), fontWeight: 500,
                  }}>
                    {member.scope}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: statusColor(member.status) }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor(member.status) }}></div>
                    {member.status}
                  </div>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{member.created_at}</td>
                <td style={{ padding: '14px 24px', position: 'relative' }}>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveMenu(activeMenu === member.id ? null : member.id); }}
                    style={{
                      background: 'none', border: 'none', color: 'var(--text-secondary)',
                      cursor: 'pointer', fontSize: 18, padding: '2px 8px', borderRadius: 4,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    ⋮
                  </button>

                  {activeMenu === member.id && (
                    <div
                      onClick={e => e.stopPropagation()}
                      style={{
                        position: 'absolute', right: 24, top: 36,
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
                        borderRadius: 6, padding: '4px 0', zIndex: 50, minWidth: 170,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                      }}
                    >
                      {[
                        {
                          label: 'Copy Email',
                          color: '#fff',
                          action: () => { onCopyEmail?.(member.email); setActiveMenu(null); },
                        },
                        {
                          label: member.status?.toUpperCase() === 'ACTIVE' ? 'Deactivate' : 'Activate',
                          color: member.status?.toUpperCase() === 'ACTIVE' ? '#f59e0b' : '#10b981',
                          action: () => { onDeactivate?.(member); setActiveMenu(null); },
                        },
                      ].map(item => (
                        <div
                          key={item.label}
                          onClick={item.action}
                          style={{ padding: '9px 16px', cursor: 'pointer', fontSize: 13, color: item.color }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
