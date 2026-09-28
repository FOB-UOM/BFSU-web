import { createClient } from '../supabase/server';

/**
 * Database-First Site Settings, Announcements & Collegiate Copy Service
 */

const DEFAULT_ANNOUNCEMENT = {
    session_term: 'Academic Year 2026',
    ticker_text: 'Semester 1 • Academic Year 2026 • Intake \'22–\'25 Lecture Series Active',
    headline: 'Leadership, Scholarship & Community.',
    sub_headline: 'A vibrant student fellowship connecting undergraduates across Business Analytics, Industrial Management, and Technology with mentorship, campus life, and collective student welfare.',
    faculty_brief: 'The Faculty of Business, University of Moratuwa is a dynamic academic community dedicated to shaping the next generation of business leaders and innovators. Established in 2017 under the prestigious University of Moratuwa, the faculty focuses on integrating modern technology with management education to meet the evolving needs of the global business environment.',
    union_vision: 'The Business Faculty Students\' Union represents the students of the Faculty of Business, University of Moratuwa. The union works to support student welfare, encourage leadership, and create opportunities for personal and professional development.'
};

export async function getActiveAnnouncement() {
    try {
        const supabase = await createClient();
        if (!supabase) return DEFAULT_ANNOUNCEMENT;

        const { data, error } = await supabase
            .from('site_announcements')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error || !data) {
            return DEFAULT_ANNOUNCEMENT;
        }

        return data;
    } catch {
        return DEFAULT_ANNOUNCEMENT;
    }
}

export async function getFacultyCharter() {
    try {
        const supabase = await createClient();
        if (!supabase) {
            return {
                establishedYear: 2017,
                facultyName: 'Faculty of Business',
                universityName: 'University of Moratuwa',
                vision: DEFAULT_ANNOUNCEMENT.faculty_brief
            };
        }

        const { data, error } = await supabase
            .from('faculties')
            .select('*')
            .eq('code', 'FOB')
            .maybeSingle();

        if (error || !data) {
            return {
                establishedYear: 2017,
                facultyName: 'Faculty of Business',
                universityName: 'University of Moratuwa',
                vision: DEFAULT_ANNOUNCEMENT.faculty_brief
            };
        }

        return {
            establishedYear: data.established_year || 2017,
            facultyName: data.name || 'Faculty of Business',
            universityName: 'University of Moratuwa',
            vision: data.vision_statement || DEFAULT_ANNOUNCEMENT.faculty_brief
        };
    } catch {
        return {
            establishedYear: 2017,
            facultyName: 'Faculty of Business',
            universityName: 'University of Moratuwa',
            vision: DEFAULT_ANNOUNCEMENT.faculty_brief
        };
    }
}
