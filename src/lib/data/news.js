import { createClient } from '../supabase/server';
import { newsData as fallbackNews } from '../../data/newsData';

/**
 * Fetch all published news articles.
 * Falls back gracefully to static seed data if Supabase connection/table is not yet created.
 */
export async function getNews() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('published', true)
            .order('date', { ascending: false });

        if (error || !data || data.length === 0) {
            return fallbackNews;
        }

        return data;
    } catch {
        return fallbackNews;
    }
}

/**
 * Fetch a single news article by its slug.
 */
export async function getNewsBySlug(slug) {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error || !data) {
            return fallbackNews.find((item) => item.slug === slug) || null;
        }

        return data;
    } catch {
        return fallbackNews.find((item) => item.slug === slug) || null;
    }
}
