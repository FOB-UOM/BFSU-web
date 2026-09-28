import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
    Building2, 
    ExternalLink, 
    Users, 
    GraduationCap, 
    Award, 
    ChevronRight,
    Compass,
    Cpu,
    Mail,
    Phone,
    MapPin,
    ArrowUpRight,
    Sparkles,
    ShieldCheck,
    MessageSquare,
    Terminal,
    Flame
} from 'lucide-react';
import { departmentsData } from '../../../data/departmentsData';
import { departmentalSocieties } from '../../../data/societiesData';
import { fetchBatchRepresentatives } from '../../../lib/data/entities';
import { UserAvatar } from '../../../components/UserAvatar';
import { DepartmentOfficialPortalEmbed } from '../../../components/departments/DepartmentOfficialPortalEmbed';
import { DepartmentAcademicStaffSection } from '../../../components/departments/DepartmentAcademicStaffSection';
import { getDepartmentStaffProfiles } from '../../../lib/data/facultyStaff';
import { GatedAcademicDriveCard } from '../../../components/collaboration/GatedAcademicDriveCard';

export async function generateStaticParams() {
    const params = [];
    departmentsData.forEach((dept) => {
        params.push({ slug: dept.slug });
        dept.aliases?.forEach((alias) => {
            params.push({ slug: alias });
        });
    });
    return params;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const dept = departmentsData.find(
        (d) => 
            d.slug.toLowerCase() === slug.toLowerCase() ||
            d.code.toLowerCase() === slug.toLowerCase() ||
            d.aliases?.some(a => a.toLowerCase() === slug.toLowerCase())
    );

    if (!dept) {
        return { title: 'Department Not Found' };
    }

    return {
        title: `${dept.name} (${dept.code}) | Faculty of Business`,
        description: `${dept.specializationSummary} Official university portal and student cohort life at University of Moratuwa.`,
    };
}

