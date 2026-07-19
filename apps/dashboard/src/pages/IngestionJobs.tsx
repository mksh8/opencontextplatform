import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { Loader2 } from 'lucide-react';

interface IngestionJob {
  id: string;
  connector_id: string;
  connector_name: string;
  connector_icon: string;
  job_name: string;
  status: string;
  progress: number;
  started_at: string;
  completed_at: string | null;
  error_message: string | null;
}

export default function IngestionJobs() {
  const [jobs, setJobs] = useState<IngestionJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = () => {
    const orgId = "org_alpha_123";
    apiClient.get(`/connectors/${orgId}/jobs`)
      .then(response => {
        setJobs(response.data.jobs || []);
      })
      .catch(error => console.error("Error fetching ingestion jobs:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Ingestion Jobs</h1>
          <p>Monitor and manage ingestion jobs.</p>
        </div>
      </div>

      <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Job</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Connector</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Progress</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}>Started At</th>
              <th style={{ padding: '16px 24px', fontWeight: 500 }}></th>
            </tr>
          </thead>
          <tbody>
            {loading && jobs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <Loader2 size={24} className="spin" style={{ margin: '0 auto 8px auto', display: 'block' }} />
                  Loading jobs...
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No ingestion jobs found.
                </td>
              </tr>
            ) : (
              jobs.map(job => (
                <tr key={job.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: 500, color: '#fff' }}>{job.job_name}</div>
                    {job.error_message && <div style={{ fontSize: 11, color: '#ff7b72', marginTop: 4 }}>{job.error_message}</div>}
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{job.connector_icon} {job.connector_name}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="tag" style={{ 
                      color: job.status === 'Completed' ? 'var(--accent-green)' : job.status === 'Running' ? 'var(--accent-blue)' : '#ff7b72', 
                      background: job.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : job.status === 'Running' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 123, 114, 0.1)', 
                      display: 'inline-block' 
                    }}>
                      {job.status === 'Completed' ? '✓ ' : job.status === 'Running' ? '↻ ' : '✕ '}{job.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 4, background: 'var(--border-color)', borderRadius: 2 }}>
                        <div style={{ 
                          width: `${job.progress}%`, 
                          height: '100%', 
                          background: job.status === 'Failed' ? '#ff7b72' : job.status === 'Completed' ? 'var(--accent-green)' : 'var(--accent-blue)', 
                          borderRadius: 2 
                        }}></div>
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{job.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>
                    {job.started_at}
                    {job.completed_at && <div style={{ fontSize: 11, marginTop: 4 }}>Finished: {job.completed_at}</div>}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div className="dropdown">
                      <span style={{ cursor: 'pointer', padding: '0 8px', color: 'var(--text-secondary)' }}>⋮</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
