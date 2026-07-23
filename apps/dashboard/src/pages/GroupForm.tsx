import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupForm({ mode = 'edit' }: { mode?: 'edit' | 'create' }) {
  const navigate = useNavigate();

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: '#fff',
    fontSize: 13,
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    color: 'var(--text-secondary)',
    marginBottom: 6
  };

  const isEdit = mode === 'edit';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8 }}>
      {/* Breadcrumbs & Header */}
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/groups')}>Groups</span>
            <span>&gt;</span>
            {isEdit ? (
              <>
                <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/groups/1')}>Platform Admins</span>
                <span>&gt;</span>
                <span style={{ color: '#fff' }}>Edit</span>
              </>
            ) : (
              <span style={{ color: '#fff' }}>Create Group</span>
            )}
          </div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isEdit ? 'Edit Group' : 'Create New Group'}
          </h1>
          <p style={{ marginTop: 8 }}>
            {isEdit ? 'Update group information and permissions.' : 'Create a new group and add users.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn" style={{ padding: '8px 12px' }}>⋮</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Form */}
          <div className="widget" style={{ padding: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label style={labelStyle}>Group Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" style={inputStyle} defaultValue={isEdit ? "Platform Admins" : ""} placeholder="Enter group name" />
              </div>
              
              {isEdit && (
                <div>
                  <label style={labelStyle}>Status</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="Active">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              )}

              {!isEdit && (
                <div>
                  <label style={labelStyle}>Add Users</label>
                  <input type="text" style={inputStyle} placeholder="Search users by name or email" />
                </div>
              )}

              <div>
                <label style={labelStyle}>Description {isEdit ? '' : '(Optional)'}</label>
                <input type="text" style={inputStyle} defaultValue={isEdit ? "Full access to platform settings and management." : ""} placeholder="Enter group description" />
              </div>

              {isEdit && (
                <div>
                  <label style={labelStyle}>Group Type</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="System">
                    <option value="System">System</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              )}

              {!isEdit && (
                <div>
                  <label style={labelStyle}>Select Users</label>
                  <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.1)', border: '1px dashed var(--border-color)', borderRadius: 6, color: 'var(--text-secondary)', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
                    No users selected
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
              <button className="btn" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn btn-primary" style={{ minWidth: 120 }}>
                {isEdit ? 'Save Changes' : 'Create Group'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
