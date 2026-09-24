'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from '../components/UserAvatar';
import { createClient } from '../lib/supabase/client';
import { useProfilePeek } from '../context/ProfilePeekContext';
import { 
    GraduationCap, 
    Network, 
    Briefcase, 
    ArrowUpRight, 
    BookOpen, 
    ExternalLink, 
    Lock,
    CheckCircle2,
    Building2,
    Users,
    UserPlus,
    Copy,
    Check,
    Share2,
    Filter,
    Search,
    MessageSquare,
    Mail,
    Eye
} from 'lucide-react';

export const AlumniPage = () => {
    const { user, profile, openAuthModal } = useAuth();
    const { openPeek } = useProfilePeek();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [authStep, setAuthStep] = useState('initial');

    // Filter states
    const [selectedBatch, setSelectedBatch] = useState('ALL');
    const [selectedDept, setSelectedDept] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    // Invite generator states
    const [inviteBatch, setInviteBatch] = useState("Batch '22");
    const [inviteDept, setInviteDept] = useState("Department of Decision Sciences");
    const [recipientEmail, setRecipientEmail] = useState('');
    const [copiedInvite, setCopiedInvite] = useState(false);

    // Live profiles from database
    const [dbProfiles, setDbProfiles] = useState([]);
    const [loadingProfiles, setLoadingProfiles] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const fetchProfiles = async () => {
            setLoadingProfiles(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!error && data) {
                    setDbProfiles(data);
                }
            } catch {
                // Ignore error
            } finally {
                setLoadingProfiles(false);
            }
        };

        fetchProfiles();
    }, []);

    const pillars = [
        {
            title: "Alumni Mentorship & Practicum",
            description: "Direct mentorship pairings connecting senior undergraduates with graduates across corporate banking, management consultancies, and tech enterprises.",
            icon: GraduationCap
        },
        {
            title: "Placement Dispatch",
            description: "Exclusive internship notifications, graduate management trainee pipelines, and recruitment calls directly from alumni employers.",
            icon: Briefcase
        },
        {
            title: "Global Chapter & Fellowship",
            description: "Reconnecting graduates across Sri Lanka, the UK, Australia, Singapore, and global financial hubs to maintain faculty fellowship.",
            icon: Network
        }
    ];

    // Static fallback spotlights to complement live profiles
    const alumniSpotlights = [
        {
            id: "sp-1",
            full_name: "Kavindu Wickramasinghe",
            batch: "Batch '21",
            department: "Department of Decision Sciences",
            graduation_year: "2021",
            current_position: "Lead Quant Analyst",
            current_company: "London Stock Exchange Group",
            avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
            bio: "Predictive Modeling of Port Container Congestion via Stochastic Queueing",
            role: "alumni",
            is_verified: true,
            linkedin_url: "https://linkedin.com",
            is_mentor_volunteer: true,
        },
        {
            id: "sp-2",
            full_name: "Dinithi Perera",
            batch: "Batch '20",
            department: "Department of Management of Technology",
            graduation_year: "2020",
            current_position: "Risk & Liquidity Consultant",
            current_company: "Deloitte South Asia",
            avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
            bio: "Decentralized Liquidity Risks in Microfinance Lending Facilities",
            role: "alumni",
            is_verified: true,
            linkedin_url: "https://linkedin.com",
            is_mentor_volunteer: true,
        },
        {
            id: "sp-3",
            full_name: "Senura Ranatunga",
            batch: "Batch '22",
            department: "Department of Industrial Management",
            graduation_year: "2022",
            current_position: "Enterprise Systems Architect",
            current_company: "MAS Holdings",
            avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
            bio: "Robotic Process Automation in Multi-Facility Apparel ERP Export Compliance",
            role: "alumni",
            is_verified: true,
            linkedin_url: "https://linkedin.com",
            is_mentor_volunteer: false,
        }
    ];

    // Merge database profiles with spotlights (dedup by ID/email)
    const combinedProfiles = [
        ...dbProfiles,
        ...alumniSpotlights.filter(sp => !dbProfiles.some(p => p.email === sp.email))
    ];

    // Apply batch, department, and search filtering
    const filteredProfiles = combinedProfiles.filter(p => {
        const matchesBatch = selectedBatch === 'ALL' || p.batch === selectedBatch;
        const matchesDept = selectedDept === 'ALL' || p.department === selectedDept;
        const matchesSearch = !searchTerm || 
            (p.full_name && p.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (p.current_company && p.current_company.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (p.current_position && p.current_position.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesBatch && matchesDept && matchesSearch;
    });

    const inviteUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/alumni?invite_batch=${encodeURIComponent(inviteBatch)}&dept=${encodeURIComponent(inviteDept)}`
        : `https://bfsu-uom.lk/alumni`;

    const handleCopyInvite = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(inviteUrl);
            setCopiedInvite(true);
            setTimeout(() => setCopiedInvite(false), 2500);
        }
    };

    return (
        <main className="flex-grow pt-24 sm:pt-28 pb-20 relative overflow-hidden transition-colors">
            <Container className="max-w-[1240px]">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-3">
                            Graduate Network & Batch Registry
                        </span>
                        <Typography variant="h1" className="mb-4 !font-display !font-bold !text-3xl sm:!text-5xl text-[var(--text-primary)]">
                            Alumni & Undergraduate Guild
                        </Typography>
                        <p className="font-body text-base sm:text-lg text-[#566072] dark:text-[#9CA3AF] font-medium leading-relaxed">
                            Cross-connecting delegates, batch committees, and graduate alumni across the Faculty of Business, University of Moratuwa.
                        </p>
                    </div>

                    {/* Header Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setInviteModalOpen(true)}
                            className="bg-[#C59B27] hover:bg-[#8E6F18] text-black px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all inline-flex items-center gap-2 shadow-sm rounded-sm cursor-pointer"
                        >
                            <UserPlus size={15} />
                            <span>Invite Batch / Members</span>
                        </button>

                        <button
                            id="linkedin-auth"
                            onClick={() => setLoginModalOpen(true)}
                            className="bg-[#0077B5] hover:bg-[#005E93] text-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all inline-flex items-center gap-2.5 shadow-sm rounded-sm cursor-pointer"
                        >
                            <span className="font-black text-sm bg-white text-[#0077B5] px-1 rounded-sm leading-none py-0.5">in</span>
                            <span>Sign In with LinkedIn</span>
                        </button>
                    </div>
                </div>

                {/* 3 Core Pillars */}
                <div id="fellowship" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 scroll-mt-24">
                    {pillars.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="border-t-2 border-[#12161F] dark:border-white/50 pt-6">
                                <Icon size={22} className="text-[#C59B27] mb-4" />
                                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3">
                                    {item.title}
                                </h3>
                                <p className="font-body text-sm sm:text-base text-[#566072] dark:text-[#9CA3AF] leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Interactive Batch & Department Directory Filter Bar */}
                <div id="profiles" className="mb-12 scroll-mt-24 bg-[var(--bg-surface)] border border-[var(--border)] p-6 rounded-sm shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)]">
                        <div>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-1">
                                Directory Registry
                            </span>
                            <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                                Filter Delegates by Batch & Department
                            </h3>
                        </div>
                        <div className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                            Showing <strong className="text-[#C59B27]">{filteredProfiles.length}</strong> Member Profiles
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <Search size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name, company, position..."
                                className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                            />
                        </div>

                        {/* Batch Selector */}
                        <div className="relative">
                            <GraduationCap size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                            <select
                                value={selectedBatch}
                                onChange={(e) => setSelectedBatch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg-surface)] border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-mono cursor-pointer"
                            >
                                <option value="ALL">All Batches (Overall Intake)</option>
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

                        {/* Department Selector */}
                        <div className="relative">
                            <BookOpen size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--bg-surface)] border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans cursor-pointer"
                            >
                                <option value="ALL">All Departments</option>
                                <option value="Department of Decision Sciences">Decision Sciences (DS)</option>
                                <option value="Department of Management of Technology">Management of Technology (MOT)</option>
                                <option value="Department of Industrial Management">Industrial Management (IM)</option>
                                <option value="Faculty Alumni">Faculty Alumni Chapter</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Profiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {filteredProfiles.length === 0 ? (
                        <div className="col-span-3 py-12 text-center border border-dashed border-[var(--border)] rounded-sm">
                            <Users size={32} className="mx-auto text-[var(--text-faint)] mb-3" />
                            <p className="font-mono text-sm text-[#566072] dark:text-[#9CA3AF]">
                                No delegates matching the selected batch and department filters.
                            </p>
                            <button
                                onClick={() => { setSelectedBatch('ALL'); setSelectedDept('ALL'); setSearchTerm(''); }}
                                className="mt-3 font-mono text-xs text-[#C59B27] font-bold uppercase underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        filteredProfiles.map((alumnus) => (
                            <div 
                                key={alumnus.id || alumnus.full_name} 
                                className="p-6 border border-[var(--border)] bg-[var(--bg-surface)] flex flex-col justify-between rounded-sm shadow-sm hover:border-[#C59B27]/60 transition-all group"
                            >
                                <div>
                                    {/* Profile Avatar Header */}
                                    <div className="flex items-start gap-3.5 mb-4">
                                        <UserAvatar
                                            src={alumnus.avatar_url}
                                            name={alumnus.full_name}
                                            size="lg"
                                            role={alumnus.role}
                                            peekable={true}
                                            username={alumnus.username || alumnus.id}
                                            profileData={alumnus}
                                        />
                                        <div>
                                            <h4 
                                                onClick={() => openPeek(alumnus)}
                                                className="font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] transition-colors leading-tight cursor-pointer"
                                            >
                                                {alumnus.full_name}
                                            </h4>
                                            <div className="font-mono text-[10px] text-[#C59B27] font-semibold flex items-center gap-1 mt-1">
                                                <CheckCircle2 size={12} className="text-[#C59B27]" />
                                                <span>{alumnus.batch || 'Intake N/A'} • {alumnus.graduation_year ? `Class of ${alumnus.graduation_year}` : 'Undergraduate'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Designation / Department */}
                                    <div className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF] mb-4 pb-3 border-b border-[var(--border)]">
                                        {alumnus.current_position && alumnus.current_company ? (
                                            <span><strong>{alumnus.current_position}</strong> at {alumnus.current_company}</span>
                                        ) : (
                                            <span>{alumnus.department || 'Faculty of Business'}</span>
                                        )}
                                    </div>

                                    {/* Bio or Summary */}
                                    {alumnus.bio && (
                                        <p className="font-body text-xs text-[var(--text-primary)] leading-relaxed mb-4 line-clamp-2">
                                            {alumnus.bio}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                                    <span className="font-mono text-[10px] uppercase text-[var(--text-faint)]">
                                        {alumnus.is_mentor_volunteer ? 'Available Mentor' : 'Verified Delegate'}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openPeek(alumnus)}
                                            className="px-2 py-1 rounded border border-[var(--border)] hover:border-[#C59B27] bg-[var(--bg-elevated)] font-mono text-[11px] text-[var(--text-secondary)] hover:text-[#C59B27] inline-flex items-center gap-1 transition-colors"
                                            title="Peek Profile Summary"
                                        >
                                            <Eye size={12} />
                                            <span>Peek</span>
                                        </button>
                                        <Link
                                            href={`/u/${alumnus.username || alumnus.id}`}
                                            className="font-mono text-xs text-[#C59B27] font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1"
                                        >
                                            <span>Profile</span>
                                            <ArrowUpRight size={13} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Batch Registration & Invitation Callout */}
                <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-sm shadow-md">
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C59B27] font-bold block mb-2">
                            Batch & Department Representative Network
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
                            Invite Your Batch & Department Peers
                        </h3>
                        <p className="font-body text-sm sm:text-base text-[#566072] dark:text-[#9CA3AF]">
                            Send batch join invites to fellow undergraduates and alumni to build a complete digital directory for your intake.
                        </p>
                    </div>

                    <button 
                        onClick={() => setInviteModalOpen(true)}
                        className="flex-shrink-0 bg-[#C59B27] hover:bg-[#8E6F18] text-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all inline-flex items-center gap-2 shadow-sm rounded-sm cursor-pointer"
                    >
                        <UserPlus size={15} />
                        <span>Send Batch Invites</span>
                    </button>
                </div>

            </Container>

            {/* Batch & Department Invitation Generator Modal */}
            {inviteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--bg-surface)] border border-[var(--border)] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative rounded-sm">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-[var(--border)]">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C59B27] block mb-1">
                                    Batch & Department Outreach
                                </span>
                                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                                    Send Batch Join Invitation
                                </h3>
                            </div>
                            <button 
                                onClick={() => setInviteModalOpen(false)}
                                className="p-1 text-[#566072] hover:text-[var(--text-primary)] font-mono text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                    Target Batch
                                </label>
                                <select
                                    value={inviteBatch}
                                    onChange={(e) => setInviteBatch(e.target.value)}
                                    className="w-full px-3 py-2 text-sm bg-[var(--bg-surface)] border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-mono"
                                >
                                    <option value="Batch '20">Batch '20</option>
                                    <option value="Batch '21">Batch '21</option>
                                    <option value="Batch '22">Batch '22</option>
                                    <option value="Batch '23">Batch '23</option>
                                    <option value="Batch '24">Batch '24</option>
                                    <option value="Batch '25">Batch '25</option>
                                    <option value="Batch '26">Batch '26</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                    Target Department
                                </label>
                                <select
                                    value={inviteDept}
                                    onChange={(e) => setInviteDept(e.target.value)}
                                    className="w-full px-3 py-2 text-sm bg-[var(--bg-surface)] border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm font-sans"
                                >
                                    <option value="Department of Decision Sciences">Department of Decision Sciences</option>
                                    <option value="Department of Management of Technology">Department of Management of Technology</option>
                                    <option value="Department of Industrial Management">Department of Industrial Management</option>
                                    <option value="Faculty Alumni Chapter">Faculty Alumni Chapter</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                    Shareable Batch Invite Link
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={inviteUrl}
                                        className="w-full px-3 py-2 text-xs bg-[var(--bg-page)] border border-[var(--border)] rounded-sm font-mono text-[var(--text-muted)]"
                                    />
                                    <button
                                        onClick={handleCopyInvite}
                                        className="px-4 py-2 bg-[#C59B27] hover:bg-[#8E6F18] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
                                    >
                                        {copiedInvite ? <Check size={14} /> : <Copy size={14} />}
                                        <span>{copiedInvite ? 'Copied' : 'Copy'}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! Join our official ${inviteBatch} (${inviteDept}) network on the BFSU Portal: ${inviteUrl}`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider rounded-sm inline-flex items-center gap-2"
                                >
                                    <MessageSquare size={14} />
                                    <span>Share via WhatsApp</span>
                                </a>

                                <a
                                    href={`mailto:?subject=${encodeURIComponent(`Invitation: Join ${inviteBatch} (${inviteDept}) Registry`)}&body=${encodeURIComponent(`Hi,\n\nYou are invited to complete your profile on the Faculty of Business Students' Union (BFSU) portal for ${inviteBatch} (${inviteDept}):\n\n${inviteUrl}\n\nBest regards,\nBFSU Committee`)}`}
                                    className="bg-[#12161F] dark:bg-white/10 hover:bg-[#C59B27] dark:hover:bg-[#C59B27] text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider rounded-sm inline-flex items-center gap-2"
                                >
                                    <Mail size={14} />
                                    <span>Send Email Invite</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* LinkedIn OAuth Modal */}
            {loginModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--bg-surface)] border border-[var(--border)] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative rounded-sm">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-[var(--border)]">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0077B5] block mb-1">
                                    Official Alumni Verification
                                </span>
                                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                                    Sign In with LinkedIn
                                </h3>
                            </div>
                            <button 
                                onClick={() => setLoginModalOpen(false)}
                                className="p-1 text-[#566072] hover:text-[var(--text-primary)] font-mono text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {authStep === 'initial' ? (
                            <div>
                                <p className="font-body text-sm text-[#566072] dark:text-[#9CA3AF] mb-6 leading-relaxed">
                                    Connect using your official LinkedIn account to synchronize your graduate degree from the <strong className="text-[var(--text-primary)]">Faculty of Business, University of Moratuwa</strong> and link your current enterprise role.
                                </p>

                                <button 
                                    onClick={() => openAuthModal('login')}
                                    className="w-full py-3 bg-[#0077B5] hover:bg-[#005E93] text-white font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 shadow-sm rounded-sm"
                                >
                                    <span className="font-black text-sm bg-white text-[#0077B5] px-1 rounded-sm leading-none py-0.5">in</span>
                                    <span>Continue with LinkedIn OAuth</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </main>
    );
};
