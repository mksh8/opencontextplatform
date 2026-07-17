import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const applyTheme = (themeMode: 'dark' | 'light' | 'system') => {
    let effectiveTheme = themeMode;
    if (themeMode === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  };

  useEffect(() => {
    applyTheme(theme);
    
    // Listen for system theme changes if in system mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
    setTheme(nextTheme);
    addToast(`Switched to ${nextTheme} mode`, 'info');
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      navigate('/search/universal');
    }
  };
  return (
    <header className="top-header">
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 24, cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => addToast('Sidebar toggle functionality coming soon!', 'info')}>≡</span>
        <input 
          ref={searchInputRef}
          type="text" 
          className="search-bar" 
          placeholder="🔍 Search anything... (⌘ K)" 
          onKeyDown={handleSearch}
        />
      </div>
      <div className="header-actions">
        <span style={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }} onClick={() => window.open('http://localhost:8000/docs', '_blank')}>📄 Docs</span>
        <span style={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }} onClick={() => navigate('/apiplayground')}>⚡ API</span>
        <span style={{ cursor: 'pointer' }} onClick={toggleTheme} title={`Current theme: ${theme}`}>
          {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '💻'}
        </span>
        <span style={{ cursor: 'pointer' }} onClick={() => addToast('No new notifications', 'info')}>🔔</span>
        <div className="profile-badge" onClick={() => {
          if(window.confirm('Are you sure you want to log out?')) {
            logout();
          }
        }} style={{ cursor: 'pointer' }}>
          <img src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=10b981&color=fff`} style={{ width: 36, height: 36, borderRadius: '50%' }} alt="Profile" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{user?.full_name || 'User'}</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{user?.email || 'user@example.com'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
