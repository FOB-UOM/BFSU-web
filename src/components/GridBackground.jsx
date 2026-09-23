'use client';

import React, { useState, useEffect, useCallback } from 'react';

// Grid modes: id, label (short), description, className
const GRID_MODES = [
  {
    id: 'none',
    label: 'None',
    symbol: '○',
    desc: 'No grid',
    cls: 'grid-none',
  },
  {
    id: 'dot-matrix',
    label: 'Dot Matrix',
    symbol: '∷',
    desc: 'Fine dot canvas — 28px pitch',
    cls: 'grid-dot-matrix',
  },
  {
    id: 'blueprint',
    label: 'Blueprint',
    symbol: '⊞',
    desc: 'Architectural ledger — 80px rule',
    cls: 'grid-blueprint',
  },
  {
    id: 'crosshatch',
    label: 'Crosshatch',
    symbol: '⊟',
    desc: 'Micro 20px + major 80px grid',
    cls: 'grid-crosshatch',
  },
  {
    id: 'isometric',
    label: 'Isometric',
    symbol: '◈',
    desc: '45° diamond lattice — 40px',
    cls: 'grid-isometric',
  },
  {
    id: 'topology',
    label: 'Topology',
    symbol: '◎',
    desc: 'Concentric contour rings',
    cls: 'grid-topology',
  },
  {
    id: 'polar',
    label: 'Polar',
    symbol: '✦',
    desc: 'Radial spokes from horizon',
    cls: 'grid-polar',
  },
  {
    id: 'golden',
    label: 'Golden',
    symbol: 'φ',
    desc: 'Golden ratio harmonic grid',
    cls: 'grid-golden',
  },
  {
    id: 'editorial',
    label: 'Editorial',
    symbol: '‖',
    desc: '12-column newspaper column rule',
    cls: 'grid-editorial',
  },
];

const STORAGE_KEY = 'bfsu-grid-mode';

export const GridBackground = () => {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || 'blueprint';
    }
    return 'blueprint';
  });
  const [open, setOpen] = useState(false);

  const current = GRID_MODES.find(m => m.id === mode) || GRID_MODES[2];

  const select = useCallback((id) => {
    setMode(id);
    localStorage.setItem(STORAGE_KEY, id);
    setOpen(false);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!e.target.closest('#grid-switcher')) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <>
      {/* ── Fixed grid layer ────────────────────────────── */}
      <div
        id="bfsu-grid"
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none select-none z-0 transition-all duration-700 ${current.cls}`}
      />

      {/* ── Grid mode switcher ──────────────────────────── */}
      <div
        id="grid-switcher"
        className="fixed bottom-5 left-5 z-50"
        aria-label="Grid background selector"
      >
        {/* Panel */}
        {open && (
          <div
            className="mb-2 p-3 rounded-sm shadow-2xl border"
            style={{
              background: 'var(--bg-overlay)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderColor: 'var(--border)',
              width: '230px',
            }}
          >
            <p
              className="font-mono text-[9px] uppercase tracking-[0.28em] mb-2.5 font-bold"
              style={{ color: 'var(--gold)' }}
            >
              Grid Surface
            </p>
            <div className="flex flex-col gap-0.5">
              {GRID_MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => select(m.id)}
                  className="flex items-center gap-3 px-2 py-1.5 rounded-sm text-left transition-all hover:bg-[rgba(197,155,39,0.08)] group"
                  style={{
                    background: mode === m.id ? 'var(--gold-faint)' : undefined,
                    borderLeft: mode === m.id ? '2px solid var(--gold)' : '2px solid transparent',
                  }}
                >
                  <span
                    className="font-mono text-base w-5 text-center flex-shrink-0"
                    style={{ color: mode === m.id ? 'var(--gold)' : 'var(--text-faint)' }}
                  >
                    {m.symbol}
                  </span>
                  <div>
                    <div
                      className="font-mono text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: mode === m.id ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      {m.label}
                    </div>
                    <div
                      className="text-[9px] font-medium leading-tight mt-0.5"
                      style={{ color: 'var(--text-faint)' }}
                    >
                      {m.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setOpen(!open)}
          title={`Grid: ${current.label} — click to change`}
          aria-label="Toggle grid selector"
          className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-base font-bold transition-all duration-200 hover:scale-110 active:scale-95 shadow-md border"
          style={{
            background: open ? 'var(--gold)' : 'var(--bg-overlay)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderColor: open ? 'var(--gold)' : 'var(--border)',
            color: open ? '#12161F' : 'var(--gold)',
          }}
        >
          {current.symbol}
        </button>
      </div>
    </>
  );
};
