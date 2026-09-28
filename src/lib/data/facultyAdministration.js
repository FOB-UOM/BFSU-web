import { createClient } from '../supabase/server';

/**
 * Database-First Faculty Administration Registry Service
 * Queries Supabase `faculty_administration_registry` directly.
 */

const FALLBACK_REGISTRY = {
    dean: {
        title: "Dean, Faculty of Business",
        currentDean: "Prof. (Ms.) G. N. Kuruppu",
        termLabel: "2026 – Present",
        tenureOrder: "4th Dean of the Faculty",
        email: "dean-fob@uom.lk",
        telephone: "+94 11 2640260 / +94 11 2650301 (Ext: 6501)",
        officeLocation: "Level 02, Faculty Complex, University of Moratuwa",
        portalUrl: "https://uom.lk/business",
        governanceScope: "Chief academic and executive officer overseeing the Faculty of Business, senate representation, institutional accreditations, and degree curricula."
    },
    headsOfDepartment: {
        DS: {
            deptCode: "DS",
            departmentName: "Department of Decision Sciences",
            headTitle: "Head of the Department of Decision Sciences",
            appointeeName: "Dr. (Mrs.) Sulanie D. Perera",
            officeLocation: "Level 02, Faculty Complex, University of Moratuwa",
            email: "head-ds@uom.lk",
            telephone: "+94 11 2640270 (Ext: 6702)",
            portalUrl: "https://uom.lk/business/decision-sciences"
        },
        IM: {
            deptCode: "IM",
            departmentName: "Department of Industrial Management",
            headTitle: "Head of the Department of Industrial Management",
            appointeeName: "Prof. Dinesh Samarasinghe",
            officeLocation: "Level 03, Faculty Complex, University of Moratuwa",
            email: "head-im@uom.lk",
            telephone: "+94 11 2650301 (Ext: 5300)",
            portalUrl: "https://uom.lk/business/industrial-management"
        },
        MOT: {
            deptCode: "MOT",
            departmentName: "Department of Management of Technology",
            headTitle: "Head of the Department of Management of Technology",
            appointeeName: "Dr. K. M. S. Senevirathne",
            officeLocation: "Level 01, Faculty Complex, University of Moratuwa",
            email: "head-mot@uom.lk",
            telephone: "+94 11 2650301 (Ext: 5200)",
            portalUrl: "https://uom.lk/business/mot"
        }
    },
    secretariat: {
        role: "Assistant Registrar",
        assistantRegistrar: "Mrs. Pushpa Mallika",
        extension: "Ext: 6502",
        contactNotes: "Faculty Board agenda, student examinations, official transcripts, and senate matters.",
        email: "ar-fob@uom.lk"
    },
    divisions: [
        {
            code: "UGS",
            name: "Undergraduate Studies Division (UGS)",
            director: "Director of Undergraduate Studies",
            appointeeName: "Dr. K. M. S. Senevirathne",
            mandate: "Curriculum oversight, semester timetables, performance bylaws, exam boards, and module coordination across BBSc Hons specializations.",
            url: "https://uom.lk/business/undergraduate-studies"
        },
        {
            code: "PGS",
            name: "Postgraduate Studies Division",
            director: "Director of Postgraduate Studies",
            appointeeName: "Prof. Dinesh Samarasinghe",
            mandate: "Coordination of Master of Business Analytics (MBAn), MBA in Management of Technology (MOT), and postgraduate research diplomas.",
            url: "https://uom.lk/business"
        }
    ]
};

export async function getFacultyAdministration() {
    try {
        const supabase = await createClient();
        if (supabase) {
            const { data, error } = await supabase
                .from('faculty_administration_registry')
                .select('*')
                .eq('is_current', true)
                .order('role_code', { ascending: true });

            if (!error && data && data.length > 0) {
                const deanRecord = data.find(r => r.role_code === 'DEAN');
                const hodDSRecord = data.find(r => r.role_code === 'HOD_DS');
                const hodIMRecord = data.find(r => r.role_code === 'HOD_IM');
                const hodMOTRecord = data.find(r => r.role_code === 'HOD_MOT');
                const arRecord = data.find(r => r.role_code === 'AR_DEAN_OFFICE');

                return {
                    dean: deanRecord ? {
                        ...FALLBACK_REGISTRY.dean,
                        currentDean: deanRecord.appointee_name,
                        email: deanRecord.email || FALLBACK_REGISTRY.dean.email,
                        telephone: deanRecord.phone || FALLBACK_REGISTRY.dean.telephone,
                        officeLocation: deanRecord.office_location || FALLBACK_REGISTRY.dean.officeLocation,
                        termLabel: deanRecord.term_label || FALLBACK_REGISTRY.dean.termLabel,
                    } : FALLBACK_REGISTRY.dean,
                    headsOfDepartment: {
                        DS: hodDSRecord ? {
                            ...FALLBACK_REGISTRY.headsOfDepartment.DS,
                            appointeeName: hodDSRecord.appointee_name,
                            email: hodDSRecord.email || FALLBACK_REGISTRY.headsOfDepartment.DS.email,
                            telephone: hodDSRecord.phone || FALLBACK_REGISTRY.headsOfDepartment.DS.telephone,
                        } : FALLBACK_REGISTRY.headsOfDepartment.DS,
                        IM: hodIMRecord ? {
                            ...FALLBACK_REGISTRY.headsOfDepartment.IM,
                            appointeeName: hodIMRecord.appointee_name,
                            email: hodIMRecord.email || FALLBACK_REGISTRY.headsOfDepartment.IM.email,
                            telephone: hodIMRecord.phone || FALLBACK_REGISTRY.headsOfDepartment.IM.telephone,
                        } : FALLBACK_REGISTRY.headsOfDepartment.IM,
                        MOT: hodMOTRecord ? {
                            ...FALLBACK_REGISTRY.headsOfDepartment.MOT,
                            appointeeName: hodMOTRecord.appointee_name,
                            email: hodMOTRecord.email || FALLBACK_REGISTRY.headsOfDepartment.MOT.email,
                            telephone: hodMOTRecord.phone || FALLBACK_REGISTRY.headsOfDepartment.MOT.telephone,
                        } : FALLBACK_REGISTRY.headsOfDepartment.MOT,
                    },
                    secretariat: arRecord ? {
                        ...FALLBACK_REGISTRY.secretariat,
                        assistantRegistrar: arRecord.appointee_name,
                        email: arRecord.email || FALLBACK_REGISTRY.secretariat.email,
                    } : FALLBACK_REGISTRY.secretariat,
                    divisions: FALLBACK_REGISTRY.divisions,
                    fromDb: true
                };
            }
        }
    } catch {
        // Fallback
    }

    return {
        ...FALLBACK_REGISTRY,
        fromDb: false
    };
}
