'use client';

import React, { useState } from 'react';
import { Calendar, Clock, ArrowUpRight, X, FileText, Download } from 'lucide-react';

export const QuickLinksSection = () => {
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);
    const [timetableModalOpen, setTimetableModalOpen] = useState(false);

    // Real UoM Faculty of Business Deadlines and Schedules
    const academicCalendarData = [
        { term: "Semester 1 (Academic Session 2026)", dates: "26 Jan 2026 – 15 May 2026", status: "Ongoing" },
        { term: "Mid-Semester Academic Recess", dates: "06 Apr 2026 – 17 Apr 2026", status: "Upcoming" },
        { term: "Study & Preparation Leave", dates: "18 May 2026 – 29 May 2026", status: "Scheduled" },
        { term: "End-of-Semester Examinations", dates: "01 Jun 2026 – 26 Jun 2026", status: "Scheduled" },
        { term: "Semester Vacation & Industrial Practicum", dates: "29 Jun 2026 – 24 Jul 2026", status: "Scheduled" },
        { term: "Semester 2 Commencement", dates: "27 Jul 2026", status: "Scheduled" },
    ];

    // Real Scraped UoM Timetables & Schedules from Undergraduate Studies Division
    const timetableData = [
        { 
            title: "Exam TimeTable Sem 1, 3 (July 2026 Resumed)", 
            batch: "All Batches • Examination Division", 
            type: "PDF Document",
            link: "https://uom.lk/sites/default/files/business/files/Exam%20TimeTable%20Sem%201%2C3%202026%20July%20Resume%20Stduents%20View_0.pdf" 
        },
        { 
            title: "Updated Timetable — Intake 2022 (Semester 08)", 
            batch: "Intake 2022 • Level 4", 
            type: "PDF Document",
            link: "https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202022%20Semester%2008_0.pdf" 
        },
        { 
            title: "Updated Timetable — Intake 2023 (Semester 06)", 
            batch: "Intake 2023 • Level 3", 
            type: "PDF Document",
            link: "https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202023%20Semester%2006_0.pdf" 
        },
        { 
            title: "Updated Timetable — Intake 2024 (Semester 04)", 
            batch: "Intake 2024 • Level 2", 
            type: "PDF Document",
            link: "https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202024%20Semester%2004_0.pdf" 
        },
        { 
            title: "Updated Timetable — Intake 2025 (Semester 02)", 
            batch: "Intake 2025 • Level 1", 
            type: "PDF Document",
            link: "https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202025%20Semester%2002_0.pdf" 
        },
        { 
            title: "Semester Deadlines Schedule (Intakes 2020–2024)", 
            batch: "Academic Registry Division", 
            type: "DOCX Schedule",
            link: "https://uom.lk/sites/default/files/business/files/Semester%20Deadlines%20Inatke%202020-2024_0.docx" 
        },
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
            title: "Faculty Library",
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
        <section id="quick-links" className="border-b border-[var(--border)] bg-transparent  py-14 sm:py-16 transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-[var(--border)] gap-2">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] ">
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
                                    className="text-left group p-5 border border-[var(--border)] bg-[#F4F2EC]/50 /50 hover:border-[#C59B27] dark:hover:border-[#C59B27] transition-all duration-200 flex flex-col justify-between"
                                >
                                    <div className="flex items-center justify-between font-mono text-[10px] text-[#566072] dark:text-[#8E9BB0] uppercase tracking-widest mb-4 font-bold">
                                        <span>0{idx + 1}</span>
                                        <span>{item.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-display text-base font-bold text-[var(--text-primary)]  group-hover:text-[#C59B27] transition-colors">
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
                                className="group p-5 border border-[var(--border)] bg-[#F4F2EC]/50 /50 hover:border-[#C59B27] dark:hover:border-[#C59B27] transition-all duration-200 flex flex-col justify-between"
                            >
                                <div className="flex items-center justify-between font-mono text-[10px] text-[#566072] dark:text-[#8E9BB0] uppercase tracking-widest mb-4 font-bold">
                                    <span>0{idx + 1}</span>
                                    <span>{item.category}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display text-base font-bold text-[var(--text-primary)]  group-hover:text-[#C59B27] transition-colors">
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
                    <div className="bg-transparent dark:bg-[#FAF9F5] border border-[var(--border)] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-[var(--border)]">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-1">
                                    Official Faculty Schedule
                                </span>
                                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] ">
                                    Academic Calendar • Session 2026
                                </h3>
                            </div>
                            <button 
                                onClick={() => setCalendarModalOpen(false)}
                                className="p-1 text-[#566072] hover:text-[#12161F] dark:text-[#94A3B8] dark:hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="divide-y divide-[#E5E2DA] dark:divide-[#1E2534] mb-6 max-h-[50vh] overflow-y-auto">
                            {academicCalendarData.map((row, idx) => (
                                <div key={idx} className="py-3 flex justify-between items-center text-sm font-body">
                                    <div>
                                        <div className="font-bold text-[var(--text-primary)] ">{row.term}</div>
                                        <div className="font-mono text-xs text-[#566072] dark:text-[#8E9BB0]">{row.dates}</div>
                                    </div>
                                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#C59B27]/10 text-[#C59B27]">
                                        {row.status}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
                            <span className="font-mono text-[11px] text-[#566072] dark:text-[#8E9BB0]">
                                Faculty of Business • UoM Senate
                            </span>
                            <a 
                                href="https://uom.lk/business/undergraduate-studies/academic-calendar"
                                target="_blank"
                                rel="noreferrer"
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
                    <div className="bg-transparent dark:bg-[#FAF9F5] border border-[var(--border)] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-[var(--border)]">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-1">
                                    Undergraduate Studies Division
                                </span>
                                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] ">
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

                        <div className="divide-y divide-[#E5E2DA] dark:divide-[#1E2534] mb-6 max-h-[50vh] overflow-y-auto">
                            {timetableData.map((row, idx) => (
                                <div key={idx} className="py-3.5 flex justify-between items-center text-sm font-body gap-4">
                                    <div>
                                        <div className="font-bold text-[var(--text-primary)]  hover:text-[#C59B27] transition-colors">
                                            {row.title}
                                        </div>
                                        <div className="font-mono text-xs text-[#566072] dark:text-[#8E9BB0] mt-0.5">
                                            {row.batch} • <span className="text-[#C59B27]">{row.type}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={row.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="shrink-0 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]  hover:text-[#C59B27] inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 hover:border-[#C59B27] transition-colors"
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
                                rel="noreferrer"
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



