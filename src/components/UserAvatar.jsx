'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';
import { useProfilePeek } from '../context/ProfilePeekContext';

/**
 * Universal, Adjustable UserAvatar Component
 * 
 * Features:
 * - Adjustable size: preset ('2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl') or numeric pixel value (e.g. size={32}).
 * - Robust image resolution: handles LinkedIn CDN, Google OAuth, Notion S3, custom uploads.
 * - Dynamic fallback initials: calculated proportionally with deterministic branding hues (no fake photos).
 * - Two-tier interaction:
 *   - Hover: triggers compact floating hover popover.
 *   - Click: opens full public profile in-page with safe go-back navigation.
 */
export const UserAvatar = ({ 
    src, 
    name = '', 
    size = 'md', 
    className = '',
    role = null,
    peekable = false,
    username = null,
    profileData = null,
    onClick = null
}) => {
    const [imageError, setImageError] = useState(false);
    const [useProxy, setUseProxy] = useState(false);
    const avatarRef = useRef(null);
    const { showHoverPeek, hideHoverPeek, openFullProfile } = useProfilePeek();

    useEffect(() => {
        setImageError(false);
        setUseProxy(false);
    }, [src]);

    // Handle string presets vs custom numeric sizing
    const PRESET_MAP = {
        '2xs': { dim: 20, class: 'w-5 h-5', text: 'text-[9px]' },
        'xs':  { dim: 24, class: 'w-6 h-6', text: 'text-[10px]' },
        'sm':  { dim: 32, class: 'w-8 h-8', text: 'text-xs' },
        'md':  { dim: 40, class: 'w-10 h-10', text: 'text-sm' },
        'lg':  { dim: 56, class: 'w-14 h-14', text: 'text-lg' },
        'xl':  { dim: 76, class: 'w-20 h-20', text: 'text-2xl' },
        '2xl': { dim: 96, class: 'w-24 h-24', text: 'text-3xl' },
    };

    const isNumeric = typeof size === 'number';
    const preset = PRESET_MAP[size] || PRESET_MAP.md;
    const dimensionPx = isNumeric ? size : preset.dim;
    const computedFontSize = isNumeric ? Math.max(10, Math.floor(size * 0.4)) : null;

    // Generate clean initials (e.g. "Naveen Sandeepa" -> "NS", "Kosala" -> "K")
    const cleanName = (name || '').trim();
    const nameParts = cleanName.split(/\s+/).filter(Boolean);
    let initials = 'U';
    if (nameParts.length >= 2) {
        initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    } else if (nameParts.length === 1 && nameParts[0].length > 0) {
        initials = nameParts[0].slice(0, Math.min(2, nameParts[0].length)).toUpperCase();
    }

    // Deterministic subtle gradient palette based on name hash
    const PALETTES = [
        'from-[#0A192F] via-[#172A45] to-[#0A192F] text-[#C59B27] border-[#C59B27]/40',
        'from-[#1A202C] via-[#2D3748] to-[#1A202C] text-[#E5B842] border-[#E5B842]/40',
        'from-[#0F172A] via-[#1E293B] to-[#0F172A] text-amber-300 border-amber-400/40',
        'from-[#0C1E3C] via-[#132B52] to-[#0C1E3C] text-[#D4AF37] border-[#D4AF37]/40',
    ];
    let hash = 0;
    for (let i = 0; i < cleanName.length; i++) {
        hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorTheme = PALETTES[Math.abs(hash) % PALETTES.length];

    // Image fallback and proxy handling
    const handleImageError = () => {
        if (!useProxy && src && src.startsWith('http')) {
            setUseProxy(true);
        } else {
            setImageError(true);
        }
    };

    const displaySrc = useProxy && src 
        ? `https://images.weserv.nl/?url=${encodeURIComponent(src)}` 
        : src;

    const hasValidImage = Boolean(src) && !imageError && typeof src === 'string' && src.startsWith('http');
    const isInteractive = peekable || Boolean(username) || Boolean(profileData);

    const targetPayload = profileData || {
        full_name: name,
        username: username || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        avatar_url: src,
        role: role || 'student'
    };

    const handleMouseEnter = () => {
        if (!isInteractive) return;
        if (avatarRef.current) {
            const rect = avatarRef.current.getBoundingClientRect();
            showHoverPeek(targetPayload, rect);
        }
    };

    const handleMouseLeave = () => {
        if (!isInteractive) return;
        hideHoverPeek();
    };

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
            return;
        }
        if (isInteractive) {
            e.stopPropagation();
            hideHoverPeek(true); // immediate hide
            openFullProfile(targetPayload);
        }
    };

    const inlineStyle = isNumeric ? {
        width: `${dimensionPx}px`,
        height: `${dimensionPx}px`,
        fontSize: `${computedFontSize}px`
    } : {};

    return (
        <div 
            ref={avatarRef}
            onClick={isInteractive ? handleClick : undefined}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onKeyDown={isInteractive ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); } : undefined}
            style={inlineStyle}
            aria-label={cleanName ? `${cleanName} avatar` : 'User avatar'}
            className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none transition-transform duration-150 ${
                !isNumeric ? (preset.class || 'w-10 h-10') : ''
            } ${
                isInteractive ? 'cursor-pointer hover:ring-2 hover:ring-[#C59B27] hover:scale-105 active:scale-95' : ''
            } ${className}`}
        >
            {hasValidImage ? (
                <img
                    src={displaySrc}
                    alt={cleanName || 'User Avatar'}
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    style={inlineStyle}
                    className={`w-full h-full rounded-full object-cover border border-[#C59B27]/40 shadow-sm`}
                />
            ) : (
                <div
                    style={inlineStyle}
                    className={`w-full h-full rounded-full bg-gradient-to-br ${colorTheme} border font-bold font-mono tracking-tight flex items-center justify-center shadow-inner ${
                        !isNumeric ? preset.text : ''
                    }`}
                >
                    {initials}
                </div>
            )}

            {/* Role indicator badge */}
            {role && (role === 'admin' || role === 'union_exec' || role === 'maintainer') && dimensionPx >= 28 && (
                <span 
                    title={role === 'admin' ? 'Administrator' : role === 'maintainer' ? 'Core Web Architect' : 'Union Executive'}
                    className="absolute -bottom-0.5 -right-0.5 bg-[#C59B27] text-[#001738] rounded-full p-0.5 shadow-sm border border-black/30"
                >
                    <Shield size={dimensionPx >= 56 ? 12 : 9} />
                </span>
            )}
        </div>
    );
};
