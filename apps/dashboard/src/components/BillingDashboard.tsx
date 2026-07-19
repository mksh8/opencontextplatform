import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useToast } from '../contexts/ToastContext';

interface UsageMetrics {
  total_tokens: string;
  tokens_trend: string;
  total_queries: string;
  queries_trend: string;
  storage_used: string;
  storage_trend: string;
  estimated_cost: string;
  cost_trend: string;
}

interface CostService {
  name: string;
  cost: string;
  percentage: string;
  color: string;
}

interface InvoiceSummary {
  services: CostService[];
}

export default function BillingDashboard() {
  const [usage, setUsage] = useState<UsageMetrics | null>(null);
  const [invoices, setInvoices] = useState<InvoiceSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orgId = "org_alpha_123";
    
    Promise.all([
      apiClient.get(`/billing/${orgId}/usage`),
      apiClient.get(`/billing/${orgId}/invoices`)
    ])
    .then(([usageRes, invoicesRes]) => {
      setUsage(usageRes.data);
      setInvoices(invoicesRes.data);
    })
    .catch(error => console.error("Error fetching billing data:", error))
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: 32, color: 'var(--text-secondary)' }}>Loading billing data...</div>;
  }
  
  return (
    <>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi-card" style={{ padding: '16px' }}>
          <div className="kpi-data">
            <h3>Total Tokens</h3>
            <div className="value" style={{ fontSize: 20 }}>{usage?.total_tokens} <span className="trend-up">{usage?.tokens_trend}</span></div>
          </div>
        </div>
        <div className="kpi-card" style={{ padding: '16px' }}>
          <div className="kpi-data">
            <h3>Total Queries</h3>
            <div className="value" style={{ fontSize: 20 }}>{usage?.total_queries} <span className="trend-up">{usage?.queries_trend}</span></div>
          </div>
        </div>
        <div className="kpi-card" style={{ padding: '16px' }}>
          <div className="kpi-data">
            <h3>Storage Used</h3>
            <div className="value" style={{ fontSize: 20 }}>{usage?.storage_used} <span className="trend-up">{usage?.storage_trend}</span></div>
          </div>
        </div>
        <div className="kpi-card" style={{ padding: '16px' }}>
          <div className="kpi-data">
            <h3>Estimated Cost</h3>
            <div className="value" style={{ fontSize: 20 }}>{usage?.estimated_cost} <span className="trend-up" style={{ color: '#ff7b72' }}>{usage?.cost_trend}</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginTop: 24 }}>
        
        {/* Usage Over Time */}
        <div className="widget" style={{ padding: 24 }}>
          <div className="widget-header">
            <span className="widget-title">Usage Over Time</span>
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <span style={{ color: 'var(--accent-purple)' }}>— Tokens</span>
              <span style={{ color: 'var(--accent-blue)' }}>— Requests</span>
            </div>
          </div>
          
          <div className="line-chart-mock" style={{ height: 250 }}>
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="25" x2="100" y2="25" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="var(--border-color)" strokeWidth="0.5" />
              
              <path d="M0,80 Q10,60 20,70 T40,40 T60,60 T80,30 T100,20" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" />
              <path d="M0,90 Q10,75 20,85 T40,60 T60,70 T80,45 T100,30" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" />
            </svg>
            <div style={{ position: 'absolute', left: -20, top: 0, fontSize: 10, color: 'var(--text-secondary)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span>200M</span><span>150M</span><span>100M</span><span>50M</span><span>0</span>
            </div>
            <div style={{ position: 'absolute', bottom: -20, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-secondary)' }}>
              <span>May 12</span><span>May 19</span><span>May 26</span><span>Jun 02</span><span>Jun 09</span><span>Jun 12</span>
            </div>
          </div>
        </div>

        {/* Top Services by Cost */}
        <div className="widget" style={{ padding: 24 }}>
          <div className="widget-header">
            <span className="widget-title">Top Services by Cost</span>
          </div>
          
          {invoices?.services.map((service, index) => (
            <div className="bar-row" key={index}>
              <div className="bar-label">{service.name}</div>
              <div className="bar-track"><div className="bar-fill" style={{ width: service.percentage, background: service.color }}></div></div>
              <div className="bar-value">{service.cost} <span style={{ fontSize: 10 }}>{service.percentage}</span></div>
            </div>
          ))}
          
          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <span style={{ fontSize: 12, color: 'var(--accent-blue)', cursor: 'pointer' }}>View Invoices</span>
          </div>
        </div>
      </div>
    </>
  );
}
