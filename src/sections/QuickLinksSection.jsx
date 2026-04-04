import React from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Calendar, Clock, Library, Book, AlertCircle } from 'lucide-react';

export const QuickLinksSection = () => {
    const quickLinks = [
        {
            id: 1,
            title: "Academic Calendar",
            description: "Current semester dates and holidays.",
            icon: Calendar,
            buttonText: "View Calendar",
            url: "#"
        },
        {
            id: 2,
            title: "Time Tables",
            description: "Latest lecture and examination schedules.",
            icon: Clock,
            buttonText: "View Schedules",
            url: "#"
        },
        {
            id: 3,
            title: "Library",
            description: "Link to the UoM Library Business Faculty section.",
            icon: Library,
            buttonText: "Visit Library",
            url: "#"
        },
        {
            id: 4,
            title: "Student Handbooks",
            description: "Downloadable PDFs and module guides.",
            icon: Book,
            buttonText: "Download",
            url: "#"
        },
        {
            id: 5,
            title: "Complaints",
            description: "Report issues and submit feedback directly.",
            icon: AlertCircle,
            buttonText: "Submit Complaint",
            url: "#"
        }
    ];

    return (
        <section id="quick-links" className="py-24 bg-transparent relative z-10 border-b border-bfsu-glass-border/50">
            <Container className="max-w-[1400px]">
                <div className="text-center mb-16">
                    <Typography variant="h2" className="text-white mb-4">
                        Student <span className="text-bfsu-gold">Portal</span>
                    </Typography>
                    <Typography variant="p" className="text-gray-300">
                        High-utility links to help you navigate your daily academic life.
                    </Typography>
                </div>

                <div className="flex flex-col lg:flex-row justify-center gap-4 w-full">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Card key={link.id} hover={true} className="flex-1 min-w-[200px] flex flex-col items-center text-center p-6 bg-bfsu-glass backdrop-blur-md">
                                <div className="w-14 h-14 bg-bfsu-primary border border-bfsu-glass-border text-bfsu-gold rounded-2xl flex items-center justify-center mb-6 shadow-[0_5px_15px_rgba(212,175,55,0.2)]">
                                    <Icon size={28} />
                                </div>
                                <Typography variant="h4" className="text-white mb-3 !text-[1.05rem] font-bold leading-tight">{link.title}</Typography>
                                <p className="text-gray-400 text-[0.85rem] mb-6 flex-grow leading-relaxed">{link.description}</p>

                                <a href={link.url} className="w-full inline-block mt-auto bg-transparent border border-bfsu-glass-border hover:border-bfsu-gold text-bfsu-gold hover:bg-bfsu-gold hover:text-bfsu-primary px-3 py-2 rounded-full font-bold text-[0.7rem] uppercase tracking-wider transition-all">
                                    {link.buttonText}
                                </a>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};
