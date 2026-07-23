import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import {
  Bell,
  Building2,
  ChevronDown,
  Folder,
  HelpCircle,
  Rocket,
  Search,
  Shield,
  Shuffle,
} from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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

  const placeholder = (() => {
    if (location.pathname.includes('catalog')) return 'Search catalog...';
    if (location.pathname.includes('datasources') || location.pathname.includes('sources')) return 'Search datasources...';
    if (location.pathname.includes('connectors')) return 'Search connectors...';
    if (location.pathname.includes('pipelines')) return 'Search pipelines...';
    if (location.pathname.includes('documents')) return 'Search documents...';
    if (location.pathname.includes('memory')) return 'Search memory...';
    if (location.pathname.includes('graph')) return 'Search knowledge graph...';
    if (location.pathname.includes('ontology')) return 'Search ontology...';
    if (location.pathname.includes('contexts')) return 'Search across context engine...';
    return 'Search anything...';
  })();

  return (
    <header className="top-header">
      <div className="header-context-switcher">
        <button>
          <small>Organization</small>
          <span><Building2 size={16} />Acme Corporation</span>
        </button>
        <i />
        <button>
          <small>Workspace</small>
          <span><Folder size={16} />Data Platform Team</span>
        </button>
        <i />
        <button>
          <small>Project</small>
          <span><Rocket size={16} />Customer360<ChevronDown size={14} /></span>
        </button>
      </div>
      <button className="header-switch"><Shuffle size={16} />Switch Context</button>
      <div className="header-search">
        <Search size={18} />
        <input
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleSearch}
        />
        <kbd>{navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} K</kbd>
      </div>
      <div className="header-actions">
        <button className="header-icon" onClick={toggleTheme} title={`Current theme: ${theme}`}>
          <Shield size={17} />
        </button>
        <button className="header-icon" onClick={() => window.open('http://localhost:8000/docs', '_blank')} title="Documentation">
          <HelpCircle size={17} />
        </button>
        <button className="header-icon has-badge" onClick={() => addToast('No new notifications', 'info')} title="Notifications">
          <Bell size={18} />
          <span>12</span>
        </button>
        <div className="profile-badge" onClick={() => {
          if(window.confirm('Are you sure you want to log out?')) {
            logout();
          }
        }} style={{ cursor: 'pointer' }}>
          <img src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.full_name || 'Mukesh Kumar'}&background=0f7bdc&color=fff`} style={{ width: 42, height: 42, borderRadius: '50%' }} alt="Profile" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{user?.full_name || 'Mukesh Kumar'}</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{user?.role_name || user?.role || 'Platform Admin'}</span>
          </div>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
}
