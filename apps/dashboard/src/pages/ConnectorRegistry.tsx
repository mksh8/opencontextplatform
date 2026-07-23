import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const TABS = ['Overview', 'All Connectors', 'Data Sources', 'Applications', 'Databases', 'APIs', 'Cloud Services'];

// Mock Data for Overview
const KPIS = [
  { label: 'Total Connectors', value: 46, trend: '↗ 12.5% from last month', trendUp: true },
  { label: 'Active', value: 38, trend: '82.6% of total connectors', trendUp: true },
  { label: 'Inactive', value: 6, trend: '13.0% of total connectors', trendUp: false },
  { label: 'Error', value: 2, trend: '4.4% of total connectors', trendUp: false }
];

const CATEGORIES = [
  { name: 'Data Sources', count: 10, desc: 'Data ingestion sources', icon: '🪣' },
  { name: 'Applications', count: 12, desc: 'Third-party applications', icon: '💬' },
  { name: 'Databases', count: 11, desc: 'Database connectors', icon: '🐘' },
  { name: 'APIs', count: 8, desc: 'REST / GraphQL APIs', icon: '⚡' },
  { name: 'Cloud Services', count: 5, desc: 'Cloud platform services', icon: '☁️' }
];

const RECENT_ACTIVITY = [
  { connector: 'Snowflake', icon: '❄️', category: 'Database', action: 'Connector updated', status: 'Success', by: 'Mukesh Kumar', time: '2h ago' },
  { connector: 'Slack', icon: '💬', category: 'Application', action: 'Connection tested', status: 'Success', by: 'Priya Sharma', time: '5h ago' },
  { connector: 'Google BigQuery', icon: '🔵', category: 'Database', action: 'Connection test', status: 'Success', by: 'Amit Verma', time: '8h ago' },
  { connector: 'Salesforce', icon: '☁️', category: 'Application', action: 'Connector created', status: 'Failed', by: 'Rahul Singh', time: '12h ago' },
  { connector: 'AWS S3', icon: '🪣', category: 'Cloud Service', action: 'Connector created', status: 'Success', by: 'Neha Patel', time: '1d ago' }
];

// Mock Data for Tabs
const ALL_CONNECTORS = [
  { id: 1, name: 'Snowflake', category: 'Database', type: 'Database', status: 'Active', version: '1.3.4', lastUpdated: 'May 17, 2024', icon: '❄️' },
  { id: 2, name: 'Amazon S3', category: 'Storage', type: 'Storage', status: 'Active', version: '1.4.2', lastUpdated: 'May 12, 2024', icon: '🪣' },
  { id: 3, name: 'Google BigQuery', category: 'Database', type: 'Data Warehouse', status: 'Active', version: '1.3.1', lastUpdated: 'May 11, 2024', icon: '🔵' },
  { id: 4, name: 'PostgreSQL', category: 'Database', type: 'SQL', status: 'Active', version: '2.1.0', lastUpdated: 'May 10, 2024', icon: '🐘' },
  { id: 5, name: 'MySQL', category: 'Database', type: 'SQL', status: 'Active', version: '2.0.3', lastUpdated: 'May 10, 2024', icon: '🐬' },
  { id: 6, name: 'Slack', category: 'Application', type: 'SaaS', status: 'Active', version: '1.1.0', lastUpdated: 'May 08, 2024', icon: '💬' },
  { id: 7, name: 'Salesforce', category: 'Application', type: 'CRM', status: 'Active', version: '1.2.4', lastUpdated: 'May 05, 2024', icon: '☁️' },
  { id: 8, name: 'REST API', category: 'API', type: 'HTTP', status: 'Active', version: '1.0.0', lastUpdated: 'May 05, 2024', icon: '⚡' },
  { id: 9, name: 'Microsoft OneDrive', category: 'Cloud Service', type: 'Storage', status: 'Active', version: '1.2.0', lastUpdated: 'May 03, 2024', icon: '📂' },
  { id: 10, name: 'Redis', category: 'Database', type: 'NoSQL', status: 'Inactive', version: '1.0.5', lastUpdated: 'May 01, 2024', icon: '🟥' }
];

