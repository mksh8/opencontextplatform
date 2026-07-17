import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function Models() {
  const [activeTab, setActiveTab] = useState('LLM Models');
  const { addToast } = useToast();
  const tabs = ['LLM Models', 'Embedding Models', 'Vector Models'];
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Models</h1>
          <p>Manage models for your providers.</p>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 32, marginBottom: 24 }}>
        {tabs.map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              paddingBottom: 12, 
              borderBottom: activeTab === tab ? '2px solid var(--accent-purple)' : '2px solid transparent', 
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)', 
              fontSize: 13, 
              fontWeight: 500, 
              cursor: 'pointer' 
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {activeTab === 'LLM Models' ? (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Model</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Provider</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Type</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Last Used</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>gpt-4o</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>OpenAI</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>LLM</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2m ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>claude-3.5-sonnet</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Anthropic</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>LLM</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>5m ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>gemini-1.5-pro</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Google</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>LLM</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>15m ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>llama-3-70b</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Ollama</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>LLM</td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator" style={{ color: 'var(--text-secondary)' }}><div className="dot" style={{ background: 'var(--text-secondary)' }}></div> Inactive</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2d ago</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
          </tbody>
        </table>
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
