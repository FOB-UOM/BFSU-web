'use client';

import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { BookOpen, ExternalLink, Code2, LineChart, Cpu, Sparkles } from 'lucide-react';

export const ResearchPage = () => {
    const [activeTab, setActiveTab] = useState('all');

    const projects = [
        {
            id: 1,
            department: "Decision Sciences (Business Analytics)",
            category: "analytics",
            title: "Predictive Modeling of Colombo Port Container Congestion",
            students: "Batch '21 Analytics Cohort",
            supervisor: "Prof. Decision Sciences",
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
            supervisor: "Senior Lecturer, Dept of FSM",
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
            supervisor: "Senior Lecturer, Dept of IM",
            abstract: "Architecting end-to-end automated documentation pipelines for GSP+ trade compliance across multi-facility apparel exporters in Sri Lanka.",
            tags: ["BPMN 2.0", "RPA", "Enterprise Systems", "Operations"],
            link: "http://dl.lib.mrt.ac.lk/"
        },
        {
            id: 4,
            department: "Decision Sciences (Business Analytics)",
            category: "analytics",
            title: "High-Frequency Consumer Sentiment Index from Sinhala/Tamil Social Data",
            students: "Batch '22 NLP Research Group",
            supervisor: "Visiting Fellow, AI & Analytics",
            abstract: "Transformer-based multilingual sentiment evaluation monitoring FMCG retail price elasticities and inflation perception in real-time.",
            tags: ["NLP", "Transformers", "Consumer Analytics", "PyTorch"],
            link: "http://dl.lib.mrt.ac.lk/"
        }
    ];

    const filteredProjects = activeTab === 'all' 
        ? projects 
        : projects.filter(p => p.category === activeTab);

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                {/* Header */}
                <div className="max-w-2xl mb-12">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-3">
                        Scholarly Output
                    </span>
                    <Typography variant="h1" className="mb-4 !font-display !font-bold !text-3xl sm:!text-5xl text-[var(--text-primary)] ">
                        Research & Project Showcase
                    </Typography>
                    <p className="font-body text-base sm:text-lg text-[#333C4D] font-medium leading-relaxed">
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
                            className="p-6 sm:p-8 border border-[var(--border)] bg-[#F4F2EC]/40 /40 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex flex-wrap justify-between items-center gap-2 font-mono text-xs text-[#566072] dark:text-[#8E9BB0] mb-3">
                                    <span className="text-[#C59B27] font-semibold uppercase tracking-wider">
                                        {p.department}
                                    </span>
                                    <span>{p.students}</span>
                                </div>

                                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]  mb-3">
                                    {p.title}
                                </h3>

                                <p className="font-body text-sm sm:text-base text-[#4A5364] dark:text-[#94A3B8] leading-relaxed mb-6">
                                    {p.abstract}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-2 py-0.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] uppercase tracking-wider text-[#566072] dark:text-[#94A3B8]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={p.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-bold uppercase tracking-wider text-[var(--text-primary)]  hover:text-[#C59B27] inline-flex items-center gap-1.5"
                                >
                                    <span>University Repository</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
};

