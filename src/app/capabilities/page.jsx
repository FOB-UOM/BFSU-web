'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
    Search, 
    Sparkles, 
    ExternalLink, 
    CheckCircle2, 
    Clock, 
    HelpCircle, 
    Smartphone, 
    Database, 
    Layers, 
    Compass, 
    AlertCircle,
    ArrowUpRight,
    Filter,
    Shield
} from 'lucide-react';
import { systemCapabilities } from '../../data/capabilitiesData';

export default function CapabilitiesPage() {
    const [selectedDomain, setSelectedDomain] = useState('ALL');
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const domains = useMemo(() => {
        const set = new Set(systemCapabilities.map(c => c.domain));
        return ['ALL', ...Array.from(set)];
    }, []);

    const filteredCapabilities = useMemo(() => {
        return systemCapabilities.filter(item => {
            const matchesDomain = selectedDomain === 'ALL' || item.domain === selectedDomain;
            const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
            const matchesSearch = searchTerm === '' || 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.carrierKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.whatIsMissing.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesDomain && matchesStatus && matchesSearch;
        });
    }, [selectedDomain, selectedStatus, searchTerm]);

    const stats = useMemo(() => {
        const total = systemCapabilities.length;
        const live = systemCapabilities.filter(c => c.status === 'LIVE').length;
        const inProgress = systemCapabilities.filter(c => c.status === 'IN_PROGRESS').length;
        const notionPowered = systemCapabilities.filter(c => c.carrier.toLowerCase().includes('notion')).length;
        return { total, live, inProgress, notionPowered };
    }, []);

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#C59B27]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-3xl relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C59B27]/15 text-[#C59B27] border border-[#C59B27]/30 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            System Cockpit & Exhaustive Ledger
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--border)]">
                            v2026.09
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4 font-display">
                        Platform Capabilities & Feature Inventory
                    </h1>

                    <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                        The live, exhaustive map of everything built, in progress, and planned across the BFSU digital ecosystem. Know exactly what features exist, where their code lives, their data carriers, and how to update them directly from your phone via Notion.
                    </p>

                    {/* Stats Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                        <div>
                            <span className="text-[10px] uppercase font-mono text-[var(--text-muted)] block mb-1">Total Capabilities</span>
                            <span className="text-xl font-bold text-[var(--text-primary)]">{stats.total} Tracked</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase font-mono text-emerald-500 block mb-1">Live & Functional</span>
                            <span className="text-xl font-bold text-emerald-500">{stats.live} Active</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase font-mono text-amber-500 block mb-1">In Progress</span>
                            <span className="text-xl font-bold text-amber-500">{stats.inProgress} Refining</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase font-mono text-[#C59B27] block mb-1">Notion Mobile Carrier</span>
                            <span className="text-xl font-bold text-[#C59B27]">{stats.notionPowered} Modules</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="space-y-4 mb-8">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search capability, keyword, Notion DB, or missing feature..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#C59B27] transition-colors"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        {['ALL', 'LIVE', 'IN_PROGRESS'].map(status => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                                    selectedStatus === status
                                        ? 'bg-[#C59B27] text-[#001738] shadow-sm'
                                        : 'bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[#C59B27]/40'
                                }`}
                            >
                                {status === 'ALL' ? 'All Status' : status.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Domain Category Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                    {domains.map(dom => (
                        <button
                            key={dom}
                            onClick={() => setSelectedDomain(dom)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                selectedDomain === dom
                                    ? 'bg-[var(--text-primary)] text-[var(--bg-page)] shadow-sm'
                                    : 'bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            {dom}
                        </button>
                    ))}
                </div>
            </div>

            {/* Capabilities Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {filteredCapabilities.map(item => {
                    const isLive = item.status === 'LIVE';
                    const isNotion = item.carrier.toLowerCase().includes('notion');

                    return (
                        <div
                            key={item.id}
                            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 shadow-md hover:border-[#C59B27]/40 transition-all flex flex-col justify-between group"
                        >
                            <div>
                                {/* Top Badges */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="font-mono text-[10px] font-bold text-[#C59B27] uppercase tracking-wider px-2 py-0.5 rounded bg-[#C59B27]/10 border border-[#C59B27]/20">
                                        {item.domain}
                                    </span>
                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                        isLive 
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                    }`}>
                                        {isLive ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {item.status.replace('_', ' ')}
                                    </span>
                                </div>

                                {/* Title & Description */}
                                <h3 className="font-bold text-base text-[var(--text-primary)] mb-2 group-hover:text-[#C59B27] transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                                    {item.description}
                                </p>

                                {/* Carrier Info */}
                                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] mb-4 text-xs space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase font-mono text-[var(--text-muted)] flex items-center gap-1">
                                            <Database className="w-3 h-3 text-[#C59B27]" />
                                            Data Carrier
                                        </span>
                                        <span className="font-semibold text-[var(--text-primary)] text-[11px]">
                                            {item.carrier}
                                        </span>
                                    </div>
                                    <div className="text-[10px] font-mono text-[var(--text-secondary)] truncate">
                                        Key: {item.carrierKey}
                                    </div>
                                </div>

                                {/* Mobile Update Instructions */}
                                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 mb-4">
                                    <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1 mb-1">
                                        <Smartphone className="w-3 h-3" />
                                        How to update via Notion Mobile
                                    </span>
                                    <p className="text-xs text-[var(--text-secondary)] leading-snug">
                                        {item.mobileInstructions}
                                    </p>
                                </div>

                                {/* What is missing / Gaps */}
                                <div className="mb-4">
                                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block mb-1">
                                        Backlog & Gaps
                                    </span>
                                    <p className="text-xs text-[var(--text-muted)] italic">
                                        {item.whatIsMissing}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Live Action */}
                            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                                    {item.route}
                                </span>
                                {item.route.startsWith('/') && !item.route.includes('[') ? (
                                    <Link
                                        href={item.route}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-[#C59B27] hover:underline"
                                    >
                                        <span>Test Live</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                ) : (
                                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                                        Dynamic Route
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Architecture Ledger Footer Link */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">
                        Looking for detailed technical schemas & ADRs?
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Read the complete documentation in accordance with the Polymath Documentation SOP.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/about#union-notion"
                        className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
                    >
                        Union Notion Hub
                    </Link>
                </div>
            </div>
        </div>
    );
}
