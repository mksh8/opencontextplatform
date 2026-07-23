import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

const topConnectors = [
  { name: 'GitHub', emoji: '🐙', value: '32.4K', fill: 'var(--accent-purple)', percent: 85 },
  { name: 'Slack', emoji: '💬', value: '18.7K', fill: 'var(--accent-blue)', percent: 60 },
  { name: 'Notion', emoji: '📓', value: '16.2K', fill: 'var(--accent-green)', percent: 50 },
  { name: 'Jira', emoji: '🔷', value: '12.8K', fill: 'var(--accent-yellow)', percent: 40 },
  { name: 'Confluence', emoji: '📘', value: '8.9K', fill: 'var(--accent-blue)', percent: 25 },
  { name: 'Filesystem', emoji: '📁', value: '6.3K', fill: 'var(--accent-yellow)', percent: 15 },
];

const recentContexts = [
  { title: 'Fix authentication bug in API gateway', source: 'GitHub', age: '2m ago', tokens: '4.2K', type: 'Code' },
  { title: 'Discussion: New memory architecture', source: 'Slack', age: '15m ago', tokens: '2.1K', type: 'Conversation' },
  { title: 'Project roadmap Q2 planning', source: 'Notion', age: '1h ago', tokens: '3.7K', type: 'Documentation' },
  { title: 'Handle timeout in vector search', source: 'Jira', age: '2h ago', tokens: '1.8K', type: 'Issue' },
  { title: 'Database schema design', source: 'Confluence', age: '3h ago', tokens: '2.9K', type: 'Documentation' },
];

const defaultSystemHealth = [
  { label: 'Context Runtime', status: '+ Healthy' },
  { label: 'Vector Database (LanceDB)', status: '+ Healthy' },
  { label: 'Graph Database (Neo4j)', status: '+ Healthy' },
  { label: 'Storage (S3)', status: '+ Healthy' },
  { label: 'Cache (Redis)', status: '+ Healthy' },
  { label: 'Message Queue (NATS)', status: '+ Healthy' },
];

