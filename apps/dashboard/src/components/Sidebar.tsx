import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Sidebar() {
  // Using useLocation to determine the initial expanded section based on the current path could be nice,
  // but for simplicity we'll just track the state.
  const [expandedSection, setExpandedSection] = useState<string | null>('Dashboards');

  const toggleSection = (section: string) => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const SectionHeader = ({ title, sectionKey }: { title: string, sectionKey: string }) => {
    const isExpanded = expandedSection === sectionKey;
    return (
      <div 
        className="nav-section-title" 
        onClick={() => toggleSection(sectionKey)}
        style={{ 
          marginTop: 24, 
          cursor: 'pointer', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          userSelect: 'none'
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: '12px', opacity: 0.5 }}>{isExpanded ? '▼' : '▶'}</span>
      </div>
    );
  };

  return (
    <aside className="sidebar" style={{ overflowY: 'auto' }}>
      <div className="sidebar-brand">
        <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: 8 }}></div>
        <div>
          <h2>OpenContextPlatform</h2>
          <span>The Open Standard for AI Context</span>
        </div>
      </div>

      <div className="nav-section">
        
        <SectionHeader title="Dashboards" sectionKey="Dashboards" />
        {expandedSection === 'Dashboards' && (
          <div className="nav-submenu">
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
          </div>
        )}

        <SectionHeader title="Context Management" sectionKey="Context Management" />
        {expandedSection === 'Context Management' && (
          <div className="nav-submenu">
            <NavLink to="/contexts/all" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📦</span> All Contexts</NavLink>
          </div>
        )}
        
        <SectionHeader title="Collections" sectionKey="Collections" />
        {expandedSection === 'Collections' && (
          <div className="nav-submenu">
            <NavLink to="/collections/all" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📂</span> All Collections</NavLink>
            <NavLink to="/collections/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>➕</span> Create Collection</NavLink>
            <NavLink to="/collections/details" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📄</span> Collection Details</NavLink>
            <NavLink to="/collections/nested" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🗂️</span> Nested Tree</NavLink>
            <NavLink to="/collections/permissions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔒</span> Permissions</NavLink>
            <NavLink to="/collections/analytics" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📈</span> Analytics</NavLink>
          </div>
        )}
        
        <SectionHeader title="Search & Retrieval" sectionKey="Search & Retrieval" />
        {expandedSection === 'Search & Retrieval' && (
          <div className="nav-submenu">
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
          </div>
        )}

        <SectionHeader title="Connectors & Pipelines" sectionKey="Connectors & Pipelines" />
        {expandedSection === 'Connectors & Pipelines' && (
          <div className="nav-submenu">
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
          </div>
        )}

        <SectionHeader title="Ingestion & ETL" sectionKey="Ingestion & ETL" />
        {expandedSection === 'Ingestion & ETL' && (
          <div className="nav-submenu">
            <NavLink to="/ingestion/pipelines" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚙️</span> Ingestion Pipelines</NavLink>
            <NavLink to="/ingestion/preview" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>👀</span> Data Preview</NavLink>
            <NavLink to="/ingestion/etl" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔄</span> Field Mapping</NavLink>
            <NavLink to="/ingestion/validations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛡️</span> Validations</NavLink>
            <NavLink to="/ingestion/chunking" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔪</span> Chunking Strategy</NavLink>
            <NavLink to="/ingestion/embeddings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧠</span> Embedding Config</NavLink>
            <NavLink to="/ingestion/dlq" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>☠️</span> Dead Letter Queue</NavLink>
            <NavLink to="/ingestion/webhooks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔗</span> Inbound Webhooks</NavLink>
            <NavLink to="/ingestion/telemetry" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📊</span> Telemetry</NavLink>
          </div>
        )}

        <SectionHeader title="Configuration" sectionKey="Configuration" />
        {expandedSection === 'Configuration' && (
          <div className="nav-submenu">
            <NavLink to="/providers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>⚡</span> Providers</NavLink>
            <NavLink to="/models" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🧠</span> Models</NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛠️</span> Settings</NavLink>
            <NavLink to="/apikeys" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🔑</span> API Keys</NavLink>
            <NavLink to="/apiplayground" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💻</span> API Playground</NavLink>
          </div>
        )}

        <SectionHeader title="Governance" sectionKey="Governance" />
        {expandedSection === 'Governance' && (
          <div className="nav-submenu">
            <NavLink to="/organizations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🏢</span> Organizations</NavLink>
            <NavLink to="/workspace" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💻</span> Workspaces</NavLink>
            <NavLink to="/members" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>👥</span> Members</NavLink>
            <NavLink to="/roles" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>🛡️</span> Roles & Permissions</NavLink>
            <NavLink to="/audit" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>📜</span> Audit Logs</NavLink>
            <NavLink to="/billing" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><span>💳</span> Billing & Usage</NavLink>
          </div>
        )}
      </div>
    </aside>
  );
}
