import { createClient } from '../supabase/server';
import { eventsData as fallbackEvents } from '../../data/eventsData';

/**
 * Fetch all published collegiate events.
 * Falls back gracefully to static seed data if Supabase connection/table is not yet created.
 */
export async function getEvents() {
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
