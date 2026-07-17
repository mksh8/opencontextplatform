import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

interface GraphNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  color: string;
}

interface GraphEdge {
  source_id: string;
  target_id: string;
  label: string;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export default function GraphExplorer() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orgId = "org_alpha_123";
    apiClient.get(`/graph/${orgId}/explorer`)
      .then(response => {
        setGraphData(response.data);
      })
      .catch(error => console.error("Error fetching graph data:", error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div className="page-title">
          <h1>Graph Explorer</h1>
          <p>Explore semantic relationships between entities.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, height: 'calc(100vh - 180px)' }}>
        
        {/* Left Sidebar: Entity Types */}
        <div className="widget" style={{ width: 220, flexShrink: 0, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Entity Types</div>
          <select className="search-bar" style={{ width: '100%', marginBottom: 24 }}>
            <option>All Types</option>
            <option>Code</option>
            <option>Documentation</option>
          </select>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" defaultChecked /> File</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>12.4K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" defaultChecked /> Function</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>45.2K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" defaultChecked /> Class</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>8.1K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" /> Module</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>1.2K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" /> Issue</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>3.4K</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-primary)', padding: '6px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" /> PR</div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>2.1K</span>
            </label>
          </div>
        </div>

        {/* Center Graph Area */}
        <div className="widget" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'auto', display: 'flex' }}>
          <svg width="2000" height="1000" viewBox="-500 -200 2000 1000" style={{ minWidth: 2000, minHeight: 1000 }}>
            {loading ? (
              <text x="300" y="200" fill="var(--text-secondary)" fontSize="14" textAnchor="middle">Loading graph...</text>
            ) : !graphData || graphData.nodes.length === 0 ? (
              <text x="300" y="200" fill="var(--text-secondary)" fontSize="14" textAnchor="middle">No graph data. Try indexing a file!</text>
            ) : (
              <>
                {/* Edges */}
                {graphData.edges.map((edge, idx) => {
                  const source = graphData.nodes.find(n => n.id === edge.source_id);
                  const target = graphData.nodes.find(n => n.id === edge.target_id);
                  if (!source || !target) return null;
                  
                  return (
                    <g key={`edge-${idx}`}>
                      <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="var(--border-color)" strokeWidth="2" />
                      <text x={(source.x + target.x) / 2} y={((source.y + target.y) / 2) - 5} fill="var(--text-secondary)" fontSize="9" textAnchor="middle">{edge.label}</text>
                    </g>
                  );
                })}

                {/* Nodes */}
                {graphData.nodes.map((node) => {
                  const isFile = node.type === 'File';
                  
                  if (isFile) {
                    return (
                      <g key={node.id}>
                        <circle cx={node.x} cy={node.y} r="40" fill={node.color} />
                        <text x={node.x} y={node.y + 50} fill="#fff" fontSize="12" textAnchor="middle" fontWeight="600">{node.label}</text>
                      </g>
                    );
                  } else {
                    return (
                      <g key={node.id}>
                        <rect x={node.x - 60} y={node.y - 20} width="120" height="40" rx="20" fill="var(--bg-panel)" stroke={node.color} strokeWidth="2" />
                        <text x={node.x} y={node.y + 4} fill="var(--text-primary)" fontSize="10" textAnchor="middle">{node.label}</text>
                      </g>
                    );
                  }
                })}
              </>
            )}
          </svg>
        </div>

        {/* Right Sidebar: Entity Details */}
        <div className="widget" style={{ width: 260, flexShrink: 0, padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Entity Details</div>
          
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📄</div>
            <div>
              <div style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>AuthService.py</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>File</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Repository</span>
              <span style={{ color: '#fff' }}>OpenContextPlatform</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Path</span>
              <span style={{ color: '#fff' }}>/src/services/</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Language</span>
              <span style={{ color: '#fff' }}>Python</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Last Modified</span>
              <span style={{ color: '#fff' }}>2 days ago</span>
            </div>
          </div>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>Related Entities (12)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="tag" style={{ border: '1px solid var(--border-color)' }}>UserService.py</span>
              <span className="tag" style={{ border: '1px solid var(--border-color)' }}>JWT.py</span>
              <span className="tag" style={{ border: '1px solid var(--border-color)' }}>PR #452</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
