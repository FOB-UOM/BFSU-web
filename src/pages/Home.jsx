import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { QuickLinksSection } from '../sections/QuickLinksSection';
import { NewsSection } from '../sections/NewsSection';
import { WelcomeSection } from '../sections/WelcomeSection';
import { AboutSection } from '../sections/AboutSection';
import { EventsSection } from '../sections/EventsSection';

export const Home = () => {
    return (
        <main className="flex-grow">
            <HeroSection />
            <QuickLinksSection />
            <NewsSection />
            <WelcomeSection />
            <AboutSection />
            <EventsSection />
        </main>
    );
};
