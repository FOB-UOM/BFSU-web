'use client';

import React from 'react';
import { 
    AlertCircle, 
    Inbox, 
    RefreshCw, 
    Loader2, 
    Archive, 
    CheckCircle2, 
    ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';

/**
 * Canonical State Feedback Component
 * Unified UX state handler for Database & Incident Streams:
 * - 'loading'
 * - 'empty'
 * - 'error' | 'failed'
 * - 'deleted' | 'archived'
 * - 'success'
 */
export const StateFeedback = ({
    state = 'empty',
    title,
    message,
    icon: CustomIcon,
    actionLabel,
    onAction,
    actionHref,
    className = '',
    compact = false
}) => {
    // 1. Loading State
    if (state === 'loading') {
        return (
            <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]/50 ${className}`}>
                <Loader2 size={compact ? 24 : 32} className="text-[#C59B27] animate-spin mb-3" />
                <h4 className="font-display text-sm sm:text-base font-bold text-[var(--text-primary)]">
                    {title || 'Querying Operational Ledger...'}
                </h4>
                {message && (
                    <p className="font-body text-xs text-[var(--text-muted)] mt-1 max-w-sm">
                        {message}
                    </p>
                )}
            </div>
        );
    }

    // 2. Error / Failed State
    if (state === 'error' || state === 'failed') {
        const Icon = CustomIcon || AlertCircle;
        return (
            <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-rose-500/30 bg-rose-500/5 ${className}`}>
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
                    <Icon size={24} />
                </div>
                <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                    {title || 'Database Incident / Query Failed'}
                </h4>
                <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 max-w-md leading-relaxed">
                    {message || 'Unable to retrieve registry data from the server. Please try again or check network connectivity.'}
                </p>
                {(onAction || actionHref) && (
                    <div className="mt-5">
                        {onAction ? (
                            <button
                                onClick={onAction}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] font-mono text-xs font-semibold text-[var(--text-primary)] shadow-xs transition-colors"
                            >
                                <RefreshCw size={12} />
                                <span>{actionLabel || 'Retry Operation'}</span>
                            </button>
                        ) : (
                            <Link
                                href={actionHref}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] font-mono text-xs font-semibold text-[var(--text-primary)] shadow-xs transition-colors"
                            >
                                <ArrowLeft size={12} />
                                <span>{actionLabel || 'Back to Safe Route'}</span>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // 3. Deleted / Archived State
    if (state === 'deleted' || state === 'archived') {
        const Icon = CustomIcon || Archive;
        return (
            <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/30 ${className}`}>
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)] flex items-center justify-center mb-3">
                    <Icon size={22} />
                </div>
                <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                    {title || 'Record Archived or Retired'}
                </h4>
                <p className="font-body text-xs text-[var(--text-muted)] mt-1 max-w-md">
                    {message || 'This record is no longer active in current operational rosters.'}
                </p>
                {actionHref && (
                    <Link
                        href={actionHref}
                        className="mt-4 font-mono text-xs font-semibold text-[#C59B27] hover:underline inline-flex items-center gap-1"
                    >
                        <span>{actionLabel || 'View Current Directory'}</span> &rarr;
                    </Link>
                )}
            </div>
        );
    }

    // 4. Success State
    if (state === 'success') {
        const Icon = CustomIcon || CheckCircle2;
        return (
            <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 ${className}`}>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                    <Icon size={24} />
                </div>
                <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                    {title || 'Operation Completed Successfully'}
                </h4>
                {message && (
                    <p className="font-body text-xs text-[var(--text-muted)] mt-1 max-w-md">
                        {message}
                    </p>
                )}
            </div>
        );
    }

    // 5. Empty State (Default)
    const Icon = CustomIcon || Inbox;
    return (
        <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-surface)]/40 ${className}`}>
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)]/60 text-[#C59B27] border border-[var(--border)] flex items-center justify-center mb-3">
                <Icon size={22} />
            </div>
            <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                {title || 'No Records Found'}
            </h4>
            <p className="font-body text-xs text-[var(--text-muted)] mt-1 max-w-md leading-relaxed">
                {message || 'No operational records have been cataloged in this section yet.'}
            </p>
            {actionHref && (
                <Link
                    href={actionHref}
                    className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] font-mono text-xs font-semibold text-[#C59B27] shadow-xs transition-colors"
                >
                    <span>{actionLabel || 'Explore Registry'}</span> &rarr;
                </Link>
            )}
        </div>
    );
};
