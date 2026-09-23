import { EventsPage } from '../../views/EventsPage';
import { getEvents } from '../../lib/data/events';

export const metadata = {
    title: "Events & Assemblies | Campus Traditions",
    description: "Academic symposiums, student celebrations, and community traditions organized by the Business Faculty Students' Union, University of Moratuwa.",
};

export default async function Events() {
    const items = await getEvents();
    return <EventsPage items={items} />;
}
