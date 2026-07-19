import React, { useState } from 'react';
import BillingDashboard from '../components/BillingDashboard';

export default function Billing() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Invoices', 'Payment Methods'];

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Billing & Usage</h1>
          <p>Monitor your usage and billing.</p>
        </div>
        <button className="btn">May 12 - Jun 12, 2024 📅</button>
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

      {activeTab === 'Overview' ? (
        <BillingDashboard />
      ) : (
        <div className="widget" style={{ padding: 48, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>The {activeTab} section is currently under development.</p>
        </div>
      )}
    </>
  );
}
