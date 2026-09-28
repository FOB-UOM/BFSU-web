import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '../../../components/ui/Container';
import { Typography } from '../../../components/ui/Typography';
import { getEvents, getEventBySlug } from '../../../lib/data/events';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { ProvenanceBanner } from '../../../components/ProvenanceBanner';
import { EventRsvpButton } from '../../../components/EventRsvpButton';
import { EventCollaborationAffordance } from '../../../components/collaboration/EventCollaborationAffordance';

import { getEventJsonLd } from '../../../lib/seo/schema';

export async function generateStaticParams() {
    const items = await getEvents();
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const eventItem = await getEventBySlug(slug);

    if (!eventItem) {
        return {
            title: "Event Not Found | Business Faculty Students' Union",
        };
    }

    return {
        title: eventItem.title,
        description: eventItem.brief || "Collegiate event hosted by the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa, Sri Lanka.",
        alternates: {
            canonical: `https://bfsu-uom.lk/events/${slug}`,
        },
        openGraph: {
            title: `${eventItem.title} | Business Faculty Students' Union, University of Moratuwa`,
            description: eventItem.brief || "Collegiate event hosted by the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa, Sri Lanka.",
            url: `https://bfsu-uom.lk/events/${slug}`,
            images: eventItem.image ? [{ url: eventItem.image }] : ["/images/logo.png"],
        },
    };
}

export default async function SingleEvent({ params }) {
    const { slug } = await params;
    const eventItem = await getEventBySlug(slug);

    if (!eventItem) {
        notFound();
    }

    const eventJsonLd = getEventJsonLd(eventItem);

    return (
        <main className="flex-grow pt-32 pb-24 relative transition-colors duration-500">
            {eventJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
                />
            )}
            <Container className="max-w-4xl relative z-10">
                <div className="mb-10">
                    <Link href="/events" className="inline-flex items-center gap-2 text-gray-500 hover:text-bfsu-gold transition-colors mb-8 text-xs font-bold uppercase tracking-wider">
                        <ArrowLeft size={15} /> Back to Events
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-5">
                        <span className="bg-bfsu-gold/20 text-bfsu-primary dark:text-bfsu-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-bfsu-gold/30">
                            {eventItem.label}
                        </span>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                            <Calendar size={13} className="text-bfsu-gold" />
                            <span>{eventItem.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                            <MapPin size={13} className="text-bfsu-gold" />
                            <span>{eventItem.location}</span>
                        </div>
                    </div>
                    <Typography variant="h1" className="!text-3xl sm:!text-4xl md:!text-5xl mb-6 leading-tight">
                        {eventItem.title}
                    </Typography>
                </div>

                {eventItem.images && eventItem.images.length > 0 ? (
                    <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-5">
                        {eventItem.images.map((imgSrc, idx) => (
                            <div key={idx} className="rounded-2xl overflow-hidden shadow-md border border-[var(--border)] bg-[var(--bg-subtle)]">
                                <img src={imgSrc} alt={`${eventItem.title} - View ${idx + 1}`} className="w-full h-auto object-cover aspect-auto" />
                            </div>
                        ))}
                    </div>
                ) : eventItem.image && (
                    <div className="mb-14 rounded-3xl overflow-hidden shadow-xl border border-[var(--border)]">
                        <img src={eventItem.image} alt={eventItem.title} className="w-full h-auto max-h-[550px] object-cover" />
                    </div>
                )}

                <ProvenanceBanner 
                    item={eventItem} 
                    mapping={{
                        title: 'title',
                        subtitle: 'brief',
                        contentKind: 'label',
                        author: 'organizer',
                        publishDate: 'date',
                        updatedDate: 'updatedAt',
                    }}
                />

                <div className="mb-8 space-y-4">
                    <EventRsvpButton 
                        eventId={eventItem.id || eventItem.slug} 
                        eventTitle={eventItem.title} 
                    />
                    <EventCollaborationAffordance
                        eventTitle={eventItem.title}
                        eventDate={eventItem.date}
                        eventLocation={eventItem.location}
                        eventDescription={eventItem.brief}
                        eventSlug={eventItem.slug}
                    />
                </div>

                <article className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm leading-relaxed text-[var(--text-secondary)] text-base sm:text-lg [&>p]:mb-4">
                    <div
                        dangerouslySetInnerHTML={{ __html: typeof eventItem.content === 'string' ? eventItem.content : (eventItem.brief || '') }}
                    />
                </article>
            </Container>
        </main>
    );
}
