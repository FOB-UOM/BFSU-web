'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({ error, reset }) {
    useEffect(() => {
        // Log incident to telemetry/console
        console.error('[Application Runtime / Database Incident]:', error);
    }, [error]);

    return (
        <main className="min-h-[70vh] flex items-center justify-center py-24 relative">
            <Container className="max-w-2xl text-center relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
                    <AlertTriangle size={32} />
                </div>

                <span className="font-mono text-xs uppercase tracking-widest text-rose-500 font-bold block mb-2">
                    500 — Application Incident Stream
                </span>

                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                    Something went wrong
                </h1>

                <p className="font-body text-sm sm:text-base text-[var(--text-muted)] max-w-lg mx-auto mb-8 leading-relaxed">
                    An unexpected exception or database stream interruption occurred. The incident has been recorded.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#C59B27] hover:bg-[#B38A22] text-[#12161F] font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                    >
                        <RefreshCw size={14} />
                        <span>Retry Connection</span>
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] font-mono text-xs font-semibold text-[var(--text-primary)] shadow-xs transition-colors"
                    >
                        <Home size={14} />
                        <span>Return Home</span>
                    </Link>
                </div>
            </Container>
        </main>
    );
}
