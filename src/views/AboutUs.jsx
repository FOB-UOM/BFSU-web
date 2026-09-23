'use client';

import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
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
    // 1. Faculty Departments
    const departments = [
        {
            code: "DS",
            name: "Department of Decision Sciences",
            focus: "Business Analytics, Applied Machine Learning, Operations Research & Supply Chain Optimization.",
            link: "https://uom.lk/ds"
        },
        {
            code: "MOT",
            name: "Department of Management of Technology",
            focus: "Business Process Management, Enterprise Systems Architecture, Technology Strategy & Innovation.",
            link: "https://uom.lk/mot"
        },
        {
            code: "IM",
            name: "Department of Industrial Management",
            focus: "Financial Services Management, Econometrics, Quantitative Finance & Financial Engineering.",
            link: "https://uom.lk/im"
        }
    ];

    // 2. Current Union Leadership (Council / Executive Board)
    const officials = [
        { role: 'President', name: 'Yasitha Sandakalum', department: 'Business Analytics' },
        { role: 'Secretary', name: 'Miyuranga Rajakaruna', department: 'Industrial Management' },
        { role: 'Vice President', name: 'Naveen Sandeepa', department: 'Financial Analytics' },
        { role: 'Editor', name: 'Prageeth Harshana', department: 'Business Technology' },
        { role: 'Junior Treasurer', name: 'Lakshan Kosala', department: 'Business Analytics' },
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
                                    <a 
                                        href={dept.link} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="font-mono text-xs font-bold text-[var(--text-primary)]  hover:text-[#C59B27] inline-flex items-center gap-1.5"
                                    >
                                        <span>Official Department Portal</span>
                                        <ArrowUpRight size={13} />
                                    </a>
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
                                <div key={idx} className="p-5 border border-[var(--border)] rounded-sm">
                                    <span className="font-mono text-xs font-bold text-[#C59B27] uppercase tracking-wider block mb-1">
                                        {official.role}
                                    </span>
                                    <div className="text-base font-bold text-[var(--text-primary)]  mb-1">
                                        {official.name}
                                    </div>
                                    <span className="font-mono text-xs font-medium text-[#4B5563] dark:text-[#9CA3AF]">
                                        Dept. of {official.department}
                                    </span>
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

                {/* 5. SECTION D: Past Union Leadership & Continuity */}
                <section id="past-leadership" className="mb-12 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-1">
                                [HISTORICAL CONTINUITY]
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]  tracking-tight">
                                04. Past Union Leadership & Alumni
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


