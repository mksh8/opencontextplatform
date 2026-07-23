import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserForm({ mode = 'edit' }: { mode?: 'edit' | 'create' }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
            <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/members')}>Users</span>
            <span>&gt;</span>
            {isEdit ? (
              <>
                <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/members/1')}>Priya Sharma</span>
                <span>&gt;</span>
                <span style={{ color: '#fff' }}>Edit</span>
              </>
            ) : (
              <span style={{ color: '#fff' }}>Invite User</span>
            )}
          </div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isEdit ? 'Edit User' : 'Invite New User'}
          </h1>
          <p style={{ marginTop: 8 }}>
            {isEdit ? 'Update user information and permissions.' : 'Invite a new user to your organization.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn" style={{ padding: '8px 12px' }}>⋮</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Wizard Header for Create */}
          {!isEdit && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: step >= 1 ? '#fff' : 'inherit' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: step >= 1 ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)', color: step >= 1 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>1</div>
                User Details
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: step >= 2 ? '#fff' : 'inherit' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: step >= 2 ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)', color: step >= 2 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>2</div>
                Role & Access
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: step >= 3 ? '#fff' : 'inherit' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: step >= 3 ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)', color: step >= 3 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>3</div>
                Review & Send
              </div>
            </div>
          )}

          {/* Form */}
          <div className="widget" style={{ padding: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label style={labelStyle}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" style={inputStyle} defaultValue={isEdit ? "Priya Sharma" : ""} placeholder="Enter full name" />
              </div>
              
              {!isEdit && (
                <div>
                  <label style={labelStyle}>Role <span style={{ color: '#ef4444' }}>*</span></label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="Developer">Developer</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
              )}
              {isEdit && (
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="text" style={inputStyle} defaultValue="+1 415-555-0142" />
                </div>
              )}

              <div>
                <label style={labelStyle}>Email <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="email" style={inputStyle} defaultValue={isEdit ? "priya.sharma@acme.com" : ""} placeholder="Enter email address" />
              </div>
              
              {!isEdit && (
                <div>
                  <label style={labelStyle}>Phone (Optional)</label>
                  <input type="text" style={inputStyle} placeholder="Enter phone number" />
                </div>
              )}
              {isEdit && (
                <div>
                  <label style={labelStyle}>Location</label>
                  <input type="text" style={inputStyle} defaultValue="San Francisco, CA" />
                </div>
              )}

              {isEdit && (
                <>
                  <div>
                    <label style={labelStyle}>Role <span style={{ color: '#ef4444' }}>*</span></label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="Developer">
                      <option value="Admin">Admin</option>
                      <option value="Developer">Developer</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Status</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="Active">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label style={labelStyle}>Department <span style={{ color: '#ef4444' }}>*</span></label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue={isEdit ? "Engineering" : ""}>
                  <option value="" disabled>Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Administration">Administration</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>

              {isEdit && (
                <div>
                  <label style={labelStyle}>Language</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="English">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              )}

              {!isEdit && (
                <div>
                  <label style={labelStyle}>Message (Optional)</label>
                  <input type="text" style={inputStyle} placeholder="Add a personal message (optional)" />
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
              <button className="btn" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn btn-primary" style={{ minWidth: 120 }}>
                {isEdit ? 'Save Changes' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
