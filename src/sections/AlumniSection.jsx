import React from 'react';
import { ArrowRight, GraduationCap, Briefcase, Users } from 'lucide-react';

export const AlumniSection = () => {
    return (
        <section id="alumni" className="border-b border-[var(--border)] bg-transparent  py-16 sm:py-20 transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Intro */}
                    <div className="lg:col-span-5">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-3">
                            Graduate Network
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]  leading-tight mb-4">
                            Faculty Alumni Fellowship
                        </h2>
                        <p className="text-base sm:text-lg text-[#2D3748] leading-relaxed mb-6 font-medium">
                            Connecting graduates across global analytics, financial services, and management practices with current undergraduates.
                        </p>
                        <a 
                            href="/alumni"
                            className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-primary)]  hover:text-[#C59B27] inline-flex items-center gap-2 border-b-2 border-[#0F141E] dark:border-white pb-1 transition-colors"
                        >
                            <span>Explore Alumni Portal</span>
                            <ArrowRight size={14} />
                        </a>
                    </div>

                    {/* Right 3 Generous Air Pillars (Diagnosed Image 1) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="border-t-2 border-[#0F141E] dark:border-white/60 pt-6">
                            <div className="p-2 w-fit bg-[#C59B27]/10 rounded-sm mb-4">
                                <GraduationCap size={22} className="text-[#C59B27]" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)]  mb-3 tracking-tight">
                                Mentorship
                            </h3>
                            <p className="text-sm font-medium text-[#1A202C] leading-relaxed">
                                1-on-1 industry guidance for final-year undergraduates transitioning into professional enterprise.
                            </p>
                        </div>

                        <div className="border-t-2 border-[#0F141E] dark:border-white/60 pt-6">
                            <div className="p-2 w-fit bg-[#C59B27]/10 rounded-sm mb-4">
                                <Briefcase size={22} className="text-[#C59B27]" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)]  mb-3 tracking-tight">
                                Placements
                            </h3>
                            <p className="text-sm font-medium text-[#1A202C] leading-relaxed">
                                Direct career pathways and internship pipelines shared by alumni employers.
                            </p>
                        </div>

                        <div className="border-t-2 border-[#0F141E] dark:border-white/60 pt-6">
                            <div className="p-2 w-fit bg-[#C59B27]/10 rounded-sm mb-4">
                                <Users size={22} className="text-[#C59B27]" />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)]  mb-3 tracking-tight">
                                Community
                            </h3>
                            <p className="text-sm font-medium text-[#1A202C] leading-relaxed">
                                Annual reunions, guest lecture series, and corporate case study workshops.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};


