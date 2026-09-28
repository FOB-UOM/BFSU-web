import React from 'react';
import { useTypographyMode } from '../context/TypographyModeContext';
import { Type } from 'lucide-react';

export const TypographySwitcher = () => {
    const { fontMode, setFontMode } = useTypographyMode();

    return (
        <div className="fixed bottom-5 right-5 z-50 bg-[var(--bg-surface)] text-[var(--text-primary)] p-2.5 border border-[var(--border)] shadow-xl rounded-sm font-sans backdrop-blur-md flex items-center gap-3">
            <div className="flex items-center gap-2">
                <Type size={14} className="text-[var(--gold)]" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--text-primary)]">
                    Font Engine:
                </span>
            </div>

            <div className="flex items-center gap-1 bg-[var(--bg-subtle)] p-0.5 rounded-sm border border-[var(--border)]">
                <button
                    onClick={() => setFontMode('sans-bold')}
                    className={`px-2.5 py-1 text-[11px] font-bold font-sans transition-all rounded-sm ${
                        fontMode === 'sans-bold'
                            ? 'bg-[var(--gold)] text-[#12161F] dark:text-[#0C1017] font-bold shadow-sm'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                >
                    Sans Bold (EFSU)
                </button>
                <button
                    onClick={() => setFontMode('editorial-serif')}
                    className={`px-2.5 py-1 text-[11px] font-serif transition-all rounded-sm ${
                        fontMode === 'editorial-serif'
                            ? 'bg-[var(--gold)] text-[#12161F] dark:text-[#0C1017] font-bold shadow-sm'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                >
                    Editorial Serif
                </button>
            </div>
        </div>
    );
};
