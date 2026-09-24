'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
    X, 
    ExternalLink, 
    Linkedin, 
    Github, 
    Globe, 
    ShieldCheck, 
    GraduationCap, 
    Building2, 
    Award, 
    Code2, 
    Calendar,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { supabase } from '../lib/supabaseClient';

export const ProfilePeekModal = ({ isOpen, onClose, profileData, username }) => {
    const [profile, setProfile] = useState(profileData || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profileData) {
            setProfile(profileData);
            return;
        }

        if (isOpen && username) {
            const fetchProfile = async () => {
                setLoading(true);
                try {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*, career_history(*), student_projects(*)')
                        .or(`username.eq.${username},id.eq.${username}`)
                        .single();

                    if (!error && data) {
                        setProfile(data);
                    } else {
                        // Fallback minimal structure
                        setProfile({
                            full_name: username.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                            username: username,
                            role: 'student',
                            department: 'Faculty of Business'
                        });
                    }
                } catch {
                    setProfile({
                        full_name: username,
                        username: username,
                        role: 'student'
                    });
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, [isOpen, username, profileData]);

    if (!isOpen) return null;

    const displayUsername = profile?.username || username || '';
    const isAlumni = profile?.role === 'alumni' || Boolean(profile?.graduation_year);
    const isMaintainer = profile?.is_maintainer || profile?.role_title?.toLowerCase().includes('maintainer') || profile?.role_title?.toLowerCase().includes('architect');

    return (
        <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-peek-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-md bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Decorative Top Accent Bar */}
                <div className="h-24 bg-gradient-to-r from-[#001738] via-[#0F2942] to-[#C59B27]/40 relative">
                    <button 
                        onClick={onClose}
                        aria-label="Close Profile Peek"
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    
                    {/* Badge Indicator in Banner */}
                    <div className="absolute top-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-semibold tracking-wider uppercase text-amber-300">
                        <Sparkles className="w-3 h-3 text-[#C59B27]" />
                        <span>BFSU Public Persona</span>
                    </div>
                </div>

                {/* Profile Header Block */}
                <div className="px-6 pt-0 pb-6 -mt-12">
                    <div className="flex items-end justify-between mb-4">
                        <div className="relative">
                            <UserAvatar 
                                src={profile?.avatar_url || profile?.avatar}
                                name={profile?.full_name || profile?.name || 'User'}
                                size="xl"
                                className="ring-4 ring-[var(--bg-surface)] shadow-lg"
                            />
                            {profile?.is_verified !== false && (
                                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-md" title="Verified Institutional Member">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                </div>
                            )}
                        </div>

                        {/* Status Role Badge */}
                        <div className="text-right">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                isAlumni 
                                    ? 'bg-purple-900/20 text-purple-400 border border-purple-800/30'
                                    : 'bg-amber-900/20 text-amber-400 border border-amber-800/30'
                            }`}>
                                <GraduationCap className="w-3.5 h-3.5" />
                                {isAlumni ? 'Alumni' : 'Undergraduate'}
                            </span>
                        </div>
                    </div>

                    {/* Names & Core Identity */}
                    <div className="mb-3">
                        <h3 id="profile-peek-title" className="text-xl font-bold text-[var(--text-primary)] leading-tight flex items-center gap-2">
                            {profile?.full_name || profile?.name || 'Academic Delegate'}
                        </h3>
                        {displayUsername && (
                            <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                                @{displayUsername}
                            </p>
                        )}
                    </div>

                    {/* Headline or Role */}
                    {(profile?.headline || profile?.role_title || profile?.role) && (
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                            {profile?.headline || profile?.role_title || (profile?.role === 'alumni' ? 'Faculty Alumnus' : 'Student Delegate')}
                        </p>
                    )}

                    {/* Institutional Metatags */}
                    <div className="space-y-1.5 py-3 border-y border-[var(--border)] text-xs text-[var(--text-secondary)] mb-4">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                            <span className="truncate">{profile?.department || profile?.departmentName || 'Faculty of Business'}</span>
                        </div>
                        {profile?.batch && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                                <span>{profile.batch} {profile.graduation_year ? `• Class of ${profile.graduation_year}` : ''}</span>
                            </div>
                        )}
                        {isMaintainer && (
                            <div className="flex items-center gap-2 text-cyan-400 font-medium">
                                <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                <span>Web Platform Maintainer</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Social & Portfolio Links */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="flex items-center gap-2">
                            {profile?.linkedin_url && (
                                <a 
                                    href={profile.linkedin_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[#0077B5] hover:border-[#0077B5]/40 transition-colors"
                                    title="LinkedIn Profile"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                            {profile?.github_url && (
                                <a 
                                    href={profile.github_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-white/40 transition-colors"
                                    title="GitHub Profile"
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                            {profile?.portfolio_url && (
                                <a 
                                    href={profile.portfolio_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[#C59B27] hover:border-[#C59B27]/40 transition-colors"
                                    title="Personal Portfolio Site"
                                >
                                    <Globe className="w-4 h-4" />
                                </a>
                            )}
                        </div>

                        {/* Optional Student Verification ID */}
                        {profile?.student_id && (
                            <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2.5 py-1 rounded border border-[var(--border)]">
                                ID: {profile.student_id}
                            </span>
                        )}
                    </div>

                    {/* Primary CTA: Full Profile Anchor */}
                    {displayUsername ? (
                        <Link 
                            href={`/u/${displayUsername}`}
                            onClick={onClose}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#E5B842] hover:brightness-110 text-[#001738] font-bold text-xs shadow-md shadow-[#C59B27]/20 transition-all group"
                        >
                            <span>View Full Public Profile</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    ) : (
                        <button 
                            disabled
                            className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-muted)] text-xs font-semibold"
                        >
                            Institutional Profile Unclaimed
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
