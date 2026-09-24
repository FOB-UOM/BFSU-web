'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { createClient } from '../../lib/supabase/client';
import { UserAvatar } from '../../components/UserAvatar';
import { Container } from '../../components/ui/Container';
import { Typography } from '../../components/ui/Typography';
import { QRCodeSVG } from 'qrcode.react';
import { 
    User, Mail, Hash, BookOpen, GraduationCap, 
    Save, Share2, Copy, Check, ShieldCheck, 
    Calendar, ArrowRight, ExternalLink, RefreshCw,
    Briefcase, FileText, Plus, Trash2, Award, Users
} from 'lucide-react';

export default function ProfilePage() {
    const { user, profile, updateProfile, refreshProfile, openAuthModal, loading: authLoading } = useAuth();

    // Mode Toggle: 'student' vs 'alumni'
    const [activeTab, setActiveTab] = useState('student');

    // Base Fields
    const [fullName, setFullName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [department, setDepartment] = useState('');
    const [batch, setBatch] = useState('');
    const [bio, setBio] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [cvUrl, setCvUrl] = useState('');

    // Alumni Specific Fields
    const [graduationYear, setGraduationYear] = useState('');
    const [currentCompany, setCurrentCompany] = useState('');
    const [currentPosition, setCurrentPosition] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [isMentorVolunteer, setIsMentorVolunteer] = useState(false);

    // Career History List (Temporal tracking)
    const [careerHistory, setCareerHistory] = useState([]);
    const [newCareer, setNewCareer] = useState({
        company: '',
        position: '',
        start_date: '',
        end_date: '',
        is_current: false,
    });
    const [addingCareer, setAddingCareer] = useState(false);

    // Form feedback
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [copiedShareLink, setCopiedShareLink] = useState(false);

    const supabase = createClient();

    // Load initial profile data
    useEffect(() => {
        const metadataLinkedIn = (user?.user_metadata?.linkedin_url && user.user_metadata.linkedin_url.startsWith('http')) 
            ? user.user_metadata.linkedin_url 
            : (user?.user_metadata?.profile && user.user_metadata.profile.startsWith('http'))
            ? user.user_metadata.profile
            : '';
        const metadataAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';

        if (profile) {
            setFullName(profile.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || '');
            setStudentId(profile.student_id || '');
            setDepartment(profile.department || '');
            setBatch(profile.batch || '');
            setBio(profile.bio || '');
            setLinkedinUrl(profile.linkedin_url || metadataLinkedIn);
            setGithubUrl(profile.github_url || '');
            setPortfolioUrl(profile.portfolio_url || '');
            setAvatarUrl(profile.avatar_url || metadataAvatar);
            setCvUrl(profile.cv_url || '');
            setGraduationYear(profile.graduation_year || '');
            setCurrentCompany(profile.current_company || '');
            setCurrentPosition(profile.current_position || '');
            setIndustry(profile.industry || '');
            setLocation(profile.location || '');
            setIsMentorVolunteer(profile.is_mentor_volunteer || false);

            if (profile.role === 'alumni' || profile.graduation_year) {
                setActiveTab('alumni');
            }
        } else if (user) {
            setFullName(user.user_metadata?.full_name || user.user_metadata?.name || '');
            setAvatarUrl(metadataAvatar);
            setLinkedinUrl(metadataLinkedIn);
        }
    }, [profile, user]);

    // Load temporal career history
    const loadCareerHistory = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('career_history')
                .select('*')
                .eq('profile_id', user.id)
                .order('start_date', { ascending: false });

            if (!error && data) {
                setCareerHistory(data);
            }
        } catch {
            // Ignore error
        }
    };

    useEffect(() => {
        loadCareerHistory();
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSaveSuccess(false);
        setSaveError('');

        const role = activeTab === 'alumni' ? 'alumni' : (profile?.role === 'admin' || profile?.role === 'union_exec') ? profile.role : 'student';

        const { error } = await updateProfile({
            full_name: fullName,
            student_id: studentId,
            department: department,
            batch: batch,
            bio: bio,
            linkedin_url: linkedinUrl,
            github_url: githubUrl,
            portfolio_url: portfolioUrl,
            avatar_url: avatarUrl,
            cv_url: cvUrl,
            graduation_year: graduationYear,
            current_company: currentCompany,
            current_position: currentPosition,
            industry: industry,
            location: location,
            is_mentor_volunteer: isMentorVolunteer,
            role: role,
        });

        setSaving(false);
        if (error) {
            setSaveError(error.message || 'Failed to update profile. Please try again.');
        } else {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3500);
        }
    };

    const handleAddCareer = async (e) => {
        e.preventDefault();
        if (!user || !newCareer.company || !newCareer.position || !newCareer.start_date) return;

        setAddingCareer(true);
        try {
            const { error } = await supabase.from('career_history').insert([
                {
                    profile_id: user.id,
                    company: newCareer.company,
                    position: newCareer.position,
                    start_date: newCareer.start_date,
                    end_date: newCareer.is_current ? null : newCareer.end_date,
                    is_current: newCareer.is_current,
                }
            ]);

            if (!error) {
                setNewCareer({
                    company: '',
                    position: '',
                    start_date: '',
                    end_date: '',
                    is_current: false,
                });
                await loadCareerHistory();
            }
        } finally {
            setAddingCareer(false);
        }
    };

    const handleDeleteCareer = async (id) => {
        if (!user) return;
        await supabase.from('career_history').delete().eq('id', id);
        await loadCareerHistory();
    };

    const shareUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/alumni` 
        : 'https://bfsu-uom.lk/alumni';

    const handleCopyShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
            setCopiedShareLink(true);
            setTimeout(() => setCopiedShareLink(false), 2500);
        }
    };

    if (authLoading) {
        return (
            <main className="flex-grow pt-36 pb-24 flex items-center justify-center">
                <div className="flex items-center gap-2 font-mono text-xs text-[#566072]">
                    <RefreshCw size={15} className="animate-spin text-[#C59B27]" />
                    <span>Loading delegate credentials...</span>
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="flex-grow pt-36 pb-24">
                <Container className="max-w-xl text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#C59B27]/15 text-[#C59B27] flex items-center justify-center mx-auto mb-6">
                        <User size={30} />
                    </div>
                    <Typography variant="h2" className="mb-4">
                        Member Authentication Required
                    </Typography>
                    <p className="font-body text-[#566072] dark:text-[#9CA3AF] mb-8">
                        Sign in with your University Google account or student credentials to access your delegate identity card and profile settings.
                    </p>
                    <button
                        onClick={() => openAuthModal('login')}
                        className="bg-[#C59B27] hover:bg-[#8E6F18] text-black font-mono text-xs font-bold uppercase tracking-[0.18em] px-6 py-3 rounded-sm transition-all shadow-md inline-flex items-center gap-2"
                    >
                        <span>Sign In to Portal</span>
                        <ArrowRight size={14} />
                    </button>
                </Container>
            </main>
        );
    }

    const qrPayload = JSON.stringify({
        org: 'BFSU-UOM',
        uid: user.id,
        name: fullName || user.email,
        student_id: studentId || 'N/A',
        role: activeTab === 'alumni' ? 'alumni' : profile?.role || 'student',
        verified: profile?.is_verified ?? false,
    });

    return (
        <main className="flex-grow pt-32 pb-24 transition-colors">
            <Container className="max-w-[1200px]">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="max-w-2xl">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-2">
                            Official Membership
                        </span>
                        <Typography variant="h1" className="mb-2 !font-display !font-bold">
                            Delegate Identity & Career Portfolio
                        </Typography>
                        <p className="font-body text-base text-[#566072] dark:text-[#9CA3AF]">
                            Manage student credentials, track temporal career milestones, CV links, and your verifiable delegate pass.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href={`/u/${profile?.username || user.id}`}
                            target="_blank"
                            className="bg-[#12161F] dark:bg-[var(--bg-surface)] hover:bg-[#C59B27] dark:hover:bg-[#C59B27] dark:hover:text-black text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm inline-flex items-center gap-2 border border-[var(--border)]"
                        >
                            <span>View As Public</span>
                            <ExternalLink size={13} />
                        </Link>
                    </div>
                </div>

                {/* Profile Mode Selector Tabs */}
                <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[var(--border)]">
                    <button
                        onClick={() => setActiveTab('student')}
                        className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                            activeTab === 'student'
                                ? 'bg-[#C59B27] text-black shadow-md'
                                : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[#C59B27]'
                        }`}
                    >
                        <GraduationCap size={15} />
                        <span>Undergraduate Delegate</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('alumni')}
                        className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                            activeTab === 'alumni'
                                ? 'bg-[#C59B27] text-black shadow-md'
                                : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[#C59B27]'
                        }`}
                    >
                        <Briefcase size={15} />
                        <span>Faculty Alumni & Executive</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Digital Delegate ID Card with QR Code */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Digital Membership Pass Card */}
                        <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-br from-[#12161F] via-[#1A202C] to-[#0A0D14] text-white border-2 border-[#C59B27]/40 shadow-2xl relative overflow-hidden">
                            {/* Watermark Crest */}
                            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                                <img src="/images/logo.png" alt="BFSU Watermark" className="w-56 h-56 object-contain" />
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                                <div>
                                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#C59B27] block">
                                        Faculty of Business
                                    </span>
                                    <h4 className="font-display text-sm font-bold tracking-wider">
                                        {activeTab === 'alumni' ? "ALUMNI CHAPTER DELEGATE" : "STUDENTS' UNION DELEGATE"}
                                    </h4>
                                </div>
                                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#C59B27]/20 border border-[#C59B27]/50 text-[#C59B27] uppercase tracking-widest font-bold">
                                    {activeTab === 'alumni' ? 'Alumni' : profile?.role || 'Student'}
                                </span>
                            </div>

                            <div className="flex items-start gap-4 mb-6">
                                <UserAvatar
                                    src={avatarUrl}
                                    name={fullName || user.email}
                                    size="lg"
                                    role={profile?.role}
                                />
                                <div className="space-y-1">
                                    <h3 className="font-display text-lg font-bold leading-tight">
                                        {fullName || 'Faculty Member'}
                                    </h3>
                                    <p className="font-mono text-xs text-white/70">
                                        {user.email}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                                        <span className="text-[#C59B27] font-bold">
                                            ID: {studentId || 'UNREGISTERED'}
                                        </span>
                                        {batch && (
                                            <span className="text-white/60">
                                                • {batch}
                                            </span>
                                        )}
                                        {graduationYear && (
                                            <span className="text-white/60">
                                                • Class of {graduationYear}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Current Position Banner (if alumni) */}
                            {currentPosition && currentCompany && (
                                <div className="mb-4 p-2.5 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-white/90">
                                    <span className="text-[#C59B27] uppercase tracking-widest text-[9px] block">
                                        Current Appointment
                                    </span>
                                    {currentPosition} at <strong className="text-white">{currentCompany}</strong>
                                </div>
                            )}

                            {/* Department Info */}
                            {department && (
                                <div className="mb-6 p-2.5 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-white/80">
                                    <span className="text-[#C59B27] uppercase tracking-widest text-[9px] block">
                                        Affiliation
                                    </span>
                                    {department}
                                </div>
                            )}

                            {/* Verifiable QR Pass Section */}
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#C59B27] font-bold flex items-center gap-1">
                                        <ShieldCheck size={12} />
                                        <span>Cryptographic Pass</span>
                                    </span>
                                    <p className="font-mono text-[10px] text-white/60 max-w-[160px] leading-tight">
                                        Scan at faculty assemblies, alumni banquets, and check-in desks.
                                    </p>
                                </div>

                                <div className="bg-white p-2 rounded-sm shadow-md shrink-0">
                                    <QRCodeSVG 
                                        value={qrPayload} 
                                        size={76}
                                        level="M"
                                        fgColor="#12161F"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CV & Shareable Card Actions */}
                        <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                                    <Share2 size={14} className="text-[#C59B27]" />
                                    <span>Alumni Directory Share Link</span>
                                </div>
                                <button
                                    onClick={handleCopyShare}
                                    className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-1 px-3 py-1.5 border border-[var(--border)] hover:border-[#C59B27] rounded-sm transition-colors cursor-pointer"
                                >
                                    {copiedShareLink ? (
                                        <>
                                            <Check size={13} className="text-emerald-500" />
                                            <span className="text-emerald-500">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={13} />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {cvUrl && (
                                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                                    <div className="flex items-center gap-2 font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                                        <FileText size={14} className="text-[#C59B27]" />
                                        <span>Curriculum Vitae</span>
                                    </div>
                                    <a
                                        href={cvUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] hover:underline inline-flex items-center gap-1"
                                    >
                                        <span>View Document</span>
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column: Profile Edit Form & Temporal Career */}
                    <div className="lg:col-span-7 space-y-8">
                        
                        {/* Profile Edit Form */}
                        <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-sm shadow-sm">
                            
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
                                <div>
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#C59B27] block">
                                        {activeTab === 'alumni' ? 'Alumni Profile Editor' : 'Undergraduate Profile Editor'}
                                    </span>
                                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                                        Personal & Academic Credentials
                                    </h3>
                                </div>
                                <span className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                                    Synced with Supabase
                                </span>
                            </div>

                            {saveSuccess && (
                                <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs rounded-sm flex items-center gap-2">
                                    <Check size={15} />
                                    <span>Profile credentials updated successfully.</span>
                                </div>
                            )}

                            {saveError && (
                                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-mono text-xs rounded-sm">
                                    {saveError}
                                </div>
                            )}

                            <form onSubmit={handleSave} className="space-y-5">
                                
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Your full legal or preferred name"
                                            className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                            Student ID / Index
                                        </label>
                                        <div className="relative">
                                            <Hash size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                                            <input
                                                type="text"
                                                value={studentId}
                                                onChange={(e) => setStudentId(e.target.value)}
                                                placeholder="e.g. 224012A"
                                                className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                            Batch Intake
                                        </label>
                                        <div className="relative">
                                            <GraduationCap size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                                            <select
                                                value={batch}
                                                onChange={(e) => setBatch(e.target.value)}
                                                className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg-surface)] border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-mono cursor-pointer"
                                            >
                                                <option value="">Select Batch</option>
                                                <option value="Batch '20">Batch '20</option>
                                                <option value="Batch '21">Batch '21</option>
                                                <option value="Batch '22">Batch '22</option>
                                                <option value="Batch '23">Batch '23</option>
                                                <option value="Batch '24">Batch '24</option>
                                                <option value="Batch '25">Batch '25</option>
                                                <option value="Batch '26">Batch '26</option>
                                                <option value="Faculty Alumni">Faculty Alumni</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <BookOpen size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                                        <select
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg-surface)] border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                        >
                                            <option value="">Select Department</option>
                                            <option value="Department of Decision Sciences">Department of Decision Sciences</option>
                                            <option value="Department of Management of Technology">Department of Management of Technology</option>
                                            <option value="Department of Industrial Management">Department of Industrial Management</option>
                                            <option value="Dean's Office / General Faculty">Dean's Office / General Faculty</option>
                                            <option value="Faculty Alumni">Faculty Alumni</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Alumni-Specific Fields */}
                                {activeTab === 'alumni' && (
                                    <div className="p-4 rounded bg-[#C59B27]/5 border border-[#C59B27]/25 space-y-4">
                                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#C59B27] block">
                                            Alumni Specific Attributes
                                        </span>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                                    Graduation Year
                                                </label>
                                                <input
                                                    type="text"
                                                    value={graduationYear}
                                                    onChange={(e) => setGraduationYear(e.target.value)}
                                                    placeholder="e.g. 2024"
                                                    className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-mono"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                                    Industry / Domain
                                                </label>
                                                <input
                                                    type="text"
                                                    value={industry}
                                                    onChange={(e) => setIndustry(e.target.value)}
                                                    placeholder="e.g. Fintech, Supply Chain"
                                                    className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                                    Current Company
                                                </label>
                                                <input
                                                    type="text"
                                                    value={currentCompany}
                                                    onChange={(e) => setCurrentCompany(e.target.value)}
                                                    placeholder="e.g. London Stock Exchange Group"
                                                    className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                                    Current Position / Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={currentPosition}
                                                    onChange={(e) => setCurrentPosition(e.target.value)}
                                                    placeholder="e.g. Business Analyst"
                                                    className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2">
                                            <input
                                                type="checkbox"
                                                id="mentorCheck"
                                                checked={isMentorVolunteer}
                                                onChange={(e) => setIsMentorVolunteer(e.target.checked)}
                                                className="w-4 h-4 accent-[#C59B27] cursor-pointer"
                                            />
                                            <label htmlFor="mentorCheck" className="text-xs font-mono text-[var(--text-primary)] cursor-pointer">
                                                Available to mentor current undergraduates & review CVs
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Links: LinkedIn, GitHub, CV, Avatar Image URL */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                            LinkedIn Profile / Handle
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-3 text-[var(--text-faint)]">
                                                <span className="font-bold text-xs bg-[#0077B5] text-white px-1 py-0.5 rounded leading-none">in</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={linkedinUrl}
                                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                                placeholder="https://linkedin.com/in/... or handle"
                                                className="w-full pl-10 pr-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                            GitHub Username / Link
                                        </label>
                                        <input
                                            type="text"
                                            value={githubUrl}
                                            onChange={(e) => setGithubUrl(e.target.value)}
                                            placeholder="e.g. torvalds or https://github.com/..."
                                            className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                            Profile Picture Image URL
                                        </label>
                                        <input
                                            type="text"
                                            value={avatarUrl}
                                            onChange={(e) => setAvatarUrl(e.target.value)}
                                            placeholder="https://... or synced from OAuth"
                                            className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                            CV / Resume Link
                                        </label>
                                        <div className="relative">
                                            <FileText size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                                            <input
                                                type="url"
                                                value={cvUrl}
                                                onChange={(e) => setCvUrl(e.target.value)}
                                                placeholder="https://drive.google.com/..."
                                                className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                        Bio & Professional Summary
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Brief introduction of your academic concentrations, research topics, or career achievements..."
                                        className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                    />
                                </div>

                                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                                    <span className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                                        Email: <strong className="text-[var(--text-primary)]">{user.email}</strong>
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-[#C59B27] hover:bg-[#8E6F18] text-black font-mono text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-sm transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                    >
                                        <Save size={14} />
                                        <span>{saving ? 'Saving...' : 'Save Profile'}</span>
                                    </button>
                                </div>

                            </form>
                        </div>

                        {/* Explicit OAuth Account & Identity Linking Section */}
                        <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)]">
                                <div>
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#C59B27] block">
                                        Multi-Provider Identity
                                    </span>
                                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                                        Explicit Connected Accounts
                                    </h3>
                                </div>
                                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                                    Single Profile Unified
                                </span>
                            </div>

                            <p className="font-body text-xs text-[#566072] dark:text-[#9CA3AF] mb-6">
                                Explicitly link multiple OAuth identities (Google UoM, LinkedIn, GitHub) to your single delegate profile so you can log in seamlessly using any account.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={async () => {
                                        await supabase.auth.linkIdentity({
                                            provider: 'linkedin_oidc',
                                            options: { redirectTo: `${window.location.origin}/profile` }
                                        });
                                    }}
                                    className="p-4 border border-[var(--border)] bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border-[#0077B5]/30 rounded-sm text-left transition-colors flex items-center justify-between cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-xs bg-[#0077B5] text-white px-1.5 py-0.5 rounded">in</span>
                                        <div>
                                            <span className="font-mono text-xs font-bold text-[var(--text-primary)] block">LinkedIn Identity</span>
                                            <span className="font-mono text-[10px] text-[#566072] dark:text-[#9CA3AF]">
                                                {user?.app_metadata?.providers?.includes('linkedin_oidc') ? 'Connected' : 'Click to Link Account'}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="font-mono text-[10px] px-2 py-0.5 bg-[#0077B5] text-white rounded font-bold uppercase">
                                        {user?.app_metadata?.providers?.includes('linkedin_oidc') ? 'Linked' : 'Link'}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={async () => {
                                        await supabase.auth.linkIdentity({
                                            provider: 'google',
                                            options: { redirectTo: `${window.location.origin}/profile` }
                                        });
                                    }}
                                    className="p-4 border border-[var(--border)] bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 rounded-sm text-left transition-colors flex items-center justify-between cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                                        </svg>
                                        <div>
                                            <span className="font-mono text-xs font-bold text-[var(--text-primary)] block">Google (UoM) Identity</span>
                                            <span className="font-mono text-[10px] text-[#566072] dark:text-[#9CA3AF]">
                                                {user?.app_metadata?.providers?.includes('google') ? 'Connected' : 'Click to Link Account'}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-600 text-white rounded font-bold uppercase">
                                        {user?.app_metadata?.providers?.includes('google') ? 'Linked' : 'Link'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Temporal Career Milestones Section */}
                        <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-sm shadow-sm">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
                                <div>
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#C59B27] block">
                                        Temporal Progression
                                    </span>
                                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                                        Career History & Appointments Over Time
                                    </h3>
                                </div>
                                <span className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                                    {careerHistory.length} Milestones Recorded
                                </span>
                            </div>

                            {/* Existing Career Timeline */}
                            <div className="space-y-4 mb-8">
                                {careerHistory.length === 0 ? (
                                    <p className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF] py-4 text-center border border-dashed border-[var(--border)] rounded-sm">
                                        No historical career appointments recorded yet. Add your internships, graduate roles, and current positions below.
                                    </p>
                                ) : (
                                    careerHistory.map((item) => (
                                        <div 
                                            key={item.id}
                                            className="p-4 rounded-sm border border-[var(--border)] bg-[var(--bg-page)]/50 flex items-start justify-between gap-4"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                                                        {item.position}
                                                    </h4>
                                                    {item.is_current && (
                                                        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="font-body text-sm font-semibold text-[#C59B27]">
                                                    {item.company}
                                                </p>
                                                <p className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                                                    {item.start_date} → {item.is_current ? 'Present' : item.end_date || 'N/A'}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => handleDeleteCareer(item.id)}
                                                title="Delete entry"
                                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Add Career Appointment Form */}
                            <form onSubmit={handleAddCareer} className="p-4 rounded-sm border border-[var(--border)] bg-[var(--bg-surface)] space-y-4">
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] block">
                                    + Add New Career Milestone
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-mono font-bold uppercase text-[var(--text-muted)] mb-1">
                                            Position / Job Title
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newCareer.position}
                                            onChange={(e) => setNewCareer({ ...newCareer, position: e.target.value })}
                                            placeholder="e.g. Senior Business Analyst"
                                            className="w-full px-3 py-1.5 text-xs bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-mono font-bold uppercase text-[var(--text-muted)] mb-1">
                                            Company / Organization
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newCareer.company}
                                            onChange={(e) => setNewCareer({ ...newCareer, company: e.target.value })}
                                            placeholder="e.g. MAS Holdings / Unilever"
                                            className="w-full px-3 py-1.5 text-xs bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-mono font-bold uppercase text-[var(--text-muted)] mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={newCareer.start_date}
                                            onChange={(e) => setNewCareer({ ...newCareer, start_date: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-mono font-bold uppercase text-[var(--text-muted)] mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            disabled={newCareer.is_current}
                                            value={newCareer.end_date}
                                            onChange={(e) => setNewCareer({ ...newCareer, end_date: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-mono disabled:opacity-30"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="careerCurrent"
                                            checked={newCareer.is_current}
                                            onChange={(e) => setNewCareer({ ...newCareer, is_current: e.target.checked })}
                                            className="w-4 h-4 accent-[#C59B27] cursor-pointer"
                                        />
                                        <label htmlFor="careerCurrent" className="text-xs font-mono text-[var(--text-primary)] cursor-pointer">
                                            This is my current role
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={addingCareer}
                                        className="bg-[#12161F] dark:bg-[var(--bg-page)] text-white hover:bg-[#C59B27] dark:hover:bg-[#C59B27] dark:hover:text-black font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                    >
                                        <Plus size={13} />
                                        <span>Add Milestone</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </Container>
        </main>
    );
}
