'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Search, ChevronDown, User, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';
import { UserAvatar } from './UserAvatar';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
    const { user, profile, openAuthModal, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleOpenSearch = () => setSearchOpen(true);
        window.addEventListener('open-search', handleOpenSearch);
        return () => window.removeEventListener('open-search', handleOpenSearch);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuStructure = [
        {
            key: 'about',
            name: 'About',
            href: '/about',
            items: [
                { title: 'The Faculty of Business', desc: 'Departments of DS, MOT, IM & UGS', href: '/about#faculty' },
                { title: 'Union Mandate & Constitution', desc: 'Statutory student advocacy & charter', href: '/about#mandate' },
                { title: 'Executive Board 2026', desc: 'Elected officials & committee members', href: '/about#council' },
                { title: 'Past Union Leadership', desc: 'Honor roll & continuity records', href: '/about#past-leadership' },
            ]
        },
        {
            key: 'explore',
            name: 'Explore',
            href: '/explore',
            items: [
                { title: 'Student Achievements', desc: 'National hackathons & global titles', href: '/explore#achievements' },
                { title: 'Campus Traditions & Life', desc: 'Welfare, sports fixtures & culture', href: '/explore#life' },
                { title: 'Assemblies & Events', desc: 'Annual conferences & ceremonial meets', href: '/explore#events' },
                { title: 'Research & Projects', desc: 'Undergraduate dissertations & models', href: '/explore#projects' },
            ]
        },
        {
            key: 'notices',
            name: 'Notices',
            href: '/news',
            items: null
        },
        {
            key: 'links',
            name: 'Links',
            href: '/links',
            items: [
                { title: 'Virtual Learning & LMS', desc: 'Moodle (online.uom.lk) & Faculty LMS', href: '/links#lms' },
                { title: 'Academic Departments', desc: 'Portals for /ds, /mot, /im & UGS division', href: '/links#departments' },
                { title: 'Examinations & Calendar', desc: 'Official timetables & session schedules', href: '/links#registry' },
                { title: 'Library & E-Repository', desc: 'Digital dissertations (dl.lib.mrt.ac.lk)', href: '/links#student_services' },
            ]
        },
        {
            key: 'alumni',
            name: 'Alumni',
            href: '/alumni',
            items: [
                { title: 'Graduate Fellowship', desc: 'Mentorship network & industry dispatch', href: '/alumni#fellowship' },
                { title: 'Verified Profiles', desc: 'Alumni linked to their undergraduate research', href: '/alumni#profiles' },
                { title: 'Sign In with LinkedIn', desc: 'Member authentication & profile access', href: '/alumni#linkedin-auth' },
            ]
        },
    ];

    return (
        <>
            <header className="sticky top-0 w-full z-40 bg-white/95/95 backdrop-blur-md border-b border-[var(--border)] transition-colors">
                
                {/* 1. Status Ribbon */}
                <div className="bg-[var(--bg-page)] text-[#12161F] dark:text-[#E2E8F0] px-4 sm:px-8 lg:px-12 py-1.5 flex justify-between items-center text-[11px] font-mono font-medium tracking-wider border-b border-[var(--border)]">
                    <div className="flex items-center gap-2.5 truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                        <span className="text-[#C59B27] font-bold uppercase tracking-widest hidden xs:inline">[ACTIVE SESSION]</span>
                        <span className="truncate font-semibold">Semester 1 • Academic Year 2026 • Intake '22–'25 Lecture Series Active</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#566072] dark:text-[#9CA3AF] flex-shrink-0">
                        <a href="https://uom.lk/business" target="_blank" rel="noreferrer" className="text-[#C59B27] hover:underline inline-flex items-center gap-1 font-bold">
                            uom.lk/business <ArrowUpRight size={10} />
                        </a>
                    </div>
                </div>

                {/* 2. Main Institutional Navigation */}
                <div className="px-4 sm:px-8 lg:px-12 py-3.5 flex justify-between items-center max-w-[1400px] mx-auto" ref={navRef}>
                    
                    {/* Crest & Identity */}
                    <a href="/" className="flex items-center gap-3 group">
                        <img 
                            src="/images/logo.png" 
                            alt="University Seal" 
                            className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform flex-shrink-0" 
                        />
                        <div>
                            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#12161F] block leading-tight">
                                BFSU <span className="text-[#C59B27] font-mono text-xs sm:text-sm font-bold uppercase">UoM</span>
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#566072] dark:text-[#9CA3AF] font-bold block">
                                Faculty of Business
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-7">
                        <nav className="flex items-center gap-6 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#12161F] dark:text-[#E2E8F0]">
                            {menuStructure.map((menuItem) => {
                                const hasDropdown = Array.isArray(menuItem.items);
                                const isCurrentActive = activeDropdown === menuItem.key;

                                if (!hasDropdown) {
                                    return (
                                        <a 
                                            key={menuItem.key} 
                                            href={menuItem.href}
                                            className="hover:text-[#C59B27] dark:hover:text-[#C59B27] transition-colors py-2"
                                        >
                                            {menuItem.name}
                                        </a>
                                    );
                                }

                                return (
                                    <div 
                                        key={menuItem.key}
                                        className="relative"
                                        onMouseEnter={() => setActiveDropdown(menuItem.key)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <a
                                            href={menuItem.href}
                                            className="flex items-center gap-1 hover:text-[#C59B27] dark:hover:text-[#C59B27] transition-colors py-2"
                                        >
                                            <span>{menuItem.name}</span>
                                            <ChevronDown size={13} className="transition-transform duration-200" />
                                        </a>

                                        {/* Dropdown Panel */}
                                        {isCurrentActive && (
                                            <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                                <div className="bg-[var(--bg-surface)] border border-[var(--border)] shadow-xl p-2 divide-y divide-[#E5E2DA]/60 dark:divide-[#1E2534] rounded-sm">
                                                    {menuItem.items.map((sub, sIdx) => (
                                                        <a
                                                            key={sIdx}
                                                            href={sub.href}
                                                            className="block p-3 hover:bg-[var(--bg-page)] dark:hover:bg-white/5 transition-colors group"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            <div className="text-sm font-bold text-[#12161F] group-hover:text-[#C59B27] transition-colors">
                                                                {sub.title}
                                                            </div>
                                                            <div className="text-xs font-medium text-[#566072] dark:text-[#9CA3AF] mt-0.5 leading-snug">
                                                                {sub.desc}
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </nav>

                        <div className="h-4 w-[1px] bg-[#E5E2DA] dark:bg-[#1E2534]" />

                        {/* Search, Theme Toggle & Help Desk */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[#C59B27] text-[#566072] dark:text-[#9CA3AF] font-mono text-[11px] font-semibold transition-colors rounded-sm"
                                title="Press Cmd+K to search"
                            >
                                <Search size={13} className="text-[#C59B27]" />
                                <span className="hidden xl:inline">Search...</span>
                                <kbd className="text-[9px] bg-[var(--bg-page)] dark:bg-white/10 px-1 py-0.5 border border-[var(--border)] dark:border-white/10 rounded font-bold">⌘K</kbd>
                            </button>

                            {/* Restored Theme Switcher */}
                            <ThemeToggle />

                            {/* Authentication Status / Trigger */}
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-surface)] border border-[#C59B27]/40 hover:border-[#C59B27] shadow-sm rounded-sm transition-colors group"
                                        title="View & Edit Delegate Profile"
                                    >
                                        <UserAvatar 
                                            src={profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture} 
                                            name={profile?.full_name || user.user_metadata?.full_name || user.email}
                                            size="sm"
                                            role={profile?.role}
                                        />
                                        <div className="flex flex-col text-left">
                                            <span className="font-mono text-[11px] font-bold text-[var(--text-primary)] group-hover:text-[#C59B27] max-w-[130px] truncate leading-tight transition-colors">
                                                {profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]}
                                            </span>
                                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#C59B27] leading-none">
                                                {profile?.role || 'Member'}
                                            </span>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={signOut}
                                        title="Sign Out"
                                        className="p-1.5 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                                    >
                                        <LogOut size={15} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => openAuthModal('login')}
                                    className="bg-[#C59B27] hover:bg-[#8E6F18] text-black font-mono text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-2 transition-all shadow-sm rounded-sm flex-shrink-0"
                                >
                                    Portal Login
                                </button>
                            )}

                            <a 
                                href="https://forms.gle/uPNxwgi6P3wp8HAA8" 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-[#12161F] dark:bg-[var(--bg-surface)] text-white dark:text-[var(--text-primary)] hover:bg-[#C59B27] dark:hover:bg-[#C59B27] dark:hover:text-white px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-all shadow-sm rounded-sm flex-shrink-0"
                            >
                                Help Desk
                            </a>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 border border-[var(--border)] text-[#12161F]"
                            aria-label="Search"
                        >
                            <Search size={18} />
                        </button>
                        <ThemeToggle />
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 border border-[var(--border)] text-[#12161F]"
                            aria-label="Toggle navigation"
                        >
                            {isOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>

                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden border-t border-[var(--border)] px-5 py-4 bg-[var(--bg-surface)] max-h-[80vh] overflow-y-auto">
                        <nav className="flex flex-col divide-y divide-[#E5E2DA]/50 dark:divide-[#1E2534]">
                            {menuStructure.map((item) => {
                                const hasSub = Array.isArray(item.items);
                                const isMobileOpen = mobileExpandedSection === item.key;

                                if (!hasSub) {
                                    return (
                                        <a 
                                            key={item.key} 
                                            href={item.href} 
                                            className="py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#12161F] hover:text-[#C59B27]"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                    );
                                }

                                return (
                                    <div key={item.key} className="py-1">
                                        <div className="flex items-center justify-between py-2">
                                            <a 
                                                href={item.href}
                                                className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#12161F] hover:text-[#C59B27]"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </a>
                                            <button
                                                onClick={() => setMobileExpandedSection(isMobileOpen ? null : item.key)}
                                                className="p-1 text-[#566072] dark:text-[#9CA3AF]"
                                                aria-label="Toggle Section"
                                            >
                                                <ChevronDown size={16} className="transition-transform" />
                                            </button>
                                        </div>

                                        {isMobileOpen && (
                                            <div className="pl-3 pb-2 space-y-2 border-l-2 border-[#C59B27]/40 ml-1 mb-2">
                                                {item.items.map((sub, sIdx) => (
                                                    <a
                                                        key={sIdx}
                                                        href={sub.href}
                                                        className="block py-1 text-xs text-[#566072] dark:text-[#CBD5E1] hover:text-[#C59B27]"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <div className="font-semibold">{sub.title}</div>
                                                        <div className="text-[10px] text-[#8E9BB0] dark:text-[#64748B]">{sub.desc}</div>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="pt-4">
                                <a 
                                    href="https://forms.gle/uPNxwgi6P3wp8HAA8" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="block text-center py-2.5 bg-[#12161F] dark:bg-[var(--bg-surface)] text-white dark:text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-sm"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Help Desk & Ombudsman
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Search Palette Dialog */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};
