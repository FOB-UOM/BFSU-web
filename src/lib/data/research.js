import { createClient } from '../supabase/server';

/**
 * Database-First Research Papers & Student Capstone Projects Service
 */

export async function getResearchPapers() {
    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('research_papers')
            .select('*')
            .order('published_year', { ascending: false });

        if (error || !data) return [];
        return data;
    } catch (err) {
        console.warn('[Research] Failed to fetch research papers:', err.message);
        return [];
    }
}

export async function getStudentProjects() {
    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('student_projects')
            .select(`
                *,
                profile:profiles (
                    full_name,
                    username,
                    avatar_url,
                    department,
                    batch
                )
            `)
            .order('created_at', { ascending: false });

        if (error || !data) return [];
        return data;
    } catch (err) {
        console.warn('[Research] Failed to fetch student projects:', err.message);
        return [];
    }
}
