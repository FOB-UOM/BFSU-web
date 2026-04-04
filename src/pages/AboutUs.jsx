import React from 'react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Grid } from '../components/ui/Grid';
import { Card, CardContent } from '../components/ui/Card';

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
        <main className="flex-grow pt-32 pb-24 relative overflow-hidden bg-[url('/images/faculty_official_real.jpg')] bg-cover bg-fixed">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]" />
            <Container className="relative z-10">
                <div className="text-center mb-16">

                </div>

                <Grid cols={1} md={2} gap={8} className="mb-24">
                    <Card hover={false} className="h-full bg-bfsu-glass backdrop-blur-xl">
                        <CardContent className="flex flex-col justify-center items-center text-center p-10 mt-6">
                            <Typography variant="h2" className="text-bfsu-gold mb-4">About Us</Typography>
                            <Typography variant="p" className="text-gray-300">
                                The Business Faculty Students’ Union represents the students of the Faculty of Business, University of Moratuwa. The union works to support student welfare, encourage leadership, and create opportunities for personal and professional development. It organizes academic programs, networking events, social activities, and community projects that help students build connections and gain real-world experience. The union also acts as a bridge between students and the faculty, ensuring that student voices are heard and their needs are addressed.
                            </Typography>
                        </CardContent>
                    </Card>

                </Grid>

                <div className="text-center mb-12">
                    <Typography variant="h2" className="text-white mb-4">Board of <span className="text-bfsu-gold">Officials</span></Typography>
                    <Typography variant="p" className="text-gray-400 font-light text-lg">The leadership team dedicated to the 2026 academic year.</Typography>
                </div>

                <Grid cols={2} md={3} lg={4} gap={6} className="mb-16">
                    {officials.map((official, idx) => (
                        <Card key={idx} hover={true} className="text-center bg-bfsu-glass backdrop-blur-lg">
                            <CardContent className="p-8 pt-8 flex flex-col justify-center items-center">
                                <Typography variant="h4" className="text-bfsu-gold mb-2">{official.role}</Typography>
                                <Typography variant="p" className="text-white text-[1.1rem]">{official.name}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                <div className="text-center mb-10 mt-20">
                    <Typography variant="h3" className="text-bfsu-gold">Executive Members</Typography>
                </div>

                <Grid cols={2} md={4} gap={6}>
                    {executiveMembers.map((member, idx) => (
                        <Card key={idx} hover={true} className="text-center bg-bfsu-glass backdrop-blur-lg">
                            <CardContent className="p-6 pt-6">
                                <Typography variant="p" className="text-white font-medium">{member}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

            </Container>
        </main>
    );
};
