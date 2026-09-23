'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createClient } from '../lib/supabase/client';
import { CheckCircle2, Ticket, Loader2 } from 'lucide-react';

export const EventRsvpButton = ({ eventId, eventTitle }) => {
    const { user, openAuthModal } = useAuth();
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let mounted = true;
        const checkExistingRegistration = async () => {
            if (!user || !eventId) {
                setChecking(false);
                return;
            }

            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('event_registrations')
                    .select('id, status')
                    .eq('event_id', eventId)
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (mounted && !error && data) {
                    setIsRegistered(true);
                }
            } catch {
                // Ignore error if offline / unconfigured
            } finally {
                if (mounted) setChecking(false);
            }
        };

        checkExistingRegistration();
        return () => {
            mounted = false;
        };
    }, [user, eventId]);

    const handleRsvp = async () => {
        if (!user) {
            openAuthModal();
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('event_registrations')
                .insert([
                    {
                        event_id: eventId,
                        user_id: user.id,
                        status: 'confirmed',
                    },
                ]);

            if (error) {
                if (error.code === '23505') {
                    setIsRegistered(true);
                    setMessage('You are already registered for this assembly.');
                } else {
                    setMessage(error.message || 'Unable to complete RSVP.');
                }
            } else {
                setIsRegistered(true);
                setMessage('Registration confirmed! Check your profile for your delegate pass.');
            }
        } catch {
            setMessage('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 py-3">
                <Loader2 size={14} className="animate-spin text-bfsu-gold" />
                <span>Checking attendance status...</span>
            </div>
        );
    }

    if (isRegistered) {
        return (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                    <div>
                        <p className="text-sm font-bold font-display">Confirmed Delegate RSVP</p>
                        <p className="text-xs font-mono opacity-80">Your seat is reserved for {eventTitle}.</p>
                    </div>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/20 uppercase tracking-widest font-bold">
                    Attending
                </span>
            </div>
        );
    }

    return (
        <div className="p-5 rounded-2xl bg-bfsu-gold/10 border border-bfsu-gold/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <p className="text-sm font-bold font-display text-[var(--text-primary)]">
                    Delegate Attendance Registration
                </p>
                <p className="text-xs font-body text-gray-600 dark:text-gray-400">
                    Sign in to RSVP and register your seat for this academic assembly.
                </p>
                {message && (
                    <p className="text-xs font-mono mt-1 text-bfsu-gold">{message}</p>
                )}
            </div>
            <button
                onClick={handleRsvp}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#12161F] text-white dark:bg-bfsu-gold dark:text-[#12161F] font-bold text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-50"
            >
                {loading ? (
                    <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Registering...</span>
                    </>
                ) : (
                    <>
                        <Ticket size={14} />
                        <span>RSVP Now</span>
                    </>
                )}
            </button>
        </div>
    );
};