const DATA_SOURCES = [
  { id: 1, name: 'Amazon S3', type: 'Object Storage', protocol: 'S3', status: 'Active', lastSync: '5 mins ago', icon: '🪣', description: 'Connect to Amazon S3 to store, retrieve and manage your unstructured data.', auth: 'IAM Role', region: 'us-east-1', bucket: 'opencontext-data', addedOn: 'May 12, 2024', addedBy: 'Mukesh Kumar', capabilities: ['File Upload / Download', 'List Buckets', 'Pre-signed URLs', 'Metadata Management'] },
  { id: 2, name: 'Google Drive', type: 'File Storage', protocol: 'OAuth 2.0', status: 'Active', lastSync: '15 mins ago', icon: '📁', description: 'Access and ingest files from Google Drive directories.', auth: 'OAuth 2.0', region: 'global', bucket: 'shared-drive', addedOn: 'May 10, 2024', addedBy: 'Mukesh Kumar', capabilities: ['Read Files', 'Folder Sync', 'Metadata Extraction'] },
  { id: 3, name: 'Dropbox', type: 'File Storage', protocol: 'OAuth 2.0', status: 'Active', lastSync: '30 mins ago', icon: '📦', description: 'Sync files and folders from Dropbox business accounts.', auth: 'OAuth 2.0', region: 'global', bucket: 'dropbox-root', addedOn: 'May 08, 2024', addedBy: 'Mukesh Kumar', capabilities: ['File Retrieval', 'Webhook Notifications'] },
  { id: 4, name: 'SharePoint', type: 'File Storage', protocol: 'REST API', status: 'Active', lastSync: '1 hour ago', icon: '📊', description: 'Ingest documents and lists from Microsoft SharePoint sites.', auth: 'OAuth 2.0', region: 'global', bucket: 'documents-site', addedOn: 'May 05, 2024', addedBy: 'Mukesh Kumar', capabilities: ['List Items Fetch', 'Document Download'] },
  { id: 5, name: 'FTP Server', type: 'File Transfer', protocol: 'FTP', status: 'Active', lastSync: '2 hours ago', icon: '🌐', description: 'Transfer files securely from legacy FTP servers.', auth: 'User/Pass', region: 'us-west', bucket: '/home/ftp', addedOn: 'May 01, 2024', addedBy: 'Mukesh Kumar', capabilities: ['File Download', 'Directory Listing'] }
];

const APPLICATIONS = [
  { id: 1, name: 'Slack', category: 'Communication', type: 'SaaS', authType: 'OAuth 2.0', status: 'Active', lastSync: '10 mins ago', icon: '💬', description: 'Connect to Slack to send real-time notifications, sync channels, and configure interactive messages.', auth: 'OAuth 2.0', workspace: 'opencontext', addedOn: 'May 15, 2024', addedBy: 'Priya Sharma', capabilities: ['Read Messages', 'Send Messages', 'Channel Syncing', 'User Management'] },
  { id: 2, name: 'Salesforce', category: 'CRM', type: 'SaaS', authType: 'OAuth 2.0', status: 'Active', lastSync: '30 mins ago', icon: '☁️', description: 'Salesforce CRM connector for leads, contacts, and opportunities.', auth: 'OAuth 2.0', workspace: 'opencontext-prod', addedOn: 'May 12, 2024', addedBy: 'Mukesh Kumar', capabilities: ['Object CRUD', 'SOQL Queries', 'Bulk API'] },
  { id: 3, name: 'Jira', category: 'Project Mgmt', type: 'SaaS', authType: 'OAuth 2.0', status: 'Active', lastSync: '1 hour ago', icon: '📐', description: 'Sync Jira issues and project boards for context resolution.', auth: 'OAuth 2.0', workspace: 'opencontext-jira', addedOn: 'May 10, 2024', addedBy: 'Priya Sharma', capabilities: ['Issue Tracking', 'Board Sync'] },
  { id: 4, name: 'Confluence', category: 'Collaboration', type: 'SaaS', authType: 'OAuth 2.0', status: 'Active', lastSync: '2 hours ago', icon: '📘', description: 'Ingest knowledge base pages and spaces from Confluence.', auth: 'OAuth 2.0', workspace: 'opencontext-wiki', addedOn: 'May 08, 2024', addedBy: 'Priya Sharma', capabilities: ['Page Extraction', 'Space Listing'] }
];

