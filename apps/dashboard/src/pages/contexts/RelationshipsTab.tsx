import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { GraphVisualization } from '../../components/GraphVisualization';

interface RelationshipsTabProps {
  contextId: string;
}

export function RelationshipsTab({ contextId }: RelationshipsTabProps) {
  const [graphData, setGraphData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGraph = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/graph/context/${contextId}`);
      setGraphData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load graph data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contextId) {
      fetchGraph();
    }
  }, [contextId]);

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Context Provenance Graph</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Explore the extracted facts and episodes linked to this context node.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn" 
            style={{ padding: '6px 12px', fontSize: '12px' }}
            onClick={fetchGraph}
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '🔄 Refresh Graph'}
          </button>
        </div>
      </div>

      <div style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
        {loading && !graphData ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <div className="spinner" style={{ marginRight: '8px' }}></div> Loading knowledge graph...
          </div>
        ) : error ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            ⚠️ {error}
          </div>
        ) : graphData?.nodes?.length > 0 ? (
          <GraphVisualization data={graphData} height={600} />
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>🕸️</div>
            <p>No graph relationships found for this context.</p>
            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.7 }}>Facts and episodes have not yet been extracted.</p>
          </div>
        )}
      </div>
    </div>
  );
}
