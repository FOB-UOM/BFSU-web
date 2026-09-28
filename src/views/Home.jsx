import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { QuickLinksSection } from '../sections/QuickLinksSection';
import { NewsSection } from '../sections/NewsSection';
import { WelcomeSection } from '../sections/WelcomeSection';
import { AlumniSection } from '../sections/AlumniSection';
import { EventsSection } from '../sections/EventsSection';

export const Home = ({ 
    news = [], 
    events = [], 
    portals = [], 
    timetables = [], 
    announcement = null 
}) => {
    return (
        <main className="flex-grow w-full relative">
            <HeroSection announcement={announcement} />
            <QuickLinksSection portals={portals} timetables={timetables} />
            <NewsSection news={news} />
            <AlumniSection />
            <WelcomeSection announcement={announcement} />
            <EventsSection events={events} />
        </main>
    );
};
