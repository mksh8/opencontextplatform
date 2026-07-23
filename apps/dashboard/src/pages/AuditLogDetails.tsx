import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AuditLogDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8, paddingBottom: 40 }}>
      {/* Back Link */}
      <div style={{ marginBottom: 16 }}>
        <span onClick={() => navigate('/audit')} style={{ color: '#8b5cf6', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          &lt; Back to Audit Logs
        </span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>Audit Log Details</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Detailed information about this activity.</div>
        </div>
        <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export JSON
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Top Summary Banner */}
        <div className="widget" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '25%' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>User Login</span>
                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>Success</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6' }}></div>
                Authentication
              </div>
            </div>
          </div>
          
          <div style={{ width: '1px', height: 40, background: 'var(--border-color)' }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Event ID</span>
            <span style={{ fontSize: 13, color: '#fff', fontFamily: 'monospace' }}>evt_01JVG87QG8H2ZK3J9E5F6A7B1C</span>
          </div>

          <div style={{ width: '1px', height: 40, background: 'var(--border-color)' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Time</span>
            <span style={{ fontSize: 13, color: '#fff' }}>May 21, 2025 10:24:31 AM</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>(IST) Asia/Kolkata</span>
          </div>

          <div style={{ width: '1px', height: 40, background: 'var(--border-color)' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '15%' }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>IP Address</span>
            <span style={{ fontSize: 13, color: '#fff', fontFamily: 'monospace' }}>203.0.113.45</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>India</span>
          </div>

          <div style={{ width: '1px', height: 40, background: 'var(--border-color)' }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%' }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>View Raw Log</span>
            <button className="btn" style={{ padding: '6px 12px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </button>
          </div>

        </div>

        {/* 3-Column Detailed View */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          
          {/* Event Information */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 24px 0', color: '#fff' }}>Event Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 13 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Action</span>
                <span style={{ color: '#fff' }}>User Login</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Resource</span>
                <span style={{ color: '#fff' }}>Authentication</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Resource ID</span>
                <span style={{ color: '#fff' }}>-</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16, alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Result</span>
                <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                  Success
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Description</span>
                <span style={{ color: '#fff', lineHeight: 1.5 }}>User logged in successfully using email and password.</span>
              </div>
            </div>
          </div>

          {/* Actor (User) */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 24px 0', color: '#fff' }}>Actor (User)</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#8b5cf6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>
                MK
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>Mukesh Kumar</span>
                  <span style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a855f7', padding: '2px 8px', borderRadius: 4, fontSize: 10 }}>Admin</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>admin@acme.com</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 13 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>User ID</span>
                <span style={{ color: '#fff', fontFamily: 'monospace' }}>user_7b2d1f</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Role</span>
                <span style={{ color: '#fff' }}>Organization Admin</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Department</span>
                <span style={{ color: '#fff' }}>Engineering</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Location</span>
                <span style={{ color: '#fff' }}>Bengaluru, Karnataka, India</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>MFA Used</span>
                <span style={{ color: '#fff' }}>No</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 24px 0', color: '#fff' }}>Additional Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 13 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>User Agent</span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5, wordBreak: 'break-word' }}>Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Device</span>
                <span style={{ color: '#fff' }}>Windows Desktop</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Browser</span>
                <span style={{ color: '#fff' }}>Chrome 124.0.0.0</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>OS</span>
                <span style={{ color: '#fff' }}>Windows 10</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Login Method</span>
                <span style={{ color: '#fff' }}>Email & Password</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Lower Row (Timeline and Related) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.75fr 1fr', gap: 24 }}>
          
          {/* Event Timeline */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 24px 0', color: '#fff' }}>Event Timeline</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              
              <div style={{ display: 'flex', gap: 24, position: 'relative', paddingBottom: 32 }}>
                <div style={{ position: 'absolute', left: 8, top: 24, bottom: 0, width: 2, background: 'var(--border-color)' }}></div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, width: 70, paddingTop: 2 }}>10:24:31 AM</div>
                <div style={{ position: 'relative', zIndex: 1, marginTop: 2 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#10b981', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Login successful</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>User authenticated successfully.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, position: 'relative', paddingBottom: 32 }}>
                <div style={{ position: 'absolute', left: 8, top: 24, bottom: 0, width: 2, background: 'var(--border-color)' }}></div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, width: 70, paddingTop: 2 }}>10:24:30 AM</div>
                <div style={{ position: 'relative', zIndex: 1, marginTop: 2 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--bg-color)', border: '2px solid #8b5cf6' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', margin: '3px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Password verified</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Password verification passed.</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 24, position: 'relative' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12, width: 70, paddingTop: 2 }}>10:24:29 AM</div>
                <div style={{ position: 'relative', zIndex: 1, marginTop: 2 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--bg-color)', border: '2px solid #8b5cf6' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', margin: '3px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>User authentication initiated</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Login attempt initiated from IP 203.0.113.45</div>
                </div>
              </div>

            </div>
          </div>

          {/* Related Information */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 24px 0', color: '#fff' }}>Related Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Session ID</span>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>sess_1JVG87QG8H2ZK3J9E5F6A7B1C</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Request ID</span>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>req_01JVG87QG8H2ZK3J9E5F6A7B1C</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Correlation ID</span>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>corr_01JVG87QG8H2ZK3J9E5F6A7B1C</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Previous Login</span>
                <span style={{ color: '#fff' }}>May 20, 2025 07:42:11 PM (IST)</span>
              </div>
              
              <div style={{ color: '#8b5cf6', cursor: 'pointer', marginTop: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                View Session Details <span>→</span>
              </div>
            </div>
          </div>

        </div>

        {/* Changes */}
        <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 16px 0', color: '#fff' }}>Changes (N/A)</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            No changes were made in this event.
          </div>
        </div>

      </div>
    </div>
  );
}
