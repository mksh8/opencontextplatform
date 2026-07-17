import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

export default function TenantOnboarding() {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/onboard', { 
        company_name: companyName,
        industry: industry,
        team_size: teamSize
      });
      // Store the provisioned tenant ID
      localStorage.setItem('ocp_tenant', response.data.tenant_id);
      
      // Proceed to the dashboard
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to setup organization.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1), transparent 50%), var(--bg-color)',
      padding: '20px'
    }}>
      <div className="widget" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '48px',
        background: 'rgba(23, 23, 23, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>Set up your workspace</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Tell us a bit about your organization so we can optimize your Multi-Modal Context engines.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleOnboard}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Organization Name</label>
            <input 
              type="text" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Corp"
              required
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '14px 16px',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Industry</label>
            <select 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '14px 16px',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="" disabled>Select your industry</option>
              <option value="software">Software / Technology</option>
              <option value="finance">Financial Services</option>
              <option value="healthcare">Healthcare</option>
              <option value="ecommerce">E-Commerce</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Team Size</label>
            <select 
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              required
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '14px 16px',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="" disabled>Select team size</option>
              <option value="1-10">1 - 10 employees</option>
              <option value="11-50">11 - 50 employees</option>
              <option value="51-200">51 - 200 employees</option>
              <option value="201-1000">201 - 1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px', fontWeight: 500, background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))' }}
            disabled={loading}
          >
            {loading ? 'Provisioning Environment...' : 'Launch Workspace'}
          </button>
        </form>
      </div>
    </div>
  );
}
