import { getNews } from '../lib/data/news';
import { getEvents } from '../lib/data/events';
import { createClient } from '../lib/supabase/server';
import { departmentalSocieties } from '../data/societiesData';
import { departmentsData } from '../data/departmentsData';

export default async function sitemap() {
    const baseUrl = 'https://bfsu-uom.lk';

    // Static core pages
    const staticRoutes = [
        '',
        '/about',
        '/alumni',
        '/explore',
        '/research',
        '/links',
        '/news',
        '/events',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Dynamic news circulars
    let newsRoutes = [];
    try {
        const news = await getNews();
        newsRoutes = (news || []).map((item) => ({
            url: `${baseUrl}/news/${item.slug}`,
            lastModified: item.updated_at || new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));
    } catch {
        // Fallback
    }

    // Dynamic events & assemblies
    let eventRoutes = [];
    try {
        const events = await getEvents();
        eventRoutes = (events || []).map((item) => ({
            url: `${baseUrl}/events/${item.slug}`,
            lastModified: item.updated_at || new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));
    } catch {
        // Fallback
    }

    // Dynamic public delegate profiles
    let profileRoutes = [];
    try {
        const supabase = await createClient();
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, username, updated_at')
            .eq('is_public', true)
            .limit(100);

        if (profiles) {
            profileRoutes = profiles.map((p) => ({
                url: `${baseUrl}/u/${p.username || p.id}`,
                lastModified: p.updated_at || new Date().toISOString(),
                changeFrequency: 'weekly',
                priority: 0.6,
            }));
        }
    } catch {
        // Fallback
    }

    // Department and Society dedicated routes
    const departmentRoutes = departmentsData.map((d) => ({
        url: `${baseUrl}/departments/${d.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.85,
    }));

    const societyRoutes = departmentalSocieties.map((s) => ({
        url: `${baseUrl}/societies/${s.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.85,
    }));

    return [...staticRoutes, ...departmentRoutes, ...societyRoutes, ...newsRoutes, ...eventRoutes, ...profileRoutes];
}
