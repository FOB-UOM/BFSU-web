'use client';

import React, { useState } from 'react';
import { Calendar, Clock, ArrowUpRight, X, FileText, Download } from 'lucide-react';

const DEFAULT_CALENDAR = {
    title: "Faculty Academic Calendar (Academic Year 2026)",
    term: "Semester 1 & 2 Sessions",
    portalUrl: "https://uom.lk/business",
    keyDates: [
        { label: "Semester 1 Commencement", date: "February 2026", status: "Active" },
        { label: "Mid-Semester Recess", date: "April 2026", status: "Scheduled" },
        { label: "Final Examination Window", date: "June 2026", status: "Scheduled" },
        { label: "Semester 2 Commencement", date: "August 2026", status: "Scheduled" }
    ]
};

export const QuickLinksSection = ({ portals = [], timetables = [] }) => {
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [timetableModalOpen, setTimetableModalOpen] = useState(false);

    const activeTimetables = Array.isArray(timetables) && timetables.length > 0 ? timetables : [
        {
            title: "Exam TimeTable Sem 1, 3 (Resumed)",
            batch: "All Batches • Examination Division",
            doc_type: "PDF Document",
            file_url: "https://uom.lk/business/undergraduate-studies"
        }
    ];

    const quickLinks = [
        {
            id: 1,
            title: "Academic Calendar",
            category: "Term Dates",
            action: () => setCalendarModalOpen(true),
            isModal: true
        },
        {
            id: 2,
            title: "Lecture Timetables",
            category: "Schedules",
            action: () => setTimetableModalOpen(true),
            isModal: true
        },
        {
            id: 3,
            title: "University Library",
            category: "Resources",
            url: "https://uom.lk/lib",
            isModal: false
        },
        {
            id: 4,
            title: "Moodle & LMS",
            category: "E-Learning",
            url: "https://online.uom.lk",
            isModal: false
        },
        {
            id: 5,
            title: "Useful Links",
            category: "Directory",
            url: "/links",
            isModal: false
        }
    ];

    return (
        <section id="quick-links" className="border-b border-[var(--border)] bg-transparent py-14 sm:py-16 transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-[var(--border)] gap-2">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                        Student Portals & Schedules
                    </h2>
                    <span className="font-mono text-xs text-[#566072] dark:text-[#8E9BB0] uppercase tracking-wider font-semibold">
                        Direct University Services
                    </span>
                </div>

                {/* 5 Clean Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    {quickLinks.map((item, idx) => {
                        if (item.isModal) {
                            return (
                                <button
                                    key={item.id}
                                    onClick={item.action}
                                    className="text-left group p-5 border border-[var(--border)] bg-[#F4F2EC]/50 dark:bg-[var(--bg-surface)] hover:border-[#C59B27] dark:hover:border-[#C59B27] transition-all duration-200 flex flex-col justify-between"
                                >
                                    <div className="flex items-center justify-between font-mono text-[10px] text-[#566072] dark:text-[#8E9BB0] uppercase tracking-widest mb-4 font-bold">
                                        <span>0{idx + 1}</span>
                                        <span>{item.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-display text-base font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="font-mono text-[10px] text-[#C59B27] uppercase tracking-wider font-semibold">[In-App]</span>
                                    </div>
                                </button>
                            );
                        }

                        return (
                            <a
                                key={item.id}
                                href={item.url}
                                target={item.url.startsWith('http') ? '_blank' : '_self'}
                                rel="noreferrer"
                                className="group p-5 border border-[var(--border)] bg-[#F4F2EC]/50 dark:bg-[var(--bg-surface)] hover:border-[#C59B27] dark:hover:border-[#C59B27] transition-all duration-200 flex flex-col justify-between"
                            >
                                <div className="flex items-center justify-between font-mono text-[10px] text-[#566072] dark:text-[#8E9BB0] uppercase tracking-widest mb-4 font-bold">
                                    <span>0{idx + 1}</span>
                                    <span>{item.category}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display text-base font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors">
                                        {item.title}
                                    </h3>
                                    <ArrowUpRight size={15} className="opacity-40 group-hover:opacity-100 group-hover:text-[#C59B27] transition-all" />
                                </div>
                            </a>
                        );
                    })}
                </div>

            </div>

            {/* In-App Academic Calendar Modal */}
            {calendarModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--bg-surface)] border border-[var(--border)] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-[var(--border)]">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-1">
                                    Official Faculty Schedule
                                </span>
                                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                                    {DEFAULT_CALENDAR.title}
                                </h3>
                            </div>
                            <button 
                                onClick={() => setCalendarModalOpen(false)}
                                className="p-1 text-[#566072] hover:text-[#12161F] dark:text-[#94A3B8] dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="divide-y divide-[var(--border)] mb-6 max-h-[50vh] overflow-y-auto">
                            {DEFAULT_CALENDAR.keyDates.map((row, idx) => (
                                <div key={idx} className="py-3 flex justify-between items-center text-sm font-body">
                                    <div>
                                        <div className="font-bold text-[var(--text-primary)]">{row.label}</div>
                                        <div className="font-mono text-xs text-[#566072] dark:text-[#8E9BB0]">{row.date}</div>
                                    </div>
                                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#C59B27]/10 text-[#C59B27]">
                                        Scheduled
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
                            <span className="font-mono text-[11px] text-[#566072] dark:text-[#8E9BB0]">
                                Faculty of Business • UoM Senate
                            </span>
                            <a 
                                href={DEFAULT_CALENDAR.portalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] hover:underline inline-flex items-center gap-1"
                            >
                                <span>Official Calendar Portal</span>
                                <ArrowUpRight size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* In-App Timetables Modal */}
            {timetableModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--bg-surface)] border border-[var(--border)] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-[var(--border)]">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-1">
                                    Undergraduate Studies Division
                                </span>
                                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                                    Official Lecture & Exam Timetables
                                </h3>
                            </div>
                            <button 
                                onClick={() => setTimetableModalOpen(false)}
                                className="p-1 text-[#566072] hover:text-[#12161F] dark:text-[#94A3B8] dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="divide-y divide-[var(--border)] mb-6 max-h-[50vh] overflow-y-auto">
                            {activeTimetables.map((row, idx) => (
                                <div key={idx} className="py-3.5 flex justify-between items-center text-sm font-body gap-4">
                                    <div>
                                        <div className="font-bold text-[var(--text-primary)] hover:text-[#C59B27] transition-colors">
                                            {row.title}
                                        </div>
                                        <div className="font-mono text-xs text-[#566072] dark:text-[#8E9BB0] mt-0.5">
                                            {row.batch} • <span className="text-[#C59B27]">{row.doc_type || 'Document'}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={row.file_url || row.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 hover:border-[#C59B27] transition-colors"
                                    >
                                        <span>Download</span>
                                        <Download size={12} />
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
                            <span className="font-mono text-[11px] text-[#566072] dark:text-[#8E9BB0]">
                                Direct Undergraduate Studies Division Files
                            </span>
                            <a 
                                href="https://uom.lk/business/undergraduate-studies"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] hover:underline inline-flex items-center gap-1"
                            >
                                <span>Undergraduate Portal</span>
                                <ArrowUpRight size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
