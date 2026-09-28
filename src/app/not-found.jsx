import React from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { ArrowLeft, Search, Home, ShieldAlert } from 'lucide-react';

export const metadata = {
    title: '404 - Resource Not Found | BFSU UoM',
    description: 'The requested page or operational record could not be found in the registry.'
};

export default function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center py-24 relative">
            <Container className="max-w-2xl text-center relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#C59B27]/10 border border-[#C59B27]/30 flex items-center justify-center text-[#C59B27]">
                    <ShieldAlert size={32} />
                </div>

                <span className="font-mono text-xs uppercase tracking-widest text-[#C59B27] font-bold block mb-2">
                    404 — Ledger Record Not Found
                </span>

                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                    The requested resource does not exist
                </h1>

                <p className="font-body text-sm sm:text-base text-[var(--text-muted)] max-w-lg mx-auto mb-8 leading-relaxed">
                    The URL, delegate profile, or departmental ledger entry you requested is not cataloged in the active University of Moratuwa Business Faculty database.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#C59B27] hover:bg-[#B38A22] text-[#12161F] font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                    >
                        <Home size={14} />
                        <span>Return Home</span>
                    </Link>

                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] font-mono text-xs font-semibold text-[var(--text-primary)] shadow-xs transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>Faculty Directory</span>
                    </Link>

                    <Link
                        href="/alumni"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] font-mono text-xs font-semibold text-[var(--text-primary)] shadow-xs transition-colors"
                    >
                        <span>Alumni & Delegates</span>
                    </Link>
                </div>
            </Container>
        </main>
    );
}
