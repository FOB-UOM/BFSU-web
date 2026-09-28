'use client';

import React, { useState } from 'react';
import { ExternalLink, RefreshCw, AlertCircle, ShieldCheck, Maximize2, Minimize2 } from 'lucide-react';

/**
 * DepartmentOfficialPortalEmbed
 * 
 * Embeds the official University of Moratuwa Department portal within the top half
 * of the department space, establishing a clean institutional boundary between
 * official university administration and student union/peer initiatives.
 */
export const DepartmentOfficialPortalEmbed = ({
    departmentName,
    portalUrl,
    staffRosterUrl,
    departmentCode
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [key, setKey] = useState(0);

    const handleRefresh = () => {
        setIsLoading(true);
        setKey(prev => prev + 1);
    };

    return (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden shadow-xl mb-12 transition-all">
            {/* Embed Header / Attestation Bar */}
            <div className="p-4 sm:p-5 bg-[var(--bg-subtle)] border-b border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-sm flex items-center gap-1 border border-[#10B981]/30">
                            <ShieldCheck size={12} />
                            OFFICIAL UNIVERSITY OF MORATUWA DOMAIN
                        </span>
                        <span className="font-mono text-[11px] text-[var(--text-muted)]">
                            Source: {portalUrl.replace(/^https?:\/\//, '')}
                        </span>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                        {departmentName} — Official University Portal & People Roster
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        Official administration, HOD governance, faculty staff directory, and curricula are maintained directly by the University.
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {staffRosterUrl && (
                        <a
                            href={staffRosterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                        >
                            <span>Staff Directory</span>
                            <ExternalLink size={12} />
                        </a>
                    )}

                    <a
                        href={portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[var(--gold)] text-[#0C1017] hover:brightness-110 shadow-xs transition-all"
                    >
                        <span>Open Official Site</span>
                        <ExternalLink size={12} />
                    </a>

                    <button
                        onClick={handleRefresh}
                        className="p-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        title="Reload embed frame"
                        aria-label="Reload embed frame"
                    >
                        <RefreshCw size={14} className={isLoading ? 'animate-spin text-[var(--gold)]' : ''} />
                    </button>

                    <button
                        onClick={() => setIsExpanded(prev => !prev)}
                        className="p-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:inline-flex"
                        title={isExpanded ? 'Collapse frame' : 'Expand frame'}
                        aria-label={isExpanded ? 'Collapse frame' : 'Expand frame'}
                    >
                        {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>

            {/* In-Page Iframe Viewport */}
            <div className="relative w-full bg-[var(--bg-inset)] transition-all" style={{ height: isExpanded ? '750px' : '460px' }}>
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[var(--bg-surface)]/80 backdrop-blur-xs z-10">
                        <div className="w-8 h-8 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin mb-3" />
                        <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                            Connecting to {portalUrl}...
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)] mt-1">
                            Streaming official university department records
                        </span>
                    </div>
                )}

                <iframe
                    key={key}
                    src={portalUrl}
                    title={`${departmentName} Official University Portal`}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    onLoad={() => setIsLoading(false)}
                />
            </div>

            {/* Frame Security & Network Disclaimer Footer */}
            <div className="px-5 py-3 bg-[var(--bg-subtle)] border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[var(--text-muted)]">
                <div className="flex items-center gap-1.5">
                    <AlertCircle size={13} className="text-[var(--gold)] shrink-0" />
                    <span>
                        Frame governed by UoM security policy. If your browser restricts cross-origin frames, launch directly via the button above.
                    </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    OFFICIAL JURISDICTION: DEANERY & SENATE
                </span>
            </div>
        </div>
    );
};
