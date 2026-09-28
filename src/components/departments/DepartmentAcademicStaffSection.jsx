'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    BookOpen, 
    GraduationCap, 
    ExternalLink, 
    Mail, 
    MapPin, 
    Phone, 
    History, 
    ChevronDown, 
    ChevronUp,
    Sparkles,
    ShieldAlert,
    User
} from 'lucide-react';

export const DepartmentAcademicStaffSection = ({ 
    staffMembers = [], 
    departmentName = '',
    departmentCode = ''
}) => {
    const [expandedHistory, setExpandedHistory] = useState({});

    const toggleHistory = (staffId) => {
        setExpandedHistory(prev => ({
            ...prev,
            [staffId]: !prev[staffId]
        }));
    };

    if (!staffMembers || staffMembers.length === 0) {
        return null;
    }

    return (
        <div className="p-8 sm:p-10 border border-[var(--border)] bg-[var(--bg-surface)] rounded-3xl shadow-sm mb-16">
            {/* Header with Operational Disclaimer */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--border)]">
                <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#C59B27] bg-[#C59B27]/10 px-2.5 py-0.5 rounded-sm border border-[#C59B27]/20">
                            ACADEMIC PROFILES & RESEARCH MENTORSHIP
                        </span>
                        <span className="font-mono text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                            <ShieldAlert size={11} className="text-[#C59B27]" />
                            Internal Operational Reference
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                        Faculty Mentors & Research Supervisors
                    </h3>
                </div>

                <div className="font-mono text-xs text-[var(--text-muted)] max-w-sm text-left md:text-right">
                    <span>Curated by students to assist with research supervisor selection and academic guidance.</span>
                </div>
            </div>

            {/* Staff Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {staffMembers.map((staff) => {
                    const hasHistory = staff.allAppointments && staff.allAppointments.length > 1;
                    const isHistoryOpen = expandedHistory[staff.id];

                    return (
                        <div 
                            key={staff.id}
                            className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/40 hover:border-[#C59B27]/40 transition-all flex flex-col justify-between"
                        >
                            <div>
                                {/* Profile Header */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-[10px] font-bold text-[#C59B27]">
                                                {staff.honorific}
                                            </span>
                                            {staff.currentAppointment && (
                                                <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-[#10B981]/15 text-[#10B981] font-semibold border border-[#10B981]/30">
                                                    {staff.currentAppointment.roleTitle} ({staff.currentAppointment.termLabel})
                                                </span>
                                            )}
                                        </div>
                                        <Link href={`/u/${staff.username || staff.id}`} className="group/name">
                                            <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover/name:text-[#C59B27] transition-colors">
                                                {staff.fullName}
                                            </h4>
                                        </Link>
                                        <span className="text-xs font-medium text-[var(--text-muted)] block">
                                            {staff.designation}
                                        </span>
                                    </div>

                                    {/* Monogram Avatar */}
                                    <Link href={`/u/${staff.username || staff.id}`} className="hover:opacity-85 transition-opacity shrink-0">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C59B27]/20 to-[#E5B842]/10 border border-[#C59B27]/30 flex items-center justify-center font-bold font-mono text-sm text-[#C59B27] shadow-2xs">
                                            {staff.preferredName ? staff.preferredName.charAt(0) : staff.fullName.charAt(0)}
                                        </div>
                                    </Link>
                                </div>

                                {/* Academic Bio */}
                                {staff.academicBio && (
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                                        {staff.academicBio}
                                    </p>
                                )}

                                {/* Research Specializations & Themes */}
                                {staff.researchInterests && staff.researchInterests.length > 0 && (
                                    <div className="mb-4">
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5 font-semibold">
                                            Research Interests:
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {staff.researchInterests.map((interest, idx) => (
                                                <span 
                                                    key={idx}
                                                    className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)]"
                                                >
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Contact & Office Details */}
                                <div className="space-y-1.5 text-xs text-[var(--text-muted)] font-mono pt-3 border-t border-[var(--border)] mb-4">
                                    {staff.email && (
                                        <div className="flex items-center gap-1.5">
                                            <Mail size={12} className="text-[var(--gold)] shrink-0" />
                                            <a href={`mailto:${staff.email}`} className="hover:text-[var(--gold)] truncate">
                                                {staff.email}
                                            </a>
                                        </div>
                                    )}
                                    {staff.officeLocation && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={12} className="text-[var(--gold)] shrink-0" />
                                            <span className="truncate">{staff.officeLocation}</span>
                                        </div>
                                    )}
                                    {staff.phone && (
                                        <div className="flex items-center gap-1.5">
                                            <Phone size={12} className="text-[var(--gold)] shrink-0" />
                                            <span className="truncate">{staff.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions & Tenure History */}
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--border)]">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Link
                                            href={`/u/${staff.username || staff.id}`}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-colors"
                                        >
                                            <span>Profile</span>
                                            <ExternalLink size={10} />
                                        </Link>
                                        {staff.googleScholarUrl && (
                                            <a
                                                href={staff.googleScholarUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[#4285F4] hover:text-[#4285F4] transition-colors"
                                            >
                                                <span>Scholar</span>
                                                <ExternalLink size={10} />
                                            </a>
                                        )}
                                        {staff.researchGateUrl && (
                                            <a
                                                href={staff.researchGateUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[#00CCBB] hover:text-[#00CCBB] transition-colors"
                                            >
                                                <span>ResearchGate</span>
                                                <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>

                                    {/* Time-Bounded Career Continuity Button */}
                                    {hasHistory && (
                                        <button
                                            onClick={() => toggleHistory(staff.id)}
                                            className="font-mono text-[11px] text-[var(--gold)] hover:underline flex items-center gap-1 font-semibold"
                                        >
                                            <History size={11} />
                                            <span>Tenures</span>
                                            {isHistoryOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                        </button>
                                    )}
                                </div>

                                {/* Expanded Time-Bounded History Timeline */}
                                {hasHistory && isHistoryOpen && (
                                    <div className="mt-3 p-3 rounded-xl bg-[var(--bg-inset)] border border-[var(--border)] text-xs space-y-2">
                                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)] block">
                                            Institutional Role History:
                                        </span>
                                        {staff.allAppointments.map((apt, aptIdx) => (
                                            <div key={aptIdx} className="flex items-start justify-between gap-2 border-l-2 border-[var(--gold)] pl-2.5 py-0.5">
                                                <div>
                                                    <span className="font-semibold text-[var(--text-primary)] block">
                                                        {apt.roleTitle}
                                                    </span>
                                                    {apt.notes && (
                                                        <span className="text-[11px] text-[var(--text-muted)] block">
                                                            {apt.notes}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="font-mono text-[10px] text-[#C59B27] font-semibold shrink-0">
                                                    {apt.termLabel}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
