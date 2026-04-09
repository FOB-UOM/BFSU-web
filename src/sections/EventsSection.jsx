import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Card, CardContent } from '../components/ui/Card';
import { eventsData } from '../data/eventsData';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const EventsSection = () => {
    // Show only first 3 events on home page
    const recentEvents = eventsData.slice(0, 3);

    return (
        <section id="events" className="py-24 relative overflow-hidden bg-[url('/images/faculty_official_real.jpg')] bg-cover bg-fixed">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
            <Container className="relative z-10 w-full">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <Typography variant="h2" className="text-white mb-4">
                            Upcoming & Past <span className="text-bfsu-gold">Events</span>
                        </Typography>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Be a part of our vibrant student community. Explore amazing memories from our workshops and celebrations.
                        </p>
                    </div>
                    <Link to="/events" className="inline-flex items-center gap-2 group text-bfsu-gold font-bold uppercase tracking-wider text-sm hover:text-white transition-colors">
                        View All Events
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentEvents.map((event) => {
                        const IconComponent = event.icon || Calendar;
                        return (
                            <Card key={event.id} hover={true} className="bg-bfsu-glass backdrop-blur-md border-bfsu-glass-border flex flex-col h-full group">
                                <CardContent className="p-8 flex flex-col h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-125 z-0" />

                                    <div className="w-14 h-14 bg-bfsu-primary text-bfsu-gold rounded-xl flex items-center justify-center mb-6 shadow-[0_5px_15px_rgba(212,175,55,0.2)] border border-bfsu-glass-border relative z-10">
                                        <IconComponent size={24} />
                                    </div>
                                    <div className="flex items-center gap-2 mb-3 relative z-10">
                                        <span className="bg-bfsu-gold/20 text-bfsu-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-bfsu-gold/20">
                                            {event.label}
                                        </span>
                                    </div>
                                    <Typography variant="h4" className="text-white mb-4 !text-[1.1rem] leading-snug relative z-10">
                                        {event.title}
                                    </Typography>
                                    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed relative z-10">
                                        {event.brief}
                                    </p>
                                    <div className="mt-auto space-y-3 pt-5 border-t border-white/10 relative z-10">
                                        <div className="flex items-center gap-3 text-gray-300 text-sm">
                                            <Calendar size={16} className="text-bfsu-gold" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300 text-sm mb-6">
                                            <MapPin size={16} className="text-bfsu-gold" />
                                            <span>{event.location}</span>
                                        </div>
                                        <Link to={`/events/${event.slug}`} className="inline-block px-6 py-2.5 rounded-full border border-bfsu-gold font-bold text-[0.75rem] uppercase tracking-wider text-bfsu-gold hover:bg-bfsu-gold hover:text-bfsu-primary transition-all text-center w-full">
                                            Learn More
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};
