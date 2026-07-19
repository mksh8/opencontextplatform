import React from 'react';
import APIKeysList from '../components/APIKeysList';

export default function APIKeys() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>API Keys</h1>
          <p>Manage API keys and tokens for programmatic access.</p>
        </div>
      </div>
      <APIKeysList />
    </>
  );
}
