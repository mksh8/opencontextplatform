import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NavSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="nav-category">
      <h3 className="nav-category-title">{title}</h3>
      {children}
    </div>
  );

  if (isCollapsed) {
    return (
      <aside className="sidebar sidebar-collapsed">
        <div className="sidebar-brand-collapsed">
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: 6 }}></div>
        </div>
        <button 
          onClick={() => setIsCollapsed(false)}
          className="collapse-btn"
          title="Expand sidebar"
        >
          ▶
        </button>
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

      <div className="nav-section">
        <div className="nav-item-standalone">
          <NavLink to="/overview" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📊</span> Dashboard</NavLink>
        </div>

        <NavSection title="CONTEXT">
          <NavLink to="/contexts/all" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📦</span> All Contexts</NavLink>
          <NavLink to="/contexts/metadata" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} style={{ paddingLeft: '40px' }}><span>🏷️</span> Metadata</NavLink>
          <NavLink to="/contexts/permissions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} style={{ paddingLeft: '40px' }}><span>🔐</span> Permissions</NavLink>
          <NavLink to="/contexts/tags" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} style={{ paddingLeft: '40px' }}><span>🔖</span> Tags</NavLink>
          <NavLink to="/memories" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💾</span> Memories</NavLink>
          <NavLink to="/collections/all" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📂</span> Collections</NavLink>
          <NavLink to="/search/universal" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔍</span> Search</NavLink>
          <NavLink to="/timeline" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⏱️</span> Timeline</NavLink>
          <NavLink to="/graph" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🕸️</span> Graph Explorer</NavLink>
        </NavSection>

        <NavSection title="CONNECTORS">
          <NavLink to="/connectors" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔌</span> Connectors</NavLink>
          <NavLink to="/connectors/sources" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📡</span> Sources</NavLink>
          <NavLink to="/connectors/jobs" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚙️</span> Ingestion Jobs</NavLink>
          <NavLink to="/connectors/webhooks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔗</span> Webhooks</NavLink>
        </NavSection>

        <NavSection title="CONFIGURATION">
          <NavLink to="/providers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚡</span> Providers</NavLink>
          <NavLink to="/models" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧠</span> Models</NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚙️</span> Settings</NavLink>
          <NavLink to="/apikeys" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔑</span> API Keys</NavLink>
        </NavSection>

        <NavSection title="GOVERNANCE">
          <NavLink to="/organizations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🏢</span> Organizations</NavLink>
          <NavLink to="/workspaces" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💻</span> Workspaces</NavLink>
          <NavLink to="/members" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>👥</span> Members</NavLink>
          <NavLink to="/roles" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛡️</span> Roles & Permissions</NavLink>
          <NavLink to="/audit" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📜</span> Audit Logs</NavLink>
        </NavSection>
      </div>

      <button 
        onClick={() => setIsCollapsed(true)}
        className="collapse-btn-bottom"
      >
        ◀ Collapse
      </button>
    </aside>
  );
}