export default async function DepartmentDetailPage({ params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // Resolve department by slug, code, or alias
    const dept = departmentsData.find(
        (d) => 
            d.slug.toLowerCase() === slug.toLowerCase() ||
            d.code.toLowerCase() === slug.toLowerCase() ||
            d.aliases?.some(a => a.toLowerCase() === slug.toLowerCase())
    );

    if (!dept) {
        notFound();
    }

    // Resolve associated student society
    const society = departmentalSocieties.find(
        (s) => s.slug === dept.societySlug || s.code.toLowerCase() === dept.societyCode.toLowerCase()
    );

    // Resolve batch representatives for this department
    const allReps = await fetchBatchRepresentatives();
    const departmentReps = allReps.filter(
        (r) => (r.deptCode || r.department_code || '').toUpperCase() === dept.code.toUpperCase()
    );

    // Fetch academic and research staff profiles
    const departmentStaff = await getDepartmentStaffProfiles(dept.code);

    // Other departments for cross-navigation
    const otherDepartments = departmentsData.filter((d) => d.code !== dept.code);

    return (
        <div className="min-w-0 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-8 overflow-x-auto whitespace-nowrap pb-2">
                <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Portal</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/about#departments" className="hover:text-[var(--text-primary)] transition-colors">Academic Departments</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[var(--text-primary)] font-semibold">{dept.name}</span>
            </div>

            {/* Department Hero Section */}
            <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#C59B27]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-3xl relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C59B27]/15 text-[#C59B27] border border-[#C59B27]/30">
                            [{dept.code}] ACADEMIC DEPARTMENT
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
                            Faculty of Business • University of Moratuwa
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4 font-display">
                        {dept.name}
                    </h1>

                    <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                        {dept.overview || dept.specializationSummary}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href={dept.portalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5B842] hover:brightness-110 text-[#001738] font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#C59B27]/20 transition-all"
                        >
                            <span>Official UoM Department Portal</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>

                        {society && (
                            <Link
                                href={`/societies/${society.slug}`}
                                className="px-5 py-2.5 rounded-xl border border-[#C59B27]/40 bg-[#C59B27]/10 hover:bg-[#C59B27]/20 text-[#C59B27] font-bold text-xs flex items-center gap-2 transition-colors"
                            >
                                <Users className="w-4 h-4" />
                                <span>{society.name} ({society.code})</span>
                            </Link>
                        )}

                        <Link
                            href="/about#departments"
                            className="px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:bg-[var(--border)] text-[var(--text-primary)] font-semibold text-xs flex items-center gap-2 transition-colors"
                        >
                            <Compass className="w-4 h-4" />
                            <span>Faculty Overview</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* PART 1: OFFICIAL UNIVERSITY EMBED & ADMINISTRATIVE ATTRIBUTION */}
            {/* ============================================================== */}
            <div className="mb-14">
                <DepartmentOfficialPortalEmbed
                    departmentName={dept.name}
                    portalUrl={dept.portalUrl}
                    staffRosterUrl={dept.staffRosterUrl}
                    departmentCode={dept.code}
                />
            </div>

            {/* Academic Division & Faculty Curriculum Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Left 2 Cols: Academic Curriculum, Research & Labs */}
                <div className="lg:col-span-2 space-y-10">
                    {/* 1. Undergraduate Degree Program */}
                    <div className="p-8 border border-[var(--border)] bg-[var(--bg-surface)] rounded-2xl shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap className="w-5 h-5 text-[#C59B27]" />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                                Official Degree Awarded by University of Moratuwa
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                            {dept.undergraduate.degree}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2.5 py-1 rounded bg-[var(--bg-elevated)] text-xs font-mono font-semibold text-[var(--text-secondary)] border border-[var(--border)]">
                                {dept.undergraduate.abbreviation}
                            </span>
                            <span className="px-2.5 py-1 rounded bg-[var(--bg-elevated)] text-xs font-mono font-semibold text-[var(--text-secondary)] border border-[var(--border)]">
                                {dept.undergraduate.duration || '4 Years Full-Time'}
                            </span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                            {dept.undergraduate.focus}
                        </p>

                        <div className="border-t border-[var(--border)] pt-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                                Core Curriculum Highlights (Senate Approved)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {dept.undergraduate.curriculumHighlights?.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-[var(--bg-elevated)]/50 border border-[var(--border)] text-xs text-[var(--text-primary)]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {dept.undergraduate.careerProspects && (
                            <div className="border-t border-[var(--border)] pt-6 mt-6">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                                    Career Pathways & Industry Placement
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {dept.undergraduate.careerProspects.map((career, idx) => (
                                        <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-[#C59B27]/10 text-[var(--text-primary)] border border-[#C59B27]/20">
                                            {career}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. Laboratories & Research Facilities */}
                    {dept.facilities && dept.facilities.length > 0 && (
                        <div className="p-8 border border-[var(--border)] bg-[var(--bg-surface)] rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Cpu className="w-5 h-5 text-[#C59B27]" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                                    Specialized Computing & Simulation Environments
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                                Department Research Laboratories
                            </h2>

                            <div className="space-y-4">
                                {dept.facilities.map((fac, idx) => (
                                    <div key={idx} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]/40 hover:border-[#C59B27]/40 transition-colors">
                                        <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">
                                            {fac.name}
                                        </h3>
                                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                            {fac.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Col: Official Secretariat & Navigation */}
                <div className="space-y-6">
                    {/* Department Secretariat & Details Card */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 shadow-md">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-2">
                            Official Administration
                        </span>
                        <h3 className="font-bold text-base text-[var(--text-primary)] mb-4">
                            Secretariat & Office
                        </h3>

                        <div className="space-y-3.5 text-xs text-[var(--text-secondary)]">
                            <div className="flex items-start gap-2.5">
                                <Users className="w-4 h-4 text-[#C59B27] mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold text-[var(--text-primary)] block">Head of Department</span>
                                    <span>{dept.headName}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-[#C59B27] mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold text-[var(--text-primary)] block">Location</span>
                                    <span>{dept.officeLocation}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <Mail className="w-4 h-4 text-[#C59B27] mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold text-[var(--text-primary)] block">Official Email</span>
                                    <a href={`mailto:${dept.contactEmail}`} className="hover:text-[#C59B27] transition-colors">{dept.contactEmail}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <Phone className="w-4 h-4 text-[#C59B27] mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold text-[var(--text-primary)] block">Telephone</span>
                                    <span>{dept.telephone}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[var(--border)] space-y-2">
                            <a
                                href={dept.portalUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-2 px-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <span>Official Department Website</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            {dept.staffRosterUrl && (
                                <a
                                    href={dept.staffRosterUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-2 px-3 rounded-lg border border-[var(--border)] hover:border-[#C59B27] text-xs font-semibold text-[#C59B27] flex items-center justify-center gap-1.5 transition-colors"
                                >
                                    <span>Academic Staff Directory</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Other Departments Cross Navigation */}
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 shadow-md">
                        <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">
                            Other Academic Departments
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mb-4">
                            Explore other specializations under the Faculty of Business:
                        </p>

                        <div className="space-y-3">
                            {otherDepartments.map((other, idx) => (
                                <Link
                                    key={idx}
                                    href={`/departments/${other.slug}`}
                                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--border)] border border-[var(--border)] transition-colors group"
                                >
                                    <div>
                                        <p className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors">
                                            {other.name} ({other.code})
                                        </p>
                                        <span className="text-[10px] text-[var(--text-muted)]">
                                            {other.specializationTitle}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Academic Staff & Research Mentors Directory */}
            <DepartmentAcademicStaffSection 
                staffMembers={departmentStaff} 
                departmentName={dept.name} 
                departmentCode={dept.code} 
            />

            {/* ============================================================== */}
            {/* BOUNDARY DIVIDER: TRANSITION FROM UNIVERSITY TO STUDENT SPACE */}
            {/* ============================================================== */}
            <div className="my-16 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t-2 border-dashed border-[#C59B27]/40" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-[var(--bg-surface)] px-6 py-2 rounded-full border border-[var(--gold)]/50 text-[var(--gold)] font-mono text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-2">
                        <Sparkles size={14} className="text-[var(--gold)]" />
                        STUDENT PERSPECTIVE & COHORT LIFE
                        <Sparkles size={14} className="text-[var(--gold)]" />
                    </span>
                </div>
                <p className="text-center text-xs font-medium text-[var(--text-secondary)] max-w-xl mx-auto mt-4">
                    The space below is curated by the Business Faculty Students' Union (BFSU) and the department student body — highlighting student culture, peer initiatives, and democratic batch representation.
                </p>
            </div>

            {/* ============================================================== */}
            {/* PART 2: STUDENT PERSPECTIVE, PEER CULTURE & STUDENT SOCIETIES   */}
            {/* ============================================================== */}
            <div className="space-y-12">
                {/* 1. Student Culture & Peer Initiatives Card */}
                {dept.studentPerspective && (
                    <div className="p-8 sm:p-10 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[#FAF9F5] to-white dark:from-[#111622] dark:to-[#171E2E] shadow-lg relative overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                            <div className="max-w-2xl">
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] flex items-center gap-1.5 mb-2">
                                    <Flame size={14} className="text-[#C59B27]" />
                                    Department Peer Culture & Vibe
                                </span>
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                                    Life as a {dept.code} Undergrad
                                </h3>
                                <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                                    {dept.studentPerspective.culture}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#C59B27]/10 border border-[#C59B27]/30 max-w-xs shrink-0">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C59B27] font-bold block mb-1">
                                    Cohort Voice
                                </span>
                                <p className="text-xs italic text-[var(--text-primary)] font-medium">
                                    "{dept.studentPerspective.communityQuote}"
                                </p>
                            </div>
                        </div>

                        {/* Peer Initiatives Grid */}
                        <div className="border-t border-[var(--border)] pt-6">
                            <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text-muted)] mb-4">
                                Student-Led Peer Initiatives & Clinics
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {dept.studentPerspective.peerInitiatives.map((init, idx) => (
                                    <div 
                                        key={idx}
                                        className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-xs text-[var(--text-primary)] font-semibold flex items-center gap-2.5 shadow-2xs hover:border-[#C59B27]/40 transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-[#C59B27] shrink-0" />
                                        <span>{init}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Connected Student Society Card */}
                {society && (
                    <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 sm:p-10 shadow-lg relative overflow-hidden">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="max-w-2xl">
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-2">
                                    Departmental Student Society
                                </span>
                                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                                    {society.name} ({society.code})
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                                    {society.description}
                                </p>
                                <span className="inline-block font-mono text-xs text-[var(--text-muted)]">
                                    President: <strong className="text-[var(--text-primary)]">{society.presidentName}</strong> • {society.memberCount || 'All Specialization Students'}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                <Link
                                    href={`/societies/${society.slug}`}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5B842] text-[#001738] font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#C59B27]/20 hover:brightness-110 transition-all"
                                >
                                    <span>Explore {society.code} Society Space</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>

                                {society.workspaces?.google_drive && (
                                    <a
                                        href={society.workspaces.google_drive}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[#4285F4] hover:text-[#4285F4] text-xs font-semibold text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                                    >
                                        <span>Google Drive</span>
                                        <ExternalLink size={12} />
                                    </a>
                                )}

                                {society.workspaces?.notion && (
                                    <a
                                        href={society.workspaces.notion}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[#C59B27] hover:text-[#C59B27] text-xs font-semibold text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                                    >
                                        <span>Notion Workspace</span>
                                        <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Protected Academic Past Papers & Lecture Materials */}
                <GatedAcademicDriveCard 
                    departmentCode={dept.code} 
                    departmentName={dept.name} 
                />

                {/* 4. Democratic Batch Representatives (Student Voice) */}
                {departmentReps.length > 0 && (
                    <div className="p-8 sm:p-10 border border-[var(--border)] bg-[var(--bg-surface)] rounded-3xl shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)]">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-1">
                                    Democratic Cohort Representation
                                </span>
                                <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                                    Department Batch Representatives
                                </h3>
                            </div>
                            <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#C59B27]/10 text-[#C59B27] font-bold self-start sm:self-auto border border-[#C59B27]/30">
                                2 ELECTED REPS PER INTAKE
                            </span>
                        </div>

                        <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed max-w-3xl">
                            Undergraduates in this specialization elect two batch representatives per academic intake cohort. These student representatives voice cohort concerns to the Student Union and faculty administration, coordinate timetable adjustments, and maintain student batch welfare.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {departmentReps.map((rep, idx) => (
                                <div key={idx} className="flex items-center gap-3.5 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/50 hover:border-[#C59B27]/40 transition-colors">
                                    <UserAvatar
                                        src={rep.avatarUrl}
                                        name={rep.name}
                                        size="md"
                                        peekable={true}
                                        username={rep.username}
                                        profileData={{
                                            full_name: rep.name,
                                            username: rep.username,
                                            avatar_url: rep.avatarUrl,
                                            role_title: `${rep.batchName} ${dept.code} Representative`,
                                            department: dept.name,
                                            headline: rep.headline,
                                            email: rep.email
                                        }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-bold text-[var(--text-primary)] truncate">
                                            {rep.name}
                                        </div>
                                        <div className="font-mono text-[10px] text-[#C59B27] font-semibold">
                                            {rep.batchName} ({rep.academicYearTerm})
                                        </div>
                                        {rep.email && (
                                            <a 
                                                href={`mailto:${rep.email}`}
                                                className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[#C59B27] truncate block transition-colors"
                                            >
                                                {rep.email}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
