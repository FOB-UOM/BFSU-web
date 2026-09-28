'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    FolderLock, 
    FolderCheck, 
    ExternalLink, 
    ShieldCheck, 
    ShieldAlert, 
    Lock, 
    Users, 
    Mail, 
    ChevronRight, 
    Copy, 
    Check, 
    Sparkles, 
    Info, 
    ArrowUpRight,
    GraduationCap,
    Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_MASTER_DRIVE_URL = 'https://drive.google.com/drive/folders/1jslodTgZhPFqyp3zm9SDQXgKN6VOttMh?usp=drive_link';

export function GatedAcademicDriveCard({
    departmentCode = null,
    departmentName = null,
    customBatch = null,
    compact = false
}) {
    const { user, profile, openAuthModal, loading } = useAuth();
    const [copiedEmail, setCopiedEmail] = useState(false);

    // Verification check:
    // User is verified if profile.is_verified is true OR email is an official @uom.lk institutional address
    const isAuthenticated = Boolean(user);
    const isInstitutionalEmail = Boolean(
        user?.email?.toLowerCase().endsWith('@uom.lk') || 
        user?.email?.toLowerCase().endsWith('@student.uom.lk')
    );
    const isVerified = Boolean(profile?.is_verified) || isInstitutionalEmail;

    // Resolve student batch & group info
    const studentBatch = customBatch || profile?.batch || 'Batch 22';
    const batchDigits = studentBatch.replace(/\D/g, '') || '22';
    const batchGoogleGroupEmail = `fob-batch${batchDigits}@googlegroups.com`;
    const personalEmail = profile?.personal_email || (user?.email?.includes('@gmail.com') ? user.email : null);

    const handleCopyEmail = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(batchGoogleGroupEmail);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    if (loading) {
        return (
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]/60 animate-pulse">
                <div className="h-5 w-48 bg-[var(--border)] rounded mb-3" />
                <div className="h-4 w-72 bg-[var(--border)]/70 rounded mb-4" />
                <div className="h-10 w-36 bg-[var(--border)] rounded" />
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
            isVerified 
                ? 'border-[#C59B27]/40 bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-surface)] to-[#C59B27]/5 shadow-lg shadow-[#C59B27]/5' 
                : isAuthenticated 
                    ? 'border-amber-500/30 bg-[var(--bg-surface)] shadow-md' 
                    : 'border-[var(--border)] bg-[var(--bg-surface)] shadow-sm'
        }`}>
            {/* Top decorative accent bar */}
            <div className={`h-1.5 w-full ${
                isVerified 
                    ? 'bg-gradient-to-r from-[#C59B27] via-[#E5B842] to-[#001738]' 
                    : isAuthenticated 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-400' 
                        : 'bg-[var(--border)]'
            }`} />

            <div className="p-6 sm:p-8">
                {/* Header Status & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isVerified 
                                ? 'bg-[#C59B27]/15 text-[#C59B27] border border-[#C59B27]/30' 
                                : isAuthenticated 
                                    ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30' 
                                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)]'
                        }`}>
                            {isVerified ? (
                                <FolderCheck className="w-5 h-5" />
                            ) : isAuthenticated ? (
                                <ShieldAlert className="w-5 h-5" />
                            ) : (
                                <FolderLock className="w-5 h-5" />
                            )}
                        </div>
                        <div>
                            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] block">
                                Central Academic Repository
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                                Faculty Master Academic & Past Papers Drive
                            </h3>
                        </div>
                    </div>

                    {/* Access Status Pill */}
                    {isVerified ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#C59B27]/15 text-[#C59B27] border border-[#C59B27]/30 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                            <span>Verified Student Access</span>
                        </span>
                    ) : isAuthenticated ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Verification Pending</span>
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)]">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Protected Asset</span>
                        </span>
                    )}
                </div>

                {/* Subtitle / Scope Notice */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Centralized cloud repository curated by the Business Faculty Students' Union (BFSU) containing past exam papers, 
                    lecture slides, tutorial solutions, and syllabus guidelines across all departments and academic intakes.
                </p>

                {/* ============================================================== */}
                {/* STATE 1: VERIFIED STUDENT UNLOCKED VIEW                       */}
                {/* ============================================================== */}
                {isVerified && (
                    <div className="space-y-6">
                        {/* Folder Hierarchy Roadmap */}
                        <div className="p-4 rounded-2xl bg-[var(--bg-elevated)]/60 border border-[var(--border)] text-xs">
                            <div className="flex items-center gap-2 mb-2 font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider text-[11px]">
                                <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
                                <span>Drive Organization Structure</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-[var(--text-secondary)]">
                                <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border)] font-semibold text-[var(--text-primary)]">
                                    📁 Master Drive
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                                <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border)] font-semibold text-[var(--text-primary)]">
                                    📁 {studentBatch}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                                <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border)] font-semibold text-[var(--text-primary)]">
                                    📁 Semesters 1–8
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                                <span className={`px-2 py-0.5 rounded border font-semibold ${
                                    departmentCode 
                                        ? 'bg-[#C59B27]/15 text-[#C59B27] border-[#C59B27]/40 ring-1 ring-[#C59B27]/30' 
                                        : 'bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-primary)]'
                                }`}>
                                    📁 {departmentCode ? `${departmentCode} Department` : 'Specialization Subfolders (DS / MOT / IM)'}
                                </span>
                            </div>
                            {departmentName && (
                                <p className="mt-2 text-[11px] text-[var(--text-muted)] leading-normal">
                                    💡 Looking for <strong>{departmentName}</strong> past papers? Open the drive and locate the <strong>{departmentCode}</strong> subfolder inside your current semester.
                                </p>
                            )}
                        </div>

                        {/* Group Sync & Personal Email Notice */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]/30 text-xs">
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-[var(--text-muted)] block text-[10px] font-mono">
                                        BATCH GOOGLE GROUP MEMBERSHIP
                                    </span>
                                    <span className="font-mono font-semibold text-[var(--text-primary)] truncate block">
                                        {batchGoogleGroupEmail}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCopyEmail}
                                className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[#C59B27] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xs font-mono flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto"
                            >
                                {copiedEmail ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-emerald-500">Copied Group</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Copy Group Email</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <a
                                href={DEFAULT_MASTER_DRIVE_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5B842] text-[#001738] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#C59B27]/25 hover:brightness-110 transition-all cursor-pointer"
                            >
                                <span>Open Faculty Academic Drive</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>

                            <Link
                                href="/profile"
                                className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--text-muted)] text-xs font-medium text-[var(--text-secondary)] transition-colors flex items-center gap-1.5"
                            >
                                <span>Manage Batch Affiliation</span>
                            </Link>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* STATE 2: AUTHENTICATED BUT PENDING VERIFICATION               */}
                {/* ============================================================== */}
                {isAuthenticated && !isVerified && (
                    <div className="space-y-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-2">
                                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                                    Student ID Verification Required
                                </h4>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    To protect academic integrity and comply with university guidelines, past papers and lecture slide drives are restricted to verified FOB students.
                                </p>
                                <div className="space-y-1 pt-1 text-[var(--text-muted)] font-mono text-[11px]">
                                    <p>1. Register your personal Gmail in your <Link href="/profile" className="text-[#C59B27] underline">profile settings</Link> to join the Batch Google Group.</p>
                                    <p>2. Ask your elected <Link href="/about#departments" className="text-[#C59B27] underline">Batch Representative</Link> or Union Secretary to confirm your Student ID.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                href="/profile"
                                className="px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[#C59B27] text-xs font-semibold text-[var(--text-primary)] transition-colors"
                            >
                                Update Profile & Student ID
                            </Link>
                            <a
                                href={`mailto:secretary.bfsu@uom.lk?subject=Academic%20Drive%20Verification%20Request%20-%20${profile?.student_id || 'Student'}`}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                            >
                                <span>Request Verification via Secretary</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* STATE 3: GUEST / UNAUTHENTICATED LOCKED VIEW                  */}
                {/* ============================================================== */}
                {!isAuthenticated && (
                    <div className="space-y-4 p-5 rounded-2xl bg-[var(--bg-elevated)]/40 border border-[var(--border)] text-xs">
                        <div className="flex items-start gap-3">
                            <Lock className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">
                                    Restricted to Enrolled Faculty of Business Undergraduates
                                </h4>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    This cloud archive requires membership in the official FOB Batch Google Groups. Please log in with your university credentials or verified student account to access past papers and course materials.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                onClick={() => openAuthModal && openAuthModal('login')}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5B842] text-[#001738] font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#C59B27]/20 hover:brightness-110 transition-all cursor-pointer"
                            >
                                <Lock className="w-3.5 h-3.5" />
                                <span>Log In to Unlock Academic Drive</span>
                            </button>

                            <Link
                                href="/auth/register"
                                className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                Register Student Account
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
