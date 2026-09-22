import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { eventsData } from '../data/eventsData';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

export const SingleEventPage = () => {
    const { slug } = useParams();
    const eventItem = eventsData.find(item => item.slug === slug);

    if (!eventItem) {
        return (
            <main className="flex-grow pt-40 pb-24 text-center">
                <Typography variant="h2" className="mb-4">Event not found.</Typography>
                <Link to="/events" className="text-bfsu-gold hover:underline px-6 py-2.5 border border-bfsu-gold rounded-full text-sm font-semibold">
                    Return to Events
                </Link>
            </main>
        );
    }

    return (
        <main className="flex-grow pt-32 pb-24 relative transition-colors duration-500">
            <Container className="max-w-4xl relative z-10">
                <div className="mb-10">
                    <Link to="/events" className="inline-flex items-center gap-2 text-gray-500 hover:text-bfsu-gold transition-colors mb-8 text-xs font-bold uppercase tracking-wider">
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
                            <div key={idx} className="rounded-2xl overflow-hidden shadow-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                                <img src={imgSrc} alt={`${eventItem.title} - View ${idx + 1}`} className="w-full h-auto object-cover aspect-auto" />
                            </div>
                        ))}
                    </div>
                ) : eventItem.image && (
                    <div className="mb-14 rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10">
                        <img src={eventItem.image} alt={eventItem.title} className="w-full h-auto max-h-[550px] object-cover" />
                    </div>
                )}

                <article className="p-8 sm:p-10 rounded-3xl glass-card border border-black/10 dark:border-white/10 shadow-sm leading-relaxed text-gray-700 dark:text-gray-300 text-base sm:text-lg [&>p]:mb-4">
                    <div
                        dangerouslySetInnerHTML={{ __html: eventItem.content }}
                    />
                </article>
            </Container>
        </main>
    );
};
