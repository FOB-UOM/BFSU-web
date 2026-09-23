import React from 'react';
import { siteData } from '../data';

export const WelcomeSection = () => {
    return (
        <section className="border-b border-[var(--border)] bg-transparent  py-20 sm:py-24 transition-colors">
            <div className="max-w-[1000px] mx-auto px-6 sm:px-12 text-center">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-4">
                    Collegiate Mission
                </span>

                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]  leading-[1.12] mb-8">
                    Analytical Rigor, Ethical Enterprise & Public Good.
                </h2>

                <div className="w-12 h-[2px] bg-[#C59B27] mx-auto mb-8" />

                <p className="font-body text-lg sm:text-xl text-[#333C4D] font-medium leading-relaxed italic max-w-3xl mx-auto">
                    "{siteData.facultyBrief.description}"
                </p>
            </div>
        </section>
    );
};


