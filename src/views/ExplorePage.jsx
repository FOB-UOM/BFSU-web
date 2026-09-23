'use client';

import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { 
    Calendar, 
    BookOpen, 
    Sparkles, 
    Users, 
    ArrowUpRight, 
    Compass, 
    Trophy,
    Share2,
    Globe,
    ExternalLink
} from 'lucide-react';
import { eventsData } from '../data/eventsData';

export const ExplorePage = () => {
    const [selectedTab, setSelectedTab] = useState('all');

    const sections = [
        { id: 'all', label: 'All Dimensions' },
        { id: 'achievements', label: 'Student Achievements & Accolades' },
        { id: 'life', label: 'Student Life & Traditions' },
        { id: 'events', label: 'Events & Assemblies' },
        { id: 'projects', label: 'Research & Projects' },
    ];

    // Social Media Share Utility
    const shareToSocial = (platform, title, url = window.location.href) => {
        const text = encodeURIComponent("BFSU University of Moratuwa: " + title);
        const link = encodeURIComponent(url);
        let shareUrl = "";

        if (platform === 'linkedin') {
            shareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + link;
        } else if (platform === 'facebook') {
            shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + link;
        } else if (platform === 'twitter') {
            shareUrl = "https://twitter.com/intent/tweet?text=" + text + "&url=" + link;
        }
        if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
    };

    // Competitive & Academic Achievements with Group Avatars
    const achievements = [
        {
            id: 1,
            title: "Champions — National Inter-University Quant Analytics Hackathon 2025",
            cohort: "Department of Decision Sciences (Batch '22)",
            teamName: "Team Optima",
            students: "K. Perera, S. De Silva, T. Rathnayake",
            description: "First place amongst 24 national university teams for developing a real-time stochastic dynamic routing algorithm for emergency Colombo supply lines.",
            badge: "NATIONAL TITLE",
            date: "November 2025",
            avatars: [
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
            ]
        },
        {
            id: 2,
            title: "Global Runners-Up — CFA Institute Research Challenge South Asia",
            cohort: "Department of Industrial Management (Batch '21 FSM)",
            teamName: "Equity Research Delegation",
            students: "D. Perera, M. Fernando, R. Jayawardena",
            description: "Authored a 40-page institutional equity valuation and ESG compliance report on renewable energy utilities, qualifying for the Asia-Pacific finals.",
            badge: "REGIONAL FINALS",
            date: "January 2026",
            avatars: [
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80"
            ]
        },
        {
            id: 3,
            title: "Gold Medal — Sri Lanka University Games (SLUG) Athletics Championship",
            cohort: "Faculty Sports Council",
            teamName: "Athletics Contingent",
            students: "V. Samarasinghe (Level 3 BPM)",
            description: "Broke the university games record in the 400m hurdles, representing the Faculty of Business contingent with exceptional athletic distinction.",
            badge: "SLUG GOLD",
            date: "December 2025",
            avatars: [
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
            ]
        }
    ];

    const studentLifeHighlights = [
        {
            title: "Student Welfare & Representation",
            description: "Active grievance advocacy, canteen monitoring, lecture hall accommodations, and mental wellness initiatives led by the Union.",
            tag: "WELFARE"
        },
        {
            title: "Inter-Faculty Sports & Tournaments",
            description: "Annual cricket fixtures, track and field championships, and corporate futsal leagues fostering athletic excellence.",
            tag: "SPORTS"
        },
        {
            title: "Cultural Festivals & Aesthetic Evenings",
            description: "Traditional New Year celebrations, aesthetic music symposiums, and collaborative arts uniting cohorts across all levels.",
            tag: "CULTURE"
        }
    ];

    const researchHighlights = [
        {
            title: "Predictive Modeling of Colombo Port Container Congestion",
            department: "Decision Sciences (Business Analytics)",
            students: "Batch '21 Analytics Cohort",
            desc: "A machine learning and queueing simulation model predicting crane waiting times and yard utilization.",
            link: "http://dl.lib.mrt.ac.lk/"
        },
        {
            title: "Decentralized Liquidity Risks in Microfinance Institutions",
            department: "Financial Services Management",
            students: "Batch '21 Finance Scholars",
            desc: "Econometric analysis evaluating interest rate sensitivity and rural credit default patterns.",
            link: "http://dl.lib.mrt.ac.lk/"
        },
        {
            title: "Robotic Process Automation in Apparel ERP Export Compliance",
            department: "Industrial Management (BPM)",
            students: "Batch '22 Enterprise Systems Group",
            desc: "End-to-end automated documentation pipelines for GSP+ trade compliance across multi-facility exporters.",
            link: "http://dl.lib.mrt.ac.lk/"
        }
    ];

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                {/* Header */}
                <div className="max-w-3xl mb-12">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-3">
                        Campus Horizon & Trophies
                    </span>
                    <Typography variant="h1" className="mb-4 !font-display !font-bold !text-3xl sm:!text-5xl text-[var(--text-primary)] ">
                        Explore Student Life, Accolades & Scholarship
                    </Typography>
                    <p className="font-body text-base sm:text-lg text-[#333C4D] font-medium leading-relaxed">
                        Discover the full spectrum of undergraduate life at the Faculty of Business — from national championship trophies and campus traditions to high-impact undergraduate research.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-12 border-b border-[var(--border)] pb-4">
                    {sections.map(tab => {
                        const isActive = selectedTab === tab.id;
                        const btnClass = isActive 
                            ? "px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] bg-[#12161F] dark:bg-[var(--bg-surface)] text-white dark:text-[var(--text-primary)]"
                            : "px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#566072] dark:text-[#8E9BB0] hover:text-[var(--text-primary)] dark:hover:text-white hover:bg-[#F4F2EC] dark:hover:bg-white/5";
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={btnClass}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Dimension 1: Student Achievements & Accolades */}
                {(selectedTab === 'all' || selectedTab === 'achievements') && (
                    <section id="achievements" className="mb-16 scroll-mt-24">
                        <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-[var(--border)]">
                            <div className="flex items-center gap-2">
                                <Trophy size={18} className="text-[#C59B27]" />
                                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] ">
                                    Student Achievements & Honor Roll
                                </h2>
                            </div>
                            <span className="font-mono text-xs text-[#C59B27] font-semibold">National & Global Recognition</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {achievements.map((item) => (
                                <div 
                                    key={item.id}
                                    className="p-6 border border-[var(--border)] bg-[#F4F2EC]/40 /40 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between font-mono text-[10px] mb-3">
                                            <span className="px-2 py-0.5 bg-[#C59B27]/15 text-[#C59B27] font-bold uppercase tracking-wider">
                                                [{item.badge}]
                                            </span>
                                            <span className="text-[#566072] dark:text-[#8E9BB0]">{item.date}</span>
                                        </div>

                                        <h3 className="font-display text-lg font-bold text-[var(--text-primary)]  mb-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        
                                        <div className="font-mono text-[11px] text-[#C59B27] mb-3 font-semibold">
                                            {item.cohort}
                                        </div>

                                        <p className="font-body text-xs sm:text-sm text-[#4A5364] leading-relaxed mb-4">
                                            {item.description}
                                        </p>

                                        {/* Group Avatar Stack & Honorees */}
                                        <div className="flex items-center gap-3 p-3 bg-[var(--bg-surface)]  border border-[var(--border)] mb-4">
                                            <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
                                                {item.avatars.map((av, avIdx) => (
                                                    <img 
                                                        key={avIdx} 
                                                        src={av} 
                                                        alt="Team Member" 
                                                        className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-[#0B0E14] object-cover"
                                                    />
                                                ))}
                                            </div>
                                            <div className="truncate">
                                                <span className="font-mono text-[10px] text-[var(--text-primary)]  font-bold block truncate">
                                                    {item.teamName}
                                                </span>
                                                <span className="font-mono text-[9px] text-[#566072] dark:text-[#8E9BB0] block truncate">
                                                    {item.students}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Share Ribbon */}
                                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                                        <span className="font-mono text-[10px] uppercase text-[#566072] dark:text-[#8E9BB0] flex items-center gap-1 font-bold">
                                            <Share2 size={11} />
                                            <span>Broadcast</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => shareToSocial('linkedin', item.title)}
                                                className="px-2 py-1 bg-[var(--bg-surface)] dark:bg-[#1B2230] border border-[var(--border)] dark:border-white/10 hover:border-[#C59B27] text-[#0077B5] font-mono text-[10px] font-bold transition-colors inline-flex items-center gap-1"
                                                title="Share on LinkedIn"
                                            >
                                                <span>in</span>
                                            </button>
                                            <button
                                                onClick={() => shareToSocial('facebook', item.title)}
                                                className="px-2 py-1 bg-[var(--bg-surface)] dark:bg-[#1B2230] border border-[var(--border)] dark:border-white/10 hover:border-[#C59B27] text-[#1877F2] font-mono text-[10px] font-bold transition-colors inline-flex items-center gap-1"
                                                title="Share on Facebook"
                                            >
                                                <span>f</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Dimension 2: Student Life */}
                {(selectedTab === 'all' || selectedTab === 'life') && (
                    <section id="life" className="mb-16 scroll-mt-24">
                        <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-[var(--border)]">
                            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] ">
                                Student Life & Campus Traditions
                            </h2>
                            <span className="font-mono text-xs text-[#C59B27] font-semibold">Undergraduate Experience</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {studentLifeHighlights.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="p-6 border border-[var(--border)] bg-[#F4F2EC]/40 /40 flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#C59B27] font-bold block mb-3">
                                            [{item.tag}]
                                        </span>
                                        <h3 className="font-display text-lg font-bold text-[var(--text-primary)]  mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="font-body text-sm text-[#4A5364] leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Dimension 3: Assemblies & Events */}
                {(selectedTab === 'all' || selectedTab === 'events') && (
                    <section id="events" className="mb-16 scroll-mt-24">
                        <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-[var(--border)]">
                            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] ">
                                Key Events & Gatherings
                            </h2>
                            <a href="/events" className="font-mono text-xs text-[#C59B27] font-semibold hover:underline inline-flex items-center gap-1">
                                <span>View All Events</span>
                                <ArrowUpRight size={12} />
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {eventsData.slice(0, 2).map((event) => (
                                <div 
                                    key={event.id}
                                    className="p-6 border border-[var(--border)] bg-[#F4F2EC]/40 /40 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between font-mono text-[11px] text-[#566072] dark:text-[#8E9BB0] mb-3">
                                            <span className="uppercase text-[#C59B27] font-bold">[{event.label}]</span>
                                            <span>{event.date}</span>
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-[var(--text-primary)]  mb-2">
                                            {event.title}
                                        </h3>
                                        <p className="font-body text-sm text-[#4A5364] leading-relaxed mb-4">
                                            {event.brief}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                                        <a 
                                            href={/events/} 
                                            className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]  hover:text-[#C59B27] inline-flex items-center gap-1.5"
                                        >
                                            <span>Read Dossier</span>
                                            <ArrowUpRight size={12} />
                                        </a>

                                        {/* Social Share */}
                                        <div className="flex items-center gap-2 text-[#566072] dark:text-[#8E9BB0]">
                                            <button
                                                onClick={() => shareToSocial('linkedin', event.title)}
                                                className="px-2 py-1 bg-[var(--bg-surface)] dark:bg-[#1B2230] border border-[var(--border)] dark:border-white/10 hover:border-[#C59B27] text-[#0077B5] font-mono text-[10px] font-bold transition-colors"
                                                title="Share on LinkedIn"
                                            >
                                                in
                                            </button>
                                            <button
                                                onClick={() => shareToSocial('facebook', event.title)}
                                                className="px-2 py-1 bg-[var(--bg-surface)] dark:bg-[#1B2230] border border-[var(--border)] dark:border-white/10 hover:border-[#C59B27] text-[#1877F2] font-mono text-[10px] font-bold transition-colors"
                                                title="Share on Facebook"
                                            >
                                                f
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Dimension 4: Research & Projects Showcase */}
                {(selectedTab === 'all' || selectedTab === 'projects') && (
                    <section id="projects" className="mb-10 scroll-mt-24">
                        <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-[var(--border)]">
                            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] ">
                                Undergraduate Research & Projects
                            </h2>
                            <a href="/research" className="font-mono text-xs text-[#C59B27] font-semibold hover:underline inline-flex items-center gap-1">
                                <span>Full Research Archive</span>
                                <ArrowUpRight size={12} />
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {researchHighlights.map((r, idx) => (
                                <div 
                                    key={idx} 
                                    className="p-6 border border-[var(--border)] bg-[#F4F2EC]/40 /40 flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C59B27] font-semibold block mb-2">
                                            {r.department}
                                        </span>
                                        <h3 className="font-display text-base font-bold text-[var(--text-primary)]  mb-2">
                                            {r.title}
                                        </h3>
                                        <p className="font-body text-xs sm:text-sm text-[#4A5364] leading-relaxed mb-4">
                                            {r.desc}
                                        </p>
                                    </div>
                                    <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
                                        <span className="font-mono text-[10px] text-[#566072] dark:text-[#8E9BB0]">{r.students}</span>
                                        <a 
                                            href={r.link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="font-mono text-[11px] font-bold text-[#C59B27] hover:underline inline-flex items-center gap-1"
                                        >
                                            <span>Repository</span>
                                            <ArrowUpRight size={11} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </Container>
        </main>
    );
};


