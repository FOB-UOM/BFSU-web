import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '../../../lib/supabase/server';
import { Container } from '../../../components/ui/Container';
import { Typography } from '../../../components/ui/Typography';
import { UserAvatar } from '../../../components/UserAvatar';
import { QRCodeSVG } from 'qrcode.react';
import { 
    GraduationCap, Briefcase, BookOpen, MapPin, 
    Globe, FileText, Share2, 
    CheckCircle2, ArrowLeft, ExternalLink, Calendar, Award
} from 'lucide-react';

export async function generateMetadata({ params }) {
    const { username } = await params;
    const supabase = await createClient();

    // Query either by username or by ID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(username);
    const query = supabase.from('profiles').select('*');
    const { data: profile } = isUuid ? await query.eq('id', username).maybeSingle() : await query.eq('username', username).maybeSingle();

    if (!profile) {
        return { title: 'Delegate Not Found' };
    }

    const title = `${profile.full_name || 'Member'} | BFSU UoM Verified Delegate`;
    const description = profile.bio || `${profile.department || 'Faculty of Business'} • ${profile.batch || ''} • Business Faculty Students' Union`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: profile.avatar_url ? [{ url: profile.avatar_url }] : ['/images/logo.png'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: profile.avatar_url ? [profile.avatar_url] : ['/images/logo.png'],
        }
    };
}

