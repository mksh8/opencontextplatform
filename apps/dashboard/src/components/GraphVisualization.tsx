import React, { useState, useRef, useEffect } from 'react';

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

interface GraphVisualizationProps {
  data: GraphData;
  width?: number | string;
  height?: number | string;
}

export function GraphVisualization({ data, width = '100%', height = 600 }: GraphVisualizationProps) {
  const [hoverNode, setHoverNode] = useState<string | null>(null);
  
  if (!data || !data.nodes || data.nodes.length === 0) {
    return (
      <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
        No graph data available.
      </div>
    );
  }

  return (
    <div style={{ width, height, background: '#0B0F19', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.05)' }}>
      <svg width="100%" height="100%" viewBox="0 0 800 600">
        
        {/* Draw Edges */}
        {data.edges.map((edge, i) => {
          const source = data.nodes.find(n => n.id === edge.source_id);
          const target = data.nodes.find(n => n.id === edge.target_id);
          if (!source || !target) return null;
          
          return (
            <g key={`edge-${i}`}>
              <line 
                x1={source.x} y1={source.y} 
                x2={target.x} y2={target.y} 
                stroke="rgba(255,255,255,0.15)" 
                strokeWidth={2}
              />
              {/* Optional edge label */}
              {edge.label && (
                <text 
                  x={(source.x + target.x) / 2} 
                  y={(source.y + target.y) / 2 - 5}
                  fill="rgba(255,255,255,0.4)"
                  fontSize={10}
                  textAnchor="middle"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Draw Nodes */}
        {data.nodes.map(node => (
          <g 
            key={node.id} 
            transform={`translate(${node.x}, ${node.y})`}
            onMouseEnter={() => setHoverNode(node.id)}
            onMouseLeave={() => setHoverNode(null)}
            style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <circle 
              r={hoverNode === node.id ? 24 : 20} 
              fill={node.color || '#3b82f6'} 
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={2}
            />
            {node.type && (
              <text y={-30} fill="rgba(255,255,255,0.5)" fontSize={10} textAnchor="middle" fontWeight={500}>
                {node.type}
              </text>
            )}
            <text 
              y={hoverNode === node.id ? 38 : 35} 
              fill={hoverNode === node.id ? '#ffffff' : 'rgba(255,255,255,0.8)'} 
              fontSize={12} 
              textAnchor="middle" 
              fontWeight={hoverNode === node.id ? 600 : 400}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
