import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { QuickLinksSection } from '../sections/QuickLinksSection';
import { NewsSection } from '../sections/NewsSection';
import { WelcomeSection } from '../sections/WelcomeSection';
import { AlumniSection } from '../sections/AlumniSection';
import { EventsSection } from '../sections/EventsSection';

export const Home = () => {
    return (
        <main className="flex-grow w-full relative">
            <HeroSection />
            <QuickLinksSection />
            <NewsSection />
            <AlumniSection />
            <WelcomeSection />
            <EventsSection />
        </main>
    );
};