export default async function PublicProfilePage({ params }) {
    const { username } = await params;
    const supabase = await createClient();

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(username);
    const query = supabase.from('profiles').select('*');
    const { data: profile } = isUuid ? await query.eq('id', username).maybeSingle() : await query.eq('username', username).maybeSingle();

    if (!profile) {
        notFound();
    }

    // Fetch related career timeline, projects, and achievements
    const [careerRes, projectsRes, achievementsRes] = await Promise.all([
        supabase.from('career_history').select('*').eq('profile_id', profile.id).order('start_date', { ascending: false }),
        supabase.from('student_projects').select('*').eq('profile_id', profile.id).order('created_at', { ascending: false }),
        supabase.from('achievements').select('*').eq('profile_id', profile.id).order('year', { ascending: false }),
    ]);

    const careerHistory = careerRes.data || [];
    const projects = projectsRes.data || [];
    const achievements = achievementsRes.data || [];

    const qrPayload = JSON.stringify({
        org: 'BFSU-UOM',
        uid: profile.id,
        name: profile.full_name,
        role: profile.role,
        verified: profile.is_verified,
    });

    const isAlumni = profile.role === 'alumni' || Boolean(profile.graduation_year);
    const shareUrl = `https://bfsu-uom.lk/u/${profile.username || profile.id}`;
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

    return (
        <main className="flex-grow pt-32 pb-24 relative transition-colors duration-500">
            <Container className="max-w-5xl relative z-10">
                
                {/* Back Link */}
                <div className="flex items-center justify-between mb-8">
                    <Link 
                        href="/alumni" 
                        className="inline-flex items-center gap-2 text-[#566072] dark:text-[#9CA3AF] hover:text-[#C59B27] font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Directory
                    </Link>

                    {/* LinkedIn Share Button */}
                    <a
                        href={linkedinShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0077B5] hover:bg-[#005E93] text-white px-3 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
                    >
                        <span className="bg-white text-[#0077B5] px-1 rounded-[2px] text-[10px] font-black leading-none py-0.5">in</span>
                        <span>Share on LinkedIn</span>
                    </a>
                </div>

                {/* Hero Header Card */}
                <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-10 rounded-sm shadow-xl mb-10 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[var(--border)]">
                        <div className="flex items-start gap-5">
                            <UserAvatar
                                src={profile.avatar_url}
                                name={profile.full_name}
                                size="xl"
                                role={profile.role}
                            />
                            <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#C59B27]/15 border border-[#C59B27]/40 text-[#C59B27] font-bold uppercase tracking-widest">
                                        {isAlumni ? 'Alumni' : profile.role}
                                    </span>
                                    {profile.is_verified && (
                                        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                                            <CheckCircle2 size={13} /> Verified Delegate
                                        </span>
                                    )}
                                </div>
                                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                                    {profile.full_name}
                                </h1>
                                <p className="font-mono text-sm text-[#C59B27] mt-1 font-medium">
                                    {profile.current_position ? `${profile.current_position} at ${profile.current_company}` : profile.department}
                                </p>
                            </div>
                        </div>

                        {/* QR Code Pass */}
                        <div className="hidden md:flex flex-col items-center p-3 rounded-sm bg-white shadow-md border border-[var(--border)] shrink-0 text-center">
                            <QRCodeSVG value={qrPayload} size={84} level="M" fgColor="#12161F" />
                            <span className="font-mono text-[8px] uppercase tracking-wider text-[#12161F] mt-1.5 font-bold">
                                Delegate ID
                            </span>
                        </div>
                    </div>

                    {/* Metadata strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-[var(--border)] font-mono text-xs">
                        <div>
                            <span className="text-[10px] uppercase text-[var(--text-faint)] block mb-1">Department</span>
                            <span className="font-semibold text-[var(--text-primary)]">{profile.department || 'Faculty of Business'}</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-[var(--text-faint)] block mb-1">Batch / Class</span>
                            <span className="font-semibold text-[var(--text-primary)]">{profile.batch || (profile.graduation_year ? `Class of ${profile.graduation_year}` : 'N/A')}</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-[var(--text-faint)] block mb-1">Industry</span>
                            <span className="font-semibold text-[var(--text-primary)]">{profile.industry || 'Management & Commerce'}</span>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase text-[var(--text-faint)] block mb-1">Mentorship</span>
                            <span className="font-semibold text-[#C59B27]">{profile.is_mentor_volunteer ? 'Available Mentor' : 'Alumnus'}</span>
                        </div>
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <p className="font-body text-base text-[#4A5364] dark:text-[#CBD5E1] pt-6 leading-relaxed max-w-3xl">
                            {profile.bio}
                        </p>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-6">
                        {profile.linkedin_url && (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3.5 py-1.5 rounded-sm bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] dark:text-sky-300 font-mono text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#0077B5]/20 transition-colors"
                            >
                                <span className="font-black text-xs">in</span>
                                <span>LinkedIn</span>
                                <ExternalLink size={12} />
                            </a>
                        )}

                        {profile.github_url && (
                            <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3.5 py-1.5 rounded-sm bg-black/5 dark:bg-white/5 border border-[var(--border)] font-mono text-xs font-semibold inline-flex items-center gap-2 hover:border-[#C59B27] transition-colors"
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                <span>GitHub</span>
                                <ExternalLink size={12} />
                            </a>
                        )}

                        {profile.cv_url && (
                            <a
                                href={profile.cv_url}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3.5 py-1.5 rounded-sm bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#C59B27] font-mono text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#C59B27]/20 transition-colors"
                            >
                                <FileText size={14} />
                                <span>Curriculum Vitae</span>
                                <ExternalLink size={12} />
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Career Timeline */}
                    <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-sm shadow-sm">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
                            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                                <Briefcase size={18} className="text-[#C59B27]" />
                                <span>Career Progression</span>
                            </h2>
                            <span className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF]">
                                {careerHistory.length} Milestones
                            </span>
                        </div>

                        {careerHistory.length === 0 ? (
                            <p className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF] py-6 text-center">
                                No career milestones recorded.
                            </p>
                        ) : (
                            <div className="space-y-6">
                                {careerHistory.map((item) => (
                                    <div key={item.id} className="relative pl-6 border-l-2 border-[#C59B27]/40 space-y-1">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#C59B27]" />
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                                                {item.position}
                                            </h3>
                                            {item.is_current && (
                                                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
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
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Honours & Research Projects */}
                    <div className="space-y-8">
                        {/* Honours & Awards */}
                        <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-sm shadow-sm">
                            <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-6 pb-4 border-b border-[var(--border)] flex items-center gap-2">
                                <Award size={18} className="text-[#C59B27]" />
                                <span>Faculty Honours & Recognition</span>
                            </h2>

                            {achievements.length === 0 ? (
                                <p className="font-mono text-xs text-[#566072] dark:text-[#9CA3AF] py-4 text-center">
                                    Collegiate honours and union achievements.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {achievements.map((item) => (
                                        <div key={item.id} className="p-3 bg-[var(--bg-page)]/40 rounded-sm border border-[var(--border)]">
                                            <span className="font-mono text-[10px] text-[#C59B27] font-bold uppercase block">{item.year} • {item.category}</span>
                                            <h4 className="font-display text-sm font-bold text-[var(--text-primary)]">{item.title}</h4>
                                            {item.description && <p className="font-body text-xs text-[#566072] mt-1">{item.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Projects Showcase */}
                        {projects.length > 0 && (
                            <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 sm:p-8 rounded-sm shadow-sm">
                                <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-6 pb-4 border-b border-[var(--border)]">
                                    Project & Technical Showcase
                                </h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {projects.map((proj) => (
                                        <div key={proj.id} className="p-3 bg-[var(--bg-page)]/40 rounded-sm border border-[var(--border)] flex items-center justify-between">
                                            <div>
                                                <h4 className="font-display text-sm font-bold">{proj.title}</h4>
                                                <p className="font-body text-xs text-[#566072] line-clamp-1">{proj.description}</p>
                                            </div>
                                            {proj.github_url && (
                                                <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-[#C59B27] p-1.5 hover:opacity-80">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </Container>
        </main>
    );
}
