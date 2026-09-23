'use client';

import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { useAuth } from '../context/AuthContext';
import { 
    GraduationCap, 
    Network, 
    Briefcase, 
    ArrowUpRight, 
    BookOpen, 
    ExternalLink, 
    Lock,
    CheckCircle2,
    Building2,
    Users
} from 'lucide-react';

export const AlumniPage = () => {
    const { openAuthModal } = useAuth();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [authStep, setAuthStep] = useState('initial'); // 'initial' | 'simulated_connected'

    const pillars = [
        {
            title: "Alumni Mentorship & Practicum",
            description: "Direct mentorship pairings connecting senior undergraduates with graduates across corporate banking, management consultancies, and tech enterprises.",
            icon: GraduationCap
        },
        {
            title: "Placement Dispatch",
            description: "Exclusive internship notifications, graduate management trainee pipelines, and recruitment calls directly from alumni employers.",
            icon: Briefcase
        },
        {
            title: "Global Chapter & Fellowship",
            description: "Reconnecting graduates across Sri Lanka, the UK, Australia, Singapore, and global financial hubs to maintain faculty fellowship.",
            icon: Network
        }
    ];

    // Alumni Profiles with Avatars, Connected Research, and Verification
    const alumniSpotlights = [
        {
            name: "Kavindu Wickramasinghe",
            batch: "Class of 2021",
            degree: "BSc (Hons) in Business Analytics",
            currentRole: "Lead Quant Analyst • London Stock Exchange Group",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
            initials: "KW",
            researchTitle: "Predictive Modeling of Port Container Congestion via Stochastic Queueing",
            researchLink: "http://dl.lib.mrt.ac.lk/",
            tags: ["Operations Research", "Machine Learning"],
            verifiedAffiliation: "UoM Faculty of Business (BSc Hons)"
        },
        {
            name: "Dinithi Perera",
            batch: "Class of 2020",
            degree: "BSc (Hons) in Financial Services Management",
            currentRole: "Risk & Liquidity Consultant • Deloitte South Asia",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
            initials: "DP",
            researchTitle: "Decentralized Liquidity Risks in Microfinance Lending Facilities",
            researchLink: "http://dl.lib.mrt.ac.lk/",
            tags: ["Econometrics", "Risk Governance"],
            verifiedAffiliation: "UoM Faculty of Business (BSc Hons)"
        },
        {
            name: "Senura Ranatunga",
            batch: "Class of 2022",
            degree: "BSc (Hons) in Business Process Management",
            currentRole: "Enterprise Systems Architect • MAS Holdings",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
            initials: "SR",
            researchTitle: "Robotic Process Automation in Multi-Facility Apparel ERP Export Compliance",
            researchLink: "http://dl.lib.mrt.ac.lk/",
            tags: ["Enterprise ERP", "BPMN 2.0"],
            verifiedAffiliation: "UoM Faculty of Business (BSc Hons)"
        }
    ];

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-3">
                            Graduate Network & Research Linkages
                        </span>
                        <Typography variant="h1" className="mb-4 !font-display !font-bold !text-3xl sm:!text-5xl text-[var(--text-primary)] ">
                            Alumni Fellowship & Profiles
                        </Typography>
                        <p className="font-body text-base sm:text-lg text-[#333C4D] font-medium leading-relaxed">
                            Connecting past graduates and their scholarly research output with current undergraduates of the Faculty of Business, University of Moratuwa.
                        </p>
                    </div>

                    {/* Sign In with LinkedIn Button */}
                    <button
                        id="linkedin-auth"
                        onClick={() => setLoginModalOpen(true)}
                        className="self-start md:self-auto bg-[#0077B5] hover:bg-[#005E93] text-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all inline-flex items-center gap-2.5 shadow-sm flex-shrink-0 scroll-mt-24"
                    >
                        <span className="font-black text-sm bg-[var(--bg-surface)] text-[#0077B5] px-1 rounded-sm leading-none py-0.5">in</span>
                        <span>Sign In with LinkedIn</span>
                    </button>
                </div>

                {/* 3 Core Pillars */}
                <div id="fellowship" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 scroll-mt-24">
                    {pillars.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="border-t-2 border-[#12161F] dark:border-white/50 pt-6">
                                <Icon size={22} className="text-[#C59B27] mb-4" />
                                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]  mb-3">
                                    {item.title}
                                </h3>
                                <p className="font-body text-sm sm:text-base text-[#333C4D] leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Alumni Research & Industry Profile Registry */}
                <div id="profiles" className="mb-16 scroll-mt-24">
                    <div className="border-b border-[var(--border)] pb-4 mb-8 flex justify-between items-baseline">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]  block">
                                Verified Graduate Profiles & Research Outputs
                            </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#C59B27] font-semibold">
                            Research Cross-Linked
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {alumniSpotlights.map((alumnus, idx) => (
                            <div 
                                key={idx} 
                                className="p-6 border border-[var(--border)] bg-[#F4F2EC]/40 /40 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Profile Avatar Header */}
                                    <div className="flex items-center gap-3.5 mb-4">
                                        <img 
                                            src={alumnus.avatar} 
                                            alt={alumnus.name}
                                            className="w-12 h-12 object-cover border border-[#C59B27]/40 shadow-sm flex-shrink-0"
                                        />
                                        <div>
                                            <h4 className="font-display text-lg font-bold text-[var(--text-primary)]  leading-tight">
                                                {alumnus.name}
                                            </h4>
                                            <div className="font-mono text-[10px] text-[#C59B27] font-semibold flex items-center gap-1 mt-0.5">
                                                <CheckCircle2 size={11} className="text-[#C59B27]" />
                                                <span>{alumnus.batch} • {alumnus.degree.split(' in ')[1]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="font-mono text-xs text-[#566072] dark:text-[#8E9BB0] mb-5 pb-3 border-b border-[var(--border)]/60">
                                        {alumnus.currentRole}
                                    </div>

                                    {/* Linked Research Project */}
                                    <div className="p-4 bg-[var(--bg-surface)]  border border-[var(--border)] mb-4">
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#C59B27] font-bold block mb-1">
                                            Undergraduate Thesis
                                        </span>
                                        <p className="font-body text-xs font-semibold text-[var(--text-primary)]  leading-snug mb-2">
                                            {alumnus.researchTitle}
                                        </p>
                                        <a 
                                            href={alumnus.researchLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-mono text-[10px] text-[#C59B27] hover:underline inline-flex items-center gap-1 font-bold"
                                        >
                                            <span>Read DL Archive</span>
                                            <ArrowUpRight size={10} />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 pt-2">
                                    {alumnus.tags.map((t, tIdx) => (
                                        <span key={tIdx} className="font-mono text-[9px] px-2 py-0.5 bg-[#E5E2DA]/50 dark:bg-[#1E2534] text-[#566072] dark:text-[#8E9BB0]">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alumni Account Registration / Activation Callout */}
                <div className="border border-[var(--border)] bg-[#F4F2EC]/60 /60 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C59B27] font-bold block mb-2">
                            Faculty of Business Alumni Database
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]  mb-2">
                            Alumni Account & Directory Listing
                        </h3>
                        <p className="font-body text-sm sm:text-base text-[#333C4D]">
                            Sign in with your verified profile to connect your undergraduate thesis, current industry employer, and mentoring availability.
                        </p>
                    </div>
                    <button 
                        onClick={() => openAuthModal('login')}
                        className="flex-shrink-0 bg-[#0077B5] hover:bg-[#005E93] text-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all inline-flex items-center gap-2.5 shadow-sm rounded-sm"
                    >
                        <span className="font-black text-sm bg-white text-[#0077B5] px-1 rounded-sm leading-none py-0.5">in</span>
                        <span>Sign In with LinkedIn</span>
                    </button>
                </div>
            </Container>

            {/* LinkedIn OAuth & Profile Authentication Modal */}
            {loginModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-transparent dark:bg-[#0E131C] border border-[var(--border)] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-[var(--border)]">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0077B5] block mb-1">
                                    Official Alumni Verification
                                </span>
                                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] ">
                                    Sign In with LinkedIn
                                </h3>
                            </div>
                            <button 
                                onClick={() => setLoginModalOpen(false)}
                                className="p-1 text-[#566072] hover:text-[var(--text-primary)] dark:text-[#94A3B8] dark:hover:text-white font-mono text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {authStep === 'initial' ? (
                            <div>
                                <p className="font-body text-sm text-[#4A5364] mb-6 leading-relaxed">
                                    Connect using your official LinkedIn account to synchronize your graduate degree from the <strong className="text-[var(--text-primary)] ">Faculty of Business, University of Moratuwa</strong> and link your current enterprise role.
                                </p>

                                <div className="p-4 border border-[var(--border)] bg-[#F4F2EC]/50 dark:bg-white/5 space-y-2 mb-6 text-xs font-mono text-[#566072] dark:text-[#8E9BB0]">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={13} className="text-emerald-500" />
                                        <span>Read profile basic data & education affiliation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={13} className="text-emerald-500" />
                                        <span>Verify Faculty of Business alumni status</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={13} className="text-emerald-500" />
                                        <span>Sync current corporate designation for directory</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setAuthStep('simulated_connected')}
                                    className="w-full py-3 bg-[#0077B5] hover:bg-[#005E93] text-white font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <span className="font-black text-sm bg-[var(--bg-surface)] text-[#0077B5] px-1 rounded-sm leading-none py-0.5">in</span>
                                    <span>Continue with LinkedIn OAuth</span>
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 size={24} />
                                </div>
                                <h4 className="font-display text-lg font-bold text-[var(--text-primary)]  mb-1">
                                    LinkedIn Affiliation Verified
                                </h4>
                                <p className="font-body text-xs text-[#566072] dark:text-[#8E9BB0] mb-6">
                                    Faculty of Business alumnus profile recognized. Your directory card and linked research are active.
                                </p>
                                <button 
                                    onClick={() => { setAuthStep('initial'); setLoginModalOpen(false); }}
                                    className="w-full py-2.5 bg-[#12161F] dark:bg-[var(--bg-surface)] text-white dark:text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider"
                                >
                                    Close Window
                                </button>
                            </div>
                        )}

                        <div className="mt-6 pt-4 border-t border-[var(--border)] text-center">
                            <span className="font-mono text-[10px] text-[#566072] dark:text-[#8E9BB0]">
                                Powered by OpenID Connect & LinkedIn OAuth 2.0 API
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};


