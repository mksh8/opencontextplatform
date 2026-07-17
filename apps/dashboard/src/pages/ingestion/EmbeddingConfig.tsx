import React from 'react';

export default function EmbeddingConfig() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Embedding Configuration</h1>
        <p>Set up the vectorization pipeline for OpenContext nodes.</p>
      </div>

      <div className="widget" style={{ maxWidth: '600px', padding: '32px' }}>
        <form>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Provider</label>
            <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }}>
              <option value="openai">OpenAI</option>
              <option value="cohere">Cohere</option>
              <option value="huggingface">HuggingFace Inference Endpoint</option>
              <option value="local">Local (Ollama)</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Model Name</label>
            <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }}>
              <option value="text-embedding-3-small">text-embedding-3-small (1536 dims, fast)</option>
              <option value="text-embedding-3-large">text-embedding-3-large (3072 dims, highly accurate)</option>
              <option value="text-embedding-ada-002">text-embedding-ada-002 (legacy)</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Batch Size</label>
            <input type="number" defaultValue="100" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>Number of chunks sent to the embedding API per request. Higher batch sizes increase throughput but risk rate limits.</p>
          </div>

          <button type="button" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>Save Configuration</button>
        </form>
      </div>
    </div>
  );
}
