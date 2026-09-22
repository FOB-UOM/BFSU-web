import React from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { siteData } from '../data';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden transition-colors duration-500">
            {/* Background Image with adaptive opacity */}
            <div className="absolute inset-0 bg-[url('/images/new_hero.jpg')] bg-cover bg-center bg-fixed opacity-40 dark:opacity-30 dark:brightness-[1.1] transition-opacity" />

            {/* Gradient Overlays for light and dark modes */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF9F6]/80 to-[#FAF9F6] dark:via-[#0A0A0A]/85 dark:to-[#0A0A0A] transition-colors duration-500" />

            <Container className="relative z-20 w-full flex justify-center text-center">
                <div className="max-w-[850px] animate-in slide-in-from-bottom-5 duration-700 fade-in zoom-in-95">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-bfsu-gold/30 bg-bfsu-gold/10 text-bfsu-primary dark:text-bfsu-gold text-xs font-semibold uppercase tracking-widest mb-6">
                        <Sparkles size={14} className="text-bfsu-gold" />
                        Faculty of Business • University of Moratuwa
                    </div>

                    <h1 className="text-[clamp(2.75rem,8vw,4.75rem)] font-bold leading-[1.12] mb-6 tracking-tight text-gray-900 dark:text-white">
                        Business Faculty <br />
                        <span className="bg-gradient-to-r from-bfsu-gold via-[#E5C158] to-bfsu-accent bg-clip-text text-transparent">
                            Students' Union
                        </span>
                    </h1>

                    <p className="text-[1.15rem] text-gray-600 dark:text-gray-300 font-normal mb-10 max-w-2xl mx-auto leading-relaxed">
                        {siteData.hero.subHeadline}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/news"
                            className="bg-bfsu-gold hover:bg-bfsu-accent text-bfsu-primary px-9 py-3.5 rounded-full font-bold shadow-[0_8px_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-2 group tracking-wider uppercase text-xs sm:text-sm"
                        >
                            Explore Notices
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/events"
                            className="px-9 py-3.5 rounded-full font-bold text-gray-800 dark:text-white border border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-all backdrop-blur-md uppercase text-xs sm:text-sm tracking-wider"
                        >
                            Upcoming Events
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
};