const workspaceUsage = [
  { name: 'Default Workspace', value: '45.2%', hue: 'var(--accent-purple)' },
  { name: 'Engineering', value: '24.6%', hue: 'var(--accent-blue)' },
  { name: 'Research', value: '15.8%', hue: 'var(--accent-green)' },
  { name: 'Product', value: '9.7%', hue: 'var(--accent-yellow)' },
  { name: 'Marketing', value: '4.7%', hue: '#fb7185' },
];

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const { user } = useAuth();
  const [orgId, setOrgId] = useState<string | null>(null);
  const [connectors, setConnectors] = useState<any[]>(topConnectors);
  const [recent, setRecent] = useState<any[]>(recentContexts);
  const [workspace, setWorkspace] = useState<any[]>(workspaceUsage);
  const [systemHealthState, setSystemHealthState] = useState<any[]>(defaultSystemHealth);

  useEffect(() => {
    apiClient.get('/metrics/billing')
      .then(res => setMetrics(res.data))
      .catch(err => console.error('Failed to load metrics', err));
  }, []);

  // Load contexts, organizations and connectors when user is available
  useEffect(() => {
    const loadAll = async () => {
      try {
        // get organizations to determine org_id if available
        const orgRes = await apiClient.get('/organizations');
        const orgs = orgRes.data || [];
        const chosenOrg = orgs.length ? orgs[0] : null;
        const oid = chosenOrg?.id || user?.id || null;
        setOrgId(oid);

        // fetch recent contexts
        try {
          const ctxRes = await apiClient.get('/contexts');
          const contexts = Array.isArray(ctxRes.data) ? ctxRes.data.slice(0,5) : [];
          setRecent(contexts.map((c:any) => ({ title: c.title || c.id, source: c.source || 'Unknown', age: c.created_at || 'N/A', tokens: c.token_count || '—', type: c.type || 'Unknown' })));
        } catch (e) {
          console.warn('Failed to load contexts', e);
        }

        // fetch connectors for org
        if (oid) {
          try {
            const connRes = await apiClient.get(`/connectors/${oid}`);
            const connList = Array.isArray(connRes.data) ? connRes.data : [];
            setConnectors(connList.map((c:any, idx:number) => ({ name: c.name || `Conn ${idx}`, emoji: c.icon || '🔌', value: c.usage || '0', fill: 'var(--accent-blue)', percent: Math.min(100, c.metric_percent || Math.round((c.usage_ratio||0)*100)) })));
          } catch (e) {
            console.warn('Failed to load connectors', e);
          }

          // fetch providers to build system health
          try {
            const provRes = await apiClient.get(`/providers/${oid}`);
            const provs = Array.isArray(provRes.data) ? provRes.data : [];
            // Start with default items, then add provider/connector health
            const healthItems:any[] = [];
            // Add providers as health checks
            provs.forEach((p:any) => healthItems.push({ label: `Provider: ${p.name}`, status: (p.status || 'Unknown') }));

            // Add connectors statuses if available
            try {
              const connRes2 = await apiClient.get(`/connectors/${oid}`);
              const connList2 = Array.isArray(connRes2.data) ? connRes2.data : [];
              connList2.forEach((c:any) => healthItems.push({ label: `Connector: ${c.name}`, status: (c.status || 'Unknown') }));
            } catch (ee) {
              // Ignore connector sub-request (already attempted earlier)
            }

            // Merge with a few infra checks (keep defaults if not overridden)
            const merged = defaultSystemHealth.map(d => ({ ...d }));
            // append provider/connector health to merged list for visibility
            setSystemHealthState([...merged, ...healthItems]);
          } catch (e) {
            console.warn('Failed to load providers for health', e);
          }

          // fetch billing usage per org to derive workspace share (best effort)
          try {
            const usageRes = await apiClient.get(`/billing/${oid}/usage`);
            const usage = usageRes.data;
            // If usage returns per-workspace breakdown, use it; otherwise keep defaults
            if (usage?.workspaces && Array.isArray(usage.workspaces)) {
              setWorkspace(usage.workspaces.map((w:any) => ({ name: w.name, value: `${w.percent}%`, hue: w.hue || 'var(--accent-blue)' })));
            }
          } catch (e) {
            // silently ignore - not all backends provide per-workspace breakdown
          }
        }
      } catch (e) {
        console.warn('Failed to load orgs or dependent data', e);
      }
    };

    loadAll();
  }, [user]);

  const defaults = {
    totalContexts: metrics?.total_contexts || '128.4K',
    totalMemories: metrics?.total_memories || '96.7K',
    totalTokens: metrics?.total_tokens || '2.45B',
    totalQueries: metrics?.total_queries || '245.6K',
    avgRetrievalScore: '0.86',
    contextsTrend: metrics?.trends?.contexts || '+12.5%',
    memoriesTrend: metrics?.trends?.memories || '+8.3%',
    tokenTrend: metrics?.trends?.tokens || '+18.7%',
    queryTrend: metrics?.trends?.queries || '+15.2%',
    retrievalTrend: '+3.4%',
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Dashboard</h1>
          <p>Overview of your OpenContextPlatform</p>
        </div>
        <div className="filters">
          <button className="btn">All Workspaces ⌄</button>
          <button className="btn">May 12 - Jun 12, 2024 📅</button>
          <button className="btn btn-primary">+ New Context</button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card glass-panel hover-lift">
          <div className="kpi-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' }}>📦</div>
          <div className="kpi-data">
            <h3>Total Contexts</h3>
            <div className="value">{defaults.totalContexts} <span className="metric-pill positive">{defaults.contextsTrend}</span></div>
            <div className="kpi-subtitle">vs Apr 12 - May 12</div>
          </div>
        </div>
        <div className="kpi-card glass-panel hover-lift">
          <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-blue)' }}>🛢️</div>
          <div className="kpi-data">
            <h3>Total Memories</h3>
            <div className="value">{defaults.totalMemories} <span className="metric-pill positive">{defaults.memoriesTrend}</span></div>
            <div className="kpi-subtitle">vs Apr 12 - May 12</div>
          </div>
        </div>
        <div className="kpi-card glass-panel hover-lift">
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-green)' }}>◎</div>
          <div className="kpi-data">
            <h3>Total Tokens</h3>
            <div className="value">{defaults.totalTokens} <span className="metric-pill positive">+{defaults.tokenTrend}</span></div>
            <div className="kpi-subtitle">vs Apr 12 - May 12</div>
          </div>
        </div>
        <div className="kpi-card glass-panel hover-lift">
          <div className="kpi-icon" style={{ background: 'rgba(234, 179, 8, 0.12)', color: 'var(--accent-yellow)' }}>🔍</div>
          <div className="kpi-data">
            <h3>Total Queries</h3>
            <div className="value">{defaults.totalQueries} <span className="metric-pill positive">+{defaults.queryTrend}</span></div>
            <div className="kpi-subtitle">vs Apr 12 - May 12</div>
          </div>
        </div>
        <div className="kpi-card glass-panel hover-lift">
          <div className="kpi-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' }}>📈</div>
          <div className="kpi-data">
            <h3>Avg. Retrieval Score</h3>
            <div className="value">{defaults.avgRetrievalScore} <span className="metric-pill positive">+{defaults.retrievalTrend}</span></div>
            <div className="kpi-subtitle">vs Apr 12 - May 12</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-panel large-panel glass-panel hover-lift">
          <div className="panel-header">
            <div>
              <h2>Context Ingestion & Retrieval</h2>
              <p>Daily trend for ingestion and retrieval activity across all workspaces.</p>
            </div>
            <button className="btn btn-secondary">Daily ⌄</button>
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--accent-purple)' }}></span>Ingestion</span>
            <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--accent-blue)' }}></span>Retrieval</span>
          </div>
          <div className="line-chart-mock">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="18" x2="100" y2="18" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="36" x2="100" y2="36" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="54" x2="100" y2="54" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="72" x2="100" y2="72" stroke="var(--border-color)" strokeWidth="0.5" />
              <path d="M0,70 Q12,50 24,62 T40,54 T56,46 T68,48 T80,40 T94,32 T100,30" fill="none" stroke="var(--accent-purple)" strokeWidth="3" />
              <path d="M0,88 Q10,80 20,85 T36,75 T52,68 T64,63 T78,58 T90,52 T100,48" fill="none" stroke="var(--accent-blue)" strokeWidth="3" />
            </svg>
            <div className="chart-y-axis">
              <span>100K</span>
              <span>80K</span>
              <span>60K</span>
              <span>40K</span>
              <span>20K</span>
              <span>0</span>
            </div>
            <div className="chart-x-axis">
              <span>May 12</span>
              <span>May 19</span>
              <span>May 26</span>
              <span>Jun 02</span>
              <span>Jun 09</span>
              <span>Jun 12</span>
            </div>
          </div>
        </section>

        <section className="dashboard-panel glass-panel hover-lift">
          <div className="panel-header">
            <div>
              <h2>Top Connectors</h2>
              <p>Most active ingestion sources this month.</p>
            </div>
            <span className="view-all">View all</span>
          </div>
          {connectors.map((connector:any) => (
            <div className="bar-row" key={connector.name}>
              <div className="bar-label">{connector.emoji} {connector.name}</div>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${connector.percent || 40}%`, background: connector.fill || 'var(--accent-blue)' }}></div></div>
              <div className="bar-value">{connector.value}</div>
            </div>
          ))}
        </section>

        <section className="dashboard-panel glass-panel hover-lift">
          <div className="panel-header">
            <div>
              <h2>Context Distribution</h2>
              <p>Content classification by type.</p>
            </div>
          </div>
          <div className="donut-mock">
            <div className="donut-inner">
              <span>128.4K</span>
              <small>Total</small>
            </div>
          </div>
          <div className="distribution-list">
            <div className="distribution-item"><span className="distribution-dot" style={{ background: 'var(--accent-purple)' }}></span>Code<span>48.6%</span></div>
            <div className="distribution-item"><span className="distribution-dot" style={{ background: 'var(--accent-blue)' }}></span>Documentation<span>24.7%</span></div>
            <div className="distribution-item"><span className="distribution-dot" style={{ background: 'var(--accent-green)' }}></span>Conversation<span>12.6%</span></div>
            <div className="distribution-item"><span className="distribution-dot" style={{ background: 'var(--accent-yellow)' }}></span>Issue / Ticket<span>8.3%</span></div>
            <div className="distribution-item"><span className="distribution-dot" style={{ background: '#fb7185' }}></span>Other<span>5.8%</span></div>
          </div>
        </section>
      </div>

      <div className="dashboard-grid bottom-grid">
        <section className="dashboard-panel glass-panel hover-lift">
          <div className="panel-header">
            <div>
              <h2>Recent Contexts</h2>
              <p>Latest activity across your connected sources.</p>
            </div>
            <button className="btn btn-secondary">View all</button>
          </div>
          <div className="list-group">
            {recent.map(context => {
              let typeStyles = { background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-blue)' };
              if (context.type === 'Code') typeStyles = { background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' };
              else if (context.type === 'Conversation') typeStyles = { background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-green)' };
              else if (context.type === 'Issue') typeStyles = { background: 'rgba(234, 179, 8, 0.12)', color: 'var(--accent-yellow)' };
              return (
                <div className="list-item" key={context.title}>
                  <div>
                    <div className="list-item-title">{context.title}</div>
                    <div className="list-item-sub">{context.source} · {context.age} · {context.tokens} tokens</div>
                  </div>
                  <span className={`tag`} style={typeStyles}>{context.type}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="dashboard-panel glass-panel hover-lift">
          <div className="panel-header">
            <div>
              <h2>System Health</h2>
              <p>Infrastructure status for all services.</p>
            </div>
          </div>
          <div className="list-group">
            {systemHealthState.map(item => (
              <div className="list-item" key={item.label}>
                <div>
                  <div className="list-item-title">{item.label}</div>
                </div>
                <span className="status-pill success">{item.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-panel glass-panel hover-lift">
          <div className="panel-header">
            <div>
              <h2>Usage by Workspace</h2>
              <p>Resource share across teams.</p>
            </div>
          </div>
          <div className="workspace-group">
            {workspace.map(item => (
              <div className="workspace-row" key={item.name}>
                <div className="workspace-label">
                  <div className="workspace-chip" style={{ background: item.hue }}></div>
                  <span>{item.name}</span>
                </div>
                <div className="workspace-track">
                  <div className="workspace-fill" style={{ width: item.value, background: item.hue }}></div>
                </div>
                <span className="workspace-value">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
