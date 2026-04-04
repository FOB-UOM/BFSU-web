import React from 'react';
import { Container } from './ui/Container';
import { Grid } from './ui/Grid';
import { Typography } from './ui/Typography';
import { siteData } from '../data';
import { Globe, Briefcase, ArrowRight } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="pt-20 pb-10 bg-[rgba(212,175,55,0.02)] border-t border-bfsu-glass-border">
            <Container>
                <Grid cols={1} md={2} lg={4} gap={12} className="mb-16">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-bfsu-primary border border-bfsu-glass-border rounded-full flex items-center justify-center">
                                <span className="text-bfsu-gold font-bold text-2xl drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">BF</span>
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="h6" className="text-white !font-bold leading-tight">Business Faculty</Typography>
                                <span className="text-sm text-bfsu-gold font-medium">Students' Union</span>
                            </div>
                        </div>
                        <Typography variant="small" className="text-gray-400 mb-6 !leading-relaxed">
                            Empowering the next generation of business leaders through innovation, leadership, and community development at the University of Moratuwa.
                        </Typography>
                    </div>

                    <div>
                        <Typography variant="h5" className="text-white mb-6">Resources</Typography>
                        <ul className="space-y-4">
                            {siteData.links.resources.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.url} className="text-gray-400 hover:text-bfsu-gold transition-colors flex items-center gap-2 text-sm group">
                                        <ArrowRight size={14} className="text-bfsu-gold transform group-hover:translate-x-1 transition-transform" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <Typography variant="h5" className="text-white mb-6">Quick Links</Typography>
                        <ul className="space-y-4">
                            {['Home', 'About Faculty', 'Our Events', 'Contact Us'].map((link, idx) => (
                                <li key={idx}>
                                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <Typography variant="h5" className="text-white mb-6">Connect With Us</Typography>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
                            <Typography variant="small" className="text-gray-300 mb-4 block">Follow our updates on Facebook</Typography>
                            <div className="space-y-3">
                                {siteData.links.social.map((social, idx) => (
                                    <a key={idx} href={social.url} className="flex items-center gap-3 group">
                                        <div className="bg-bfsu-gold/20 p-2 rounded-lg group-hover:bg-bfsu-gold transition-colors">
                                            <Globe size={18} className="text-bfsu-gold group-hover:text-bfsu-primary transition-colors" />
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </Grid>

                <div className="border-t border-bfsu-glass-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <Typography variant="small" className="text-gray-400 opacity-60">
                        &copy; {new Date().getFullYear()} BFSU University of Moratuwa. All rights reserved.
                    </Typography>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-bfsu-gold text-white hover:text-bfsu-primary transition-all">
                            <Globe size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-bfsu-gold text-white hover:text-bfsu-primary transition-all">
                            <Briefcase size={20} />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
