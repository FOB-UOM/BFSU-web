import { createClient } from '../supabase/client.js';

/**
 * Universal Institutional Data & Governance Service
 * 
 * Implements the full institutional hierarchy:
 * Level 0: University (University of Moratuwa - UoM)
 * Level 1: Faculty (Faculty of Business - FOB, Est. 2017)
 * Level 2: Departments (Decision Sciences, Management of Technology, Industrial Management)
 * Level 3: Statutory Faculty Union (BFSU) & Departmental Societies (SOBA, BPMSS, FSMSS)
 * Level 4: Academic Intakes & 3 Department Cohorts per intake
 * Level 5: Batch Representatives
 * Level 6: Web Platform Maintainers & Engineering Contributors
 */

/**
 * Fetch Academic Intakes & Department Cohorts from Supabase
 */
export async function fetchAcademicIntakesAndCohorts() {
    const supabase = createClient();
    try {
        const { data: intakes, error } = await supabase
            .from('academic_intakes')
            .select(`
                id, batch_name, enrollment_year, expected_graduation_year, is_graduated,
                google_group_email, google_group_join_url, academic_drive_url, notes,
                department_cohorts (
                    id, cohort_code, cohort_name, department_id,
                    departments ( code, name )
                )
            `)
            .order('enrollment_year', { ascending: false });

        if (error || !intakes || intakes.length === 0) {
            return [];
        }

        return intakes.map(i => ({
            id: i.id,
            batchName: i.batch_name,
            enrollmentYear: i.enrollment_year,
            graduationYear: i.expected_graduation_year,
            isGraduated: i.is_graduated,
            googleGroupEmail: i.google_group_email,
            googleGroupJoinUrl: i.google_group_join_url,
            academicDriveUrl: i.academic_drive_url || 'https://drive.google.com/drive/folders/1jslodTgZhPFqyp3zm9SDQXgKN6VOttMh?usp=drive_link',
            notes: i.notes,
            cohorts: (i.department_cohorts || []).map(c => ({
                id: c.id,
                code: c.cohort_code,
                name: c.cohort_name,
                deptCode: c.departments?.code || ''
            }))
        }));
    } catch {
        return [];
    }
}

/**
 * Fetch Batch Representatives from Supabase
 */
export async function fetchBatchRepresentatives({ cohortCode, batchName, academicYearTerm } = {}) {
    const supabase = createClient();
    try {
        let query = supabase
            .from('batch_representatives')
            .select(`
                id, academic_year_term, is_current, rep_number, term_start, term_end,
                department_cohorts (
                    cohort_code, cohort_name,
                    academic_intakes ( batch_name ),
                    departments ( code, name )
                ),
                profiles (
                    id, username, full_name, display_name, email, avatar_url, headline
                )
            `)
            .eq('is_current', true);

        if (academicYearTerm) query = query.eq('academic_year_term', academicYearTerm);

        const { data, error } = await query;
        if (error || !data || data.length === 0) {
            return [];
        }

        return data.map(item => ({
            id: item.id,
            cohortCode: item.department_cohorts?.cohort_code,
            cohortName: item.department_cohorts?.cohort_name,
            deptCode: item.department_cohorts?.departments?.code,
            batchName: item.department_cohorts?.academic_intakes?.batch_name,
            academicYearTerm: item.academic_year_term,
            repNumber: item.rep_number,
            isCurrent: item.is_current,
            termStart: item.term_start,
            termEnd: item.term_end,
            status: item.is_current ? 'active' : 'completed',
            name: item.profiles?.display_name || item.profiles?.full_name || 'Batch Rep',
            username: item.profiles?.username,
            email: item.profiles?.email,
            avatarUrl: item.profiles?.avatar_url,
            headline: item.profiles?.headline
        }));
    } catch {
        return [];
    }
}

/**
 * Fetch Web Platform Maintainers & Systems Engineers from Supabase
 */
