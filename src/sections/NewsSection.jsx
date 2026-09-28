import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bell } from 'lucide-react';
import { UserAvatar } from '../components/UserAvatar';

export const NewsSection = ({ news = [] }) => {
    const items = Array.isArray(news) ? news : [];
    const leadNotice = items[0] || null;
    const secondaryNotices = items.slice(1, 3);

    return (
        <section id="notices" className="border-b border-[var(--border)] bg-transparent py-16 sm:py-20 transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--border)] pb-4">
                    <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                            Official Notices & Governance
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                            Circulars & Announcements
                        </h2>
                    </div>
                    <Link 
                        href="/news"
                        className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-1.5 mt-4 md:mt-0 transition-colors"
                    >
                        <span>Archive Ledger</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>

                {items.length === 0 ? (
                    <div className="p-12 text-center border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm">
                        <Bell size={28} className="mx-auto text-[#C59B27] mb-3 opacity-60" />
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">No Active Circulars</h3>
                        <p className="text-sm text-[var(--text-secondary)]">The secretariat has not published new circulars for this session term.</p>
                    </div>
                ) : (
                    /* Grid Spread */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        
                        {/* Primary Highlight Notice */}
                        {leadNotice && (
                            <div className="lg:col-span-7 border border-[var(--border)] bg-[var(--bg-surface)] p-8 sm:p-10 shadow-sm rounded-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-[#C59B27] text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-widest rounded-sm">
                                            {leadNotice.label || 'Official Circular'}
                                        </span>
                                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                                            SEC / 2026
                                        </span>
                                    </div>

                                    <span className="font-mono text-xs text-[#4B5563] dark:text-[#9CA3AF] block mb-3 font-semibold">
                                        {leadNotice.date}
                                    </span>
                                    
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] leading-snug mb-4 hover:text-[#C59B27] transition-colors tracking-tight">
                                        <Link href={`/news/${leadNotice.slug || leadNotice.id}`}>
                                            {leadNotice.title}
                                        </Link>
                                    </h3>

                                    <p className="text-base sm:text-lg font-medium text-[var(--text-secondary)] leading-relaxed mb-8">
                                        {leadNotice.brief}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-[var(--border)] flex justify-between items-center font-mono text-xs">
                                    <div className="flex items-center gap-2">
                                        <UserAvatar name={leadNotice.author || "BFSU Secretariat"} size="xs" peekable={false} />
                                        <span className="uppercase tracking-[0.2em] text-[#4B5563] dark:text-[#9CA3AF] font-bold">
                                            {leadNotice.author || "BFSU Secretariat"}
                                        </span>
                                    </div>
                                    <Link 
                                        href={`/news/${leadNotice.slug || leadNotice.id}`}
                                        className="font-bold uppercase tracking-[0.2em] text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-2"
                                    >
                                        <span>Read Circular</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Secondary Notices Column */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                            {secondaryNotices.map((item) => (
                                <div 
                                    key={item.id}
                                    className="p-8 border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm shadow-sm flex flex-col justify-between h-full hover:border-[#C59B27]/60 transition-colors"
                                >
                                    <div>
                                        <div className="flex items-center justify-between font-mono text-xs text-[#4B5563] dark:text-[#9CA3AF] mb-4 font-semibold">
                                            <span className="uppercase text-[#C59B27] font-bold tracking-wider">[{item.label || 'Notice'}]</span>
                                            <span>{item.date}</span>
                                        </div>

                                        <h4 className="text-xl font-bold text-[var(--text-primary)] leading-snug mb-3 hover:text-[#C59B27] transition-colors tracking-tight">
                                            <Link href={`/news/${item.slug || item.id}`}>
                                                {item.title}
                                            </Link>
                                        </h4>

                                        <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed mb-6">
                                            {item.brief}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-[var(--border)] flex justify-end font-mono text-xs">
                                        <Link 
                                            href={`/news/${item.slug || item.id}`}
                                            className="font-bold uppercase tracking-[0.18em] text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-1.5"
                                        >
                                            <span>Full Dossier</span>
                                            <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}

            </div>
        </section>
    );
};
