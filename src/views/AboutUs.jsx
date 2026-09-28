'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { UserAvatar } from '../components/UserAvatar';
import { NotionHubWidget } from '../components/NotionHubWidget';
import { unionNotionConfig } from '../data/societiesData';
import { departmentsData, decennialConfig } from '../data/departmentsData';
import { deanOfficeData } from '../data/facultyAdministrationData';
import { pastFacultyDeans } from '../lib/data/facultyStaffConstants';
import { unionPillars, pastLeadershipSessions, facultyCharter } from '../data/leadershipHistoryData';
import { 
    Shield, 
    BookOpen, 
    Users, 
    Compass, 
    Award, 
    Building2, 
    GraduationCap, 
    History,
    ArrowUpRight,
    ExternalLink
} from 'lucide-react';

const ICON_MAP = {
    Shield,
    BookOpen,
    Users,
    Building2,
    GraduationCap
};

export const AboutUs = ({ 
    councilMembers = [], 
    batchReps = [], 
    platformMaintainers = [], 
    entityMilestones = [] 
}) => {
    // Current Union Leadership live synced from Notion & Supabase database
    const activeCouncil = Array.isArray(councilMembers) ? councilMembers : [];
    const officials = activeCouncil.filter(m => (m.priority || 99) <= 8);
    const committeeMembers = activeCouncil.filter(m => (m.priority || 99) > 8);
    const isLive = activeCouncil.length > 0;

    // Active Batch Representatives
    const reps = Array.isArray(batchReps) ? batchReps : [];
    const repsByDept = {
        DS: reps.filter(r => r.deptCode === 'DS'),
        MOT: reps.filter(r => r.deptCode === 'MOT'),
        IM: reps.filter(r => r.deptCode === 'IM')
    };

    // Platform Maintainers
    const maintainers = Array.isArray(platformMaintainers) ? platformMaintainers : [];

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                
                {/* 1. Header */}
                <div className="max-w-3xl mb-16">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-3">
                        Institutional Governance & Legacy
                    </span>
                    <Typography variant="h1" className="mb-6 !font-extrabold !text-3xl sm:!text-5xl text-[var(--text-primary)] tracking-tight">
                        Faculty, Union & Leadership Continuity
                    </Typography>
                    <p className="text-base sm:text-xl text-[#2D3748] dark:text-[#CBD5E1] leading-relaxed font-medium">
                        The comprehensive institutional hierarchy of the {facultyCharter.facultyName}, the statutory Business Faculty Students' Union, and the continuity of elected leaders and distinguished alumni.
                    </p>
                </div>

                {/* 2. SECTION 01: The Faculty of Business, University of Moratuwa */}
                <section id="faculty" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [ACADEMIC FOUNDATION & DEANERY]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                01. Faculty of Business
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            EST. {facultyCharter.establishedYear} • {facultyCharter.universityName.toUpperCase()}
                        </span>
                    </div>

                    <div className="p-8 border border-[var(--border)] bg-[var(--bg-surface)] mb-8 shadow-sm rounded-sm">
                        <div className="max-w-4xl">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                                Vision & Institutional Charter
                            </h3>
                            <p className="text-base font-medium text-[#2D3748] dark:text-[#CBD5E1] leading-relaxed mb-6">
                                {facultyCharter.vision}
                            </p>
                        </div>

                        {/* Office of the Dean & Faculty Executive Leadership */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FAF9F5] to-white dark:from-[#111622] dark:to-[#171E2E] border border-[var(--border)] mb-8 shadow-xs">
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-[#C59B27]/15 text-[#C59B27] border border-[#C59B27]/30">
                                            APEX FACULTY DEANERY
                                        </span>
                                        <span className="font-mono text-[10px] text-[var(--text-muted)]">
                                            {deanOfficeData.termLabel}
                                        </span>
                                    </div>

                                    <Link href="/u/prof-gayithri-kuruppu" className="group/dean inline-block">
                                        <h4 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] group-hover/dean:text-[#C59B27] transition-colors mb-1">
                                            {deanOfficeData.currentDean}
                                        </h4>
                                    </Link>
                                    <span className="text-xs font-semibold text-[#C59B27] block mb-3">
                                        {deanOfficeData.title} • {deanOfficeData.tenureOrder}
                                    </span>

                                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                                        {deanOfficeData.governanceScope}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                                        <span>📍 {deanOfficeData.officeLocation}</span>
                                        <a href={`mailto:${deanOfficeData.email}`} className="text-[#C59B27] hover:underline">
                                            ✉️ {deanOfficeData.email}
                                        </a>
                                        <span>📞 {deanOfficeData.telephone}</span>
                                        <Link href="/u/prof-gayithri-kuruppu" className="text-[#C59B27] hover:underline font-bold inline-flex items-center gap-0.5">
                                            <span>Full Academic Profile &rarr;</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Dean's Secretariat & Administration */}
                                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]/60 max-w-sm shrink-0 text-xs">
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#C59B27] font-bold block mb-1">
                                        Dean's Secretariat & Administration
                                    </span>
                                    <Link href="/u/pushpa-mallika" className="group/ar inline-block">
                                        <span className="font-bold text-[var(--text-primary)] group-hover/ar:text-[#C59B27] transition-colors block text-sm mb-0.5">
                                            {deanOfficeData.secretariat.assistantRegistrar}
                                        </span>
                                    </Link>
                                    <span className="text-[11px] text-[var(--text-muted)] block mb-2">
                                        {deanOfficeData.secretariat.role} ({deanOfficeData.secretariat.extension})
                                    </span>
                                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-3">
                                        {deanOfficeData.secretariat.contactNotes}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`mailto:${deanOfficeData.secretariat.email}`}
                                            className="font-mono text-[11px] font-bold text-[#C59B27] hover:underline"
                                        >
                                            {deanOfficeData.secretariat.email}
                                        </a>
                                        <span className="text-[var(--text-muted)]">•</span>
                                        <a
                                            href={deanOfficeData.portalUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-mono text-[11px] text-[var(--text-secondary)] hover:text-[#C59B27] inline-flex items-center gap-0.5"
                                        >
                                            <span>uom.lk/business</span>
                                            <ArrowUpRight size={10} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Divisions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
                            <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/40 border border-[var(--border)]">
                                <span className="font-mono text-[10px] text-[#C59B27] font-bold uppercase tracking-wider block mb-1">
                                    ACADEMIC DIVISION
                                </span>
                                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                                    Undergraduate Studies (UGS)
                                </h4>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                                    Curriculum oversight, semester timetables, performance bylaws, and exam boards.
                                </p>
                                <a 
                                    href="https://uom.lk/business/undergraduate-studies" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="font-mono text-[11px] font-bold text-[#C59B27] hover:underline inline-flex items-center gap-1"
                                >
                                    UGS Division <ArrowUpRight size={11} />
                                </a>
                            </div>

                            <div className="p-4 rounded-xl bg-[var(--bg-elevated)]/40 border border-[var(--border)]">
                                <span className="font-mono text-[10px] text-[#C59B27] font-bold uppercase tracking-wider block mb-1">
                                    POSTGRADUATE WING
                                </span>
                                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                                    Postgraduate Studies Division
                                </h4>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                                    MBAn, MBA in MOT, and MSc research degree programs for corporate leaders.
                                </p>
                                <a 
                                    href="https://uom.lk/business" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="font-mono text-[11px] font-bold text-[#C59B27] hover:underline inline-flex items-center gap-1"
                                >
                                    Postgraduate Hub <ArrowUpRight size={11} />
                                </a>
                            </div>
                        </div>

                        {/* Historical Deanery Continuity Timeline */}
                        <div className="mt-8 pt-6 border-t border-[var(--border)]">
                            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#566072] dark:text-[#8E9BB0] block mb-3">
                                Deans of the Faculty of Business (Chronological Continuity 2017 – Present)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {pastFacultyDeans.map((d, dIdx) => {
                                    const card = (
                                        <div 
                                            className={`p-3 rounded-xl border text-xs transition-colors h-full ${
                                                d.isCurrent 
                                                    ? 'bg-[#C59B27]/10 border-[#C59B27]/40 shadow-xs' 
                                                    : 'bg-[var(--bg-elevated)]/40 border-[var(--border)] hover:border-[#C59B27]/40'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-mono text-[10px] font-bold text-[#C59B27]">
                                                    {d.order}
                                                </span>
                                                {d.isCurrent && (
                                                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-bold uppercase">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                            <span className="font-bold text-[var(--text-primary)] block truncate mb-0.5 group-hover:text-[#C59B27] transition-colors">
                                                {d.name}
                                            </span>
                                            <span className="font-mono text-[10px] text-[var(--text-muted)] block mb-1">
                                                {d.term}
                                            </span>
                                            <span className="text-[10px] text-[var(--text-secondary)] line-clamp-2 leading-tight">
                                                {d.notableInitiatives}
                                            </span>
                                        </div>
                                    );

                                    return d.username ? (
                                        <Link key={dIdx} href={`/u/${d.username}`} className="group block h-full">
                                            {card}
                                        </Link>
                                    ) : (
                                        <div key={dIdx} className="h-full">
                                            {card}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2.2 SECTION 02: Academic Departments & Departmental Spaces */}
                <section id="departments" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [ACADEMIC DEPARTMENTS]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                02. Academic Departments
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            3 SPECIALIZED DEPARTMENTS
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {departmentsData.map((dept, idx) => (
                            <div 
                                key={idx} 
                                className="p-6 border border-[var(--border)] hover:border-[#C59B27]/50 bg-[var(--bg-surface)] rounded-2xl shadow-sm flex flex-col justify-between transition-all group"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="font-mono text-xs text-[#C59B27] font-bold tracking-widest px-2 py-0.5 rounded bg-[#C59B27]/10 border border-[#C59B27]/20">
                                            [{dept.code}]
                                        </span>
                                        <span className="text-[10px] font-semibold text-[var(--text-muted)]">
                                            {dept.specializationBadge}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#C59B27] transition-colors">
                                        {dept.name}
                                    </h3>
                                    
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                                        {dept.specializationSummary}
                                    </p>

                                    <div className="p-3 rounded-lg bg-[var(--bg-elevated)]/60 border border-[var(--border)] text-xs mb-4">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Head of Department</span>
                                            <span className="text-[10px] font-mono text-[#C59B27]">UoM Appointed</span>
                                        </div>
                                        <span className="font-semibold text-[var(--text-primary)]">{dept.headName}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                                    <Link 
                                        href={`/departments/${dept.slug}`}
                                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5B842] text-[#001738] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:brightness-110 transition-all"
                                    >
                                        <span>Explore Department Space</span>
                                        <ArrowUpRight size={13} />
                                    </Link>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Link 
                                            href={`/societies/${dept.societySlug}`}
                                            className="py-1.5 px-2 rounded-xl border border-[var(--border)] hover:border-[#C59B27]/40 bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors truncate"
                                            title={`Explore ${dept.societyCode} Student Society`}
                                        >
                                            <Users size={11} className="text-[#C59B27] shrink-0" />
                                            <span className="truncate">{dept.societyCode} Society</span>
                                        </Link>

                                        <a 
                                            href={dept.portalUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="py-1.5 px-2 rounded-xl border border-[var(--border)] hover:border-[#C59B27]/40 bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors truncate"
                                            title="Visit official department portal on uom.lk"
                                        >
                                            <span className="truncate">uom.lk portal</span>
                                            <ArrowUpRight size={11} className="shrink-0 opacity-70" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2.5 SECTION 03: Degree Programs & Specializations */}
                <section id="degrees" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [CURRICULUM EXCELLENCE]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                03. Degree Specializations
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            BBSC HONOURS & MASTERS
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {departmentsData.map((dept, idx) => (
                            <div 
                                key={idx} 
                                className="p-6 border border-[var(--border)] hover:border-[#C59B27]/40 bg-[var(--bg-surface)] rounded-sm shadow-sm flex flex-col justify-between transition-all"
                            >
                                <div>
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#C59B27] px-2 py-0.5 bg-[#C59B27]/10 rounded-sm inline-block mb-3">
                                        {dept.specializationBadge}
                                    </span>
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                                        {dept.specializationTitle}
                                    </h3>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                                        {dept.specializationSummary}
                                    </p>
                                    <div className="text-[11px] font-mono text-[#566072] dark:text-[#9CA3AF] space-y-1">
                                        {dept.undergraduate.curriculumHighlights?.map((item, hIdx) => (
                                            <div key={hIdx}>• {item}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 mt-4 border-t border-[var(--border)]">
                                    <a 
                                        href={dept.portalUrl} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-xs font-mono font-bold text-[#C59B27] hover:underline inline-flex items-center gap-1"
                                    >
                                        Official Dept. Portal <ArrowUpRight size={12} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2.6 SECTION 04: 2027 Decennial Milestone */}
                <section id="decennial" className="mb-20 scroll-mt-24">
                    <div className="p-8 border border-[#C59B27]/40 bg-gradient-to-br from-[var(--bg-surface)] to-[#C59B27]/5 rounded-sm shadow-sm relative overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                    [MILESTONE ROADMAP]
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                    04. {decennialConfig.title}
                                </h2>
                                <p className="text-sm font-medium text-[var(--text-secondary)] max-w-2xl mt-2 leading-relaxed">
                                    {decennialConfig.summary}
                                </p>
                            </div>
                            <div className="flex-shrink-0 text-right">
                                <div className="font-mono text-4xl font-extrabold text-[#C59B27]">{decennialConfig.durationText}</div>
                                <span className="font-mono text-[11px] text-[#566072] dark:text-[#9CA3AF] uppercase tracking-widest block">{decennialConfig.spanText}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. SECTION 05: The Business Faculty Students' Union (BFSU) Mandate */}
                <section id="mandate" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                            [STATUTORY MANDATE]
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                            05. Business Faculty Students' Union
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {unionPillars.map((p, idx) => {
                            const Icon = ICON_MAP[p.iconName] || Shield;
                            return (
                                <div 
                                    key={idx} 
                                    className="p-8 border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm shadow-sm flex flex-col justify-between hover:border-[#C59B27]/60 transition-colors"
                                >
                                    <div>
                                        <div className="p-3 w-fit bg-[#C59B27]/10 rounded-sm mb-5">
                                            <Icon size={24} className="text-[#C59B27]" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                                            {p.title}
                                        </h3>
                                        <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed">
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 4. SECTION 06: Current Union Officials & Executive Board (Council) */}
                <section id="council" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [GOVERNING COUNCIL] {isLive && '• LIVE NOTION CARRIER'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                06. Union Officials 2026
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            ELECTED EXECUTIVE COUNCIL
                        </span>
                    </div>

                    <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8 shadow-sm rounded-sm">
                        {officials.length === 0 ? (
                            <div className="p-8 text-center border border-dashed border-[var(--border)] rounded-xl">
                                <p className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider">
                                    Executive Council roster synchronizing with official registry...
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {officials.map((official, idx) => {
                                    const username = official.username || official.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                    const avatarUrl = official.avatar || official.image;

                                    return (
                                        <div 
                                            key={idx} 
                                            className="p-5 border border-[var(--border)] rounded-xl bg-[var(--bg-elevated)]/40 hover:border-[#C59B27]/40 transition-all flex items-start gap-4 group"
                                        >
                                            <UserAvatar
                                                src={avatarUrl}
                                                name={official.name}
                                                size="md"
                                                peekable={true}
                                                username={username}
                                                role="union_exec"
                                                profileData={{
                                                    full_name: official.name,
                                                    username: username,
                                                    avatar_url: avatarUrl,
                                                    role_title: `BFSU ${official.role}`,
                                                    department: official.department ? `Department of ${official.department}` : 'Faculty of Business',
                                                    headline: official.bio || `Elected ${official.role} of the Business Faculty Students' Union (BFSU)`,
                                                    linkedin_url: official.linkedin,
                                                    github_url: official.github,
                                                    email: official.email
                                                }}
                                            />
                                            <div className="min-w-0 flex-1">
                                                <span className="font-mono text-[10px] font-bold text-[#C59B27] uppercase tracking-wider block mb-0.5">
                                                    {official.role}
                                                </span>
                                                <div 
                                                    className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors block truncate cursor-pointer"
                                                >
                                                    {official.name}
                                                </div>
                                                {official.department && (
                                                    <span className="font-mono text-xs text-[var(--text-secondary)] block mt-0.5">
                                                        Dept. of {official.department}
                                                    </span>
                                                )}
                                                {official.email && (
                                                    <span className="font-mono text-[10px] text-[#566072] dark:text-[#9CA3AF] block truncate mt-1">
                                                        {official.email}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {committeeMembers.length > 0 && (
                            <div className="pt-6 border-t border-[var(--border)]">
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-3">
                                    Committee Representatives ({committeeMembers.length})
                                </span>
                                <div className="flex flex-wrap gap-2.5">
                                    {committeeMembers.map((m, idx) => {
                                        const username = m.username || m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                        return (
                                            <div 
                                                key={idx} 
                                                className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] bg-[#F9FAFB] dark:bg-[var(--bg-elevated)] hover:border-[#C59B27]/60 rounded-full transition-all"
                                            >
                                                <UserAvatar
                                                    src={m.avatar || m.image}
                                                    name={m.name}
                                                    size="xs"
                                                    peekable={true}
                                                    username={username}
                                                    profileData={{
                                                        full_name: m.name,
                                                        username: username,
                                                        avatar_url: m.avatar || m.image,
                                                        role_title: 'Committee Representative',
                                                        department: m.department || 'Faculty of Business',
                                                        email: m.email
                                                    }}
                                                />
                                                <span className="truncate">{m.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 5. SECTION 07: Academic Intakes & Department Batch Representatives */}
                <section id="batch-reps" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [ACADEMIC INTAKES & COHORT GOVERNANCE]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                07. Department Batch Representatives
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            2 REPS PER DEPT COHORT
                        </span>
                    </div>

                    <div className="p-8 border border-[var(--border)] bg-[var(--bg-surface)] mb-8 shadow-sm rounded-sm">
                        <div className="max-w-4xl mb-8">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                                Cohort Democratic Representation
                            </h3>
                            <p className="text-base font-medium text-[#2D3748] dark:text-[#CBD5E1] leading-relaxed">
                                Every academic intake (Batch 20, 21, 22, 23, 24) is organized into 3 departmental cohorts across Decision Sciences, Management of Technology, and Industrial Management. Undergraduates elect <strong>2 Batch Representatives per department cohort</strong> bounded to an annual academic term (extendable or reducible in coordination with the Faculty Senate calendar). Batch reps interface directly between undergraduate cohorts, academic departments, and the central union.
                            </p>
                        </div>

                        {/* 3 Department Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Decision Sciences Reps */}
                            <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--bg-elevated)]/20 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
                                        <span className="font-mono text-xs font-bold text-[#C59B27] tracking-wider">
                                            [DS] DECISION SCIENCES
                                        </span>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C59B27]/10 text-[#C59B27]">
                                            2 Reps
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        {(repsByDept.DS || []).map((rep, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[#C59B27]/40 transition-colors">
                                                <UserAvatar 
                                                    src={rep.avatarUrl} 
                                                    name={rep.name} 
                                                    size="sm" 
                                                    peekable={true} 
                                                    username={rep.username}
                                                    profileData={{
                                                        full_name: rep.name,
                                                        username: rep.username,
                                                        avatar_url: rep.avatarUrl,
                                                        role_title: `${rep.batchName} DS Representative`,
                                                        department: 'Department of Decision Sciences',
                                                        headline: rep.headline,
                                                        email: rep.email
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">
                                                        {rep.name}
                                                    </div>
                                                    <div className="font-mono text-[10px] text-[#C59B27] font-semibold">
                                                        {rep.batchName} Rep ({rep.academicYearTerm})
                                                    </div>
                                                    {rep.email && (
                                                        <div className="font-mono text-[10px] text-[var(--text-secondary)] truncate">
                                                            {rep.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-secondary)]">
                                    Affiliation: BBSc Hons in Business Analytics
                                </div>
                            </div>

                            {/* Management of Technology Reps */}
                            <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--bg-elevated)]/20 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
                                        <span className="font-mono text-xs font-bold text-[#C59B27] tracking-wider">
                                            [MOT] MANAGEMENT OF TECH
                                        </span>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C59B27]/10 text-[#C59B27]">
                                            2 Reps
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        {(repsByDept.MOT || []).map((rep, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[#C59B27]/40 transition-colors">
                                                <UserAvatar 
                                                    src={rep.avatarUrl} 
                                                    name={rep.name} 
                                                    size="sm" 
                                                    peekable={true} 
                                                    username={rep.username}
                                                    profileData={{
                                                        full_name: rep.name,
                                                        username: rep.username,
                                                        avatar_url: rep.avatarUrl,
                                                        role_title: `${rep.batchName} MOT Representative`,
                                                        department: 'Department of Management of Technology',
                                                        headline: rep.headline,
                                                        email: rep.email
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">
                                                        {rep.name}
                                                    </div>
                                                    <div className="font-mono text-[10px] text-[#C59B27] font-semibold">
                                                        {rep.batchName} Rep ({rep.academicYearTerm})
                                                    </div>
                                                    {rep.email && (
                                                        <div className="font-mono text-[10px] text-[var(--text-secondary)] truncate">
                                                            {rep.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-secondary)]">
                                    Affiliation: BBSc Hons in BPM
                                </div>
                            </div>

                            {/* Industrial Management Reps */}
                            <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--bg-elevated)]/20 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
                                        <span className="font-mono text-xs font-bold text-[#C59B27] tracking-wider">
                                            [IM] INDUSTRIAL MANAGEMENT
                                        </span>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C59B27]/10 text-[#C59B27]">
                                            2 Reps
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        {(repsByDept.IM || []).map((rep, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[#C59B27]/40 transition-colors">
                                                <UserAvatar 
                                                    src={rep.avatarUrl} 
                                                    name={rep.name} 
                                                    size="sm" 
                                                    peekable={true} 
                                                    username={rep.username}
                                                    profileData={{
                                                        full_name: rep.name,
                                                        username: rep.username,
                                                        avatar_url: rep.avatarUrl,
                                                        role_title: `${rep.batchName} IM Representative`,
                                                        department: 'Department of Industrial Management',
                                                        headline: rep.headline,
                                                        email: rep.email
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">
                                                        {rep.name}
                                                    </div>
                                                    <div className="font-mono text-[10px] text-[#C59B27] font-semibold">
                                                        {rep.batchName} Rep ({rep.academicYearTerm})
                                                    </div>
                                                    {rep.email && (
                                                        <div className="font-mono text-[10px] text-[var(--text-secondary)] truncate">
                                                            {rep.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--text-secondary)]">
                                    Affiliation: BBSc Hons in Financial Services
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. SECTION 08: Official Union Multi-Cloud Collaborative Hub */}
                <section id="union-notion" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [STUDENT ORGANIZATION HUB]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                08. Official Union Multi-Cloud Hub
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            CONNECTED WORKSPACE
                        </span>
                    </div>

                    <NotionHubWidget 
                        title={unionNotionConfig.workspaceName}
                        workspaceUrl={unionNotionConfig.workspaceUrl}
                        description={unionNotionConfig.description}
                        resources={unionNotionConfig.sections.map(s => ({
                            title: s.title,
                            type: s.tag,
                            tag: s.tag
                        }))}
                    />
                </section>

                {/* 7. SECTION 09: Past Union Leadership & Continuity */}
                <section id="past-leadership" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [HISTORICAL CONTINUITY]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                09. Past Union Leadership & Alumni
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            HONOR ROLL
                        </span>
                    </div>

                    <div className="space-y-6">
                        {pastLeadershipSessions.map((item, idx) => (
                            <div 
                                key={idx}
                                className="p-8 border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C59B27]/60 transition-colors"
                            >
                                <div className="max-w-2xl">
                                    <div className="flex flex-wrap items-center gap-3 mb-2 font-mono text-xs font-bold">
                                        <span className="px-2.5 py-1 bg-[#C59B27]/10 text-[#C59B27] rounded-sm tracking-wider">
                                            {item.session}
                                        </span>
                                        <div className="inline-flex items-center gap-1.5 text-[var(--text-primary)]">
                                            <UserAvatar name={item.president} size="xs" peekable={true} role="alumni" />
                                            <span>Pres. {item.president}</span>
                                        </div>
                                        <span className="text-[#C59B27]">•</span>
                                        <div className="inline-flex items-center gap-1.5 text-[var(--text-primary)]">
                                            <UserAvatar name={item.secretary} size="xs" peekable={true} role="alumni" />
                                            <span>Sec. {item.secretary}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed mb-3">
                                        {item.keyInitiative}
                                    </p>
                                    <div className="font-mono text-xs font-semibold text-[var(--text-muted)]">
                                        {item.alumniRole}
                                    </div>
                                </div>

                                <Link 
                                    href={item.profileLink} 
                                    className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-2 flex-shrink-0"
                                >
                                    <span>Alumni Record</span>
                                    <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8. SECTION 10: Web Platform Maintainers & Systems Engineering Secretariat */}
                <section id="maintainers" className="mb-12 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [PLATFORM ENGINEERING & MAINTAINERS]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                10. Web Architecture & Tech Secretariat
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            CORE SYSTEMS TEAM
                        </span>
                    </div>

                    <div className="p-8 border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm shadow-sm mb-8">
                        <div className="max-w-3xl mb-8">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                                Unified System Stewardship
                            </h3>
                            <p className="text-base font-medium text-[#2D3748] dark:text-[#CBD5E1] leading-relaxed">
                                The BFSU Web Platform, hybrid Notion-Supabase operational backplane, and institutional domain registries are engineered and maintained by active undergraduates. All web maintenance, architectural developments, published circulars, and system releases are transparently attributed to individual developers and technical committee members.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {maintainers.map((m, idx) => {
                                const username = m.username || m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                return (
                                    <div 
                                        key={idx} 
                                        className="p-6 border border-[var(--border)] rounded-xl bg-[var(--bg-elevated)]/30 hover:border-[#C59B27]/40 transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center gap-3.5 mb-4">
                                                <UserAvatar 
                                                    src={m.avatarUrl} 
                                                    name={m.name} 
                                                    size="md" 
                                                    peekable={true} 
                                                    username={username}
                                                    profileData={{
                                                        full_name: m.name,
                                                        username: username,
                                                        avatar_url: m.avatarUrl,
                                                        role_title: m.roleTitle,
                                                        department: 'Faculty of Business',
                                                        headline: m.headline || m.domainSpecialty,
                                                        github_url: m.githubUrl ? `https://github.com/${m.githubUrl}` : null
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">
                                                        {m.name}
                                                    </div>
                                                    <span className="font-mono text-[10px] text-[#C59B27] font-bold block truncate">
                                                        {m.roleTitle}
                                                    </span>
                                                    <span className="font-mono text-[10px] text-[var(--text-secondary)] block">
                                                        Term {m.sessionTerm}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-[#4B5563] dark:text-[#CBD5E1] leading-relaxed mb-4">
                                                {m.contributionsSummary}
                                            </p>
                                        </div>
                                        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono text-[11px]">
                                            <span className="text-[#C59B27] font-semibold">{m.domainSpecialty?.split(',')[0]}</span>
                                            {m.githubUrl && (
                                                <a 
                                                    href={`https://github.com/${m.githubUrl}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
                                                >
                                                    <span>@{m.githubUrl}</span>
                                                    <ArrowUpRight size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

            </Container>
        </main>
    );
};
