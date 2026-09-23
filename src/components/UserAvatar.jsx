'use client';

import React, { useState } from 'react';
import { User, Shield } from 'lucide-react';

export const UserAvatar = ({ 
    src, 
    name, 
    size = 'md', 
    className = '',
    role = null 
}) => {
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
        xs: 'w-5 h-5 text-[10px]',
        sm: 'w-7 h-7 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-16 h-16 text-xl',
        xl: 'w-24 h-24 text-3xl font-display',
    };

    const initial = (name || 'U').trim().charAt(0).toUpperCase();

    // Check if we have a valid image URL and it hasn't errored
    const hasValidImage = Boolean(src) && !imageError && src.startsWith('http');

    return (
        <div className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none ${className}`}>
            {hasValidImage ? (
                <img
                    src={src}
                    alt={name || 'User Avatar'}
                    onError={() => setImageError(true)}
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
