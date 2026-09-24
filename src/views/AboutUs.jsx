'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { UserAvatar } from '../components/UserAvatar';
import { NotionHubWidget } from '../components/NotionHubWidget';
import { unionNotionConfig } from '../data/societiesData';
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

export const AboutUs = () => {
    // 1. Faculty Departments & Departmental Societies
    const departments = [
        {
            code: "DS",
            name: "Department of Decision Sciences",
            societySlug: "decision-sciences",
            societyName: "Decision Sciences Society (DSS)",
            focus: "Business Analytics, Applied Machine Learning, Operations Research & Supply Chain Optimization.",
            link: "https://uom.lk/ds"
        },
        {
            code: "MOT",
            name: "Department of Management of Technology",
            societySlug: "mot",
            societyName: "MOT Student Society (MOTSS)",
            focus: "Business Process Management, Enterprise Systems Architecture, Technology Strategy & Innovation.",
            link: "https://uom.lk/mot"
        },
        {
            code: "IM",
            name: "Department of Industrial Management",
            societySlug: "industrial-management",
            societyName: "IM Student Society (IMSS)",
            focus: "Financial Services Management, Econometrics, Quantitative Finance & Financial Engineering.",
            link: "https://uom.lk/im"
        }
    ];

    // 2. Current Union Leadership (Council / Executive Board)
    const officials = [
        { role: 'President', name: 'Yasitha Sandakalum', department: 'Business Analytics', username: 'yasitha-sandakalum', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
        { role: 'Secretary', name: 'Miyuranga Rajakaruna', department: 'Industrial Management', username: 'miyuranga-rajakaruna', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
        { role: 'Vice President', name: 'Naveen Sandeepa', department: 'Financial Analytics', username: 'naveen-sandeepa', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80' },
        { role: 'Editor', name: 'Prageeth Harshana', department: 'Business Technology', username: 'prageeth-harshana', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
        { role: 'Junior Treasurer', name: 'Lakshan Kosala', department: 'Business Analytics', username: 'lakshan-kosala', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    ];

    const executiveMembers = [
        'Poorna Lakshan', 'Warsha Joolige', 'Mayuri Lakshani', 'Senura Niduk', 'Lakshitha Ranaweera', 'Siyani Kumarasinghe'
    ];

    // 3. Past Union Leadership & Alumni Continuity
    const pastLeadership = [
        {
            session: "2024–2025",
            president: "Charith Wijesinghe",
            secretary: "Sachini Gamage",
            keyInitiative: "Inauguration of Inter-University Quantitative Analytics Hackathon & Canteen Subsidy Reform",
            alumniRole: "Associate Consultant at McKinsey & Co • DL Research Author",
            link: "/alumni"
        },
        {
            session: "2023–2024",
            president: "Hasitha Senanayake",
            secretary: "Kavindi Jayawardena",
            keyInitiative: "Establishment of Industry Mentorship Portal & Digital Examination Welfare Program",
            alumniRole: "Senior Risk Analyst at HSBC Global • DL Research Author",
            link: "/alumni"
        },
        {
            session: "2022–2023",
            president: "Dilshan Mendis",
            secretary: "Nimasha Fernando",
            keyInitiative: "Foundational Undergraduate Research Fellowship & Faculty Library Modernization",
            alumniRole: "Enterprise Solutions Lead at WSO2 • DL Research Author",
            link: "/alumni"
        }
    ];

    const unionPillars = [
        {
            title: "Student Advocacy & Welfare",
            desc: "Representing undergraduate concerns across Faculty Boards, University Senate committees, and administrative bodies.",
            icon: Shield
        },
        {
            title: "Academic & Industry Linkages",
            desc: "Bridging analytical curriculum with enterprise applications through symposiums, corporate workshops, and placement pipelines.",
            icon: BookOpen
        },
        {
            title: "Collegiate Community & Culture",
            desc: "Fostering solidarity across cohorts and disciplines through athletic championships, aesthetic evenings, and student welfare funds.",
            icon: Users
        }
    ];

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                
                {/* 1. Header */}
                <div className="max-w-3xl mb-16">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-3">
                        Institutional Governance & Legacy
                    </span>
                    <Typography variant="h1" className="mb-6 !font-extrabold !text-3xl sm:!text-5xl text-[var(--text-primary)]  tracking-tight">
                        Faculty, Union & Leadership Continuity
                    </Typography>
                    <p className="text-base sm:text-xl text-[#2D3748] leading-relaxed font-medium">
                        The comprehensive institutional hierarchy of the Faculty of Business, the statutory Business Faculty Students' Union, and the continuity of elected leaders and distinguished alumni.
                    </p>
                </div>

                {/* 2. SECTION A: The Faculty of Business, University of Moratuwa */}
                <section id="faculty" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [ACADEMIC FOUNDATION]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]  tracking-tight">
                                01. Faculty of Business
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            EST. 2017 • UNIVERSITY OF MORATUWA
                        </span>
                    </div>

                    <div className="p-8 border border-[var(--border)] bg-[var(--bg-surface)]  mb-8 shadow-sm rounded-sm">
                        <h3 className="text-xl font-bold text-[var(--text-primary)]  mb-3">
                            Vision & Institutional Charter
                        </h3>
                        <p className="text-base font-medium text-[#2D3748] leading-relaxed mb-8 max-w-4xl">
                            The Faculty of Business is established to pioneer quantitative management education, enterprise technology leadership, and data-driven business governance in Sri Lanka. As the premier technology university's business arm, it synergizes computational analysis with strategic decision-making.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--border)]">
                            {departments.map((dept, idx) => (
                                <div key={idx} className="flex flex-col justify-between">
                                    <div>
                                        <span className="font-mono text-xs text-[#C59B27] font-bold tracking-widest block mb-2">
                                            {dept.code}
                                        </span>
                                        <h3 className="text-lg font-bold text-[var(--text-primary)]  mb-2 tracking-tight">
                                            {dept.name}
                                        </h3>
                                        <p className="text-sm font-medium text-[#374151] leading-relaxed mb-5">
                                            {dept.focus}
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
                                            href={dept.link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="font-mono text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5"
                                        >
                                            <span>Faculty Department Portal</span>
                                            <ArrowUpRight size={13} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. SECTION B: The Business Faculty Students' Union (BFSU) - Diagnosed Image 2 */}
                <section id="mandate" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                            [STATUTORY MANDATE]
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]  tracking-tight">
                            02. Business Faculty Students' Union
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {unionPillars.map((p, idx) => {
                            const Icon = p.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="p-8 border border-[var(--border)] bg-[var(--bg-surface)]  rounded-sm shadow-sm flex flex-col justify-between hover:border-[#C59B27]/60 transition-colors"
                                >
                                    <div>
                                        <div className="p-3 w-fit bg-[#C59B27]/10 rounded-sm mb-5">
                                            <Icon size={24} className="text-[#C59B27]" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[var(--text-primary)]  mb-3 tracking-tight">
                                            {p.title}
                                        </h3>
                                        <p className="text-sm font-medium text-[#1A202C] leading-relaxed">
                                            {p.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 4. SECTION C: Current Union Officials & Executive Board (Council) */}
                <section id="council" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [GOVERNING COUNCIL]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]  tracking-tight">
                                03. Union Officials 2026
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            ELECTED EXECUTIVE COUNCIL
                        </span>
                    </div>

                    <div className="border border-[var(--border)] bg-[var(--bg-surface)]  p-8 shadow-sm rounded-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {officials.map((official, idx) => (
                                <div 
                                    key={idx} 
                                    className="p-5 border border-[var(--border)] rounded-xl bg-[var(--bg-elevated)]/40 hover:border-[#C59B27]/40 transition-all flex items-start gap-4 group"
                                >
                                    <UserAvatar
                                        src={official.avatar}
                                        name={official.name}
                                        size="md"
                                        peekable={true}
                                        username={official.username}
                                        role="union_exec"
                                        profileData={{
                                            full_name: official.name,
                                            username: official.username,
                                            avatar_url: official.avatar,
                                            role_title: `BFSU ${official.role}`,
                                            department: `Department of ${official.department}`,
                                            headline: `Elected ${official.role} of the Business Faculty Students' Union (BFSU)`
                                        }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <span className="font-mono text-[10px] font-bold text-[#C59B27] uppercase tracking-wider block mb-0.5">
                                            {official.role}
                                        </span>
                                        <Link 
                                            href={`/u/${official.username}`}
                                            className="text-sm font-bold text-[var(--text-primary)] hover:text-[#C59B27] transition-colors block truncate"
                                        >
                                            {official.name}
                                        </Link>
                                        <span className="font-mono text-xs text-[var(--text-secondary)] block mt-0.5">
                                            Dept. of {official.department}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-[var(--border)]">
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-3">
                                Committee Representatives
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                                {executiveMembers.map((m, idx) => (
                                    <span key={idx} className="px-3.5 py-1.5 border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)]  bg-[#F9FAFB]  rounded-sm">
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. SECTION D: Official Union Notion Hub (Student Orgs) */}
                <section id="union-notion" className="mb-20 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [STUDENT ORGANIZATION HUB]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                04. Official Union Notion Hub
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

                {/* 6. SECTION E: Past Union Leadership & Continuity */}
                <section id="past-leadership" className="mb-12 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [HISTORICAL CONTINUITY]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                                05. Past Union Leadership & Alumni
                            </h2>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#4B5563] dark:text-[#9CA3AF] tracking-wider">
                            HONOR ROLL
                        </span>
                    </div>

                    <div className="space-y-6">
                        {pastLeadership.map((item, idx) => (
                            <div 
                                key={idx}
                                className="p-8 border border-[var(--border)] bg-[var(--bg-surface)]  rounded-sm shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C59B27]/60 transition-colors"
                            >
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-3 mb-2 font-mono text-xs font-bold">
                                        <span className="px-2.5 py-1 bg-[#C59B27]/10 text-[#C59B27] rounded-sm tracking-wider">
                                            {item.session}
                                        </span>
                                        <span className="text-[var(--text-primary)]  font-bold">
                                            Pres. {item.president} • Sec. {item.secretary}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-[#1A202C] leading-relaxed mb-3">
                                        {item.keyInitiative}
                                    </p>
                                    <div className="font-mono text-xs font-semibold text-[#4B5563] dark:text-[#9CA3AF]">
                                        {item.alumniRole}
                                    </div>
                                </div>

                                <a 
                                    href={item.link} 
                                    className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]  hover:text-[#C59B27] inline-flex items-center gap-2 flex-shrink-0"
                                >
                                    <span>Alumni Record</span>
                                    <ArrowUpRight size={13} />
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

            </Container>
        </main>
    );
};


