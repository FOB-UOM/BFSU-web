import { createClient } from '../supabase/server';

/**
 * Database-First Student Accolades & Achievements Service
 */

export async function getAchievements() {
    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('achievements')
            .select(`
                *,
                profile:profiles (
                    full_name,
                    username,
                    avatar_url
                )
            `)
            .order('year', { ascending: false });

        if (error || !data) return [];
        return data;
    } catch (err) {
        console.warn('[Achievements] Failed to fetch achievements from database:', err.message);
        return [];
    }
}
