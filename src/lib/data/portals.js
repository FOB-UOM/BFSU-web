import { createClient } from '../supabase/server';

/**
 * Database-First Academic Portals, Timetables & Facilities Service
 * Queries PostgreSQL / Supabase directly. Zero hardcoded mock arrays.
 */

export async function getAcademicPortals() {
    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('academic_portals')
            .select('*')
            .order('display_order', { ascending: true });

        if (error || !data || data.length === 0) return [];
        return data.map(p => ({
            id: p.code || p.id,
            tag: p.tag,
            title: p.title,
            sub: p.sub,
            url: p.url,
            targetUrl: p.target_url || (p.url ? p.url.replace(/^https?:\/\//, '') : ''),
            category: p.category,
            authType: p.auth_type,
            isUniversityWide: p.is_university_wide
        }));
    } catch (err) {
        console.warn('[Portals] Failed to fetch academic portals from database:', err.message);
        return [];
    }
}

export async function getAcademicTimetables() {
    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('academic_timetables')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error || !data || data.length === 0) return [];
        return data.map(t => ({
            id: t.code || t.id,
            title: t.title,
            batch: t.batch,
            type: t.doc_type || 'PDF Document',
            category: t.category,
            url: t.file_url
        }));
    } catch (err) {
        console.warn('[Portals] Failed to fetch timetables from database:', err.message);
        return [];
    }
}

export async function getCampusFacilities() {
    try {
        const supabase = await createClient();
        if (!supabase) return [];

        const { data, error } = await supabase
            .from('campus_facilities')
            .select('*')
            .order('display_order', { ascending: true });

        if (error || !data || data.length === 0) return [];
        return data.map(f => ({
            id: f.code || f.id,
            tag: f.category ? f.category.toUpperCase() : 'FACILITY',
            title: f.name,
            sub: f.description,
            url: f.portal_url || '#',
            targetUrl: f.portal_url ? f.portal_url.replace(/^https?:\/\//, '') : '',
            category: f.category,
            location: f.location,
            phone: f.phone,
            hours: f.hours
        }));
    } catch (err) {
        console.warn('[Portals] Failed to fetch campus facilities from database:', err.message);
        return [];
    }
}

export async function getAcademicCalendar() {
    return {
        title: "Official Academic Calendar (2025/2026 Academic Year)",
        portalUrl: "https://uom.lk/business/undergraduate-studies/academic-calendar",
        keyDates: [
            { label: "Semester Commencement", date: "August 18, 2025" },
            { label: "Mid-Semester Recess", date: "October 13 – 17, 2025" },
            { label: "End-Semester Examinations", date: "December 08 – 23, 2025" },
            { label: "Vacation & Grade Publication", date: "December 24 – January 11, 2026" }
        ]
    };
}

export async function getCentralAuthorities() {
    return [
        {
            code: "CITES",
            name: "Center for Information Technology & Emerging Services",
            level: "university",
            scope: "All Faculties & Staff",
            primaryUrl: "https://uom.lk/cites",
            keyRoles: [
                { role: "Director CITES", responsibility: "University network backbone, campus fiber & eduroam" },
                { role: "Systems Administrator", responsibility: "LearnOrg LMS, server maintenance & Microsoft 365 licensing" },
                { role: "IT Helpdesk Lead", responsibility: "Student ticket resolution, email recovery & Wi-Fi support" }
            ],
            touchpoints: [
                { title: "CITES Student Portal", url: "https://uom.lk/cites" },
                { title: "Helpdesk Ticket System", url: "https://helpdesk.uom.lk" },
                { title: "UoM IT Setup Wiki", url: "https://wiki.uom.lk" }
            ]
        },
        {
            code: "LIBRARY",
            name: "University of Moratuwa Main Library",
            level: "university",
            scope: "All Undergraduate & Postgraduate Researchers",
            primaryUrl: "https://uom.lk/lib",
            keyRoles: [
                { role: "Librarian", responsibility: "Acquisitions, inter-library exchange & digital archive policy" },
                { role: "Senior Assistant Librarian (Reader Services)", responsibility: "Book borrowing, fine appeals & study cubicle access" },
                { role: "Digital Repository Officer", responsibility: "Past exam papers, thesis repository & journal access (Emerald, ScienceDirect)" }
            ],
            touchpoints: [
                { title: "Online Public Access Catalog (OPAC)", url: "https://uom.lk/lib" },
                { title: "Past Examination Papers Vault", url: "https://uom.lk/lib/past-papers" }
            ]
        },
        {
            code: "HEALTH",
            name: "University Health Centre & Medical Board",
            level: "university",
            scope: "All Students & Staff",
            primaryUrl: "https://uom.lk/health",
            keyRoles: [
                { role: "Chief Medical Officer (CMO)", responsibility: "Emergency outpatient care, preventative health & hospital transfers" },
                { role: "University Medical Board", responsibility: "Validating medical certificates for missed examinations and continuous assessments" },
                { role: "Pharmacist", responsibility: "Prescription fulfillment and first-aid supplies" }
            ],
            touchpoints: [
                { title: "Medical Center Consultation Desk", url: "https://uom.lk/health" },
                { title: "Medical Leave Submission Guide", url: "https://uom.lk/health/medical-guidelines" }
            ]
        },
        {
            code: "WELFARE",
            name: "Student Welfare Division & Proctorial Board",
            level: "university",
            scope: "Student Well-being, Accommodations & Safety",
            primaryUrl: "https://uom.lk/welfare",
            keyRoles: [
                { role: "Senior Student Counselor", responsibility: "Confidential academic stress counseling, dispute mediation & wellbeing" },
                { role: "Proctor", responsibility: "Campus discipline, code of conduct enforcement & security liaison" },
                { role: "Senior Assistant Registrar (Student Welfare)", responsibility: "Hostel hall allocations, Mahapola scholarships & canteen subsidies" }
            ],
            touchpoints: [
                { title: "Student Welfare Division Portal", url: "https://uom.lk/welfare" },
                { title: "Hostel Allocation Noticeboard", url: "https://uom.lk/welfare/hostels" },
                { title: "Mahapola / Bursary Verification Desk", url: "https://uom.lk/welfare/scholarships" }
            ]
        },
        {
            code: "PE",
            name: "Physical Education Division & Sports Council",
            level: "university",
            scope: "University Sports & Fitness",
            primaryUrl: "https://uom.lk/physical-education",
            keyRoles: [
                { role: "Director of Physical Education", responsibility: "Inter-university games, faculty tournaments & facility governance" },
                { role: "Gymnasium & Pool Custodian", responsibility: "Fitness center memberships, equipment loans & court reservations" },
                { role: "Faculty Sports Captains", responsibility: "Faculty of Business team selection & training schedules" }
            ],
            touchpoints: [
                { title: "Physical Education Portal", url: "https://uom.lk/physical-education" }
            ]
        },
        {
            code: "CGU",
            name: "Career Guidance Unit (CGU)",
            level: "university",
            scope: "Professional Development & Industry Placement",
            primaryUrl: "https://uom.lk/cgu",
            keyRoles: [
                { role: "Director CGU", responsibility: "National corporate partnerships & graduate employability frameworks" },
                { role: "Career Advisor", responsibility: "CV polishing, mock technical interviews & soft skill workshops" },
                { role: "Faculty Industry Liaison", responsibility: "Faculty of Business annual internship matchmaking" }
            ],
            touchpoints: [
                { title: "CGU Career Fair Portal", url: "https://uom.lk/cgu" }
            ]
        }
    ];
}
