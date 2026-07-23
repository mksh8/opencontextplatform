import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TenantDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: 8 }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="page-title">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>Dashboard</h1>
          <p style={{ marginTop: 8 }}>Overview of your tenant and platform usage.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>+</span> Create Workspace
          </button>
          <button className="btn" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Actions
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Top Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {/* Workspaces */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                📦
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 4 }}>Workspaces</span>
                <span style={{ color: '#fff', fontSize: 28, fontWeight: 600, lineHeight: 1 }}>24</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <div style={{ color: 'var(--text-secondary)' }}><span style={{ color: '#10b981' }}>↑ 20%</span> this month</div>
              <div style={{ color: '#a855f7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>View all <span style={{ fontSize: 16 }}>→</span></div>
            </div>
          </div>

          {/* Users */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                👥
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 4 }}>Users</span>
                <span style={{ color: '#fff', fontSize: 28, fontWeight: 600, lineHeight: 1 }}>186</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <div style={{ color: 'var(--text-secondary)' }}><span style={{ color: '#10b981' }}>↑ 18%</span> this month</div>
              <div style={{ color: '#a855f7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>View all <span style={{ fontSize: 16 }}>→</span></div>
            </div>
          </div>

          {/* AI Providers */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(234, 179, 8, 0.15)', color: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                ⚡
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 4 }}>AI Providers</span>
                <span style={{ color: '#fff', fontSize: 28, fontWeight: 600, lineHeight: 1 }}>6</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <div style={{ color: 'var(--text-secondary)' }}><span style={{ color: '#10b981' }}>↑ 12%</span> this month</div>
              <div style={{ color: '#a855f7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>View all <span style={{ fontSize: 16 }}>→</span></div>
            </div>
          </div>

          {/* Storage Used */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                🗄️
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 4 }}>Storage Used</span>
                <span style={{ color: '#fff', fontSize: 28, fontWeight: 600, lineHeight: 1 }}>820 GB</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <div style={{ color: 'var(--text-secondary)' }}>41% of 2 TB used</div>
              <div style={{ color: '#a855f7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>View details <span style={{ fontSize: 16 }}>→</span></div>
            </div>
            {/* Storage Progress Bar inside card */}
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginTop: -4, overflow: 'hidden' }}>
              <div style={{ width: '41%', height: '100%', background: '#8b5cf6', borderRadius: 2 }}></div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          {/* Consumption Overview Chart Placeholder */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Consumption Overview</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Daily usage summary for the last 30 days.</div>
              </div>
              <select className="input" style={{ width: 140, padding: '6px 12px', fontSize: 13 }}>
                <option>Last 30 Days</option>
              </select>
            </div>
            
            {/* Chart legend */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 16, fontSize: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6' }}></div><span style={{ color: 'var(--text-secondary)' }}>Ingestion (GB)</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}></div><span style={{ color: 'var(--text-secondary)' }}>Storage (GB)</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div><span style={{ color: 'var(--text-secondary)' }}>API Calls (K)</span></div>
            </div>

            {/* SVG Line Chart */}
            <div style={{ height: 200, width: '100%', position: 'relative', borderBottom: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)', marginBottom: 24 }}>
              {/* Y-Axis Labels */}
              <div style={{ position: 'absolute', left: -40, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', paddingBottom: 24 }}>
                <span>400K</span>
                <span>300K</span>
                <span>200K</span>
                <span>100K</span>
                <span>0</span>
              </div>
              {/* Grid Lines */}
              <div style={{ position: 'absolute', left: 0, right: 0, top: '25%', height: 1, background: 'var(--border-color)', opacity: 0.5 }}></div>
              <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'var(--border-color)', opacity: 0.5 }}></div>
              <div style={{ position: 'absolute', left: 0, right: 0, top: '75%', height: 1, background: 'var(--border-color)', opacity: 0.5 }}></div>
              
              {/* SVG Lines */}
              <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                <path d="M 0 100 Q 100 80 200 40 T 400 60 T 600 40 T 800 60" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                <path d="M 0 140 Q 100 120 200 100 T 400 110 T 600 100 T 800 120" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M 0 180 Q 100 170 200 150 T 400 160 T 600 150 T 800 140" fill="none" stroke="#10b981" strokeWidth="2" />
                
                {/* Points */}
                <circle cx="200" cy="40" r="4" fill="#1e1e1e" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="400" cy="60" r="4" fill="#1e1e1e" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="600" cy="40" r="4" fill="#1e1e1e" stroke="#8b5cf6" strokeWidth="2" />
                
                <circle cx="200" cy="100" r="4" fill="#1e1e1e" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="400" cy="110" r="4" fill="#1e1e1e" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="600" cy="100" r="4" fill="#1e1e1e" stroke="#3b82f6" strokeWidth="2" />
                
                <circle cx="200" cy="150" r="4" fill="#1e1e1e" stroke="#10b981" strokeWidth="2" />
                <circle cx="400" cy="160" r="4" fill="#1e1e1e" stroke="#10b981" strokeWidth="2" />
                <circle cx="600" cy="150" r="4" fill="#1e1e1e" stroke="#10b981" strokeWidth="2" />
              </svg>

              {/* X-Axis Labels */}
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: -24, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)' }}>
                <span>Apr 21</span>
                <span>Apr 28</span>
                <span>May 5</span>
                <span>May 12</span>
                <span>May 19</span>
              </div>
            </div>

            {/* Bottom summary metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16 }}>
              <div>
                <div style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>1.2 TB</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Data Ingested</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>820 GB</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Storage Used</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>1.2 M</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>API Calls</div>
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>98.5%</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Uptime</div>
              </div>
            </div>
          </div>

          {/* Resource Distribution Chart Placeholder */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Resource Distribution</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Breakdown of resources across workspaces.</div>
              </div>
              <select className="input" style={{ width: 120, padding: '6px 12px', fontSize: 13 }}>
                <option>By Storage</option>
              </select>
            </div>
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 32 }}>
              {/* Donut Chart */}
              <div style={{ width: 160, height: 160, position: 'relative' }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Base Circle */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
                  {/* Slices (Approximate stroke-dasharrays based on circumference = 2 * PI * 40 ~= 251.3) */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="72.8 178.5" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="55.2 196.1" strokeDashoffset="-72.8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="45.2 206.1" strokeDashoffset="-128" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#eab308" strokeWidth="20" strokeDasharray="37.6 213.7" strokeDashoffset="-173.2" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="25.1 226.2" strokeDashoffset="-210.8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="20" strokeDasharray="15 236.3" strokeDashoffset="-235.9" />
                </svg>
                {/* Center text */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontSize: 24, fontWeight: 600 }}>820 GB</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 11 }}>Total Used</div>
                </div>
              </div>
              
              {/* Legend */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6' }}></div><span style={{ color: 'var(--text-secondary)' }}>AI Research Lab</span></div>
                  <div style={{ display: 'flex', gap: 16 }}><span style={{ color: 'var(--text-secondary)', width: 50, textAlign: 'right' }}>240 GB</span><span style={{ color: '#fff', width: 30, textAlign: 'right' }}>29%</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}></div><span style={{ color: 'var(--text-secondary)' }}>Data Engineering</span></div>
                  <div style={{ display: 'flex', gap: 16 }}><span style={{ color: 'var(--text-secondary)', width: 50, textAlign: 'right' }}>180 GB</span><span style={{ color: '#fff', width: 30, textAlign: 'right' }}>22%</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div><span style={{ color: 'var(--text-secondary)' }}>Product Team</span></div>
                  <div style={{ display: 'flex', gap: 16 }}><span style={{ color: 'var(--text-secondary)', width: 50, textAlign: 'right' }}>150 GB</span><span style={{ color: '#fff', width: 30, textAlign: 'right' }}>18%</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }}></div><span style={{ color: 'var(--text-secondary)' }}>Marketing</span></div>
                  <div style={{ display: 'flex', gap: 16 }}><span style={{ color: 'var(--text-secondary)', width: 50, textAlign: 'right' }}>120 GB</span><span style={{ color: '#fff', width: 30, textAlign: 'right' }}>15%</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></div><span style={{ color: 'var(--text-secondary)' }}>DevOps</span></div>
                  <div style={{ display: 'flex', gap: 16 }}><span style={{ color: 'var(--text-secondary)', width: 50, textAlign: 'right' }}>80 GB</span><span style={{ color: '#fff', width: 30, textAlign: 'right' }}>10%</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316' }}></div><span style={{ color: 'var(--text-secondary)' }}>Others</span></div>
                  <div style={{ display: 'flex', gap: 16 }}><span style={{ color: 'var(--text-secondary)', width: 50, textAlign: 'right' }}>50 GB</span><span style={{ color: '#fff', width: 30, textAlign: 'right' }}>6%</span></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)', fontSize: 13 }}>
              <div style={{ color: 'var(--text-secondary)' }}>Total Capacity: <span style={{ color: '#fff', fontWeight: 500 }}>2 TB</span></div>
              <div style={{ color: '#a855f7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>View all workspaces <span style={{ fontSize: 16 }}>→</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 24, marginBottom: 24 }}>
          
          {/* Recent Workspaces */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Recent Workspaces</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Latest created or updated workspaces.</div>
              </div>
              <div style={{ color: '#a855f7', cursor: 'pointer', fontSize: 13 }}>View all →</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: 'AI', name: 'AI Research Lab', slug: 'ai-research-lab', plan: 'Enterprise', updated: '2h ago', bg: '#8b5cf6' },
                { icon: 'DE', name: 'Data Engineering', slug: 'data-engineering', plan: 'Enterprise', updated: '5h ago', bg: '#10b981' },
                { icon: 'PT', name: 'Product Team', slug: 'product-team', plan: 'Pro', updated: '1d ago', bg: '#10b981' },
                { icon: 'M', name: 'Marketing', slug: 'marketing-team', plan: 'Pro', updated: '2d ago', bg: '#ef4444' },
                { icon: 'D', name: 'DevOps', slug: 'devops-team', plan: 'Starter', updated: '2d ago', bg: '#8b5cf6' },
              ].map((ws, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: i === 4 ? 'none' : '1px solid var(--border-color)', marginBottom: i === 4 ? 0 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: ws.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>
                      {ws.icon}
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{ws.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{ws.slug}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: ws.plan === 'Enterprise' ? 'rgba(168, 85, 247, 0.15)' : ws.plan === 'Pro' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)', color: ws.plan === 'Enterprise' ? '#a855f7' : ws.plan === 'Pro' ? '#10b981' : '#3b82f6', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>
                      {ws.plan}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12, minWidth: 80, textAlign: 'right' }}>
                      Updated {ws.updated}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top API Consumers */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Top API Consumers</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>By number of API calls in last 7 days.</div>
              </div>
              <div style={{ color: '#a855f7', cursor: 'pointer', fontSize: 13 }}>View all →</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: 'AI', name: 'AI Research Lab', calls: '320K', fill: 80, bg: '#8b5cf6' },
                { icon: 'DE', name: 'Data Engineering', calls: '280K', fill: 70, bg: '#3b82f6' },
                { icon: 'PT', name: 'Product Team', calls: '190K', fill: 45, bg: '#10b981' },
                { icon: 'M', name: 'DevOps', calls: '130K', fill: 30, bg: '#eab308' },
                { icon: 'M', name: 'Marketing', calls: '120K', fill: 25, bg: '#d946ef' }, // Using 'M' for Marketing with purple bg per screenshot
              ].map((ws, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, borderBottom: i === 4 ? 'none' : '1px solid var(--border-color)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: ws.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                    {ws.icon}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: '#fff' }}>{ws.name}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{ws.calls}</span>
                    </div>
                    <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${ws.fill}%`, height: '100%', background: ws.bg, borderRadius: 2 }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="widget" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Alerts & Notifications</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Important alerts and system notifications.</div>
              </div>
              <div style={{ color: '#a855f7', cursor: 'pointer', fontSize: 13 }}>View all →</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { type: 'warning', title: 'Storage usage is above 80%', desc: 'Workspace: Data Engineering', time: '10m ago' },
                { type: 'info', title: 'New user added', desc: 'Anjali Verma was added to workspace Product Team', time: '1h ago' },
                { type: 'success', title: 'Backup completed successfully', desc: 'Workspace: AI Research Lab', time: '3h ago' },
                { type: 'warning', title: 'API rate limit near threshold', desc: 'Workspace: DevOps', time: '5h ago' },
                { type: 'info', title: 'Maintenance scheduled', desc: 'May 25, 2024, 01:00 AM - 03:00 AM (UTC)', time: '1d ago' },
              ].map((alert, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: 16, borderBottom: i === 4 ? 'none' : '1px solid var(--border-color)' }}>
                  <div style={{ color: alert.type === 'warning' ? '#f59e0b' : alert.type === 'success' ? '#10b981' : '#3b82f6', marginTop: 2 }}>
                    {alert.type === 'warning' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    ) : alert.type === 'success' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{alert.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{alert.desc}</div>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 12, whiteSpace: 'nowrap' }}>
                    {alert.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
