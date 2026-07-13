import React from 'react';

export default function Header() {
  return (
    <header className="top-header">
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 24, cursor: 'pointer', color: 'var(--text-secondary)' }}>≡</span>
        <input type="text" className="search-bar" placeholder="🔍 Search anything... (⌘ K)" />
      </div>
      <div className="header-actions">
        <span style={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>📄 Docs</span>
        <span style={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>⚡ API</span>
        <span style={{ cursor: 'pointer' }}>☀️</span>
        <span style={{ cursor: 'pointer' }}>🔔</span>
        <div className="profile-badge">
          <img src="https://ui-avatars.com/api/?name=Mukesh+Kumar&background=10b981&color=fff" style={{ width: 36, height: 36, borderRadius: '50%' }} alt="Profile" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>Mukesh Kumar</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
