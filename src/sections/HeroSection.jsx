import React from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { siteData } from '../data';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-bfsu-dark">
            {/* Brightened Background Image */}
            <div className="absolute inset-0 bg-[url('/images/new_hero.jpg')] bg-cover bg-center bg-fixed brightness-[1.15]" />

            {/* Lighter Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]" />

            <Container className="relative z-20 w-full flex justify-center">
                <div className="max-w-[800px] animate-in slide-in-from-bottom-5 duration-700 fade-in zoom-in-95">
                    <h1 className="text-[clamp(3rem,10vw,5rem)] font-bold leading-[1.1] mb-6 bg-gradient-to-r from-white to-bfsu-gold bg-clip-text text-transparent">
                        Business Faculty <br />
                        <span className="text-bfsu-gold">Students' Union</span>
                    </h1>

                    <p className="text-[1.2rem] text-gray-300 font-light mb-10 max-w-2xl mx-auto">
                        {siteData.hero.subHeadline}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/news"
                            className="bg-bfsu-gold text-bfsu-primary px-10 py-4 rounded-full font-bold shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:-translate-y-[3px] transition-all hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] flex items-center gap-2 group tracking-wide uppercase text-sm"
                        >
                            News
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/events"
                            className="px-10 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 transition-all backdrop-blur-md uppercase text-sm tracking-wide"
                        >
                            Upcoming Events
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
};
