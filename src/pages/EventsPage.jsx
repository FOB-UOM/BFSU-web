import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Grid } from '../components/ui/Grid';
import { Card, CardContent } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { eventsData } from '../data/eventsData';
import { Calendar, MapPin } from 'lucide-react';

export const EventsPage = () => {
    return (
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden bg-[url('/images/faculty_official_real.jpg')] bg-cover bg-fixed">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <Typography variant="h1" className="text-white mb-6">Events</Typography>
                    <Typography variant="p" className="text-gray-400 font-light text-lg">Stay updated with the latest happenings and past activities.</Typography>
                </div>

                <Grid cols={1} md={2} gap={8}>
                    {eventsData.map((event) => {
                        const IconComponent = event.icon || Calendar;
                        return (
                            <Card key={event.id} hover={true} className="h-full bg-bfsu-glass backdrop-blur-xl border-bfsu-glass-border">
                                <CardContent className="flex flex-col p-10 h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-125 z-0" />

                                    <div className="w-14 h-14 bg-bfsu-gold text-bfsu-primary rounded-xl flex items-center justify-center mb-6 shadow-[0_5px_15px_rgba(212,175,55,0.4)] relative z-10">
                                        <IconComponent size={28} />
                                    </div>
                                    <div className="flex items-center gap-3 mb-3 relative z-10">
                                        <span className="bg-bfsu-gold/20 text-bfsu-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{event.label}</span>
                                    </div>
                                    <Typography variant="h3" className="mb-4 text-white relative z-10">
                                        {event.title}
                                    </Typography>
                                    <Typography variant="p" className="text-gray-300 mb-6 flex-grow leading-relaxed relative z-10">
                                        {event.brief}
                                    </Typography>
                                    <div className="mt-auto space-y-4 pt-5 border-t border-white/5 relative z-10">
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Calendar size={18} className="text-bfsu-gold" />
                                            <span className="text-sm tracking-wide">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400 mb-6">
                                            <MapPin size={18} className="text-bfsu-gold" />
                                            <span className="text-sm tracking-wide">{event.location}</span>
                                        </div>
                                        <Link to={`/events/${event.slug}`} className="inline-block text-sm font-bold uppercase tracking-wider text-bfsu-gold hover:text-white transition-colors">
                                            View Event Details &rarr;
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Grid>
            </Container>
        </main>
    );
};
