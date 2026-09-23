import React from 'react';
import { ArrowRight } from 'lucide-react';
import { siteData } from '../data';

export const AboutSection = () => {
    return (
        <section id="about" className="border-b border-[var(--border)] bg-transparent  py-28 sm:py-36 transition-colors">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-5">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#C59B27] block mb-4">
                        Student Governance
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--text-primary)]  leading-[1.08]">
                        The Students' Union Council
                    </h2>
                </div>
                <div className="lg:col-span-7 border-l-0 lg:border-l border-[var(--border)] pl-0 lg:pl-16">
                    <p className="font-body text-xl sm:text-2xl text-[#4A5364] leading-relaxed mb-10">
                        {siteData.about.union.description}
                    </p>
                    <a 
                        href="/about"
                        className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-primary)]  hover:text-[#C59B27] inline-flex items-center gap-3 border-b-2 border-[#12161F] pb-1.5 transition-colors"
                    >
                        <span>View Council Directorate Roster</span>
                        <ArrowRight size={15} />
                    </a>
                </div>
            </div>
        </section>
    );
};



