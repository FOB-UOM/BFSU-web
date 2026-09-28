import { Home } from '../views/Home';
import { getNews } from '../lib/data/news';
import { getEvents } from '../lib/data/events';
import { getAcademicPortals, getAcademicTimetables } from '../lib/data/portals';
import { getActiveAnnouncement } from '../lib/data/siteSettings';

export const metadata = {
    title: "Business Faculty Students' Union (BFSU) | University of Moratuwa, Sri Lanka",
    description: "Official portal of the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa, Sri Lanka. Access faculty notices, academic portals, student welfare, and leadership initiatives.",
    alternates: {
        canonical: "https://bfsu-uom.lk",
    },
};

export default async function HomePage() {
    const [news, events, portals, timetables, announcement] = await Promise.all([
        getNews(),
        getEvents(),
        getAcademicPortals(),
        getAcademicTimetables(),
        getActiveAnnouncement()
    ]);

    return (
        <Home 
            news={news} 
            events={events} 
            portals={portals} 
            timetables={timetables} 
            announcement={announcement} 
        />
    );
}
