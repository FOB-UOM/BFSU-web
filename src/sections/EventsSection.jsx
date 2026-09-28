import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

export const EventsSection = ({ events = [] }) => {
    const items = Array.isArray(events) ? events : [];
    const featuredEvents = items.slice(0, 3).map((e, idx) => ({
        ...e,
        image: e.image || (idx === 0 ? "/images/colours-2025-1.jpg" : idx === 1 ? "/images/colours-2025-2.jpg" : "/images/hanthana-trip.jpg"),
        aspect: "aspect-[16/10]"
    }));

    return (
        <section id="events" className="bg-transparent py-16 sm:py-24 transition-colors border-t border-[var(--border)]">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[var(--border)] gap-4">
                    <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C59B27] block mb-2">
                            Visual Dispatches & Assemblies
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                            Collegiate Life & Traditions
                        </h2>
                    </div>
                    <Link 
                        href="/events"
                        className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-primary)] hover:text-[#C59B27] transition-colors inline-flex items-center gap-2 pb-1 border-b-2 border-[#12161F] dark:border-[#C59B27]"
                    >
                        <span>Complete Calendar</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>

                {featuredEvents.length === 0 ? (
                    <div className="p-12 text-center border border-[var(--border)] bg-[var(--bg-surface)] rounded-sm">
                        <Calendar size={28} className="mx-auto text-[#C59B27] mb-3 opacity-60" />
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">No Upcoming Events Scheduled</h3>
                        <p className="text-sm text-[var(--text-secondary)]">The event calendar is currently being scheduled for the upcoming term.</p>
                    </div>
                ) : (
                    /* 3-Column Image-First Editorial Grid */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredEvents.map((event) => (
                            <article 
                                key={event.id || event.slug}
                                className="group flex flex-col justify-between border border-[var(--border)] bg-[var(--bg-surface)] p-5 hover:border-[#C59B27] transition-all duration-300 shadow-sm rounded-sm"
                            >
                                <div>
                                    {/* Photographic Hero Frame */}
                                    <div className="overflow-hidden aspect-[16/10] relative mb-5 border border-[var(--border)] bg-[var(--bg-subtle)] rounded-sm">
                                        <img 
                                            src={event.image} 
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03]"
                                        />
                                        <div className="absolute top-2.5 left-2.5">
                                            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[var(--bg-surface)]/90 backdrop-blur-sm text-[#C59B27] font-bold border border-[var(--border)] rounded-sm shadow-sm">
                                                [{event.label || 'Tradition'}]
                                            </span>
                                        </div>
                                        <div className="absolute bottom-2.5 right-2.5">
                                            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[var(--bg-surface)]/90 backdrop-blur-sm text-[var(--text-primary)] font-bold border border-[var(--border)] rounded-sm shadow-sm">
                                                {event.date}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-[var(--text-primary)] leading-snug mb-3 group-hover:text-[#C59B27] transition-colors tracking-tight">
                                        <Link href={`/events/${event.slug || event.id}`}>
                                            {event.title}
                                        </Link>
                                    </h3>

                                    <p className="text-sm font-medium text-[var(--text-secondary)] leading-relaxed mb-6">
                                        {event.brief}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                                    <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)] text-[11px] font-semibold">
                                        <MapPin size={13} className="text-[#C59B27]" />
                                        <span>{event.location}</span>
                                    </span>
                                    <Link 
                                        href={`/events/${event.slug || event.id}`}
                                        className="font-bold uppercase tracking-[0.18em] text-[11px] text-[var(--text-primary)] hover:text-[#C59B27] inline-flex items-center gap-1"
                                    >
                                        <span>Dossier</span>
                                        <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};
