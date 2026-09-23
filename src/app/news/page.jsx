import { NewsPage } from '../../views/NewsPage';
import { getNews } from '../../lib/data/news';

export const metadata = {
    title: "Notices & Circulars | Faculty Dispatches",
    description: "Official announcements, examination notifications, and student welfare advisories from the Business Faculty Students' Union secretariat.",
};

export default async function News() {
    const items = await getNews();
    return <NewsPage items={items} />;
}
