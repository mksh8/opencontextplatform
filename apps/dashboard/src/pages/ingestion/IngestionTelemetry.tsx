import React from 'react';

export default function IngestionTelemetry() {
  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Ingestion Telemetry</h1>
        <p>Monitor the health, throughput, and error rates of the ETL pipelines.</p>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Nodes Ingested (24h)</h3>
          <p style={{ fontSize: '32px', fontWeight: '600' }}>24,192</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Throughput</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-green)' }}>45 nodes/sec</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Embedding Latency</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-blue)' }}>2.4s / batch</p>
        </div>
        <div className="widget">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>DLQ Drop Rate</h3>
          <p style={{ fontSize: '32px', fontWeight: '600', color: 'var(--accent-orange)' }}>0.4%</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="widget" style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Ingestion Throughput over Time (Chart loading...)</p>
        </div>
        <div className="widget" style={{ minHeight: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Error Distribution (Chart loading...)</p>
        </div>
      </div>
    </div>
  );
}
