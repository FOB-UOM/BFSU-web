import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Grid } from '../components/ui/Grid';
import { Card, CardContent } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { newsData } from '../data/newsData';
import { BookOpen } from 'lucide-react';

export const NewsPage = () => {
    return (
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden transition-colors duration-500">
            {/* Background Image with adaptive overlay */}
            <div className="absolute inset-0 bg-[url('/images/faculty_official_real.jpg')] bg-cover bg-fixed opacity-30 dark:opacity-20" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF9F6] via-[#FAF9F6]/95 to-[#FAF9F6] dark:from-[#0A0A0A] dark:via-[#0A0A0A]/95 dark:to-[#0A0A0A] transition-colors duration-500" />

            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-bfsu-gold/30 bg-bfsu-gold/10 text-bfsu-primary dark:text-bfsu-gold text-xs font-semibold uppercase tracking-wider mb-4">
                        <BookOpen size={13} />
                        Intuitui Editorial Desks
                    </div>
                    <Typography variant="h1" className="mb-4">
                        News & <span className="text-bfsu-gold">Announcements</span>
                    </Typography>
                    <Typography variant="p" className="text-gray-600 dark:text-gray-400 font-normal text-base max-w-xl mx-auto">
                        Official updates, circulars, and verified notices for students and faculty members.
                    </Typography>
                </div>

                <Grid cols={1} md={2} gap={8}>
                    {newsData.map((newsItem) => {
                        const IconComponent = newsItem.icon;
                        return (
                            <Card key={newsItem.id} hover={true} className="h-full group">
                                <CardContent className="flex flex-col p-8 sm:p-10 h-full relative overflow-hidden">
                                    <div className="w-13 h-13 p-3 bg-bfsu-gold/15 dark:bg-bfsu-primary border border-bfsu-gold/30 text-bfsu-primary dark:text-bfsu-gold rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                        <IconComponent size={26} />
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-bfsu-gold/20 text-bfsu-primary dark:text-bfsu-gold text-[0.7rem] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border border-bfsu-gold/30">
                                            {newsItem.label}
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">
                                            {newsItem.date}
                                        </span>
                                    </div>
                                    <Typography variant="h3" className="mb-4 !text-xl font-bold leading-snug">
                                        {newsItem.title}
                                    </Typography>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow leading-relaxed">
                                        {newsItem.brief}
                                    </p>
                                    <div className="mt-auto border-t border-black/5 dark:border-white/10 pt-4 flex items-center justify-between">
                                        <span className="text-xs text-gray-500 font-medium">{newsItem.author || 'BFSU Editorial'}</span>
                                        <Link to={`/news/${newsItem.slug}`} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-bfsu-gold hover:underline">
                                            Read Notice &rarr;
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
