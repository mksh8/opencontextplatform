import React, { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';

const CARDS = [
  { type: 'Visa', last4: '4242', exp: 'Expires 12/26', billing: '123 Main St, San Francisco, CA', color: '#1a56db', isDefault: true },
  { type: 'Mastercard', last4: '8888', exp: 'Expires 08/25', billing: '123 Main St, San Francisco, CA', color: '#ef4444', isDefault: false },
  { type: 'Amex', last4: '1005', exp: 'Expires 03/27', billing: '123 Main St, San Francisco, CA', color: '#10b981', isDefault: false },
];

export default function PaymentMethodsTab() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { showToast } = useToast();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button className="btn btn-primary" onClick={() => showToast('Add payment method coming soon', 'success')}>
          + Add Payment Method
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 600 }}>
        {CARDS.map(card => (
          <div key={card.last4} style={{
            background: 'var(--bg-elevated)', border: '1px solid var(--border-color)',
            borderRadius: 10, padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative',
          }}>
            {/* Card logo */}
            <div style={{
              width: 48, height: 32, borderRadius: 6, background: card.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0, letterSpacing: 0.5,
            }}>
              {card.type.substring(0, 4).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, color: '#fff', fontSize: 15 }}>{card.type} •••• {card.last4}</span>
                {card.isDefault && (
                  <span style={{ fontSize: 10, background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Default</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 2 }}>{card.exp}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{card.billing}</div>
            </div>
            {/* Actions */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={e => { e.stopPropagation(); setActiveMenu(activeMenu === card.last4 ? null : card.last4); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 18, padding: '2px 6px', borderRadius: 4 }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >⋮</button>
              {activeMenu === card.last4 && (
                <div onClick={e => e.stopPropagation()} style={{
                  position: 'absolute', right: 0, top: 28, background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)', borderRadius: 7, padding: '4px 0',
                  zIndex: 50, minWidth: 160, boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                }}>
                  {[
                    { label: 'Set as Default', color: '#fff' },
                    { label: 'Edit Card', color: '#fff' },
                    { label: 'Remove Card', color: '#ef4444' },
                  ].map(item => (
                    <div key={item.label} onClick={() => { showToast(`${item.label} clicked`, 'success'); setActiveMenu(null); }}
                      style={{ padding: '9px 16px', cursor: 'pointer', fontSize: 13, color: item.color }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >{item.label}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add card CTA */}
        <button onClick={() => showToast('Add payment method coming soon', 'success')} style={{
          padding: '18px', borderRadius: 10, border: '1px dashed rgba(255,255,255,0.15)',
          background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 14, fontWeight: 500,
        }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#8b5cf6')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
        >
          + Add Payment Method
        </button>
      </div>
    </div>
  );
}
