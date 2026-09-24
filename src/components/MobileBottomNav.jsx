'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Landmark, Calendar, Users, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserAvatar } from './UserAvatar';

export const MobileBottomNav = () => {
    const pathname = usePathname();
    const { user, profile, openAuthModal } = useAuth();

    const tabs = [
        {
            name: 'Home',
            href: '/',
            icon: Home,
            isActive: pathname === '/'
        },
        {
            name: 'About',
            href: '/about',
            icon: Landmark,
            isActive: pathname.startsWith('/about') || pathname.startsWith('/capabilities') || pathname.startsWith('/societies')
        },
        {
            name: 'Happenings',
            href: '/events',
            icon: Calendar,
            isActive: pathname.startsWith('/events') || pathname.startsWith('/news')
        },
        {
            name: 'People',
            href: '/alumni',
            icon: Users,
            isActive: pathname.startsWith('/alumni') || pathname.startsWith('/gallery') || pathname.startsWith('/people')
        },
    ];

    return (
        <nav 
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-surface)]/95 backdrop-blur-md border-t border-[var(--border)] px-2 py-1 shadow-2xl transition-colors"
            aria-label="Mobile Navigation Bar"
        >
            <div className="flex items-center justify-around max-w-md mx-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[58px] transition-all rounded-md group relative ${
                                tab.isActive 
                                    ? 'text-[#C59B27]' 
                                    : 'text-[#566072] dark:text-[#9CA3AF] hover:text-[#12161F] dark:hover:text-white'
                            }`}
                        >
                            <div className="relative">
                                <Icon size={20} className={tab.isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                                {tab.isActive && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
                                )}
                            </div>
                            <span className={`text-[10px] font-mono mt-1 tracking-wider uppercase ${
                                tab.isActive ? 'font-bold text-[#C59B27]' : 'font-medium'
                            }`}>
                                {tab.name}
                            </span>
                        </Link>
                    );
                })}

                {/* Profile / Account Tab */}
                {user ? (
                    <Link
                        href="/profile"
                        className={`flex flex-col items-center justify-center py-1.5 px-3 min-w-[58px] transition-all rounded-md relative ${
                            pathname.startsWith('/profile') || pathname.startsWith('/u/')
                                ? 'text-[#C59B27]'
                                : 'text-[#566072] dark:text-[#9CA3AF]'
                        }`}
                    >
                        <div className="relative">
                            <UserAvatar 
                                src={profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture} 
                                name={profile?.full_name || user.user_metadata?.full_name || user.email}
                                size="xs"
                                role={profile?.role}
                            />
                            {(pathname.startsWith('/profile') || pathname.startsWith('/u/')) && (
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
                            )}
                        </div>
                        <span className={`text-[10px] font-mono mt-1 tracking-wider uppercase ${
                            pathname.startsWith('/profile') || pathname.startsWith('/u/')
                                ? 'font-bold text-[#C59B27]'
                                : 'font-medium'
                        }`}>
                            You
                        </span>
                    </Link>
                ) : (
                    <button
                        onClick={() => openAuthModal('login')}
                        className="flex flex-col items-center justify-center py-1.5 px-3 min-w-[58px] transition-all rounded-md text-[#566072] dark:text-[#9CA3AF] hover:text-[#C59B27]"
                    >
                        <User size={20} className="stroke-[1.8]" />
                        <span className="text-[10px] font-mono mt-1 tracking-wider uppercase font-medium">
                            Login
                        </span>
                    </button>
                )}
            </div>
        </nav>
    );
};
