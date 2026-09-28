import { createClient } from '../supabase/server';

/**
 * Database-First Faculty Staff & Time-Bounded Appointments Service
 * Queries PostgreSQL / Supabase directly with relational integrity.
 * Strictly zero hardcoding: returns empty results or null when no DB record exists.
 */

function formatStaffRecord(staff, appointments = []) {
    if (!staff) return null;
    const staffAppointments = appointments.filter(a => a.staff_id === staff.id);
    const currentAppointment = staffAppointments.find(a => a.is_current);
    const pastAppointments = staffAppointments.filter(a => !a.is_current);

    return {
        id: staff.id,
        username: staff.username,
        staffCategory: staff.staff_category,
        fullName: staff.full_name,
        preferredName: staff.preferred_name,
        honorific: staff.honorific,
        designation: staff.designation,
        primaryDepartmentCode: staff.primary_department_code,
        department: staff.primary_department_code === 'DEANERY' || staff.primary_department_code === 'SECRETARIAT'
            ? 'Faculty of Business'
            : `Department of ${staff.primary_department_code}`,
        email: staff.email,
        phone: staff.phone,
        officeLocation: staff.office_location,
        avatarUrl: staff.avatar_url,
        researchInterests: staff.research_interests || [],
        googleScholarUrl: staff.google_scholar_url,
        researchGateUrl: staff.researchgate_url,
        orcidId: staff.orcid_id,
        teachingAreas: staff.teaching_areas || [],
        academicBio: staff.academic_bio,
        operationalScope: staff.operational_scope,
        isOperationalReference: staff.is_operational_reference,
        currentAppointment: currentAppointment ? {
            id: currentAppointment.id,
            roleTitle: currentAppointment.role_title,
            roleType: currentAppointment.role_type,
            termLabel: currentAppointment.term_label,
            startDate: currentAppointment.start_date,
            endDate: currentAppointment.end_date,
            isCurrent: currentAppointment.is_current,
            notes: currentAppointment.notes,
            sourceReference: currentAppointment.source_reference
        } : null,
        pastAppointments: pastAppointments.map(a => ({
            id: a.id,
            roleTitle: a.role_title,
            roleType: a.role_type,
            termLabel: a.term_label,
            startDate: a.start_date,
            endDate: a.end_date,
            isCurrent: a.is_current,
            notes: a.notes,
            sourceReference: a.source_reference
        })),
        allAppointments: staffAppointments.map(a => ({
            id: a.id,
            roleTitle: a.role_title,
            roleType: a.role_type,
            termLabel: a.term_label,
            startDate: a.start_date,
            endDate: a.end_date,
            isCurrent: a.is_current,
            notes: a.notes,
            sourceReference: a.source_reference
        }))
    };
}

/**
 * Retrieve a staff profile by username or UUID from Supabase
 */
export async function getStaffByUsername(identifier) {
    if (!identifier) return null;
    const supabase = await createClient();
    if (!supabase) return null;

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
    const query = supabase.from('faculty_staff_profiles').select('*');
    const { data: staff, error } = isUuid 
        ? await query.eq('id', identifier).maybeSingle() 
        : await query.eq('username', identifier.toLowerCase()).maybeSingle();

    if (error || !staff) {
        return null;
    }

    // Fetch related time-bounded appointments
    const { data: appointments } = await supabase
        .from('faculty_staff_appointments')
        .select('*')
        .eq('staff_id', staff.id)
        .order('start_date', { ascending: false });

    return formatStaffRecord(staff, appointments || []);
}

/**
 * Retrieve all staff profiles for a department from Supabase
 */
export async function getDepartmentStaffProfiles(deptCode) {
    if (!deptCode) return [];
    const supabase = await createClient();
    if (!supabase) return [];

    const { data: staffList, error: staffError } = await supabase
        .from('faculty_staff_profiles')
        .select('*')
        .eq('primary_department_code', deptCode.toUpperCase())
        .order('designation', { ascending: true });

    if (staffError || !staffList || staffList.length === 0) {
        return [];
    }

    const staffIds = staffList.map(s => s.id);
    const { data: aptData } = await supabase
        .from('faculty_staff_appointments')
        .select('*')
        .in('staff_id', staffIds)
        .order('start_date', { ascending: false });

    const appointments = aptData || [];
    return staffList.map(staff => formatStaffRecord(staff, appointments));
}

/**
 * Retrieve chronological Deans history from Supabase
 */
export async function getFacultyDeansHistory() {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('faculty_staff_appointments')
        .select(`
            id,
            role_title,
            term_label,
            is_current,
            notes,
            source_reference,
            start_date,
            end_date,
            staff:faculty_staff_profiles (
                id,
                username,
                full_name,
                honorific,
                designation
            )
        `)
        .eq('entity_code', 'DEANERY')
        .order('start_date', { ascending: false });

    if (error || !data || data.length === 0) {
        return [];
    }

    return data.map((d, idx) => ({
        id: d.id,
        order: d.is_current ? 'Current Dean' : `${data.length - idx}th Dean`,
        name: d.staff ? `${d.staff.honorific || ''} ${d.staff.full_name}`.trim() : 'Dean',
        username: d.staff?.username,
        term: d.term_label,
        isCurrent: d.is_current,
        notableInitiatives: d.notes || d.role_title
    }));
}

/**
 * Retrieve active Deanery leadership and Secretariat from Supabase
 */
export async function getActiveDeaneryFromDb() {
    const supabase = await createClient();
    if (!supabase) return null;

    // Active Dean
    const { data: deanApt } = await supabase
        .from('faculty_staff_appointments')
        .select(`
            id,
            role_title,
            term_label,
            notes,
            staff:faculty_staff_profiles (*)
        `)
        .eq('entity_code', 'DEANERY')
        .eq('is_current', true)
        .maybeSingle();

    // Active Assistant Registrar (Secretariat)
    const { data: arStaff } = await supabase
        .from('faculty_staff_profiles')
        .select('*')
        .eq('primary_department_code', 'SECRETARIAT')
        .maybeSingle();

    if (!deanApt && !arStaff) {
        return null;
    }

    return {
        dean: deanApt?.staff ? {
            name: `${deanApt.staff.honorific || ''} ${deanApt.staff.full_name}`.trim(),
            username: deanApt.staff.username,
            title: deanApt.staff.designation,
            termLabel: deanApt.term_label,
            email: deanApt.staff.email,
            phone: deanApt.staff.phone,
            officeLocation: deanApt.staff.office_location,
            governanceScope: deanApt.staff.operational_scope
        } : null,
        secretariat: arStaff ? {
            name: `${arStaff.honorific || ''} ${arStaff.full_name}`.trim(),
            username: arStaff.username,
            role: arStaff.designation,
            email: arStaff.email,
            phone: arStaff.phone,
            officeLocation: arStaff.office_location,
            contactNotes: arStaff.operational_scope
        } : null
    };
}

export { verifiedFacultyDeans, pastFacultyDeans } from './facultyStaffConstants';
