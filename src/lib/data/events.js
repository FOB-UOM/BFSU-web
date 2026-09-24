import { fetchNotionEvents } from '../notion.js';
import { createClient } from '../supabase/server';
import { eventsData as fallbackEvents } from '../../data/eventsData';

/**
 * Fetch all published collegiate events.
 * Prioritizes the live Notion operational backplane with Supabase and seed fallbacks.
 */
export async function getEvents() {
    try {
        const notionEvents = await fetchNotionEvents();
        if (notionEvents && notionEvents.length > 0) {
            return notionEvents;
        }
    } catch (err) {
        console.warn('[Events] Failed to fetch Notion events, trying Supabase:', err.message);
    }

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('published', true)
            .order('date', { ascending: false });

        if (error || !data || data.length === 0) {
            return fallbackEvents;
        }

        return data;
    } catch {
        return fallbackEvents;
    }
}

/**
 * Fetch a single event by its slug.
 */
export async function getEventBySlug(slug) {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();

        if (error || !data) {
            return fallbackEvents.find((item) => item.slug === slug) || null;
        }

        return data;
    } catch {
        return fallbackEvents.find((item) => item.slug === slug) || null;
    }
}
