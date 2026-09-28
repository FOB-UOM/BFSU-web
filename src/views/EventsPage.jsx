import React from 'react';
import Link from 'next/link';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { MapPin, ArrowRight, Calendar } from 'lucide-react';

export const EventsPage = ({ items = [] }) => {
    const eventsList = Array.isArray(items) ? items : [];

    return (
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden transition-colors">
            <Container className="max-w-[1200px]">
                {/* Header */}
                <div className="max-w-2xl mb-14">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#C59B27] block mb-3">
                        Campus Gatherings
                    </span>
                    <Typography variant="h1" className="mb-4 !font-display !font-bold">
                        Events & Assemblies
                    </Typography>
                    <p className="font-body text-lg text-[var(--text-secondary)] leading-relaxed">
                        Academic symposiums, student celebrations, and community traditions organized by the Business Faculty Students' Union.
                    </p>
                </div>

                {eventsList.length === 0 ? (
                    <div className="p-16 text-center border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm">
                        <Calendar size={32} className="mx-auto text-[#C59B27] mb-3 opacity-60" />
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No Scheduled Events</h3>
                        <p className="text-sm text-[var(--text-secondary)]">There are no upcoming assemblies or traditions scheduled at this time.</p>
                    </div>
                ) : (
                    /* Events Minimal Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {eventsList.map((event) => (
                            <article 
                                key={event.id || event.slug}
                                className="border-t-2 border-[#12161F] dark:border-[var(--border-strong)] pt-8 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between font-mono text-xs text-[#566072] dark:text-[#8E9BB0] mb-4">
                                        <span className="uppercase tracking-[0.2em] text-[#C59B27] font-bold">
                                            [{event.label || 'Tradition'}]
                                        </span>
                                        <span>{event.date}</span>
                                    </div>

                                    <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] leading-snug mb-4 hover:text-[#C59B27] transition-colors">
                                        <Link href={`/events/${event.slug || event.id}`}>
                                            {event.title}
                                        </Link>
                                    </h3>
                                    
                                    <p className="font-body text-base text-[var(--text-secondary)] mb-6 leading-relaxed">
                                        {event.brief}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                                    <span className="inline-flex items-center gap-1.5 text-[#566072] dark:text-[#8E9BB0]">
                                        <MapPin size={13} className="text-[#C59B27]" />
                                        <span>{event.location}</span>
                                    </span>
                                    <Link 
                                        href={`/events/${event.slug || event.id}`} 
                                        className="font-bold uppercase tracking-[0.16em] text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-1"
                                    >
                                        <span>View Event</span>
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
