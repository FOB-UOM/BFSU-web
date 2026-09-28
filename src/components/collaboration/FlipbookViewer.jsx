'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    Maximize2, 
    Minimize2, 
    ZoomIn, 
    ZoomOut, 
    Download, 
    Share2, 
    BookOpen,
    Copy,
    Check,
    RotateCcw
} from 'lucide-react';

/**
 * FlipbookViewer
 * 
 * Elegant, interactive page-turning flipbook reader for:
 * - Faculty magazines (e.g. Business Pulse, Echo)
 * - Annual reports and Union review volumes
 * - Symposium proceedings & brochures
 * 
 * Works with an array of page images, or a fallback preview for single PDFs.
 */
export const FlipbookViewer = ({
    title = 'Document Flipbook',
    subtitle = 'Interactive Publication Reader',
    pages = [], // Array of image URLs representing pages
    pdfUrl = '',
    totalPagesCount = null,
    className = ''
}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [isFlipping, setIsFlipping] = useState(false);
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);

    // If pages array is not provided, generate a sensible page representation or placeholder
    const pageList = pages.length > 0 ? pages : [pdfUrl];
    const totalPages = totalPagesCount || pageList.length || 1;

    const handleNext = () => {
        if (currentPage < totalPages - 1 && !isFlipping) {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
                setIsFlipping(false);
            }, 300);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0 && !isFlipping) {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentPage(prev => Math.max(prev - 1, 0));
                setIsFlipping(false);
            }, 300);
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    };

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, totalPages, isFullscreen, isFlipping]);

    return (
        <div 
            ref={containerRef}
            className={`rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-2xl flex flex-col overflow-hidden relative transition-all duration-300 ${
                isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : className
            }`}
        >
            {/* Top Toolbar */}
            <div className="p-4 sm:p-5 border-b border-[var(--border)] bg-[var(--bg-elevated)]/60 flex items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[#C59B27]/10 text-[#C59B27] shrink-0">
                        <BookOpen size={18} />
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-display text-sm font-bold text-[var(--text-primary)] truncate">
                            {title}
                        </h4>
                        <span className="font-mono text-[10px] text-[var(--text-muted)] block truncate">
                            {subtitle} • Page {currentPage + 1} of {totalPages}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <button
                        onClick={() => setZoom(prev => Math.min(prev + 0.2, 2))}
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                        title="Zoom In"
                    >
                        <ZoomIn size={14} />
                    </button>
                    <button
                        onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.8))}
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                        title="Zoom Out"
                    >
                        <ZoomOut size={14} />
                    </button>
                    <button
                        onClick={() => setZoom(1)}
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                        title="Reset Zoom"
                    >
                        <RotateCcw size={14} />
                    </button>

                    <div className="h-4 w-[1px] bg-[var(--border)] mx-1" />

                    <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                        title="Copy Share Link"
                    >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                    </button>

                    {pdfUrl && (
                        <a
                            href={pdfUrl}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                            title="Download Original Publication"
                        >
                            <Download size={14} />
                        </a>
                    )}

                    <button
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:text-[#C59B27] transition-colors"
                        title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                    >
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>

            {/* Reading Canvas Area (Simulated 3D Book Spine) */}
            <div className="flex-1 min-h-[460px] sm:min-h-[580px] bg-neutral-900/90 relative flex items-center justify-center p-4 overflow-hidden select-none">
                {/* Book Stage */}
                <div 
                    className="relative max-w-4xl w-full h-full flex items-center justify-center transition-transform duration-200"
                    style={{ transform: `scale(${zoom})` }}
                >
                    {/* Shadow & Book Spine */}
                    <div className="relative shadow-2xl rounded-lg overflow-hidden border border-white/10 bg-white max-h-[520px] sm:max-h-[640px] aspect-[3/4] flex items-center justify-center">
                        {pages.length > 0 && pages[currentPage] ? (
                            <img 
                                src={pages[currentPage]} 
                                alt={`Page ${currentPage + 1}`} 
                                className={`w-full h-full object-contain transition-opacity duration-300 ${
                                    isFlipping ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                                }`} 
                            />
                        ) : (
                            <div className="p-8 text-center text-neutral-800 space-y-3">
                                <BookOpen size={48} className="mx-auto text-[#C59B27]" />
                                <h3 className="font-display font-bold text-lg">{title}</h3>
                                <p className="text-xs text-neutral-500 max-w-sm">
                                    Interactive Flipbook Reader for Faculty Publications. Use the page controls below to navigate through the document.
                                </p>
                                {pdfUrl && (
                                    <a
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#C59B27] text-white text-xs font-bold"
                                    >
                                        <span>Open Full Document</span>
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Page Edge Lighting Effect */}
                        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Left Page Turn Button */}
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all ${
                        currentPage === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 shadow-lg'
                    }`}
                    title="Previous Page (Left Arrow)"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Right Page Turn Button */}
                <button
                    onClick={handleNext}
                    disabled={currentPage >= totalPages - 1}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all ${
                        currentPage >= totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 shadow-lg'
                    }`}
                    title="Next Page (Right Arrow)"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Bottom Scrubber & Navigation Bar */}
            <div className="p-3 sm:p-4 border-t border-[var(--border)] bg-[var(--bg-elevated)]/60 flex items-center justify-between gap-4 font-mono text-xs">
                <span className="text-[var(--text-muted)] text-[11px]">
                    Flip: Page {currentPage + 1} / {totalPages}
                </span>

                {/* Slider Scrubber */}
                <div className="flex-1 max-w-md mx-4">
                    <input
                        type="range"
                        min="0"
                        max={totalPages - 1}
                        value={currentPage}
                        onChange={(e) => setCurrentPage(Number(e.target.value))}
                        className="w-full h-1.5 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[#C59B27]"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className="px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] disabled:opacity-40 hover:border-[#C59B27] transition-colors"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage >= totalPages - 1}
                        className="px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] disabled:opacity-40 hover:border-[#C59B27] transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
