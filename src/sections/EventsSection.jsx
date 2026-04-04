import React from 'react';
import { Container } from '../components/ui/Container';
import { Grid } from '../components/ui/Grid';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { siteData } from '../data';
import * as Icons from 'lucide-react';

export const EventsSection = () => {
    return (
        <section id="events" className="py-24 bg-transparent relative">
            <Container>
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <Typography variant="h2" className="mb-4 text-white">
                        Latest <span className="text-bfsu-gold">Events</span>
                    </Typography>
                    <Typography variant="p" className="mb-8 text-gray-300">
                        Experience the vibrant student life and professional development initiatives driven by the Business Faculty Students' Union.
                    </Typography>
                </div>

                <Grid cols={1} md={2} lg={2} xl={4} gap={8}>
                    {siteData.events.map((event) => {
                        const IconComponent = Icons[event.icon] || Icons.Calendar;

                        return (
                            <Card key={event.id} hover={true} className="h-full flex flex-col group">
                                <CardHeader className="text-white relative overflow-hidden">
                                    <div className="flex items-center gap-3 relative z-10 text-bfsu-secondary mb-2">
                                        <Icons.Calendar size={14} className="text-bfsu-gold" />
                                        <span className="text-xs uppercase tracking-wider font-semibold text-gray-300">{event.date}</span>
                                    </div>
                                    <Typography variant="h4" className="!text-[1.4rem] font-bold text-bfsu-gold">
                                        {event.title}
                                    </Typography>
                                </CardHeader>

                                <CardContent className="flex-grow flex flex-col pt-0 text-left">
                                    <p className="text-[0.95rem] text-gray-400 mb-6">
                                        {event.description?.substring(0, 100) || 'Exciting networking and skill-building experience.'}...
                                    </p>
                                    <div className="mt-auto">
                                        <a href="/events" className="inline-block px-6 py-2.5 rounded-full border border-bfsu-glass-border font-bold text-sm uppercase tracking-wider text-white hover:bg-white hover:text-bfsu-primary hover:border-white transition-colors">
                                            Learn More
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Grid>

                <div className="text-center mt-12">
                    <a href="#all-events" className="inline-block bg-bfsu-glass border border-bfsu-glass-border px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider text-white hover:bg-bfsu-gold hover:text-bfsu-primary hover:border-bfsu-gold transition-all shadow-lg">
                        View All Events
                    </a>
                </div>
            </Container>
        </section>
    );
};
