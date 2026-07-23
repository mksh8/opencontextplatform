import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DepartmentForm({ mode = 'edit' }: { mode?: 'edit' | 'create' }) {
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
            <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/departments')}>Departments</span>
            <span>&gt;</span>
            {isEdit ? (
              <>
                <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/departments/1')}>Engineering</span>
                <span>&gt;</span>
                <span style={{ color: '#fff' }}>Edit</span>
              </>
            ) : (
              <span style={{ color: '#fff' }}>Create Department</span>
            )}
          </div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isEdit ? 'Edit Department' : 'Create New Department'}
          </h1>
          <p style={{ marginTop: 8 }}>
            {isEdit ? 'Update department information and settings.' : 'Create a new department in your organization.'}
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
                <label style={labelStyle}>Department Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" style={inputStyle} defaultValue={isEdit ? "Engineering" : ""} placeholder="Enter department name" />
              </div>
              
              <div>
                <label style={labelStyle}>Description (Optional)</label>
                <input type="text" style={inputStyle} defaultValue={isEdit ? "Engineering and product development department responsible for building core platform components." : ""} placeholder="Enter description" />
              </div>

              <div>
                <label style={labelStyle}>Head {isEdit ? <span style={{ color: '#ef4444' }}>*</span> : '(Optional)'}</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue={isEdit ? "Vikram Desai" : ""}>
                  <option value="" disabled>Select department head</option>
                  <option value="Vikram Desai">Vikram Desai</option>
                  <option value="Priya Sharma">Priya Sharma</option>
                </select>
              </div>
              
              {!isEdit && (
                <div>
                  <label style={labelStyle}>Location (Optional)</label>
                  <input type="text" style={inputStyle} placeholder="Enter location" />
                </div>
              )}

              {isEdit && (
                <div>
                  <label style={labelStyle}>Status</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="Active">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              )}

              <div>
                <label style={labelStyle}>Parent Department (Optional)</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="">
                  <option value="" disabled>Select parent department</option>
                  <option value="Administration">Administration</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
              <button className="btn" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn btn-primary" style={{ minWidth: 120 }}>
                {isEdit ? 'Save Changes' : 'Create Department'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
