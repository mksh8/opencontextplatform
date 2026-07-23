import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import TenantOnboarding from './pages/TenantOnboarding';

// New Dashboard Imports
import Dashboard from './pages/Dashboard';
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

// New Collection Imports
import CollectionsList from './pages/collections/CollectionsList';
import CollectionDetails from './pages/collections/CollectionDetails';
import CreateCollection from './pages/collections/CreateCollection';
import NestedCollections from './pages/collections/NestedCollections';
import CollectionPermissions from './pages/collections/CollectionPermissions';
import CollectionAnalytics from './pages/collections/CollectionAnalytics';

// New Search Imports
import UniversalSearch from './pages/search/UniversalSearch';
import SemanticSearch from './pages/search/SemanticSearch';
import GraphSearch from './pages/search/GraphSearch';
import HybridSearch from './pages/search/HybridSearch';
import SavedSearches from './pages/search/SavedSearches';
import SearchHistory from './pages/search/SearchHistory';
import GlobalSearchAnalytics from './pages/search/SearchAnalytics';

// New Connectors Imports
import ConnectorMarketplace from './pages/connectors/ConnectorMarketplace';
import InstalledConnectors from './pages/connectors/InstalledConnectors';
import CreateConnector from './pages/connectors/CreateConnector';
import ConnectorDetails from './pages/connectors/ConnectorDetails';
import ConnectorAuth from './pages/connectors/ConnectorAuth';
import ConnectorScheduling from './pages/connectors/ConnectorScheduling';
import SyncHistory from './pages/connectors/SyncHistory';
import ConnectorLogs from './pages/connectors/ConnectorLogs';
import ConnectorHealth from './pages/connectors/ConnectorHealth';
import ConnectorTemplates from './pages/connectors/ConnectorTemplates';

// New Ingestion Imports
import IngestionPipelines from './pages/ingestion/IngestionPipelines';
import DataPreview from './pages/ingestion/DataPreview';
import ETLConfig from './pages/ingestion/ETLConfig';
import Validations from './pages/ingestion/Validations';
import ChunkingStrategy from './pages/ingestion/ChunkingStrategy';
import EmbeddingConfig from './pages/ingestion/EmbeddingConfig';
import DeadLetterQueue from './pages/ingestion/DeadLetterQueue';
import IngestionWebhooks from './pages/ingestion/IngestionWebhooks';
import IngestionTelemetry from './pages/ingestion/IngestionTelemetry';

import Memories from './pages/Memories';
import Search from './pages/Search';
import Timeline from './pages/Timeline';
import Providers from './pages/Providers';
import Settings from './pages/Settings';
import SecuritySSO from './pages/SecuritySSO';
import Workspace from './pages/Workspace';
import IngestionJobs from './pages/IngestionJobs';
import Webhooks from './pages/Webhooks';
import Models from './pages/Models';
import APIKeys from './pages/APIKeys';
import APIPlayground from './pages/APIPlayground';
import Organizations from './pages/Organizations';
import OrganizationDashboard from './pages/OrganizationDashboard';
import TenantDashboard from './pages/TenantDashboard';
import OrganizationUsers from './pages/OrganizationUsers';
import UserDetails from './pages/UserDetails';
import UserForm from './pages/UserForm';
import OrganizationTenants from './pages/OrganizationTenants';
import TenantDetails from './pages/TenantDetails';
import TenantForm from './pages/TenantForm';
import OrganizationGroups from './pages/OrganizationGroups';
import GroupDetails from './pages/GroupDetails';
import GroupForm from './pages/GroupForm';
import OrganizationDepartments from './pages/OrganizationDepartments';
import DepartmentDetails from './pages/DepartmentDetails';
import DepartmentForm from './pages/DepartmentForm';
import Members from './pages/Members';
import RolesPermissions from './pages/RolesPermissions';
import AuditLogs from './pages/AuditLogs';
import AuditLogDetails from './pages/AuditLogDetails';
import Billing from './pages/Billing';
import Marketplace from './pages/Marketplace';
import ConnectorRegistry from './pages/ConnectorRegistry';
import PluginRegistry from './pages/PluginRegistry';
import SDKRegistry from './pages/SDKRegistry';
import Policies from './pages/Policies';
import PlatformHealth from './pages/PlatformHealth';
import Integrations from './pages/Integrations';
import Branding from './pages/Branding';
import TenantWorkspaces from './pages/TenantWorkspaces';
import TenantAIProviders from './pages/TenantAIProviders';
import TenantStorage from './pages/TenantStorage';
import TenantSecrets from './pages/TenantSecrets';
import TenantAPIKeys from './pages/TenantAPIKeys';
import TenantPolicies from './pages/TenantPolicies';
import TenantQuota from './pages/TenantQuota';
import TenantMonitoring from './pages/TenantMonitoring';
import {
  CatalogPage,
  ContextEnginePage,
  DatasourcesPage,
  DocumentsPage,
  KnowledgeGraphPage,
  MemoryPage,
  OntologyPage,
  PipelinesPage,
  ProjectsPage,
  WorkspaceConnectorsPage,
} from './pages/WorkspaceConsolePages';

