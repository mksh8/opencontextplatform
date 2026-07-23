import React, { useState } from 'react';
import { Search, Filter, Calendar, FileText, Globe, MessageSquare, Tag as TagIcon, ChevronDown, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../api/client';

export default function UniversalSearch() {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, time: 0 });

  const executeSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await apiClient.post('/api/v1/search/universal', {
        query: searchQuery,
        filters: {},
        limit: 10
      });
      setResults(response.data.results || []);
      setStats({
        total: response.data.total || 0,
        time: response.data.execution_time_ms || 0
      });
    } catch (error) {
      console.error("Search failed:", error);
      // Fallback or show error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  if (!hasSearched) {
    return (
      <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '48px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px', fontWeight: 700, letterSpacing: '-0.5px' }}>OpenContext</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', fontWeight: 500 }}>Universal Enterprise Search</p>
        </div>

        <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '800px', position: 'relative' }}>
          <Search size={24} style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything or search across your enterprise knowledge..." 
            style={{ 
              width: '100%', 
              padding: '24px 32px 24px 64px', 
              fontSize: '18px', 
              background: 'rgba(0,0,0,0.3)', 
              border: '1px solid rgba(139, 92, 246, 0.3)', 
              borderRadius: '40px', 
              color: '#fff',
              outline: 'none',
              boxShadow: '0 4px 24px rgba(139, 92, 246, 0.1)',
              transition: 'all 0.3s ease'
            }} 
            autoFocus
          />
          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '30px', padding: '10px 24px', fontSize: '15px' }} disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className="spin" /> : 'Search'}
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <Link to="/search/semantic" className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', textDecoration: 'none' }}>Semantic</Link>
          <Link to="/search/graph" className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', textDecoration: 'none' }}>Graph</Link>
          <Link to="/search/hybrid" className="btn" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', border: '1px solid rgba(139, 92, 246, 0.3)', textDecoration: 'none' }}>Hybrid (Auto)</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Search Header */}
      <div style={{ paddingBottom: '24px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '800px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 16px 12px 48px', 
                fontSize: '15px', 
                background: 'rgba(0,0,0,0.2)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '8px', 
                color: '#fff',
                outline: 'none'
              }} 
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <Loader2 size={16} className="spin" /> : 'Search'}
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '32px', flex: 1, overflow: 'hidden' }}>
        {/* Filters Sidebar */}
        <div style={{ width: '250px', flexShrink: 0, overflowY: 'auto', paddingRight: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 600 }}>
            <Filter size={16} /> Filters
          </div>

          <div className="filter-group" style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px', letterSpacing: '0.5px' }}>Document Type</h4>
            <div className="checkbox-row"><input type="checkbox" id="type-doc" defaultChecked /><label htmlFor="type-doc">Documents</label></div>
            <div className="checkbox-row"><input type="checkbox" id="type-code" defaultChecked /><label htmlFor="type-code">Code</label></div>
            <div className="checkbox-row"><input type="checkbox" id="type-conv" defaultChecked /><label htmlFor="type-conv">Conversations</label></div>
          </div>

          <div className="filter-group" style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px', letterSpacing: '0.5px' }}>Source</h4>
            <div className="checkbox-row"><input type="checkbox" id="src-github" /><label htmlFor="src-github" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={14}/> Web/API</label></div>
            <div className="checkbox-row"><input type="checkbox" id="src-slack" /><label htmlFor="src-slack" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={14}/> Slack</label></div>
            <div className="checkbox-row"><input type="checkbox" id="src-drive" /><label htmlFor="src-drive" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={14}/> Google Drive</label></div>
          </div>
        </div>

        {/* Results Area */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '16px' }}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'var(--text-secondary)' }}>
              <Loader2 size={32} className="spin" />
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Found {stats.total} results for "{query}" ({(stats.time / 1000).toFixed(2)}s)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Sort by: <span style={{ color: 'var(--accent-purple)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Relevance <ChevronDown size={14} /></span>
                </div>
              </div>

              <div className="search-results-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {results.length === 0 ? (
                  <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>No results found.</div>
                ) : (
                  results.map((result: any, idx: number) => (
                    <div key={idx} className="widget" style={{ padding: '20px', transition: 'transform 0.2s ease, border-color 0.2s ease' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <Link to={`/contexts/details/${result.id}`} style={{ color: 'var(--accent-blue)', fontSize: '18px', fontWeight: 600, textDecoration: 'none' }}>
                          {result.title}
                        </Link>
                        <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                          {Math.round(result.score * 100)}% Match
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> {result.source || 'Unknown'}</span>
                        {result.timestamp && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {result.timestamp}</span>}
                        {result.tags && result.tags.length > 0 && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TagIcon size={12} /> {result.tags.join(', ')}</span>
                        )}
                      </div>
                      <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                        {result.snippet}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
