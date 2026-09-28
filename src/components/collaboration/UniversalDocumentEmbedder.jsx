'use client';

import React, { useState } from 'react';
import { 
    FileText, 
    FileSpreadsheet, 
    ExternalLink, 
    Download, 
    Maximize2, 
    Minimize2, 
    BookOpen, 
    Layers, 
    Sparkles, 
    Check, 
    Copy,
    RefreshCw,
    AlertCircle
} from 'lucide-react';
import { detectDocumentInfo, resolveDocumentEmbedUrl } from '../../lib/collaboration/documentEmbedEngine';
import { FlipbookViewer } from './FlipbookViewer';

/**
 * UniversalDocumentEmbedder
 * 
 * Elegant, robust polymorphic document embedder that renders:
 * - PDF documents (via native iframe or interactive flipbook mode)
 * - Microsoft Word (.docx, .doc) via Office Online Viewer
 * - Microsoft Excel (.xlsx, .xls, .csv) via Office Online Viewer
 * - Microsoft PowerPoint (.pptx, .ppt) via Office Online Viewer
 * - Google Docs, Sheets, Slides, and Google Drive files
 * - Raw university CDN / Supabase storage URLs
 */
export const UniversalDocumentEmbedder = ({
    url = '',
    title = 'Document Preview',
    description = '',
    preferredMode = 'auto', // 'auto' | 'embed' | 'flipbook'
    flipbookPages = [],
    allowModeToggle = true,
    className = '',
    height = '650px'
}) => {
    const docInfo = detectDocumentInfo(url);
    const [viewMode, setViewMode] = useState(
        preferredMode === 'flipbook' || (preferredMode === 'auto' && flipbookPages.length > 0)
            ? 'flipbook'
            : 'embed'
    );
    const [proxyMode, setProxyMode] = useState(
        docInfo.format === 'pdf' ? 'stream' : 'direct' // Default to stream for PDF to avoid browser cross-origin quirks
    );
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [hasLoadError, setHasLoadError] = useState(false);

    if (!url && flipbookPages.length === 0) {
        return null;
    }

    const embedUrl = resolveDocumentEmbedUrl(url, { 
        useInternalProxy: proxyMode === 'stream',
        useGoogleViewerFallback: proxyMode === 'google' 
    });

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // If flipbook mode is active, render FlipbookViewer
    if (viewMode === 'flipbook') {
        return (
            <div className={`space-y-3 ${className}`}>
                <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#C59B27] flex items-center gap-1.5">
                        <Sparkles size={12} /> Interactive Flipbook Mode
                    </span>
                    {allowModeToggle && (
                        <button
                            onClick={() => setViewMode('embed')}
                            className="font-mono text-xs text-[var(--text-muted)] hover:text-[#C59B27] transition-colors"
                        >
                            Switch to Standard Scroll &rarr;
                        </button>
                    )}
                </div>
                <FlipbookViewer
                    title={title}
                    subtitle={description || docInfo.label}
                    pages={flipbookPages}
                    pdfUrl={url}
                />
            </div>
        );
    }

    return (
        <div 
            className={`rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-xl overflow-hidden flex flex-col transition-all ${
                isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : className
            }`}
        >
            {/* Top Toolbar */}
            <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-elevated)]/60 flex flex-wrap items-center justify-between gap-3 select-none">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[#C59B27]/10 text-[#C59B27] shrink-0">
                        {docInfo.format === 'excel' ? (
                            <FileSpreadsheet size={16} />
                        ) : (
                            <FileText size={16} />
                        )}
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h4 className="font-display text-sm font-bold text-[var(--text-primary)] truncate">
                                {title}
                            </h4>
                            <span className="font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase bg-[var(--bg-surface)] border border-[var(--border)] text-[#C59B27]">
                                {docInfo.label}
                            </span>
                        </div>
                        {description && (
                            <p className="text-xs text-[var(--text-muted)] truncate">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {/* Flipbook toggle if applicable */}
                    {allowModeToggle && (docInfo.format === 'pdf' || flipbookPages.length > 0) && (
                        <button
                            onClick={() => setViewMode('flipbook')}
                            className="px-2.5 py-1.5 rounded-lg border border-[#C59B27]/30 bg-[#C59B27]/10 text-[#C59B27] hover:bg-[#C59B27]/20 font-mono text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors"
                            title="Switch to 3D Page-Turning Flipbook"
                        >
                            <BookOpen size={13} />
                            <span>Flipbook View</span>
                        </button>
                    )}

                    <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                        title="Copy Document Link"
                    >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>

                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                        title="Open Source Document"
                    >
                        <ExternalLink size={14} />
                    </a>

                    <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                        title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                    >
                        <Maximize2 size={14} />
                    </button>
                </div>
            </div>

            {/* Embed Frame Body */}
            <div 
                className="relative w-full bg-neutral-900/50 flex-1 overflow-hidden"
                style={{ height: isFullscreen ? 'calc(100vh - 65px)' : height }}
            >
                {hasLoadError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[var(--bg-surface)]">
                        <AlertCircle size={32} className="text-amber-500 mb-2" />
                        <h4 className="font-display font-bold text-sm text-[var(--text-primary)]">
                            Embedded preview blocked by provider
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] max-w-sm mt-1 mb-4 leading-relaxed">
                            Some external providers restrict iframe embedding. You can view or download the file directly:
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 rounded bg-[#C59B27] text-[#12161F] font-mono text-xs font-bold uppercase inline-flex items-center gap-1.5"
                            >
                                <span>Open Source</span>
                                <ExternalLink size={12} />
                            </a>
                            <button
                                onClick={() => {
                                    setProxyMode(proxyMode === 'stream' ? 'google' : 'stream');
                                    setHasLoadError(false);
                                }}
                                className="px-3 py-2 rounded border border-[var(--border)] font-mono text-xs font-semibold inline-flex items-center gap-1.5 hover:text-[#C59B27]"
                            >
                                <RefreshCw size={12} />
                                <span>{proxyMode === 'stream' ? 'Try Google Proxy' : 'Try Edge Stream Proxy'}</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <iframe
                        src={embedUrl}
                        title={title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        onError={() => setHasLoadError(true)}
                    />
                )}
            </div>
        </div>
    );
};
