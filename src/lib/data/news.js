import { fetchNotionNews } from '../notion.js';
import { createClient } from '../supabase/server';

/**
 * Database-First News & Official Notices Service
 * Prioritizes Notion Headless CMS backplane with Supabase PostgreSQL fallback.
 * Strictly zero static mock data.
 */
export async function getNews() {
    try {
        const notionNews = await fetchNotionNews();
        if (notionNews && notionNews.length > 0) {
            return notionNews;
        }
    } catch (err) {
        console.warn('[News] Notion news fetch failed, falling back to Supabase:', err.message);
    }

    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('published', true)
            .order('date', { ascending: false });

        if (error || !data) {
            return [];
        }

        return data;
    } catch {
        return [];
    }
}

/**
 * Fetch a single news article by its slug.
 */
export async function getNewsBySlug(slug) {
    if (!slug) return null;

    try {
        const allNews = await getNews();
        const found = allNews.find(n => n.slug === slug || n.id === slug);
        if (found) return found;
    } catch {
        // Continue to Supabase direct query
    }

    try {
        const supabase = await createClient();
        if (!supabase) return null;

        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .maybeSingle();

        if (error || !data) {
            return null;
        }

        return data;
    } catch {
        return null;
    }
}
