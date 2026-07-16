import React from 'react';

export default function UniversalSearch() {
  return (
    <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '48px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>OpenContextPlatform</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Universal Search Engine</p>
      </div>

      <div style={{ width: '100%', maxWidth: '800px', position: 'relative' }}>
        <input 
          type="text" 
          placeholder="Ask anything or search across your enterprise knowledge..." 
          style={{ 
            width: '100%', 
            padding: '24px 32px', 
            fontSize: '18px', 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid rgba(139, 92, 246, 0.3)', 
            borderRadius: '40px', 
            color: '#fff',
            outline: 'none',
            boxShadow: '0 4px 24px rgba(139, 92, 246, 0.1)'
          }} 
        />
        <div style={{ position: 'absolute', right: '16px', top: '16px', display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" style={{ borderRadius: '24px', padding: '8px 24px' }}>Search</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
        <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>Semantic</button>
        <button className="btn" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>Graph</button>
        <button className="btn" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)' }}>Hybrid (Auto)</button>
      </div>
    </div>
  );
}
