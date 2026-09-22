import React from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Grid } from '../components/ui/Grid';
import { Card, CardContent } from '../components/ui/Card';
import { Users, Award, Shield } from 'lucide-react';

export const AboutUs = () => {
    const officials = [
        { role: 'President', name: 'Yasitha Sandakalum' },
        { role: 'Secretary', name: 'Miyuranga Rajakaruna' },
        { role: 'Vice President', name: 'Naveen Sandeepa' },
        { role: 'Editor', name: 'Prageeth Harshana' },
        { role: 'Junior Treasurer', name: 'Lakshan Kosala' },
    ];

    const executiveMembers = [
        'Poorna Lakshan', 'Warsha Joolige', 'Mayuri Lakshani', 'Senura Niduk', 'Lakshitha Ranaweera', 'Siyani Kumarasinghe'
    ];

    return (
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden transition-colors duration-500">
            {/* Background Image with adaptive overlay */}
            <div className="absolute inset-0 bg-[url('/images/faculty_official_real.jpg')] bg-cover bg-fixed opacity-25 dark:opacity-20" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF9F6] via-[#FAF9F6]/95 to-[#FAF9F6] dark:from-[#0A0A0A] dark:via-[#0A0A0A]/95 dark:to-[#0A0A0A] transition-colors duration-500" />

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto mb-20">
                    <Card hover={false} className="shadow-lg">
                        <CardContent className="flex flex-col justify-center items-center text-center p-8 sm:p-12">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-bfsu-gold/30 bg-bfsu-gold/10 text-bfsu-primary dark:text-bfsu-gold text-xs font-semibold uppercase tracking-wider mb-4">
                                <Shield size={13} />
                                Student Representation
                            </div>
                            <Typography variant="h2" className="mb-4 text-center">
                                About <span className="text-bfsu-gold">BFSU UoM</span>
                            </Typography>
                            <Typography variant="p" className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                                The Business Faculty Students' Union represents the students of the Faculty of Business, University of Moratuwa. The union works to support student welfare, encourage leadership, and create opportunities for personal and professional development. It organizes academic programs, networking events, social activities, and community projects that help students build connections and gain real-world experience. The union also acts as a bridge between students and the faculty, ensuring that student voices are heard and their needs are addressed.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-bfsu-gold/30 bg-bfsu-gold/10 text-bfsu-primary dark:text-bfsu-gold text-xs font-semibold uppercase tracking-wider mb-3">
                        <Award size={13} />
                        Executive Leadership
                    </div>
                    <Typography variant="h2" className="mb-3">
                        Board of <span className="text-bfsu-gold">Officials</span>
                    </Typography>
                    <Typography variant="p" className="text-gray-600 dark:text-gray-400 font-normal text-base">
                        The leadership team dedicated to the 2026 academic year.
                    </Typography>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
                    {officials.map((official, idx) => (
                        <Card key={idx} hover={true} className="text-center">
                            <CardContent className="p-6 flex flex-col justify-center items-center">
                                <Typography variant="h5" className="text-bfsu-gold mb-1.5 !text-xs font-bold uppercase tracking-wider">
                                    {official.role}
                                </Typography>
                                <Typography variant="p" className="!text-base font-semibold leading-snug">
                                    {official.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mb-8 mt-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-bfsu-gold/30 bg-bfsu-gold/10 text-bfsu-primary dark:text-bfsu-gold text-xs font-semibold uppercase tracking-wider mb-3">
                        <Users size={13} />
                        Committee
                    </div>
                    <Typography variant="h3" className="text-bfsu-gold">
                        Executive Members
                    </Typography>
                </div>

                <Grid cols={2} md={3} lg={6} gap={4}>
                    {executiveMembers.map((member, idx) => (
                        <Card key={idx} hover={true} className="text-center">
                            <CardContent className="p-5 flex items-center justify-center">
                                <Typography variant="p" className="!text-sm font-medium">
                                    {member}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

            </Container>
        </main>
    );
};
