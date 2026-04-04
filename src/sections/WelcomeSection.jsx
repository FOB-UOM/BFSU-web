import React from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { siteData } from '../data';
import { Building2 } from 'lucide-react';

export const WelcomeSection = () => {
    return (
        <section className="py-20 bg-transparent relative">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 bg-bfsu-glass border border-bfsu-glass-border rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                        <Building2 size={32} className="text-bfsu-gold" />
                    </div>

                    <Typography variant="h2" className="mb-6 pb-6 relative inline-block text-white">
                        About Business Faculty
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-bfsu-gold rounded-full" />
                    </Typography>

                    <Typography variant="lead" className="text-gray-300 mt-6 !leading-relaxed !font-light">
                        {siteData.facultyBrief.description}
                    </Typography>
                </div>
            </Container>
        </section>
    );
};
