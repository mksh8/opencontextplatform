import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TenantForm({ mode = 'edit' }: { mode?: 'edit' | 'create' }) {
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
            <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/tenants')}>Tenants</span>
            <span>&gt;</span>
            {isEdit ? (
              <>
                <span style={{ cursor: 'pointer', hover: { color: '#fff' } }} onClick={() => navigate('/tenants/1')}>Acme Corporation</span>
                <span>&gt;</span>
                <span style={{ color: '#fff' }}>Edit</span>
              </>
            ) : (
              <span style={{ color: '#fff' }}>Invite Tenant</span>
            )}
          </div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isEdit ? 'Edit Tenant' : 'Invite New Tenant'}
          </h1>
          <p style={{ marginTop: 8 }}>
            {isEdit ? 'Update tenant information and settings.' : 'Invite a new organization to join the platform.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn" style={{ padding: '8px 12px' }}>⋮</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {/* Left Form Area */}
        <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Wizard Header for Create */}
          {!isEdit && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: step >= 1 ? '#fff' : 'inherit' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: step >= 1 ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)', color: step >= 1 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>1</div>
                Tenant Details
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: step >= 2 ? '#fff' : 'inherit' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: step >= 2 ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)', color: step >= 2 ? '#fff' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>2</div>
                Admin Details
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
                <label style={labelStyle}>Tenant Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" style={inputStyle} defaultValue={isEdit ? "Acme Corporation" : ""} placeholder="Enter organization name" />
              </div>
              
              {isEdit && (
                <div>
                  <label style={labelStyle}>Primary Contact</label>
                  <input type="text" style={inputStyle} defaultValue="Anjali Verma" />
                </div>
              )}

              <div>
                <label style={labelStyle}>Domain <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" style={inputStyle} defaultValue={isEdit ? "acme.opencontext.ai" : ""} placeholder="Enter organization domain (e.g., example.com)" />
              </div>

              {isEdit && (
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" style={inputStyle} defaultValue="anjali.verma@acme.com" />
                </div>
              )}

              <div>
                <label style={labelStyle}>Plan {isEdit ? '' : <span style={{ color: '#ef4444' }}>*</span>}</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="Enterprise">
                  <option value="Enterprise">Enterprise</option>
                  <option value="Pro">Pro</option>
                  <option value="Starter">Starter</option>
                </select>
              </div>

              {isEdit && (
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="text" style={inputStyle} defaultValue="+1 415-555-0198" />
                </div>
              )}

              {isEdit && (
                <>
                  <div>
                    <label style={labelStyle}>Status</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="Active">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="United States">
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </>
              )}

              <div style={{ gridColumn: isEdit ? '1 / -1' : '1' }}>
                <label style={labelStyle}>Description {isEdit ? '' : '(Optional)'}</label>
                <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} defaultValue={isEdit ? "Acme Corporation is using OpenContextPlatform to build and scale AI-powered solutions." : ""} placeholder="Enter description" />
              </div>

              {isEdit && (
                <div>
                  <label style={labelStyle}>Time Zone</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} defaultValue="(GMT-07:00) Pacific Time (US & Canada)">
                    <option value="(GMT-07:00) Pacific Time (US & Canada)">(GMT-07:00) Pacific Time (US & Canada)</option>
                  </select>
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

        {/* Right Info Area (for Create) */}
        {!isEdit && (
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="widget" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Plan Features</h3>
              <div style={{ display: 'inline-block', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500, marginBottom: 20 }}>
                Enterprise
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: '#fff' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> Unlimited Users
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> Advanced Security
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> SSO & SCIM
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> Audit Logs
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> API Access
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#10b981' }}>✓</span> Priority Support
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
