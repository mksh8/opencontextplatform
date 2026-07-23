import React, { useState } from 'react';
import MembersList from '../components/MembersList';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../api/client';

const PLATFORM_ROLES = [
  'Platform Owner', 'Platform Admin', 'Platform Operator', 'Platform Support',
  'Platform Security Admin', 'Platform Billing Admin', 'Platform Auditor',
  'Platform Marketplace Admin', 'Organization Owner', 'Organization Admin',
  'Workspace Owner', 'Workspace Admin', 'AI Engineer', 'Data Engineer',
  'ML Engineer', 'Prompt Engineer', 'Knowledge Engineer', 'Agent Developer',
  'Workflow Developer', 'Integration Engineer', 'QA Engineer',
  'Business Analyst', 'Viewer', 'Service Account',
];

export default function Members() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Platform Operator');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { showToast } = useToast();

  const refresh = () => setRefreshTrigger(prev => prev + 1);

  const resetForm = () => { setEmail(''); setFullName(''); setRole('Platform Operator'); };
  const handleClose = () => { setIsOpen(false); resetForm(); };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      await apiClient.post('/users/invite', {
        email: email.trim(),
        full_name: fullName.trim(),
        role_name: role,
      });
      showToast(`Invitation sent to ${email} as ${role}`, 'success');
      handleClose();
      refresh();
    } catch (err: any) {
      showToast(err?.response?.data?.detail || 'Failed to invite user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeactivate = async (user: any) => {
    const newStatus = user.status?.toUpperCase() === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await apiClient.put(`/users/${user.id}/status`, { status: newStatus });
      showToast(`${user.name} marked as ${newStatus}`, 'success');
      refresh();
    } catch (err: any) {
      showToast(err?.response?.data?.detail || 'Failed to update user status', 'error');
    }
  };

  const handleCopyEmail = (emailToCopy: string) => {
    navigator.clipboard.writeText(emailToCopy);
    showToast('Email copied to clipboard', 'success');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border-color)',
    borderRadius: 6, color: '#fff', fontSize: 13, boxSizing: 'border-box', outline: 'none',
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Global Users</h1>
          <p>Manage all users across the entire platform.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>+ Invite User</button>
      </div>

      <MembersList
        refreshTrigger={refreshTrigger}
        onDeactivate={handleDeactivate}
        onCopyEmail={handleCopyEmail}
      />

      {isOpen && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.65)', zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div style={{
            background: 'var(--bg-elevated)', padding: '28px 28px 24px',
            borderRadius: 10, width: 440,
            border: '1px solid var(--border-color)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>Invite User to Platform</h2>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  User will be created with an INVITED status and a temporary password.
                </p>
              </div>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}>✕</button>
            </div>

            <form onSubmit={handleInvite}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} style={inputStyle} placeholder="Jane Doe" autoFocus />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="jane@example.com" />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Platform Role <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select value={role} onChange={e => setRole(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {PLATFORM_ROLES.map(r => (
                    <option key={r} value={r} style={{ background: '#1a1a2e' }}>{r}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn" onClick={handleClose} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ minWidth: 110 }}>
                  {isSubmitting ? 'Sending...' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
