import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

interface MemoryNode {
  id: string;
  content: string;
  type: string;
  timestamp: string;
}

export default function Memories() {
  const [memories, setMemories] = useState<MemoryNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orgId = "org_alpha_123";
    apiClient.get(`/memories/${orgId}`)
      .then(response => {
        setMemories(response.data);
      })
      .catch(error => console.error("Error fetching memories:", error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Memories</h1>
          <p>Explore your isolated semantic memories.</p>
        </div>
        <button className="btn btn-primary">+ New Memory</button>
      </div>

      <div className="widget" style={{ padding: 32, color: 'var(--text-secondary)' }}>
        <div style={{ fontSize: 48, marginBottom: 16, textAlign: 'center' }}>🗄️</div>
        <h2 style={{ color: '#fff', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>Memory store is active</h2>
        <p style={{ fontSize: 13, maxWidth: 400, margin: '0 auto 32px', textAlign: 'center' }}>
          This section contains individual extracted memories. They are grouped into higher-level themes inside the Collections tab.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {loading ? (
            <div style={{ textAlign: 'center' }}>Loading memories...</div>
          ) : memories.length === 0 ? (
            <div style={{ textAlign: 'center' }}>No memories found.</div>
          ) : (
            memories.map(mem => (
              <div key={mem.id} style={{ padding: 16, border: '1px solid var(--border-color)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>{mem.content}</div>
                  <div style={{ fontSize: 11, display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--accent-purple)', textTransform: 'uppercase' }}>{mem.type}</span>
                    <span>•</span>
                    <span>{mem.timestamp}</span>
                  </div>
                </div>
                <div style={{ cursor: 'pointer' }}>⋮</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
