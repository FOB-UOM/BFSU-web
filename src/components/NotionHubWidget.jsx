'use client';

import React, { useState } from 'react';
import { 
    ExternalLink, 
    Layers, 
    BookOpen, 
    CheckCircle2, 
    Copy, 
    Sparkles,
    Database,
    FolderKanban,
    FileSpreadsheet
} from 'lucide-react';

export const NotionHubWidget = ({ 
    title = "Official Notion Workspace", 
    workspaceUrl = "https://notion.so/bfsu-uom",
    description = "Connected collaborative workspace for student executives, project boards, and academic resource databases.",
    resources = [],
    stats = null
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(workspaceUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getResourceIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'database':
                return <Database className="w-4 h-4 text-emerald-400" />;
            case 'workspace':
            case 'projects':
                return <FolderKanban className="w-4 h-4 text-blue-400" />;
            case 'spreadsheet':
            case 'directory':
                return <FileSpreadsheet className="w-4 h-4 text-amber-400" />;
            default:
                return <BookOpen className="w-4 h-4 text-purple-400" />;
        }
    };

    return (
        <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 shadow-xl overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C59B27]/20 transition-all duration-700" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center shadow-md">
                        {/* Notion Emblem */}
                        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.093-.374L17.784 2.15c-.466-.373-1.026-.653-1.866-.56L2.686 2.757c-.466.047-.56.327-.373.56l2.146.891zm.746 3.687v12.456c0 .746.373 1.026 1.213.933l13.961-.84c.84-.047 1.073-.56 1.073-1.213V6.634c0-.653-.28-.933-.933-.886L5.858 6.588c-.56.047-.653.42-.653 1.307zm12.368 1.493c.093.42 0 .84-.42.886l-.746.14c-.373.047-.56.28-.56.606v8.493c0 .56-.373.84-.933.886l-2.007.14c-.373.047-.56-.187-.56-.56V14.15l-3.36 4.806c-.28.373-.56.467-.933.467h-1.4c-.466 0-.653-.28-.653-.746V9.948c0-.56.28-.793.746-.84l2.1-.14c.373-.047.56.187.56.56v4.667l3.22-4.667c.28-.373.56-.513.933-.513l3.033-.187c.28-.047.373.14.373.42z" />
                        </svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-[var(--text-primary)]">
                                {title}
                            </h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Live Sync
                            </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] hover:bg-[var(--border)] text-[var(--text-secondary)] text-xs font-medium flex items-center gap-1.5 transition-colors"
                        title="Copy Notion URL"
                    >
                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <a
                        href={workspaceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 rounded-lg bg-[#C59B27] hover:bg-[#D5AB37] text-[#001738] font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:shadow-[#C59B27]/20"
                    >
                        <span>Open Workspace</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>

            {/* Stats Bar if provided */}
            {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-xs">
                    {stats.members && (
                        <div>
                            <span className="text-[var(--text-muted)] block text-[10px] uppercase tracking-wider">Stakeholders</span>
                            <span className="font-bold text-[var(--text-primary)]">{stats.members}</span>
                        </div>
                    )}
                    {stats.eventsPerYear && (
                        <div>
                            <span className="text-[var(--text-muted)] block text-[10px] uppercase tracking-wider">Annual Operations</span>
                            <span className="font-bold text-[var(--text-primary)]">{stats.eventsPerYear}</span>
                        </div>
                    )}
                    {stats.notionPages && (
                        <div>
                            <span className="text-[var(--text-muted)] block text-[10px] uppercase tracking-wider">Notion Vaults</span>
                            <span className="font-bold text-[var(--text-primary)]">{stats.notionPages}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Resources List */}
            {resources && resources.length > 0 && (
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Connected Databases & Knowledge Hubs</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {resources.map((res, idx) => (
                            <a
                                key={idx}
                                href={workspaceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)]/60 hover:bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[#C59B27]/40 transition-all group/item"
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 shrink-0">
                                        {getResourceIcon(res.type)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-[var(--text-primary)] truncate group-hover/item:text-[#C59B27] transition-colors">
                                            {res.title}
                                        </p>
                                        <span className="text-[10px] text-[var(--text-muted)]">
                                            {res.type}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-semibold text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--border)] shrink-0 ml-2">
                                    {res.tag}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
