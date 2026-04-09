import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowRight } from 'lucide-react';
import { newsData } from '../data/newsData';

export const NewsSection = () => {
    // Show only the first 2 recent items in the preview
    const recentNews = newsData.slice(0, 2);

    return (
        <section className="py-24 relative overflow-hidden bg-bfsu-dark border-b border-bfsu-glass-border/50">
            <Container>
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Left: Description & Button */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <Typography variant="h2" className="text-white mb-6">
                            News & <span className="text-bfsu-gold">Announcements</span>
                        </Typography>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Stay completely up to date with the latest official announcements, academic schedules, and important faculty notices.
                        </p>
                        <Link to="/news" className="inline-flex items-center gap-2 px-8 py-3.5 bg-bfsu-gold text-bfsu-primary rounded-full font-bold uppercase tracking-wider text-sm hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)] transition-all">
                            See All News
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Right: Previews */}
                    <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentNews.map((newsItem) => {
                            const IconComponent = newsItem.icon;
                            return (
                                <Card key={newsItem.id} hover={true} className="bg-bfsu-glass backdrop-blur-md border-bfsu-glass-border group h-full">
                                    <CardContent className="p-8 flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-12 h-12 bg-bfsu-primary border border-bfsu-glass-border text-bfsu-gold rounded-xl flex items-center justify-center shadow-[0_5px_15px_rgba(212,175,55,0.2)]">
                                                <IconComponent size={22} />
                                            </div>
                                            <span className="text-[0.65rem] font-bold px-3 py-1 bg-white/5 rounded-full text-gray-400 uppercase tracking-wider border border-white/10 group-hover:border-bfsu-gold/40 group-hover:text-bfsu-gold transition-colors">
                                                {newsItem.label}
                                            </span>
                                        </div>
                                        <Typography variant="h4" className="text-white mb-3 !text-[1.1rem]">
                                            {newsItem.title}
                                        </Typography>
                                        <p className="text-gray-400 text-sm flex-grow mb-6 leading-relaxed">
                                            {newsItem.brief.substring(0, 110)}...
                                        </p>
                                        <div className="mt-auto pt-5 border-t border-white/5">
                                            <Link to={`/news/${newsItem.slug}`} className="text-bfsu-gold text-[0.75rem] font-bold uppercase tracking-wider hover:text-white transition-colors inline-block">
                                                Read Full Notice &rarr;
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
