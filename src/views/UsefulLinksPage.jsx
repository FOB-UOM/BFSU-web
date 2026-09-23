'use client';

import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { 
    ChevronDown, 
    ArrowUpRight, 
    GraduationCap, 
    BookOpen, 
    Building2, 
    ShieldCheck, 
    HeartHandshake, 
    Search, 
    ExternalLink,
    Maximize2,
    Minimize2
} from 'lucide-react';

export const UsefulLinksPage = () => {
    const [openSections, setOpenSections] = useState({
        lms: true,
        departments: true,
        registry: true,
        student_services: true,
    });

    const [activeFilter, setActiveFilter] = useState('all');

    const toggleSection = (key) => {
        setOpenSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const expandAll = () => {
        setOpenSections({
            lms: true,
            departments: true,
            registry: true,
            student_services: true,
        });
    };

    const collapseAll = () => {
        setOpenSections({
            lms: false,
            departments: false,
            registry: false,
            student_services: false,
        });
    };

    const categories = [
        { id: 'all', label: 'All Portals' },
        { id: 'lms', label: 'Virtual Learning' },
        { id: 'departments', label: 'Academic Departments' },
        { id: 'registry', label: 'Examinations & Registry' },
        { id: 'student_services', label: 'Student Welfare & Library' },
    ];

    const directoryData = [
        {
            key: 'lms',
            id: 'lms',
            title: "Virtual Learning & LMS Portals",
            code: "SEC-01",
            icon: GraduationCap,
            count: 3,
            description: "Primary digital instruction environments, course enrollment repositories, and official lecture notes.",
            items: [
                {
                    tag: "DAILY ACADEMIC",
                    title: "Moodle UoM Portal",
                    sub: "Course modules, lecture notes, tutorial uploads, and assignment submissions.",
                    url: "https://online.uom.lk",
                    targetUrl: "online.uom.lk"
                },
                {
                    tag: "FACULTY LMS",
                    title: "Faculty LMS (lms.uom.lk)",
                    sub: "Official university learning management system, semester course enrolments, and assessment tracking.",
                    url: "https://lms.uom.lk",
                    targetUrl: "lms.uom.lk"
                },
                {
                    tag: "CENTRAL IT",
                    title: "CITES Student Portal",
                    sub: "University email administration, network credentials, and campus Wi-Fi access management.",
                    url: "https://uom.lk/cites",
                    targetUrl: "uom.lk/cites"
                }
            ]
        },
        {
            key: 'departments',
            id: 'departments',
            title: "Academic Departments & Undergraduate Division",
            code: "SEC-02",
            icon: Building2,
            count: 4,
            description: "Official University of Moratuwa department portals and the standalone Undergraduate Studies Division.",
            items: [
                {
                    tag: "DEPT CODE: DS",
                    title: "Department of Decision Sciences (Business Analytics)",
                    sub: "Specialized curriculum in machine learning, operations research, data engineering, and business analytics.",
                    url: "https://uom.lk/ds",
                    targetUrl: "uom.lk/ds"
                },
                {
                    tag: "DEPT CODE: MOT",
                    title: "Department of Management of Technology (BPM)",
                    sub: "Enterprise systems, technology management, business process architecture, and innovation.",
                    url: "https://uom.lk/mot",
                    targetUrl: "uom.lk/mot"
                },
                {
                    tag: "DEPT CODE: IM",
                    title: "Department of Industrial Management (FSM)",
                    sub: "Financial services management, financial engineering, econometric modelling, and corporate governance.",
                    url: "https://uom.lk/im",
                    targetUrl: "uom.lk/im"
                },
                {
                    tag: "DIVISION PORTAL",
                    title: "Undergraduate Studies Division (UGS)",
                    sub: "Central undergraduate administration, official examination timetables, and academic deadlines.",
                    url: "https://uom.lk/business/undergraduate-studies",
                    targetUrl: "uom.lk/business/undergraduate-studies"
                }
            ]
        },
        {
            key: 'registry',
            id: 'registry',
            title: "Examinations, Calendar & Academic Registry",
            code: "SEC-03",
            icon: BookOpen,
            count: 3,
            description: "Official academic calendar deadlines, semester schedules, and examination division notices.",
            items: [
                {
                    tag: "OFFICIAL CALENDAR",
                    title: "Faculty Academic Calendar",
                    sub: "Session schedules, term commencements, study leave, and examination periods.",
                    url: "https://uom.lk/business/undergraduate-studies/academic-calendar",
                    targetUrl: "uom.lk/calendar"
                },
                {
                    tag: "TIMETABLES",
                    title: "Undergraduate Timetables Portal",
                    sub: "Direct schedules for Intakes 2022, 2023, 2024, and 2025 across all levels.",
                    url: "https://uom.lk/business/undergraduate-studies",
                    targetUrl: "uom.lk/timetables"
                },
                {
                    tag: "CENTRAL DIVISION",
                    title: "UoM Examinations Division",
                    sub: "Admission card releases, repeat exam applications, and official degree conferment circulars.",
                    url: "https://uom.lk/examinations",
                    targetUrl: "uom.lk/examinations"
                }
            ]
        },
        {
            key: 'student_services',
            id: 'student_services',
            title: "Faculty Library & Welfare Services",
            code: "SEC-04",
            icon: HeartHandshake,
            count: 3,
            description: "Digital research repositories, campus healthcare, counseling, and union ombudsman services.",
            items: [
                {
                    tag: "DIGITAL LIBRARY",
                    title: "UoM Central Library & E-Repository",
                    sub: "Access to IEEE Xplore, JSTOR, ScienceDirect, and the institutional thesis repository.",
                    url: "https://uom.lk/lib",
                    targetUrl: "uom.lk/lib"
                },
                {
                    tag: "SCHOLARLY ARCHIVE",
                    title: "Moratuwa Digital E-Theses (DL Lib)",
                    sub: "Undergraduate and postgraduate dissertations, faculty research papers, and technical reports.",
                    url: "http://dl.lib.mrt.ac.lk/",
                    targetUrl: "dl.lib.mrt.ac.lk"
                },
                {
                    tag: "STUDENT OMBUDSMAN",
                    title: "BFSU Student Grievance & Help Desk",
                    sub: "Union administrative assistance, academic accommodation requests, and welfare coordination.",
                    url: "https://forms.gle/uPNxwgi6P3wp8HAA8",
                    targetUrl: "bfsu.uom/help-desk"
                }
            ]
        }
    ];

    const filteredSections = activeFilter === 'all'
        ? directoryData
        : directoryData.filter(sec => sec.key === activeFilter);

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                
                {/* Header */}
                <div className="max-w-3xl mb-10">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-3">
                        Campus Directory & Systems Index
                    </span>
                    <Typography variant="h1" className="mb-4 !font-display !font-bold !text-3xl sm:!text-5xl text-[var(--text-primary)] ">
                        Useful Links & Portals
                    </Typography>
                    <p className="font-body text-base sm:text-lg text-[#333C4D] font-medium leading-relaxed">
                        Structured architectural breakdown of all official learning management systems, academic departments, examination divisions, and welfare utilities across the University of Moratuwa.
                    </p>
                </div>

                {/* Horizontal Navigation Chips & Collapse Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--border)]">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                        className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all border ${activeFilter === cat.id ? "bg-[#12161F] dark:bg-[var(--bg-surface)] text-white dark:text-[var(--text-primary)] border-[#12161F] dark:border-white shadow-sm" : "bg-[#F4F2ECS/60 dark:bg-white/5 text-[#566072] dark:text-[#8E9BB0] border-[var(--border)] hover:border-[#C59B27]"}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs text-[#566072] dark:text-[#8E9BB0]">
                        <button 
                            onClick={expandAll}
                            className="hover:text-[#C59B27] inline-flex items-center gap-1 transition-colors uppercase font-bold text-[11px]"
                        >
                            <Maximize2 size={12} />
                            <span>Expand All</span>
                        </button>
                        <span>|</span>
                        <button 
                            onClick={collapseAll}
                            className="hover:text-[#C59B27] inline-flex items-center gap-1 transition-colors uppercase font-bold text-[11px]"
                        >
                            <Minimize2 size={12} />
                            <span>Collapse</span>
                        </button>
                    </div>
                </div>

                {/* Topic Breakdown Ledger Accordions */}
                <div className="space-y-6">
                    {filteredSections.map((section) => {
                        const isExpanded = openSections[section.key];
                        const Icon = section.icon;

                        return (
                            <div 
                                key={section.key} 
                                id={section.id}
                                className="border border-[var(--border)] bg-transparent  overflow-hidden transition-all duration-200 scroll-mt-24"
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleSection(section.key)}
                                    className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 bg-[#F4F2EC]/40 /40 hover:bg-[#F4F2EC] dark:hover:bg-[#141A28] transition-colors"
                                >
                                    <div className="flex items-start sm:items-center gap-4">
                                        <div className="p-2.5 bg-[var(--bg-surface)]  border border-[var(--border)] text-[#C59B27] flex-shrink-0">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C59B27] font-bold">
                                                    [{section.code}]
                                                </span>
                                                <span className="font-mono text-[10px] text-[#566072] dark:text-[#8E9BB0]">
                                                    • {section.count} Official Portals
                                                </span>
                                            </div>
                                            <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] ">
                                                {section.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 flex-shrink-0 pt-1 sm:pt-0">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#566072] dark:text-[#8E9BB0] hidden md:inline">
                                            {isExpanded ? 'Hide Details' : 'View Portals'}
                                        </span>
                                        <ChevronDown 
                                            size={18} 
                                     className={`text-[#566072] dark:text-[#8E9BB0] transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#C59B27]' : ''}`}
                                        />
                                    </div>
                                </button>

                                {/* Accordion Content: Architectural Horizontal Ledger Rows */}
                                {isExpanded && (
                                    <div className="divide-y divide-[#E5E2DA] dark:divide-[#1E2534] bg-[var(--bg-surface)] ">
                                        {section.items.map((item, itemIdx) => (
                                            <a
                                                key={itemIdx}
                                                href={item.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F4F2EC]/60 dark:hover:bg-[#111622]/60 transition-colors"
                                            >
                                                <div className="max-w-2xl">
                                                    <div className="flex items-center gap-2.5 mb-1.5">
                                                        <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#C59B27]">
                                                            [{item.tag}]
                                                        </span>
                                                        <span className="font-mono text-[11px] text-[#8E9BB0] group-hover:text-[#566072] dark:group-hover:text-[#A6B4C9] transition-colors">
                                                            {item.targetUrl}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)]  group-hover:text-[#C59B27] transition-colors mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="font-body text-xs sm:text-sm text-[#4A5364] leading-relaxed">
                                                        {item.sub}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]  group-hover:text-[#C59B27] flex-shrink-0 self-start md:self-auto pt-2 md:pt-0">
                                                    <span className="border-b border-transparent group-hover:border-[#C59B27] transition-all">Launch Portal</span>
                                                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footnote */}
                <div className="mt-12 p-6 border border-[var(--border)] bg-[#F4F2EC]/30 /30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#566072] dark:text-[#8E9BB0]">
                    <span>Institutional Registry & Gateway • University of Moratuwa</span>
                    <a 
                        href="https://uom.lk/business" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[#C59B27] hover:underline font-bold inline-flex items-center gap-1"
                    >
                        <span>Faculty Administration (uom.lk/business)</span>
                        <ArrowUpRight size={12} />
                    </a>
                </div>

            </Container>
        </main>
    );
};


