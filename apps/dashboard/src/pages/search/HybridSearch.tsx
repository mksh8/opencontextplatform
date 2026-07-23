import React, { useState } from 'react';
import { GitMerge, Search, Layers, Database, Sparkles, Zap, Loader2 } from 'lucide-react';
import { apiClient } from '../../api/client';

export default function HybridSearch() {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    hybrid_results: any[],
    semantic_results: any[],
    graph_results: any[],
    execution_time_ms: number
  }>({
    hybrid_results: [],
    semantic_results: [],
    graph_results: [],
    execution_time_ms: 0
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await apiClient.post('/api/v1/search/hybrid', {
        query,
        semantic_weight: 0.6,
        graph_weight: 0.4
      });
      setResults(response.data);
    } catch (error) {
      console.error("Hybrid search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><GitMerge size={24} color="var(--accent-purple)" /> Hybrid Search (Auto)</h1>
        <p>The core engine of OpenContextPlatform. Combines semantic vector similarity with structural graph traversal to build a perfect RAG context window.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '24px', overflow: 'hidden' }}>
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="widget" style={{ padding: '0', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ padding: '0 24px' }}>
              <Search size={20} color="var(--text-secondary)" />
            </div>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are the main goals of the Apollo architecture?"
              style={{ flex: 1, padding: '24px 24px 24px 0', background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', outline: 'none' }}
            />
            <div style={{ padding: '0 24px' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 32px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }} disabled={isLoading}>
                {isLoading ? <Loader2 size={16} className="spin" /> : null} Run Hybrid Search
              </button>
            </div>
          </div>
        </form>

        {!hasSearched ? (
          <div className="widget" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <GitMerge size={48} color="rgba(255,255,255,0.1)" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Waiting for Query</h3>
            <p style={{ maxWidth: '450px', textAlign: 'center' }}>The Hybrid Engine will concurrently execute a Vector Search and a Graph Traversal, merging the results for maximum relevance.</p>
          </div>
        ) : isLoading ? (
           <div className="widget" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <Loader2 size={32} className="spin" style={{ color: 'var(--text-secondary)' }} />
           </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '24px', overflow: 'hidden' }}>
            
            {/* Split View */}
            <div style={{ display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' }}>
              
              {/* Left Pane: Vector Results */}
              <div className="widget" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={16} color="var(--accent-blue)" /> <strong style={{ color: 'var(--text-primary)' }}>Semantic Layer</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>(Vector DB)</span>
                </div>
                <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {results.semantic_results.map((result: any, idx: number) => (
                      <div key={idx} style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{result.id}</span>
                          <span style={{ fontSize: '12px', color: 'var(--accent-green)', fontWeight: 600 }}>{result.score.toFixed(2)} score</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>{result.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Pane: Graph Context */}
              <div className="widget" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={16} color="var(--accent-green)" /> <strong style={{ color: 'var(--text-primary)' }}>Graph Layer</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>(ArcadeDB)</span>
                </div>
                <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                     {results.graph_results.map((result: any, idx: number) => (
                      <div key={idx} style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}>
                        <div style={{ fontSize: '12px', color: 'var(--accent-green)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Traversal: {result.id} {result.relationship}</div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{result.target_node}</span>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '8px 0 0 0' }}>{result.reasoning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel: Synthesized Context */}
            <div className="widget" style={{ padding: 0, overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(to right, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--accent-purple)" /> <strong style={{ color: 'var(--accent-purple)' }}>Synthesized Context Window (RRF)</strong>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <Zap size={14} color="#eab308" /> Ranked & Optimized for LLM Prompt ({results.execution_time_ms}ms)
                </div>
              </div>
              <div style={{ padding: '24px', maxHeight: '200px', overflowY: 'auto' }}>
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
{`[SYSTEM]
You are answering a user query using the provided context.

[CONTEXT]
${results.hybrid_results.map(r => `Document: ${r.title}\nContent: ${r.snippet}\n`).join('\n')}

[QUERY]
${query}`}
                </pre>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
