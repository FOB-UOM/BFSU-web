import React from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { newsData } from '../data/newsData';
import { ArrowRight } from 'lucide-react';

export const NewsPage = ({ items }) => {
    const newsList = items && items.length > 0 ? items : newsData;
    return (
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden transition-colors">
            <Container className="max-w-[1200px]">
                {/* Header */}
                <div className="max-w-2xl mb-14">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-3">
                        Faculty Dispatches
                    </span>
                    <Typography variant="h1" className="mb-4 !font-display !font-bold">
                        Notices & Circulars
                    </Typography>
                    <p className="font-body text-lg text-[#4A5364] leading-relaxed">
                        Official announcements, examination notifications, and student welfare advisories from the union secretariat.
                    </p>
                </div>

                {/* News Minimal Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {newsList.map((item) => (
                        <article 
                            key={item.id}
                            className="border-t-2 border-[#12161F] dark:border-white/40 pt-8 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between font-mono text-xs text-[#566072] dark:text-[#8E9BB0] mb-4">
                                    <span className="uppercase tracking-[0.2em] text-[#C59B27] font-bold">
                                        [{item.label}]
                                    </span>
                                    <time>{item.date}</time>
                                </div>

                                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]  leading-snug mb-4 hover:text-[#C59B27] transition-colors">
                                    <Link href={`/news/${item.slug}`}>
                                        {item.title}
                                    </Link>
                                </h3>
                                
                                <p className="font-body text-base text-[#4A5364] mb-6 leading-relaxed">
                                    {item.brief}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                                <span className="text-[#566072] dark:text-[#8E9BB0]">
                                    BFSU Secretariat
                                </span>
                                <Link 
                                    href={`/news/${item.slug}`} 
                                    className="font-bold uppercase tracking-[0.16em] text-[var(--text-primary)]  hover:text-[#C59B27] inline-flex items-center gap-1"
                                >
                                    <span>Read Circular</span>
                                    <ArrowRight size={13} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </main>
    );
};

