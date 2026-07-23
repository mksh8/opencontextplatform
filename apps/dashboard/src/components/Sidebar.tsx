import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type ConsoleScope = 'Platform' | 'Organization' | 'Tenant' | 'Workspace';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  
  // Check if user is a super admin
  const isSuperAdmin = user?.role === 'Super Admin' || user?.role_name === 'Super Admin' || user?.role === 'Platform Owner' || user?.role_name === 'Platform Owner';
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeConsole, setActiveConsole] = useState<ConsoleScope>(isSuperAdmin ? 'Platform' : 'Workspace');
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // Available scopes based on role
  const availableScopes: ConsoleScope[] = isSuperAdmin 
    ? ['Platform', 'Organization', 'Tenant', 'Workspace'] 
    : ['Organization', 'Tenant', 'Workspace'];

  // Sync active console with current route
  useEffect(() => {
    if (location.pathname.startsWith('/tenant/') || location.pathname === '/workspaces' || location.pathname === '/providers' || location.pathname === '/storage' || location.pathname === '/secrets' || location.pathname === '/apikeys' || location.pathname === '/policies' || location.pathname === '/quota' || location.pathname === '/monitoring') {
      setActiveConsole('Tenant');
    } else if (location.pathname.startsWith('/organization/')) {
      setActiveConsole('Organization');
    }
  }, [location.pathname]);

  // Close switcher when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsSwitcherOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const NavSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="nav-category">
      <h3 className="nav-category-title">{title}</h3>
      {children}
    </div>
  );

  const renderPlatformNav = () => (
    <>
      <div className="nav-item-standalone">
        <NavLink to="/overview" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📊</span> Dashboard</NavLink>
      </div>
      <NavSection title="MANAGEMENT">
        <NavLink to="/organizations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🏢</span> Organizations</NavLink>
        <NavLink to="/global-users" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🌍</span> Global Users</NavLink>
        <NavLink to="/billing" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💳</span> Billing</NavLink>
      </NavSection>
      <NavSection title="REGISTRIES">
        <NavLink to="/marketplace" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🏪</span> Marketplace</NavLink>
        <NavLink to="/registry/connectors" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔌</span> Connector Registry</NavLink>
        <NavLink to="/registry/plugins" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧩</span> Plugin Registry</NavLink>
        <NavLink to="/registry/sdks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📦</span> SDK Registry</NavLink>
      </NavSection>
      <NavSection title="SYSTEM">
        <NavLink to="/providers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚡</span> Global AI Providers</NavLink>
        <NavLink to="/policies" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📜</span> Global Policies</NavLink>
        <NavLink to="/audit" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔍</span> Audit Logs</NavLink>
        <NavLink to="/health" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>❤️</span> System Health</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚙️</span> Settings</NavLink>
      </NavSection>
      <NavSection title="OPERATIONS">
        <NavLink to="/support" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🎧</span> Support</NavLink>
        <NavLink to="/feature-flags" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🚩</span> Feature Flags</NavLink>
      </NavSection>
    </>
  );

  const renderOrganizationNav = () => (
    <>
      <div className="nav-item-standalone">
        <NavLink to="/organization/overview" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📊</span> Dashboard</NavLink>
      </div>
      <NavSection title="DIRECTORY">
        <NavLink to="/tenants" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛡️</span> Tenants</NavLink>
        <NavLink to="/members" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>👥</span> Users</NavLink>
        <NavLink to="/groups" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>👨‍👩‍👧‍👦</span> Groups</NavLink>
        <NavLink to="/departments" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🏢</span> Departments</NavLink>
      </NavSection>
      <NavSection title="SETTINGS">
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚙️</span> General Settings</NavLink>
        <NavLink to="/settings/sso" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛡️</span> Security & SSO</NavLink>
        <NavLink to="/billing" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💳</span> Billing & Usage</NavLink>
        <NavLink to="/audit" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📜</span> Audit Logs</NavLink>
        <NavLink to="/integrations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔌</span> Integrations</NavLink>
        <NavLink to="/settings/branding" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🎨</span> Branding</NavLink>
      </NavSection>
    </>
  );

  const renderTenantNav = () => (
    <>
      <div className="nav-item-standalone">
        <NavLink to="/tenant/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📊</span> Dashboard</NavLink>
      </div>
      <NavSection title="RESOURCES">
        <NavLink to="/workspaces" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💻</span> Workspaces</NavLink>
        <NavLink to="/members" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>👥</span> Users</NavLink>
        <NavLink to="/providers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚡</span> AI Providers</NavLink>
        <NavLink to="/storage" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🗄️</span> Storage</NavLink>
      </NavSection>
      <NavSection title="SECURITY">
        <NavLink to="/secrets" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🤫</span> Secrets</NavLink>
        <NavLink to="/apikeys" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔑</span> API Keys</NavLink>
        <NavLink to="/policies" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📜</span> Policies</NavLink>
      </NavSection>
      <NavSection title="OPERATIONS">
        <NavLink to="/quota" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚖️</span> Quota</NavLink>
        <NavLink to="/monitoring" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📈</span> Monitoring</NavLink>
        <NavLink to="/logs" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📝</span> Logs</NavLink>
        <NavLink to="/usage" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📊</span> Usage</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚙️</span> Tenant Settings</NavLink>
      </NavSection>
    </>
  );

  const renderWorkspaceNav = () => (
    <>
      <div className="nav-item-standalone">
        <NavLink to="/projects" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🚀</span> Projects</NavLink>
      </div>
      <NavSection title="DATA PLATFORM">
        <NavLink to="/catalog" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📚</span> Catalog</NavLink>
        <NavLink to="/sources" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📡</span> Datasources</NavLink>
        <NavLink to="/connectors" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔌</span> Connectors</NavLink>
        <NavLink to="/pipelines" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛤️</span> Pipelines</NavLink>
        <NavLink to="/documents" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📄</span> Documents</NavLink>
      </NavSection>
      <NavSection title="CONTEXT ENGINE">
        <NavLink to="/contexts/all" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧠</span> Context Engine</NavLink>
        <NavLink to="/memory" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💾</span> Memory</NavLink>
        <NavLink to="/graph" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🕸️</span> Knowledge Graph</NavLink>
        <NavLink to="/ontology" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧬</span> Ontology</NavLink>
        <NavLink to="/search/universal" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔍</span> Search</NavLink>
      </NavSection>
      <NavSection title="AI STUDIO">
        <NavLink to="/agents" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🤖</span> Agents</NavLink>
        <NavLink to="/workflows" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚙️</span> Workflows</NavLink>
        <NavLink to="/prompts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>✍️</span> Prompt Studio</NavLink>
        <NavLink to="/evaluations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧪</span> Evaluations</NavLink>
      </NavSection>
      <NavSection title="OPERATIONS">
        <NavLink to="/observability" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>👁️</span> Observability</NavLink>
      </NavSection>
    </>
  );

  const getScopeIcon = (scope: ConsoleScope) => {
    switch(scope) {
      case 'Platform': return '🌐';
      case 'Organization': return '🏢';
      case 'Tenant': return '🛡️';
      case 'Workspace': return '💻';
    }
  };

  if (isCollapsed) {
    return (
      <aside className="sidebar sidebar-collapsed">
        <div className="sidebar-brand-collapsed">
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: 6 }}></div>
        </div>
        <button onClick={() => setIsCollapsed(false)} className="collapse-btn" title="Expand sidebar">▶</button>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: 8 }}></div>
        <div>
          <h2>OpenContextPlatform</h2>
          <span>The Open Standard for AI Context</span>
        </div>
      </div>

      {/* Context Switcher */}
      <div style={{ padding: '0 20px', marginBottom: 20, position: 'relative' }}>
        <div 
          onClick={(e) => { e.stopPropagation(); setIsSwitcherOpen(!isSwitcherOpen); }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 8, cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 500 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>{getScopeIcon(activeConsole)}</span>
            <span>{activeConsole} Console</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        
        {isSwitcherOpen && (
          <div style={{ position: 'absolute', top: 48, left: 20, right: 20, background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '4px 0', zIndex: 50, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
            {availableScopes.map(scope => (
              <div 
                key={scope}
                onClick={(e) => { e.stopPropagation(); setActiveConsole(scope); setIsSwitcherOpen(false); }}
                style={{ padding: '10px 14px', color: activeConsole === scope ? 'var(--accent-purple)' : '#fff', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: 16 }}>{getScopeIcon(scope)}</span>
                {scope} Console
                {activeConsole === scope && <svg style={{ marginLeft: 'auto' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="nav-section">
        {activeConsole === 'Platform' && renderPlatformNav()}
        {activeConsole === 'Organization' && renderOrganizationNav()}
        {activeConsole === 'Tenant' && renderTenantNav()}
        {activeConsole === 'Workspace' && renderWorkspaceNav()}
      </div>

      <button onClick={() => setIsCollapsed(true)} className="collapse-btn-bottom">◀ Collapse</button>
    </aside>
  );
}
