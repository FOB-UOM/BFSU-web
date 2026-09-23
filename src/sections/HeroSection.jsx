import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles, HeartHandshake } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section id="home" className="relative w-full border-b border-[var(--border)] bg-transparent  backdrop-blur-[2px] transition-colors">
            
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12 pt-16 sm:pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Warm, Welcoming, Confident Collegiate Tone */}
                <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C59B27]/10 border border-[#C59B27]/30 text-[#C59B27] font-mono text-[11px] font-bold uppercase tracking-[0.22em] mb-6 rounded-full shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Faculty of Business • University of Moratuwa</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)]  leading-[1.08] mb-6">
                        Leadership, <br />
                        <span className="font-extrabold text-[#C59B27]">Scholarship</span> & Community.
                    </h1>

                    <p className="text-lg sm:text-xl text-[#2D3748] font-medium leading-relaxed max-w-xl mb-9 tracking-normal">
                        A vibrant student fellowship connecting undergraduates across Business Analytics, Industrial Management, and Technology with mentorship, campus life, and collective student welfare.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <a 
                            href="/explore"
                            className="bg-[#0F141E] dark:bg-[var(--bg-surface)] text-white dark:text-[var(--text-primary)] hover:bg-[#C59B27] dark:hover:bg-[#C59B27] dark:hover:text-white px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.22em] transition-all inline-flex items-center gap-2 shadow-sm rounded-sm"
                        >
                            <span>Explore Student Life</span>
                            <ArrowRight size={14} />
                        </a>
                        <a 
                            href="/links"
                            className="border-2 border-[#0F141E] dark:border-white/60 text-[var(--text-primary)]  hover:border-[#C59B27] hover:text-[#C59B27] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.22em] transition-all inline-flex items-center gap-2 rounded-sm"
                        >
                            <span>Student Portals</span>
                            <ArrowUpRight size={13} />
                        </a>
                    </div>
                </div>

                {/* Right Column: Clean Photographic Frame with Warm Human Badges */}
                <div className="lg:col-span-5">
                    <div className="border border-[var(--border)] bg-[var(--bg-surface)]  p-4 shadow-xl rounded-sm">
                        <div className="overflow-hidden aspect-[4/3] relative border border-[var(--border)] rounded-sm">
                            <img 
                                src="/images/faculty_official_real.jpg" 
                                alt="Faculty of Business Complex" 
                                className="w-full h-full object-cover filter contrast-[1.05]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C59B27] font-bold block mb-0.5">
                                        Faculty Complex & Campus Grounds
                                    </span>
                                    <span className="text-sm font-bold">University of Moratuwa</span>
                                </div>
                                <span className="font-mono text-[10px] font-bold bg-black/60 px-2.5 py-0.5 border border-white/20 rounded-full tracking-wider">Est. 2017</span>
                            </div>
                        </div>

                        {/* Quick Directory Ledger below image */}
                        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[var(--border)] font-mono text-[11px] font-bold">
                            <a href="/about#council" className="p-2.5 border border-[var(--border)] hover:border-[#C59B27] flex items-center justify-between transition-colors rounded-sm tracking-wider">
                                <span className="text-[#374151]">Council Roster</span>
                                <ArrowRight size={12} className="text-[#C59B27]" />
                            </a>
                            <a href="/news" className="p-2.5 border border-[var(--border)] hover:border-[#C59B27] flex items-center justify-between transition-colors rounded-sm tracking-wider">
                                <span className="text-[#374151]">Official Circulars</span>
                                <ArrowRight size={12} className="text-[#C59B27]" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};


