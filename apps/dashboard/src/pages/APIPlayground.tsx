import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function APIPlayground() {
  const [requestUrl, setRequestUrl] = useState('http://localhost:8000/api/v1/search/');
  const [requestBody, setRequestBody] = useState('{\n  "query": "authentication bug",\n  "filters": {\n    "type": ["code", "issue"],\n    "source": ["github", "slack"]\n  },\n  "limit": 10\n}');
  const [responseBody, setResponseBody] = useState('// Click send to fetch data from backend');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('Body');
  const { addToast } = useToast();

  const handleSend = async () => {
    setLoading(true);
    setStatus(null);
    const startTime = performance.now();
    
    try {
      const res = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
      
      const data = await res.json();
      const endTime = performance.now();
      
      setStatus(`${res.status} ${res.statusText}`);
      setResponseBody(JSON.stringify(data, null, 2));
      setTime(Math.round(endTime - startTime));
    } catch (err) {
      setStatus('Error');
      setResponseBody(String(err));
      setTime(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div className="page-title">
          <h1>API Playground</h1>
          <p>Test the OpenContextPlatform API.</p>
        </div>
      </div>

      <div className="widget" style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
        <select className="search-bar" style={{ width: 100 }}>
          <option>POST</option>
          <option>GET</option>
        </select>
        <input 
          type="text" 
          className="search-bar" 
          style={{ flex: 1, fontFamily: 'monospace' }} 
          value={requestUrl}
          onChange={e => setRequestUrl(e.target.value)}
        />
        <button 
          className="btn btn-primary" 
          style={{ padding: '8px 24px' }}
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24, height: 'calc(100vh - 280px)' }}>
        
        {/* Request Editor */}
        <div className="widget" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 24, padding: '12px 20px', borderBottom: '1px solid var(--border-color)', fontSize: 13 }}>
            {['Params', 'Headers', 'Body'].map(tab => (
              <span 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{ 
                  color: activeTab === tab ? '#fff' : 'var(--text-secondary)', 
                  borderBottom: activeTab === tab ? '2px solid var(--accent-purple)' : '2px solid transparent', 
                  paddingBottom: 11, 
                  cursor: 'pointer' 
                }}
              >
                {tab}
              </span>
            ))}
          </div>
          
          <div style={{ padding: '12px 20px', fontSize: 13, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
            JSON
          </div>

          <div style={{ flex: 1, padding: 0, fontFamily: 'monospace', fontSize: 13, background: '#0d1117', color: '#e6edf3', overflowY: 'auto' }}>
            {activeTab === 'Body' ? (
              <textarea 
                style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', color: 'inherit', padding: 20, resize: 'none', fontFamily: 'inherit' }}
                value={requestBody}
                onChange={e => setRequestBody(e.target.value)}
                spellCheck={false}
              />
            ) : (
              <div style={{ padding: 20, color: 'var(--text-secondary)' }}>{activeTab} configuration coming soon.</div>
            )}
          </div>
        </div>

        {/* Response Editor */}
        <div className="widget" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid var(--border-color)', fontSize: 13 }}>
            <span style={{ color: '#fff', borderBottom: '2px solid var(--accent-purple)', paddingBottom: 11 }}>Response</span>
            <div style={{ display: 'flex', gap: 16, color: 'var(--text-secondary)' }}>
              <span>Status: <span style={{ color: status === 'Error' ? '#ff7b72' : 'var(--accent-green)' }}>{status || '--'}</span></span>
              <span>Time: <span style={{ color: 'var(--accent-green)' }}>{time ? `${time}ms` : '--'}</span></span>
            </div>
          </div>

          <div style={{ flex: 1, padding: 20, fontFamily: 'monospace', fontSize: 13, background: '#0d1117', color: '#e6edf3', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
{responseBody}
          </div>
        </div>

      </div>
    </>
  );
}
