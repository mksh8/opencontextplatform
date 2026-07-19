import React, { useState, useEffect } from 'react';

interface MetadataField {
  id: string;
  contextId: string;
  key: string;
  value: string;
  source: string;
}

interface ContextOption {
  id: string;
  title: string;
}

export default function MetadataViewer() {
  const [fields, setFields] = useState<MetadataField[]>([]);

  const [availableContexts, setAvailableContexts] = useState<ContextOption[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  
  // Selection state
  const [applyToAll, setApplyToAll] = useState(false);
  const [selectedContextIds, setSelectedContextIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch available contexts on mount
  useEffect(() => {
    // Fetch Context Options
    fetch('http://localhost:8000/api/v1/contexts')
      .then(res => res.json())
      .then(data => {
        if (data && data.data) {
          setAvailableContexts(data.data.map((c: any) => ({ id: c.id, title: c.title })));
        }
      })
      .catch(err => console.error("Failed to load contexts", err));

    // Fetch Global Metadata
    fetch('http://localhost:8000/api/v1/contexts/metadata/all')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setFields(data);
        }
      })
      .catch(err => console.error("Failed to load metadata", err));
  }, []);

  const handleToggleContext = (id: string) => {
    if (selectedContextIds.includes(id)) {
      setSelectedContextIds(selectedContextIds.filter(c => c !== id));
    } else {
      setSelectedContextIds([...selectedContextIds, id]);
    }
  };

  const handleAddField = async () => {
    if (!newKey.trim() || !newValue.trim()) return;
    if (!applyToAll && selectedContextIds.length === 0) {
      alert("Please select at least one Context ID or check 'Apply to All'");
      return;
    }
    
    setIsSaving(true);

    try {
      // Send to Backend
      const response = await fetch('http://localhost:8000/api/v1/contexts/metadata/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context_ids: selectedContextIds,
          apply_to_all: applyToAll,
          key: newKey,
          value: newValue
        })
      });

      if (!response.ok) throw new Error("API request failed");

      // Update UI Optimistically
      const newFields: MetadataField[] = [];
      const idsToApply = applyToAll ? availableContexts.map(c => c.id) : selectedContextIds;
      
      idsToApply.forEach(cid => {
        newFields.push({
          id: Date.now().toString() + cid,
          contextId: cid,
          key: newKey,
          value: newValue,
          source: 'User Defined'
        });
      });
      
      setFields([...newFields, ...fields]);
      
      // Reset form
      setNewKey('');
      setNewValue('');
      setSelectedContextIds([]);
      setApplyToAll(false);
      setIsAdding(false);

    } catch (err) {
      console.error(err);
      alert("Failed to save metadata to backend.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  return (
    <div className="dashboard-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Metadata & Tags</h1>
          <p>Custom key-value pairs assigned to contexts.</p>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ padding: '10px 16px' }}
          onClick={() => setIsAdding(true)}
        >
          + Add Field
        </button>
      </div>

      <div className="widget">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500, width: '250px' }}>Target Context(s)</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Key</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Value</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Source</th>
              <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)', verticalAlign: 'top' }}>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'white' }}>
                      <input 
                        type="checkbox" 
                        checked={applyToAll} 
                        onChange={(e) => setApplyToAll(e.target.checked)} 
                      />
                      Apply to All Contexts
                    </label>
                  </div>
                  
                  {!applyToAll && (
                    <div style={{ maxHeight: '120px', overflowY: 'auto', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px' }}>
                      {availableContexts.length === 0 ? (
                        <div style={{ fontSize: '12px' }}>No contexts found...</div>
                      ) : (
                        availableContexts.map(c => (
                          <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '4px', fontSize: '13px' }}>
                            <input 
                              type="checkbox" 
                              checked={selectedContextIds.includes(c.id)}
                              onChange={() => handleToggleContext(c.id)}
                            />
                            {c.id} ({c.title})
                          </label>
                        ))
                      )}
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px' }}>
                  <input 
                    type="text" 
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="Key name..." 
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', padding: '6px 10px', borderRadius: '4px', width: '100%', marginTop: '4px' }}
                  />
                </td>
                <td style={{ padding: '12px' }}>
                  <input 
                    type="text" 
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Value..." 
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', padding: '6px 10px', borderRadius: '4px', width: '100%', marginTop: '4px' }}
                  />
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 8px', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-purple)', borderRadius: '4px', fontSize: '12px', display: 'inline-block', marginTop: '8px' }}>User Defined</span>
                </td>
                <td style={{ padding: '12px', display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button onClick={handleAddField} disabled={isSaving} style={{ background: 'var(--accent-green)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}>
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setIsAdding(false)} disabled={isSaving} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </td>
              </tr>
            )}
            {fields.map((field) => (
              <tr key={field.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{field.contextId}</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>{field.key}</td>
                <td style={{ padding: '12px' }}>{field.value}</td>
                <td style={{ padding: '12px' }}>
                  {field.source === 'System Extracted' ? (
                    <span style={{ padding: '4px 8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', fontSize: '12px' }}>{field.source}</span>
                  ) : (
                    <span style={{ padding: '4px 8px', background: 'rgba(124, 58, 237, 0.2)', color: 'var(--accent-purple)', borderRadius: '4px', fontSize: '12px' }}>{field.source}</span>
                  )}
                </td>
                <td style={{ padding: '12px' }}>
                  <span 
                    onClick={() => handleDelete(field.id)}
                    style={{ color: 'var(--accent-orange)', cursor: 'pointer' }}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
            {fields.length === 0 && !isAdding && (
              <tr>
                <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No metadata fields found. Click "Add Field" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
