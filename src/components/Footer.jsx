import React from 'react';
import { Container } from './ui/Container';
import { Grid } from './ui/Grid';
import { Typography } from './ui/Typography';
import { siteData } from '../data';
import { Globe, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="pt-16 pb-12 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 transition-colors">
            <Container>
                <Grid cols={1} md={2} lg={4} gap={10} className="mb-14">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-bfsu-gold/20 dark:bg-bfsu-primary border border-bfsu-gold/30 rounded-full flex items-center justify-center">
                                <span className="text-bfsu-gold font-bold text-xl">BF</span>
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="h6" className="!font-bold leading-tight">Business Faculty</Typography>
                                <span className="text-xs text-bfsu-gold font-semibold tracking-wider uppercase">Students' Union</span>
                            </div>
                        </div>
                        <Typography variant="small" className="text-gray-600 dark:text-gray-400 mb-5 !leading-relaxed">
                            Empowering the next generation of business leaders through innovation, leadership, and community development at the University of Moratuwa.
                        </Typography>
                        <div className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 border border-black/10 dark:border-white/10 rounded-md px-2.5 py-1">
                            <ShieldCheck size={13} className="text-bfsu-gold" />
                            A11y Verified • Intuitui Standards
                        </div>
                    </div>

                    <div>
                        <Typography variant="h5" className="mb-5 !text-base font-bold">Resources</Typography>
                        <ul className="space-y-3">
                            {siteData.links.resources.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.url} className="text-gray-600 dark:text-gray-400 hover:text-bfsu-gold dark:hover:text-bfsu-gold transition-colors flex items-center gap-2 text-sm group">
                                        <ArrowRight size={13} className="text-bfsu-gold transform group-hover:translate-x-1 transition-transform" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <Typography variant="h5" className="mb-5 !text-base font-bold">Quick Navigation</Typography>
                        <ul className="space-y-3">
                            {['Home', 'About', 'News', 'Events'].map((link, idx) => (
                                <li key={idx}>
                                    <a href={`/${link === 'Home' ? '' : link.toLowerCase()}`} className="text-gray-600 dark:text-gray-400 hover:text-bfsu-gold transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <Typography variant="h5" className="mb-5 !text-base font-bold">Connect With Us</Typography>
                        <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 mb-4">
                            <Typography variant="small" className="text-gray-600 dark:text-gray-300 mb-3 block text-xs">Follow official union updates</Typography>
                            <div className="space-y-2.5">
                                {siteData.links.social.map((social, idx) => (
                                    <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                                        <div className="bg-bfsu-gold/20 p-1.5 rounded-lg group-hover:bg-bfsu-gold transition-colors">
                                            <Globe size={16} className="text-bfsu-gold group-hover:text-bfsu-primary transition-colors" />
                                        </div>
                                        <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-bfsu-gold transition-colors">
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </Grid>

                <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <Typography variant="small" className="text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} Business Faculty Students' Union, University of Moratuwa.
                    </Typography>
                    <div className="flex gap-3">
                        <a href="https://uom.lk/business" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-bfsu-gold text-gray-600 dark:text-gray-300 hover:text-bfsu-primary transition-all">
                            <Globe size={15} />
                        </a>
                        <a href="https://uom.lk" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-bfsu-gold text-gray-600 dark:text-gray-300 hover:text-bfsu-primary transition-all">
                            <Briefcase size={15} />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
