'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { QRCodeSVG } from 'qrcode.react';
import { 
    Briefcase, 
    BookOpen, 
    MapPin, 
    Mail, 
    Phone, 
    Globe, 
    ExternalLink, 
    ArrowLeft, 
    CheckCircle2, 
    Calendar, 
    Award, 
    Shield, 
    History, 
    Sparkles, 
    Building2,
    Copy,
    Check,
    Share2,
    Info
} from 'lucide-react';
import { SafeExternalLink } from '../common/SafeExternalLink';
import { sanitizeUrl, buildSafeShareUrl } from '../../lib/security/safeLinks';


export const StaffProfileView = ({ staff }) => {
    const [copied, setCopied] = useState(false);

    if (!staff) return null;

    const isAcademic = staff.staffCategory === 'academic';
    const activeAppointment = staff.currentAppointment;
    const allAppointments = staff.allAppointments || [];

    const shareUrl = typeof window !== 'undefined' 
        ? window.location.href 
        : `https://bfsu-uom.lk/u/${staff.username || staff.id}`;

    const linkedinShareUrl = buildSafeShareUrl('linkedin', { url: shareUrl, title: staff.fullName });

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Department routing fallback
    const getDepartmentHref = (deptCode) => {
        switch (deptCode?.toUpperCase()) {
            case 'DS':
                return '/departments/decision-sciences';
            case 'IM':
                return '/departments/industrial-management';
            case 'MOT':
                return '/departments/mot';
            case 'DEANERY':
            case 'SECRETARIAT':
                return '/about#dean-office';
            default:
                return '/about';
        }
    };

    const qrPayload = JSON.stringify({
        org: 'BFSU-UOM-OPERATIONAL',
        uid: staff.username,
        name: staff.fullName,
        role: staff.designation,
        category: staff.staffCategory,
        verified: true
    });

    return (
        <main className="flex-grow pt-32 pb-24 relative transition-colors duration-500">
            <Container className="max-w-5xl relative z-10">

                {/* Back & Share Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <Link 
                        href={getDepartmentHref(staff.primaryDepartmentCode)}
                        className="inline-flex items-center gap-2 text-[#566072] dark:text-[#9CA3AF] hover:text-[#C59B27] font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to {staff.department || 'Directory'}
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopyLink}
                            className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] px-3 py-1.5 rounded-sm font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-all"
                        >
                            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                            <span>{copied ? 'Copied' : 'Copy Profile Link'}</span>
                        </button>

                        <a
                            href={linkedinShareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#0077B5] hover:bg-[#005E93] text-white px-3 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-all"
                        >
                            <span className="bg-white text-[#0077B5] px-1 rounded-[2px] text-[10px] font-black leading-none py-0.5">in</span>
                            <span>Share</span>
                        </a>
                    </div>
                </div>

                {/* Hero Header Card */}
                <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-10 rounded-2xl shadow-xl mb-10 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[var(--border)]">
                        <div className="flex items-start gap-5">
                            {/* Academic Monogram Avatar */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#C59B27]/25 via-[#FAF9F5] dark:via-[#111622] to-[#C59B27]/10 border-2 border-[#C59B27]/50 flex items-center justify-center font-display font-bold text-2xl sm:text-3xl text-[#C59B27] shadow-inner shrink-0">
                                {staff.preferredName ? staff.preferredName.charAt(0) : staff.fullName.charAt(0)}
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-sm bg-[#C59B27]/15 border border-[#C59B27]/40 text-[#C59B27] font-bold uppercase tracking-widest">
                                        {isAcademic ? 'Academic Staff' : 'Faculty Administration'}
                                    </span>
                                    <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                                        <CheckCircle2 size={12} /> Operational Ledger Verified
                                    </span>
                                    {activeAppointment && (
                                        <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold uppercase">
                                            {activeAppointment.roleTitle}
                                        </span>
                                    )}
                                </div>

                                <h1 className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-primary)]">
                                    {staff.honorific} {staff.fullName}
                                </h1>
                                <p className="font-body text-sm sm:text-base text-[#C59B27] mt-1 font-semibold">
                                    {staff.designation}
                                </p>
                            </div>
                        </div>

                        {/* Operational QR Pass */}
                        <div className="hidden md:flex flex-col items-center p-3 rounded-xl bg-white shadow-md border border-[var(--border)] shrink-0 text-center">
                            <QRCodeSVG value={qrPayload} size={84} level="M" fgColor="#12161F" />
                            <span className="font-mono text-[8px] uppercase tracking-wider text-[#12161F] mt-1.5 font-bold">
                                Staff Ledger ID
                            </span>
                        </div>
                    </div>

                    {/* Metadata Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-[var(--border)] font-mono text-xs">
                        <div>
                            <span className="text-[10px] uppercase text-[var(--text-faint)] block mb-1">Affiliation / Entity</span>
                            <Link 
                                href={getDepartmentHref(staff.primaryDepartmentCode)}
                                className="font-semibold text-[var(--text-primary)] hover:text-[#C59B27] block transition-colors truncate"
                            >
                                {staff.department}
                            </Link>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-[var(--text-faint)] block mb-1">Office Location</span>
                            <span className="font-semibold text-[var(--text-primary)] block truncate">
                                {staff.officeLocation || 'FOB Complex, UoM'}
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-[var(--text-faint)] block mb-1">Official Email</span>
                            <a 
                                href={`mailto:${staff.email}`}
                                className="font-semibold text-[#C59B27] hover:underline block truncate"
                            >
                                {staff.email}
                            </a>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-[var(--text-faint)] block mb-1">Direct Extension</span>
                            <span className="font-semibold text-[var(--text-primary)] block truncate">
                                {staff.phone || 'UoM Intercom'}
                            </span>
                        </div>
                    </div>

                    {/* Academic Bio / Administrative Scope */}
                    {(staff.academicBio || staff.operationalScope) && (
                        <div className="pt-6">
                            <p className="font-body text-sm sm:text-base text-[#4A5364] dark:text-[#CBD5E1] leading-relaxed max-w-3xl">
                                {staff.academicBio || staff.operationalScope}
                            </p>
                        </div>
                    )}

                    {/* Academic Profiles & Communication Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-6">
                        {staff.googleScholarUrl && (
                            <SafeExternalLink
                                href={staff.googleScholarUrl}
                                platform="googlescholar"
                                className="px-3.5 py-1.5 rounded-sm bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] dark:text-blue-300 font-mono text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#4285F4]/20 transition-colors"
                            >
                                <Globe size={13} />
                                <span>Google Scholar</span>
                                <ExternalLink size={12} />
                            </SafeExternalLink>
                        )}

                        {staff.researchGateUrl && (
                            <SafeExternalLink
                                href={staff.researchGateUrl}
                                platform="researchgate"
                                className="px-3.5 py-1.5 rounded-sm bg-[#00CCBB]/10 border border-[#00CCBB]/30 text-[#00CCBB] dark:text-emerald-300 font-mono text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#00CCBB]/20 transition-colors"
                            >
                                <Award size={13} />
                                <span>ResearchGate</span>
                                <ExternalLink size={12} />
                            </SafeExternalLink>
                        )}

                        {staff.email && (
                            <a
                                href={sanitizeUrl(`mailto:${staff.email}`, '#')}
                                className="px-3.5 py-1.5 rounded-sm bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#C59B27] font-mono text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#C59B27]/20 transition-colors"
                            >
                                <Mail size={13} />
                                <span>Send Direct Email</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Two Column Layout: Time-Bounded Tenures & Academic Focus */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Column 1: Time-Bounded Faculty Appointments & Career Continuity */}
                    <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
                            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <History size={18} className="text-[#C59B27]" />
                                <span>Institutional Tenures & Appointments</span>
                            </h2>
                            <span className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                                {allAppointments.length} Record{allAppointments.length === 1 ? '' : 's'}
                            </span>
                        </div>

                        {allAppointments.length === 0 ? (
                            <p className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF] py-6 text-center">
                                Direct academic appointment.
                            </p>
                        ) : (
                            <div className="space-y-6">
                                {allAppointments.map((apt, idx) => (
                                    <div key={idx} className="relative pl-6 border-l-2 border-[#C59B27]/40 space-y-1.5">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#C59B27]" />
                                        
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                                                {apt.roleTitle}
                                            </h3>
                                            {apt.isCurrent ? (
                                                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold uppercase shrink-0">
                                                    Active Term
                                                </span>
                                            ) : (
                                                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] font-semibold shrink-0">
                                                    Past Term
                                                </span>
                                            )}
                                        </div>

                                        <p className="font-mono text-xs text-[#C59B27] font-semibold">
                                            {apt.termLabel}
                                        </p>

                                        {apt.notes && (
                                            <p className="font-body text-xs text-[#4A5364] dark:text-[#9CA3AF] leading-relaxed">
                                                {apt.notes}
                                            </p>
                                        )}

                                        {apt.sourceReference && (
                                            <span className="font-mono text-[10px] text-[var(--text-faint)] block pt-1">
                                                Source: {apt.sourceReference}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Column 2: Research Interests, Teaching & Disclaimers */}
                    <div className="space-y-8">

                        {/* Research Themes (if academic) */}
                        {isAcademic && staff.researchInterests && staff.researchInterests.length > 0 && (
                            <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl shadow-sm">
                                <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-6 pb-4 border-b border-[var(--border)] flex items-center gap-2">
                                    <BookOpen size={18} className="text-[var(--gold)]" />
                                    <span>Research Themes & Supervision Areas</span>
                                </h2>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {staff.researchInterests.map((interest, idx) => (
                                        <span 
                                            key={idx}
                                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] shadow-2xs"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>

                                {staff.teachingAreas && staff.teachingAreas.length > 0 && (
                                    <div className="pt-4 border-t border-[var(--border)]">
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block mb-2 font-bold">
                                            Teaching & Module Focus:
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {staff.teachingAreas.map((area, idx) => (
                                                <span 
                                                    key={idx}
                                                    className="px-2.5 py-1 rounded text-[11px] font-mono bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)]"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Administrative Operational Scope (if non-academic) */}
                        {!isAcademic && staff.operationalScope && (
                            <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl shadow-sm">
                                <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-6 pb-4 border-b border-[var(--border)] flex items-center gap-2">
                                    <Building2 size={18} className="text-[#C59B27]" />
                                    <span>Administrative Directorate Scope</span>
                                </h2>
                                <p className="font-body text-xs sm:text-sm text-[#4A5364] dark:text-[#9CA3AF] leading-relaxed">
                                    {staff.operationalScope}
                                </p>
                            </div>
                        )}

                        {/* Supervisor Inquiries & Guidance Notice */}
                        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[#C59B27]/30 shadow-xs relative overflow-hidden">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-[#C59B27]/10 text-[#C59B27] shrink-0 mt-0.5">
                                    <Sparkles size={16} />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="font-display text-sm font-bold text-[var(--text-primary)]">
                                        Undergraduate Research & Guidance
                                    </h4>
                                    <p className="font-body text-xs text-[#566072] dark:text-[#9CA3AF] leading-relaxed">
                                        For comprehensive thesis supervision inquiries, research proposals, or academic mentorship, students are encouraged to reach out during departmental consultation hours or initiate inquiries via official university email.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Operational Ledger Dual-Sovereignty Disclaimer */}
                        <div className="p-5 rounded-2xl bg-[var(--bg-elevated)]/50 border border-[var(--border)] text-xs text-[var(--text-muted)] space-y-2">
                            <div className="flex items-center gap-2 font-mono text-[10px] text-[#C59B27] font-bold uppercase tracking-wider">
                                <Info size={13} />
                                <span>Dual-Sovereignty Operational Notice</span>
                            </div>
                            <p className="leading-relaxed">
                                This faculty staff directory profile is an <strong>unofficial operational ledger</strong> indexed by the Business Faculty Students' Union (BFSU). It serves to provide immediate institutional transparency and reduce information lag for undergraduates. Official degree accreditation, tenure gazettes, and university bylaws are governed solely by the Council and Senate of the University of Moratuwa.
                            </p>
                        </div>

                    </div>

                </div>

            </Container>
        </main>
    );
};
