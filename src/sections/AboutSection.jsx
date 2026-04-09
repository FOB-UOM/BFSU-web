import React from 'react';
import { Container } from '../components/ui/Container';
import { Grid } from '../components/ui/Grid';
import { Typography } from '../components/ui/Typography';
import { siteData } from '../data';
import { Users, GraduationCap } from 'lucide-react';

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 bg-transparent relative">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* The Union Block */}
                    <div className="bg-bfsu-glass p-10 rounded-3xl border border-bfsu-glass-border hover:bg-white/[0.08] hover:border-bfsu-gold transition-all relative overflow-hidden group text-center flex flex-col items-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-bfsu-gold/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                        <div className="w-14 h-14 bg-bfsu-primary border border-bfsu-glass-border text-bfsu-gold rounded-xl flex items-center justify-center mb-8 shadow-[0_5px_15px_rgba(212,175,55,0.2)]">
                            <Users size={28} />
                        </div>
                        <Typography variant="h3" className="mb-4 text-bfsu-gold">
                            {siteData.about.union.title}
                        </Typography>
                        <Typography variant="p" className="text-gray-300">
                            {siteData.about.union.description}
                        </Typography>
                        <br />
                        <a href="/about" className="inline-block mt-4 text-sm font-bold uppercase tracking-wider text-bfsu-gold hover:text-white transition-colors">
                            Meet the Team &rarr;
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
};
