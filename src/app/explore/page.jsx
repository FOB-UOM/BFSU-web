import { ExplorePage } from '../../views/ExplorePage';
import { getAchievements } from '../../lib/data/achievements';
import { getResearchPapers } from '../../lib/data/research';
import { getEvents } from '../../lib/data/events';

export const metadata = {
    title: "Explore | Campus Life & Student Achievements",
    description: "Explore student achievements, cultural traditions, competitions, and life at the Faculty of Business, University of Moratuwa.",
};

export default async function Explore() {
    const [achievements, research, events] = await Promise.all([
        getAchievements(),
        getResearchPapers(),
        getEvents()
    ]);

    return (
        <ExplorePage 
            achievements={achievements} 
            research={research} 
            events={events} 
        />
    );
}
