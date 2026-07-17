import React, { useState, useEffect } from 'react';
import apiClient from '../../../api/client';

interface EmbeddingsTabProps {
  contextId: string;
}

export function EmbeddingsTab({ contextId }: EmbeddingsTabProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchEmbeddings();
  }, [contextId]);

  const fetchEmbeddings = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/contexts/${contextId}/embeddings`);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load embeddings data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      const response = await apiClient.post(`/contexts/${contextId}/search`, {
        query: searchQuery
      });
      setSearchResult(response.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading Vector Data...</div>;
  }

  if (error) {
    return <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: '#ef4444' }}>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Vector Explorer */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Vector Representation</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>Explore the latent space representation of this context node.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Model</div>
            <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 500 }}>{data.model}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Dimensions</div>
            <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 500 }}>{data.dimensions}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Status</div>
            <div style={{ color: 'var(--accent-green)', fontSize: '14px', fontWeight: 500, textTransform: 'capitalize' }}>{data.status}</div>
          </div>
        </div>

        <div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '8px', fontWeight: 500 }}>RAW VECTOR DATA (TRUNCATED)</div>
          <div style={{ 
            background: '#0B0F19', 
            padding: '16px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255,255,255,0.05)',
            fontFamily: 'monospace',
            color: 'var(--accent-blue)',
            fontSize: '13px',
            lineHeight: '1.6',
            wordBreak: 'break-all'
          }}>
            [{data.vector_preview?.join(', ')}, ...]
          </div>
        </div>
      </div>

      {/* Semantic Search Tester */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Semantic Search Tester</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '24px' }}>Test how well different queries match this context in the vector space.</p>
        
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="e.g. 'What is the context of AI?'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }}
          />
          <button type="submit" className="btn" style={{ padding: '0 24px', fontWeight: 600 }} disabled={searching}>
            {searching ? 'Calculating...' : 'Test Match'}
          </button>
        </form>

        {searchResult && (
          <div style={{ 
            padding: '20px', 
            borderRadius: '8px', 
            background: searchResult.match_found ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${searchResult.match_found ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: searchResult.match_found ? 'var(--accent-green)' : '#ef4444', marginBottom: '4px' }}>
                  {searchResult.message}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Cosine Similarity Score</div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: searchResult.match_found ? 'var(--accent-green)' : '#ef4444' }}>
                {(searchResult.similarity_score * 100).toFixed(1)}%
              </div>
            </div>
            
            <div style={{ marginTop: '16px', height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${Math.min(Math.max(searchResult.similarity_score * 100, 0), 100)}%`,
                background: searchResult.match_found ? 'var(--accent-green)' : '#ef4444',
                transition: 'width 0.5s ease-out'
              }}></div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
