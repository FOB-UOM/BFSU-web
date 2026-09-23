'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

const AuthContext = createContext({
    user: null,
    profile: null,
    loading: true,
    authModalOpen: false,
    authMode: 'login', // 'login' | 'register'
    openAuthModal: () => {},
    closeAuthModal: () => {},
    signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');

    const supabase = createClient();

    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (!error && data) {
                setProfile(data);
                return data;
            }
        } catch {
            // Profile fallback
        }
        return null;
    };

    const updateProfile = async (updates) => {
        if (!user) return { error: new Error('User not authenticated') };

        try {
            const { data, error } = await supabase
                .from('profiles')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id)
                .select()
                .single();

            if (!error && data) {
                setProfile(data);
            }
            return { data, error };
        } catch (err) {
            return { error: err };
        }
    };

    const refreshProfile = async () => {
        if (user) {
            return await fetchProfile(user.id);
        }
    };

    useEffect(() => {
        const getInitialSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
                if (session?.user) {
                    await fetchProfile(session.user.id);
                }
            } catch {
                // Session error
            } finally {
                setLoading(false);
            }
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const openAuthModal = (mode = 'login') => {
        setAuthMode(mode);
        setAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setAuthModalOpen(false);
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                authModalOpen,
                authMode,
                openAuthModal,
                closeAuthModal,
                updateProfile,
                refreshProfile,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