export async function fetchPlatformMaintainers() {
    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('platform_maintainers')
            .select(`
                id, role_title, domain_specialty, session_term, is_active, priority_order, contributions_summary,
                profiles (
                    id, username, full_name, display_name, email, avatar_url, headline, github_url, linkedin_url
                )
            `)
            .order('priority_order', { ascending: true });

        if (error || !data || data.length === 0) {
            return [];
        }

        return data.map(item => ({
            id: item.id,
            name: item.profiles?.display_name || item.profiles?.full_name || 'Maintainer',
            username: item.profiles?.username,
            avatarUrl: item.profiles?.avatar_url,
            headline: item.profiles?.headline,
            roleTitle: item.role_title,
            domainSpecialty: item.domain_specialty,
            sessionTerm: item.session_term,
            isActive: item.is_active,
            contributionsSummary: item.contributions_summary,
            githubUrl: item.profiles?.github_url
        }));
    } catch {
        return [];
    }
}

/**
 * Fetch Entity Milestones & Timelines from Supabase
 */
export async function fetchEntityMilestones({ entityType = 'faculty' } = {}) {
    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('entity_milestones')
            .select('*')
            .eq('entity_type', entityType)
            .order('year', { ascending: true })
            .order('order_index', { ascending: true });

        if (error || !data || data.length === 0) {
            return [];
        }

        return data.map(m => ({
            id: m.id,
            year: m.year,
            dateDisplay: m.date_display,
            title: m.title,
            summary: m.summary,
            category: m.category,
            mediaUrl: m.media_url
        }));
    } catch {
        return [];
    }
}

/**
 * Fetch Departments from Supabase
 */
export async function fetchDepartments() {
    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('departments')
            .select('*')
            .order('code', { ascending: true });

        if (error || !data) return [];
        return data;
    } catch {
        return [];
    }
}

/**
 * Fetch Department by Slug or Code
 */
export async function fetchDepartmentBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase();
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('departments')
            .select('*');

        if (error || !data) return null;

        const match = data.find(d => 
            d.code?.toLowerCase() === cleanSlug ||
            d.aliases?.some(a => a.toLowerCase() === cleanSlug) ||
            d.name?.toLowerCase().includes(cleanSlug)
        );

        return match || null;
    } catch {
        return null;
    }
}

/**
 * Fetch Student Societies from Supabase
 */
export async function fetchStudentSocieties() {
    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('student_societies')
            .select('*')
            .order('code', { ascending: true });

        if (error || !data) return [];
        return data;
    } catch {
        return [];
    }
}

/**
 * Fetch Society by Slug or Code
 */
export async function fetchSocietyBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase();
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('student_societies')
            .select('*');

        if (error || !data) return null;

        const match = data.find(s => 
            s.slug?.toLowerCase() === cleanSlug ||
            s.code?.toLowerCase() === cleanSlug ||
            s.aliases?.some(a => a.toLowerCase() === cleanSlug)
        );

        return match || null;
    } catch {
        return null;
    }
}

/**
 * Universal Artifact Attribution Resolver
 */
export function resolveArtifactAttribution(artifact = {}) {
    if (artifact.author || artifact.author_id || artifact.organizer_id || artifact.recipient_profile_id) {
        const person = artifact.author || {};
        return {
            type: 'person',
            name: person.name || artifact.author_name || 'Contributor',
            username: person.username || null,
            avatarUrl: person.avatarUrl || null,
            headline: person.headline || null,
            email: person.email || null,
            isEntityFallback: false
        };
    }

    if (artifact.cohort_code || artifact.cohortCode) {
        const code = artifact.cohort_code || artifact.cohortCode;
        return {
            type: 'cohort',
            code,
            name: artifact.cohort_name || `Cohort ${code}`,
            isEntityFallback: false
        };
    }

    const entityCode = (artifact.entity_code || artifact.entityCode || 'BFSU').toUpperCase();
    const entityNames = {
        BFSU: "BFSU Secretariat",
        SOBA: "Society of Business Analytics Editorial",
        BPMSS: "BPM Students' Society Board",
        FSMSS: "FSM Students' Society Board",
        FOB: "Faculty Administration",
        CITES: "CITES Central IT Administration",
        LIBRARY: "University Library Reader Services",
        HEALTH: "University Health Centre Medical Board",
        WELFARE: "Student Welfare & Counseling Division",
        PE: "Physical Education & Sports Division",
        CGU: "Career Guidance Unit"
    };

    return {
        type: 'entity',
        code: entityCode,
        name: entityNames[entityCode] || "BFSU Secretariat",
        isEntityFallback: true
    };
}
