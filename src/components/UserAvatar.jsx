'use client';

import React, { useState, useEffect } from 'react';
import { User, Shield } from 'lucide-react';
import { useProfilePeek } from '../context/ProfilePeekContext';

export const UserAvatar = ({ 
    src, 
    name, 
    size = 'md', 
    className = '',
    role = null,
    peekable = false,
    username = null,
    profileData = null
}) => {
    const [imageError, setImageError] = useState(false);
    const [useProxy, setUseProxy] = useState(false);
    const { openPeek } = useProfilePeek();

    useEffect(() => {
        setImageError(false);
        setUseProxy(false);
    }, [src]);

    const sizeClasses = {
        xs: 'w-5 h-5 text-[10px]',
        sm: 'w-7 h-7 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-16 h-16 text-xl',
        xl: 'w-24 h-24 text-3xl font-display',
    };

    const initial = (name || 'U').trim().charAt(0).toUpperCase();

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

    // Check if we have a valid image URL and it hasn't errored
    const hasValidImage = Boolean(src) && !imageError && src.startsWith('http');

    const isInteractive = peekable || Boolean(username) || Boolean(profileData);

    const handleClick = (e) => {
        if (isInteractive) {
            e.stopPropagation();
            openPeek(profileData || username || { name, avatar_url: src, role });
        }
    };

    return (
        <div 
            onClick={isInteractive ? handleClick : undefined}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onKeyDown={isInteractive ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); } : undefined}
            className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none ${
                isInteractive ? 'cursor-pointer hover:ring-2 hover:ring-[#C59B27] transition-all hover:scale-105' : ''
            } ${className}`}
        >
            {hasValidImage ? (
                <img
                    src={displaySrc}
                    alt={name || 'User Avatar'}
                    onError={handleImageError}
                    referrerPolicy="no-referrer"
                    className={`${sizeClasses[size] || sizeClasses.md} rounded-full object-cover border-2 border-[#C59B27]/40 shadow-sm`}
                />
            ) : (
                <div
                    className={`${sizeClasses[size] || sizeClasses.md} rounded-full bg-gradient-to-br from-[#12161F] via-[#202736] to-[#12161F] dark:from-[#1E2534] dark:to-[#0F141E] border border-[#C59B27]/40 text-[#C59B27] flex items-center justify-center font-bold tracking-wider shadow-inner`}
                >
                    {initial}
                </div>
            )}

            {role && (role === 'admin' || role === 'union_exec') && (
                <span 
                    title={role === 'admin' ? 'Administrator' : 'Union Executive'}
                    className="absolute -bottom-0.5 -right-0.5 bg-[#C59B27] text-black rounded-full p-0.5 shadow-sm border border-black/20"
                >
                    <Shield size={size === 'xl' || size === 'lg' ? 14 : 10} />
                </span>
            )}
        </div>
    );
};
