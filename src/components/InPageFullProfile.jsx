'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
    X, 
    ArrowLeft, 
    ExternalLink, 
    Globe, 
    ShieldCheck, 
    GraduationCap, 
    Building2, 
    Award, 
    Code2, 
    Calendar,
    Briefcase,
    Share2,
    CheckCircle2,
    Copy,
    Check,
    Sparkles,
    Mail
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { UserAvatar } from './UserAvatar';
import { createClient } from '../lib/supabase/client';
import { SafeExternalLink } from './common/SafeExternalLink';
import { sanitizeUrl } from '../lib/security/safeLinks';


const LinkedInIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
);

const GitHubIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

export const InPageFullProfile = ({
    isOpen,
    onClose,
    targetProfile,
    targetUsername
}) => {
    const [profile, setProfile] = useState(targetProfile || null);
    const [careerHistory, setCareerHistory] = useState([]);
    const [projects, setProjects] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [institutionalRoles, setInstitutionalRoles] = useState([]);
    const [distinctions, setDistinctions] = useState([]);
    const [competencies, setCompetencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [copiedShare, setCopiedShare] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const overlayRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const isPoppingHistoryRef = useRef(false);

    const supabase = createClient();

    // Safe history management and scroll preservation
    useEffect(() => {
        if (!isOpen) return;

        // Remember initial scroll position
        scrollPositionRef.current = window.scrollY;

        // Push state so back button safely closes modal instead of exiting the page
        const identifier = targetUsername || targetProfile?.username || targetProfile?.id || 'profile';
        const hashTarget = `#profile-${identifier}`;
        if (window.location.hash !== hashTarget) {
            window.history.pushState({ inPageProfile: true, identifier }, '', hashTarget);
        }

        const handlePopState = (e) => {
            isPoppingHistoryRef.current = true;
            onClose();
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                safeClose();
            }
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('keydown', handleKeyDown);

        // Lock body scrolling smoothly
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen]);

    const safeClose = () => {
        if (!isPoppingHistoryRef.current && window.location.hash.startsWith('#profile-')) {
            window.history.back();
        } else {
            onClose();
        }
        isPoppingHistoryRef.current = false;
    };

    // Fetch live profile details from Supabase if we have username / id
    useEffect(() => {
        if (!isOpen) return;

        setProfile(targetProfile || null);
        const username = targetUsername || targetProfile?.username || targetProfile?.id;

        if (username) {
            const fetchFullDetails = async () => {
                setLoading(true);
                try {
                    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(username);
                    const query = supabase.from('profiles').select('*');
                    const { data: dbData } = isUuid 
                        ? await query.eq('id', username).maybeSingle() 
                        : await query.eq('username', username).maybeSingle();

                    let currentData = dbData || targetProfile;

                    if (!currentData) {
                        const staffQuery = supabase.from('faculty_staff_profiles').select('*');
                        const { data: staffData } = isUuid 
                            ? await staffQuery.eq('id', username).maybeSingle() 
                            : await staffQuery.eq('username', username).maybeSingle();

                        if (staffData) {
                            const { data: aptData } = await supabase
                                .from('faculty_staff_appointments')
                                .select('*')
                                .eq('staff_id', staffData.id)
                                .order('start_date', { ascending: false });

                            currentData = {
                                id: staffData.id,
                                username: staffData.username,
                                full_name: `${staffData.honorific || ''} ${staffData.full_name}`.trim(),
                                role: staffData.staff_category === 'academic' ? 'Academic Staff' : 'Faculty Administration',
                                current_position: staffData.designation,
                                current_company: 'Faculty of Business (UoM)',
                                department: staffData.primary_department_code,
                                bio: staffData.academic_bio || staffData.operational_scope,
                                is_verified: true,
                                email: staffData.email,
                                phone: staffData.phone,
                                office_location: staffData.office_location,
                                avatar_url: staffData.avatar_url,
                                is_staff: true,
                                staff_data: staffData
                            };

                            if (aptData && aptData.length > 0) {
                                setCareerHistory(aptData.map(a => ({
                                    id: a.id,
                                    position: a.role_title,
                                    company: 'Faculty of Business',
                                    start_date: a.term_label,
                                    is_current: a.is_current,
                                    notes: a.notes
                                })));
                            }
                        }
                    }

                    if (currentData) {
                        setProfile(currentData);

                        if (currentData.id && !currentData.is_staff) {
                            const [careerRes, projRes, achRes, roleRes, distRes, compRes] = await Promise.allSettled([
                                supabase.from('career_history').select('*').eq('profile_id', currentData.id).order('start_date', { ascending: false }),
                                supabase.from('student_projects').select('*').eq('profile_id', currentData.id).order('created_at', { ascending: false }),
                                supabase.from('achievements').select('*').eq('profile_id', currentData.id).order('year', { ascending: false }),
                                supabase.from('institutional_roles').select('*').eq('profile_id', currentData.id).order('is_current', { ascending: false }),
                                supabase.from('academic_distinctions').select('*').eq('profile_id', currentData.id).order('awarded_date', { ascending: false }),
                                supabase.from('module_competencies').select('*').eq('profile_id', currentData.id)
                            ]);

                            if (careerRes.status === 'fulfilled') setCareerHistory(careerRes.value.data || []);
                            if (projRes.status === 'fulfilled') setProjects(projRes.value.data || []);
                            if (achRes.status === 'fulfilled') setAchievements(achRes.value.data || []);
                            if (roleRes.status === 'fulfilled') setInstitutionalRoles(roleRes.value.data || []);
                            if (distRes.status === 'fulfilled') setDistinctions(distRes.value.data || []);
                            if (compRes.status === 'fulfilled') setCompetencies(compRes.value.data || []);
                        }
                    }
                } catch (err) {
                    console.warn('[InPageFullProfile] Fetch error:', err);
                } finally {
                    setLoading(false);
                }
            };

            fetchFullDetails();
        }
    }, [isOpen, targetUsername, targetProfile]);

    if (!isOpen) return null;

    const name = profile?.full_name || profile?.name || 'Faculty Delegate';
    const displayUsername = profile?.username || targetUsername || '';
    const avatarUrl = profile?.avatar_url || profile?.avatar || profile?.image;
    const roleTitle = profile?.role_title || profile?.role || 'Delegate';
    const department = profile?.department || 'Faculty of Business';
    const batch = profile?.batch || '';
    const bio = profile?.bio || profile?.headline || '';
    const isAlumni = profile?.role === 'alumni' || Boolean(profile?.graduation_year);
    const isMaintainer = profile?.is_maintainer || profile?.role_title?.toLowerCase().includes('maintainer');

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/u/${displayUsername || profile?.id}`
        : '';

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
            setCopiedShare(true);
            setTimeout(() => setCopiedShare(false), 2000);
        }
    };

    return (
        <div 
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex justify-center bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
            onClick={safeClose}
        >
            <div 
                className="relative w-full max-w-3xl my-4 sm:my-8 mx-2 sm:mx-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all text-[var(--text-primary)]"
                onClick={e => e.stopPropagation()}
            >
                {/* 1. Sticky Safe Navigation Bar */}
                <div className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border)]">
                    <button
                        type="button"
                        onClick={safeClose}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[#C59B27] font-mono text-xs font-bold text-[var(--text-secondary)] hover:text-[#C59B27] transition-all group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        <span>← Back to page</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleShare}
                            className="p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[#C59B27] hover:border-[#C59B27] transition-colors"
                            title="Share Profile Link"
                        >
                            {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                        </button>
                        <button
                            type="button"
                            onClick={safeClose}
                            className="p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* 2. Cover Banner */}
                <div className="relative h-36 sm:h-44 bg-gradient-to-r from-[#001738] via-[#0F2942] to-[#C59B27]/30 overflow-hidden">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C59B27_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute top-4 left-6 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-amber-300">
                        <Sparkles className="w-3 h-3 text-[#C59B27]" />
                        <span>BFSU Verified Public Persona</span>
                    </div>
                </div>

                {/* 3. Hero Identity Block */}
                <div className="px-6 sm:px-8 pb-6 -mt-14 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
                        <div className="relative">
                            <UserAvatar
                                src={avatarUrl}
                                name={name}
                                size="xl"
                                className="ring-4 ring-[var(--bg-surface)] shadow-2xl"
                            />
                            {profile?.is_verified !== false && (
                                <div className="absolute -bottom-1 -right-1 bg-[#C59B27] text-[#001738] p-1.5 rounded-full shadow-lg border-2 border-[var(--bg-surface)]" title="Institutional Record Verified">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                            )}
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                            {isMaintainer && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#C59B27]/15 text-[#C59B27] border border-[#C59B27]/30">
                                    <Code2 className="w-3 h-3" />
                                    <span>Web Maintainer</span>
                                </span>
                            )}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                                isAlumni
                                    ? 'bg-purple-900/20 text-purple-300 border border-purple-700/30'
                                    : 'bg-blue-900/20 text-blue-300 border border-blue-700/30'
                            }`}>
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>{isAlumni ? 'Alumni' : 'Undergraduate'}</span>
                            </span>
                        </div>
                    </div>

                    {/* Name, Roles, Department */}
                    <div className="mb-4">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
                            {name}
                        </h2>
                        {displayUsername && (
                            <span className="font-mono text-xs text-[var(--text-muted)] block mt-0.5">
                                @{displayUsername}
                            </span>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-mono text-[#C59B27] font-semibold">
                            <span>{roleTitle}</span>
                            {department && (
                                <span className="text-[var(--text-secondary)] font-sans flex items-center gap-1">
                                    <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
                                    {department}
                                </span>
                            )}
                            {batch && (
                                <span className="text-[var(--text-muted)] font-mono flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {batch}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Bio Snippet */}
                    {bio && (
                        <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed mb-5 max-w-2xl">
                            {bio}
                        </p>
                    )}

                    {/* Social & Contact Strip */}
                    <div className="flex flex-wrap items-center gap-2.5 pb-6 border-b border-[var(--border)]">
                        {profile?.linkedin_url && (
                            <SafeExternalLink
                                href={profile.linkedin_url}
                                platform="linkedin"
                                className="px-3 py-1.5 rounded-lg bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] dark:text-sky-300 text-xs font-mono font-semibold inline-flex items-center gap-1.5 hover:bg-[#0077B5]/20 transition-colors"
                            >
                                <LinkedInIcon className="w-3.5 h-3.5" />
                                <span>LinkedIn</span>
                                <ExternalLink className="w-3 h-3" />
                            </SafeExternalLink>
                        )}

                        {profile?.github_url && (
                            <SafeExternalLink
                                href={profile.github_url}
                                platform="github"
                                className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-xs font-mono font-semibold inline-flex items-center gap-1.5 hover:border-[#C59B27] transition-colors"
                            >
                                <GitHubIcon className="w-3.5 h-3.5" />
                                <span>GitHub</span>
                                <ExternalLink className="w-3 h-3" />
                            </SafeExternalLink>
                        )}

                        {profile?.portfolio_url && (
                            <SafeExternalLink
                                href={profile.portfolio_url}
                                className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[#C59B27] text-xs font-mono font-semibold inline-flex items-center gap-1.5 hover:border-[#C59B27] transition-colors"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span>Portfolio</span>
                                <ExternalLink className="w-3 h-3" />
                            </SafeExternalLink>
                        )}

                        {profile?.email && (
                            <a
                                href={sanitizeUrl(`mailto:${profile.email}`, '#')}
                                className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[#C59B27] text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                            >
                                <Mail className="w-3.5 h-3.5" />
                                <span>{profile.email}</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* 4. Tabbed Content Sections */}
                <div className="px-6 sm:px-8 pb-8 flex-1">
                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-2 mb-6 border-b border-[var(--border)] pb-2 overflow-x-auto">
                        <button
                            type="button"
                            onClick={() => setActiveTab('overview')}
                            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
                                activeTab === 'overview'
                                    ? 'bg-[#C59B27] text-[#001738]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            Overview & Identity
                        </button>
                        {careerHistory.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('career')}
                                className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
                                    activeTab === 'career'
                                        ? 'bg-[#C59B27] text-[#001738]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                            >
                                Career ({careerHistory.length})
                            </button>
                        )}
                        {projects.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('projects')}
                                className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
                                    activeTab === 'projects'
                                        ? 'bg-[#C59B27] text-[#001738]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                            >
                                Projects ({projects.length})
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setActiveTab('passport')}
                            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
                                activeTab === 'passport'
                                    ? 'bg-[#C59B27] text-[#001738]'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            Digital Passport QR
                        </button>
                    </div>

                    {/* Tab: Overview */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {institutionalRoles.length > 0 && (
                                <div>
                                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-3">
                                        Institutional Offices & Committee Appointments
                                    </h4>
                                    <div className="space-y-2">
                                        {institutionalRoles.map((role, idx) => (
                                            <div key={idx} className="p-3.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-between">
                                                <div>
                                                    <span className="text-xs font-bold text-[var(--text-primary)] block">
                                                        {role.role_title}
                                                    </span>
                                                    <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                                                        {role.organization || 'BFSU'} • {role.year || 'Current'}
                                                    </span>
                                                </div>
                                                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                                                    Official
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {achievements.length > 0 && (
                                <div>
                                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-3">
                                        Honours & Achievements
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {achievements.map((ach, idx) => (
                                            <div key={idx} className="p-3.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]">
                                                <Award className="w-4 h-4 text-[#C59B27] mb-1.5" />
                                                <h5 className="text-xs font-bold text-[var(--text-primary)] mb-1">
                                                    {ach.title}
                                                </h5>
                                                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                                                    {ach.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Academic Distinctions & Dean's List */}
                            {(distinctions.length > 0 || profile?.is_deans_list) && profile?.show_deans_list !== false && (
                                <div>
                                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-3 flex items-center gap-1.5">
                                        <Award className="w-3.5 h-3.5 text-[#C59B27]" />
                                        <span>Dean's List & Academic Distinctions</span>
                                    </h4>
                                    <div className="space-y-2.5">
                                        {distinctions.length > 0 ? (
                                            distinctions.map((d, idx) => (
                                                <div key={idx} className="p-3.5 rounded-xl bg-gradient-to-r from-[#C59B27]/10 to-transparent border border-[#C59B27]/30 flex items-center justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                                                            <span className="text-xs font-bold text-[var(--text-primary)]">
                                                                {d.title}
                                                            </span>
                                                        </div>
                                                        <span className="font-mono text-[11px] text-[var(--text-secondary)] block mt-0.5">
                                                            {d.semester ? `${d.semester} • ` : ''}{d.academic_year} • {d.issuing_authority}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] font-mono font-bold text-[#C59B27] px-2 py-0.5 rounded bg-[#C59B27]/20 border border-[#C59B27]/40">
                                                        Verified Honor
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#C59B27]/10 to-transparent border border-[#C59B27]/30 flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                                                        <span className="text-xs font-bold text-[var(--text-primary)]">
                                                            Faculty Dean's List Distinction
                                                        </span>
                                                    </div>
                                                    <span className="font-mono text-[11px] text-[var(--text-secondary)] block mt-0.5">
                                                        Faculty of Business, University of Moratuwa
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono font-bold text-[#C59B27] px-2 py-0.5 rounded bg-[#C59B27]/20 border border-[#C59B27]/40">
                                                    Verified Honor
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Accredited Module Competencies (Publicly Safe, No Confidential Marks) */}
                            {competencies.length > 0 && profile?.show_modules_taken !== false && (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                                            Accredited Module Competencies
                                        </h4>
                                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                                            Curricular Depth Proof
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {competencies.map((comp, idx) => (
                                            <div key={idx} className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center gap-2 text-xs">
                                                {comp.module_code && (
                                                    <span className="font-mono text-[10px] text-[#C59B27] font-bold">
                                                        {comp.module_code}
                                                    </span>
                                                )}
                                                <span className="font-medium text-[var(--text-primary)]">
                                                    {comp.module_name}
                                                </span>
                                                {comp.competency_domain && (
                                                    <span className="text-[9px] font-mono text-[var(--text-muted)] border-l border-[var(--border)] pl-1.5">
                                                        {comp.competency_domain}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Verification Footer Card */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--bg-elevated)] to-[#C59B27]/5 border border-[var(--border)] flex items-center justify-between">
                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#C59B27] font-bold block">
                                        University of Moratuwa
                                    </span>
                                    <span className="text-xs font-semibold text-[var(--text-primary)]">
                                        Faculty of Business Students' Union Verified Delegate Registry
                                    </span>
                                </div>
                                <ShieldCheck className="w-6 h-6 text-[#C59B27]" />
                            </div>
                        </div>
                    )}

                    {/* Tab: Career */}
                    {activeTab === 'career' && (
                        <div className="space-y-4">
                            {careerHistory.map((item, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)]">
                                    <div className="flex items-start justify-between mb-1">
                                        <h5 className="text-sm font-bold text-[var(--text-primary)]">
                                            {item.position}
                                        </h5>
                                        <span className="font-mono text-[10px] text-[#C59B27] bg-[#C59B27]/10 px-2 py-0.5 rounded">
                                            {item.start_date || 'Present'}
                                        </span>
                                    </div>
                                    <span className="font-mono text-xs text-[var(--text-secondary)] block mb-2">
                                        {item.company}
                                    </span>
                                    {item.description && (
                                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tab: Projects */}
                    {activeTab === 'projects' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projects.map((proj, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex flex-col justify-between">
                                    <div>
                                        <h5 className="text-xs font-bold text-[var(--text-primary)] mb-1">
                                            {proj.title}
                                        </h5>
                                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-3">
                                            {proj.description}
                                        </p>
                                    </div>
                                    {proj.github_url && (
                                        <SafeExternalLink
                                            href={proj.github_url}
                                            platform="github"
                                            className="font-mono text-[10px] text-[#C59B27] inline-flex items-center gap-1 hover:underline"
                                        >
                                            <span>Repository</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </SafeExternalLink>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tab: QR Passport */}
                    {activeTab === 'passport' && (
                        <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="p-3 bg-white rounded-xl shadow-lg shrink-0">
                                <QRCodeSVG
                                    value={shareUrl || `https://bfsu-uom.lk/u/${displayUsername}`}
                                    size={140}
                                    level="H"
                                    includeMargin={false}
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C59B27] block mb-1">
                                    Cryptographic Delegate Passport
                                </span>
                                <h4 className="text-base font-bold text-[var(--text-primary)] mb-2">
                                    Instant Verification QR
                                </h4>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm mb-4">
                                    Scan with any smartphone camera to open this official BFSU persona directly without intermediate apps.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleShare}
                                    className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-[#C59B27] text-[#001738] inline-flex items-center gap-1.5 shadow-sm hover:brightness-110 transition-all"
                                >
                                    {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedShare ? 'Copied Link!' : 'Copy Passport URL'}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
