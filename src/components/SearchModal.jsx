'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpRight, BookOpen, Calendar, Clock, GraduationCap, Users } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');

    const searchIndex = [
        { title: "Moodle UoM (online.uom.lk)", category: "LMS", url: "https://online.uom.lk", desc: "Daily course materials and tutorial submissions" },
        { title: "LearnOrg System (lms.uom.lk)", category: "Registry", url: "https://lms.uom.lk", desc: "Official module registrations, enrollments and results" },
        { title: "UoM Webmail & Microsoft 365", category: "Email", url: "https://webmail.uom.lk", desc: "Official @uom.lk inbox, Teams and cloud OneDrive" },
        { title: "CITES Student Portal", category: "IT Services", url: "https://uom.lk/cites", desc: "Network credentials, Wi-Fi and IT helpdesk" },
        { title: "Department of Decision Sciences (DS)", category: "Departments", url: "https://uom.lk/ds", desc: "Business Analytics" },
        { title: "Department of Management of Technology (MOT)", category: "Departments", url: "https://uom.lk/mot", desc: "Business Process Management (BPM)" },
        { title: "Department of Industrial Management (IM)", category: "Departments", url: "https://uom.lk/im", desc: "Financial Services Management (FSM)" },
        { title: "Undergraduate Studies Division (UGS)", category: "Academic Division", url: "https://uom.lk/business/undergraduate-studies", desc: "Curriculum, performance bylaws & lecture halls" },
        { title: "Academic Calendar", category: "Schedules", url: "/links", desc: "Semester dates, recesses and exam windows" },
        { title: "Lecture Timetables", category: "Schedules", url: "https://uom.lk/business/undergraduate-studies", desc: "Intake 2022–2025 schedules" },
        { title: "University Library", category: "Research", url: "https://uom.lk/lib", desc: "Central UoM books, study rooms and digital catalog" },
        { title: "University Health Centre", category: "Health", url: "https://uom.lk/health", desc: "Campus medical clinic and medical board certificates" },
        { title: "Student Welfare Division", category: "Welfare", url: "https://uom.lk/welfare", desc: "Hostel allocations and Mahapola scholarships" },
        { title: "Career Guidance Unit (CGU)", category: "Career", url: "https://uom.lk/cgu", desc: "Corporate recruitment and industry placements" },
        { title: "E-Theses Repository", category: "Research", url: "http://dl.lib.mrt.ac.lk/", desc: "Past undergraduate dissertations" },
        { title: "Student Help Desk & Ombudsman", category: "Support", url: "https://forms.gle/uPNxwgi6P3wp8HAA8", desc: "Confidential union student advocacy" },
        { title: "Alumni Network & Fellowship", category: "Community", url: "/alumni", desc: "Graduate mentorship and corporate placements" },
        { title: "Official Circulars & Notices", category: "News", url: "/news", desc: "Secretariat announcements" },
        { title: "Research & Project Showcase", category: "Research", url: "/research", desc: "Undergraduate research publications" },
        { title: "Union Council & Officials", category: "Governance", url: "/about", desc: "Elected student representatives" },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) onClose();
                else window.dispatchEvent(new CustomEvent('open-search'));
            }
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const filtered = query.trim() === '' 
        ? searchIndex.slice(0, 7)
        : searchIndex.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
          );

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] max-w-2xl w-full shadow-2xl rounded-sm overflow-hidden">
                {/* Search Bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
                    <Search size={18} className="text-[#C59B27]" />
                    <input 
                        type="text"
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Moodle, Timetables, Departments, Notices... (ESC to exit)"
                        className="bg-transparent border-none outline-none font-mono text-sm w-full text-[var(--text-primary)] placeholder-[var(--text-faint)]"
                    />
                    <button onClick={onClose} className="p-1 text-[var(--text-faint)] hover:text-[var(--text-primary)] transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Results List */}
                <div className="max-h-[60vh] overflow-y-auto divide-y divide-[var(--border)]">
                    {filtered.length === 0 ? (
                        <div className="p-8 text-center font-mono text-xs text-[var(--text-muted)]">
                            No resources matching "{query}".
                        </div>
                    ) : (
                        filtered.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.url}
                                target={item.url.startsWith('http') ? '_blank' : '_self'}
                                rel="noreferrer"
                                onClick={onClose}
                                className="p-4 px-6 flex items-center justify-between hover:bg-[var(--bg-elevated)] transition-colors group block"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[#C59B27]/10 text-[#C59B27] font-semibold">
                                            {item.category}
                                        </span>
                                        <h4 className="font-display text-base font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <p className="font-body text-xs text-[var(--text-muted)]">
                                        {item.desc}
                                    </p>
                                </div>
                                <ArrowUpRight size={14} className="text-[var(--text-faint)] group-hover:text-[#C59B27] transition-colors" />
                            </a>
                        ))
                    )}
                </div>

                {/* Footer status */}
                <div className="px-5 py-2.5 bg-[var(--bg-subtle)] border-t border-[var(--border)] flex justify-between items-center font-mono text-[10px] text-[var(--text-faint)]">
                    <span>Pro-tip: Press <kbd className="px-1 py-0.5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded text-[var(--text-muted)]">⌘</kbd> + <kbd className="px-1 py-0.5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded text-[var(--text-muted)]">K</kbd> anywhere</span>
                    <span>BFSU Search Index</span>
                </div>
            </div>
        </div>
    );
};

