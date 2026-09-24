'use client';

import React, { createContext, useContext, useState } from 'react';
import { ProfilePeekModal } from '../components/ProfilePeekModal';

const ProfilePeekContext = createContext(null);

export const ProfilePeekProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [targetProfile, setTargetProfile] = useState(null);
    const [targetUsername, setTargetUsername] = useState('');

    const openPeek = (profileOrUsername) => {
        if (!profileOrUsername) return;

        if (typeof profileOrUsername === 'string') {
            setTargetUsername(profileOrUsername);
            setTargetProfile(null);
        } else if (typeof profileOrUsername === 'object') {
            setTargetProfile(profileOrUsername);
            setTargetUsername(profileOrUsername.username || '');
        }
        setIsOpen(true);
    };

    const closePeek = () => {
        setIsOpen(false);
        setTargetProfile(null);
        setTargetUsername('');
    };

    return (
        <ProfilePeekContext.Provider value={{ openPeek, closePeek }}>
            {children}
            <ProfilePeekModal 
                isOpen={isOpen}
                onClose={closePeek}
                profileData={targetProfile}
                username={targetUsername}
            />
        </ProfilePeekContext.Provider>
    );
};

export const useProfilePeek = () => {
    const context = useContext(ProfilePeekContext);
    if (!context) {
        return {
            openPeek: () => {},
            closePeek: () => {}
        };
    }
    return context;
};
