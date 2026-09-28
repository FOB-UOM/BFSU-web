import React from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { ArrowRight, Bell } from 'lucide-react';
import { UserAvatar } from '../components/UserAvatar';

export const NewsPage = ({ items = [] }) => {
    const newsList = Array.isArray(items) ? items : [];

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
                    <p className="font-body text-lg text-[var(--text-secondary)] leading-relaxed">
                        Official announcements, examination notifications, and student welfare advisories from the union secretariat.
                    </p>
                </div>

                {newsList.length === 0 ? (
                    <div className="p-16 text-center border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm">
                        <Bell size={32} className="mx-auto text-[#C59B27] mb-3 opacity-60" />
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Active Notices</h3>
                        <p className="text-sm text-[var(--text-secondary)]">There are no published circulars or notices for this term.</p>
                    </div>
                ) : (
                    /* News Minimal Columns */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {newsList.map((item) => (
                            <article 
                                key={item.id}
                                className="border-t-2 border-[#12161F] dark:border-[var(--border-strong)] pt-8 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between font-mono text-xs text-[#566072] dark:text-[#8E9BB0] mb-4">
                                        <span className="uppercase tracking-[0.2em] text-[#C59B27] font-bold">
                                            [{item.label || 'Notice'}]
                                        </span>
                                        <time>{item.date}</time>
                                    </div>

                                    <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] leading-snug mb-4 hover:text-[#C59B27] transition-colors">
                                        <Link href={`/news/${item.slug || item.id}`}>
                                            {item.title}
                                        </Link>
                                    </h3>
                                    
                                    <p className="font-body text-base text-[var(--text-secondary)] mb-6 leading-relaxed">
                                        {item.brief}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                                    <div className="flex items-center gap-2 text-[#566072] dark:text-[#8E9BB0]">
                                        <UserAvatar 
                                            name={item.author || "BFSU Secretariat"} 
                                            size="xs" 
                                            peekable={Boolean(item.authorUsername)}
                                            username={item.authorUsername}
                                            profileData={item.authorUsername ? {
                                                full_name: item.author,
                                                username: item.authorUsername,
                                                role_title: item.authorRole || 'Author'
                                            } : undefined}
                                        />
                                        <span className="font-semibold text-[var(--text-primary)]">{item.author || "BFSU Secretariat"}</span>
                                        {item.cohortCode && (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C59B27]/10 text-[#C59B27] font-bold">
                                                [{item.cohortCode}]
                                            </span>
                                        )}
                                    </div>
                                    <Link 
                                        href={`/news/${item.slug || item.id}`} 
                                        className="font-bold uppercase tracking-[0.16em] text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-1"
                                    >
                                        <span>Read Circular</span>
                                        <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </Container>
        </main>
    );
};
