import React from 'react';
import { Container } from '../components/ui/Container';
import { Grid } from '../components/ui/Grid';
import { Card, CardContent } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { siteData } from '../data';
import * as Icons from 'lucide-react';

export const EventsPage = () => {
    return (
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden bg-[url('/images/faculty_official_real.jpg')] bg-cover bg-fixed">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <Typography variant="h1" className="text-white mb-6">Events<span className="text-bfsu-gold"></span></Typography>
                    <Typography variant="p" className="text-gray-400 font-light text-lg">Stay updated with the latest happenings and upcoming activities.</Typography>
                </div>

                <Grid cols={1} md={2} gap={8}>
                    {siteData.events.map((event) => {
                        const IconComponent = Icons[event.icon] || Icons.Calendar;
                        return (
                            <Card key={event.id} hover={true} className="h-full bg-bfsu-glass backdrop-blur-xl border-bfsu-glass-border">
                                <CardContent className="flex flex-col p-10 h-full">
                                    <div className="w-14 h-14 bg-bfsu-gold text-bfsu-primary rounded-xl flex items-center justify-center mb-8 shadow-[0_5px_15px_rgba(212,175,55,0.4)]">
                                        <IconComponent size={28} />
                                    </div>
                                    <Typography variant="h3" className="mb-4 text-white">
                                        {event.title}
                                    </Typography>
                                    <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Icons.Calendar size={18} className="text-bfsu-gold" />
                                            <span className="text-sm tracking-wide">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400">
                                            <Icons.MapPin size={18} className="text-bfsu-gold" />
                                            <span className="text-sm tracking-wide">{event.location}</span>
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
