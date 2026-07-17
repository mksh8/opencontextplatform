import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

interface CollectionItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
  tag_color: string;
  tag_bg: string;
  time_ago: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orgId = "org_alpha_123";
    apiClient.get(`/collections/${orgId}`)
      .then(response => {
        setCollections(response.data);
      })
      .catch(error => console.error("Error fetching collections:", error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Collections</h1>
          <p>Organize contexts into semantic memory collections.</p>
        </div>
        <div className="filters">
          <button className="btn">All Types ⌄</button>
          <button className="btn">All Workspaces ⌄</button>
          <button className="btn btn-primary">+ New Memory</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32 }}>
        {/* Left Sidebar for Types */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 12, letterSpacing: '0.05em' }}>Memory Types</div>
          <div className="nav-item active" style={{ marginLeft: 0, padding: '8px 12px' }}>Backend Development</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>API Documentation</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>Bug Fixes & Issues</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>Project Planning</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>Architecture Decisions</div>
          <div className="nav-item" style={{ padding: '8px 12px' }}>Meeting Notes</div>
        </div>

        {/* Grid of Collection Cards */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {loading ? (
            <div style={{ color: 'var(--text-secondary)' }}>Loading collections...</div>
          ) : collections.length === 0 ? (
            <div style={{ color: 'var(--text-secondary)' }}>No collections found.</div>
          ) : (
            collections.map(col => (
              <div className="widget" style={{ padding: '20px' }} key={col.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{col.icon}</span>
                    <h3 style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{col.title}</h3>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>⋮</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>{col.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--text-secondary)' }}>
                  <span className="tag" style={{ color: col.tag_color, background: col.tag_bg }}>{col.tag}</span>
                  <span>{col.time_ago}</span>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </>
  );
}
