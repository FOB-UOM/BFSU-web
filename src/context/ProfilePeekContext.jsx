'use client';

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { ProfileHoverCard } from '../components/ProfileHoverCard';
import { InPageFullProfile } from '../components/InPageFullProfile';

const ProfilePeekContext = createContext(null);

export const ProfilePeekProvider = ({ children }) => {
    // 1. Lightweight Hover Popover State
    const [hoverState, setHoverState] = useState({
        isOpen: false,
        target: null,
        rect: null
    });
    const hoverTimeoutRef = useRef(null);
    const leaveTimeoutRef = useRef(null);

    // 2. Full In-Page Profile State
    const [fullProfileState, setFullProfileState] = useState({
        isOpen: false,
        target: null,
        username: ''
    });

    // Hover Peek management
    const showHoverPeek = useCallback((target, rect) => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }

        hoverTimeoutRef.current = setTimeout(() => {
            // Don't pop hover if full profile is already open
            if (!fullProfileState.isOpen) {
                setHoverState({
                    isOpen: true,
                    target,
                    rect
                });
            }
        }, 160);
    }, [fullProfileState.isOpen]);

    const hideHoverPeek = useCallback((immediate = false) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }

        if (immediate) {
            setHoverState(prev => ({ ...prev, isOpen: false }));
        } else {
            leaveTimeoutRef.current = setTimeout(() => {
                setHoverState(prev => ({ ...prev, isOpen: false }));
            }, 200);
        }
    }, []);

    const handleHoverCardEnter = useCallback(() => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }
    }, []);

    const handleHoverCardLeave = useCallback(() => {
        hideHoverPeek(false);
    }, [hideHoverPeek]);

    // Full In-Page Profile management
    const openFullProfile = useCallback((profileOrUsername) => {
        // Immediately dismiss any hover card
        hideHoverPeek(true);

        if (!profileOrUsername) return;

        if (typeof profileOrUsername === 'string') {
            setFullProfileState({
                isOpen: true,
                target: null,
                username: profileOrUsername
            });
        } else if (typeof profileOrUsername === 'object') {
            setFullProfileState({
                isOpen: true,
                target: profileOrUsername,
                username: profileOrUsername.username || profileOrUsername.id || ''
            });
        }
    }, [hideHoverPeek]);

    const closeFullProfile = useCallback(() => {
        setFullProfileState({
            isOpen: false,
            target: null,
            username: ''
        });
    }, []);

    return (
        <ProfilePeekContext.Provider value={{ 
            showHoverPeek, 
            hideHoverPeek,
            openFullProfile, 
            closeFullProfile,
            // Backwards compatibility aliases
            openPeek: openFullProfile,
            closePeek: closeFullProfile
        }}>
            {children}

            {/* Tier 1: Lightweight Floating Hover Popover */}
            <ProfileHoverCard
                isVisible={hoverState.isOpen && !fullProfileState.isOpen}
                target={hoverState.target}
                rect={hoverState.rect}
                onMouseEnter={handleHoverCardEnter}
                onMouseLeave={handleHoverCardLeave}
                onOpenFullProfile={openFullProfile}
            />

            {/* Tier 2: In-Page Full Public Profile with Safe Back Navigation */}
            <InPageFullProfile
                isOpen={fullProfileState.isOpen}
                onClose={closeFullProfile}
                targetProfile={fullProfileState.target}
                targetUsername={fullProfileState.username}
            />
        </ProfilePeekContext.Provider>
    );
};

export const useProfilePeek = () => {
    const context = useContext(ProfilePeekContext);
    if (!context) {
        return {
            showHoverPeek: () => {},
            hideHoverPeek: () => {},
            openFullProfile: () => {},
            closeFullProfile: () => {},
            openPeek: () => {},
            closePeek: () => {}
        };
    }
    return context;
};