const DATABASES = [
  { id: 1, name: 'PostgreSQL', type: 'SQL', engine: 'PostgreSQL 15', connection: 'Direct', status: 'Active', lastSync: '2 mins ago', icon: '🐘', description: 'Connect to PostgreSQL databases to run queries and import data.', host: 'db.opencontext.com', port: '5432', database: 'analytics', connType: 'Direct', addedOn: 'May 10, 2024', addedBy: 'Amit Verma', capabilities: ['Read/Write', 'Schema Discovery', 'Query Execution', 'Stored Procedures'] },
  { id: 2, name: 'MySQL', type: 'SQL', engine: 'MySQL 8.0', connection: 'Direct', status: 'Active', lastSync: '5 mins ago', icon: '🐬', description: 'Connect to MySQL databases with pool configuration.', host: 'mysql.opencontext.com', port: '3306', database: 'production', connType: 'Direct', addedOn: 'May 12, 2024', addedBy: 'Amit Verma', capabilities: ['Read Only', 'Table Schema Sync'] },
  { id: 3, name: 'Snowflake', type: 'Data Warehouse', engine: 'Snowflake', connection: 'OAuth 2.0', status: 'Active', lastSync: '15 mins ago', icon: '❄️', description: 'Snowflake data warehouse connector for analytics workloads.', host: 'snowflake.opencontext.com', port: '443', database: 'DW_PROD', connType: 'OAuth 2.0', addedOn: 'May 14, 2024', addedBy: 'Amit Verma', capabilities: ['Query Execution', 'Data Sharing', 'Time Travel'] },
  { id: 4, name: 'Google BigQuery', type: 'Data Warehouse', engine: 'BigQuery', connection: 'Service Account', status: 'Active', lastSync: '30 mins ago', icon: '🔵', description: 'BigQuery serverless data warehouse connector.', host: 'bigquery.googleapis.com', port: '443', database: 'bq-project', connType: 'Service Account', addedOn: 'May 15, 2024', addedBy: 'Amit Verma', capabilities: ['Dataset CRUD', 'SQL Query Execute'] }
];

const APIS = [
  { id: 1, name: 'REST API', protocol: 'REST', authType: 'API Key', status: 'Active', lastUsed: '2 hours ago', icon: '⚡', description: 'Generic REST API connector to integrate with third-party endpoints.', baseUrl: 'https://api.example.com', auth: 'API Key', addedOn: 'May 08, 2024', addedBy: 'Rahul Singh', capabilities: ['GET, POST, PUT, DELETE', 'Header Management', 'Pagination Support', 'Rate Limit Handling'] },
  { id: 2, name: 'GraphQL API', protocol: 'GraphQL', authType: 'API Key', status: 'Active', lastUsed: '15 mins ago', icon: '🕸️', description: 'Query and mutate nodes using GraphQL endpoints.', baseUrl: 'https://api.graphql.com', auth: 'API Key', addedOn: 'May 09, 2024', addedBy: 'Rahul Singh', capabilities: ['Query Fetching', 'Schema Introspection'] },
  { id: 3, name: 'OpenAI API', protocol: 'REST', authType: 'API Key', status: 'Active', lastUsed: '5 mins ago', icon: '🧠', description: 'Connect to OpenAI endpoints for prompt completions and embedding models.', baseUrl: 'https://api.openai.com/v1', auth: 'API Key', addedOn: 'May 10, 2024', addedBy: 'Rahul Singh', capabilities: ['Chat Completions', 'Embeddings Query'] }
];

const CLOUD_SERVICES = [
  { id: 1, name: 'AWS S3', provider: 'AWS', serviceType: 'Storage', authType: 'IAM Role', status: 'Active', lastSync: '5 mins ago', icon: '🪣', description: 'Integrate with Amazon S3 for scalable object storage.', region: 'us-east-1', accessType: 'IAM Role', addedOn: 'May 12, 2024', addedBy: 'Mukesh Kumar', capabilities: ['Bucket Management', 'Upload/Download', 'Presigned URLs', 'Lifecycle Policies'] },
  { id: 2, name: 'AWS Lambda', provider: 'AWS', serviceType: 'Compute', authType: 'IAM Role', status: 'Active', lastSync: '15 mins ago', icon: '⚡', description: 'Trigger serverless functions based on context updates.', region: 'us-east-1', accessType: 'IAM Role', addedOn: 'May 14, 2024', addedBy: 'Mukesh Kumar', capabilities: ['Function Invocation', 'Environment Config'] },
  { id: 3, name: 'AWS Redshift', provider: 'AWS', serviceType: 'Data Warehouse', authType: 'IAM Role', status: 'Active', lastSync: '30 mins ago', icon: '❄️', description: 'AWS Redshift database connector.', region: 'us-east-1', accessType: 'IAM Role', addedOn: 'May 15, 2024', addedBy: 'Mukesh Kumar', capabilities: ['Query Execution', 'Cluster Status'] }
];

