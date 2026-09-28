'use client';

import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { BookOpen, ExternalLink, Code2, LineChart, Cpu, Sparkles, X } from 'lucide-react';
import { UniversalDocumentEmbedder } from '../components/collaboration/UniversalDocumentEmbedder';

export const ResearchPage = ({ papers = [], projects = [] }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [activePreviewDoc, setActivePreviewDoc] = useState(null);

    // Combine database papers and student projects
    const allItems = [
        ...papers.map(p => {
            const lowerTitle = (p.title + ' ' + (p.journal_or_conf || '')).toLowerCase();
            let category = 'analytics';
            if (lowerTitle.includes('finance') || lowerTitle.includes('liquidity') || lowerTitle.includes('banking') || lowerTitle.includes('fsm')) {
                category = 'finance';
            } else if (lowerTitle.includes('process') || lowerTitle.includes('rpa') || lowerTitle.includes('erp') || lowerTitle.includes('bpm')) {
                category = 'bpm';
            }

            return {
                id: p.id,
                department: p.journal_or_conf || "DL UoM Research Archive",
                category,
                title: p.title,
                students: p.author_name,
                abstract: p.abstract,
                tags: ["Undergraduate Thesis", "Peer-Reviewed", p.published_year || "2026"],
                link: p.paper_url || "http://dl.lib.mrt.ac.lk/"
            };
        }),
        ...projects.map(pr => ({
            id: pr.id,
            department: pr.profile?.department || "Faculty of Business",
            category: 'analytics',
            title: pr.title,
            students: pr.profile?.full_name || "Student Innovator",
            abstract: pr.description || "Applied enterprise systems project.",
            tags: pr.tags || ["Project Showcase"],
            link: pr.live_url || pr.github_url || "#"
        }))
    ];

    // Fallback if no records currently in DB
    const displayItems = allItems.length > 0 ? allItems : [
        {
            id: 1,
            department: "Decision Sciences (Business Analytics)",
            category: "analytics",
            title: "Predictive Modeling of Colombo Port Container Congestion",
            students: "Batch '21 Analytics Cohort",
            abstract: "A machine learning and stochastic queueing model to predict quay crane waiting times and yard utilization during monsoon transshipment surges.",
            tags: ["Python", "XGBoost", "Operations Research", "Supply Chain"],
            link: "http://dl.lib.mrt.ac.lk/"
        },
        {
            id: 2,
            department: "Financial Services Management",
            category: "finance",
            title: "Decentralized Liquidity Risks in Sri Lankan Microfinance Institutions",
            students: "Batch '21 Finance Scholars",
            abstract: "Econometric analysis evaluating interest rate sensitivity, rural credit delinquency patterns, and capital adequacy ratios under macroeconomic restructuring.",
            tags: ["Econometrics", "Risk Analytics", "Banking", "Financial Services"],
            link: "http://dl.lib.mrt.ac.lk/"
        },
        {
            id: 3,
            department: "Industrial Management (BPM)",
            category: "bpm",
            title: "Robotic Process Automation in Apparel ERP Export Compliance",
            students: "Batch '22 Enterprise Systems Group",
            abstract: "Architecting end-to-end automated documentation pipelines for GSP+ trade compliance across multi-facility apparel exporters in Sri Lanka.",
            tags: ["BPMN 2.0", "RPA", "Enterprise Systems", "Operations"],
            link: "http://dl.lib.mrt.ac.lk/"
        }
    ];

    const filteredProjects = activeTab === 'all' 
        ? displayItems 
        : displayItems.filter(p => p.category === activeTab);

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                {/* Header */}
                <div className="max-w-2xl mb-12">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-3">
                        Scholarly Output
                    </span>
                    <Typography variant="h1" className="mb-4 !font-display !font-bold !text-3xl sm:!text-5xl text-[var(--text-primary)]">
                        Research & Project Showcase
                    </Typography>
                    <p className="font-body text-base sm:text-lg text-[#333C4D] dark:text-[#CBD5E1] font-medium leading-relaxed">
                        Exemplary undergraduate research, applied industry dissertations, and technology projects engineered by students of the Faculty of Business.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-[var(--border)] font-mono text-xs">
                    {[
                        { id: 'all', label: 'All Disciplines' },
                        { id: 'analytics', label: 'Business Analytics (DS)' },
                        { id: 'finance', label: 'Financial Services (FSM)' },
                        { id: 'bpm', label: 'Process Management (DIM)' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3.5 py-1.5 uppercase tracking-wider transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-[#12161F] text-white dark:bg-[var(--bg-surface)] dark:text-[var(--text-primary)] font-bold'
                                    : 'border border-[var(--border)] text-[#566072] dark:text-[#94A3B8] hover:border-[#C59B27]'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Projects Showcase Ledger */}
                <div className="space-y-8">
                    {filteredProjects.map((p) => (
                        <div
                            key={p.id}
                            className="p-6 sm:p-8 border border-[var(--border)] bg-[#F4F2EC]/40 dark:bg-[var(--bg-surface)] flex flex-col justify-between rounded-sm"
                        >
                            <div>
                                <div className="flex flex-wrap justify-between items-center gap-2 font-mono text-xs text-[#566072] dark:text-[#8E9BB0] mb-3">
                                    <span className="text-[#C59B27] font-semibold uppercase tracking-wider">
                                        {p.department}
                                    </span>
                                    <span>{p.students}</span>
                                </div>

                                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3">
                                    {p.title}
                                </h3>

                                <p className="font-body text-sm sm:text-base text-[#4A5364] dark:text-[#CBD5E1] leading-relaxed mb-6">
                                    {p.abstract}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-2 py-0.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] uppercase tracking-wider text-[#566072] dark:text-[#94A3B8] rounded-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setActivePreviewDoc(p)}
                                        className="font-bold uppercase tracking-wider text-[#C59B27] hover:underline inline-flex items-center gap-1.5"
                                    >
                                        <BookOpen size={13} />
                                        <span>Interactive Reader</span>
                                    </button>
                                    <a
                                        href={p.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-1.5"
                                    >
                                        <span>Repository</span>
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Interactive Document Preview Modal */}
                {activePreviewDoc && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
                        <div className="max-w-5xl w-full bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
                            <div className="p-4 border-b border-[var(--border)] bg-[var(--bg-elevated)]/60 flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#C59B27] block">
                                        Scholarly Document & Flipbook Reader
                                    </span>
                                    <h3 className="font-display font-bold text-base text-[var(--text-primary)] truncate">
                                        {activePreviewDoc.title}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setActivePreviewDoc(null)}
                                    className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
                                    title="Close Reader"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="flex-1 p-2 sm:p-4 overflow-y-auto">
                                <UniversalDocumentEmbedder
                                    url={activePreviewDoc.link}
                                    title={activePreviewDoc.title}
                                    description={`${activePreviewDoc.department} • ${activePreviewDoc.students}`}
                                    preferredMode="flipbook"
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
