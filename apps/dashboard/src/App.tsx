import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TenantOnboarding from './pages/TenantOnboarding';
import Dashboard from './pages/Dashboard';
import Contexts from './pages/Contexts';
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

        {/* Protected Dashboard Routes */}
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}>
          <Route index element={<Dashboard />} />
          <Route path="contexts" element={<Contexts />} />
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
