import React from 'react';

export default function CreateCollection() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Create Collection</h1>
        <p>Establish a new boundary for grouping knowledge nodes.</p>
      </div>

      <div className="widget" style={{ maxWidth: '600px', padding: '32px' }}>
        <form>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Collection Name</label>
            <input type="text" placeholder="e.g. Legal Documents" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Description</label>
            <textarea placeholder="Briefly describe what goes into this collection..." style={{ width: '100%', height: '100px', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', resize: 'vertical' }}></textarea>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Parent Collection (Optional)</label>
            <select style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }}>
              <option value="">None (Top-Level Collection)</option>
              <option value="eng">Engineering Specs</option>
              <option value="hr">Human Resources</option>
            </select>
          </div>

          <button type="button" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>Create Collection</button>
        </form>
      </div>
    </div>
  );
}
