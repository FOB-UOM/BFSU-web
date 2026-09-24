'use client';

import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { 
    GraduationCap, 
    Building2, 
    BookOpen, 
    HeartHandshake, 
    ArrowUpRight, 
    Search,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { 
    academicPortals, 
    semesterTimetables, 
    academicCalendarConfig, 
    campusFacilities, 
    unionContactChannels 
} from '../data/linksData';
import { departmentsData } from '../data/departmentsData';

export const UsefulLinksPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    // Accordion expand/collapse state for all directory categories
    const [openSections, setOpenSections] = useState({
        lms: true,
        departments: true,
        registry: true,
        student_services: true,
    });

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

    // Build directory dynamically from centralized configuration (Zero Hardcoding)
    const directoryData = [
        {
            key: 'lms',
            id: 'lms',
            title: "Virtual Learning & LMS Portals",
            code: "SEC-01",
            icon: GraduationCap,
            count: academicPortals.length,
            description: "Primary digital instruction environments, course enrollment repositories, and official lecture notes.",
            items: academicPortals
        },
        {
            key: 'departments',
            id: 'departments',
            title: "Academic Departments & Undergraduate Division",
            code: "SEC-02",
            icon: Building2,
            count: departmentsData.length + 1,
            description: "Official University of Moratuwa department portals and the standalone Undergraduate Studies Division.",
            items: [
                ...departmentsData.map(dept => ({
                    tag: `DEPT CODE: ${dept.code}`,
                    title: `${dept.name} (${dept.specializationTitle})`,
                    sub: dept.undergraduate.focus,
                    url: dept.portalUrl,
                    targetUrl: dept.portalUrl.replace(/^https?:\/\//, '')
                })),
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
                    title: academicCalendarConfig.title,
                    sub: "Session schedules, term commencements, study leave, and examination periods.",
                    url: academicCalendarConfig.portalUrl,
                    targetUrl: "uom.lk/calendar"
                },
                {
                    tag: "TIMETABLES",
                    title: "Undergraduate Timetables Portal",
                    sub: `Direct schedules across Intakes (${semesterTimetables.length} live document schedules available).`,
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
            count: campusFacilities.length,
            description: "Digital research repositories, campus healthcare, counseling, and union ombudsman services.",
            items: campusFacilities
        }
    ];

    // Filter directory sections and items based on search query and category
    const filteredDirectory = directoryData
        .filter(section => selectedCategory === 'all' || section.id === selectedCategory)
        .map(section => {
            if (!searchQuery.trim()) return section;
            const q = searchQuery.toLowerCase();
            const matchedItems = section.items.filter(item => 
                item.title.toLowerCase().includes(q) ||
                item.sub.toLowerCase().includes(q) ||
                item.tag.toLowerCase().includes(q) ||
                item.targetUrl.toLowerCase().includes(q)
            );
            return {
                ...section,
                items: matchedItems,
                count: matchedItems.length
            };
        })
        .filter(section => section.items.length > 0);

    const totalMatches = filteredDirectory.reduce((sum, sec) => sum + sec.items.length, 0);

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                
                {/* Header */}
                <div className="max-w-3xl mb-12 sm:mb-16">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-3">
                        Digital Ledger & Institutional Directory
                    </span>
                    <Typography variant="h1" className="mb-6 !font-extrabold !text-3xl sm:!text-5xl text-[var(--text-primary)] tracking-tight">
                        Useful Links & Academic Portals
                    </Typography>
                    <p className="text-base sm:text-xl text-[#2D3748] dark:text-[#CBD5E1] leading-relaxed font-medium">
                        The comprehensive index of virtual learning systems, departmental hubs, academic calendar archives, examination timetables, and student welfare facilities across the University of Moratuwa.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="mb-10 p-6 border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        {/* Search Input */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E9BB0]" size={16} />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search LMS, Department, Calendar, Library..."
                                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F5] dark:bg-[var(--bg-elevated)] border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] placeholder-[#8E9BB0] focus:outline-none focus:border-[#C59B27] transition-colors"
                            />
                        </div>

                        {/* Expand / Collapse Controls */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-end font-mono text-xs font-bold">
                            <button 
                                onClick={expandAll}
                                className="px-3 py-1.5 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#C59B27] transition-colors"
                            >
                                Expand All
                            </button>
                            <button 
                                onClick={collapseAll}
                                className="px-3 py-1.5 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#C59B27] transition-colors"
                            >
                                Collapse All
                            </button>
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 whitespace-nowrap transition-colors border ${
                                    selectedCategory === cat.id
                                        ? 'bg-[#C59B27] text-white border-[#C59B27] font-bold shadow-xs'
                                        : 'bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[#C59B27] hover:text-[var(--text-primary)]'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Active Match Stats */}
                    {searchQuery && (
                        <div className="font-mono text-xs text-[#566072] dark:text-[#8E9BB0] pt-2 border-t border-[var(--border)] flex justify-between items-center">
                            <span>Found {totalMatches} portal {totalMatches === 1 ? 'match' : 'matches'} for "{searchQuery}"</span>
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="text-[#C59B27] hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>

                {/* Directory Accordion Sections */}
                <div className="space-y-6">
                    {filteredDirectory.map((section) => {
                        const Icon = section.icon;
                        const isExpanded = openSections[section.key];

                        return (
                            <div 
                                key={section.key} 
                                className="border border-[var(--border)] rounded-sm overflow-hidden bg-[var(--bg-surface)] shadow-xs transition-colors"
                            >
                                {/* Section Header Accordion Trigger */}
                                <button
                                    onClick={() => toggleSection(section.key)}
                                    className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 bg-[#F4F2EC]/40 dark:bg-[#111622]/40 hover:bg-[#F4F2EC]/80 dark:hover:bg-[#111622]/80 transition-colors border-b border-[var(--border)]"
                                >
                                    <div className="flex items-start sm:items-center gap-4">
                                        <div className="p-3 bg-[#C59B27]/10 text-[#C59B27] rounded-sm mt-0.5 sm:mt-0 flex-shrink-0">
                                            <Icon size={22} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="font-mono text-[10px] font-bold text-[#C59B27] tracking-widest uppercase">
                                                    [{section.code}]
                                                </span>
                                                <span className="font-mono text-xs font-semibold text-[#8E9BB0]">
                                                    {section.count} {section.count === 1 ? 'Resource' : 'Resources'}
                                                </span>
                                            </div>
                                            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
                                                {section.title}
                                            </h2>
                                            <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] mt-1 hidden sm:block max-w-2xl">
                                                {section.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-2 border border-[var(--border)] text-[#566072] dark:text-[#8E9BB0] hover:text-[#C59B27] transition-colors rounded-sm flex-shrink-0">
                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                </button>

                                {/* Accordion Content */}
                                {isExpanded && (
                                    <div className="divide-y divide-[var(--border)] bg-[var(--bg-surface)]">
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
                                                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-[#4A5364] dark:text-[#94A3B8] leading-relaxed">
                                                        {item.sub}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[#C59B27] flex-shrink-0 self-start md:self-auto pt-2 md:pt-0">
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
                <div className="mt-12 p-6 border border-[var(--border)] bg-[#F4F2EC]/30 dark:bg-[var(--bg-surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#566072] dark:text-[#8E9BB0]">
                    <span>Institutional Registry & Gateway • University of Moratuwa</span>
                    <a 
                        href={unionContactChannels.administrationPortalUrl} 
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
