import React from 'react';

export default function Providers() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Providers</h1>
          <p>Configure your AI and data providers.</p>
        </div>
        <button className="btn btn-primary">+ Add Provider</button>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: 32, marginBottom: 24 }}>
        <div style={{ paddingBottom: 12, borderBottom: '2px solid var(--accent-purple)', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>LLM Providers</div>
        <div style={{ paddingBottom: 12, color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}>Embedding Providers</div>
        <div style={{ paddingBottom: 12, color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}>Vector Providers</div>
        <div style={{ paddingBottom: 12, color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}>Graph Providers</div>
        <div style={{ paddingBottom: 12, color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer' }}>Storage Providers</div>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Provider</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Model</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Usage / Experience</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, color: '#fff' }}>OpenAI</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>api.openai.com</div>
              </td>
              <td style={{ padding: '16px 24px' }}><span className="tag" style={{ border: '1px solid var(--border-color)' }}>gpt-4-turbo</span></td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>2.4M tokens</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, color: '#fff' }}>Anthropic</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>api.anthropic.com</div>
              </td>
              <td style={{ padding: '16px 24px' }}><span className="tag" style={{ border: '1px solid var(--border-color)' }}>claude-3-opus</span></td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>1.8M tokens</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, color: '#fff' }}>Google</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>generativelanguage.googleapis.com</div>
              </td>
              <td style={{ padding: '16px 24px' }}><span className="tag" style={{ border: '1px solid var(--border-color)' }}>gemini-1.5-pro</span></td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator"><div className="dot"></div> Active</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>800K tokens</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, color: '#fff' }}>Local (Ollama)</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>localhost:11434</div>
              </td>
              <td style={{ padding: '16px 24px' }}><span className="tag" style={{ border: '1px solid var(--border-color)' }}>llama-3-70b</span></td>
              <td style={{ padding: '16px 24px' }}><div className="status-indicator" style={{ color: 'var(--text-secondary)' }}><div className="dot" style={{ background: 'var(--text-secondary)' }}></div> Offline</div></td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>0 tokens</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
