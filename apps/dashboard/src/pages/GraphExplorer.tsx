import React, { useState, useEffect, useRef, useCallback } from 'react';
import apiClient from '../api/client';
import ForceGraph2D from 'react-force-graph-2d';

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
  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orgId = "org_alpha_123";
    apiClient.get(`/graph/${orgId}/explorer`)
      .then(response => {
        const d = response.data;
        // Map source_id/target_id to source/target for ForceGraph
        const links = d.edges.map((e: any) => ({
          source: e.source_id,
          target: e.target_id,
          label: e.label
        }));
        setGraphData({ nodes: d.nodes, links });
      })
      .catch(error => console.error("Error fetching graph data:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.label;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 

    ctx.fillStyle = node.color || 'var(--accent-purple)';
    ctx.beginPath();
    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillText(label, node.x, node.y + 10);
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
        <div className="widget" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden', display: 'flex' }} ref={containerRef}>
          {loading ? (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-secondary)' }}>Loading graph...</div>
          ) : !graphData || graphData.nodes.length === 0 ? (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-secondary)' }}>No graph data. Try indexing a file!</div>
          ) : (
            <ForceGraph2D
              width={dimensions.width}
              height={dimensions.height}
              graphData={graphData}
              nodeCanvasObject={paintNode}
              linkColor={() => 'rgba(255,255,255,0.2)'}
              backgroundColor="#0d1117"
              linkDirectionalArrowLength={3.5}
              linkDirectionalArrowRelPos={1}
              nodeRelSize={6}
            />
          )}
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
