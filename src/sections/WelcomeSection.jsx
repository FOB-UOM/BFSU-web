import React from 'react';

export const WelcomeSection = ({ announcement }) => {
    const briefText = announcement?.faculty_brief || 
        "The Faculty of Business, University of Moratuwa is a dynamic academic community dedicated to shaping the next generation of business leaders and innovators. Established in 2017 under the prestigious University of Moratuwa, the faculty focuses on integrating modern technology with management education to meet the evolving needs of the global business environment.";

    return (
        <section className="border-b border-[var(--border)] bg-transparent py-20 sm:py-24 transition-colors">
            <div className="max-w-[1000px] mx-auto px-6 sm:px-12 text-center">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C59B27] block mb-4">
                    Collegiate Mission
                </span>

                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] mb-8">
                    Analytical Rigor, Ethical Enterprise & Public Good.
                </h2>

                <div className="w-12 h-[2px] bg-[#C59B27] mx-auto mb-8" />

                <p className="font-body text-lg sm:text-xl text-[var(--text-secondary)] font-medium leading-relaxed italic max-w-3xl mx-auto">
                    "{briefText}"
                </p>
            </div>
        </section>
    );
};
