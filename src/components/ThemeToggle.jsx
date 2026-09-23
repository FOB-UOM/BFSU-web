'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const OPTIONS = [
  { key: 'light',  Icon: Sun,    label: 'Light'  },
  { key: 'dark',   Icon: Moon,   label: 'Dark'   },
  { key: 'system', Icon: Laptop, label: 'System' },
];

export const ThemeToggle = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Current icon
  const current = OPTIONS.find(o => o.key === theme) || OPTIONS[2];
  const { Icon: CurrentIcon } = current;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Orb trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Theme: ${theme}. Click to change`}
        title={`Current theme: ${theme}`}
        className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 border"
        style={{
          background: open
            ? 'var(--gold)'
            : 'var(--gold-faint)',
          borderColor: open
            ? 'var(--gold)'
            : 'rgba(197,155,39,0.25)',
          color: open ? '#12161F' : 'var(--gold)',
        }}
      >
        <CurrentIcon size={14} strokeWidth={2.5} />

        {/* Subtle pulse ring when auto/system */}
        {theme === 'system' && !open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: 'var(--gold)' }}
          />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full mt-2 right-0 rounded-sm shadow-2xl border overflow-hidden"
          style={{
            background: 'var(--bg-overlay)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderColor: 'var(--border)',
            width: '140px',
            zIndex: 200,
          }}
        >
          <p
            className="font-mono text-[8px] uppercase tracking-[0.28em] px-3 pt-2.5 pb-1.5 font-bold"
            style={{ color: 'var(--text-faint)' }}
          >
            Appearance
          </p>
          {OPTIONS.map(({ key, Icon, label }) => (
            <button
              key={key}
              onClick={() => { setTheme(key); setOpen(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-all hover:bg-[rgba(197,155,39,0.08)]"
              style={{
                background: theme === key ? 'var(--gold-faint)' : undefined,
                borderLeft: theme === key ? '2px solid var(--gold)' : '2px solid transparent',
              }}
            >
              <Icon
                size={13}
                strokeWidth={2.5}
                style={{ color: theme === key ? 'var(--gold)' : 'var(--text-faint)', flexShrink: 0 }}
              />
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-wider"
                style={{ color: theme === key ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                {label}
              </span>
            </button>
          ))}
          <div className="h-2.5" />
        </div>
      )}
    </div>
  );
};
