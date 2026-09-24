'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { UserAvatar } from '../components/UserAvatar';
import { NotionHubWidget } from '../components/NotionHubWidget';
import { unionNotionConfig } from '../data/societiesData';
import { departmentsData, decennialConfig } from '../data/departmentsData';
import { unionPillars, pastLeadershipSessions, facultyCharter } from '../data/leadershipHistoryData';
import { fallbackCouncil } from '../data/councilData';
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

export const AboutUs = ({ councilMembers = [] }) => {
    // Current Union Leadership (Council / Executive Board) from Notion or resilient fallback
    const isLive = Array.isArray(councilMembers) && councilMembers.length > 0;
    const activeCouncil = isLive ? councilMembers : fallbackCouncil;
    const officials = activeCouncil.filter(m => m.priority <= 8);
    const executiveMembers = activeCouncil.filter(m => m.priority > 8).map(m => m.name);

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
                                [ACADEMIC FOUNDATION]
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
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                            Vision & Institutional Charter
                        </h3>
                        <p className="text-base font-medium text-[#2D3748] dark:text-[#CBD5E1] leading-relaxed mb-8 max-w-4xl">
                            {facultyCharter.vision}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--border)]">
                            {departmentsData.map((dept, idx) => (
                                <div key={idx} className="flex flex-col justify-between">
                                    <div>
                                        <span className="font-mono text-xs text-[#C59B27] font-bold tracking-widest block mb-2">
                                            {dept.code}
                                        </span>
                                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                                            {dept.name}
                                        </h3>
                                        <p className="text-sm font-medium text-[#374151] dark:text-[#94A3B8] leading-relaxed mb-5">
                                            {dept.undergraduate.focus}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
                                        <Link 
                                            href={`/societies/${dept.societySlug}`}
                                            className="font-mono text-xs font-bold text-[#C59B27] hover:underline inline-flex items-center justify-between group"
                                        >
                                            <span>{dept.societyName}</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#C59B27]/15 text-[#C59B27]">Society & Notion &rarr;</span>
                                        </Link>
                                        <a 
                                            href={dept.portalUrl} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="font-mono text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5"
                                        >
                                            <span>{dept.postgraduate.degree} ↗</span>
                                            <ArrowUpRight size={13} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2.5 SECTION 02: Degree Programs & Specializations */}
                <section id="degrees" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [CURRICULUM EXCELLENCE]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                02. Degree Specializations
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

                {/* 2.6 SECTION 03: 2027 Decennial Milestone */}
                <section id="decennial" className="mb-20 scroll-mt-24">
                    <div className="p-8 border border-[#C59B27]/40 bg-gradient-to-br from-[var(--bg-surface)] to-[#C59B27]/5 rounded-sm shadow-sm relative overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                    [MILESTONE ROADMAP]
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                    {decennialConfig.title}
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

                {/* 3. SECTION 04: The Business Faculty Students' Union (BFSU) Mandate */}
                <section id="mandate" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                            [STATUTORY MANDATE]
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                            03. Business Faculty Students' Union
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
                                        <p className="text-sm font-medium text-[#1A202C] dark:text-[#CBD5E1] leading-relaxed">
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 4. SECTION 05: Current Union Officials & Executive Board (Council) */}
                <section id="council" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [GOVERNING COUNCIL] {isLive && '• LIVE NOTION CARRIER'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                04. Union Officials 2026
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            ELECTED EXECUTIVE COUNCIL
                        </span>
                    </div>

                    <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8 shadow-sm rounded-sm">
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
                                                headline: official.bio || `Elected ${official.role} of the Business Faculty Students' Union (BFSU)`
                                            }}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <span className="font-mono text-[10px] font-bold text-[#C59B27] uppercase tracking-wider block mb-0.5">
                                                {official.role}
                                            </span>
                                            <Link 
                                                href={`/u/${username}`}
                                                className="text-sm font-bold text-[var(--text-primary)] hover:text-[#C59B27] transition-colors block truncate"
                                            >
                                                {official.name}
                                            </Link>
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

                        {executiveMembers.length > 0 && (
                            <div className="pt-6 border-t border-[var(--border)]">
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-3">
                                    Committee Representatives
                                </span>
                                <div className="flex flex-wrap gap-2.5">
                                    {executiveMembers.map((m, idx) => (
                                        <span key={idx} className="px-3.5 py-1.5 border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] bg-[#F9FAFB] dark:bg-[var(--bg-elevated)] rounded-sm">
                                            {m}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 5. SECTION 05: Official Union Notion Hub (Student Orgs) */}
                <section id="union-notion" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [STUDENT ORGANIZATION HUB]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                05. Official Union Notion Hub
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

                {/* 6. SECTION 06: Past Union Leadership & Continuity */}
                <section id="past-leadership" className="mb-12 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [HISTORICAL CONTINUITY]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                06. Past Union Leadership & Alumni
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
                                    <div className="flex items-center gap-3 mb-2 font-mono text-xs font-bold">
                                        <span className="px-2.5 py-1 bg-[#C59B27]/10 text-[#C59B27] rounded-sm tracking-wider">
                                            {item.session}
                                        </span>
                                        <span className="text-[var(--text-primary)] font-bold">
                                            Pres. {item.president} • Sec. {item.secretary}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-[#1A202C] dark:text-[#CBD5E1] leading-relaxed mb-3">
                                        {item.keyInitiative}
                                    </p>
                                    <div className="font-mono text-xs font-semibold text-[#4B5563] dark:text-[#9CA3AF]">
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

            </Container>
        </main>
    );
};
