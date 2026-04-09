import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Grid } from '../components/ui/Grid';
import { Card, CardContent } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { newsData } from '../data/newsData';

export const NewsPage = () => {
    return (
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden bg-[url('/images/faculty_official_real.jpg')] bg-cover bg-fixed">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <Typography variant="h1" className="text-white mb-6">News & <span className="text-bfsu-gold">Announcements</span></Typography>
                    <Typography variant="p" className="text-gray-400 font-light text-lg">Official updates, general notices, and important faculty announcements.</Typography>
                </div>

                <Grid cols={1} md={2} gap={8}>
                    {newsData.map((newsItem) => {
                        const IconComponent = newsItem.icon;
                        return (
                            <Card key={newsItem.id} hover={true} className="h-full bg-bfsu-glass backdrop-blur-xl border-bfsu-glass-border">
                                <CardContent className="flex flex-col p-10 h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-125" />

                                    <div className="w-14 h-14 bg-bfsu-gold text-bfsu-primary rounded-xl flex items-center justify-center mb-8 shadow-[0_5px_15px_rgba(212,175,55,0.4)] relative z-10">
                                        <IconComponent size={28} />
                                    </div>
                                    <div className="flex items-center gap-3 mb-3 relative z-10">
                                        <span className="bg-bfsu-gold/20 text-bfsu-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{newsItem.label}</span>
                                    </div>
                                    <Typography variant="h3" className="mb-4 text-white relative z-10">
                                        {newsItem.title}
                                    </Typography>
                                    <Typography variant="p" className="text-gray-300 mb-6 flex-grow leading-relaxed relative z-10">
                                        {newsItem.brief}
                                    </Typography>
                                    <div className="mt-auto border-t border-white/5 pt-5 relative z-10">
                                        <Link to={`/news/${newsItem.slug}`} className="inline-block text-sm font-bold uppercase tracking-wider text-bfsu-gold hover:text-white transition-colors">
                                            Read Full Notice &rarr;
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Grid>
            </Container>
        </main>
    );
};
