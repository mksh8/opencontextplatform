import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function RolesPermissions() {
  const [activeTab, setActiveTab] = useState('Roles');
  const { addToast } = useToast();
  const tabs = ['Roles', 'Permissions'];
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Roles & Permissions</h1>
          <p>Manage roles and permissions.</p>
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

      {activeTab === 'Roles' ? (
        <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Role</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Permissions</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Assigned To</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Owner</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>All permissions.</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>1</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Admin</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Manage everything</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>4</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Editor</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Read, Write</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>12</td>
              <td style={{ padding: '16px 24px' }}>⋮</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '16px 24px', color: '#fff', fontWeight: 500 }}>Viewer</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>Read only</td>
              <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>3</td>
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
