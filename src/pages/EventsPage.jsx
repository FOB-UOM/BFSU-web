import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Grid } from '../components/ui/Grid';
import { Card, CardContent } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { eventsData } from '../data/eventsData';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export const EventsPage = () => {
    return (
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden transition-colors duration-500">
            {/* Adaptive background overlay */}
            <div className="absolute inset-0 bg-[url('/images/faculty_official_real.jpg')] bg-cover bg-fixed opacity-25 dark:opacity-20" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF9F6] via-[#FAF9F6]/95 to-[#FAF9F6] dark:from-[#0A0A0A] dark:via-[#0A0A0A]/95 dark:to-[#0A0A0A] transition-colors duration-500" />

            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-bfsu-gold/30 bg-bfsu-gold/10 text-bfsu-primary dark:text-bfsu-gold text-xs font-semibold uppercase tracking-wider mb-3">
                        <Sparkles size={13} />
                        Calendar & Assemblies
                    </div>
                    <Typography variant="h1" className="mb-4">
                        Faculty <span className="text-bfsu-gold">Events</span>
                    </Typography>
                    <Typography variant="p" className="text-gray-600 dark:text-gray-400 font-normal text-base max-w-xl mx-auto">
                        Academic symposiums, student life festivals, and collaborative workshops.
                    </Typography>
                </div>

                <Grid cols={1} md={2} gap={8}>
                    {eventsData.map((event) => {
                        const IconComponent = event.icon || Calendar;
                        return (
                            <Card key={event.id} hover={true} className="h-full group">
                                <CardContent className="flex flex-col p-8 sm:p-10 h-full relative overflow-hidden">
                                    <div className="w-13 h-13 p-3 bg-bfsu-gold/15 dark:bg-bfsu-primary border border-bfsu-gold/30 text-bfsu-primary dark:text-bfsu-gold rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                        <IconComponent size={26} />
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-bfsu-gold/20 text-bfsu-primary dark:text-bfsu-gold text-[0.7rem] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border border-bfsu-gold/30">
                                            {event.label}
                                        </span>
                                    </div>
                                    <Typography variant="h3" className="mb-4 !text-xl font-bold leading-snug">
                                        {event.title}
                                    </Typography>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow leading-relaxed">
                                        {event.brief}
                                    </p>
                                    <div className="mt-auto space-y-3 pt-4 border-t border-black/5 dark:border-white/10">
                                        <div className="flex items-center gap-2.5 text-gray-500 text-xs font-medium">
                                            <Calendar size={14} className="text-bfsu-gold" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-gray-500 text-xs font-medium">
                                            <MapPin size={14} className="text-bfsu-gold" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="pt-2">
                                            <Link to={`/events/${event.slug}`} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-bfsu-gold hover:underline">
                                                View Event Details &rarr;
                                            </Link>
                                        </div>
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
