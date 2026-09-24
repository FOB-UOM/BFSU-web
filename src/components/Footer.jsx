import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { facultySocialLinks, academicPortals, unionContactChannels } from '../data/linksData';

export const Footer = () => {
    return (
        <footer className="bg-[#FAF9F5] dark:bg-[var(--bg-elevated)] text-[var(--text-primary)] border-t border-[var(--border)] pt-14 pb-12 transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
                    
                    {/* Faculty Brand */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/images/logo.png" alt="BFSU Logo" className="w-9 h-9 object-contain" />
                            <div>
                                <span className="font-extrabold text-base tracking-tight text-[var(--text-primary)] block">
                                    BFSU <span className="text-[#C59B27] font-mono text-xs uppercase font-bold">UoM</span>
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#566072] dark:text-[#94A3B8] font-semibold block">
                                    Faculty of Business • Moratuwa
                                </span>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed mb-6 max-w-sm">
                            The constitutional student union of the Faculty of Business, University of Moratuwa.
                        </p>
                        
                        {/* Official Social Presence Channel Block */}
                        <div className="pt-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-2.5">
                                Official Digital Channels
                            </span>
                            <div className="flex flex-wrap items-center gap-2.5">
                                {facultySocialLinks.map((social, idx) => (
                                    <a 
                                        key={idx}
                                        href={social.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="px-3 py-1.5 bg-[var(--bg-surface)] hover:bg-[#C59B27] hover:text-white text-[var(--text-primary)] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 border border-[var(--border)] shadow-xs rounded-sm"
                                    >
                                        <span>{social.platform}</span>
                                        <ArrowUpRight size={11} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-4">
                            Navigation
                        </span>
                        <ul className="space-y-2 font-mono text-xs font-semibold text-[#4B5563] dark:text-[#94A3B8]">
                            <li><Link href="/" className="hover:text-[#C59B27] transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-[#C59B27] transition-colors">About & Council</Link></li>
                            <li><Link href="/explore" className="hover:text-[#C59B27] transition-colors">Explore Campus</Link></li>
                            <li><Link href="/news" className="hover:text-[#C59B27] transition-colors">Notices</Link></li>
                            <li><Link href="/links" className="hover:text-[#C59B27] transition-colors">Useful Links</Link></li>
                            <li><Link href="/alumni" className="hover:text-[#C59B27] transition-colors">Alumni</Link></li>
                            <li><Link href="/research" className="hover:text-[#C59B27] transition-colors">Research & Projects</Link></li>
                            <li><Link href="/capabilities" className="hover:text-[#C59B27] text-[#C59B27] font-bold transition-colors flex items-center gap-1"><span>•</span><span>Platform Matrix</span></Link></li>
                        </ul>
                    </div>

                    {/* Portals */}
                    <div className="lg:col-span-3">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-4">
                            Direct Portals
                        </span>
                        <ul className="space-y-2 font-mono text-xs font-semibold text-[#4B5563] dark:text-[#94A3B8]">
                            {academicPortals.map((portal) => (
                                <li key={portal.id}>
                                    <a 
                                        href={portal.url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="hover:text-[#C59B27] transition-colors flex items-center justify-between"
                                    >
                                        <span>{portal.title}</span>
                                        <ArrowUpRight size={12} className="text-[#C59B27]" />
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a 
                                    href={unionContactChannels.administrationPortalUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="hover:text-[#C59B27] transition-colors flex items-center justify-between"
                                >
                                    <span>Faculty Portal</span>
                                    <ArrowUpRight size={12} className="text-[#C59B27]" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Advocacy / Contact */}
                    <div className="lg:col-span-3">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-4">
                            Help Desk & Ombudsman
                        </span>
                        <p className="text-xs font-medium text-[#4B5563] dark:text-[#94A3B8] mb-4 leading-relaxed">
                            Confidential academic inquiries, student welfare notices, and direct union advocacy.
                        </p>
                        <a 
                            href={unionContactChannels.feedbackFormUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block py-2.5 px-4 bg-[#C59B27] text-[#001738] font-mono font-bold tracking-[0.16em] uppercase text-[11px] hover:brightness-110 transition-all rounded-sm shadow-xs"
                        >
                            Contact Union Desk &rarr;
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#566072] dark:text-[#94A3B8]">
                    <span>&copy; {new Date().getFullYear()} Faculty of Business Students' Union (BFSU), University of Moratuwa. All rights reserved.</span>
                    <div className="flex items-center gap-6">
                        <Link href="/about#mandate" className="hover:text-[#C59B27] transition-colors">Constitutional Charter</Link>
                        <Link href="/explore#room" className="hover:text-[#C59B27] transition-colors">Union Room</Link>
                        <Link href="/capabilities" className="hover:text-[#C59B27] transition-colors">Architecture</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
