import React, { useState } from 'react';
import { Settings, Play, Database, FileText, ChevronRight, BarChart2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../api/client';

export default function SemanticSearch() {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topK, setTopK] = useState(10);
  const [threshold, setThreshold] = useState(0.75);
  const [results, setResults] = useState<any[]>([]);
  const [stats, setStats] = useState({ vectorization: 0, search: 0 });

  const executeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await apiClient.post('/api/v1/search/semantic', {
        query,
        top_k: topK,
        threshold,
        model: "text-embedding-3-small"
      });
      setResults(response.data.results || []);
      setStats({
        vectorization: response.data.vectorization_time_ms || 0,
        search: response.data.search_time_ms || 0
      });
    } catch (error) {
      console.error("Semantic search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Database size={24} color="var(--accent-blue)" /> Semantic Playground</h1>
        <p>Pure vector-based similarity search against ArcadeDB embeddings. Tune parameters to analyze ranking behavior.</p>
      </div>

      <div style={{ display: 'flex', gap: '32px', flex: 1, overflow: 'hidden' }}>
        
        {/* Tuning Sidebar */}
        <div style={{ width: '300px', flexShrink: 0, overflowY: 'auto', paddingRight: '16px' }}>
          <div className="widget" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '15px' }}>
              <Settings size={18} /> Retrieval Parameters
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Embedding Model</span>
              </label>
              <select className="form-select">
                <option>text-embedding-3-small</option>
                <option>text-embedding-3-large</option>
                <option>all-MiniLM-L6-v2</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Top K Results</span>
                <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{topK}</span>
              </label>
              <input type="range" min="1" max="50" value={topK} onChange={(e) => setTopK(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-purple)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                <span>1</span><span>50</span>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Similarity Threshold</span>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{threshold.toFixed(2)}</span>
              </label>
              <input type="range" min="0" max="1" step="0.05" value={threshold} onChange={(e) => setThreshold(parseFloat(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent-blue)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                <span>0.0 (Loose)</span><span>1.0 (Exact)</span>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', marginTop: '24px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Search Strategy</div>
              <div className="radio-group">
                <label className="radio-item"><input type="radio" name="strategy" defaultChecked/><span>Cosine Similarity</span></label>
                <label className="radio-item"><input type="radio" name="strategy"/><span>Dot Product</span></label>
                <label className="radio-item"><input type="radio" name="strategy"/><span>L2/Euclidean</span></label>
              </div>
            </div>
          </div>
        </div>

        {/* Query & Results Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          
          <form onSubmit={executeSearch} className="widget" style={{ padding: '24px', marginBottom: '24px', background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(59, 130, 246, 0.05))', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a complex natural language query..." 
                  style={{ width: '100%', padding: '16px 20px', fontSize: '16px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }} 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '0 32px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }} disabled={isLoading}>
                {isLoading ? <Loader2 size={16} className="spin" /> : <Play size={16} />} Execute
              </button>
            </div>
          </form>

          {!hasSearched ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textAlign: 'center' }}>
              <BarChart2 size={48} color="rgba(255,255,255,0.1)" style={{ marginBottom: '16px' }} />
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Ready for Vector Search</h3>
              <p style={{ maxWidth: '400px' }}>Enter a query above to vectorize it and perform an approximate nearest neighbor search across your embedding space.</p>
            </div>
          ) : isLoading ? (
             <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Loader2 size={32} className="spin" style={{ color: 'var(--text-secondary)' }} />
             </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '16px', margin: 0 }}>Vector Results ({results.length})</h2>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Query vectorized in {stats.vectorization}ms • Search completed in {stats.search}ms</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {results.length === 0 ? (
                  <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                     No results found meeting the {threshold} threshold.
                  </div>
                ) : (
                  results.map((result: any, idx: number) => {
                    const score = result.cosine_similarity;
                    const scoreColor = score >= 0.9 ? 'var(--accent-green)' : (score >= 0.8 ? '#eab308' : 'var(--text-secondary)');
                    const bgScoreColor = score >= 0.9 ? 'rgba(16, 185, 129, 0.03)' : (score >= 0.8 ? 'rgba(234, 179, 8, 0.03)' : 'rgba(255,255,255,0.03)');
                    const borderScoreColor = score >= 0.9 ? 'rgba(16, 185, 129, 0.2)' : (score >= 0.8 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255,255,255,0.1)');
                    
                    return (
                      <div key={idx} className="widget" style={{ padding: '16px', display: 'flex', gap: '24px', alignItems: 'flex-start', background: bgScoreColor, borderColor: borderScoreColor }}>
                        <div style={{ width: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <div style={{ fontSize: '24px', fontWeight: 700, color: scoreColor }}>{score.toFixed(2)}</div>
                          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Cosine</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <Link to={`/contexts/details/${result.id}`} style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={14} color="var(--accent-blue)" /> {result.title}
                          </Link>
                          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
                            {result.snippet}
                          </p>
                        </div>
                        <button className="btn" style={{ padding: '8px' }}><ChevronRight size={16} /></button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
