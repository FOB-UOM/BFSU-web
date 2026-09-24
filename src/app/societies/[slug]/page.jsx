import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
    Building2, 
    ArrowLeft, 
    Sparkles, 
    ExternalLink, 
    Users, 
    Calendar, 
    Award, 
    ChevronRight,
    Compass
} from 'lucide-react';
import { departmentalSocieties, unionNotionConfig } from '../../../data/societiesData';
import { NotionHubWidget } from '../../../components/NotionHubWidget';
import { UserAvatar } from '../../../components/UserAvatar';

export async function generateStaticParams() {
    return departmentalSocieties.map((society) => ({
        slug: society.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const society = departmentalSocieties.find(s => s.slug === slug);

    if (!society) {
        return {
            title: 'Society Not Found | BFSU UoM'
        };
    }

    return {
        title: `${society.name} (${society.code})`,
        description: society.description,
        openGraph: {
            title: `${society.name} | Faculty of Business, University of Moratuwa`,
            description: society.description,
        }
    };
}

export default async function SocietyPage({ params }) {
    const { slug } = await params;
    const society = departmentalSocieties.find(s => s.slug === slug);

    if (!society) {
        notFound();
    }

    // Other two departmental societies for quick navigation
    const otherSocieties = departmentalSocieties.filter(s => s.slug !== slug);

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-8">
                <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
                    Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">
                    Departments
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[var(--text-primary)] font-semibold">{society.name}</span>
            </div>

            {/* Hero Section */}
            <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 sm:p-12 mb-12 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#C59B27]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-3xl relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C59B27]/15 text-[#C59B27] border border-[#C59B27]/30">
                            {society.code} Official Society
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
                            {society.departmentName}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4 font-display">
                        {society.name}
                    </h1>

                    <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                        {society.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href={society.notion.workspaceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5B842] hover:brightness-110 text-[#001738] font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#C59B27]/20 transition-all"
                        >
                            <span>Launch Society Notion Hub</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                            href="/about#departments"
                            className="px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:bg-[var(--border)] text-[var(--text-primary)] font-semibold text-xs flex items-center gap-2 transition-colors"
                        >
                            <Compass className="w-4 h-4" />
                            <span>Faculty Directory</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Left 2 Cols: Executive Leadership & Flagship Initiatives */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Executive Board */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                                    Society Executive Board
                                </h2>
                                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                                    Student delegates managing operations, corporate engagements, and academic workshops. Click any delegate to peek into their verified institutional profile.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {society.executiveBoard.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[#C59B27]/40 transition-all shadow-md group relative"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <UserAvatar
                                            src={member.avatar}
                                            name={member.name}
                                            size="md"
                                            peekable={true}
                                            username={member.username}
                                            profileData={{
                                                full_name: member.name,
                                                username: member.username,
                                                avatar_url: member.avatar,
                                                role_title: `${society.code} ${member.role}`,
                                                department: society.departmentName,
                                                batch: member.batch,
                                                headline: member.headline
                                            }}
                                        />
                                        <div className="min-w-0">
                                            <p className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors truncate">
                                                {member.name}
                                            </p>
                                            <span className="text-[11px] font-semibold text-[#C59B27] block">
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                                        {member.headline}
                                    </p>

                                    <div className="flex items-center justify-between text-[11px] pt-3 border-t border-[var(--border)] text-[var(--text-muted)]">
                                        <span>{member.batch}</span>
                                        <Link 
                                            href={`/u/${member.username}`}
                                            className="text-[#C59B27] hover:underline font-medium"
                                        >
                                            View Profile &rarr;
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Flagship Initiatives */}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-6">
                            Flagship Initiatives & Programs
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {society.initiatives.map((init, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-md"
                                >
                                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)] mb-3">
                                        {init.type}
                                    </span>
                                    <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">
                                        {init.title}
                                    </h3>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        {init.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: Notion Hub Widget & Sister Societies */}
                <div className="space-y-8">
                    {/* Connected Notion Hub */}
                    <NotionHubWidget
                        title={society.notion.workspaceName}
                        workspaceUrl={society.notion.workspaceUrl}
                        description={society.notion.description}
                        resources={society.notion.resources}
                        stats={society.stats}
                    />

                    {/* Sister Departmental Societies Navigation */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 shadow-md">
                        <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">
                            Explore Other Departmental Societies
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mb-4">
                            Official student organizations under the Faculty of Business:
                        </p>

                        <div className="space-y-3">
                            {otherSocieties.map((other, idx) => (
                                <Link
                                    key={idx}
                                    href={`/societies/${other.slug}`}
                                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--border)] border border-[var(--border)] transition-colors group"
                                >
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors">
                                            {other.name} ({other.code})
                                        </p>
                                        <span className="text-[10px] text-[var(--text-muted)]">
                                            {other.departmentName}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
