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
    ChevronUp,
    Landmark,
    ShieldCheck,
    ExternalLink,
    FileText,
    Calendar,
    Eye,
    X
} from 'lucide-react';
import { UniversalDocumentEmbedder } from '../components/collaboration/UniversalDocumentEmbedder';
import { GatedAcademicDriveCard } from '../components/collaboration/GatedAcademicDriveCard';

const defaultCalendarConfig = {
    title: "Official Academic Calendar (2025/2026 Academic Year)",
    portalUrl: "https://uom.lk/business/undergraduate-studies/academic-calendar",
    keyDates: [
        { label: "Semester Commencement", date: "August 18, 2025" },
        { label: "Mid-Semester Recess", date: "October 13 – 17, 2025" },
        { label: "End-Semester Examinations", date: "December 08 – 23, 2025" },
        { label: "Vacation & Grade Publication", date: "December 24 – January 11, 2026" }
    ]
};

export const UsefulLinksPage = ({
    academicPortals = [],
    semesterTimetables = [],
    academicCalendarConfig = defaultCalendarConfig,
    campusFacilities = [],
    centralUniversityEntities = [],
    departmentsData = []
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeTimetableModal, setActiveTimetableModal] = useState(null);
    
    // Accordion expand/collapse state for all directory categories
    const [openSections, setOpenSections] = useState({
        lms: true,
        departments: true,
        registry: true,
        student_services: true,
        authorities: true,
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
            authorities: true,
        });
    };

    const collapseAll = () => {
        setOpenSections({
            lms: false,
            departments: false,
            registry: false,
            student_services: false,
            authorities: false,
        });
    };

    const categories = [
        { id: 'all', label: 'All Portals' },
        { id: 'lms', label: 'Virtual Learning' },
        { id: 'departments', label: 'Academic Departments' },
        { id: 'registry', label: 'Examinations & Registry' },
        { id: 'student_services', label: 'Student Welfare & Library' },
        { id: 'authorities', label: 'Central Authorities & Roles' },
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
                ...departmentsData.map(dept => {
                    const portal = dept.portalUrl || dept.portal_url || `https://uom.lk/business/${dept.slug || dept.code?.toLowerCase() || ''}`;
                    return {
                        tag: `DEPT CODE: ${dept.code || 'DEPT'}`,
                        title: `${dept.name} ${dept.specializationTitle || dept.specialization_title ? `(${dept.specializationTitle || dept.specialization_title})` : ''}`,
                        sub: dept.undergraduate?.focus || dept.description || "Official Departmental Division and Academic Programs.",
                        url: portal,
                        targetUrl: portal.replace(/^https?:\/\//, '')
                    };
                }),
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
                    targetUrl: "uom.lk/timetables",
                    isTimetableSection: true,
                    timetables: semesterTimetables
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
            title: "University Facilities & Central Student Services",
            code: "SEC-04",
            icon: HeartHandshake,
            count: campusFacilities.length,
            description: "Central UoM research library, campus healthcare center, student welfare & counseling, sports division, and CGU.",
            items: campusFacilities
        },
        {
            key: 'authorities',
            id: 'authorities',
            title: "Central University Authorities, Custodians & Key Student Touchpoints",
            code: "SEC-05",
            icon: Landmark,
            count: centralUniversityEntities.length,
            isAuthorities: true,
            description: "Governance, support authorities, and student touchpoints for CITES, Central Library, Medical Board, Welfare, Sports, and CGU.",
            items: centralUniversityEntities.map(entity => ({
                tag: `LEVEL 0 • ${entity.code}`,
                title: entity.name,
                sub: `Institutional Scope: ${entity.scope}`,
                url: entity.primaryUrl,
                targetUrl: entity.primaryUrl.replace(/^https?:\/\//, ''),
                scope: entity.scope,
                roles: entity.keyRoles,
                touchpoints: entity.touchpoints,
                isAuthorityCard: true
            }))
        }
    ];

    // Filter directory sections and items based on search query and category
    const filteredDirectory = directoryData
        .filter(section => selectedCategory === 'all' || section.id === selectedCategory)
        .map(section => {
            if (!searchQuery.trim()) return section;
            const q = searchQuery.toLowerCase();
            const matchedItems = section.items.filter(item => {
                const matchesBase = 
                    item.title.toLowerCase().includes(q) ||
                    (item.sub && item.sub.toLowerCase().includes(q)) ||
                    (item.tag && item.tag.toLowerCase().includes(q)) ||
                    (item.targetUrl && item.targetUrl.toLowerCase().includes(q));
                
                const matchesRoles = item.roles && item.roles.some(r => 
                    r.role.toLowerCase().includes(q) || 
                    r.responsibility.toLowerCase().includes(q)
                );

                const matchesTouchpoints = item.touchpoints && item.touchpoints.some(t =>
                    t.title.toLowerCase().includes(q) ||
                    t.url.toLowerCase().includes(q)
                );

                return matchesBase || matchesRoles || matchesTouchpoints;
            });
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

                {/* Gated Faculty Master Academic Drive & Past Papers Hub */}
                <div className="mb-10">
                    <GatedAcademicDriveCard />
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
                                    className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 bg-[var(--bg-subtle)]/50 hover:bg-[var(--bg-subtle)] transition-colors border-b border-[var(--border)]"
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
                                        {section.items.map((item, itemIdx) => {
                                            if (item.isAuthorityCard) {
                                                return (
                                                    <div 
                                                        key={itemIdx}
                                                        className="p-5 sm:p-6 hover:bg-[#F4F2EC]/40 dark:hover:bg-[#111622]/40 transition-colors"
                                                    >
                                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                                            <div className="max-w-2xl">
                                                                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                                                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#C59B27] bg-[#C59B27]/10 px-2 py-0.5 rounded-sm">
                                                                        {item.tag}
                                                                    </span>
                                                                    <span className="font-mono text-[11px] text-[#8E9BB0]">
                                                                        {item.targetUrl}
                                                                    </span>
                                                                    <span className="text-[11px] font-semibold text-[#566072] dark:text-[#94A3B8]">
                                                                        • {item.scope}
                                                                    </span>
                                                                </div>
                                                                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                                                                    {item.title}
                                                                </h3>
                                                            </div>

                                                            <a
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] hover:underline self-start md:self-auto flex-shrink-0"
                                                            >
                                                                <span>Official Portal</span>
                                                                <ArrowUpRight size={13} />
                                                            </a>
                                                        </div>

                                                        {/* Custodians & Key Roles */}
                                                        {item.roles && item.roles.length > 0 && (
                                                            <div className="mt-3 pt-3 border-t border-[var(--border)]">
                                                                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#566072] dark:text-[#8E9BB0] block mb-2">
                                                                    Custodians & Responsibilities
                                                                </span>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                                                    {item.roles.map((r, rIdx) => (
                                                                        <div 
                                                                            key={rIdx}
                                                                            className="p-2.5 rounded-sm border border-[var(--border)] bg-[#FAF9F5] dark:bg-[var(--bg-elevated)]/60 text-xs"
                                                                        >
                                                                            <span className="font-bold text-[var(--text-primary)] block mb-0.5">
                                                                                {r.role}
                                                                            </span>
                                                                            <span className="text-[var(--text-secondary)] text-[11px] leading-tight block">
                                                                                {r.responsibility}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Direct Student Touchpoints */}
                                                        {item.touchpoints && item.touchpoints.length > 0 && (
                                                            <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                                                                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#566072] dark:text-[#8E9BB0] mr-1">
                                                                    Direct Touchpoints:
                                                                </span>
                                                                {item.touchpoints.map((tp, tpIdx) => (
                                                                    <a
                                                                        key={tpIdx}
                                                                        href={tp.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-medium border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--gold)] hover:text-[var(--gold)] text-[var(--text-primary)] transition-colors shadow-2xs"
                                                                    >
                                                                        <span>{tp.title}</span>
                                                                        <ExternalLink size={10} className="opacity-70" />
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            if (item.isTimetableSection) {
                                                return (
                                                    <div 
                                                        key={itemIdx}
                                                        className="p-5 sm:p-6 hover:bg-[#F4F2EC]/40 dark:hover:bg-[#111622]/40 transition-colors"
                                                    >
                                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                                            <div className="max-w-2xl">
                                                                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                                                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#C59B27] bg-[#C59B27]/10 px-2 py-0.5 rounded-sm">
                                                                        [{item.tag}]
                                                                    </span>
                                                                    <span className="font-mono text-[11px] text-[#8E9BB0]">
                                                                        {item.targetUrl}
                                                                    </span>
                                                                </div>
                                                                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                                                                    {item.title}
                                                                </h3>
                                                                <p className="text-xs sm:text-sm text-[#4A5364] dark:text-[#94A3B8] leading-relaxed mt-1">
                                                                    {item.sub}
                                                                </p>
                                                            </div>
                                                            <a
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] hover:underline self-start md:self-auto flex-shrink-0"
                                                            >
                                                                <span>UGS Portal</span>
                                                                <ArrowUpRight size={13} />
                                                            </a>
                                                        </div>

                                                        {/* Individual Intake Schedules with Instant Preview */}
                                                        {item.timetables && item.timetables.length > 0 && (
                                                            <div className="mt-4 pt-4 border-t border-[var(--border)]">
                                                                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#566072] dark:text-[#8E9BB0] block mb-2.5">
                                                                    Interactive Cohort Timetable Schedules:
                                                                </span>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                                    {item.timetables.map((tt, ttIdx) => (
                                                                        <div 
                                                                            key={ttIdx}
                                                                            className="p-3 rounded-lg border border-[var(--border)] bg-[#FAF9F5] dark:bg-[var(--bg-elevated)]/60 flex flex-col justify-between gap-2.5 hover:border-[#C59B27]/40 transition-colors"
                                                                        >
                                                                            <div>
                                                                                <span className="font-mono text-[10px] text-[#C59B27] font-semibold block">
                                                                                    {tt.batch}
                                                                                </span>
                                                                                <h4 className="text-xs font-bold text-[var(--text-primary)] line-clamp-1 mt-0.5">
                                                                                    {tt.title}
                                                                                </h4>
                                                                            </div>
                                                                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border)]/60 font-mono text-[11px]">
                                                                                <button
                                                                                    onClick={() => setActiveTimetableModal(tt)}
                                                                                    className="text-[#C59B27] hover:underline font-bold inline-flex items-center gap-1"
                                                                                >
                                                                                    <Eye size={12} />
                                                                                    <span>Preview</span>
                                                                                </button>
                                                                                <a
                                                                                    href={tt.url}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
                                                                                >
                                                                                    <span>PDF</span>
                                                                                    <ArrowUpRight size={11} />
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            return (
                                                <a
                                                    key={itemIdx}
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
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
                                            );
                                        })}
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
                        href="https://uom.lk/business" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#C59B27] hover:underline font-bold inline-flex items-center gap-1"
                    >
                        <span>Faculty Administration (uom.lk/business)</span>
                        <ArrowUpRight size={12} />
                    </a>
                </div>

                {/* Interactive Timetable & Document Preview Modal */}
                {activeTimetableModal && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
                        <div className="max-w-5xl w-full bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
                            <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-elevated)]/60 flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#C59B27] block">
                                        Academic Timetable & Schedule Reader
                                    </span>
                                    <h3 className="font-display font-bold text-base text-[var(--text-primary)] truncate">
                                        {activeTimetableModal.title}
                                    </h3>
                                    <span className="font-mono text-[11px] text-[var(--text-muted)] block">
                                        {activeTimetableModal.batch}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setActiveTimetableModal(null)}
                                    className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
                                    title="Close Reader"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
                                <UniversalDocumentEmbedder
                                    url={activeTimetableModal.url}
                                    title={activeTimetableModal.title}
                                    description={activeTimetableModal.batch}
                                    preferredMode="embed"
                                    height="680px"
                                />
                            </div>
                        </div>
                    </div>
                )}

            </Container>
        </main>
    );
};
