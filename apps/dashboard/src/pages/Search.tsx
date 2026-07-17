import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function Search() {
  const [activeTab, setActiveTab] = useState('All Results');
  const { addToast } = useToast();
  const tabs = ['All Results', 'Contexts', 'Memories', 'Collections'];
  return (
    <>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div className="page-title">
          <h1>Search</h1>
          <p>Search across all your contexts, memories, and collections.</p>
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <input type="text" className="search-bar" placeholder="🔍 Search anything..." style={{ width: '100%', padding: '12px 16px', fontSize: 16 }} />
        
        <div style={{ display: 'flex', gap: 24, marginTop: 16, borderBottom: '1px solid var(--border-color)' }}>
          {tabs.map(tab => (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                paddingBottom: 12, 
                borderBottom: activeTab === tab ? '2px solid var(--accent-purple)' : '2px solid transparent', 
                color: activeTab === tab ? '#fff' : 'var(--text-secondary)', 
                fontSize: 14, 
                fontWeight: 500, 
                cursor: 'pointer' 
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {activeTab === 'All Results' ? (
      <div style={{ display: 'flex', gap: 32 }}>
        {/* Results */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="widget" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500, marginBottom: 8 }}>An authentication bug in API gateway</h3>
              <span className="tag" style={{ color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.1)', height: 'fit-content' }}>Code</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>...the gateway is failing to pass the auth header during token validation. Fixed by...</p>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>GitHub • 2m ago • 4.2K tokens</div>
          </div>

          <div className="widget" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500, marginBottom: 8 }}>Authentication flow architecture decision</h3>
              <span className="tag" style={{ color: 'var(--accent-blue)', background: 'rgba(59, 130, 246, 0.1)', height: 'fit-content' }}>Documentation</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>...We decided to use JWT tokens with refresh token rotation for better security...</p>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Notion • 1h ago • 1.2K tokens</div>
          </div>
          
          <div className="widget" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: 15, color: '#fff', fontWeight: 500, marginBottom: 8 }}>API rate limit configuration</h3>
              <span className="tag" style={{ color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.1)', height: 'fit-content' }}>Code</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>...Implemented rate limiting using Redis sliding window algorithm...</p>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>GitHub • 5h ago • 1.8K tokens</div>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <div className="widget" style={{ padding: '20px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Search Filters</div>
            
            <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12 }}>Content Type</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}><input type="checkbox" defaultChecked /> Code</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}><input type="checkbox" defaultChecked /> Documentation</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}><input type="checkbox" /> Conversation</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}><input type="checkbox" /> Issue</label>
            </div>

            <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12 }}>Source</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}><input type="checkbox" defaultChecked /> GitHub</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}><input type="checkbox" /> Slack</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}><input type="checkbox" defaultChecked /> Notion</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-primary)' }}><input type="checkbox" /> Jira</label>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="widget" style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>The {activeTab} section is currently under development.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => addToast(`Subscribed to ${activeTab} updates!`, 'success')}>Notify me when available</button>
        </div>
      )}
    </>
  );
}
