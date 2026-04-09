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
            <main className="flex-grow pt-40 pb-24 text-center bg-bfsu-dark">
                <Typography variant="h2" className="text-white">Event not found.</Typography>
                <Link to="/events" className="text-bfsu-gold mt-6 inline-block hover:underline px-6 py-3 border border-bfsu-gold rounded-full">Return to Events</Link>
            </main>
        );
    }

    return (
        <main className="flex-grow pt-32 pb-24 relative bg-[#060606]">
            <Container className="max-w-4xl relative z-10">
                <div className="mb-10">
                    <Link to="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-bfsu-gold transition-colors mb-8 text-sm font-bold uppercase tracking-wider">
                        <ArrowLeft size={16} /> Back to Events
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="bg-bfsu-gold/20 text-bfsu-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-bfsu-gold/30">
                            {eventItem.label}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium tracking-wide">
                            <Calendar size={14} className="text-bfsu-gold" />
                            <span>{eventItem.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium tracking-wide">
                            <MapPin size={14} className="text-bfsu-gold" />
                            <span>{eventItem.location}</span>
                        </div>
                    </div>
                    <Typography variant="h1" className="text-white !text-[2.2rem] md:!text-[3.2rem] mb-6 leading-[1.15]">
                        {eventItem.title}
                    </Typography>
                </div>

                {eventItem.images && eventItem.images.length > 0 ? (
                    <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {eventItem.images.map((imgSrc, idx) => (
                            <div key={idx} className="rounded-[1.5rem] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.4)] border border-white/5 bg-white/5">
                                <img src={imgSrc} alt={`${eventItem.title} - View ${idx + 1}`} className="w-full h-auto object-cover aspect-auto" />
                            </div>
                        ))}
                    </div>
                ) : eventItem.image && (
                    <div className="mb-16 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                        <img src={eventItem.image} alt={eventItem.title} className="w-full h-auto max-h-[600px] object-cover" />
                    </div>
                )}

                <div
                    className="max-w-none text-gray-300 text-lg leading-relaxed [&>p]:mb-4"
                    dangerouslySetInnerHTML={{ __html: eventItem.content }}
                />
            </Container>
        </main>
    );
};