export default function ConnectorRegistry() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(DATA_SOURCES[0]);
  const { showToast } = useToast();

  const handleTestConnection = (name: string) => {
    showToast(`Testing connection to ${name}...`, 'success');
    setTimeout(() => {
      showToast(`Connection to ${name} successful!`, 'success');
    }, 1200);
  };

  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>Connector Registry</h1>
          <p style={{ marginTop: 4 }}>Manage and configure data and service connectors.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>+ New Connector</button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 0, marginBottom: 20, overflowX: 'auto' }}>
        {TABS.map(t => (
          <div
            key={t}
            onClick={() => {
              setActiveTab(t);
              // set default selected items based on tab selection
              if (t === 'Data Sources') setSelectedItem(DATA_SOURCES[0]);
              else if (t === 'Applications') setSelectedItem(APPLICATIONS[0]);
              else if (t === 'Databases') setSelectedItem(DATABASES[0]);
              else if (t === 'APIs') setSelectedItem(APIS[0]);
              else if (t === 'Cloud Services') setSelectedItem(CLOUD_SERVICES[0]);
            }}
            style={{
              padding: '10px 18px',
              borderBottom: activeTab === t ? '2px solid #8b5cf6' : '2px solid transparent',
              color: activeTab === t ? '#fff' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* 1. Overview Tab view */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {KPIS.map((kpi, idx) => (
              <div key={idx} className="widget" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: kpi.label === 'Active' ? '#10b981' : kpi.label === 'Inactive' || kpi.label === 'Error' ? '#ef4444' : '#fff'
                }}>
                  {kpi.label === 'Total Connectors' ? '🔌' : kpi.label === 'Active' ? '✓' : kpi.label === 'Inactive' ? '⏸' : '⚠️'}
                </div>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 4 }}>{kpi.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{kpi.value}</div>
                  <div style={{ fontSize: 11, color: kpi.trendUp ? '#10b981' : '#ef4444' }}>
                    {kpi.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Categories Section */}
          <div className="widget" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ fontSize: 15, margin: 0, fontWeight: 600, color: '#fff' }}>Connector Categories</h2>
              <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View all</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
              {CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveTab(cat.name);
                    if (cat.name === 'Data Sources') setSelectedItem(DATA_SOURCES[0]);
                    else if (cat.name === 'Applications') setSelectedItem(APPLICATIONS[0]);
                    else if (cat.name === 'Databases') setSelectedItem(DATABASES[0]);
                    else if (cat.name === 'APIs') setSelectedItem(APIS[0]);
                    else if (cat.name === 'Cloud Services') setSelectedItem(CLOUD_SERVICES[0]);
                  }}
                  style={{
                    padding: '16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 10,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 20 }}>{cat.icon}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{cat.count}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: 13, marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{cat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 15, margin: 0, fontWeight: 600, color: '#fff' }}>Recent Activity</h2>
              <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer' }}>View all</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Connector', 'Category', 'Action', 'Status', 'By', 'Time'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ACTIVITY.map((act, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span>{act.icon}</span>
                        <span style={{ color: '#fff', fontWeight: 500 }}>{act.connector}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{act.category}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-primary)' }}>{act.action}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 4,
                        background: act.status === 'Success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                        color: act.status === 'Success' ? '#10b981' : '#ef4444',
                        fontWeight: 500
                      }}>
                        {act.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{act.by}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{act.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. All Connectors Tab View */}
      {activeTab === 'All Connectors' && (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search connectors..."
              style={{
                flex: 1,
                padding: '7px 12px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: '#fff',
                fontSize: 13
              }}
            />
            <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>All Categories</option></select>
            <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>Sort: Name (A-Z)</option></select>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {['Connector', 'Category', 'Type', 'Status', 'Version', 'Last Updated', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_CONNECTORS.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{c.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{c.name}</span></div></td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{c.category}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{c.type}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: c.status === 'Active' ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.05)', color: c.status === 'Active' ? '#10b981' : 'var(--text-secondary)', fontWeight: 500 }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace' }}>{c.version}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{c.lastUpdated}</td>
                  <td style={{ padding: '14px 16px' }}>✏️ 🗑️</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Showing 1 to 10 of 46 connectors</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {['‹', '1', '2', '3', '4', '›'].map((p, i) => <button key={i} style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid var(--border-color)', background: p === '1' ? '#8b5cf6' : 'transparent', color: p === '1' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: 11 }}>{p}</button>)}
            </div>
          </div>
        </div>
      )}

      {/* 3. Data Sources Tab View */}
      {activeTab === 'Data Sources' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12 }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search data sources..." style={{ flex: 1, padding: '7px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 13 }} />
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>All Categories</option></select>
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>Sort: Status</option></select>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Data Source', 'Type', 'Protocol', 'Status', 'Last Sync', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {DATA_SOURCES.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase())).map(d => (
                  <tr key={d.id} onClick={() => setSelectedItem(d)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: selectedItem?.id === d.id ? 'rgba(139,92,246,0.08)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{d.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{d.name}</span></div></td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{d.type}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{d.protocol}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{d.status}</span></td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{d.lastSync}</td>
                    <td style={{ padding: '14px 16px' }}>✏️ 🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Detail Pane */}
          {selectedItem && (
            <div className="widget" style={{ width: 310, padding: 20, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 32, padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>{selectedItem.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 4 }}>{selectedItem.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedItem.type}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500, marginTop: 6 }}>
                    ● {selectedItem.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <button className="btn btn-secondary" onClick={() => handleTestConnection(selectedItem.name)} style={{ flex: 1, padding: '7px 12px', fontSize: 12 }}>Test Connection</button>
                <button className="btn btn-secondary" style={{ padding: '7px 10px' }}>Actions ▾</button>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>{selectedItem.description}</p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Configuration</div>
                {[
                  ['Authentication', selectedItem.auth],
                  ['Region', selectedItem.region],
                  ['Bucket', selectedItem.bucket],
                  ['Added On', selectedItem.addedOn],
                  ['Added By', selectedItem.addedBy],
                  ['Last Sync', selectedItem.lastSync]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Capabilities</div>
                {selectedItem.capabilities.map(cap => (
                  <div key={cap} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#10b981' }}>✓</span> {cap}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
                <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>View Documentation →</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Applications Tab View */}
      {activeTab === 'Applications' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 12 }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applications..." style={{ flex: 1, padding: '7px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', fontSize: 13 }} />
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>All Categories</option></select>
              <select style={{ fontSize: 13, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 6, color: '#fff', padding: '0 12px' }}><option>Sort: Status</option></select>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Application', 'Category', 'Type', 'Auth Type', 'Status', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {APPLICATIONS.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase())).map(a => (
                  <tr key={a.id} onClick={() => setSelectedItem(a)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: selectedItem?.id === a.id ? 'rgba(139,92,246,0.08)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{a.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{a.name}</span></div></td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{a.category}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{a.type}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{a.authType}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{a.status}</span></td>
                    <td style={{ padding: '14px 16px' }}>✏️ 🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Detail Pane */}
          {selectedItem && (
            <div className="widget" style={{ width: 310, padding: 20, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 32, padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>{selectedItem.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 4 }}>{selectedItem.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedItem.category} / {selectedItem.type}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500, marginTop: 6 }}>
                    ● {selectedItem.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <button className="btn btn-secondary" onClick={() => handleTestConnection(selectedItem.name)} style={{ flex: 1, padding: '7px 12px', fontSize: 12 }}>Test Connection</button>
                <button className="btn btn-secondary" style={{ padding: '7px 10px' }}>Actions ▾</button>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>{selectedItem.description}</p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Configuration</div>
                {[
                  ['Authentication', selectedItem.auth],
                  ['Workspace', selectedItem.workspace],
                  ['Added On', selectedItem.addedOn],
                  ['Added By', selectedItem.addedBy],
                  ['Last Sync', selectedItem.lastSync]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Capabilities</div>
                {selectedItem.capabilities.map(cap => (
                  <div key={cap} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#10b981' }}>✓</span> {cap}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
                <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>View Documentation →</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Databases Tab View */}
      {activeTab === 'Databases' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Database', 'Type', 'Engine', 'Connection', 'Status', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {DATABASES.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase())).map(d => (
                  <tr key={d.id} onClick={() => setSelectedItem(d)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: selectedItem?.id === d.id ? 'rgba(139,92,246,0.08)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{d.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{d.name}</span></div></td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{d.type}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{d.engine}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{d.connection}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{d.status}</span></td>
                    <td style={{ padding: '14px 16px' }}>✏️ 🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Detail Pane */}
          {selectedItem && (
            <div className="widget" style={{ width: 310, padding: 20, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 32, padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>{selectedItem.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 4 }}>{selectedItem.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedItem.type}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500, marginTop: 6 }}>
                    ● {selectedItem.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <button className="btn btn-secondary" onClick={() => handleTestConnection(selectedItem.name)} style={{ flex: 1, padding: '7px 12px', fontSize: 12 }}>Test Connection</button>
                <button className="btn btn-secondary" style={{ padding: '7px 10px' }}>Actions ▾</button>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>{selectedItem.description}</p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Configuration</div>
                {[
                  ['Host', selectedItem.host],
                  ['Port', selectedItem.port],
                  ['Database', selectedItem.database],
                  ['Connection', selectedItem.connType],
                  ['Added On', selectedItem.addedOn],
                  ['Added By', selectedItem.addedBy],
                  ['Last Sync', selectedItem.lastSync]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Capabilities</div>
                {selectedItem.capabilities.map(cap => (
                  <div key={cap} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#10b981' }}>✓</span> {cap}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
                <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>View Documentation →</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. APIs Tab View */}
      {activeTab === 'APIs' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['API', 'Protocol', 'Auth Type', 'Status', 'Last Used', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {APIS.filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase())).map(a => (
                  <tr key={a.id} onClick={() => setSelectedItem(a)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: selectedItem?.id === a.id ? 'rgba(139,92,246,0.08)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{a.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{a.name}</span></div></td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{a.protocol}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{a.authType}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{a.status}</span></td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{a.lastUsed}</td>
                    <td style={{ padding: '14px 16px' }}>✏️ 🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Detail Pane */}
          {selectedItem && (
            <div className="widget" style={{ width: 310, padding: 20, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 32, padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>{selectedItem.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 4 }}>{selectedItem.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedItem.protocol} / HTTP</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500, marginTop: 6 }}>
                    ● {selectedItem.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <button className="btn btn-secondary" onClick={() => handleTestConnection(selectedItem.name)} style={{ flex: 1, padding: '7px 12px', fontSize: 12 }}>Test Connection</button>
                <button className="btn btn-secondary" style={{ padding: '7px 10px' }}>Actions ▾</button>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>{selectedItem.description}</p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Configuration</div>
                {[
                  ['Base URL', selectedItem.baseUrl],
                  ['Auth Type', selectedItem.auth],
                  ['Added On', selectedItem.addedOn],
                  ['Added By', selectedItem.addedBy],
                  ['Last Used', selectedItem.lastUsed]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <span style={{ color: '#fff', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Capabilities</div>
                {selectedItem.capabilities.map(cap => (
                  <div key={cap} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#10b981' }}>✓</span> {cap}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
                <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>View Documentation →</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. Cloud Services Tab View */}
      {activeTab === 'Cloud Services' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div className="widget" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {['Cloud Service', 'Provider', 'Service Type', 'Auth Type', 'Status', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', fontWeight: 500, fontSize: 12 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {CLOUD_SERVICES.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                  <tr key={c.id} onClick={() => setSelectedItem(c)} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: selectedItem?.id === c.id ? 'rgba(139,92,246,0.08)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span>{c.icon}</span><span style={{ color: '#fff', fontWeight: 500 }}>{c.name}</span></div></td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{c.provider}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{c.serviceType}</td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{c.authType}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 500 }}>{c.status}</span></td>
                    <td style={{ padding: '14px 16px' }}>✏️ 🗑️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Detail Pane */}
          {selectedItem && (
            <div className="widget" style={{ width: 310, padding: 20, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 32, padding: 8, background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>{selectedItem.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 4 }}>{selectedItem.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedItem.serviceType} / {selectedItem.provider}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 500, marginTop: 6 }}>
                    ● {selectedItem.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <button className="btn btn-secondary" onClick={() => handleTestConnection(selectedItem.name)} style={{ flex: 1, padding: '7px 12px', fontSize: 12 }}>Test Connection</button>
                <button className="btn btn-secondary" style={{ padding: '7px 10px' }}>Actions ▾</button>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>{selectedItem.description}</p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Configuration</div>
                {[
                  ['Region', selectedItem.region],
                  ['Access Type', selectedItem.accessType],
                  ['Added On', selectedItem.addedOn],
                  ['Added By', selectedItem.addedBy],
                  ['Last Sync', selectedItem.lastSync]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <span style={{ color: '#fff', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 10 }}>Capabilities</div>
                {selectedItem.capabilities.map(cap => (
                  <div key={cap} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#10b981' }}>✓</span> {cap}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 14 }}>
                <span style={{ fontSize: 12, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>View Documentation →</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
