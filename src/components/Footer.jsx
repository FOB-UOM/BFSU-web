import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[#FAF9F5] text-[var(--text-primary)] border-t border-[var(--border)] pt-14 pb-12 transition-colors">
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
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#566072] font-semibold block">
                                    Faculty of Business • Moratuwa
                                </span>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-[#4B5563] leading-relaxed mb-6 max-w-sm">
                            The constitutional student union of the Faculty of Business, University of Moratuwa.
                        </p>
                        
                        {/* Official Social Presence Channel Block */}
                        <div className="pt-2">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-2.5">
                                Official Digital Channels
                            </span>
                            <div className="flex items-center gap-2.5">
                                <a 
                                    href="https://www.linkedin.com/company/bfsu-uom" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-3 py-1.5 bg-[var(--bg-surface)] hover:bg-[#C59B27] hover:text-white text-[var(--text-primary)] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 border border-[var(--border)] shadow-sm rounded-sm"
                                >
                                    <span>LinkedIn</span>
                                    <ArrowUpRight size={11} />
                                </a>
                                <a 
                                    href="https://facebook.com/bfsu.uom" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-3 py-1.5 bg-[var(--bg-surface)] hover:bg-[#C59B27] hover:text-white text-[var(--text-primary)] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 border border-[var(--border)] shadow-sm rounded-sm"
                                >
                                    <span>Facebook</span>
                                    <ArrowUpRight size={11} />
                                </a>
                                <a 
                                    href="https://youtube.com/@bfsu_uom" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-3 py-1.5 bg-[var(--bg-surface)] hover:bg-[#C59B27] hover:text-white text-[var(--text-primary)] font-mono text-[11px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 border border-[var(--border)] shadow-sm rounded-sm"
                                >
                                    <span>YouTube</span>
                                    <ArrowUpRight size={11} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-4">
                            Navigation
                        </span>
                        <ul className="space-y-2 font-mono text-xs font-semibold text-[#4B5563]">
                            <li><a href="/" className="hover:text-[#C59B27] transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-[#C59B27] transition-colors">About & Council</a></li>
                            <li><a href="/explore" className="hover:text-[#C59B27] transition-colors">Explore Campus</a></li>
                            <li><a href="/news" className="hover:text-[#C59B27] transition-colors">Notices</a></li>
                            <li><a href="/links" className="hover:text-[#C59B27] transition-colors">Useful Links</a></li>
                            <li><a href="/alumni" className="hover:text-[#C59B27] transition-colors">Alumni</a></li>
                            <li><a href="/research" className="hover:text-[#C59B27] transition-colors">Research & Projects</a></li>
                        </ul>
                    </div>

                    {/* Portals */}
                    <div className="lg:col-span-3">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-4">
                            Direct Portals
                        </span>
                        <ul className="space-y-2 font-mono text-xs font-semibold text-[#4B5563]">
                            <li><a href="https://online.uom.lk" target="_blank" rel="noreferrer" className="hover:text-[#C59B27] transition-colors flex items-center justify-between"><span>Moodle LMS</span><ArrowUpRight size={12} className="text-[#C59B27]" /></a></li>
                            <li><a href="https://lms.uom.lk" target="_blank" rel="noreferrer" className="hover:text-[#C59B27] transition-colors flex items-center justify-between"><span>Faculty LMS</span><ArrowUpRight size={12} className="text-[#C59B27]" /></a></li>
                            <li><a href="https://uom.lk/lib" target="_blank" rel="noreferrer" className="hover:text-[#C59B27] transition-colors flex items-center justify-between"><span>Library Catalog</span><ArrowUpRight size={12} className="text-[#C59B27]" /></a></li>
                            <li><a href="https://uom.lk/business" target="_blank" rel="noreferrer" className="hover:text-[#C59B27] transition-colors flex items-center justify-between"><span>Faculty Portal</span><ArrowUpRight size={12} className="text-[#C59B27]" /></a></li>
                        </ul>
                    </div>

                    {/* Advocacy / Contact */}
                    <div className="lg:col-span-3">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-4">
                            Help Desk & Ombudsman
                        </span>
                        <p className="text-xs font-medium text-[#4B5563] mb-4 leading-relaxed">
                            Confidential academic inquiries, student welfare notices, and direct union advocacy.
                        </p>
                        <a 
                            href="https://forms.gle/uPNxwgi6P3wp8HAA8"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block py-2.5 px-4 bg-[#C59B27] text-[var(--text-primary)] font-mono font-bold tracking-[0.16em] uppercase text-[11px] hover:bg-[#DDB748] transition-colors rounded-sm shadow-sm"
                        >
                            Contact Union Desk &rarr;
                        </a>
                    </div>

                </div>

                {/* Bottom Colophon */}
                <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[11px] font-semibold text-[#566072]">
                    <div>
                        &copy; {new Date().getFullYear()} Business Faculty Students' Union • University of Moratuwa.
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="https://uom.lk/business" target="_blank" rel="noreferrer" className="hover:text-[#C59B27] transition-colors">
                            uom.lk/business
                        </a>
                        <a href="https://uom.lk" target="_blank" rel="noreferrer" className="hover:text-[#C59B27] transition-colors">
                            uom.lk
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
