import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowRight, Newspaper } from 'lucide-react';
import { newsData } from '../data/newsData';

export const NewsSection = () => {
    // Show first 2 recent news
    const recentNews = newsData.slice(0, 2);

    return (
        <section className="py-20 relative overflow-hidden bg-transparent border-b border-black/5 dark:border-white/5 transition-colors">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Left: Description & Button */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-bfsu-gold/30 bg-bfsu-gold/10 text-bfsu-primary dark:text-bfsu-gold text-xs font-semibold uppercase tracking-wider mb-4">
                            <Newspaper size={13} />
                            Editorial Bulletin
                        </div>
                        <Typography variant="h2" className="mb-4">
                            News & <span className="text-bfsu-gold">Announcements</span>
                        </Typography>
                        <p className="text-gray-600 dark:text-gray-300 text-base mb-8 leading-relaxed">
                            Stay up to date with official announcements, academic schedules, and important faculty notices validated under institutional editorial standards.
                        </p>
                        <Link to="/news" className="inline-flex items-center gap-2 px-7 py-3 bg-bfsu-gold hover:bg-bfsu-accent text-bfsu-primary rounded-full font-bold uppercase tracking-wider text-xs shadow-md hover:-translate-y-0.5 transition-all">
                            See All Notices
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    {/* Right: Previews */}
                    <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentNews.map((newsItem) => {
                            const IconComponent = newsItem.icon;
                            return (
                                <Card key={newsItem.id} hover={true} className="group h-full">
                                    <CardContent className="p-7 flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="w-11 h-11 bg-bfsu-gold/15 dark:bg-bfsu-primary border border-bfsu-gold/30 text-bfsu-primary dark:text-bfsu-gold rounded-xl flex items-center justify-center shadow-sm">
                                                <IconComponent size={20} />
                                            </div>
                                            <span className="text-[0.68rem] font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300 uppercase tracking-wider border border-black/10 dark:border-white/10 group-hover:border-bfsu-gold/50 group-hover:text-bfsu-gold transition-colors">
                                                {newsItem.label}
                                            </span>
                                        </div>
                                        <Typography variant="h4" className="mb-3 !text-lg leading-snug">
                                            {newsItem.title}
                                        </Typography>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow mb-6 leading-relaxed">
                                            {newsItem.brief.substring(0, 115)}...
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{newsItem.date}</span>
                                            <Link to={`/news/${newsItem.slug}`} className="text-bfsu-gold hover:text-bfsu-primary dark:hover:text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1">
                                                Read Notice &rarr;
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                </div>
            </Container>
        </section>
    );
};
