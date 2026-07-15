import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TenantOnboarding from './pages/TenantOnboarding';

// New Dashboard Imports
import ExecutiveDashboard from './pages/dashboard/ExecutiveDashboard';
import AIActivityDashboard from './pages/dashboard/AIActivityDashboard';
import ContextHealth from './pages/dashboard/ContextHealth';
import CostAnalytics from './pages/dashboard/CostAnalytics';
import ProviderAnalytics from './pages/dashboard/ProviderAnalytics';
import WorkspaceAnalytics from './pages/dashboard/WorkspaceAnalytics';
import SearchAnalytics from './pages/dashboard/SearchAnalytics';
import APIAnalytics from './pages/dashboard/APIAnalytics';
import StorageAnalytics from './pages/dashboard/StorageAnalytics';
import AgentAnalytics from './pages/dashboard/AgentAnalytics';

// New Context Imports
import AllContexts from './pages/contexts/AllContexts';
import ContextDetails from './pages/contexts/ContextDetails';
import ContextEditor from './pages/contexts/ContextEditor';
import CreateContext from './pages/contexts/CreateContext';
import VersionHistory from './pages/contexts/VersionHistory';
import MetadataViewer from './pages/contexts/MetadataViewer';
import ContextPermissions from './pages/contexts/ContextPermissions';
import EmbeddingsViewer from './pages/contexts/EmbeddingsViewer';
import ContextChunks from './pages/contexts/ContextChunks';
import Relationships from './pages/contexts/Relationships';
import TagsManager from './pages/contexts/TagsManager';
import AISummary from './pages/contexts/AISummary';
import Collections from './pages/Collections';
import Memories from './pages/Memories';
import Search from './pages/Search';
import Timeline from './pages/Timeline';
import Connectors from './pages/Connectors';
import Providers from './pages/Providers';
import Settings from './pages/Settings';
import Workspace from './pages/Workspace';
import GraphExplorer from './pages/GraphExplorer';
import IngestionJobs from './pages/IngestionJobs';
import Sources from './pages/Sources';
import Webhooks from './pages/Webhooks';
import Models from './pages/Models';
import APIKeys from './pages/APIKeys';
import APIPlayground from './pages/APIPlayground';
import Organizations from './pages/Organizations';
import Members from './pages/Members';
import RolesPermissions from './pages/RolesPermissions';
import AuditLogs from './pages/AuditLogs';
import Billing from './pages/Billing';

export default function App() {
  // A simple mock auth guard checking if token exists
  const isAuthenticated = !!localStorage.getItem('ocp_token');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboard" element={<TenantOnboarding />} />

        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}>
          <Route index element={<Navigate to="/dashboard/executive" replace />} />
          <Route path="dashboard/executive" element={<ExecutiveDashboard />} />
          <Route path="dashboard/ai-activity" element={<AIActivityDashboard />} />
          <Route path="dashboard/context-health" element={<ContextHealth />} />
          <Route path="dashboard/cost" element={<CostAnalytics />} />
          <Route path="dashboard/provider" element={<ProviderAnalytics />} />
          <Route path="dashboard/workspace" element={<WorkspaceAnalytics />} />
          <Route path="dashboard/search" element={<SearchAnalytics />} />
          <Route path="dashboard/api" element={<APIAnalytics />} />
          <Route path="dashboard/storage" element={<StorageAnalytics />} />
          <Route path="dashboard/agent" element={<AgentAnalytics />} />
          
          <Route path="contexts/all" element={<AllContexts />} />
          <Route path="contexts/details" element={<ContextDetails />} />
          <Route path="contexts/editor" element={<ContextEditor />} />
          <Route path="contexts/create" element={<CreateContext />} />
          <Route path="contexts/history" element={<VersionHistory />} />
          <Route path="contexts/metadata" element={<MetadataViewer />} />
          <Route path="contexts/permissions" element={<ContextPermissions />} />
          <Route path="contexts/embeddings" element={<EmbeddingsViewer />} />
          <Route path="contexts/chunks" element={<ContextChunks />} />
          <Route path="contexts/relationships" element={<Relationships />} />
          <Route path="contexts/tags" element={<TagsManager />} />
          <Route path="contexts/summary" element={<AISummary />} />
          
          <Route path="memories" element={<Memories />} />
          <Route path="collections" element={<Collections />} />
          <Route path="search" element={<Search />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="connectors" element={<Connectors />} />
          <Route path="providers" element={<Providers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="graphexplorer" element={<GraphExplorer />} />
          <Route path="connectors" element={<Connectors />} />
          <Route path="sources" element={<Sources />} />
          <Route path="ingestionjobs" element={<IngestionJobs />} />
          <Route path="webhooks" element={<Webhooks />} />
          <Route path="models" element={<Models />} />
          <Route path="apikeys" element={<APIKeys />} />
          <Route path="apiplayground" element={<APIPlayground />} />
          <Route path="organizations" element={<Organizations />} />
          <Route path="members" element={<Members />} />
          <Route path="roles" element={<RolesPermissions />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="billing" element={<Billing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