import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/onboard" element={<TenantOnboarding />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Dashboard />} />
          <Route path="projects" element={<ProjectsPage />} />
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
          <Route path="contexts/details/:id" element={<ContextDetails />} />
          <Route path="contexts/editor/:id" element={<ContextEditor />} />
          <Route path="contexts/create" element={<CreateContext />} />
          <Route path="contexts/history" element={<VersionHistory />} />
          <Route path="contexts/metadata" element={<MetadataViewer />} />
          <Route path="contexts/permissions" element={<ContextPermissions />} />
          <Route path="contexts/embeddings" element={<EmbeddingsViewer />} />
          <Route path="contexts/chunks" element={<ContextChunks />} />
          <Route path="contexts/relationships" element={<Relationships />} />
          <Route path="contexts/tags" element={<TagsManager />} />
          <Route path="contexts/summary" element={<AISummary />} />
          
          <Route path="collections/all" element={<CollectionsList />} />
          <Route path="collections/details" element={<CollectionDetails />} />
          <Route path="collections/create" element={<CreateCollection />} />
          <Route path="collections/nested" element={<NestedCollections />} />
          <Route path="collections/permissions" element={<CollectionPermissions />} />
          <Route path="collections/analytics" element={<CollectionAnalytics />} />
          
          <Route path="search/universal" element={<UniversalSearch />} />
          <Route path="search/semantic" element={<SemanticSearch />} />
          <Route path="search/graph" element={<GraphSearch />} />
          <Route path="search/hybrid" element={<HybridSearch />} />
          <Route path="search/saved" element={<SavedSearches />} />
          <Route path="search/history" element={<SearchHistory />} />
          <Route path="search/analytics" element={<GlobalSearchAnalytics />} />
          
          <Route path="connectors/marketplace" element={<ConnectorMarketplace />} />
          <Route path="connectors/installed" element={<InstalledConnectors />} />
          <Route path="connectors/create" element={<CreateConnector />} />
          <Route path="connectors/details" element={<ConnectorDetails />} />
          <Route path="connectors/auth" element={<ConnectorAuth />} />
          <Route path="connectors/scheduling" element={<ConnectorScheduling />} />
          <Route path="connectors/sync" element={<SyncHistory />} />
          <Route path="connectors/logs" element={<ConnectorLogs />} />
          <Route path="connectors/health" element={<ConnectorHealth />} />
          <Route path="connectors/templates" element={<ConnectorTemplates />} />
          
          <Route path="ingestion/pipelines" element={<IngestionPipelines />} />
          <Route path="ingestion/preview" element={<DataPreview />} />
          <Route path="ingestion/etl" element={<ETLConfig />} />
          <Route path="ingestion/validations" element={<Validations />} />
          <Route path="ingestion/chunking" element={<ChunkingStrategy />} />
          <Route path="ingestion/embeddings" element={<EmbeddingConfig />} />
          <Route path="ingestion/dlq" element={<DeadLetterQueue />} />
          <Route path="ingestion/webhooks" element={<IngestionWebhooks />} />
          <Route path="ingestion/telemetry" element={<IngestionTelemetry />} />
          
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="datasources" element={<DatasourcesPage />} />
          <Route path="sources" element={<DatasourcesPage />} />
          <Route path="connectors" element={<WorkspaceConnectorsPage />} />
          <Route path="pipelines" element={<PipelinesPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="memory" element={<MemoryPage />} />
          <Route path="memories" element={<MemoryPage />} />
          <Route path="ontology" element={<OntologyPage />} />
          <Route path="context-engine" element={<ContextEnginePage />} />
          <Route path="graph" element={<KnowledgeGraphPage />} />
          <Route path="memories/legacy" element={<Memories />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="providers" element={<TenantAIProviders />} />
          <Route path="tenant/providers" element={<TenantAIProviders />} />
          <Route path="policies" element={<Policies />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/sso" element={<SecuritySSO />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="models" element={<Models />} />
          <Route path="apikeys" element={<TenantAPIKeys />} />
          <Route path="tenant/apikeys" element={<TenantAPIKeys />} />
          <Route path="apiplayground" element={<APIPlayground />} />
          <Route path="organizations" element={<Organizations />} />
          <Route path="organization/overview" element={<OrganizationDashboard />} />
          <Route path="tenant/dashboard" element={<TenantDashboard />} />
          <Route path="workspaces" element={<TenantWorkspaces />} />
          <Route path="tenant/workspaces" element={<TenantWorkspaces />} />
          <Route path="storage" element={<TenantStorage />} />
          <Route path="tenant/storage" element={<TenantStorage />} />
          <Route path="secrets" element={<TenantSecrets />} />
          <Route path="tenant/secrets" element={<TenantSecrets />} />
          <Route path="policies" element={<TenantPolicies />} />
          <Route path="tenant/policies" element={<TenantPolicies />} />
          <Route path="quota" element={<TenantQuota />} />
          <Route path="tenant/quota" element={<TenantQuota />} />
          <Route path="monitoring" element={<TenantMonitoring />} />
          <Route path="tenant/monitoring" element={<TenantMonitoring />} />
          
          <Route path="tenants" element={<OrganizationTenants />} />
          <Route path="tenants/create" element={<TenantForm mode="create" />} />
          <Route path="tenants/:id" element={<TenantDetails />} />
          <Route path="tenants/:id/edit" element={<TenantForm mode="edit" />} />
          
          <Route path="global-users" element={<Members />} />
          <Route path="members" element={<OrganizationUsers />} />
          <Route path="members/create" element={<UserForm mode="create" />} />
          <Route path="members/:id" element={<UserDetails />} />
          <Route path="members/:id/edit" element={<UserForm mode="edit" />} />
          
          <Route path="groups" element={<OrganizationGroups />} />
          <Route path="groups/create" element={<GroupForm mode="create" />} />
          <Route path="groups/:id" element={<GroupDetails />} />
          <Route path="groups/:id/edit" element={<GroupForm mode="edit" />} />
          
          <Route path="departments" element={<OrganizationDepartments />} />
          <Route path="departments/create" element={<DepartmentForm mode="create" />} />
          <Route path="departments/:id" element={<DepartmentDetails />} />
          <Route path="departments/:id/edit" element={<DepartmentForm mode="edit" />} />
          
          <Route path="roles" element={<RolesPermissions />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="audit/:id" element={<AuditLogDetails />} />
          <Route path="health" element={<PlatformHealth />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="settings/branding" element={<Branding />} />
          <Route path="billing" element={<Billing />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="registry/connectors" element={<ConnectorRegistry />} />
          <Route path="registry/plugins" element={<PluginRegistry />} />
          <Route path="registry/sdks" element={<SDKRegistry />} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={
            <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <h1 style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '16px' }}>404</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Page not found. The URL might be incorrect or missing an ID parameter.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
    </ToastProvider>
    </AuthProvider>
  );
}
