import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
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
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} end>
          <span>🏠</span> Dashboard
        </NavLink>
        
        <div className="nav-section-title" style={{ marginTop: 24 }}>Context</div>
        <NavLink to="/contexts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📦</span> Contexts</NavLink>
        <NavLink to="/memories" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🗄️</span> Memories</NavLink>
        <NavLink to="/collections" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📂</span> Collections</NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔍</span> Search</NavLink>
        <NavLink to="/timeline" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⏱️</span> Timeline</NavLink>
        <NavLink to="/graphexplorer" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🕸️</span> Graph Explorer</NavLink>

        <div className="nav-section-title" style={{ marginTop: 24 }}>Connectors</div>
        <NavLink to="/connectors" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔌</span> Connectors</NavLink>
        <NavLink to="/sources" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📥</span> Sources</NavLink>
        <NavLink to="/ingestionjobs" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚙️</span> Ingestion Jobs</NavLink>
        <NavLink to="/webhooks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔗</span> Webhooks</NavLink>

        <div className="nav-section-title" style={{ marginTop: 24 }}>Configuration</div>
        <NavLink to="/providers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚡</span> Providers</NavLink>
        <NavLink to="/models" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧠</span> Models</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛠️</span> Settings</NavLink>
        <NavLink to="/apikeys" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔑</span> API Keys</NavLink>
        <NavLink to="/apiplayground" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💻</span> API Playground</NavLink>

        <div className="nav-section-title" style={{ marginTop: 24 }}>Governance</div>
        <NavLink to="/organizations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🏢</span> Organizations</NavLink>
        <NavLink to="/workspace" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💻</span> Workspaces</NavLink>
        <NavLink to="/members" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>👥</span> Members</NavLink>
        <NavLink to="/roles" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛡️</span> Roles & Permissions</NavLink>
        <NavLink to="/audit" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📜</span> Audit Logs</NavLink>
        <NavLink to="/billing" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💳</span> Billing & Usage</NavLink>
      </div>
    </aside>
  );
}
