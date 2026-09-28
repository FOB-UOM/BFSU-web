'use client';

import React, { useRef, useEffect } from 'react';
import { 
    ShieldCheck, 
    GraduationCap, 
    ArrowRight, 
    ExternalLink,
    Building2,
    Calendar
} from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { SafeExternalLink } from './common/SafeExternalLink';


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

/**
 * Lightweight, compact floating hover card for quick preview
 */
export const ProfileHoverCard = ({
    target,
    rect,
    isVisible,
    onMouseEnter,
    onMouseLeave,
    onOpenFullProfile
}) => {
    const cardRef = useRef(null);

    if (!isVisible || !target) return null;

    const name = target.full_name || target.name || 'Member';
    const username = target.username || '';
    const avatarUrl = target.avatar_url || target.avatar || target.image;
    const roleTitle = target.role_title || target.role || 'Member';
    const department = target.department || '';
    const headline = target.headline || target.bio || '';
    const linkedinUrl = target.linkedin || target.linkedin_url;
    const githubUrl = target.github || target.github_url;

    // Calculate smart positioning based on avatar rect
    const popoverWidth = 290;
    const popoverHeight = 210;

    let top = 0;
    let left = 0;

    if (rect) {
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

        // Position horizontally centered on avatar, with edge guards
        left = rect.left + rect.width / 2 - popoverWidth / 2;
        if (left < 16) left = 16;
        if (left + popoverWidth > viewportWidth - 16) left = viewportWidth - popoverWidth - 16;

        // Position vertically: below avatar if space permits, otherwise above
        if (rect.bottom + popoverHeight + 12 < viewportHeight) {
            top = rect.bottom + 8;
        } else {
            top = Math.max(16, rect.top - popoverHeight - 8);
        }
    }

    return (
        <div
            ref={cardRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                position: 'fixed',
                top: `${top}px`,
                left: `${left}px`,
                width: `${popoverWidth}px`,
                zIndex: 9999
            }}
            className="animate-in fade-in zoom-in-95 duration-150 select-none bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden backdrop-blur-md"
        >
            {/* Top Accent Strip */}
            <div className="h-1.5 bg-gradient-to-r from-[#001738] via-[#C59B27] to-[#E5B842]" />

            <div className="p-3.5">
                {/* Header: Avatar + Identity */}
                <div className="flex items-start gap-3 mb-2.5">
                    <UserAvatar 
                        src={avatarUrl}
                        name={name}
                        size={38}
                        className="shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-[var(--text-primary)] truncate leading-tight">
                                {name}
                            </h4>
                            {target.is_verified !== false && (
                                <ShieldCheck className="w-3 h-3 text-[#C59B27] shrink-0" title="Verified Member" />
                            )}
                        </div>

                        <span className="font-mono text-[10px] font-bold text-[#C59B27] uppercase tracking-wide block truncate mt-0.5">
                            {roleTitle}
                        </span>

                        {department && (
                            <span className="font-mono text-[9px] text-[var(--text-secondary)] block truncate mt-0.5">
                                {department}
                            </span>
                        )}
                    </div>
                </div>

                {/* Brief Headline / Bio snippet */}
                {headline && (
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-3 font-normal">
                        {headline}
                    </p>
                )}

                {/* Footer Controls: Quick Socials + Open Full Profile Action */}
                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        {linkedinUrl && (
                            <SafeExternalLink 
                                href={linkedinUrl} 
                                platform="linkedin"
                                className="p-1 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[#0077B5] transition-colors"
                                title="LinkedIn Profile"
                                stopPropagation={true}
                            >
                                <LinkedInIcon className="w-3.5 h-3.5" />
                            </SafeExternalLink>
                        )}
                        {githubUrl && (
                            <SafeExternalLink 
                                href={githubUrl} 
                                platform="github"
                                className="p-1 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-white transition-colors"
                                title="GitHub Profile"
                                stopPropagation={true}
                            >
                                <GitHubIcon className="w-3.5 h-3.5" />
                            </SafeExternalLink>
                        )}
                    </div>


                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenFullProfile(target);
                        }}
                        className="font-mono text-[10px] font-bold text-[#001738] bg-[#C59B27] hover:bg-[#D4AF37] px-2.5 py-1 rounded inline-flex items-center gap-1 transition-all shadow-sm active:scale-95"
                    >
                        <span>Full Profile</span>
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};
