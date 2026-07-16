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
        <div className="nav-section-title">Dashboards</div>
        <NavLink to="/dashboard/executive" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📈</span> Executive</NavLink>
        <NavLink to="/dashboard/ai-activity" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🤖</span> AI Activity</NavLink>
        <NavLink to="/dashboard/context-health" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>❤️</span> Context Health</NavLink>
        <NavLink to="/dashboard/cost" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💰</span> Cost Analytics</NavLink>
        <NavLink to="/dashboard/provider" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚡</span> Provider Stats</NavLink>
        <NavLink to="/dashboard/workspace" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🏢</span> Workspace</NavLink>
        <NavLink to="/dashboard/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔍</span> Search Analytics</NavLink>
        <NavLink to="/dashboard/api" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📡</span> API Analytics</NavLink>
        <NavLink to="/dashboard/storage" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💾</span> Storage</NavLink>
        <NavLink to="/dashboard/agent" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🕵️</span> Agent Analytics</NavLink>
        
        <div className="nav-section-title" style={{ marginTop: 24 }}>Context Management</div>
        <NavLink to="/contexts/all" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📦</span> All Contexts</NavLink>
        <NavLink to="/contexts/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>➕</span> Create Context</NavLink>
        <NavLink to="/contexts/details" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📄</span> Details & Editor</NavLink>
        <NavLink to="/contexts/history" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🕰️</span> Version History</NavLink>
        <NavLink to="/contexts/metadata" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🏷️</span> Metadata & Tags</NavLink>
        <NavLink to="/contexts/permissions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔒</span> Permissions</NavLink>
        <NavLink to="/contexts/embeddings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔢</span> Embeddings</NavLink>
        <NavLink to="/contexts/chunks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧩</span> Chunks</NavLink>
        <NavLink to="/contexts/relationships" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🕸️</span> Relationships</NavLink>
        <NavLink to="/contexts/summary" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>✨</span> AI Summary</NavLink>
        
        <div className="nav-section-title" style={{ marginTop: 24 }}>Collections</div>
        <NavLink to="/collections/all" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📂</span> All Collections</NavLink>
        <NavLink to="/collections/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>➕</span> Create Collection</NavLink>
        <NavLink to="/collections/details" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📄</span> Collection Details</NavLink>
        <NavLink to="/collections/nested" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🗂️</span> Nested Tree</NavLink>
        <NavLink to="/collections/permissions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔒</span> Permissions</NavLink>
        <NavLink to="/collections/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📈</span> Analytics</NavLink>
        
        <div className="nav-section-title" style={{ marginTop: 24 }}>Search & Retrieval</div>
        <NavLink to="/search/universal" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔍</span> Universal Search</NavLink>
        <NavLink to="/search/hybrid" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚡</span> Hybrid Search</NavLink>
        <NavLink to="/search/semantic" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧠</span> Semantic Search</NavLink>
        <NavLink to="/search/graph" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🕸️</span> Graph Search</NavLink>
        <NavLink to="/search/saved" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔖</span> Saved Searches</NavLink>
        <NavLink to="/search/history" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📜</span> Search History</NavLink>
        <NavLink to="/search/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📊</span> Search Analytics</NavLink>
        
        <NavLink to="/memories" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🗄️</span> Memories</NavLink>
        <NavLink to="/timeline" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⏱️</span> Timeline</NavLink>
        <NavLink to="/graphexplorer" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🕸️</span> Graph Explorer</NavLink>

        <div className="nav-section-title" style={{ marginTop: 24 }}>Connectors & Pipelines</div>
        <NavLink to="/connectors/marketplace" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛍️</span> Marketplace</NavLink>
        <NavLink to="/connectors/installed" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔌</span> Installed</NavLink>
        <NavLink to="/connectors/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>➕</span> Create Source</NavLink>
        <NavLink to="/connectors/details" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📄</span> Configuration</NavLink>
        <NavLink to="/connectors/auth" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔑</span> Authentication</NavLink>
        <NavLink to="/connectors/scheduling" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⏰</span> Scheduling</NavLink>
        <NavLink to="/connectors/sync" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔄</span> Sync History</NavLink>
        <NavLink to="/connectors/logs" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📜</span> Worker Logs</NavLink>
        <NavLink to="/connectors/health" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>❤️</span> Health Telemetry</NavLink>
        <NavLink to="/connectors/templates" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📋</span> Templates</NavLink>

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
