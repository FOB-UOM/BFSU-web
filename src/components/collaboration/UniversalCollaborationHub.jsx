'use client';

import React, { useState } from 'react';
import { 
    ExternalLink, 
    Layers, 
    BookOpen, 
    CheckCircle2, 
    Copy, 
    Database,
    FolderKanban,
    FileSpreadsheet,
    Calendar,
    Share2,
    HardDrive,
    GitBranch,
    Code2,
    FileText
} from 'lucide-react';
import { generateWhatsAppShareUrl } from '../../lib/collaboration/calendarHelper';
import { buildGoogleDrivePreviewUrl } from '../../lib/collaboration/googleAdapter';
import { isMicrosoftOfficeDocument, buildOfficeOnlineViewerUrl } from '../../lib/collaboration/microsoftAdapter';

export const UniversalCollaborationHub = ({ 
    title = "Collaborative Resource Desk", 
    description = "Connected student workspaces, cloud drives, and academic repositories.",
    workspaceUrl = "https://notion.so/bfsu-uom",
    workspaces = {},
    resources = [],
    stats = null,
    societyCode = "BFSU"
}) => {
    const [copied, setCopied] = useState(false);
    const [selectedTab, setSelectedTab] = useState('all');

    // Extract workspace links with robust fallbacks
    const notionUrl = workspaces.notion?.workspaceUrl || workspaceUrl;
    const googleDriveUrl = workspaces.googleWorkspace?.sharedDriveUrl || workspaces.googleDriveUrl || null;
    const googleCalendarUrl = workspaces.googleWorkspace?.calendarUrl || workspaces.googleCalendarUrl || null;
    const githubUrl = workspaces.repository?.githubUrl || workspaces.githubUrl || null;

    const handleCopy = (urlToCopy, e) => {
        if (e) e.preventDefault();
        navigator.clipboard.writeText(urlToCopy || workspaceUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getProviderBadge = (provider = 'notion') => {
        const p = provider?.toLowerCase() || '';
        if (p.includes('google') || p === 'drive') {
            if (p.includes('calendar')) {
                return {
                    label: 'Google Calendar',
                    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
                    icon: <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                };
            }
            if (p.includes('form')) {
                return {
                    label: 'Google Form',
                    color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10',
                    icon: <FileText className="w-3.5 h-3.5 text-indigo-400" />
                };
            }
            return {
                label: 'Google Drive',
                color: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
                icon: <HardDrive className="w-3.5 h-3.5 text-blue-400" />
            };
        }
        if (p === 'microsoft' || p === 'onedrive' || p === 'sharepoint') {
            return {
                label: 'Microsoft 365',
                color: 'text-sky-400 border-sky-500/20 bg-sky-500/10',
                icon: <HardDrive className="w-3.5 h-3.5 text-sky-400" />
            };
        }
        if (p === 'github') {
            return {
                label: 'GitHub Repo',
                color: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
                icon: <GitBranch className="w-3.5 h-3.5 text-purple-400" />
            };
        }
        return {
            label: 'Notion Workspace',
            color: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
            icon: <BookOpen className="w-3.5 h-3.5 text-amber-400" />
        };
    };

    const getResourceIcon = (type, provider) => {
        const p = provider?.toLowerCase() || '';
        if (p.includes('google') || p === 'drive') {
            if (p.includes('calendar')) return <Calendar className="w-4 h-4 text-emerald-400" />;
            if (p.includes('form')) return <FileText className="w-4 h-4 text-indigo-400" />;
            return <HardDrive className="w-4 h-4 text-blue-400" />;
        }
        if (p === 'microsoft' || p === 'onedrive' || p === 'sharepoint') {
            return <HardDrive className="w-4 h-4 text-sky-400" />;
        }
        if (p === 'github') {
            return <GitBranch className="w-4 h-4 text-purple-400" />;
        }
        if (type?.toLowerCase() === 'calendar') {
            return <Calendar className="w-4 h-4 text-emerald-400" />;
        }

        switch (type?.toLowerCase()) {
            case 'database':
                return <Database className="w-4 h-4 text-emerald-400" />;
            case 'workspace':
            case 'projects':
            case 'project board':
                return <FolderKanban className="w-4 h-4 text-blue-400" />;
            case 'spreadsheet':
            case 'directory':
                return <FileSpreadsheet className="w-4 h-4 text-amber-400" />;
            default:
                return <BookOpen className="w-4 h-4 text-purple-400" />;
        }
    };

    const filteredResources = resources.filter(res => {
        const prov = res.provider?.toLowerCase() || '';
        if (selectedTab === 'all') return true;
        if (selectedTab === 'google') return prov.includes('google') || prov === 'drive';
        if (selectedTab === 'microsoft') return prov === 'microsoft' || prov === 'onedrive' || prov === 'sharepoint' || isMicrosoftOfficeDocument(res.url);
        if (selectedTab === 'notion') return !prov || prov === 'notion';
        if (selectedTab === 'github') return prov === 'github';
        return true;
    });

    return (
        <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 sm:p-7 shadow-xl overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C59B27]/15 transition-all duration-700" />

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 relative">
                <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center shadow-md shrink-0">
                        <Layers className="w-6 h-6 text-[#C59B27]" />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-lg text-[var(--text-primary)]">
                                {title}
                            </h3>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#C59B27]/10 text-[#C59B27] border border-[#C59B27]/20">
                                Multi-Cloud Hub
                            </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Primary Hub Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={(e) => handleCopy(googleDriveUrl || notionUrl, e)}
                        className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] hover:bg-[var(--border)] text-[var(--text-secondary)] text-xs font-medium flex items-center gap-1.5 transition-colors"
                        title="Copy Resource Link"
                    >
                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
                    </button>

                    {googleDriveUrl && (
                        <a
                            href={googleDriveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                            title="Open Google Drive Repository"
                        >
                            <HardDrive className="w-3.5 h-3.5" />
                            <span>Google Drive</span>
                        </a>
                    )}

                    {notionUrl && (
                        <a
                            href={notionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-[#C59B27] hover:bg-[#D5AB37] text-[#001738] font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:shadow-[#C59B27]/20"
                            title="Open Connected Notion Desk"
                        >
                            <span>Notion Workspace</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    )}
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
                    {(stats.notionPages || stats.repositories) && (
                        <div>
                            <span className="text-[var(--text-muted)] block text-[10px] uppercase tracking-wider">Knowledge Repositories</span>
                            <span className="font-bold text-[var(--text-primary)]">{stats.notionPages || stats.repositories}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Provider Filter Tabs */}
            {resources && resources.length > 0 && (
                <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5 pb-2 border-b border-[var(--border)]">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
                            <span>Resource Repositories & Databases</span>
                        </h4>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setSelectedTab('all')}
                                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                                    selectedTab === 'all' 
                                        ? 'bg-[#C59B27]/20 text-[#C59B27] font-bold' 
                                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                            >
                                All ({resources.length})
                            </button>
                            {googleDriveUrl && (
                                <button
                                    onClick={() => setSelectedTab('google')}
                                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                                        selectedTab === 'google' 
                                            ? 'bg-blue-500/20 text-blue-400 font-bold' 
                                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    Google
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedTab('microsoft')}
                                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                                    selectedTab === 'microsoft' 
                                        ? 'bg-sky-500/20 text-sky-400 font-bold' 
                                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                            >
                                Microsoft 365
                            </button>
                            <button
                                onClick={() => setSelectedTab('notion')}
                                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                                    selectedTab === 'notion' 
                                        ? 'bg-amber-500/20 text-amber-400 font-bold' 
                                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                            >
                                Notion
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {filteredResources.map((res, idx) => {
                            const badge = getProviderBadge(res.provider);
                            let resourceTargetUrl = res.url || (res.provider?.includes('google') || res.provider === 'drive' ? googleDriveUrl : notionUrl);

                            // Programmatic Office Online Viewer preview for Word, Excel, and PowerPoint docs
                            if (isMicrosoftOfficeDocument(resourceTargetUrl)) {
                                resourceTargetUrl = buildOfficeOnlineViewerUrl(resourceTargetUrl);
                            }

                            return (
                                <a
                                    key={idx}
                                    href={resourceTargetUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)]/60 hover:bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[#C59B27]/40 transition-all group/item"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5 shrink-0">
                                            {getResourceIcon(res.type, res.provider)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-[var(--text-primary)] truncate group-hover/item:text-[#C59B27] transition-colors">
                                                {res.title}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className="text-[10px] text-[var(--text-muted)]">
                                                    {res.type}
                                                </span>
                                                <span className="text-[10px] text-[var(--text-muted)]">•</span>
                                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${badge.color}`}>
                                                    {badge.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-semibold text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--border)] shrink-0 ml-2">
                                        {res.tag}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
