import React, { useState } from 'react';
import { Network, Play, Table as TableIcon, GitMerge, FileText, Loader2 } from 'lucide-react';
import { apiClient } from '../../api/client';

export default function GraphSearch() {
  const [query, setQuery] = useState("MATCH (c:Context)-[:BELONGS_TO]->(col:Collection) \nWHERE col.name = 'Engineering Specs' \nRETURN c \nLIMIT 25");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'graph' | 'data'>('graph');
  const [results, setResults] = useState<{ nodes: any[], edges: any[] }>({ nodes: [], edges: [] });
  const [executionTime, setExecutionTime] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await apiClient.post('/api/v1/search/graph', {
        cypher_query: query
      });
      setResults({
        nodes: response.data.nodes || [],
        edges: response.data.edges || []
      });
      setExecutionTime(response.data.execution_time_ms || 0);
    } catch (error) {
      console.error("Graph search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Network size={24} color="var(--accent-purple)" /> Graph Search</h1>
        <p>Cypher-style queries against the ArcadeDB knowledge graph. Explore node relationships and structural metadata.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '24px', overflow: 'hidden' }}>
        
        {/* Editor Area */}
        <div className="widget" style={{ padding: '0', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 24px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>Cypher Query Editor</div>
            <button className="btn btn-primary" onClick={handleSearch} style={{ padding: '6px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }} disabled={isLoading}>
              {isLoading ? <Loader2 size={14} className="spin" /> : <Play size={14} />} Execute Query
            </button>
          </div>
          <textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            spellCheck="false"
            style={{ 
              width: '100%', 
              height: '140px', 
              padding: '24px', 
              background: '#0d1117', 
              border: 'none', 
              color: '#c9d1d9', 
              fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace', 
              fontSize: '14px',
              lineHeight: '1.6',
              resize: 'none',
              outline: 'none'
            }}
          />
        </div>

        {/* Results Area */}
        <div className="widget" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
          {!hasSearched ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              <Network size={48} color="rgba(255,255,255,0.1)" style={{ marginBottom: '16px' }} />
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No Active Query</h3>
              <p>Write a query above and hit Execute to explore the graph.</p>
            </div>
          ) : isLoading ? (
             <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Loader2 size={32} className="spin" style={{ color: 'var(--text-secondary)' }} />
             </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Results Header */}
              <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Returned {results.nodes.length} nodes, {results.edges.length} edges in {executionTime}ms</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setActiveTab('graph')} className={`btn ${activeTab === 'graph' ? 'btn-primary' : ''}`} style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', gap: '6px', alignItems: 'center', background: activeTab === 'graph' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)', borderColor: activeTab === 'graph' ? 'var(--accent-purple)' : 'transparent' }}>
                    <Network size={14} /> Graph
                  </button>
                  <button onClick={() => setActiveTab('data')} className={`btn ${activeTab === 'data' ? 'btn-primary' : ''}`} style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', gap: '6px', alignItems: 'center', background: activeTab === 'data' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)', borderColor: activeTab === 'data' ? 'var(--accent-purple)' : 'transparent' }}>
                    <TableIcon size={14} /> Data
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div style={{ flex: 1, position: 'relative', overflow: 'auto' }}>
                
                {activeTab === 'graph' && (
                  <div style={{ position: 'absolute', inset: 0, background: '#0d1117', overflow: 'hidden' }}>
                    {/* Mock Graph Visualizer */}
                    <svg width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.2))' }}>
                      {/* Edges */}
                      <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
                      <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
                      <line x1="50%" y1="50%" x2="40%" y2="70%" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
                      <line x1="50%" y1="50%" x2="60%" y2="70%" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" />
                      
                      <line x1="30%" y1="30%" x2="20%" y2="40%" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                      <line x1="30%" y1="30%" x2="20%" y2="20%" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />

                      {/* Center Node (Collection) */}
                      <circle cx="50%" cy="50%" r="30" fill="var(--accent-purple)" />
                      <text x="50%" y="50%" fill="#fff" fontSize="12" textAnchor="middle" dy=".3em">Collection</text>
                      
                      {/* Related Nodes (Contexts) */}
                      <circle cx="30%" cy="30%" r="20" fill="var(--accent-blue)" />
                      <circle cx="70%" cy="30%" r="20" fill="var(--accent-blue)" />
                      <circle cx="40%" cy="70%" r="20" fill="var(--accent-blue)" />
                      <circle cx="60%" cy="70%" r="20" fill="var(--accent-blue)" />

                      <circle cx="20%" cy="40%" r="15" fill="var(--accent-green)" />
                      <circle cx="20%" cy="20%" r="15" fill="var(--accent-green)" />
                    </svg>

                    <div style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'rgba(0,0,0,0.8)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <h4 style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Legend</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--accent-purple)' }}></div> Collection</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--accent-blue)' }}></div> Context</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--accent-green)' }}></div> Chunk</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'data' && (
                  <div style={{ padding: '24px' }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                          <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>ID</th>
                          <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>Type</th>
                          <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '13px' }}>Properties</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.nodes.length === 0 ? (
                          <tr><td colSpan={3} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>No nodes found.</td></tr>
                        ) : (
                          results.nodes.map((node: any, idx: number) => (
                            <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--accent-blue)' }}>{node.id}</td>
                              <td style={{ padding: '12px' }}><div className="badge" style={{ background: node.label === 'Collection' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)', color: node.label === 'Collection' ? 'var(--accent-purple)' : 'var(--accent-blue)' }}>{node.label}</div></td>
                              <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>{JSON.stringify(node.properties)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
