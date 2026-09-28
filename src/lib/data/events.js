import { fetchNotionEvents } from '../notion.js';
import { createClient } from '../supabase/server';

/**
 * Database-First Events & Traditions Service
 * Prioritizes Notion Headless CMS backplane with Supabase PostgreSQL fallback.
 * Strictly zero static mock data.
 */
export async function getEvents() {
    try {
        const notionEvents = await fetchNotionEvents();
        if (notionEvents && notionEvents.length > 0) {
            return notionEvents;
        }
    } catch (err) {
        console.warn('[Events] Notion events fetch failed, falling back to Supabase:', err.message);
    }

    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('events')
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
 * Fetch a single event by its slug.
 */
export async function getEventBySlug(slug) {
    if (!slug) return null;

    try {
        const allEvents = await getEvents();
        const found = allEvents.find(e => e.slug === slug || e.id === slug);
        if (found) return found;
    } catch {
        // Continue to Supabase direct query
    }

    try {
        const supabase = await createClient();
        if (!supabase) return null;

        const { data, error } = await supabase
            .from('events')
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
