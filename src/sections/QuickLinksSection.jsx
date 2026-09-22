import React from 'react';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { Calendar, Clock, Library, Book, AlertCircle, ExternalLink } from 'lucide-react';

export const QuickLinksSection = () => {
    const quickLinks = [
        {
            id: 1,
            title: "Academic Calendar",
            description: "Current semester dates and holidays.",
            icon: Calendar,
            buttonText: "View Calendar",
            url: "https://uom.lk/business/undergraduate-studies/academic-calendar"
        },
        {
            id: 2,
            title: "Time Tables",
            description: "Latest lecture and examination schedules.",
            icon: Clock,
            buttonText: "View Schedules",
            url: "https://uom.lk/business/undergraduate-studies"
        },
        {
            id: 3,
            title: "Library",
            description: "Access digital resources, catalog, and study spaces.",
            icon: Library,
            buttonText: "Visit Library",
            url: "https://uom.lk/lib"
        },
        {
            id: 4,
            title: "FOB Curriculum",
            description: "Downloadable PDFs and module guides.",
            icon: Book,
            buttonText: "Download PDF",
            url: "https://uom.lk/sites/default/files/business/files/FOB%20Full%20Curriculum%20Intake%202025%20for%20Website%2027-11-2025_0.pdf"
        },
        {
            id: 5,
            title: "Complaints & Feedback",
            description: "Report issues and submit feedback directly.",
            icon: AlertCircle,
            buttonText: "Submit Form",
            url: "https://forms.gle/uPNxwgi6P3wp8HAA8"
        }
    ];

    return (
        <section id="quick-links" className="py-20 bg-transparent relative z-10 border-b border-black/5 dark:border-white/5 transition-colors">
            <Container className="max-w-[1400px]">
                <div className="text-center mb-14">
                    <Typography variant="h2" className="mb-3">
                        Student <span className="text-bfsu-gold">Portal</span>
                    </Typography>
                    <Typography variant="p" className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Essential tools and university resources to navigate your daily academic life.
                    </Typography>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Card key={link.id} hover={true} className="flex flex-col items-center text-center p-6">
                                <div className="w-13 h-13 p-3 bg-bfsu-gold/15 dark:bg-bfsu-primary border border-bfsu-gold/30 text-bfsu-primary dark:text-bfsu-gold rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                                    <Icon size={26} />
                                </div>
                                <Typography variant="h4" className="mb-2 !text-base font-bold leading-snug">{link.title}</Typography>
                                <p className="text-gray-600 dark:text-gray-400 text-xs mb-6 flex-grow leading-relaxed">{link.description}</p>

                                <a 
                                    href={link.url} 
                                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                                    rel="noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-1.5 mt-auto border border-bfsu-gold/40 text-bfsu-primary dark:text-bfsu-gold hover:bg-bfsu-gold hover:text-bfsu-primary px-3 py-2 rounded-full font-bold text-[0.7rem] uppercase tracking-wider transition-all"
                                >
                                    {link.buttonText}
                                    {link.url.startsWith('http') && <ExternalLink size={11} />}
                                </a>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};
