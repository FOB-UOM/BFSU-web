'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createClient } from '../lib/supabase/client';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthModal = () => {
    const { authModalOpen, closeAuthModal, authMode, openAuthModal } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const supabase = createClient();

    if (!authModalOpen) return null;

    const handleOAuth = async (provider) => {
        setLoading(true);
        setErrorMsg('');
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err) {
            setErrorMsg(err.message || `Failed to initialize ${provider} sign-in.`);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            if (authMode === 'register') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            student_id: studentId,
                        },
                    },
                });
                if (error) throw error;

                if (data?.user && !data.session) {
                    setSuccessMsg('Account created! Please check your university inbox to verify your email.');
                } else {
                    closeAuthModal();
                }
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                
                // If account does not exist yet, auto-create it smoothly!
                if (signInError && signInError.message?.toLowerCase().includes('invalid login credentials')) {
                    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            data: {
                                full_name: email.split('@')[0],
                            },
                        },
                    });

                    if (signUpError) {
                        throw signInError;
                    }

                    if (signUpData?.user && !signUpData.session) {
                        setSuccessMsg('Account created! Please check your email to complete verification.');
                        setLoading(false);
                        return;
                    }

                    closeAuthModal();
                    return;
                }

                if (signInError) throw signInError;
                closeAuthModal();
            }
        } catch (err) {
            setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] max-w-md w-full p-6 sm:p-8 shadow-2xl relative rounded-sm">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-[var(--border)]">
                    <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-1">
                            BFSU Authentication Portal
                        </span>
                        <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                            {authMode === 'register' ? 'Create Student Account' : 'Sign In to Portal'}
                        </h3>
                    </div>
                    <button 
                        onClick={closeAuthModal}
                        className="p-1 text-[#566072] hover:text-[var(--text-primary)] font-mono text-base"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* OAuth Provider Buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        type="button"
                        onClick={() => handleOAuth('linkedin_oidc')}
                        disabled={loading}
                        className="w-full bg-[#0077B5] hover:bg-[#005E93] text-white px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm rounded-sm"
                    >
                        <span className="font-black text-sm bg-white text-[#0077B5] px-1 rounded-sm leading-none py-0.5">in</span>
                        <span>Continue with LinkedIn</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleOAuth('google')}
                        disabled={loading}
                        className="w-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm rounded-sm"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                        </svg>
                        <span>Continue with Google (UoM)</span>
                    </button>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                    <div className="border-t border-[var(--border)] w-full"></div>
                    <span className="bg-[var(--bg-surface)] px-3 text-[10px] font-mono uppercase text-[var(--text-faint)] tracking-wider">
                        Or with email
                    </span>
                </div>

                {/* Form Alerts */}
                {errorMsg && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-sm flex items-center gap-2">
                        <AlertCircle size={15} className="flex-shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}
                {successMsg && (
                    <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-sm flex items-center gap-2">
                        <CheckCircle2 size={15} className="flex-shrink-0" />
                        <span>{successMsg}</span>
                    </div>
                )}

                {/* Email / Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {authMode === 'register' && (
                        <>
                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="e.g. Yasitha Sandakalum"
                                        className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                                    Student ID / Index
                                </label>
                                <input
                                    type="text"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    placeholder="e.g. 224012A"
                                    className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@uom.lk"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={15} className="absolute left-3 top-3 text-[var(--text-faint)]" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-[var(--border)] focus:border-[#C59B27] outline-none rounded-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#C59B27] hover:bg-[#8E6F18] text-black font-mono text-xs font-bold uppercase tracking-widest py-3 mt-2 transition-all flex items-center justify-center gap-2 rounded-sm shadow-sm"
                    >
                        <span>{loading ? 'Authenticating...' : authMode === 'register' ? 'Register Account' : 'Sign In'}</span>
                        <ArrowRight size={14} />
                    </button>
                </form>

                {/* Footer toggle */}
                <div className="mt-6 pt-4 border-t border-[var(--border)] text-center text-xs font-medium text-[var(--text-muted)]">
                    {authMode === 'register' ? (
                        <p>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => openAuthModal('login')}
                                className="text-[#C59B27] font-bold hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    ) : (
                        <p>
                            New student or alumnus?{' '}
                            <button
                                type="button"
                                onClick={() => openAuthModal('register')}
                                className="text-[#C59B27] font-bold hover:underline"
                            >
                                Create an Account
                            </button>
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
};
